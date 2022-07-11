const Sequelize = require('sequelize');

module.exports = class Take_Class extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            take: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Take_Class',
            tableName: 'take_classes',
            paranoid:  false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    static associate(db) {}
}