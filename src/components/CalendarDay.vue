<template>
  <div :class="classObject" @click="captureClick">
    {{day.format('D')}}
    <ul class="event-list">
      <li v-for="event in events" :key="event">
        {{event.description}}
        </li>
    </ul>
    </div>
</template>

<script>
export default {
  props: ["day"],
  computed: {
    events() {
      return this.$store.state.events.filter(event => {
        const convertToDate = this.$moment(event.date);
        return convertToDate.isSame(this.day, "day");
      });
    },
    isToday() {
      return this.day.isSame(this.$moment(), "day");
    },
    isBefore() {
      return this.day.isSameOrBefore(this.$moment(), "day");
    },
    classObject() {
      let time = this.$store.state.time;
      const past = this.isBefore && !this.isToday;
      const currentActive = this.$store.state.active;
      return {
        day: true,
        today: this.isToday,
        past,
        active: this.day.isSame(time, "day") && !past && currentActive
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
      this.$store.commit("eventFormDate", this.day);
    }
  }
};
</script>

