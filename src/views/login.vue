<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Benutzername:</label>
          <input id="username" v-model="username" type="text" />
        </div>
        <div>
          <label for="password">Passwort:</label>
          <input id="password" v-model="password" type="password" />
        </div>
        <button type="submit">Einloggen</button>
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      handleLogin() {
        const validUsername = 'test';
        const validPassword = '123';
  
        if (this.username === validUsername && this.password === validPassword) {
          localStorage.setItem('loggedIn', 'true'); 
          this.$router.push('/'); 
        } else {
          this.errorMessage = 'Ungültige Anmeldedaten!';
        }
      },
    },
  };
  </script>
  