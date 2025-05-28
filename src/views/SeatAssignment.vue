<template>
  <div class="container">
    <h1>員工座位安排系統</h1>

    <label>選擇員工（員編）</label>
    <select v-model="selectedEmpId">
      <option value="" disabled>請選擇</option>
      <option v-for="emp in employees" :key="emp.empId" :value="emp.empId">
        {{ emp.empId }} - {{ emp.name }}
      </option>
    </select>

    <h2>樓層座位圖</h2>
    <div class="seat-map">
      <button
        v-for="seat in seats"
        :key="seat.floorSeatSeq"
        :class="{
          seat: true,
          occupied: seat.empId,
          selected: seat.floorSeatSeq === selectedSeatId
        }"
        @click="selectSeat(seat)"
      >
        {{ seat.seatNo }}
        <br />
        <span v-if="seat.empId">({{ seat.empId }})</span>
      </button>
    </div>

    <button @click="submit">送出</button>
  </div>
</template>

<script>
import { getAllSeats, assignSeat } from '@/api';
import axios from 'axios';

export default {
  data() {
    return {
      seats: [],
      employees: [],
      selectedEmpId: '',
      selectedSeatId: null
    };
  },
  methods: {
    loadSeats() {
      getAllSeats()
        .then(res => {
          this.seats = res.data;
        })
        .catch(err => {
          alert('無法載入座位資訊');
          console.error(err);
        });
    },
    loadEmployees() {
      axios
       .get('http://localhost:8080/api/seats/employees')
        .then(res => {
          this.employees = res.data;
        })
        .catch(err => {
          alert('無法載入員工資料');
          console.error(err);
        });
    },
    selectSeat(seat) {
      if (seat.empId && seat.empId !== this.selectedEmpId) {
        alert('該座位已被其他人佔用');
        return;
      }
      this.selectedSeatId = seat.floorSeatSeq;
    },
    submit() {
      if (!this.selectedEmpId || !this.selectedSeatId) {
        alert('請選擇員工與座位');
        return;
      }
      assignSeat(this.selectedEmpId, this.selectedSeatId)
        .then(() => {
          alert('指派成功');
          this.loadSeats(); // 更新畫面
        })
        .catch(err => {
          alert('指派失敗');
          console.error(err);
        });
    }
  },
  mounted() {
    this.loadSeats();
    this.loadEmployees();
  }
};
</script>

<style>
.container {
  padding: 20px;
}
.seat-map {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.seat {
  width: 80px;
  height: 60px;
  font-size: 12px;
  background-color: #d9edf7;
  border: 1px solid #ccc;
}
.seat.occupied {
  background-color: #f2dede;
}
.seat.selected {
  background-color: #dff0d8;
}
</style>
