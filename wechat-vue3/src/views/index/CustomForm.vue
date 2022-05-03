<template>
  <a-form
    :model="formState"
    name="form"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 12 }"
    @finish="handleFinish"
    @validate="handleValidate"
  >
    <a-form-item
      label="产品名称"
      name="name"
      :rules="[{ required: true, message: '请填写产品名称!' }]"
    >
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item
      label="图标"
      name="icon"
      :rules="[{ required: true, message: '请上传图标!' }]"
    >
      <a-upload
        v-model:file-list="formState.icon"
        action="/api/file/upload"
        list-type="picture-card"
        @preview="handlePreview"
        @change="handleChange($event, 'icon')"
      >
        <div v-if="!formState.icon || formState.icon.length < 1">
          <icon-font type="icon-plus"></icon-font>
          <div style="margin-top: 8px">上传</div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item
      label="轮播图"
      name="swiperImage"
      :rules="[{ required: false, message: '请上传轮播图!' }]"
    >
      <a-upload
        v-model:file-list="formState.swiperImage"
        action="/api/file/upload"
        list-type="picture-card"
        @preview="handlePreview"
        @change="handleChange($event, 'swiperImage')"
      >
        <div v-if="!formState.swiperImage || formState.swiperImage.length < 1">
          <icon-font type="icon-plus"></icon-font>
          <div style="margin-top: 8px">上传</div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item
      label="最高额度（单位：万元）"
      name="max_amount"
      :rules="[
        {
          required: true,
          message: '请填写正确格式的数字!',
          pattern: /^[1-9]\d+$/,
        },
      ]"
    >
      <a-input v-model:value="formState.max_amount" />
    </a-form-item>

    <a-form-item
      label="利率"
      name="rates"
      :rules="[{ required: true, message: '请填写利率！' }]"
    >
      <a-input v-model:value="formState.rates" />
    </a-form-item>

    <a-form-item
      label="还款期限"
      name="time_limit"
      :rules="[{ required: true, message: '请填写还款期限！' }]"
    >
      <a-input v-model:value="formState.time_limit" />
    </a-form-item>

    <a-form-item
      label="还款方式"
      name="repayment_method"
      :rules="[{ required: true, message: '请填写还款方式！' }]"
    >
      <a-input v-model:value="formState.repayment_method" />
    </a-form-item>

    <a-form-item
      label="提前还款"
      name="repayment_early"
      :rules="[{ required: true, message: '请填写提前还款！' }]"
    >
      <a-input v-model:value="formState.repayment_early" />
    </a-form-item>

    <a-form-item
      label="收款方式"
      name="gather_method"
      :rules="[{ required: true, message: '请填写收款方式！' }]"
    >
      <a-input v-model:value="formState.gather_method" />
    </a-form-item>

    <a-form-item
      label="申请条件"
      name="apply_condition"
      :rules="[{ required: true, message: '请填写申请条件!' }]"
    >
      <tinymce
        v-model="formState.apply_condition"
        :value="formState.apply_condition"
        @input="tinyChange($event, 'apply_condition')"
      ></tinymce>
    </a-form-item>

    <a-form-item
      label="纳税要求"
      name="ratepaying_demand"
      :rules="[{ required: true, message: '请填写纳税要求!' }]"
    >
      <tinymce
        v-model="formState.ratepaying_demand"
        :value="formState.ratepaying_demand"
        @input="tinyChange($event, 'ratepaying_demand')"
      ></tinymce>
    </a-form-item>

    <a-form-item
      label="禁入行业"
      name="prohibit_industry"
      :rules="[{ required: true, message: '请填写禁入行业!' }]"
    >
      <tinymce
        v-model="formState.prohibit_industry"
        :value="formState.prohibit_industry"
        @input="tinyChange($event, 'prohibit_industry')"
      ></tinymce>
    </a-form-item>

    <a-form-item
      label="进件区域"
      name="enter_area"
      :rules="[{ required: true, message: '请填写进件区域!' }]"
    >
      <tinymce
        v-model="formState.enter_area"
        :value="formState.enter_area"
        @input="tinyChange($event, 'enter_area')"
      ></tinymce>
    </a-form-item>

    <a-form-item
      label="申请资料"
      name="apply_material"
      :rules="[{ required: true, message: '请填写申请资料!' }]"
    >
      <tinymce
        v-model="formState.apply_material"
        :value="formState.apply_material"
        @input="tinyChange($event, 'apply_material')"
      ></tinymce>
    </a-form-item>

    <a-form-item
      label="申请流程"
      name="apply_procedure"
      :rules="[{ required: true, message: '请填写申请流程!' }]"
    >
      <tinymce
        v-model="formState.apply_procedure"
        :value="formState.apply_procedure"
        @input="tinyChange($event, 'apply_procedure')"
      ></tinymce>
    </a-form-item>
    <a-form-item
      label="客服二维码"
      name="qrCode"
      :rules="[{ required: true, message: '请上传二维码图片!' }]"
    >
      <a-upload
        v-model:file-list="formState.qrCode"
        action="/api/file/upload"
        list-type="picture-card"
        @preview="handlePreview"
        @change="handleChange($event, 'qrCode')"
      >
        <div v-if="!formState.qrCode || formState.qrCode.length < 1">
          <icon-font type="icon-plus"></icon-font>
          <div style="margin-top: 8px">上传</div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
      <a-button type="primary" html-type="submit">确定</a-button>
      <a-button class="m-l-10">取消</a-button>
    </a-form-item>
  </a-form>

  <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
    <img alt="example" style="width: 100%" :src="previewImage" />
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import tinymce from "@/components/tinymce/Tinymce.vue";
export default defineComponent({
  components: { tinymce },
  setup(props, context) {
    const previewVisible = ref(false);
    const formState = reactive({
      name: "",
      icon: null,
      swiperImage: null,
      max_amount: null,
      rates: null,
      time_limit: null,
      repayment_method: null,
      repayment_early: null,
      gather_method: null,
      apply_condition: null,
      ratepaying_demand: null,
      prohibit_industry: null,
      enter_area: null,
      apply_material: null,
      apply_procedure: null,
      qrCode: null,
    });
    const imgKeys = {
      'icon': true,
      'qrCode': true,
      'swiperImage': true
    }

    const handleCancel = () => {
      previewVisible.value = false;
    };
    const previewImage = ref("");
    const handlePreview = async (file) => {
      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
    };
    const handleChange = (info, key) => {
      let resFileList = [...info.fileList];

      // 1. Limit the number of uploaded files
      //    Only to show two recent uploaded files, and old ones will be replaced by the new
      // 2. read from response and show file link
      resFileList = resFileList.map((file) => {
        if (file.response) {
          // Component will show file.url as link
          file.url = "/api/" + file.response.result;
        }
        return file;
      });

      formState[key] = resFileList;
    };
    const init = (obj:object) => {
      for(let key in obj) {
        if(Object.prototype.hasOwnProperty.call(formState,key)) {
          if(imgKeys[key]) {
            if(obj[key]) formState[key] = [{url: obj[key]}]
            else formState[key] = null
          } else formState[key] = obj[key]
        }
      }
    }
    const tinyChange = (v, key) => {
      formState[key] = v;
    };
    const handleValidate = (e) => {
      console.log("validate", e);
    };
    const handleFinish = (e) => {
      console.log('handleFinish')
      for (let key in e) {
        if (imgKeys[key]) {
          e[key] = e[key][0].url;
        }
      }
      context.emit("submit", e);
      
    };
    return {
      formState,
      previewVisible,
      previewImage,
      handleCancel,
      handlePreview,
      handleChange,
      handleValidate,
      handleFinish,
      tinyChange,
      init
    };
  },
});
</script>

<style></style>
