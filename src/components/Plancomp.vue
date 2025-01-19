<script>
import { ref, onMounted } from "vue";
import { fetchPlan, updatePlan, addPlan } from "../Api/request.js";

export default {
  setup() {
    const days = [
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
      "Sonntag",
    ];
    const timeSlots = ref([]);
    const loading = ref(true);

    async function loadPlan() {
      loading.value = true;
      try {
        const data = await fetchPlan();
        timeSlots.value = generateTimeSlotsWithActivities(data.records);
        console.log("Plan geladen:", timeSlots.value);
      } catch (error) {
        console.error("Fehler beim Laden des Plans:", error);
      } finally {
        loading.value = false;
      }
    }

    function generateTimeSlotsWithActivities(records) {
      const times = Array.from({ length: 16 }, (_, index) => ({
        time: `${String(8 + index).padStart(2, "0")}:00`,
        activities: days.reduce((acc, day) => {
          const record = records.find(
            (r) =>
              r.fields.Zeit === `${String(8 + index).padStart(2, "0")}` &&
              r.fields.Tag === day
          );
          acc[day] = record
            ? { id: record.id, Aktivität: record.fields.Aktivität || "" }
            : { id: null, Aktivität: "" };
          return acc;
        }, {}),
      }));
      return times;
    }

    async function updateActivity(time, day, activity) {
      const timeSlot = timeSlots.value.find((slot) => slot.time === time);
      const activityObj = timeSlot.activities[day];

      if (activityObj.id) {
       
        try {
          await updatePlan(activityObj.id, { Aktivität: activity });
          console.log("Aktivität aktualisiert:", { Aktivität: activity });
        } catch (error) {
          console.error("Fehler beim Aktualisieren der Aktivität:", error);
        }
      } else {
       
        try {
          const newRecord = {
            Zeit: time,
            Tag: day,
            Aktivität: activity || "",
          };
          const createdRecord = await addPlan(newRecord);
          activityObj.id = createdRecord.id; 
          console.log("Neuer Datensatz erstellt:", createdRecord);
        } catch (error) {
          console.error("Fehler beim Erstellen eines neuen Datensatzes:", error);
        }
      }
    }

    onMounted(() => {
      loadPlan();
    });

    return { days, timeSlots, loading, updateActivity };
  },
};
</script>

<template>
  <div class="schedule-container">
    <h1 class="title">Trainingsplan</h1>
    <div v-if="loading">Plan wird geladen...</div>
    <table class="schedule-table" v-else>
      <thead>
        <tr>
          <th>Zeit</th>
          <th v-for="day in days" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="timeSlot in timeSlots" :key="timeSlot.time">
          <td>{{ timeSlot.time }}</td>
          <td v-for="day in days" :key="day" class="schedule-cell">
            <textarea
              class="activity-input"
              v-model="timeSlot.activities[day].Aktivität"
              @blur="updateActivity(timeSlot.time, day, timeSlot.activities[day].Aktivität)"
              placeholder="---"
            ></textarea>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.schedule-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  text-align: center;
}

.title {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 20px;
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
}

.schedule-table th,
.schedule-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.schedule-cell {
  background-color: #242424;
  transition: 0.3s ease;
}

.schedule-cell:hover {
  background-color: #3d3d3d;
}

.activity-input {
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  font-size: 1rem;
  background-color: transparent;
  text-align: center;
  font-family: Arial, sans-serif;
}
</style>
