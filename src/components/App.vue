<template>
<div>
    <div v-for="day in days" :key="day">
        {{day}}
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      month: 4,
      year: 2018
    };
  },
  computed: {
    days() {
      // generating all days in current month
      let days = [];
      let currentDay = this.$moment(`${this.year}-${this.month}-1`, "YYYY-M-D");
      do {
        days.push(currentDay);
        currentDay = this.$moment(currentDay).add(1, "days"); //create fresh instance of moment, not pass by ref
      } while (currentDay.month() + 1 === this.month);

      const SUNDAY = 0;
      const MONDAY = 1;

      // Add previous days to start
      currentDay = this.$moment(days[0]);
      if (currentDay.day() !== MONDAY) {
        do {
          currentDay = this.$moment(currentDay).subtract(1, "days");
          days.unshift(currentDay); //pushes to start of array
        } while (currentDay.day() !== MONDAY);
      }

      //   Add future days to end
      currentDay = this.$moment(days[days.length - 1]);
      if (currentDay.day() !== SUNDAY) {
        do {
          currentDay = this.$moment(currentDay).add(1, "days");
          days.push(currentDay); //pushes to start of array
        } while (currentDay.day() !== SUNDAY);
      }

      return days;
    }
  }
};
</script>

<style scoped>

</style>

