<template>
  <div>
    <ul>
        <li><router-link to="/" exact>Home</router-link></li> 
        <div v-if="this.$store.state.loggedIn">
        <li><router-link to="/calendar" exact>Calendar</router-link></li>
        <li><a href="/auth/logout" exact>Logout</a></li>
        </div>
        <div v-else>
        <li><router-link to="/login" exact>Login</router-link></li>
        </div>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>
