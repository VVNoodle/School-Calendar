<template>
  <div>
    <ul>
        <li><router-link to="/" exact>Home</router-link></li> 
        <li><router-link to="/login" exact>Login</router-link></li> 
        <li><router-link to="/calendar" exact>Calendar</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>
