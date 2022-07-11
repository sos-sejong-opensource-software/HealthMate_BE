const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const User = require('./user');
const Member = require('./member');
const Center = require('./center');
const Notice = require('./notice');
const Class = require('./class');
const Class_Date = require('./class_date');
const Take_Class = require('./take_class');
const Voucher = require('./voucher');
const User_Voucher = require('./user_voucher');


const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Member = Member;
db.Center = Center;
db.Notice = Notice;
db.Class = Class;
db.Class_Date = Class_Date;
db.Take_Class = Take_Class;
db.Voucher = Voucher;
db.User_Voucher = User_Voucher;

User.init(sequelize);
Member.init(sequelize);
Center.init(sequelize);
Notice.init(sequelize);
Class.init(sequelize);
Class_Date.init(sequelize);
Take_Class.init(sequelize);
Voucher.init(sequelize);
User_Voucher.init(sequelize);

User.associate(db);
Member.associate(db);
Center.associate(db);
Notice.associate(db);
Class.associate(db);
Class_Date.associate(db);
Take_Class.associate(db);
Voucher.associate(db);
User_Voucher.associate(db);

module.exports = db;
