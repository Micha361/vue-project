<script setup>
 </script>

<template>
  <div class="account-container">
    <h1 class="title">Account Details</h1>
    <div class="account-card">

      <div class="account-detail">
        <strong><label class="detail-label">Email:</label></strong>
        <span class="detail-value">{{ email || ' test@gmail.com' }}</span>
      </div><br>
      <div class="account-detail">
        <label class="detail-label">Bei Problemen mit deinem Account melde dich unter <br>
          <a href="mailto:arber_idrizaj@sluz.ch">arber_idrizaj@sluz.ch</a> oder unter der Nummer <a href="tel:+41791234567">079 123 45 67</a>
        </label>
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