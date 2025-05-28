import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/seats'

export function getAllSeats() {
  return axios.get(`${API_BASE_URL}`);
}

export function assignSeat(empId, floorSeatSeq) {
  return axios.post(`${API_BASE_URL}/assign`, null, {
    params: {
      empId,
      floorSeatSeq
    }
  });
}
