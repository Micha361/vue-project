<script setup>
import { ref, onMounted, computed } from 'vue';
import { fetchTournaments, addTournament, deleteTournament } from '../Api/request.js';

const tournaments = ref([]);
const loading = ref(true);

const newTournament = ref({
  TournamentName: '',
  Date: '',
  Participants: '',
  Place: ''
});

const filterText = ref('');

onMounted(async () => {
  await load();
});

async function load() {
  loading.value = true;
  try {
    const data = await fetchTournaments();
    tournaments.value = data.records
      .filter(tournament => {
        return (
          tournament.fields.TournamentName &&
          tournament.fields.Date &&
          tournament.fields.Participants &&
          tournament.fields.Place
        );
      })
      .map(record => ({
       
        fields: record.fields,
      }));
    console.log('Gefilterte Turnierdaten:', tournaments.value);
  } catch (error) {
    console.error('Fehler beim Laden der Turnierdaten:', error);
  } finally {
    loading.value = false;
  }
}

async function handleAdd() {
  if (
    !newTournament.value.TournamentName ||
    !newTournament.value.Date ||
    !newTournament.value.Participants ||
    !newTournament.value.Place
  ) {
    alert('Bitte alle Felder ausfüllen.');
    return;
  }

  try {
    const addedTournament = await addTournament(newTournament.value);
    tournaments.value.push({
      fields: addedTournament.fields,
    });

    newTournament.value = {
      TournamentName: '',
      Date: '',
      Participants: '',
      Place: ''
    };

    console.log('Turnier erfolgreich hinzugefügt:', addedTournament);
  } catch (error) {
    console.error('Fehler beim Hinzufügen des Turniers:', error);
  }
}

async function handleDelete(tournamentName) {
  try {
    const confirmed = confirm(`Möchtest du das Turnier "${tournamentName}" wirklich löschen?`);
    if (!confirmed) return;

 
    const tournamentIndex = tournaments.value.findIndex(
      tournament => tournament.fields.TournamentName === tournamentName
    );

    if (tournamentIndex !== -1) {
      const tournamentToDelete = tournaments.value[tournamentIndex];
      await deleteTournament(tournamentToDelete.id); 
      tournaments.value.splice(tournamentIndex, 1);
    }
    console.log(`Turnier "${tournamentName}" gelöscht.`);
  } catch (error) {
    console.error('Fehler beim Löschen des Turniers:', error);
  }
}

const filteredTournaments = computed(() => {
  return tournaments.value.filter(tournament =>
    tournament.fields.TournamentName.toLowerCase().includes(filterText.value.toLowerCase())
  );
});
</script>

<template>
  <div>
    <h1>Turniere hinzufügen</h1>
    <table class="styled-table">
      <thead>
        <tr>
          <th>Turniername</th>
          <th>Datum</th>
          <th>Teilnehmer</th>
          <th>Ort</th>
          <th>Hinzufügen</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input v-model="newTournament.TournamentName" placeholder="Turniername"></td>
          <td><input v-model="newTournament.Date" type="date"></td>
          <td><input v-model="newTournament.Participants" placeholder="Teilnehmer"></td>
          <td><input v-model="newTournament.Place" placeholder="Ort"></td>
          <td><button class="add-button" @click="handleAdd">Hinzufügen</button></td>
        </tr>
      </tbody>
    </table>

    <h2>Turnierliste</h2>
    <input
      v-model="filterText"
      placeholder="Turniere nach Name filtern..."
      class="filter-input"
    />
    <div v-if="loading">Loading...</div>
    <table v-else class="styled-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Datum</th>
          <th>Teilnehmer</th>
          <th>Ort</th>
          <th>Löschen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tournament in filteredTournaments" :key="tournament.fields.TournamentName">
          <td>{{ tournament.fields.TournamentName }}</td>
          <td>{{ tournament.fields.Date }}</td>
          <td>{{ tournament.fields.Participants }}</td>
          <td>{{ tournament.fields.Place }}</td>
          <td>
            <button
              class="delete-button"
              @click="handleDelete(tournament.fields.TournamentName)"
            >
              Löschen
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
.filter-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
}
</style>
