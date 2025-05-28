import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getSeatingChart = () => api.get('/seats')
export const assignSeat = (empId, seatId) => api.post('/seats/assign', { empId, seatId })
export const clearSeat = (seatId) => api.post(`/seats/clear/${seatId}`)

export default {
  getSeatingChart,
  assignSeat,
  clearSeat
}