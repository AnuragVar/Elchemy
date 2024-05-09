# Elchemy Interview - Contact CRM Assignment

This project implements a basic Contact CRM application with functionalities for managing customer information, communication history, and email sending.

## Prerequisites

- Node.js and npm (or yarn) installed on your system.

## Installation

1. Clone this repository or download the project files.
2. Open a terminal in the project directory.
3. Install dependencies:

 ```bash
 npm install
```

Start the development server:

```bash
npm run dev
```

This will start the server and make your application accessible in your browser, typically at http://localhost:3000 (the exact port might vary depending on your environment).

 ## API Routes
 
# Customers

- GET /customers: Lists all customers for the logged-in user.
- GET /customers/:id: Fetches a specific customer by ID for the logged-in user.
- POST /customers: Creates a new customer for the logged-in user.
- PUT /customers/:id: Updates an existing customer by ID for the logged-in user.
- DELETE /customers/:id: Deletes a customer by ID for the logged-in user.

# Communication (for a specific customer)
- GET /customers/:id/communications: Retrieves communication history for a customer.
- POST /customers/:id/communications: Creates a new communication entry for a customer.

# Email (for a specific customer)
- GET /customers/:customerId/email: Retrieves the customer's email address.
- POST /customers/:customerId/email: Sends an email to the customer (Requires integration with an email sending library like Nodemailer).

# Implementation Notes
This application assumes a user authentication mechanism is in place, and the routes are accessible only to the logged-in user.
User authorization is implemented to restrict access to customer data based on ownership. Only the owner of a customer can view, update, or delete it.
Error handling is incorporated in the controllers to provide informative responses in case of invalid requests or database errors.

# Further Development
Enhance the application with features like:

- User registration and login functionality.
- Secure password storage using hashing techniques.
- Detailed user roles and permissions.
- Support for sending HTML emails.
- Additional communication channels (e.g., SMS).
- Customer search and filtering capabilities.
- Implement unit and integration tests for robust application behavior.

# Disclaimer
This code serves as a sample solution for the interview exercise. It can be further improved and optimized based on project requirements and best practices.

# Author
Anurag Varshney
