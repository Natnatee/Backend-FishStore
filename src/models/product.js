import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: { // ฟิลด์สำหรับเก็บ URL ของรูปภาพ
    type: DataTypes.STRING,
    allowNull: true
  },
  status: { // ฟิลด์ใหม่สำหรับเก็บสถานะของสินค้า
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'available' // กำหนดค่าเริ่มต้นเป็น 'available'
  }
}, {
  tableName: 'products',
  timestamps: false
});

export default Product;
