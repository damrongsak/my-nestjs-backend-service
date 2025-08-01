<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project Standards

This project adheres to a set of standards to ensure code quality, consistency, and maintainability. All developers are expected to follow these guidelines.

### Architecture

The project follows the principles of **Clean Architecture**. This means that the code is organized into layers, with a clear separation of concerns.

*   **Controllers**: Responsible for handling incoming HTTP requests and returning responses. They should be "thin" and delegate business logic to services.
*   **Services**: Contain the core application logic. They are responsible for orchestrating the application's use cases.
*   **Modules**: Each feature should be encapsulated in its own module, which includes a controller, service, and any related providers.

### Security

We take security seriously. The following security measures are in place:

*   **Password Hashing**: Passwords are never stored in plaintext. We use `bcrypt` to hash passwords before storing them in the database.
*   **Authentication**: We use `passport` with JWTs for token-based authentication.
*   **Authorization**: Protected routes are guarded with `JwtAuthGuard` to ensure that only authenticated users can access them.
*   **Input Validation**: We use `class-validator` and a global `ValidationPipe` to validate all incoming data.
*   **Security Headers**: We use `helmet` to set various security-related HTTP headers.
*   **Rate Limiting**: We use `nestjs-rate-limiter` to protect against brute-force attacks.

### Testing

We use **Test-Driven Development (TDD)** as our primary development methodology. All new features should be accompanied by a comprehensive suite of tests.

*   **Unit Tests**: We use `jest` to write unit tests for our services and controllers.
*   **Test Coverage**: We aim for a high level of test coverage. You can check the current coverage by running `npm run test:cov`.

### Code Style

We use **ESLint** and **Prettier** to enforce a consistent code style.

*   **Linting**: Before committing any code, run `npm run lint` to check for and fix any linting issues.
*   **Formatting**: Before committing any code, run `npm run format` to format the code.

By following these standards, we can ensure that our codebase is clean, consistent, and easy to maintain.

### Folder Structure

The folder structure is organized as follows:

```
.
├── src
│   ├── auth
│   │   ├── dto
│   │   │   ├── forgot-password.dto.ts
│   │   │   ├── signin.dto.ts
│   │   │   └── signup.dto.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── jwt-auth.guard.ts
│   │   ├── jwt.strategy.ts
│   │   ├── local-auth.guard.ts
│   │   └── local.strategy.ts
│   ├── user
│   │   ├── user.module.ts
│   │   └── user.service.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   └── prisma.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .gitignore
├── .prettierrc
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

*   **`src`**: This directory contains all the source code for the application.
    *   **`auth`**: This module contains all the code related to authentication, including the controller, service, DTOs, guards, and strategies.
    *   **`user`**: This module contains all the code related to user management.
    *   **`main.ts`**: The entry point of the application.
    *   **`app.module.ts`**: The root module of the application.
*   **`test`**: This directory contains the end-to-end tests.
*   **Configuration Files**: The root directory contains various configuration files for the project, such as `tsconfig.json`, `nest-cli.json`, `.prettierrc`, and `.gitignore`.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
