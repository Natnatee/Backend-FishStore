import User from '../models/user.js';

export const createUser = async ({ email, name, password, role }) => {
  try {
    const newUser = await User.create({ email, name, password, role });
    return newUser;
  } catch (error) {
    throw error;
  }
};
