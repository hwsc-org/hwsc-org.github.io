---
layout: wiki
directory: fundamentals
filename: onboarding.md
title: Fundamentals > Onboarding
---
## Onboarding
This page will help you setup your development environment.

This document currently supports **macOs**. 
If using Windows 10, then consider dual boot with [Ubuntu 18.04](https://hwsc-org.github.io/wikis/fundamentals/onboarding.html#ubuntu-1804-dual-boot).

Feel free to add other operating system and update this document as you go through the steps.

## Read Rules and Guidelines
- [code review](https://hwsc-org.github.io/wikis/fundamentals/code-review.html)
- [frontend](https://hwsc-org.github.io/wikis/frontend-svc/general.html)

## Accounts
Make accounts and request for permissions for the following resources.
- [Github](https://github.com/hwsc-org)
- [DockerHub](https://hub.docker.com/u/hwsc)
- [Azure DevOps](https://dev.azure.com/hwsc-org)
- [Azure](https://azure.microsoft.com/en-us/features/azure-portal/)
- [Slack](https://hwsc.slack.com)

## Configuration Files
These files are located in our [Slack](https://hwsc.slack.com) channel.

## IDE's and Text Editors
- [JetBrains](https://www.jetbrains.com/)
- [VSCodes](https://code.visualstudio.com/)
- git difftool and mergetool [p4merge](https://www.perforce.com/products/helix-core-apps/merge-diff-tool-p4merge)

## macOS
### brew
1. Refer to the official brew [website](https://brew.sh/)
2. `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
3. `brew install wget`
4. `brew install autoconf && brew install automake && brew install libtool`

### GoLang 1.12.5
1. Follow the installation guide in the official GoLang [website](https://golang.org/doc/install)
2. `go get -u github.com/golang/protobuf/protoc-gen-go`
3. `go get -u google.golang.org/grpc`

### protoc 3.7.1
1. Download *protobuf-all-3.7.1.tar.gz* from the official [repo](https://github.com/protocolbuffers/protobuf/releases)
2. Untar file: `tar -zxvf protobuf-all-3.7.1.tar.gz`
3. Enter the folder and run `./autogen.sh && ./configure && make`
    - If you get a readline error, then consider switching to a version using `brew switch readline` and `brew switch readline X.X.X`
4. `make check`
5. `sudo make install`
6. `which protoc`
7. `protoc --version`
8. If necessary, append `export PATH="$HOME/protobuf-3.7.1/src:$PATH"` in your `~/.bash_profile`

### frontend
Read the frontend [doc](https://github.com/hwsc-org/hwsc-frontend/blob/master/README.md) to install tools and dependencies.

### Node JS & npm 
1. Follow the installation guide in the official Node JS [website](https://nodejs.org/en/download/current/)

### Python 3.7.3
1. Follow the installation guide in the offcial Python [website](https://www.python.org/downloads/)
2. `curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py`
3. `python3.7 get-pip.py`
4. `pip3.7 install pipenv`
5. `pip3.7 install grpcio` or `pip3.7 install --upgrade grpcio`

### Docker
1. Download and install Docker Desktop for Mac from the official [website](https://hub.docker.com/editions/community/docker-ce-desktop-mac)

### MongoDB 4.2
1. Follow the installation guide in the official MongoDB [website](https://docs.mongodb.com/master/tutorial/install-mongodb-on-os-x/)

### PosgtreSQL 11.2
1. Follow the installation guide in the official PSQL [website](https://postgresapp.com/downloads.html)

### Migrate
1. Install the CLI using `brew install golang-migrate`
2. Refer to the [repo](https://github.com/golang-migrate/migrate#use-in-your-go-project) for GoLang library imports

## Windows 10
### Ubuntu 18.04 Dual-Boot
1. Partition your disk
    - Open the Start Menu
    - Type and run `diskmgmt.msc`
    - Right click on your disk (C:) and select **Shrink Volume...**
    - Enter your desired amount of space (in MB) to allocate to Ubuntu in the highlighted field (20000MB minimum, more recommended)
    - Click **Shrink**
2. Disable fast startup
    - Open the Start Menu
    - Type and run `Control Panel`
    - Click **Power Options**
    - Click **Choose what the power buttons do**
    - Click **Change settings that are currently unavailable**
    - Uncheck **Turn on fast startup**
    - Click **Save changes**
3. Download Ubuntu Desktop from the official Ubuntu [website](https://www.ubuntu.com/download/desktop)
4. Create a bootable Ubuntu USB drive with Rufus
    - Download Rufus from the official Rufus [website](https://rufus.ie/)
    - Insert an *empty* USB drive (at least 2GB) into your PC (***WARNING:*** *YOUR USB DRIVE WILL BE WIPED*)
    - Run Rufus
    - Select your inserted USB drive in the **Device** field
    - Click **SELECT** and select your downloaded Ubuntu Desktop .iso file
    - Click **START**
5. Restart your PC and press your PC's boot menu hot-key during startup
    - If you do not know your PC's boot menu hot-key
        - You may find it on the table [here](https://www.disk-image.com/faq-bootmenu.htm)
        - If you did not find your PC manufacturer on the table, go to your PC manufacturer's website and look for their boot menu hot-key
        - If you built your own PC, go to your motherboard manufacturer's website and look for their boot menu hot-key
6. Select your USB drive on your PC's boot menu
7. Install Ubuntu
    - On the **Installation type** step, make sure **Install Ubuntu alongside Windows 10** is selected
