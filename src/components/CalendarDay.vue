<template>
  <div :class="classObject" @click="captureClick">{{day.format('D')}}</div>
</template>

<script>
export default {
  props: ["day"],
  computed: {
    isToday() {
      return this.day.isSame(this.$moment(), "day");
    },
    isBefore() {
      return this.day.isSameOrBefore(this.$moment(), "day");
    },
    classObject() {
      return {
        day: true,
        today: this.isToday,
        past: this.isBefore && !this.isToday
      };
    }
  },
  methods: {
    captureClick(event) {
      if (!(this.isBefore && !this.isToday)) {
        this.$store.commit("alterForm", true);
      } else {
        this.$store.commit("alterForm", false);
      }
      this.$store.commit("eventFormPos", {
        x: event.clientX,
        y: event.clientY
      });
    }
  }
};
</script>

