<script setup>
import { ref, onMounted } from 'vue';
import { fetchUser } from '../Api/request.js';


const User = ref([]);
const loading = ref(true);

onMounted(async () => {
    load();
})

async function load()
{
    loading.value = true
    try {
        const data = await fetchUser()
        User.value = data.records 
        console.log('Stream geladen', User.value)
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}


</script>

<template>
  <div>
      <h1>Userliste von API</h1>
      <div v-if="loading">Loading...</div>
      <table v-else class="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Mail</th>
          <th>Passwort</th>
          <th>Role</th>
          <th>StartDate</th>
          <th>Enddate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in User" :key="User.id">
          <td>{{ user.Userid }}</td>
          <td>{{ user.fields.Username }}</td> 
          <td>{{ user.fields.UserMail }}</td> 
          <td>{{ user.fields.UserPassword }}</td> 
          <td>{{ user.fields.fk_RoleId }}</td> 
          <td>{{ user.fields.StartDate }}</td> 
          <td>{{ user.fields.EndDate }}</td> 

        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
/* Tabelle */
.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 18px;
  text-align: left;
  color: #ffffff; /* Textfarbe weiß */
}
.styled-table thead tr {
  background-color: #1e88e5; /* Blau für Header */
  color: #ffffff;
  text-align: left;
}
.styled-table th,
.styled-table td {
  padding: 12px 15px;
  border: 1px solid #333333; /* Dunkler Rand */
}
.styled-table tbody tr {
  background-color: #212121; /* Dunkles Grau für Zeilen */
}
.styled-table tbody tr:nth-of-type(even) {
  background-color: #2c2c2c; /* Etwas helleres Grau für Alternierung */
}
.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #1e88e5; /* Blau für Abschluss */
}
.styled-table tbody tr:hover {
  background-color: #37474f; /* Hellgraues Highlight bei Hover */
}

/* Überschrift */
h1 {
  color: #1e88e5; /* Blau passend zum Header */
}
</style>