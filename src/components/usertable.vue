<script setup>
import { ref, onMounted } from 'vue';
import { fetchUser, deleteUser, addUser, fetchRoles } from '../Api/request.js';

const users = ref([]);
const roles = ref([]);
const loading = ref(true);

const newUser = ref({
    UserName: '',
    UserMail: '',
    fk_RoleId: '',
    StartDate: '',
    EndDate: ''
});

async function getRoleId(roleName) {
    try {
        const rolesData = await fetchRoles();
        const role = rolesData.records.find(r => r.fields.Role === roleName);
        return role ? role.id : null;
    } catch (error) {
        console.error('Fehler beim Abrufen der Rolle:', error);
        return null;
    }
}

async function getRoleName(roleId) {
    const role = roles.value.find(r => r.id === roleId);
    return role ? role.fields.Role : 'Unbekannt';
}

onMounted(async () => {
    await loadRoles();
    await load();
});

async function loadRoles() {
    try {
        const data = await fetchRoles();
        roles.value = data.records;
        console.log('Rollen geladen:', roles.value);
    } catch (error) {
        console.error('Fehler beim Laden der Rollen:', error);
    }
}
async function load() {
    loading.value = true;
    try {
        const data = await fetchUser();
        const rolesData = await fetchRoles();
        const rolesMap = Object.fromEntries(
            rolesData.records.map(role => [role.id, role.fields.Role])
        );

        users.value = data.records
            .filter(user => {
                return user.fields.UserName &&
                       user.fields.UserMail &&
                       user.fields.fk_RoleId &&
                       user.fields.StartDate &&
                       user.fields.EndDate;
            })
            .map(record => ({
                id: record.id,
                fields: {
                    ...record.fields,
                    RoleName: rolesMap[record.fields.fk_RoleId[0]] || 'Unbekannt'
                }
            }));

        console.log('Gefilterte Benutzerdaten mit Rollennamen:', users.value);
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
    } finally {
        loading.value = false;
    }

}

async function handleAdd() {
    if (
        !newUser.value.UserName ||
        !newUser.value.UserMail ||
        !newUser.value.fk_RoleId ||
        !newUser.value.StartDate ||
        !newUser.value.EndDate
    ) {
        alert('Bitte alle Felder korrekt ausfüllen.');
        return;
    }

    const roleId = await getRoleId(newUser.value.fk_RoleId);

    if (!roleId) {
        alert(`Rolle "${newUser.value.fk_RoleId}" nicht gefunden.`);
        return;
    }

    newUser.value.fk_RoleId = [roleId];

    try {
        await addUser(newUser.value);
        await load();
        newUser.value = {
            UserName: '',
            UserMail: '',
            fk_RoleId: '',
            StartDate: '',
            EndDate: ''
        };
    } catch (error) {
        console.error('Fehler beim Hinzufügen des Benutzers:', error);
    }
}

async function handleDelete(recordId, userName) {
    try {
        const confirmed = confirm(`Möchtest du den Benutzer "${userName}" wirklich löschen?`);
        if (!confirmed) return;

        await deleteUser(recordId);
        await load();
    } catch (error) {
        console.error('Fehler beim Löschen:', error);
    }
}
</script>

<template>
  <h1>User Hinzufügen</h1>
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
          <td>
            <select v-model="newUser.fk_RoleId">
              <option value="" disabled>Rolle</option>
              <option value="Coachee">Coachee</option>
              <option value="Coach">Coach</option>
              <option value="Owner">Owner</option>
            </select>
          </td>
          <td><input v-model="newUser.StartDate" placeholder="StartDatum" type="date"></td>
          <td><input v-model="newUser.EndDate" placeholder="EndDatum" type="date"></td>
          <td><button class="add-button" @click="handleAdd">Add</button></td>
        </tr>
      </tbody>
    </table>

    <h1>Userliste</h1>
    <div v-if="loading">Loading...</div>
    <table v-else class="styled-table">
      <thead>
        <tr>
          
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
         
          <td>{{ user.fields.UserName }}</td>
          <td>{{ user.fields.UserMail }}</td>
          <td>{{ user.fields.RoleName }}</td>
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
  </div>
</template>

<style>

</style>