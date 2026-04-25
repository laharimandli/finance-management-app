Finance Management Application
-------------------------------
A full-stack Finance Management Mini Application built with React + Mantine UI for the frontend and Spring Boot for the backend.

1.Technology Stack
-------------------
Frontend       React + Mantine UI + Axios
Backend        Spring Boot (Java)
Database       PostgreSQL
Build Tool     Maven

2.Prerequisites
---------------
you have these installed:
- Java 17+
- Node.js 20+
- PostgreSQL 17
- Maven
- Git

3.Setup Instructions
---------------------
Step 1 — Database Setup
Open pgAdmin or SQL Shell and run:
sql:
CREATE DATABASE financedb;

Step 2 — Backend Setup
1. Open 'finance-backend' folder in IntelliJ IDEA
2. Update 'src/main/resources/application.properties'
3. Run the application:
 - Open 'FinanceBackendApplication.java'
 - Click the Green Play button
4. Verify backend is running:
    
Step 3 — Frontend Setup
1. Open terminal and navigate to frontend folder:
           bash: cd finance-frontend
2. Install dependencies:
           bash: npm install
3. Install Mantine UI and Axios:
           bash: npm install @mantine/core @mantine/hooks axios
4. Run the application:
           bash: npm run dev
5. Open browser

4.API Details
--------------
Base URL
http://localhost:8080/finance

Endpoints
    1.GET- /finance - Get all records
    2.GET - /finance/{id} - Get record by ID
    3.POST - /finance - Create new record
    4.PUT - /finance/{id} - Update record
    5.DELETE - /finance/{id} - Delete record

5.Sorting
----------
Sort records by passing query parameters:

GET /finance?sortBy=amount&sortDir=desc
GET /finance?sortBy=date&sortDir=asc
GET /finance?sortBy=userName&sortDir=asc

Supported sort fields:
- userName
- amount
- date

6.Request Body (POST / PUT):
---------------------------
json
{
    "userName": "John",
    "type": "INCOME",
    "category": "Salary",
    "amount": 5000.00,
    "description": "Monthly salary",
    "date": "2024-01-15"
}

7.Response Body:
----------------
json
{
    "createdDate": "2024-01-15T10:30:00",
    "createdBy": "admin",
    "editedDate": null,
    "editedBy": null,
    "id": 1,
    "userName": "John",
    "type": "INCOME",
    "category": "Salary",
    "amount": 5000.0,
    "description": "Monthly salary",
    "date": "2024-01-15"
}

8.Features
-----------
Backend Features:
- REST API with 5 endpoints
- CRUD operations (Create, Read, Update, Delete)
- Sorting support by userName, amount, date
- Audit fields (createdDate, createdBy, editedDate, editedBy)
- PostgreSQL database integration
- JPA with Hibernate

Frontend Features:
- Dynamic table with dynamic columns
- Color coded badges (green for INCOME, red for EXPENSE)
- Amount highlighted in green for INCOME, red for EXPENSE
- Edit record with pre-filled form
- Delete record with confirmation popup
- Sorting by clicking column headers
- Loading states
- Error handling
- Axios integration with backend

9.Running the Complete Application
------------------------------------
Make sure all three services are running:

PostgreSQL    5432   pgAdmin connected
Spring Boot   8080   http://localhost:8080/finance
React         5173   http://localhost:5173

12.Keywords Reference
----------------------
- Spring Boot CRUD API
- JPA sorting example
- React dynamic table
- Mantine UI table
- React CRUD with Axios
