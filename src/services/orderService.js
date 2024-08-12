// services/orderService.js

import Order from '../models/order.js';
import OrderItem from '../models/orderitem.js';
import Product from '../models/product.js';
import sequelize from '../config/database.js';


export const createOrder = async (userId, items) => {
  return await sequelize.transaction(async (t) => {
    // ตรวจสอบสินค้าคงคลัง
    for (const item of items) {
      const product = await Product.findOne({
        where: { id: item.id }, // อ้างอิงสินค้าโดยใช้ productId
      });

      if (!product || product.quantity < item.quantity) {
        throw new Error(`Product ${item.name} is out of stock or insufficient quantity`);
      }
    }

    // สร้างคำสั่งซื้อใหม่ (Order)
    const order = await Order.create(
      {
        userId,
        sumPrice: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      },
      { transaction: t }
    );

    // สร้างรายการสินค้าในคำสั่งซื้อ (OrderItem)
    for (const item of items) {
      await OrderItem.create(
        {
          orderId: order.id,
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        },
        { transaction: t }
      );

      // อัปเดตจำนวนสินค้าคงคลังใน Product
      await Product.update(
        { quantity: sequelize.literal(`quantity - ${item.quantity}`) }, // ลดจำนวนสินค้า
        { where: { id: item.id }, transaction: t }
      );
    }

    return order; // ส่งคำสั่งซื้อกลับมา
  });
};
