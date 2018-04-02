<template>
<div>
    <div v-if="!this.$store.state.user.username">
        <h1>
            Welcome! Please Login!
        </h1>
    </div>
    <div v-else>
        <h1>
            Welcome {{user.username}}!
        </h1>
    </div>
</div>  
</template>

<script>
import Axios from "axios";
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    Axios.create({
      baseURL: "http://localhost:3000/"
    })
      .get("/profile")
      .then(user => {
        if (user) {
          console.log(user.data);
          this.$store.commit("updateUser", user.data);
        } else {
          console.log("bithh ass");
        }
      });
  }
};
</script>

