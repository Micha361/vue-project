<script setup>
import { ref, onMounted } from 'vue';
import { fetchPerson, deletePerson, addPerson, fetchRoles } from '../Api/request.js';

const Persons = ref([]);
const roles = ref([]);
const loading = ref(true);

const newPerson = ref({
    PersonName: '',
    PersonMail: '',
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
        const data = await fetchPerson();
        const rolesData = await fetchRoles();
        const rolesMap = Object.fromEntries(
            rolesData.records.map(role => [role.id, role.fields.Role])
        );

        Persons.value = data.records
            .filter(Person => {
                return Person.fields.PersonName &&
                       Person.fields.PersonMail &&
                       Person.fields.fk_RoleId &&
                       Person.fields.StartDate &&
                       Person.fields.EndDate;
            })
            .map(record => ({
                id: record.id,
                fields: {
                    ...record.fields,
                    RoleName: rolesMap[record.fields.fk_RoleId[0]] || 'Unbekannt'
                }
            }));

        console.log('Gefilterte Benutzerdaten mit Rollennamen:', Persons.value);
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
    } finally {
        loading.value = false;
    }

}

async function handleAdd() {
    if (
        !newPerson.value.PersonName ||
        !newPerson.value.PersonMail ||
        !newPerson.value.fk_RoleId ||
        !newPerson.value.StartDate ||
        !newPerson.value.EndDate
    ) {
        alert('Bitte alle Felder korrekt ausfüllen.');
        return;
    }

    const roleId = await getRoleId(newPerson.value.fk_RoleId);

    if (!roleId) {
        alert(`Rolle "${newPerson.value.fk_RoleId}" nicht gefunden.`);
        return;
    }

    newPerson.value.fk_RoleId = [roleId];

    try {
        await addPerson(newPerson.value);
        await load();
        newPerson.value = {
            PersonName: '',
            PersonMail: '',
            fk_RoleId: '',
            StartDate: '',
            EndDate: ''
        };
    } catch (error) {
        console.error('Fehler beim Hinzufügen des Benutzers:', error);
    }
}

async function handleDelete(recordId, PersonName) {
    try {
        const confirmed = confirm(`Möchtest du den Benutzer "${PersonName}" wirklich löschen?`);
        if (!confirmed) return;

        await deletePerson(recordId);
        await load();
    } catch (error) {
        console.error('Fehler beim Löschen:', error);
    }
}
</script>

<template>
  <h1>Person Hinzufügen</h1>
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
          <td><input v-model="newPerson.PersonName" placeholder="Name"></td>
          <td><input v-model="newPerson.PersonMail" placeholder="Mail"></td>
          <td>
            <select v-model="newPerson.fk_RoleId">
              <option value="" disabled>Rolle</option>
              <option value="Coachee">Coachee</option>
              <option value="Coach">Coach</option>
              <option value="Owner">Owner</option>
            </select>
          </td>
          <td><input v-model="newPerson.StartDate" placeholder="StartDatum" type="date"></td>
          <td><input v-model="newPerson.EndDate" placeholder="EndDatum" type="date"></td>
          <td><button class="add-button" @click="handleAdd">Add</button></td>
        </tr>
      </tbody>
    </table>

    <h1>Personliste</h1>
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
        <tr v-for="Person in Persons" :key="Person.id">
         
          <td>{{ Person.fields.PersonName }}</td>
          <td>{{ Person.fields.PersonMail }}</td>
          <td>{{ Person.fields.RoleName }}</td>
          <td>{{ Person.fields.StartDate }}</td>
          <td>{{ Person.fields.EndDate }}</td>
          <td>
            <button 
              class="delete-button" 
              @click="handleDelete(Person.id, Person.fields.PersonName)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>

</style>