<script setup>
 </script>

<template>
  <div class="account-container">
    <h1 class="title">Account Details</h1>
    <div class="account-card">
      <div class="account-detail">
        <label class="detail-label">Username:</label>
        <span class="detail-value">{{ username || 'Dein Benutzername' }}</span>
      </div>
      <div class="account-detail">
        <label class="detail-label">Email:</label>
        <span class="detail-value">{{ email || 'Deine Email-Adresse' }}</span>
      </div>
      <button class="signout" @click="signOut">Sign Out</button>
     </div>
  </div>
</template>

<style>
.signout{
  margin-top: 100px;
}
</style>

<script>
export default {
  methods: {
    signOut() {
      localStorage.removeItem('loggedIn'); 
      this.$router.push('/login'); 
    },
  },
};</script>