import Product from '../models/product.js';

export const createProduct = async ({ name, type, price, quantity, description, image, status }) => {
  try {
    const newProduct = await Product.create({ name, type, price, quantity, description, image, status });
    return newProduct;
  } catch (error) {
    throw error;
  }
};

export const productAll = async () => {
  try {
    const products = await Product.findAll();
    return products
  } catch (error) {
    throw error;
  }
}