# `clean-arch-todos`

[![tests](https://github.com/alexx666/clean-arch-todos/actions/workflows/tests.yml/badge.svg)](https://github.com/alexx666/clean-arch-todos/actions/workflows/tests.yml)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A Monorepo for practicing and studying software architecture and system design using the following concepts:

- Domain Driven Design (DDD)
- Command and Query Responsibility Segregation (CQRS)
- Event Sourcing (ES)
- Clean Architecture

The project is a simple todo list app (...for now!), glorified and overengineered for the purposes of learning.

## Architecture

The project is comprised of the following packages:

- [`@todos/core`](../packages/core/README.md) - Shared library containing the entire core of the application
- [`@todos/api`](../packages/api/README.md) - Serverless REST API which provideds the core logic of the app. Deployed using AWS SAM
- [`@todos/cli`](../packages/cli/README.md) - CLI tool for interracting with the API
- [`@todos/web`](../packages/web/) - minimal [Angular](https://angular.io/) frontend developed using [NGRX](https://ngrx.io/)

![architecture](./images/architecture.drawio.svg)

## Pre-requisites:

- [`nodejs v16.x`](https://nodejs.org/es/download/)
- [`npm v8.x`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [`docker`](https://docs.docker.com/engine/install/)
- [`aws-sam-cli`](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html#install-sam-cli-instructions)

## Getting Started

The following instruction can get the project up and running.

### Installing

```
npm ci
```

### Static analysis checks and tests

```
npm run lint
npm run test
```

### Building

_Build Source_

```
npm run build
```

### Deploy

_Configure AWS CLI_

> Note: you can find instructions on how to configure AWS CLI [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html)

```
// omit this step of you use the default profile after configuring
export AWS_PROFILE=<your-aws-cli-configured-profile-name>
```

_Deploing the API_

```
npx nx deploy api
```

### Running

_Serve Web_

> Note: change the API in the `environments.ts` to the one provided by the outputs section printed out after deploying the API

```
npx nx serve web
```

_Run CLI_

```
export API_URL=<output-api-url-from-deployment>
npx nx start cli -- <command> <options>
```

> Note: use --help or -h to see available commands and options.

### Notes

- Requests directly to the API are available via [Thunder Client](https://www.thunderclient.com/) which has been included as a recommended extension
- Testing CLI package publishing can be done using [verdaccio](https://verdaccio.org/)
- The API can also be executed locally using docker and running `npx nx start api`. However, you will need an existing DynamoDB and SNS Topic created in your account (the simplest way is to deploy the API to AWS and configure [`packages/api/cfn/env.json`](../packages/api/cfn/env.json) file with the values from the deployed stack)
