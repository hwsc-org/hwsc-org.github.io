---
layout: wiki
directory: fundamentals
filename: onboarding.md
title: Fundamentals > Onboarding
redirect_from:
  - "/wikis/fundamentals/"
---
## Onboarding
This page will help you setup your development environment.

This document currently support **macOs**. 

Feel free to add other operating system and update this document as you go through the steps.

## Accounts
Make accounts and request for permissions for the following resources.
- [Github](https://github.com/hwsc-org)
- [DockerHub](https://hub.docker.com/u/hwsc)
- [Azure DevOps](https://dev.azure.com/hwsc-org)
- [Azure](https://azure.microsoft.com/en-us/features/azure-portal/)
- [Slack](https://hwsc.slack.com)

## macOS
### brew
1. Refer to the official brew [website](https://brew.sh/)
2. `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
3. `brew install wget`
4. `brew install autoconf && brew install automake && brew install libtool`

### GoLang 1.12
1. Follow the installation guide in the official GoLang [website](https://golang.org/doc/install)
2. `go get -u github.com/golang/protobuf/protoc-gen-go`
3. `go get -u google.golang.org/grpc`

### protoc 3.7.0
1. Download *protobuf-all-3.7.0.tar.gz* from the official [repo](https://github.com/protocolbuffers/protobuf/releases)
2. Untar *protobuf-all-3.7.0.tar.gz*
3. Enter the folder and run `./autogen.sh && ./configure && make`
4. `make check`
5. `sudo make install`
6. `which protoc`
7. `protoc --version`
8. If necessary, append `export PATH="$HOME/protobuf-3.7.0/src:$PATH"` in your `~/.bash_profile`

### Node JS & npm 
1. Follow the installation guide in the official Node JS [website](https://nodejs.org/en/download/current/)

### Python 3.7.2
1. Follow the installation guide in the offcial Python [website](https://www.python.org/downloads/)
2. `curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py`
3. `python3.7 get-pip.py`
4. `pip3.7 install pipenv`

### Docker
1. Download and install Docker Desktop for Mac from the official [website](https://hub.docker.com/editions/community/docker-ce-desktop-mac)

### MongoDB 4.2
1. Follow the installation guide in the official MongoDB [website](https://docs.mongodb.com/master/tutorial/install-mongodb-on-os-x/)

### PosgtreSQL 11
1. Follow the installation guide in the official PSQL [website](https://postgresapp.com/downloads.html)

### Migrates
1. Install the CLI using `brew install golang-migrate`
2. Refer to the [repo](https://github.com/golang-migrate/migrate#use-in-your-go-project) for GoLang library imports
