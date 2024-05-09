import express from 'express';
import {
  getCommunicationsByCustomerId,
  createCommunication,
  getCustomerEmailById,
  sendCustomerEmail,
} from '../controllers/communication.controller.js';
// ... other routes (from previous response)

const router = express();
// Get communication history for a customer
router.get('/customers/:id/communications', getCommunicationsByCustomerId);

// Create a new communication for a customer
router.post('/customers/:id/communications', createCommunication);

// Get a customer's email address by ID
router.get('/customers/:customerId/email', getCustomerEmailById);

// Send an email to a customer
router.post('/customers/:customerId/email', sendCustomerEmail);

export default router;