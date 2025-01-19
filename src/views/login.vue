<script setup>
import { ref } from 'vue'; 
import { fetchUsers } from '../Api/request.js';
import { useRouter } from 'vue-router';
import navbarlogin from '../components/navbarlogin.vue';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

async function handleLogin() {
  try {
    const users = await fetchUsers();
    const user = users.find(
      (u) => u.Email === username.value && u.Passwort === password.value
    );

    if (user) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userId', user.id); 
      router.push('/'); 
    } else {
      errorMessage.value = 'Fehler beim Login. Bitte versuchen Sie es erneut.';
    }
  } catch (error) {
    console.error('Fehler beim Login:', error);
    errorMessage.value = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
  }
}
</script>

<template>
  <navbarlogin />
  <form class="form" @submit.prevent="handleLogin">
    <span class="input-span">
      <label for="email" class="label">Email</label>
      <input
        type="email"
        id="email"
        v-model="username"
        placeholder="Email eingeben"
        required
      />
    </span>
    <span class="input-span">
      <label for="password" class="label">Passwort</label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="Passwort eingeben"
        required
      />
    </span>
    <input class="submit" type="submit" value="Log in" />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    Du hast noch keinen Account? <router-link class="link" to="/signup">Sign up</router-link>
  </form>
</template>

<style scoped>
.link {
  text-decoration: none;
  color: var(--clr);
}

.form {
  --bg-light: #efefef;
  --bg-dark: #707070;
  --clr: #58bc82;
  --clr-alpha: #9c9c9c60;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.input-span {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input[type="email"],
input[type="password"] {
  border-radius: 0.5rem;
  padding: 1rem 0.75rem;
  width: 100%;
  border: none;
  background-color: var(--clr-alpha);
  outline: 2px solid var(--bg-dark);
}

input[type="email"]:focus,
input[type="password"]:focus {
  outline: 2px solid var(--clr);
}

.label {
  align-self: flex-start;
  color: var(--clr);
  font-weight: 600;
}

.submit {
  padding: 1rem 0.75rem;
  width: 100%;
  border-radius: 3rem;
  background-color: var(--bg-dark);
  color: var(--bg-light);
  border: none;
  cursor: pointer;
  transition: all 300ms;
  font-weight: 600;
  font-size: 0.9rem;
}

.submit:hover {
  background-color: var(--clr);
  color: var(--bg-dark);
}

.error-message {
  color: red;
  font-size: 0.9rem;
}
</style>
