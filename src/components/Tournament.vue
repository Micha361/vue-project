<script setup>
import { ref, onMounted } from 'vue';
import { fetchTournaments, deleteTournament } from '../Api/request.js';

const tournaments = ref([]);
const filteredTournaments = ref([]);
const loading = ref(true);
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
                return tournament.fields.TournamentName; // Filtert nur Turniere mit `TournamentName`
            })
            .map(record => ({
                id: record.id,
                fields: record.fields,
            }));
        filteredTournaments.value = tournaments.value;
        console.log('Gefilterte Turnierdaten mit Record IDs:', tournaments.value);
    } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
    } finally {
        loading.value = false;
    }
}

function filterTournaments() {
    if (!filterText.value.trim()) {
        filteredTournaments.value = tournaments.value;
        return;
    }
    filteredTournaments.value = tournaments.value.filter(tournament =>
        tournament.fields.TournamentName &&
        tournament.fields.TournamentName.toLowerCase().includes(filterText.value.toLowerCase())
    );
}

async function handleDelete(recordId, tournamentName) {
    try {
        const confirmed = confirm(`Möchtest du das Turnier "${tournamentName}" wirklich löschen?`);
        if (!confirmed) return;

        await deleteTournament(recordId);
        tournaments.value = tournaments.value.filter(tournament => tournament.id !== recordId);
        filteredTournaments.value = tournaments.value;
        console.log(`Turnier mit ID ${recordId} gelöscht.`);
    } catch (error) {
        console.error('Fehler beim Löschen:', error);
    }
}

/*async function handleAdd() {
    try {
        const newTournament = {
            TournamentId: 6,
            TournamentName: 'New Tournament',
            Date: '2025-01-01',
            Participants: 'Player A, Player B',
            Place: 'Zurich',
        };

        const addedTournament = await addTournament(newTournament);
        tournaments.value.push({
            id: addedTournament.id,
            fields: addedTournament.fields,
        });
        filteredTournaments.value = tournaments.value;

        console.log('Turnier erfolgreich hinzugefügt:', addedTournament);
    } catch (error) {
        console.error('Fehler beim Hinzufügen des Turniers:', error);
    }
}*/
</script>

<template>
<div>
    <h1>Turnier Hinzufügen</h1>
    <div>        
    </div>
    <div v-if="loading">Loading...</div>
    <table v-else class="styled-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Participants</th>
                <th>Place</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(tournament, index) in filteredTournaments" :key="tournament.id">
                <td>
                    <input
                        type="text"
                        v-model="tournament.fields.TournamentName"
                        placeholder="Turniername"
                    />
                </td>
                <td>
                    <input
                        type="date"
                        v-model="tournament.fields.Date"
                        placeholder="Datum"
                    />
                </td>
                <td>
                    <input
                        type="text"
                        v-model="tournament.fields.Participants"
                        placeholder="Teilnehmer"
                    />
                </td>
                <td>
                    <input
                        type="text"
                        v-model="tournament.fields.Place"
                        placeholder="Ort"
                    />
                </td>
                <td>
                    <button class="add-button" @click="handleAdd(index)">Add</button>
                </td> 
            </tr>
        </tbody>
    </table>
</div>


  <div>
      <h1>Turnierliste</h1>
      <div>
          <input
            type="text"
            v-model="filterText"
            @input="filterTournaments"
            placeholder="Turniere nach Name filtern..."
          />
      </div>
      <div v-if="loading">Loading...</div>
      <table v-else class="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Date</th>
          <th>Participants</th>
          <th>Place</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tournament in filteredTournaments" :key="tournament.id">
          <td>{{ tournament.fields.TournamentId }}</td>
          <td>{{ tournament.fields.TournamentName }}</td>
          <td>{{ tournament.fields.Date }}</td>
          <td>{{ tournament.fields.Participants }}</td>
          <td>{{ tournament.fields.Place }}</td>
          <td>
            <button 
            class="delete-button" 
            @click="handleDelete(tournament.id, tournament.fields.TournamentName)">Delete</button>
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
input {
  margin-bottom: 15px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
