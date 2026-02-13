# INCAP - Project Documentation

## Overview

**INCAP** is a modern MEAN stack web application built with TypeScript that recreates a collaborative blogging platform. Originally a PHP-based community website where members could post articles organized by categories with comments, INCAP serves as a comprehensive learning project exploring microservices architecture, containerization, and modern cloud-native development practices.

## Quick Facts

- **Type**: Full-stack web application with microservices architecture
- **Stack**: MEAN (MongoDB, Express, Angular, Node.js) + TypeScript
- **UI Framework**: Angular 21 with Bootstrap 5
- **Database**: MongoDB
- **Container**: Docker & Docker Compose
- **Orchestration**: Kubernetes-ready
- **CI/CD**: AppVeyor with multi-stage pipeline
- **Code Analysis**: SonarCloud, Snyk, Coveralls, Codacy
- **Testing**: Vitest with comprehensive coverage

## Core Features

- **Article Management**: Create, read, update, and delete articles
- **Category Organization**: Organize articles into logical categories
- **User Management**: User account management and authentication framework
- **Responsive UI**: Modern Angular frontend with Bootstrap 5 styling
- **REST API**: Well-structured Express.js backend APIs

## Architecture Highlights

- **Microservices Ready**: Modular backend structure with separate controllers, models, and route handlers
- **Containerized**: Full Docker containerization for all services
- **Type-Safe**: Complete TypeScript implementation across frontend and backend
- **Cloud-Native**: Kubernetes deployment manifests included
- **Quality-Focused**: Multiple quality gates and security scanning

## Documentation Structure

- [Functional Presentation](./functional-presentation.md) - Detailed feature overview
- [Technical Overview](./technical-overview.md) - Architecture and technology stack
- [Frontend Technical Details](./frontend-technical-details.md) - Angular implementation
- [Backend Technical Details](./backend-technical-details.md) - Express.js and data layer
- [CI/CD and Code Analysis](./cicd-and-analysis.md) - Pipeline and quality gates
- [Deployment Guide](./deployment.md) - Docker, Compose, and Kubernetes

---

*Last updated: February 2026*