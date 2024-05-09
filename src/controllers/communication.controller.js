import Communication from "../models/communication.model.js";
import Customer from "../models/customer.model.js";

async function isUserCustomerOwner(userId, customerId) {
  const customer = await Customer.findById(customerId);
  return customer && customer.owner.toString() === userId.toString();
}

const getCommunicationsByCustomerId = async (req, res) => {
  try {
    const { customerId } = req.params;
    const userId = req.user._id;

    // Check if user owns the customer
    if (!(await isUserCustomerOwner(userId, customerId))) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const communications = await Communication.find({ customerId });
    res.json(communications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new communication for a customer
const createCommunication = async (req, res) => {
  try {
    const { customerId } = req.params;
    const userId = req.user._id;
    const newCommunication = new Communication({
      customerId,
      timestamp: Date.now(), // Assuming timestamp is included in request body
      ...req.body, // Copy other conversation details from request body
    });

    // Check if user owns the customer (optional, can be added for extra security)
    // if (!await isUserCustomerOwner(userId, customerId)) {
    //   return res.status(403).json({ message: 'Unauthorized access' });
    // }

    await newCommunication.save();
    res.status(201).json(newCommunication);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating communication" });
  }
};

// Get a customer's email address by ID (for logged-in user's customer)
const getCustomerEmailById = async (req, res) => {
  try {
    const { customerId } = req.params;
    const userId = req.user._id;

    // Check if user owns the customer
    if (!(await isUserCustomerOwner(userId, customerId))) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Consider adding email validation here (e.g., using a regular expression)
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(customer.email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    res.json({ email: customer.email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const sendCustomerEmail = async (req, res) => {
  try {
    const { customerId } = req.params;
    const userId = req.user._id;

    // Check if user owns the customer
    if (!(await isUserCustomerOwner(userId, customer))) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Consider adding email validation here (same as getCustomerEmailById)
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(customer.email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const email = customer.email;
    const { subject, message } = req.body; // Assuming subject and message are in request body

    await sendEmail(email, "Verify Email", message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  sendCustomerEmail,
  createCommunication,
  getCommunicationsByCustomerId,
  getCustomerEmailById,
};
