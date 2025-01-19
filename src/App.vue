<script setup>
import Navbar from './components/navbar.vue';
import { RouterView } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';

const isSmallScreen = ref(false);

const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth < 800;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize); 
});
</script>

<template>
  <div id="app">
    <div v-if="isSmallScreen" class="screen-warning">
      <p>Diese Seite ist nicht für diese Bildschirmgrösse geeignet.</p>
    </div>
    <div v-else>
      <Navbar v-if="isLoggedIn" />
      <Sidebar />
      <main class="content">
        <RouterView />
      </main>
    </div>
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
.screen-warning {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #f44336;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  text-align: center;
  z-index: 9999;
}

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
