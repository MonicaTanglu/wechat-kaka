const fs = require("fs");
const path = require('path')
const _ = require("lodash"),
  crypto = require("crypto"),
  // logger = require('../common/logger'),
  tool = require("../common/tool"),
  models = require("../models"),
  // sequelize = models.Sequelize,
  Op = models.Sequelize.Op;

/** 系统管理控制器 */
class systemController {
  //#region  用户管理

  /** 获取用户分页数据*/
  async getUserPage(req, res, next) {
    let offset = +req.query.offset || 0,
      limit = +req.query.limit || 15;

    const data = await models.user.findAndCountAll({
      where: tool.setWhereParams(req.query),
      limit: limit,
      offset: offset,
    });
    res.send({
      code: 200,
      message: "",
      result: { data: data.rows, total: data.count },
      success: true,
      timestamp: Date.now(),
    });
  }

  /**修改密码 */
  async updatePwd(req, res, next) {
    let userInfo = await models.user.findByPk(req.session.user.id);
    if (
      userInfo.login_password !==
      crypto.createHash("md5").update(req.body.old_password).digest("hex")
    ) {
      res.send({
        code: 500,
        message: "原密码不正确",
        result: "",
        success: false,
        timestamp: Date.now(),
      });
    } else {
      await models.user.update(
        {
          login_password: crypto
            .createHash("md5")
            .update(req.body.new_password)
            .digest("hex"),
        },
        {
          where: {
            id: req.session.user.id,
          },
        }
      );
      res.send({
        code: 200,
        message: "修改成功",
        result: "",
        success: true,
        timestamp: Date.now(),
      });
    }
  }
  /**重置密码 */
  async resetPwd(req, res, next) {
    await models.user.update(
      {
        login_password: crypto.createHash("md5").update("123456").digest("hex"),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send({
      code: 200,
      message: "重置成功",
      result: "",
      success: true,
      timestamp: Date.now(),
    });
  }

  /** 保存编辑用户数据 */
  async saveUserEdit(req, res, next) {
    let id = req.params.id;
    if (id == 0) {
      let branch_id = req.body.branch_id || 0;
      // let branch_model = await models.branch.findByPk(branch_id);

      //检查用户名
      let usr = await models.user.findAll({
        where: {
          login_name: req.body.login_name,
        },
      });
      if (usr.length > 0) {
        res.send({
          code: 500,
          message: "用户名已存在！",
          result: null,
          success: false,
          timestamp: Date.now(),
        });
        return;
      }
      //新增
      await models.user.create({
        login_name: req.body.login_name || "",
        login_password: crypto.createHash("md5").update("123456").digest("hex"),
        branch_id: branch_id,
        branch_name: "",
        position_id: req.body.position_id || "",
        position_name: "",
        real_name: req.body.real_name || "",
        mobile: req.body.mobile || "",
        is_enabled: req.body.is_enabled,
      });
    } else {
      //编辑
      let model = await models.user.findByPk(id);
      if (typeof req.body.login_name !== "undefined") {
        //检查用户名
        let usr = await models.user.findAll({
          where: {
            id: {
              [Op.ne]: id,
            },
            login_name: req.body.login_name,
          },
        });
        if (usr.length > 0) {
          res.send({
            code: 500,
            message: "用户名已存在！",
            result: null,
            success: false,
            timestamp: Date.now(),
          });
          return;
        }
        model.login_name = req.body.login_name;
      }
      if (typeof req.body.branch_id !== "undefined")
        model.branch_id = req.body.branch_id;
      if (typeof req.body.position_id !== "undefined")
        model.position_id = req.body.position_id;
      if (typeof req.body.real_name !== "undefined")
        model.real_name = req.body.real_name;
      if (typeof req.body.mobile !== "undefined")
        model.mobile = req.body.mobile;
      if (typeof req.body.is_enabled !== "undefined")
        model.is_enabled = req.body.is_enabled;
      await model.save();
    }
    res.send({
      code: 200,
      message: "保存成功！",
      result: null,
      success: true,
      timestamp: Date.now(),
    });
  }

  /** 删除用户 */
  async deleteUser(req, res, next) {
    let id = req.params.id;
    await models.user.destroy({
      where: {
        id: id,
      },
    });
    res.send({
      code: 200,
      message: "删除成功！",
      result: null,
      success: true,
      timestamp: Date.now(),
    });
  }

}

module.exports = new systemController();
