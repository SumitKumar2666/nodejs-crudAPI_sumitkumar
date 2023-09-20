const UserDetails = require('../model/userDetails');

// Create a new user
const create = async (req, res) => {
    try {
      const user = await UserDetails.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  // Retrieve all users
const findAll = async (req, res) => {
    try {
      const users = await UserDetails.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  // Retrieve a user by ID
const findById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UserDetails.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  // Update a user by ID
const update = async (req, res) => {
    const { id } = req.params;
    try {
      const [updated] = await UserDetails.update(req.body, {
        where: { id },
      });
      if (updated) {
        const updatedUser = await UserDetails.findByPk(id);
        return res.status(200).json(updatedUser);
      }
      throw new Error('User not found');
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  // Delete a user by ID
const dlt = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await UserDetails.destroy({
        where: { id },
      });
      if (deleted) {
        return res.status(204).json({'Message':'User deleted successfully', user:deleted}); //success msg not coming
      }
      throw new Error('User not found');
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
module.exports = {create, findById, findAll, update, dlt};