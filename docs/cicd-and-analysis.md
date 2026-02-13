# CI/CD and Code Analysis Strategy

## Overview

INCAP implements a comprehensive DevOps strategy with multiple quality gates, automated testing, security scanning, and continuous deployment. The pipeline ensures code quality, security compliance, and reliable delivery.

## CI/CD Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Git Workflow                                  │
│  1. Developer commits to feature branch                          │
│  2. Push to GitHub                                              │
│  3. Create Pull Request to master                               │
└────────────────────────────┬────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              AppVeyor CI/CD Pipeline (Triggered)                │
└────────────────────────────┬────────────────────────────────────┘
                             ↓
        ┌────────────────────┼────────────────────┐
        ↓                    ↓                    ↓
    ┌─────────┐         ┌─────────┐         ┌──────────┐
    │  Build  │         │  Test   │         │ Analysis │
    │  Phase  │         │  Phase  │         │  Phase   │
    └────┬────┘         └────┬────┘         └────┬─────┘
         ↓                   ↓                   ↓
    ┌─────────────────────────────────────────────────┐
    │  Post-Build Actions                             │
    │  - Upload test results                          │
    │  - Upload coverage reports                      │
    │  - Run SonarQube analysis                       │
    │  - Run security scanning                        │
    └────────────────────┬────────────────────────────┘
                         ↓
        ┌────────────────────────────────────┐
        │  All Quality Gates Pass?            │
        └────┬──────────────────────────┬────┘
             │                          │
            Yes                        No
             │                          │
             ↓                          ↓
    ┌─────────────────┐        ┌──────────────────┐
    │ Approve PR      │        │ Reject PR        │
    │ for Merge       │        │ with feedback    │
    └────────┬────────┘        └──────────────────┘
             │
             ↓
    ┌──────────────────────────────┐
    │  Merge to Master             │
    │  Triggers Deployment         │
    └──────────────────────────────┘
```

## AppVeyor Configuration

### Build Environment

**File**: `appveyor.yml`

**Infrastructure**:
```yaml
version: 1.0.{build}
image: Visual Studio 2022
skip_branch_with_pr: true
```

- **Windows-based build agents**: Visual Studio 2022
- **Skip CI for PRs**: Prevents duplicate builds when PR is created

### Node.js Setup

```yaml
install:
  - ps: Update-NodeJsInstallation 24.13.0 x64
  - npm install sonar-scanner -g
  - npm install -g snyk
  - npm install -g @angular/cli
  - curl -o codecov.exe https://uploader.codecov.io/latest/windows/codecov.exe
```

**Installed Tools**:
- **Node.js**: 24.13.0 (latest LTS)
- **SonarScanner**: Code quality analysis
- **Snyk**: Security vulnerability scanning
- **Angular CLI**: Frontend build tools
- **Codecov**: Coverage upload client

### Caching Strategy

```yaml
cache:
  - C:\Users\appveyor\AppData\Roaming\npm\node_modules -> package.json
  - C:\Users\appveyor\AppData\Roaming\npm-cache -> package.json
  - frontend\node_modules -> package.json
```

**Benefits**:
- Faster builds by caching npm modules
- Cache invalidation based on package.json changes
- Reduces bandwidth and build time

### Build Script

```yaml
build_script:
  - ps: .\rebuild.ps1
```

**rebuild.ps1 Workflow**:
```powershell
# Parallel execution
$build_front = Start-Job -ScriptBlock { .\rebuild.cmd frontend } -Name "Build.frontend"
$build_back = Start-Job -ScriptBlock { .\rebuild.cmd backend } -Name "Build.backend"

# Wait for both to complete
Wait-Job -Id @($build_front.Id, $build_back.Id) -Timeout 6000
```

**What rebuild.cmd does** (inferred):
- Install dependencies: `npm install`
- Lint: `npm run lint`
- Build: `npm run build`
- Test: `npm run test`
- Generate coverage: `npm run coverage`

## Testing Pipeline

### Vitest Framework

**Features**:
- Fast test execution
- Supports both Node.js and jsdom environments
- Coverage reporting via V8
- JUnit XML output for CI integration

### Frontend Testing

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',           // Browser environment
    include: ['**/*.spec.ts'],      // All test files
    globals: true,                  // Global test APIs
    coverage: {
      provider: 'v8',               // V8 coverage
      reporter: ['text', 'lcov'],   // Output formats
      reportsDirectory: 'coverage'   // Output directory
    },
    reporters: ['default', 'junit'], // Console + XML output
    outputFile: {
      junit: 'tests-results/tests-results.xml'
    }
  }
});
```

### Backend Testing

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'node',            // Node.js environment
    include: ['**/*.spec.ts'],
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      all: true,                    // All files in coverage
      exclude: ['node_modules', 'dist', ...]
    },
    reporters: [
      'default',
      ['junit', { outputFile: 'tests-results/tests-results.xml' }]
    ]
  }
});
```

### Test Execution in CI

```yaml
after_build:
  # Upload JUnit XML test results
  - curl -F "file=@backend\\tests-results\\tests-results.xml" 
          "https://ci.appveyor.com/api/testresults/junit/%APPVEYOR_JOB_ID%"
  - curl -F "file=@frontend\\tests-results\\tests-results.xml" 
          "https://ci.appveyor.com/api/testresults/junit/%APPVEYOR_JOB_ID%"
```

### Coverage Upload

```bash
npm run coverage    # Generates coverage reports
codecov.exe        # Uploads to Coveralls
```

## Code Quality Analysis

### SonarCloud Integration

**Configuration** (`sonar-project.properties`):
```properties
sonar.host.url=https://sonarcloud.io
sonar.organization=tuanicom-github
sonar.projectKey=tuanicom_incap
sonar.projectName=incap
sonar.projectVersion=1.0

sonar.sources=frontend/src/app,backend
sonar.tests=frontend/src/app,backend
sonar.test.inclusions=**/*.spec.ts

sonar.javascript.lcov.reportPaths=frontend/coverage/lcov.info,backend/coverage/lcov.info
sonar.eslint.reportPaths=frontend/eslint.json,backend/eslint.json

sonar.sourceEncoding=UTF-8
```

**Project Configuration**:
- **Organization**: tuanicom-github
- **Project Key**: tuanicom_incap
- **Source Paths**: frontend/src/app, backend
- **Test Paths**: All *.spec.ts files

### SonarCloud Analysis in CI

```yaml
after_build:
  - set JAVA_HOME=C:\Program Files\Java\jdk19
  - set PATH=%JAVA_HOME%\bin;%PATH%
  
  # Handle pulls vs. branches differently
  - if defined APPVEYOR_PULL_REQUEST_NUMBER (
      set "SONAR_ARGS=-Dsonar.pullrequest.base=%APPVEYOR_REPO_BRANCH% 
                      -Dsonar.pullrequest.branch=%APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH% 
                      -Dsonar.pullrequest.key=%APPVEYOR_PULL_REQUEST_NUMBER%"
    ) else (
      set "SONAR_ARGS=-Dsonar.branch.name=%APPVEYOR_REPO_BRANCH%"
    )
  
  - call sonar-scanner %SONAR_ARGS%
```

**SonarCloud Metrics**:
- Code coverage
- Bug detection
- Security vulnerabilities
- Code smells
- Maintainability index
- Technical debt

### SonarCloud Dashboard

**Visibility**:
- Pull request comments with quality gate status
- Branch analysis and trend tracking
- Security hotspot identification
- Issue prioritization

## Security Scanning

### Snyk Integration

**Purpose**: Identify vulnerable dependencies

**Configuration** (in package.json):
```json
"snyk": true,
"scripts": {
  "snyk": "snyk auth & snyk wizard",
  "snyk-test": "snyk test",
  "snyk-protect": "snyk-protect",
  "prepare": "npm run snyk-protect"
}
```

**CI Execution**:
- Automatic with each build
- Scans both frontend and backend dependencies
- Prevents publishing with known vulnerabilities

### Snyk Dashboard

**Coverage**:
- npm package vulnerabilities
- Direct and transitive dependencies
- Severity scoring (critical, high, medium, low)
- Remediation recommendations

## Code Linting

### ESLint Configuration

**Frontend** (angular-eslint):
```javascript
// eslint.config.mjs
{
  rules: {
    '@angular-eslint/directive-selector': ['error', { type: 'attribute' }],
    '@angular-eslint/component-selector': ['error', { type: 'element' }],
    'import/no-unresolved': 'error',
    '@typescript-eslint/strict-null-checks': 'warn'
  }
}
```

**Backend** (typescript-eslint):
```javascript
// eslint.config.mjs
{
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'warn',
    'import/order': 'warn'
  }
}
```

**Output Format**: JSON for CI integration
```yaml
after_build:
  - curl -F "file=@frontend/eslint.json" 
          "https://ci.appveyor.com/api/artifacts"
  - curl -F "file=@backend/eslint.json" 
          "https://ci.appveyor.com/api/artifacts"
```

## Coverage Tracking

### Coveralls.io Integration

**Process**:
```bash
1. Generate coverage reports (vitest)
   └─ LCOV format (industry standard)
2. Upload to Coveralls
   └─ codecov.exe (for Windows builds)
3. Track coverage trends
   └─ Badge in README
```

**Coverage Report Locations**:
- Frontend: `frontend/coverage/lcov.info`
- Backend: `backend/coverage/lcov.info`

**SonarCloud Integration**:
```properties
sonar.javascript.lcov.reportPaths=frontend/coverage/lcov.info,backend/coverage/lcov.info
```

## Codacy Integration

**Purpose**: Additional code review automation

**Metrics**:
- Code style consistency
- Complexity analysis
- Duplication detection
- Security patterns

---

## Pull Request Workflow

### PR Creation

```
Developer creates PR to master
        ↓
GitHub triggers AppVeyor build
        ↓
AppVeyor runs complete pipeline
        ↓
Results posted as PR comments
```

### Quality Gates for Merge

**Before merging to master, ensure**:
- ✅ All tests pass (Vitest)
- ✅ No ESLint errors
- ✅ SonarCloud quality gate passes
- ✅ No critical security vulnerabilities (Snyk)
- ✅ Code coverage maintained or improved

### Branch Protection Rules

Recommended rules for `master` branch:
- Require PR review
- Require status checks to pass
- Dismiss stale PR approvals
- Require branches to be up to date

## Artifact Storage

**Uploaded Artifacts**:
```yaml
artifacts:
  - Frontend Coverage: frontend/coverage/index.html
  - Backend Coverage: backend/coverage/lcov-report/index.html
  - Frontend Linting: frontend/eslint.json
  - Backend Linting: backend/eslint.json
```

**Available for**:
- Download from AppVeyor UI
- Integration with analysis tools
- Historical comparison

## Environment Variables for CI

**Required for successful builds**:
- `NODE_VERSION`: Specified in install phase
- `JAVA_HOME`: Set for SonarScanner
- `APPVEYOR_JOB_ID`: Auto-provided for test result upload
- `APPVEYOR_REPO_BRANCH`: Current branch
- `APPVEYOR_PULL_REQUEST_*`: PR-specific variables

## Monitoring & Notifications

### Build Status Badge

```markdown
[![Build status](https://ci.appveyor.com/api/projects/status/x9dtpjle2v6afiwf?svg=true)](https://ci.appveyor.com/project/tuanicom/incap)
```

### Quality Badges

- SonarCloud quality gate
- Coverage percentage
- Security vulnerabilities (Snyk)
- Code quality (Codacy)

### Notifications

**Configured via**:
- AppVeyor projects settings
- GitHub commit statuses
- Email notifications for build failures

---

## Local Development CI Simulation

### Run Tests Locally

```bash
# Backend
cd backend
npm install
npm run lint
npm run test
npm run coverage

# Frontend
cd frontend
npm install
npm run lint
npm run test:unit
npm run coverage
```

### Pre-commit Hook Recommendation

```bash
# In .git/hooks/pre-commit
#!/bin/bash
npm run lint || exit 1
npm run test || exit 1
```

---

For deployment information, see [Deployment Guide](./deployment.md).
