import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import { setupAntd } from "./ant-design-vue";
import store from "./store/index";
import "./style/theme.less";
// import '../mock/mock'
import filters from "./utils/filters";
// import { createRouterGuards } from './permission'

import IconFont from "@/components/iconfont/icon";

const app = createApp(App);
app.config.globalProperties.$filters = filters;
app.component("icon-font", IconFont);

setupAntd(app);
app.use(store);
app.use(router);
router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});
// createRouterGuards(router)
// createRouterGuards(router)
router.isReady().then(() => app.mount("#app"));
