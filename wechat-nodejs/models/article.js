'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    let Article = sequelize.define('article', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        /**产品名称 */
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        created_time: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('created_time')).format('YYYY-MM-DD');
            }
        },
        updated_time: {
            type: DataTypes.DATE,
            get() {
                // return moment(this.getDataValue('updated_time')).format('YYYY-MM-DD HH:mm:ss');
                return moment(this.getDataValue('updated_time')).format('YYYY-MM-DD');
            }
        }
    }, {
        freezeTableName: true, // 使用自定义表名
        createdAt: 'created_time',
        updatedAt: 'updated_time'
    });

    return Article;
};