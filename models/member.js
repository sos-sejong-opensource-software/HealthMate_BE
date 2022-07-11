const Sequelize = require('sequelize');

module.exports = class Member extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            approval: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            privilege: {
                type: Sequelize.SMALLINT(1),
                allowNull: false,
                defaultValue: 0
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Member',
            tableName: 'members',
            paranoid:  false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    static associate(db) {}
}