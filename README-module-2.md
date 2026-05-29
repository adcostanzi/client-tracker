# Overview

This is the continuation of the project client-tracker. In this phase I have included an integration with Google Firestore database as well as authentication from the Firebase admin SDK. I have used a repository based architecture to manage the integration with Firestore as well as the possibility of changing to a different db services provider if needed.

The goal of this phase was to learn the concepts of cloud database and its implementation in this API application.

[Software Demo Video](http://youtube.link.goes.here)

# Cloud Database

I am using Firestore database from Google Firebase.

The database has two collections, clients and jobs that will hold the data that previously was being stored in-memory.
To check the structure of each document in the collections please refer to client-tracker/src/models

# Development Environment

Tools used for this project:
VSCode, node.js, typescript, express.js framework.
IDE: VS Code
Frameworks: node.js express for routing
Programming language: typescript
Test: Postman
Cloud Storage: firebase-admin library

# Useful Websites

- [Google Firebase](https://firebase.google.com/docs/firestore/data-model)
- [FireStore setup](https://firebase.google.com/docs/admin/setup)
- [Repository Architecture](https://medium.com/@hthabang23/understanding-repository-architecture-a-comprehensive-overview-ee0ac55bce4f)

# Future Work

- Replace deprecated unit testing for integration testing
- Implement a UI
- Prepare to host application
