# Deployment Guide

## Overview

INCAP supports multiple deployment strategies: local development with Docker Compose, and production deployment with either Docker Compose or Kubernetes. Each approach balances convenience, scalability, and operational complexity.

## Deployment Architecture

### Service Topology

```
┌─────────────────────────────────────────────────────────┐
│                  Load Balancer / Ingress                │
│                  (External Access points)               │
└────────────┬──────────────────────────────┬──────────────┘
             │                              │
    ┌────────↓────────┐            ┌────────↓────────┐
    │   Frontend      │            │   Backend       │
    │   Container     │            │   Container     │
    │   (Port 8080)   │            │   (Port 4000)   │
    └────────┬────────┘            └────────┬────────┘
             │                              │
             │         ┌──────────────────────┐
             │         │                      │
             │         ↓                      ↓
             │    ┌──────────────────────────────────┐
             │    │     MongoDB Container            │
             │    │     (Port 27017)                 │
             │    │     Database Volume (Persistent) │
             │    └──────────────────────────────────┘
             │
             └─→ Nginx proxy server (Static files)
```

## Docker Images

### Frontend Image

**Dockerfile Strategy**: Multi-stage build

```dockerfile
# Stage 1: Build
FROM node:24-alpine AS builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Runtime
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

**Result**:
- Small image size (Nginx + static files only)
- Fast deployment
- No Node.js runtime in final image

**Image Tag**: `tuanicom/incap-frontend:latest`

**Registry**: Docker Hub

### Backend Image

**Dockerfile Strategy**: Multi-stage build

```dockerfile
# Stage 1: Build & Test
FROM node:24-alpine AS builder
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci
COPY backend/ ./
RUN npm run build
RUN npm run test
RUN npm run coverage

# Stage 2: Runtime
FROM node:24-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm ci --production
COPY --from=builder /app/dist ./dist
EXPOSE 4000
CMD ["node", "dist/server.js"]
```

**Result**:
- Tests run during build (fail fast)
- Only production dependencies in runtime
- Minimal attack surface

**Image Tag**: `tuanicom/incap-backend:latest`

**Registry**: Docker Hub

### MongoDB Image

**Source**: Official `mongo` image from Docker Hub

**Usage**: Pre-built, no custom image needed

```yaml
services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
```

## Docker Compose Deployment

### Development Environment

**File**: `docker-compose.yml`

```yaml
version: '3'

services:
  frontend:
    ports:
      - "8080:8080"
    environment:
      CATEGORIES_API_URL: http://backend:4000/categories
      USERS_API_URL: http://backend:4000/users
      ARTICLES_API_URL: http://backend:4000/articles
    depends_on:
      - backend

  backend:
    environment:
      MONGO_DB_URL: mongodb:27017
    depends_on:
      - mongodb

  mongodb:
    image: mongo
```

### Service Configuration

#### Frontend Service

**Port Mapping**: `8080:8080`
- External: localhost:8080
- Internal: 8080 (Nginx)

**Environment Variables**:
```bash
CATEGORIES_API_URL=http://backend:4000/categories
USERS_API_URL=http://backend:4000/users
ARTICLES_API_URL=http://backend:4000/articles
```
- Internal DNS names for backend communication
- Configured via Docker Compose networking

### Backend Service

**Port Mapping**: `4000:4000` (implicit)
- External: localhost:4000
- Internal: 4000 (Express)

**Environment Variables**:
```bash
MONGO_DB_URL=mongodb:27017
```
- Connection string to MongoDB
- Resolves via internal Docker network

### MongoDB Service

**Image**: `mongo:latest`

**Port Mapping**: `27017:27017`
- External: localhost:27017
- Internal: 27017

**Data Persistence**:
```yaml
volumes:
  - mongodb_data:/data/db
```
- Named volume for data durability
- Survives container restart

### Startup Sequence

```
1. Docker Compose starts services in dependency order
2. MongoDB starts (no dependencies)
3. Backend starts (depends on MongoDB)
   └─ Waits and retries MongoDB connection
4. Frontend starts (depends on Backend)
   └─ Loads API URLs from environment
5. All services health-checked
6. Application ready on localhost:8080
```

### Running Docker Compose

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Remove volumes (clean database)
docker-compose down -v

# Rebuild images
docker-compose build --no-cache
```

## Kubernetes Deployment

### Overview

Kubernetes manifests enable production-grade container orchestration with:
- High availability through replicas
- Self-healing and auto-restart
- Load balancing
- Resource management
- Rolling updates

### Deployment Files

Located in `deploy/` directory:

```
deploy/
├── backend-deployment.yaml      # Backend Pod configuration
├── backend-service.yaml         # Backend Service (networking)
├── frontend-deployment.yaml     # Frontend Pod configuration
├── frontend-service.yaml        # Frontend Service (networking)
├── mongodb-deployment.yaml      # MongoDB Pod configuration
├── mongodb-service.yaml         # MongoDB Service (networking)
└── docker-compose.yml           # Development reference

```

### Backend Deployment

**File**: `deploy/backend-deployment.yaml`

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    io.kompose.service: incap-backend
  name: incap-backend
spec:
  replicas: 1
  template:
    metadata:
      labels:
        io.kompose.service: incap-backend
    spec:
      containers:
        - env:
            - name: MONGO_DB_URL
              value: mongodb:27017
          image: tuanicom/incap-backend
          name: incap-backend
          securityContext:
            allowPrivilegeEscalation: false
            runAsNonRoot: true
            capabilities:
              drop:
                - all
          ports:
            - containerPort: 4000
          resources: {}
      restartPolicy: Always
```

**Key Features**:
- **Replicas**: 1 (can increase for HA)
- **Container Port**: 4000
- **Environment**: MongoDB connection string
- **Security**:
  - No privilege escalation
  - Run as non-root user
  - Drop all Linux capabilities
- **Restart Policy**: Always (self-healing)

### Backend Service

**File**: `deploy/backend-service.yaml`

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    io.kompose.service: incap-backend
  name: incap-backend
spec:
  ports:
    - name: "4000"
      port: 4000
      targetPort: 4000
  selector:
    io.kompose.service: incap-backend
type: ClusterIP
```

**Purpose**: 
- Internal service discovery
- Load balancing across backend pods
- DNS name: `incap-backend` (resolvable within cluster)

### Frontend Deployment

**File**: `deploy/frontend-deployment.yaml`

**Structure**: Similar to backend
- Image: `tuanicom/incap-frontend`
- Port: 8080
- Security context applied

### Frontend Service

**Type**: ClusterIP (internal) or LoadBalancer (external)

**For Production**:
```yaml
type: LoadBalancer
ports:
  - port: 80
    targetPort: 8080
    protocol: TCP
```

### MongoDB Deployment

**Considerations**:
- StatefulSet instead of Deployment (for data consistency)
- Persistent Volume for data
- Connection string: `mongodb` (internal DNS)

### Kubernetes Network

```
┌─────────────────────────────────────────┐
│       Kubernetes Cluster                │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────────────────────────┐  │
│  │  Ingress / LoadBalancer Service  │  │
│  │  (External traffic entry point)  │  │
│  └────────────────┬─────────────────┘  │
│                   │                     │
│        ┌──────────┼──────────┐          │
│        ↓                     ↓          │
│  ┌──────────────┐     ┌──────────────┐│
│  │ Frontend Pod │     │ Backend Pod  ││
│  │   (Port 8080)      │  (Port 4000) ││
│  └────────┬─────┘     └──────┬───────┘│
│           │                  │        │
│           └──────────┬───────┘        │
│                      ↓                │
│           ┌──────────────────┐        │
│           │  MongoDB Service │        │
│           │  (Port 27017)    │        │
│           └──────────────────┘        │
│                                       │
└─────────────────────────────────────────┘
```

### Deploying to Kubernetes

```bash
# Create namespace
kubectl create namespace incap

# Deploy services
kubectl apply -f deploy/backend-service.yaml -n incap
kubectl apply -f deploy/frontend-service.yaml -n incap
kubectl apply -f deploy/mongodb-service.yaml -n incap

# Deploy applications
kubectl apply -f deploy/backend-deployment.yaml -n incap
kubectl apply -f deploy/frontend-deployment.yaml -n incap
kubectl apply -f deploy/mongodb-deployment.yaml -n incap

# Check status
kubectl get deployments -n incap
kubectl get services -n incap
kubectl get pods -n incap

# View logs
kubectl logs deployment/incap-backend -n incap
kubectl logs deployment/incap-frontend -n incap
```

### Scaling

```bash
# Scale backend to 3 replicas
kubectl scale deployment/incap-backend --replicas=3 -n incap

# Auto-scaling with HPA
kubectl autoscale deployment incap-backend --min=2 --max=10 \
  --cpu-percent=80 -n incap
```

## Configuration Management

### Environment Variables

#### Frontend
- `CATEGORIES_API_URL`: Categories endpoint
- `USERS_API_URL`: Users endpoint
- `ARTICLES_API_URL`: Articles endpoint

**Configuration Sources**:
- Docker Compose: `environment:` section
- Kubernetes: `env:` in deployment spec
- File-based: `assets/settings.json`

#### Backend
- `MONGO_DB_URL`: MongoDB connection string
  - Format: `host:port`
  - Default: `localhost:27017`
  - In containers: `mongodb:27017`

### Configuration for Different Environments

**Development**:
```yaml
Backend:
  MONGO_DB_URL: mongodb:27017 (Docker Compose)
Frontend:
  API URLs: http://localhost:4000/...
```

**Production**:
```yaml
Backend:
  MONGO_DB_URL: db.example.com:27017 (production MongoDB)
Frontend:
  API URLs: https://api.example.com/... (production domain)
```

## Data Persistence

### MongoDB Data Persistence

**Docker Compose**:
```yaml
services:
  mongodb:
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

**Kubernetes**:
```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongodb-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

### Backup Strategy

**Backup Commands**:
```bash
# Docker Compose
docker-compose exec mongodb mongodump -o /backup

# Kubernetes
kubectl exec deployment/incap-mongodb -n incap -- \
  mongodump -o /backup
```

## Security in Production

### Network Security

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: incap-network-policy
spec:
  podSelector:
    matchLabels:
      app: incap-backend
  policyTypes:
    - Ingress
  ingress:
    - from:
        - podSelector:
            matchLabels:
              app: incap-frontend
      ports:
        - protocol: TCP
          port: 4000
```

### Resource Limits

```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

### Container Security

```yaml
securityContext:
  allowPrivilegeEscalation: false
  runAsNonRoot: true
  capabilities:
    drop:
      - all
  readOnlyRootFilesystem: true
```

## Building Custom Images

### Manual Build

```bash
# Backend
docker build -t incap-backend:v1.0 backend/

# Frontend
docker build -t incap-frontend:v1.0 frontend/

# Tag for registry
docker tag incap-backend:v1.0 myregistry.azurecr.io/incap-backend:v1.0
docker tag incap-frontend:v1.0 myregistry.azurecr.io/incap-frontend:v1.0

# Push to registry
docker push myregistry.azurecr.io/incap-backend:v1.0
docker push myregistry.azurecr.io/incap-frontend:v1.0
```

### CI/CD Image Publishing

**AppVeyor**: Automates image building and pushing

```yaml
# In CI/CD configuration
docker build -t tuanicom/incap-backend:latest backend/
docker push tuanicom/incap-backend:latest
```

## Health Checks & Monitoring

### Kubernetes Probes

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 4000
  initialDelaySeconds: 10
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: 4000
  initialDelaySeconds: 5
  periodSeconds: 5
```

### Logging

**Docker Compose**:
```bash
docker-compose logs -f service_name
```

**Kubernetes**:
```bash
kubectl logs deployment/incap-backend -n incap -f
kubectl logs pod/incap-backend-xyz -n incap
```

## Troubleshooting

### Common Issues

**MongoDB Connection Failed**
```bash
# Check MongoDB is running
docker-compose logs mongodb

# Or kubectl
kubectl logs deployment/incap-mongodb -n incap
```

**Frontend Can't Reach Backend**
```bash
# Check network connectivity
docker-compose exec frontend curl http://backend:4000/articles

# Or kubectl
kubectl exec deployment/incap-frontend -n incap -- \
  curl http://incap-backend:4000/articles
```

**Port Already in Use**
```bash
# Find process using port
netstat -ano | findstr :8080

# Stop the process or use different port
docker-compose up -p custom_project -d
```

---

## Deployment Checklist

- [ ] Images built successfully
- [ ] Environment variables configured
- [ ] Database initialized
- [ ] All services responding on health endpoints
- [ ] Frontend can reach backend API
- [ ] Database connection verified
- [ ] Resource limits set appropriately
- [ ] Security policies in place
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] Documentation updated

---

For CI/CD pipeline details, see [CI/CD and Code Analysis](./cicd-and-analysis.md).
