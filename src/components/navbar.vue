<script setup>
import { ref } from 'vue';

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <div>
    <button class="toggle-button" @click="toggleSidebar">
      <span v-if="isSidebarOpen">❮</span>
      <span v-else>❯</span>
    </button>
    <aside class="sidebar" :class="{ 'sidebar-closed': !isSidebarOpen }">
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/users">Users</router-link></li>
          <li><router-link to="/bills">Bills</router-link></li>
          <li><router-link to="/Tournament">Tournament</router-link></li>
          <li><router-link to="/Plan">Training-Plan</router-link></li>
          <li><router-link to="/Account">Account</router-link></li>
          <li><button @click="signOut">Sign Out</button></li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      localStorage.removeItem('loggedIn');
      this.$router.push('/login');
    },
  },
};
</script>

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
  z-index: 1000;
  transform: translateX(0);
  transition: transform 0.3s ease;
}

.sidebar-closed {
  transform: translateX(-250px);
}

.toggle-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1100;
  background-color: linear-gradient(45deg, #ff6b6b, #f06595);
  color: white;
  border: none;
  padding: 12px 18px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  font-size: 1.5rem;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.toggle-button:hover {
  background-color: linear-gradient(45deg, #ff8787, #fa5252);
  transform: translateY(-3px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
}

.sidebar nav ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar nav ul li {
  margin: 1rem 0;
}

.sidebar nav ul li a {
  text-decoration: none;
  color: white;
  font-size: 1rem;
  transition: color 0.3s;
}

.sidebar nav ul li a:hover {
  color: #00bcd4;
}
</style>
