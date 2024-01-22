## Team project - Power Pulse 
### Team 6
### Backend

Welcome to the Power Pulse project! This Node.js backend application provides the core functionality for the Power Pulse web application, allowing you to explore and manage your sports activity and nutrition. Using this backend users can create accounts, select different physical activities, count calories burned, track time spent in physical activity and calculate the number of calories consumed with a particular meal.

## Table of Contents

- [Frontend](#frontend)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-docs)
- [Contributors](#contributors)

## <a id="frontend">Frontend</a>

- [GitHub](https://github.com/Sokilskill/project-daily-energy-dose)
- [Live page](https://sokilskill.github.io/project-daily-energy-dose/)

## <a id="features">Features</a>

The Power Pulse backend provides a set of functions that allow users to interact with the system through API endpoints (see [Usage](#usage)):

- Creating and authenticating a user account
- Add and delete consumed products
- View and search for exercise activities
- Secure and efficient backend based on Node.js

## <a id="getting-started">Getting Started</a>

### <a id="prerequisites">Prerequisites</a>

Before you can run the Power Pulse backend, you'll need to have the following software installed on your system:

- Node.js - JavaScript runtime
- npm or Yarn - Package manager for Node.js

### <a id="installation">Installation</a>

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/ectionboy/power-pulse-6-backend 
   ```
2. Change your current directory to the project folder:
   ```
   cd power-pulse-6-backend
   ```
3. Install the project dependencies:
   ```
   npm install
   or
   yarn install
   ```
4. Configure the environment variables. You will need to create a .env file in the project root and define the required variables (e.g., database connection details, API keys, etc) - see `.env.example` for required variables.
5. Start the server:
   ```
   npm run start:dev
   or
   yarn run start:dev
   ```

Your Power Pulse backend should now be running and accessible at `http://localhost:3000` (if you set the PORT `.env` variable as 3000).

## <a id="usage">Usage</a>

Here are some example use cases of the Power Pulse backend:

- To create a new user account, send a POST request to `/auth/register`.
- To authenticate a user, send a POST request to `/auth/login`.
- To get the current user, send a GET request to `/auth/current`.
- To logout a user, send a POST request to `/auth/logout`.
- To update a user's name, send a PATCH request to `/users`.
- To update a user's avatar, send a PATCH request to `/users/avatars`.
- To get a list of products, send a GET request to `/food`.
- To get product categories, send a GET request to `/food/categories`.
- To get a user's diary by date, send a GET request to `/diary/{userId}/{date}`.
- To delete a user's meals by ID, send a DELETE request to `/diary/delete-entry`.
- To get a user's profile, send a GET request to `/profiles`.
- To update a user's profile, send a PUT request to `/profiles`.
- To get a list of filtered exercises, send a GET request to `/exercises`.
- To get grouped categories, send a GET request to `/exercises/current/{exerciseId}`.
- To get a list of exercises for current user, send a GET request to `/exercises/current/{exerciseId}`.
- To get basic statistics, send a GET request to `/statistics`.

These endpoints allow you to interact with various features on the Power Pulse backend, including user management, nutrition and exercise management, and access to filters and categories.

## <a id="api-docs">API Documentation</a>

For detailed API documentation or tests, please refer to the [Swagger API Documentation](https://power-pulse-6-backend.onrender.com/api-docs/#/).
The first opening may be long, because free render.com service is used for backend deployment.

## <a id="contributors">Contributors</a>

This project was made possible by the hard work and dedication of the following team members:

Backend:

- Ostap Revutsky - Team Lead Backend / Developer
  - [GitHub](https://github.com/ectionboy)
  - [LinkedIn](https://www.linkedin.com/in/ostap-revutskyi-1b809b297/)
- Oleksandr Tsurkan - Key Backend Developer
  - [GitHub](https://github.com/OleksandrTsurkan)
  - [LinkedIn](https://www.linkedin.com/in/oleksandr-tsurkan/)
- Denys Muratov - Backend Developer
  - [GitHub](https://github.com/DenysVM)
  - [LinkedIn](https://www.linkedin.com/in/denys-muratov)
- Maryna Ozkara - Backend Developer
  - [GitHub](https://github.com/MarynaOzkara)
  - [LinkedIn](https://www.linkedin.com/in/maryna-ozkara/)
Frontend:
- Serhii Sokolovskyi - Team Lead Frontend / Developer
  - [GitHub](https://github.com/Sokilskill)
  - [LinkedIn](https://www.linkedin.com/in/sergiisokolovskyi/)
- Nazar Martsyniuk - Scrum Master
  - [GitHub](https://github.com/Nazar0105)
  - [LinkedIn](www.linkedin.com/in/nazar-marcyniuk)
- Anatolii Klepach - Frontend Developer
  - [GitHub](https://github.com/Chapelk1)
  - [LinkedIn](https://www.linkedin.com/in/anatolii-klepach/)
- Pavlo Lystopad - Frontend Developer
  - [GitHub](https://github.com/Lyst67)
  - [LinkedIn](https://www.linkedin.com/in/pavlo-lystopad/)
- Tymur Qayoom - Frontend Developer
  - [GitHub](https://github.com/TymQa)
  - [LinkedIn](https://www.linkedin.com/in/tymurqayoom/)
- Vitaliya Ovechko - Frontend Developer
  - [GitHub](https://github.com/VitaliyaOvechko)
  - [LinkedIn](https://www.linkedin.com/in/vitaliya-%D0%BEvechko/)
- Olha Poberezhna - Frontend Developer
  - [GitHub](https://github.com/opoberezh)
  - [LinkedIn](https://www.linkedin.com/in/olha-poberezhna/)
- Demchenko Marianna - Frontend Developer
  - [GitHub](https://github.com/Manja2012)
  - [LinkedIn](https://www.linkedin.com/in/marianna-demchenko/)


**A big thank you to our team for their contributions to this project!**