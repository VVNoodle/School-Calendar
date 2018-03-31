<template>
  <div>
      <h3>{{formattedDate}}</h3>
      <button @click="dec">-</button>
      <button @click="inc">+</button>
  </div>
</template>

<script>
export default {
  computed: {
    month() {
      return this.$store.state.currentMonth;
    },
    year() {
      return this.$store.state.currentYear;
    },
    formattedDate() {
      return this.$moment(`${this.year}-${this.month}-1`, "YYYY-M-D").format(
        "MMMM YYYY"
      );
    }
  },
  methods: {
    dec() {
      if (this.month == 1) {
        console.log("hello");
        this.$store.commit("setCurrentMonth", 12);
        this.$store.commit("setCurrentYear", this.year - 1);
      } else {
        this.$store.commit("setCurrentMonth", this.month - 1);
      }
      this.$store.commit("alterForm", false);
    },
    inc() {
      if (this.month == 12) {
        this.$store.commit("setCurrentMonth", 1);
        this.$store.commit("setCurrentYear", this.year + 1);
      } else {
        this.$store.commit("setCurrentMonth", this.month + 1);
      }
      this.$store.commit("alterForm", false);
    }
  }
};
</script>

<style scoped>

</style>


