// controllers/orderController.js

import Order from '../models/order.js';
import OrderItem from '../models/orderitem.js';
import { createOrder } from '../services/orderService.js';

export const handleCreateOrder = async (req, res) => {
  const { userId, items } = req.body; // รับข้อมูลจาก request body

  try {
    // ใช้ service เพื่อสร้างคำสั่งซื้อ
    const order = await createOrder(userId, items);

    // ดึงข้อมูล order พร้อมรายการ order items
    const orderWithItems = await Order.findOne({
      where: { id: order.id },
      include: [{ model: OrderItem }],
    });

    // ส่งคำสั่งซื้อกลับไปยัง client
    res.status(201).json(orderWithItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};
