# Forum API

A robust and scalable backend API for a forum application. This project is built using **Node.js**, **Express**, and **PostgreSQL**, strictly adhering to **Clean Architecture** principles and **Test-Driven Development (TDD)** methodologies.

## 🚀 Features

*   **User Management & Authentication**
    *   User registration with password hashing (`bcrypt`).
    *   Secure login with JWT (Access Token and Refresh Token).
    *   Token refresh and logout capabilities.
*   **Thread Management**
    *   Create a new thread (requires authentication).
    *   View detailed thread information (public access).
*   **Comment Management**
    *   Add comments to a specific thread (requires authentication).
    *   Soft delete comments (only the owner can delete their comments).
*   **Reply Management**
    *   Add replies to a specific comment (requires authentication).
    *   Soft delete replies (only the owner can delete their replies).
*   **Data Integrity & Presentation**
    *   Soft-deleted comments and replies are masked with `**komentar telah dihapus**` and `**balasan telah dihapus**` when fetching thread details.
    *   Chronological sorting of comments and replies.

## 📡 API Endpoints

Here is the complete list of available endpoints in this API. 
*Note: Endpoints marked with 🔒 require a valid Bearer Token in the `Authorization` header.*

### Users & Authentications
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/users` | Register a new user | |
| `POST` | `/authentications` | Login and get tokens | |
| `PUT` | `/authentications` | Refresh the access token | |
| `DELETE` | `/authentications` | Logout and invalidate refresh token | |

### Threads
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/threads` | Create a new thread | 🔒 |
| `GET` | `/threads/:threadId` | Get detailed information of a thread | |

### Comments
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/threads/:threadId/comments` | Add a comment to a thread | 🔒 |
| `DELETE` | `/threads/:threadId/comments/:commentId` | Soft delete a specific comment | 🔒 |

### Replies
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/threads/:threadId/comments/:commentId/replies` | Add a reply to a comment | 🔒 |
| `DELETE` | `/threads/:threadId/comments/:commentId/replies/:replyId` | Soft delete a specific reply | 🔒 |

## 🛠️ Tech Stack

*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** PostgreSQL
*   **Query Builder / Driver:** `pg`
*   **Migrations:** `node-pg-migrate`
*   **Security:** `bcrypt`, `jsonwebtoken`
*   **Dependency Injection:** `instances-container`
*   **Testing:** `vitest`, `supertest` (Unit & Integration Tests)
*   **Linter:** ESLint

## 🏗️ Architecture Overview

This project implements **Clean Architecture** to separate concerns, making the codebase highly testable, maintainable, and independent of external frameworks. The layers include:

1.  **Entities (Enterprise Business Rules):** Contains core business objects and validation rules (e.g., `NewThread`, `RegisteredUser`).
2.  **Use Cases (Application Business Rules):** Orchestrates the flow of data to and from the entities (e.g., `AddThreadUseCase`, `GetThreadDetailUseCase`).
3.  **Interface Adapters:** Bridges the Use Cases and the external world. Includes Controllers/Handlers (Express routes) and Repositories (PostgreSQL implementations).
4.  **Frameworks & Drivers:** The outermost layer containing external tools like Express server, Database connections, and JWT services.

## 💻 Prerequisites

Ensure you have the following installed on your local machine:
*   [Node.js](https://nodejs.org/) (LTS version recommended)
*   [PostgreSQL](https://www.postgresql.org/)

## ⚙️ Installation & Setup

1.  **Clone the repository**
```bash
    git clone https://github.com/ops237/forum-api
    cd forum-api
   ```

2.  **Install dependencies**
```bash
    npm install
   ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory for development, and a `.test.env` file for testing. Use the following template:

   **`.env`**
```env
    # HTTP SERVER
    HOST=localhost
    PORT=3000

    # POSTGRES
    PGHOST=localhost
    PGUSER=postgres
    PGDATABASE=forumapi
    PGPASSWORD=supersecretpassword
    PGPORT=5432

    # TOKENIZE
    ACCESS_TOKEN_KEY=your_super_secret_access_token_key
    REFRESH_TOKEN_KEY=your_super_secret_refresh_token_key
    ACCCESS_TOKEN_AGE=3000
   ```

   **`.test.env`**
```env
    # POSTGRES TEST
    PGHOST=localhost
    PGUSER=postgres
    PGDATABASE=forumapi_test
    PGPASSWORD=supersecretpassword
    PGPORT=5432
   ```

4.  **Database Migration**
    Create the necessary tables in your PostgreSQL database.
```bash
    # For development database
    npm run migrate up

    # For testing database
    npm run migrate:test up
   ```

## 🚀 Running the Application

*   **Development mode (with nodemon):**
```bash
    npm run start:dev
   ```
*   **Production mode:**
```bash
    npm run start
   ```

The server will run on `http://localhost:3000` (or the port specified in your `.env` file).

## 🧪 Testing

This project utilizes `vitest` for both Unit and Integration testing.

*   **Run all tests:**
```bash
    npm run test
   ```
*   **Run tests in watch mode:**
```bash
    npm run test:watch
   ```
*   **Run tests with coverage report:**
```bash
    npm run test:coverage
   ```

## 📝 License

This project is licensed under the ISC License.

---
## 👨‍💻 Penulis

**Irfan Maulana Saputra**
*Fullstack Developer | Backend Engineer*

- GitHub: [github.com/ops237](https://github.com/ops237)
- Web: [Wabotku.site](https://wabotku.site)
