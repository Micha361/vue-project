
<script setup>
import { ref, onMounted } from 'vue';
import { fetchUser, deleteUser, addUser } from '../Api/request.js';

const users = ref([]);
const loading = ref(true);

const newUser = ref({
    UserId: '',
    UserName: '',
    UserMail: '',
    UserPassword: '',
    fk_RoleId: '',
    StartDate: '',
    EndDate: ''
});

onMounted(async () => {
    await load();
});

async function load() {
    loading.value = true;
    try {
        const data = await fetchUser();
        users.value = data.records
            .filter(user => {
                return user.fields.UserId && 
                       user.fields.UserName && 
                       user.fields.UserMail && 
                       user.fields.fk_RoleId &&
                       user.fields.StartDate &&
                       user.fields.EndDate;
            })
            .map(record => ({
                id: record.id,
                fields: record.fields,
            }));
        console.log('Gefilterte Daten mit Record IDs:', users.value);
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
    } finally {
        loading.value = false;
    }
}

async function handleDelete(recordId, userName) {
    try {
        const confirmed = confirm(`Möchtest du den Benutzer ${userName} wirklich löschen?`);
        if (!confirmed) return;

        await deleteUser(recordId);
        users.value = users.value.filter(user => user.id !== recordId);
        console.log(`Benutzer mit ID ${recordId} gelöscht.`);
    } catch (error) {
        console.error('Fehler beim Löschen:', error);
    }
}

async function handleAdd() {
    try {
<<<<<<< HEAD
        const addedUser = await addUser(newUser.value);
=======
        const newUser = {
            UserId: 6,
            UserName: 'New User',
            UserMail: 'newuser@example.com',
            fk_RoleId: 3,
            StartDate: '2025-01-01',
            EndDate: '2030-01-01',
        };

        const addedUser = await addUser(newUser);
>>>>>>> Tournament
        users.value.push({
            id: addedUser.id,
            fields: addedUser.fields,
        });

        console.log('Benutzer erfolgreich hinzugefügt:', addedUser);

        newUser.value = {
            UserId: '',
            UserName: '',
            UserMail: '',
            UserPassword: '',
            fk_RoleId: '',
            StartDate: '',
            EndDate: ''
        };
    } catch (error) {
        console.error('Fehler beim Hinzufügen des Benutzers:', error);
    }
}
</script>

<template>
  <div>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mail</th>
            <th>Role</th>
            <th>StartDate</th>
            <th>EndDate</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input v-model="newUser.UserName" placeholder="Name"></td>
            <td><input v-model="newUser.UserMail" placeholder="Mail"></td>
            <td><input v-model="newUser.fk_RoleId" placeholder="Role"></td>
            <td><input v-model="newUser.StartDate" placeholder="StartDatum" type="date"></td>
            <td><input v-model="newUser.EndDate" placeholder="EndDatum" type="date"></td>
            <td><button class="add-button" @click="handleAdd">Add</button></td>
          </tr>
        </tbody>
      </table>
      <h1>Userliste von API</h1>

      <div v-if="loading">Loading...</div>

      <table v-else class="styled-table">
<<<<<<< HEAD
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mail</th>
            <th>Passwort</th>
            <th>Role</th>
            <th>StartDate</th>
            <th>EndDate</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.fields.UserId }}</td>
            <td>{{ user.fields.UserName }}</td> 
            <td>{{ user.fields.UserMail }}</td> 
            <td>{{ user.fields.UserPassword }}</td> 
            <td>{{ user.fields.fk_RoleId }}</td> 
            <td>{{ user.fields.StartDate }}</td> 
            <td>{{ user.fields.EndDate }}</td> 
            <td>
              <button 
                class="delete-button" 
                @click="handleDelete(user.id, user.fields.UserName)">Delete</button>
            </td> 
          </tr>
        </tbody>
      </table>
=======
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Mail</th>
          <th>Role</th>
          <th>StartDate</th>
          <th>EndDate</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.fields.UserId }}</td>
          <td>{{ user.fields.UserName }}</td> 
          <td>{{ user.fields.UserMail }}</td> 
          <td>{{ user.fields.fk_RoleId }}</td> 
          <td>{{ user.fields.StartDate }}</td> 
          <td>{{ user.fields.EndDate }}</td> 
          <td>
            <button 
            class="delete-button" 
            @click="handleDelete(user.id, user.fields.UserName)">Delete</button>
          </td> 
        </tr>
      </tbody>
    </table>
>>>>>>> Tournament
  </div>
</template>

<style>
.styled-table {
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 18px;
  text-align: left;
  color: #ff0000;
}
.styled-table thead tr {
  background-color: #1e88e5;
  color: #ffffff;
  text-align: left;
}
.styled-table th,
.styled-table td {
  padding: 12px 15px;
  border: 1px solid #333333;
}
.styled-table tbody tr {
  background-color: #212121;
}
.styled-table tbody tr:nth-of-type(even) {
  background-color: #2c2c2c;
}
.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #1e88e5;
}
.styled-table tbody tr:hover {
  background-color: #37474f;
}
h1 {
  color: #1e88e5;
}
input {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
}
.add-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
.add-button:hover {
  background-color: #45a049;
}
.delete-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
.delete-button:hover {
  background-color: #d32f2f;
}
</style>
