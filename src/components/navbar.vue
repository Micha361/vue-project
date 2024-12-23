<script setup>
</script>

<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/users">Users</router-link></li> 
        <li><router-link to="/bills">Bills</router-link></li> 
      </ul>
    </nav>
  </aside>
</template>
    
<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #333;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.sidebar nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar nav ul li {
  margin: 1rem 0;
}

.sidebar nav ul li a,
.sidebar nav ul li router-link {
  text-decoration: none;
  color: white;
  font-size: 1rem;
  transition: color 0.3s;
}

.sidebar nav ul li a:hover,
.sidebar nav ul li router-link:hover {
  color: #00bcd4;
}
</style>
