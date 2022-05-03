<template>
  <div>
    <div v-if="swiperList && swiperList.length > 0" class="swiper-image">
      <a-carousel :autoplay="true">
        <div
          v-for="item of swiperList"
          :key="item.id"
          @click="handleDetail(item)"
        >
          <img :src="item.swiperImage" />
        </div>
      </a-carousel>
    </div>
    <div class="card">
      <div class="card-title">
        <label>产品列表</label>
      </div>
      <div class="card-content">

        <div class="card-item" v-for="item of productList" :key="item.id">
          <h4>
            <img class="circle" :src="item.swiperImage" />
            <label>{{ item.name }}</label>
          </h4>
          <div class="card-item-content">
            <div class="box-item" style="width:40%">
              <p>最高{{ item.max_amount }}万</p>
              <p class="sub">{{ item.time_limit }}</p>
            </div>
            <div class="box-item" style="width:40%">
              <p class="strong">{{ item.rates }}</p>
              <p class="sub light">{{ item.repayment_method }}</p>
            </div>
            <div class="box-item" style="width:20%;text-align:center;align-self:center;">
                <label class="look-btn" @click="handleDetail(item)">查看</label>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div id="loading" class="center loading">
      <a-spin
        :spinning="loading && page.total > page.current * page.pageSize"
        tip="加载中..."
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted } from "vue";
import { getAction } from "@/api/api";
import { useRouter } from 'vue-router';
// import { message } from "ant-design-vue";
export default defineComponent({
  setup() {
    const state = reactive({
      swiperList: [],
      productList: [],
      page: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
    });
    const getSwiperList = async () => {
      let res = await getAction<[]>("/products/swiper");
      if (res) {
        state.swiperList = res.result;
      }
    };
    getSwiperList();
    const loading = ref(false);
    const getProductList = async () => {
      loading.value = true;
      let res = await getAction<{ data: []; total: number }>("/products/list", {
        pageNo: state.page.current,
        pageSize: state.page.pageSize,
      });
      if (res) {
        state.productList = state.productList.concat(res.result.data);
        state.page.total = res.result.total;
      }
      loading.value = false;
    };
    getProductList();
    const scrollHandle = () => {
      if (state.page.total <= state.page.current * state.page.pageSize) return;
      if (
        document.body.scrollTop +
          document.documentElement.scrollTop +
          document.documentElement.clientHeight >=
        document.body.scrollHeight
      ) {
        setTimeout(() => {
          // document.querySelector(".view").removeChild(load); /*移除加载块*/
          state.page.current++; //页码计数器，默认为1
          getProductList(); //调用自己的方法加载数据，将页码计数器传到后端，实现分页获取
        }, 300); /*刷新追加新的内容*/
      }
    };
    const router = useRouter();
    const handleDetail = (obj) => {
        router.push("/product/detail/" + obj.id)
    //   console.log("handleDetail", obj);
    };
    onMounted(() => {
      window.addEventListener("touchmove", scrollHandle, true);
    });
    return {
      ...toRefs(state),
      loading,
      handleDetail,
    };
  },
});
</script>

<style lang="less" scoped>
.swiper-image {
  img {
    height: 220px;
    width: 100%;
  }
}
.loading {
  margin: 10px auto;
}
.card {
  color: #333;
  background: #fff;
  margin: 2px 4px;
  .card-title {
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    padding: 0 16px;
    border-bottom: 1px solid #f0f0f0;
  }
}
.card-item {
  padding: 0 16px;

  h4 {
    font-size: 18px;
    margin: 10px 0 0 0;
    height: 40px;
    line-height: 40px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 100%;
      padding: 2px;
      border: 1px solid #f2f0f2;
    }
    label {
      margin-left: 16px;
    }
  }
  &-content {
    padding: 14px 4px;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    font-size: 15px;
    p {
      margin: 0 0 6px 0;
    }
    p.strong {
      color: #ff5e30;
    }
    p.sub {
      font-size: 12px;
    }
    p.light {
      color: #bcbcbe;
    }
  }
}
.card-item:not(:last-child) .card-item-content {
  border-bottom: 1px solid #f0f0f0;
}
.box-item .look-btn {
    height: 28px;
    line-height: 28px;
    font-size: 16px;
    width: 60px;
    text-align: center;
    letter-spacing: 1px;
    background: #FC3C25;
    color: #fff;
    border-radius: 28px;
    display: inline-block;
}
</style>
