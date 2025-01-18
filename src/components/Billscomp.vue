<script setup>
import { ref, onMounted } from 'vue';
import { fetchBills, addBill, deleteBill } from '../Api/request.js';

const bills = ref([]);
const loading = ref(true);
const filterText = ref('');
const filteredBills = ref([]);

const newBill = ref({
    BillId: '',
    Name: '',
    Amount: '',
    DueDate: '',
    payed: false
});

onMounted(async () => {
    await load();
});

async function load() {
    loading.value = true;
    try {
        const data = await fetchBills();
        bills.value = data.records
            .filter(record => record.fields.Name) // Nur Rechnungen mit Namen behalten
            .map(record => ({
                id: record.id,
                fields: record.fields
            }));
        filteredBills.value = bills.value;
        console.log('Gefilterte Rechnungen geladen:', bills.value);
    } catch (error) {
        console.error('Fehler beim Laden der Rechnungen:', error);
    } finally {
        loading.value = false;
    }
}

function filterBills() {
    if (!filterText.value.trim()) {
        filteredBills.value = bills.value;
        return;
    }
    filteredBills.value = bills.value.filter(bill =>
        bill.fields.Name.toLowerCase().includes(filterText.value.toLowerCase())
    );
}

async function handleAdd() {
    if (!newBill.value.Name || !newBill.value.Amount || !newBill.value.DueDate) {
        alert('Bitte alle Felder ausfüllen.');
        return;
    }

    try {
        const addedBill = await addBill(newBill.value);
        bills.value.push({
            id: addedBill.id,
            fields: addedBill.fields
        });
        filteredBills.value = bills.value;

        newBill.value = {
            BillId: '',
            Name: '',
            Amount: '',
            DueDate: '',
            payed: false
        };

        console.log('Rechnung erfolgreich hinzugefügt:', addedBill);
    } catch (error) {
        console.error('Fehler beim Hinzufügen der Rechnung:', error);
    }
}

async function handleDelete(recordId, billName) {
    try {
        const confirmed = confirm(`Möchtest du die Rechnung "${billName}" wirklich löschen?`);
        if (!confirmed) return;

        await deleteBill(recordId);
        bills.value = bills.value.filter(bill => bill.id !== recordId);
        filteredBills.value = bills.value;
        console.log(`Rechnung mit ID ${recordId} gelöscht.`);
    } catch (error) {
        console.error('Fehler beim Löschen der Rechnung:', error);
    }
}
</script>

<template>
  <div>
    <h1>Rechnungen</h1>
    <div>
      <input 
        v-model="filterText" 
        placeholder="Nach Name filtern..." 
        @input="filterBills"
        class="filter-input"
      />
    </div>
    <table class="styled-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>DueDate</th>
          <th>Payed</th>
          <th>Add</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input v-model="newBill.Name" placeholder="Rechnungsname"></td>
          <td><input v-model="newBill.Amount" placeholder="Betrag"></td>
          <td><input v-model="newBill.DueDate" type="date"></td>
          <td><input v-model="newBill.payed" type="checkbox"></td>
          <td><button class="add-button" @click="handleAdd">Add</button></td>
        </tr>
      </tbody>
    </table>

    <h2>Rechnungsliste</h2>
    <div v-if="loading">Loading...</div>
    <table v-else class="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Amount</th>
          <th>DueDate</th>
          <th>Payed</th>
          <th>Payed</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bill in filteredBills" :key="bill.id">
          <td>{{ bill.fields.BillId }}</td>
          <td>{{ bill.fields.Name }}</td>
          <td>{{ bill.fields.Amount }}</td>
          <td>{{ bill.fields.DueDate }}</td>
          <td>{{ bill.fields.payed ? 'Ja' : 'Nein' }}</td>
          <td><button 
              class="pay-button" 
              @click="handleDelete(bill.id, bill.fields.Name)">Yes</button></td>
          <td>
            <button 
              class="delete-button" 
              @click="handleDelete(bill.id, bill.fields.Name)">Delete</button>
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
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.pay-button {
  background-color: #382baf;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
</style>
