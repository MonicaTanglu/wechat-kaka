const _ = require("lodash"),
  crypto = require("crypto"),
  // logger = require('../common/logger'),
  tool = require("../common/tool"),
  models = require("../models"),
  Op = models.Sequelize.Op;
class ArticleController {
  /** 获取字典分页数据*/
  
  async getArticlePage(req, res, next) {
    let offset = +req.query.pageNow || 0,
      limit = +req.query.pageSize || 15;

    const data = await models.article.findAndCountAll({
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
  async findArticle(req, res, next) {
    let id = req.params.id;
    const data = await models.article.findOne({ where: { id: id} });
    ArticleController.setReturnRes(res, data, "获取", true);
  }
  async previewArticle(req, res, next) {
    let id = req.params.id;
    const data = await models.article.findOne({ where: { id: id } });
    ArticleController.setReturnRes(res, data, "获取", true);
  }
  

  /** 删除字典 */
  async deleteArticle(req, res, next) {
    let id = req.params.id;
    await models.article.destroy({
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
  async addArticle(req, res, next) {
    let resultBl = await models.article.create(req.body);
    ArticleController.setReturnRes(
      res,
      resultBl.dataValues ? true : false,
      "新增"
    );
  }

  async updateArticle(req, res, next) {
    let resultBl = await models.article.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    ArticleController.setReturnRes(
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

module.exports = new ArticleController();
