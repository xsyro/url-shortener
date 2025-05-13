# Running the URL Shortena App with Docker Compose

This guide provides detailed instructions on how to run the URL Shortena application using Docker Compose. The application consists of a frontend, backend, PostgreSQL and database.

---

## Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Steps to Run the Application

1. **Clone the Repository**  
   Clone the project repository to your local machine:
   ```bash
   git clone https://github.com/xsyro/url-shortener.git
   cd url-shortener-app
2. **Build and Start the Services**
    Use Docker Compose to build and start all services:
    This will:
    - Build the backend and frontend Docker images.
    - Start the backend API on http://localhost:8080.
    - Start the frontend app on http://localhost:3000.
    - Start the PostgreSQL database service.
3. **Access the Application**
    - Open your browser and navigate to http://localhost:3000 to access the frontend.
    - The backend API is available at http://localhost:8080.
4. **Stop the Application**
    To stop the application, press Ctrl+C in the terminal where Docker Compose is running. Then, clean up the containers:
    ```bash
    docker-compose down

## Running Tests
**Backend Tests**
1. Open a terminal and navigate to the backend-api directory:
    ```bash
    cd backend-api
2. Run the tests using Docker: 
    ```bash
    docker-compose run backend npm run test
**Frontend Tests**
1. Open a terminal and navigate to the frontend-app directory:
    ```bash
    docker-compose run frontend npm run test
## Additional Notes
- **Environment Variables:**
The application uses .env files for configuration. Ensure the .env files are correctly set up in the `backend-api` and `frontend-app` directories.
- **Database Access:**
The PostgreSQL database is exposed on port `5432`. You can connect to it using a database client with the credentials specified in the docker-compose.yml file.

- Ensure no other services are running on ports 3000, 8080, 5432, or 6379.