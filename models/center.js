const Sequelize = require('sequelize');

module.exports = class Center extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            center_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            place_name: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            address: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            phone: {
                type: Sequelize.CHAR(11),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Center',
            tableName: 'centers',
            paranoid:  false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    static associate(db) {
        db.Center.belongsToMany(db.User, { through: db.Member, foreignKey: 'center_id' })
        db.Center.hasMany(db.Notice, { foreignKey: 'center_id', onDelete: 'CASCADE' })
        db.Center.hasMany(db.Class, { foreignKey: 'center_id', onDelete: 'CASCADE' })
        db.Center.hasMany(db.Voucher, { foreignKey: 'center_id', onDelete: 'CASCADE' })
    }
}