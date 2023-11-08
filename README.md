# Marketplace Application

## Overview
This is the backend part of the Marketplace application, an implementation following the "Clean Architecture" principles as outlined by Robert Martin. The application is structured to have a separation of concerns, dividing the software into layers with distinct responsibilities, making it more maintainable, scalable, and adaptable to UI changes.

## Architecture
The Marketplace backend is structured into several directories, each corresponding to a layer or a set of related functionality:

- **entities**: Encapsulate the application's business objects.
- **usecases**: Definitions of the use cases (business logic) provided by the application.
- **interactors**: Contain the use case implementations for the application.
- **repositories**: Interfaces for the data access layer. Implementations are in the `infrastructure` layer.
- **routers**: Setup and configuration for API routes.
- **servers**: Entry point for the server and its configurations.
- **utils**: Helper functions and utilities for general purposes.
- **tests**: Test suites for the application's use cases and infrastructure.

## Code Partitioning and Sharing
- **common**: Contains code that is shared across multiple layers of the application.
- **backend**: Contains code that is specific to the backend layer of the application.
- **frontend**: Contains code that is specific to the frontend layer of the application (Not implemented yet).

## Technologies
List the technologies, frameworks, and libraries used in the project, for example:

- Node.js
- Express.js
- TypeScript
- MongoDB
- Jest (for testing)

## Design Philosophy

### Why Clean Architecture?
Clean Architecture was chosen as the design pattern for the Marketplace application for several reasons:

1. **Separation of Concerns:** Clean Architecture enforces separation of concerns by dividing the software into layers. Each layer has distinct responsibilities which means that the business logic is decoupled from the interfaces, and the data models are separated from the business rules. This results in a system that is easier to maintain and evolve.

2. **Independence of UI and Database:** By not depending on the UI or the database, the system’s business rules can be tested without the UI, database, web server, or any other external element.

3. **Testability:** With business logic independent of UI and external interfaces, the core logic of the application can be tested without any dependencies. This results in a more reliable and maintainable code base.

4. **Flexibility:** The application's business rules don’t know anything about the outside world, making the system flexible to change. For instance, if you need to change your database or your web framework, it won’t affect the business rules.

5. **Scalability:** As the application grows, Clean Architecture makes it easier to scale because different teams can work on different layers without stepping on each other's toes.

6. **Reusable Business Logic:** The decoupling of business logic from other layers allows for reusability across different parts of the application or even in different projects.

7. **Framework Independent:** The architecture doesn’t lock you into a specific framework, allowing decisions about frameworks and tools to be made based on the needs at different layers of the architecture.

By following the guidelines of Clean Architecture, we aim to produce a system that is independent, testable, and maintainable, with a focus on the longevity and evolution of the application over time.

For this simple application, we do not really need to adopt this architecture. People may find it too overkilled for such an application. However, the purpose of this project is to demonstrate the use of Clean Architecture in a real-world application for the benefit of the other members in my project group.


### Abstraction
#### 1. Repository and Data Access Layer
- A _Repository_ is an abstraction of the data access layer. It defines the interface for the data access layer and is implemented by the infrastructure layer. The interface is technology independent, meaning that the business logic doesn't know anything about the database or the data access layer. This allows for flexibility and scalability as the application grows. 
- In this application, there is an implementation for using MongoDB as the database. The implementation class is called _MongoDBRepository_.
- Potentionally, other implementations can be added for different databases, such as MySQL, PostgreSQL, etc. without affecting the business logic.
#### 2. Use Cases and Interactors
- A _UseCase_ is a definition of a business rule or a business process. It is independent of the data access layer and the UI. It depends on the Repository interface for data access.
- An _Interactor_ is an implementation of a _use case_. It contains the actual business logic and code for the _UseCase_ and is independent of the data access layer. It depends on the Repository interface for data access.
- In this application, _UseCases_ and _Interactors_ may sometimes be used interchangeably. This is because the _UseCases_ are the definitions and the _Interactors_ are the implementations. An _Interactor_ is a concrete object which can be executed, while a _UseCase_ is an abstract interface that cannot be executed.
- All programming logic in the _Interactors_ are technology independent. They do not need to be changed when technology changes. They only need to be changed when the business rules change.
#### 3. Naming Convention
- Program classes or functions with their names starting or ending with the name of a specific technology are technology dependent. For examples, _MongoDBRepository_, _ExpressApiRouter_, _ExpressServer_, _AxiosUseCaseInteractors_, etc.

### Unit Testing
- This application is complemented with comprehensive unit tests for the use cases and the infrastructure layer. Roughly 80% of the code is covered by unit tests.
- Unit tests are essential for the furture development and continuous improvement of the application. They ensure that the application works as expected when changes are made.

### Further Considerations
- Not array the terminology in Robert Martin's orginal version of Clean Architecture are used here. How the directories are named and organized are subject to changes.
- As Typescript is not my primary programming language, I am still exploring different ways to model the application. The application will subject to changes as I understand more about Typescript.
- The completion of the frontend part of the application will provide a complete demonstration of the Clean Architecture.
