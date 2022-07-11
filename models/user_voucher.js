const Sequelize = require('sequelize');

module.exports = class User_Voucher extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            approval: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            remaining_use_count: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            remaining_cancel_count: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            modelName: 'User_Voucher',
            tableName: 'user_vouchers',
            paranoid:  false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    static associate(db) {}
}