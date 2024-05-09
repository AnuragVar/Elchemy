import Customer from "../models/customer.model.js";

async function isUserCustomerOwner(userId, customer) {
  return customer && customer.owner.toString() === userId.toString();
}

const getCustomerById = async (req, res) => {
  try {
    const { customerId } = req.params;
    const userId = req.user._id; // Assuming user data is available in req.user

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    // Check if user owns the customer
    if (!(await isUserCustomerOwner(userId, customer))) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const userId = req.user._id;
    const customers = await Customer.find({ owner: userId });

    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new customer for the logged-in user
const createCustomer = async (req, res) => {
  try {
    const userId = req.user._id;
    const newCustomer = new Customer({
      ...req.body, // Copy request body data
      owner: userId, // Set owner as logged-in user
    });

    await newCustomer.save();

    res.status(201).json(newCustomer);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error creating customer" });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const userId = req.user._id;
    const updates = req.body;

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    // Check if user owns the customer
    if (!(await isUserCustomerOwner(userId, customer))) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    customer = await Customer.findByIdAndUpdate(customerId, updates, {
      new: true, // Return the updated document
    });

    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Error updating customer" });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const userId = req.user._id;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Check if user owns the customer
    if (!(await isUserCustomerOwner(userId, customer))) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    await Customer.findByIdAndDelete(customerId);
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", err });
  }
};
export {
  getCustomerById,
  deleteCustomer,
  createCustomer,
  getAllCustomers,
  updateCustomer,
};
