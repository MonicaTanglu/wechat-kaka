"use strict";
/**
 * router 主要用来描述请求 URL 和具体承担执行动作的 Controller 的对应关系，
 * 框架约定 router.js 文件用于统一所有路由规则。
 * 通过统一的配置，我们可以避免路由规则逻辑散落在多个地方，从而出现未知的冲突，集中在一起可以更方便的来查看全局的路由规则。
 */
const router = require("express").Router(),
  auth = require("./middleware/auth"),
  login = require("./controller/login"),
  products = require("./controller/products"),
  system = require("./controller/system");

// dict = require('./controller/dict'),
// main = require('./controller/main');

//登录
// router.get('/login', login.showLogin);
router.post("/api/login", login.login);
router.get("/logout", login.logout);

// router.get('/main', auth.loginRequired, main.showMain);

//用户管理
// router.get('/system/userList', auth.authUserPermission, system.showUserList);
router.get("/system/getUserPage", auth.loginRequired, system.getUserPage);
// router.get('/system/userEdit/:id', auth.authUserPermission, system.showUserEdit);
router.post("/system/userEdit/:id", auth.loginRequired, system.saveUserEdit);
router.delete("/system/deleteUser/:id", auth.loginRequired, system.deleteUser);
// router.get('/system/getUserBranchRole', auth.loginRequired, system.getUserBranchRole)
router.put("/system/resetPwd/:id", auth.loginRequired, system.resetPwd);
router.put("/system/updatePwd", auth.loginRequired, system.updatePwd);

// 产品管理
router.get(
  "/products/getProductsPage",
  auth.loginRequired,
  products.getProductsPage
);
router.post("/products/add", auth.loginRequired, products.addProducts);
router.post(
  "/products/delete/:id",
  auth.loginRequired,
  products.deleteProducts
);
router.put("/products/edit/:id", auth.loginRequired, products.updateProducts);
router.get("/product/:id", products.findProduct);
router.put("/products/follow/:id",auth.loginRequired,products.updateProductFollow)

router.get("/products/swiper",products.getSwiperProduct),
router.get("/products/list",products.getNoSwiperProduct),
router.get("/product/detail/:id",products.findProduct),
router.get("/product/preview/:id",auth.loginRequired,products.previewProduct)
// 未找到路由
router.use((req, res) => {
  res.render("404");
});
module.exports = router; //导出
