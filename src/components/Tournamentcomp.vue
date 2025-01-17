<script setup>
import { ref, onMounted } from 'vue';
import { fetchTournaments, deleteTournament, addTournament } from '../Api/request.js';

const tournaments = ref([]);
const loading = ref(true);

onMounted(async () => {
    await load();
});

async function load() {
    loading.value = true;
    try {
        const data = await fetchTournaments();
        tournaments.value = data.records
            .filter(tournament => {
                return tournament.fields.TournamentId &&
                       tournament.fields.TournamentName &&
                       tournament.fields.Date &&
                       tournament.fields.Participants &&
                       tournament.fields.Place;
            })
            .map(record => ({
                id: record.id,
                fields: record.fields,
            }));
        console.log('Gefilterte Turnierdaten mit Record IDs:', tournaments.value);
    } catch (error) {
        console.error('Fehler beim Laden der Turnierdaten:', error);
    } finally {
        loading.value = false;
    }
}

async function handleDelete(recordId, tournamentName) {
    try {
        const confirmed = confirm(`Möchtest du das Turnier "${tournamentName}" wirklich löschen?`);
        if (!confirmed) return;

        await deleteTournament(recordId);
        tournaments.value = tournaments.value.filter(tournament => tournament.id !== recordId);
        console.log(`Turnier mit ID ${recordId} gelöscht.`);
    } catch (error) {
        console.error('Fehler beim Löschen des Turniers:', error);
    }
}

async function handleAdd() {
    try {
        const newTournament = {
            TournamentId: 2,
            TournamentName: 'New Tournament',
            Date: '2025-02-19',
            Participants: 'New Participant',
            Place: 'Zurich',
        };

        const addedTournament = await addTournament(newTournament);
        tournaments.value.push({
            id: addedTournament.id,
            fields: addedTournament.fields,
        });

        console.log('Turnier erfolgreich hinzugefügt:', addedTournament);
    } catch (error) {
        console.error('Fehler beim Hinzufügen des Turniers:', error);
    }
}
</script>

<template>
  <div>
      <h1>Turnierliste von Airtable</h1>
      <button 
          class="add-button" 
          @click="handleAdd()">Add Tournament</button>
      <div v-if="loading">Loading...</div>
      <table v-else class="styled-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Date</th>
          <th>Participants</th>
          <th>Place</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tournament in tournaments" :key="tournament.id">
          <td>{{ tournament.fields.TournamentId }}</td>
          <td>{{ tournament.fields.TournamentName }}</td>
          <td>{{ tournament.fields.Date }}</td>
          <td>{{ tournament.fields.Participants }}</td>
          <td>{{ tournament.fields.Place }}</td>
          <td>
            <button 
              class="delete-button" 
              @click="handleDelete(tournament.id, tournament.fields.TournamentName)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
</style>
