<template>
  <div id="event-form" :class="formVisibility" :style="position">
      <h4>Add an event</h4>
        <p>{{date}}</p>
      <div class="text">
          <input type="text" v-model="description" @keyup.prevent.enter="create" v-focus>
          <div id="checkboxes">
            <input type="checkbox" name="tag" value="CMPE110" v-model="checked">
            <label for="CMPE110">CMPE 110</label> 
            <br>
            <input type="checkbox" name="tag" value="CMPS183" v-model="checked">
            <label for="CMPS183">CMPS 183</label>
          </div>
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
      description: "",
      checked: []
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
  watch: {
    checked() {}
  },
  methods: {
    close() {
      this.$store.commit("alterForm", false);
    },
    create() {
      if (!this.description.length) {
        return;
      }
      this.$store
        .dispatch("addEvent", this.description)
        .then(() => {
          this.close();
          this.description = "";
        })
        .catch(e => {
          console.error(e);
        });
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

