import axios from 'axios'

const BASE_URL = 'http://localhost:8080/finance'

export const getAllRecords = (sortBy = 'date', sortDir = 'desc') => {
    return axios.get(`${BASE_URL}?sortBy=${sortBy}&sortDir=${sortDir}`)
}

export const getRecordById = (id) => {
    return axios.get(`${BASE_URL}/${id}`)
}

export const createRecord = (record) => {
    return axios.post(BASE_URL, record)
}

export const updateRecord = (id, record) => {
    return axios.put(`${BASE_URL}/${id}`, record)
}

export const deleteRecord = (id) => {
    return axios.delete(`${BASE_URL}/${id}`)
}