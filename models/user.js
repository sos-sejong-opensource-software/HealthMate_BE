const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            id: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            phone: {
                type: Sequelize.CHAR(14),
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING(25),
                allowNull: false,
                unique: true
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'User',
            tableName: 'users',
            paranoid:  false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    static associate(db) {
        db.User.belongsToMany(db.Center, { through: db.Member, foreignKey: 'user_id' })
        db.User.belongsToMany(db.Class, { through: 'instructor', foreignKey: 'user_id' })
        db.User.belongsToMany(db.Class_Date, { through: db.Take_Class, foreignKey: 'user_id' })
        db.User.belongsToMany(db.Voucher, { through: db.User_Voucher, foreignKey: 'user_id' })
    }
}