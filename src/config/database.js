import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
//เอามาใช้ sequelize มาช่วยจัดการ data เหมือน mongoose
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false 
});

export default sequelize;
