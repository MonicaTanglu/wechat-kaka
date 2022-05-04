<template>
  <div class="about-company" v-html="detail.desc"></div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getAction } from "@/api/api";
// import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const detail = ref({});
    // const router = useRoute();
    // let id = router.params.id;

    const getDetail = async () => {
        const res = await getAction<object>('/article/1')
        if(res) {
            detail.value = res.result
        }
    }
    getDetail()
    return {
      detail,
    };
  },
});
</script>

<style>
.about-company {
    padding: 16px;
    background: #fff;
}
</style>
