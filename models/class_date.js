const Sequelize = require('sequelize');

module.exports = class Class_Date extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            class_date_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            class_member: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Class_Date',
            tableName: 'class_dates',
            paranoid:  false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    static associate(db) {
        db.Class_Date.belongsToMany(db.User, { through: db.Take_Class, foreignKey: 'class_date_id' })
        db.Class_Date.belongsTo(db.Class, { foreignKey: 'class_id' })
    }
}