const Sequelize = require('sequelize');

module.exports = class Admin extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            admin_id: {
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
                type: Sequelize.CHAR(11),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(25),
                allowNull: false,
            },
            user_pw: {
                type: Sequelize.STRING(100),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Admin',
            tableName: 'admins',
            paranoid:  false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    static associate(db) {
        db.Admin.hasMany(db.Center, { foreignKey: 'admin_id', onDelete: 'CASCADE' })
    }
}