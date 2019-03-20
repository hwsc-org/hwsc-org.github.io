---
layout: wiki
directory: fundamentals
filename: ci-cd.md
title: Fundamentals > CI/CD
redirect_from:
  - "/wikis/fundamentals/"
---
## Purpose
CI/CD pipeline implementation or the Continuous Integration/Continuous Deployment is the backbone of the modern developmental and operational environment. 
The CI/CD bridges the gap between development and operations teams by automating build, test and deployment of applications.

## Microservice CI/CD Pipeline
We use 3 pipelines for our services. These pipelines are hosted in [Azure DevOps](https://dev.azure.com/hwsc-org/hwsc)
### `pr-master-<service-name>`
- This is defined in `azure-pipelines-pr-test.yml`
- Tests the pull request with the `master` branch for stability.
- Builds a Docker container for the service.
- Tags the container with `test-int`.
- Pushes the container in the [Docker Hub](https://cloud.docker.com/u/hwsc/repository/list)
### `trigger-master-<service-name>`
- This is defined in `azure-pipelines.yml`
- Tests the merge commit to the `master` branch for stability.
- Builds a Docker container for the service.
- Tags the container with `int`.
- Pushes the container in the [Docker Hub](https://cloud.docker.com/u/hwsc/repository/list)
- This container can be used to test prior to releasing.
### `ext-master-<service-name>`
- This is defined in `azure-pipelines-ext.yml`
- Tests the merge commit to the `ext` branch for stability.
- Builds a Docker container for the service.
- Tags the container with `ext` and a version e.g. `1.0.1`.
- Pushes the container in the [Docker Hub](https://cloud.docker.com/u/hwsc/repository/list)
- This container is released for external users.

## Pipeline Stages
Failure or error in any stage is considered unstable. Unstable build can be internally released, but it is highly discouraged.

### Checkout Dependencies
This stage checks out the codes, files, and some environment variables needed.
- Example:
    ```yaml
    variables:
      - name: GOBIN
        value: '$(GOPATH)/bin' # Go binaries path
      - name: GOROOT
        value: '/usr/local/go1.11' # Go installation path
      - name: GOPATH
        value: '$(system.defaultWorkingDirectory)/gopath' # Go workspace path
      - name: modulePath
        value: '$(GOPATH)/$(build.repository.name)'
      - group: hwsc-dev-container-vars
      - group: hwsc-user-svc-env-vars
    
    steps:
      - script: |
          mkdir -p '$(GOBIN)'
          mkdir -p '$(GOPATH)/pkg'
          mkdir -p '$(modulePath)'
          shopt -s extglob
          mv !(gopath) '$(modulePath)'
          echo '##vso[task.prependpath]$(GOBIN)'
          echo '##vso[task.prependpath]$(GOROOT)/bin'
        displayName: 'Set Up the Go Workspace'
    ```
    
### Setup Workspace
This stage gets all dependencies needed to build and test.
- Example:
    ```yaml
      - script: go get -v -t -d ./...
        workingDirectory: '$(modulePath)'
        displayName: 'Go Get Dependencies'
    ```

### Unit Testing
This stage runs all the unit test. It is important that unit tests should utilize Docker containers, Docker compose, and database migrations to enable independent testing.
Some environment variables may required to be initialized during this stage.
- Example:
    ```yaml
      - script: |
          PASSWORD=$(cat $(Agent.TempDirectory)/hwsctestgmail_pw.txt)
          export hosts_postgres_host="localhost"
          export hosts_postgres_db="test_user_svc"
          export hosts_postgres_user="postgres"
          export hosts_postgres_password="secret"
          export hosts_postgres_sslmode="disable"
          export hosts_postgres_port="5432"
          export hosts_smtp_host=$(testGmailHost)
          export hosts_smtp_port=$(testGmailPort)
          export hosts_smtp_username=$(testGmailUser)
          export hosts_smtp_password=$PASSWORD
          docker-compose up -d
          go test -v -cover -race ./...
          docker-compose down
          docker-compose up -d
          go get github.com/jstemmer/go-junit-report
          go get github.com/axw/gocov/gocov
          go get github.com/AlekSi/gocov-xml
          go test -coverprofile=coverage.out -v -race -covermode atomic ./... 2>&1 | go-junit-report > report.xml
          gocov convert coverage.out | gocov-xml > coverage.xml
          mkdir -p coverage/official-tool
          go tool cover -html=coverage.out -o coverage/official-tool/coverage.html
          go get -u github.com/matm/gocov-html
          gocov convert coverage.out > coverage.json
          gocov-html < coverage.json > coverage/index.html
          docker-compose down
        workingDirectory: '$(modulePath)'
        displayName: 'Run Unit Test'
    ```
    
### Integration Test
This stage uses `docker-compose` and [hwsc-api-blocks](https://github.com/hwsc-org/hwsc-api-blocks) for mostly positive integration tests.
- Currently a `TODO` and possibly after building a Docker container

### Publish Test Results
Test results are collected to determine the coverage and tests performed.
- Example:
    ```yaml
      - task: PublishTestResults@2
        inputs:
          testRunner: JUnit
          testResultsFiles: $(System.DefaultWorkingDirectory)/**/report.xml
          failTaskOnFailedTests: 'true'
          failOnStandardError: 'true'
    
      - task: PublishCodeCoverageResults@1
        inputs:
          codeCoverageTool: Cobertura
          summaryFileLocation: $(System.DefaultWorkingDirectory)/**/coverage.xml
          reportDirectory: $(System.DefaultWorkingDirectory)/**/coverage
          failIfCoverageEmpty: 'true'
          failOnStandardError: 'true'
    ```

### Containerize 
This stage uses a `Dockerfile` to build, tag, and push Docker container.
- Example:
    ```yaml
      - task: DownloadSecureFile@1
        inputs:
          secureFile: hwscdevcontainer_pw.txt
      - script: |
          cat $(Agent.TempDirectory)/hwscdevcontainer_pw.txt | docker login -u "$(hwscDevContainerUser)" --password-stdin
          docker build --no-cache -f Dockerfile -t hwsc/hwsc-app-gateway-svc:test-int .
        workingDirectory: '$(modulePath)'
        displayName: 'Build Docker Image Test Internal'
      - script: |
          docker push hwsc/hwsc-app-gateway-svc:test-int
        workingDirectory: '$(modulePath)'
        displayName: 'Push Docker Image Test Internal'
    ```
