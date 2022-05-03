<template>
  <a-spin :spinning="loading" tip="加载中">
    <div style="min-height: 50px">
      <div v-if="productDetail.max_amount && !loading">
        <div class="card">
          <h4><label>银行贷</label><img :src="productDetail.icon" /></h4>
          <div class="card-content">
            <div class="item">
              <p class="common common-1">
                ¥<strong>{{ productDetail.max_amount }}</strong>
              </p>
              <p class="light">最高额度(万元)</p>
            </div>
            <div class="item">
              <p class="common common-2"><strong>{{rates}}</strong></p>
              <p class="light">最低利率</p>
            </div>
            <div class="item">
              <p class="common common-3"><strong>{{time_limit}}</strong></p>
              <p class="light">最长期限</p>
            </div>
          </div>
        </div>

        <div class="card">
          <h5>基本信息</h5>
          <div class="html-card-content">
            <p><strong>1.额度：</strong>最高{{productDetail.max_amount}}万</p>
            <p><strong>2.利率：</strong>{{productDetail.rates}}</p>
            <p><strong>3.期限：</strong>{{productDetail.time_limit}}</p>
            <p><strong>4.还款方式：</strong>{{productDetail.repayment_method}}</p>
            <p><strong>5.提前还款：</strong>{{productDetail.repayment_early}}</p>
            <p><strong>6.收款方式：</strong>{{productDetail.gather_method}}</p>
          </div>
        </div>

        <div class="card" v-for="item of objForKey" :key="item.key">
          <h5>{{item.text}}</h5>
          <div class="html-card-content" v-html="productDetail[item.key]">
          </div>
        </div>

        <div class="card">
          <h5>申请流程</h5>
          <div class="html-card-content" v-html="productDetail.apply_procedure">
          </div>
          <div>
              <h3 style="color:#DD000F;font-size:16px;text-align:center;">如需申请，请联系客服沟通进件</h3>
              
              <div style="text-align:center;padding: 0;"><img style="width:160px;height:160px" :src="productDetail.qrCode" /></div>
          </div>
        </div>


      </div>
    </div>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { getAction } from "@/api/api";
import { useRoute } from "vue-router";
// import { message } from "ant-design-vue";
export default defineComponent({
  setup() {
    const state = reactive({
      productDetail: {},
      rates: "",
      time_limit: "",
      objForKey: [{
          key: 'apply_condition',
          text: '申请条件'
      },{
          key: 'ratepaying_demand',
          text: '纳税要求'
      },{
          key: 'prohibit_industry',
          text: '禁入行业'
      },{
          key: 'enter_area',
          text: '进件区域'
      },{
          key: 'apply_material',
          text: '申请资料'
      }]
    });
    const loading = ref(false);
    const router = useRoute();
    let id = router.params.id;

    const getDetail = async () => {
      loading.value = true;
      let res = await getAction<object>("/product/detail/" + id);
      if (res) {
        state.productDetail = res.result;
        if (res.result["rates"]) {
          state.rates = state.productDetail["rates"].match(/[\d%.]+/)[0];
          state.time_limit = state.productDetail["time_limit"].match(/[\d%.]+/)[0];
        }
      }
      loading.value = false;
    };
    getDetail();
    return {
      ...toRefs(state),
      loading,
    };
  },
});
</script>

<style lang="less" scoped>
.card {
  background: #fff;
  padding-top: 8px;
  margin-bottom: 10px;
  h4 {
    font-size: 18px;
    margin: 10px 0 0 0;
    height: 40px;
    line-height: 40px;
    display: flex;
    padding: 0 16px;
    justify-content: space-between;
    img {
      width: 30px;
      height: 30px;
      border-radius: 100%;
      padding: 2px;
      //   border: 1px solid #f2f0f2;
    }
    label {
      color: #000;
      font-weight: bold;
    }
  }
  h5 {
    height: 22px;
    line-height: 22px;
    padding: 0px 16px;
    // padding-left: 16px;
    margin: 2px 10px;
    border-left: 3px solid #FC3C25;
    font-weight: bold;
    font-size: 16px;
  }
}
.card-content {
  display: flex;
  justify-content: space-between;
  padding: 20px 16px;
  color: #333;
  p {
    margin: 0 0 0px 0;
  }
  .common {
    font-size: 14px;
    text-align: center;
  }
  .common-1 {
    color: #006db1;
  }
  .common-2 {
    color: #f6403d;
  }
  .common-3 {
    strong {
      color: #000;
    }
  }
  strong {
    font-size: 18px;
  }
  .light {
    text-align: center;
    font-size: 13px;
    color: #989998;
  }
  .item {
    width: 33%;
  }
  .item:not(:last-child) {
    border-right: 1px solid #f3f3f3;
  }
}

.html-card-content {
  padding: 10px 16px 14px 16px;
  font-size: 15px;

  p {
      margin: 4px 0;
  }
}
</style>
