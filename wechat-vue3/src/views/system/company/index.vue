<template>
  <a-card :bordered="false">
    <!-- <div class="m-b-20">
      <a-form layout="inline" :model="searchForm" @submit="search">
        <a-form-item label="登录名">
          <a-input
            v-model:value="searchForm.login_name"
            placeholder="登录名"
          ></a-input>
        </a-form-item>
        <a-form-item label="真实名">
          <a-input
            v-model:value="searchForm.real_name"
            placeholder="真实名"
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit"
            ><icon-font type="icon-search"></icon-font> 搜索
          </a-button>
        </a-form-item>
      </a-form>
    </div> -->
    <!-- <div class="table-operator">
      <a-button @click="handleAdd" type="primary">
        <template #icon><icon-font type="icon-plus"/></template>
        新增</a-button
      >
    </div> -->

    <div>
      <!-- <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
        已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a
        >项&nbsp;&nbsp;
      </div> -->

      <a-table
        :columns="columns"
        :row-key="(record) => record.id"
        size="middle"
        :pagination="false"
        :dataSource="dataSource"
        :loading="loading"
        @change="pageChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="handleEdit(record)">编辑</a-button>
            <!-- <a-button type="link" danger @click="handleDelete(record.id)"
              >删除</a-button
            > -->
          </template>
        </template>
      </a-table>
    </div>

    <modal-form
      ref="modalForm"
      :key="currentId"
      :formArr="formData"
      @submit="submit"
    ></modal-form>
  </a-card>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { columns, formArr } from "./config";
import { getAction, postAction, putAction } from "@/api/api";
import {
  singleDeleteCommon,
  handleCommonEdit,
  handleCommonAdd,
  setModalLoading,
} from "@/utils/common";
import ModalForm from "@/components/form/ModalForm.vue";
import { message } from "ant-design-vue";
export default defineComponent({
  components: { ModalForm },
  setup() {
    const loading = ref(false);
    const state = reactive({
      // selectedRowKeys: [],
      dataSource: [],
      formData: formArr,
      // modalForm: ref("modalForm"),
      currentId: "",
      page: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
      },
    });
    const searchForm = reactive({
      title: "",
    });
    const modalForm = ref();
    const urlObj = {
      list: "/article/getArticlePage",
      delete: "/article/delete",
    };

    const search = () => {
      getArticleList();
    };
    /**获取数据 */
    const getArticleList = async () => {
      loading.value = true;
      let res = await getAction<{ data: []; total: number }>(urlObj.list, {
        pageNo: state.page.current,
        pageSize: state.page.pageSize,
        title: searchForm.title,
      });
      if (res) {
        state.dataSource = res.result.data;
        state.page.total = res.result.total;
      }

      loading.value = false;
    };
    getArticleList();

    /**操作 */
    const handleEdit = (obj) => {
      state.currentId = obj.id;
      setTimeout(() => {
        handleCommonEdit(modalForm.value, obj);
      }, 100);
    };
    const handleDelete = (id) => {
      singleDeleteCommon(urlObj.delete, id, loading, (bl) => {
        if (bl) getArticleList();
      });
    };
    const handleAdd = () => {
      state.currentId = "";
      setTimeout(() => {
        handleCommonAdd(modalForm.value);
      }, 100);
    };
    const submit = async (e) => {
      let res;
      //   e["id"] = state.currentId;
      if (!state.currentId) {
        res = await postAction("/article/add", e);
      } else {
        res = await putAction("/article/edit/" + state.currentId, e);
      }
      if (res) {
        message.success("操作成功");
        setModalLoading(modalForm.value);
        getArticleList();
      }
    };
    const pageChange = (page) => {
      state.page.current = page.current;
      getArticleList();
    };

    return {
      ...toRefs(state),
      searchForm,
      loading,
      handleAdd,
      handleEdit,
      handleDelete,
      submit,
      modalForm,
      columns: columns,
      pageChange,
      search,
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
