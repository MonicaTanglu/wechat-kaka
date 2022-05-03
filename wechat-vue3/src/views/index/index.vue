<template>
  <a-card :bordered="false">
    <div class="m-b-20">
      <a-form layout="inline" :model="searchForm" @submit="search">
        <a-form-item label="产品名称">
          <a-input
            v-model:value="searchForm.name"
            placeholder="产品名称"
          ></a-input>
        </a-form-item>
        <a-form-item label="是否轮播">
          <a-select v-model:value="searchForm.follow" placeholder="请选择" style="width: 120px">
            <a-select-option value="1">是</a-select-option>
            <a-select-option value="0">否</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit"
            ><icon-font type="icon-search"></icon-font> 搜索
          </a-button>
          <a-button class="m-l-10" type="danger" @click="reset"
            ><icon-font type="icon-redo"></icon-font> 重置
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary">
        <template #icon><icon-font type="icon-plus"/></template>
        新增</a-button
      >
    </div>

    <div>
      <!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
        已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a
        >项&nbsp;&nbsp;
      </div> -->

      <a-table
        :columns="columns"
        :row-key="(record) => record.id"
        size="middle"
        :pagination="page"
        :dataSource="dataSource"
        :loading="loading"
        @change="pageChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'follow'">
            <a-tag v-if="record.follow === '0'" color="red">否</a-tag>
            <a-tag v-else color="blue">是</a-tag>
          </template>
          <template v-if="column.key === 'status'">
            <a-tag v-if="record.status === '0'" color="red">未发布</a-tag>
            <a-tag v-else color="blue">已发布</a-tag>
          </template>

          <template v-if="column.key === 'action'">
            <a-button type="link" size="small" @click="handleEdit(record)"
              >编辑</a-button
            >
            <a-button type="link" size="small" @click="handlePublish(record)">{{
              record.status === "1" ? "取消发布" : "发布"
            }}</a-button>
            <a-button type="link" size="small" @click="handlePreview(record)"
              >预览</a-button
            >
            <a-button type="link" size="small" @click="handleSwiper(record)">{{
              record.follow === "1" ? "取消轮播" : "轮播"
            }}</a-button>
            <a-button
              type="link"
              size="small"
              danger
              @click="handleDelete(record.id)"
              >删除</a-button
            >
          </template>
        </template>
      </a-table>
    </div>
  </a-card>
  <a-modal
    :title="modalTitle"
    v-model:visible="modalVisible"
    width="100%"
    wrap-class-name="full-modal"
    :footer="null"
  >
    <custom-form
      ref="customForm"
      :key="currentId"
      @submit="submitForm"
    ></custom-form>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { columns } from "./config";
import { getAction, postAction, putAction } from "@/api/api";
import { singleDeleteCommon } from "@/utils/common";
// import ModalForm from "@/components/form/ModalForm.vue";
import CustomForm from "./CustomForm.vue";
import { message } from "ant-design-vue";
export default defineComponent({
  components: { CustomForm },
  setup() {
    const loading = ref(false);
    const state = reactive({
      // selectedRowKeys: [],
      dataSource: [],
      // modalForm: ref("modalForm"),
      currentId: "",
      page: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
      },
      modalTitle: "新增",
      modalVisible: false,
    });
    const searchForm = reactive({
      name: "",
      follow: null,
    });
    const customForm = ref();
    const urlObj = {
      list: "/products/getProductsPage",
      delete: "/products/delete",
    };

    const search = () => {
      getProductList();
    };
    /**获取数据 */
    const getProductList = async () => {
      loading.value = true;
      let res = await getAction<{ data: []; total: number }>(urlObj.list, {
        pageNo: state.page.current,
        pageSize: state.page.pageSize,
        name: searchForm.name,
        follow: searchForm.follow
      });
      if (res) {
        state.dataSource = res.result.data;
        state.page.total = res.result.total;
      }

      loading.value = false;
    };
    getProductList();

    /**操作 */
    const handleEdit = async (obj) => {
      state.currentId = obj.id;
      state.modalVisible = true;
      state.modalTitle = "编辑" + obj.name;
      let dataObj = await getDetail(obj);
      setTimeout(() => {
        customForm.value.init(dataObj);
      }, 100);
    };
    const handleDelete = (id) => {
      singleDeleteCommon(urlObj.delete, id, loading, (bl) => {
        if (bl) getProductList();
      });
    };
    const handleAdd = () => {
      state.modalTitle = "新增产品";
      state.currentId = "";
      state.modalVisible = true;
    };
    const submit = async (e) => {
      let res;
      e["id"] = state.currentId;
      res = await postAction("/system/userEdit/" + e["id"], e);
      if (res) {
        message.success("操作成功");
        state.modalVisible = false;
        getProductList();
      }
    };
    const pageChange = (page) => {
      state.page.current = page.current;
      getProductList();
    };
    const submitForm = async (e) => {
      let res;
      if (state.currentId) {
        res = await putAction("/products/edit/" + state.currentId, e);
      } else {
        res = await postAction("/products/add", e);
      }
      if (res) {
        message.success("操作成功");
        state.modalVisible = false;
        getProductList();
      }
    };
    const getDetail = async (e) => {
      let res = await getAction<object>("/product/" + e.id);
      let data = {};
      if (res) {
        data = res.result;
        console.log(res, "getDetail");
      }
      return data;
    };
    const handlePreview = (obj) => {
      // 预览
      console.log(obj, "handlePreview");
      const feature = "height=800,width=414,top=20, left=100, toolbar=no, menubar=no,location=no";
      window.open('/product/preview/' + obj.id,'产品预览',feature)
    };
    const handleSwiper = async (obj) => {
      // 设置轮播图
      let follow = obj.follow === "1" ? "0" : "1";
      const res = await putAction("/products/follow/" + obj.id, {
        follow: follow,
      });
      if (res) {
        message.success("设置成功！");
        getProductList();
      }
    };

    const handlePublish = async (obj) => {
      // 发布
      let status = obj.status === "1" ? "0" : "1";
      const res = await putAction("/products/edit/" + obj.id, {
        status: status,
      });
      if (res) {
        message.success("设置成功！");
        getProductList();
      }
    };
    const reset = () => {
      searchForm.name = '' 
      searchForm.follow = null
    }
    return {
      ...toRefs(state),
      searchForm,
      loading,
      handleAdd,
      handleEdit,
      handleDelete,
      submit,
      customForm,
      columns: columns,
      pageChange,
      submitForm,
      getDetail,
      search,
      handlePublish,
      handlePreview,
      handleSwiper,
      reset
    };
  },
});
</script>
<style lang="less" scoped>
@import "~@/style/table.less";

.drawer-bootom-button {
  position: absolute;
  bottom: -8px;
  width: 100%;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  left: 0;
  background: #fff;
  border-radius: 0 0 2px 2px;
}
</style>
<style lang="less">
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
    overflow-y: scroll;
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>
