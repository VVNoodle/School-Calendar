<template>
  <div>{{msg}}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: "HELLO BITCHEZ"
    };
  },
  created() {
    console.log(this.$moment);
  }
};
</script>

<style scoped>

</style>

