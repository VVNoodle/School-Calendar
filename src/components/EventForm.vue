<template>
  <div id="event-form" :class="formVisibility" :style="position">
      <h4>Add an event</h4>
        <p>{{date}}</p>
      <div class="text">
          <input type="text" v-model="description" @keyup.enter="create" v-focus>
      </div>
      <div class="buttons">
          <button @click="create">Create</button>
      </div>
      <button id="close-b" @click="close">&#10005;</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: ""
    };
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
    },
    date() {
      return this.$store.state.time.format("dddd, MMM, Do");
    }
  },
  methods: {
    close() {
      this.$store.commit("alterForm", false);
    },
    create() {
      if (!this.description.length) {
        return;
      }
      this.$store.commit("addEvent", this.description);
      this.close();
      this.description = "";
    }
  },
  directives: {
    focus: {
      update(el) {
        el.focus();
      }
    }
  }
};
</script>

