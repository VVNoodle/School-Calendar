<template>
<div>
    <h1>
      Home
  </h1>
  <button @click="check">check</button>
</div>  
</template>

<script>
import axios from "axios";
export default {
  created() {
    axios
      .create({
        baseURL: "http://localhost:3000/"
      })
      .get("/profile")
      .then(user => {
        if (user) {
          console.log(user.data);
          this.$store.state.loggedIn = true;
        } else {
          console.log("bithh ass");
        }
      });
  }
};
</script>

