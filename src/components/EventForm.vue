<template>
  <div id="event-form" :class="{active: true}" :style="position"></div>
</template>

<script>
export default {
  computed: {
    position() {
      return {
        top: this.$store.state.y + "px",
        left: this.$store.state.x + "px"
      };
    }
  }
};
</script>

