<template>
  <div id="event-form" :class="formVisibility" :style="position">
      <h4>Add an event</h4>
      <button id="close-b" @click="close">&#10005;</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    position() {
      return {
        top: this.$store.state.y + "px",
        left: this.$store.state.x + "px"
      };
    },
    formVisibility() {
      return {
        active: this.$store.state.active
      };
    }
  },
  methods: {
    close() {
      this.$store.commit("alterForm", false);
    }
  }
};
</script>

