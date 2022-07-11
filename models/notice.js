const Sequelize = require('sequelize');

module.exports = class Notice extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            notice_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT('medium'),
                allowNull: false,
            },
            important: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
        }, {
            sequelize,
            timestamps: true,
            modelName: 'Notice',
            tableName: 'notices',
            paranoid:  false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        })
    }
    static associate(db) {
        db.Notice.belongsTo(db.Center, { foreignKey: 'center_id' })
    }
}