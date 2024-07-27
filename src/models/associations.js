import User from './user.js';
import Product from './product.js';
import Order from './order.js';
import OrderItem from './orderitem.js';

// ตั้งค่าความสัมพันธ์ระหว่างโมเดล
const setAssociations = () => {
  User.hasMany(Order, { foreignKey: 'userId' });
  Order.belongsTo(User, { foreignKey: 'userId' });

  Order.hasMany(OrderItem, { foreignKey: 'orderId' });
  OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

  Product.hasMany(OrderItem, { foreignKey: 'productId' });
  OrderItem.belongsTo(Product, { foreignKey: 'productId' });
};

export default setAssociations;
//hasmany คือ 1 มีได้หลายตัว
//belongto คือ หลายตัว เป็นของ1เดียวกันได้ ใช้คู่กัน เพื่อเพิ่มความชัดเจนในการลิ้ง table ด้วย foreignkey