import express from 'express';
import {
  getCustomerById,
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customer.controller.js';
const router = express.Router();

// Get all customers
router.get('/customers', getAllCustomers);

// Get a specific customer by ID
router.get('/customers/:id', getCustomerById);

// Create a new customer
router.post('/customers', createCustomer);

// Update an existing customer
router.put('/customers/:id', updateCustomer);

// Delete a customer
router.delete('/customers/:id', deleteCustomer);

export default router;