import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const insertCandidate = payload => api.post(`/candidate`, payload);
export const getAllCandidates = () => api.get(`/candidates`);
export const updateCandidateById = (id, payload) => api.put(`/candidate/${id}`, payload);
export const getCandidateById = id => api.get(`/candidate/${id}`);
export const deleteCandidateById = id => api.delete(`/candidate/${id}`);

const apis = {
    insertCandidate,
    getAllCandidates,
    updateCandidateById,
    getCandidateById,
    deleteCandidateById
};

export default apis;