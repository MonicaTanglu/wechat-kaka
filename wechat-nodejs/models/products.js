'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    let Products = sequelize.define('products', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        /**产品名称 */
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        /**产品icon,右侧显示的图片 */
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        // 走马灯图片
        swiperImage: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        /**最高额度 单位万元 */
        max_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: ''
        },
        rates: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        time_limit: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '' 
        },
        repayment_method: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '' 
        },
        repayment_early: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '' 
        },
        gather_method: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '' 
        },
        apply_condition: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '' 
        },
        ratepaying_demand: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '' 
        },
        prohibit_industry: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '' 
        },
        enter_area: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '' 
        },
        apply_material: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '' 
        },
        apply_procedure: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '' 
        },
        qrCode: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '' 
        },
        follow: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0' 
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '0' // 0未发布 1已发布
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

    return Products;
};