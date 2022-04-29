'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        /**登录用户名 */
        login_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**登录密码 */
        login_password: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**用户真实名称 */
        real_name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        is_enabled: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1
        },
        created_time: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('created_time')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updated_time: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updated_time')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        freezeTableName: true, // 使用自定义表名
        createdAt: 'created_time',
        updatedAt: 'updated_time'
    });

    return User;
};