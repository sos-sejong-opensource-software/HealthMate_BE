const Sequelize = require('sequelize');

module.exports = class Voucher extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            voucher_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            duration: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            use_count: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            cancel_count: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Voucher',
            tableName: 'vouchers',
            paranoid:  false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        })
    }
    static associate(db) {
        db.Voucher.belongsTo(db.Center, { foreignKey: 'center_id' })
        db.Voucher.belongsToMany(db.User, { through: db.User_Voucher, foreignKey: 'voucher_id' })
    }
}