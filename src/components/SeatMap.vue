<template>
  <div>
    <div v-for="seat in seats" :key="seat.id"
         :style="{ backgroundColor: getColor(seat), border: '1px solid black', margin: '5px', padding: '10px', display: 'inline-block' }"
         @click="selectSeat(seat)">
      {{ seat.seatNo }} <br/>
      <small>{{ seat.empId || '空位' }}</small>
    </div>
    <div>
      <select v-model="selectedEmpId">
        <option v-for="emp in employees" :key="emp.empId" :value="emp.empId">
          {{ emp.name }} ({{ emp.empId }})
        </option>
      </select>
      <button @click="assign">送出</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/seat.js'

const seats = ref([])
const employees = ref([])
const selectedEmpId = ref(null)
const selectedSeat = ref(null)

const fetchData = async () => {
  const res = await api.getSeatingChart()
  seats.value = res.data.seats
  employees.value = res.data.employees
}

const getColor = (seat) => {
  if (selectedSeat.value && seat.id === selectedSeat.value.id) return 'lightblue'
  if (!seat.empId) return 'lightgreen'
  return 'lightcoral'
}

const selectSeat = (seat) => {
  selectedSeat.value = seat
}

const assign = async () => {
  if (!selectedEmpId.value || !selectedSeat.value) return
  await api.assignSeat(selectedEmpId.value, selectedSeat.value.id)
  await fetchData()
  selectedEmpId.value = null
  selectedSeat.value = null
}

onMounted(fetchData)
</script>