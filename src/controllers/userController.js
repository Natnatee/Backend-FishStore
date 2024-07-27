import { createUser } from '../services/userService.js';

export const addUser = async (req, res) => {
  const { email, name, password, role } = req.body;

  try {
    const newUser = await createUser({ email, name, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
