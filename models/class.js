const Sequelize = require('sequelize');

module.exports = class Notice extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            class_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            maximum_member: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Class',
            tableName: 'classes',
            paranoid:  false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    static associate(db) {
        db.Class.belongsTo(db.Center, { foreignKey: 'center_id' })
        db.Class.belongsToMany(db.User, { through: 'instructor', foreignKey: 'class_id' })
        db.Class.hasMany(db.Class_Date, { foreignKey: 'class_id', onDelete: 'CASCADE' })
    }
}