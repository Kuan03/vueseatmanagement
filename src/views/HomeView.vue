<template>
  <div class="container">
    <h1>員工座位安排系統</h1>

    <div>
      <label for="employee">選擇員工：</label>
      <select v-model="selectedEmpId">
        <option disabled value="">請選擇</option>
        <option v-for="emp in employees" :key="emp.empId" :value="emp.empId">
          {{ emp.name }}
        </option>
      </select>
    </div>

    <div style="margin-top: 10px;">
      <label for="seat">輸入座位序號：</label>
      <input type="number" v-model="seatSeq" placeholder="輸入 FloorSeatSeq">
    </div>

    <button @click="assignSeat" style="margin-top: 10px;">送出</button>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employees: [],
      selectedEmpId: '',
      seatSeq: '',
      message: ''
    }
  },
  mounted() {
    fetch("http://localhost:8080/api/seats/employees") // 確認你的後端 port
      .then(res => res.json())
      .then(data => {
        this.employees = data;
      })
      .catch(err => {
        console.error("載入員工失敗：", err);
      });
  },
  methods: {
    assignSeat() {
      if (!this.selectedEmpId || !this.seatSeq) {
        alert("請選擇員工並輸入座位序號");
        return;
      }

      fetch(`http://localhost:8080/api/seats/assign?empId=${this.selectedEmpId}&floorSeatSeq=${this.seatSeq}`, {
        method: 'POST'
      })
        .then(res => res.text())
        .then(msg => {
          this.message = msg;
        })
        .catch(err => {
          console.error("送出失敗：", err);
        });
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 400px;
  margin: auto;
  font-family: sans-serif;
}
</style>
