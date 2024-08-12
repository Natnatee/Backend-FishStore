import { createProduct, productAll } from '../services/productService.js';

export const addProduct = async (req, res) => {
  const { name, type, price, quantity, description, image, status } = req.body;

  try {
    const newProduct = await createProduct({ name, type, price, quantity, description, image, status });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAll = async (req, res) => {
  try {
    const allProducts = await productAll();

    // ตั้งค่า Cache-Control header
    res.set('Cache-Control', 'public, max-age=60'); // Cache ข้อมูล 60 วินาที

    // ส่งข้อมูลผลิตภัณฑ์กลับไปยัง client
    res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);

    // ส่งข้อผิดพลาดกลับไปยัง client
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
