// nơi lưu cấu trúc kết nối CSDL
import { Sequelize } from "sequelize";

import config from '../config/config.js';

let sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port
});

export default sequelize;
// yarn add sequelize-auto

// yarn sequelize-auto -h localhost -d db_food -u root -x 1234 -p 3306 --dialect mysql -o src/models -l esm

