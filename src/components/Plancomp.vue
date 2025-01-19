<template>
  <div class="schedule-container">
    <h1 class="title">Trainingsplan</h1>
    <p>Bitte füge unten deine gewünsten Trainings ein.</p>
    <table class="schedule-table">
      <thead>
        <tr>
          <th>Zeit</th>
          <th v-for="day in days" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(timeSlot, timeIndex) in timeSlots" :key="timeIndex">
          <td>{{ timeSlot.time }}</td>
          <td
            v-for="(day, dayIndex) in days"
            :key="dayIndex"
            class="schedule-cell"
          >
            <textarea
              class="activity-input"
              v-model="timeSlot.activities[day]"
              @input="saveSchedule"
              placeholder="---"
            ></textarea>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
      timeSlots: [],
    };
  },
  methods: {
    loadSchedule() {
      const savedSchedule = localStorage.getItem("schedule");
      if (savedSchedule) {
        this.timeSlots = JSON.parse(savedSchedule);
      } else {
        this.timeSlots = Array.from({ length: 16 }, (_, index) => ({
          time: `${String(6 + index).padStart(2, "0")}:00 - ${String(7 + index).padStart(2, "0")}:00`,
          activities: this.days.reduce((acc, day) => {
            acc[day] = "";
            return acc;
          }, {}),
        }));
      }
    },
    saveSchedule() {
      localStorage.setItem("schedule", JSON.stringify(this.timeSlots));
    },
  },
  mounted() {
    this.loadSchedule();
  },
};
</script>

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

.schedule-table thead {
  background-color: #333;
  color: #fff;
}

.schedule-table th,
.schedule-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.schedule-cell {
  background-color: #c9c9c9;
}

.schedule-cell:hover {
  cursor: pointer;
  background-color: #c9c9c9;
  background-color: #a0a0a0;
}

.activity-input {
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  font-size: 1rem;
  padding: 5px;
  box-sizing: border-box;
  background-color: transparent;
  text-align: center;
  font-family: Arial, sans-serif;
}
</style>
