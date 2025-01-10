<script setup>
import Navbar from './components/navbar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div id="app">
    <Navbar v-if="isLoggedIn" />
    <Sidebar />
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script>
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  mounted() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    },
  },
  watch: {
    $route() {
      this.checkLoginStatus();
    },
  },
};
</script>

<style scoped>
.content {
  margin-left: 250px; 
  padding: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header h1 {
  margin: 0;
}

.account-link {
  text-decoration: none;
  color: #00bcd4;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
