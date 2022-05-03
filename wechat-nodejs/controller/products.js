const _ = require("lodash"),
  crypto = require("crypto"),
  // logger = require('../common/logger'),
  tool = require("../common/tool"),
  models = require("../models"),
  Op = models.Sequelize.Op;
const listAttributes = [
  "id",
  "name",
  "icon",
  "swiperImage",
  "max_amount",
  "rates",
  "time_limit",
  "repayment_method",
  "repayment_early",
  "gather_method",
  "follow",
  "status",
  "updated_time",
  "created_time",
]
class ProductsController {
  /** 获取字典分页数据*/
  
  async getProductsPage(req, res, next) {
    let offset = +req.query.pageNow || 0,
      limit = +req.query.pageSize || 15;

    const data = await models.products.findAndCountAll({
      attributes: listAttributes,
      where: tool.setWhereParams(req.query),
      order: [["updated_time", "DESC"]],
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
  async findProduct(req, res, next) {
    let id = req.params.id;
    const data = await models.products.findOne({ where: { id: id,follow: 1 } });
    ProductsController.setReturnRes(res, data, "获取", true);
  }
  async previewProduct(req, res, next) {
    let id = req.params.id;
    const data = await models.products.findOne({ where: { id: id } });
    ProductsController.setReturnRes(res, data, "获取", true);
  }
  // 用户获取产品轮播图
  async getSwiperProduct(req, res, next) {
    const data = await models.products.findAndCountAll({
      attributes: listAttributes,
      where: { follow: "1", status: "1" },
      order: [["updated_time", "DESC"]],
    });
    ProductsController.setReturnRes(res,  data.rows, "获取", true);
  }
  // 用户获取产品列表
  async getNoSwiperProduct(req, res, next) {
    let offset = +req.query.pageNow || 0,
      limit = +req.query.pageSize || 15;
    const data = await models.products.findAndCountAll({
      attributes: listAttributes,
      where: { status: "1" },
      order: [["updated_time", "DESC"]],
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
  async updateProductFollow(req, res, next) {
    let id = req.params.id;
    if (req.body.follow === "1") {
      const count = await models.products.count({ where: { follow: "1" } });
      if (count > 6) {
        ProductsController.setReturnRes(
          res,
          false,
          "轮播产品最多设置6个！",
          false,
          false
        );
      } else {
        // 检查是否传了轮播图
        const item = await models.products.findOne({ where: { id: id } });
        if (!item.swiperImage) {
          ProductsController.setReturnRes(
            res,
            false,
            "请先上传该产品的轮播图！",
            false,
            false
          );
        } else {
          const data = await models.products.update(req.body, {
            where: { id: id },
          });
          console.log(data, "updateProductFollow");
          ProductsController.setReturnRes(
            res,
            data.length > 0 ? true : false,
            "设置成功",
            false
          );
        }
      }
    } else {
      const data = await models.products.update(req.body, {
        where: { id: id },
      });
      ProductsController.setReturnRes(
        res,
        data.length > 0 ? true : false,
        "设置成功",
        true
      );
    }
  }

  /** 删除字典 */
  async deleteProducts(req, res, next) {
    let id = req.params.id;
    await models.products.destroy({
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
  async addProducts(req, res, next) {
    let resultBl = await models.products.create(req.body);
    ProductsController.setReturnRes(
      res,
      resultBl.dataValues ? true : false,
      "新增"
    );
  }

  async updateProducts(req, res, next) {
    let resultBl = await models.products.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    ProductsController.setReturnRes(
      res,
      resultBl.length > 0 ? true : false,
      "修改"
    );
  }
  static setReturnRes(
    res,
    resultBl,
    message,
    returnData = false,
    mixMsg = true
  ) {
    if (resultBl) {
      res.send({
        code: 200,
        message: message + "成功",
        result: returnData ? resultBl : "",
        success: true,
        timestamp: Date.now(),
      });
    } else {
      res.send({
        code: 500,
        message: mixMsg ? message + "失败" : message,
        result: resultBl,
        success: false,
        timestamp: Date.now(),
      });
    }
  }
}

module.exports = new ProductsController();
