import api from './axios';

// Patient interface
export interface Patient {
  _id?: string;
  id?: string;
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
}

// Get all patients
export const getAllPatients = async (): Promise<Patient[]> => {
  try {
    const response = await api.get('/api/patients');
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

// Get patient by ID
export const getPatientById = async (id: string): Promise<Patient> => {
  try {
    const response = await api.get(`/api/patients/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching patient:', error);
    throw error;
  }
};

// Create new patient
export const createPatient = async (data: Omit<Patient, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> => {
  try {
    const response = await api.post('/api/patients', data);
    return response.data;
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
};

// Update patient
export const updatePatient = async (id: string, data: Partial<Patient>): Promise<Patient> => {
  try {
    const response = await api.put(`/api/patients/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating patient:', error);
    throw error;
  }
};

// Delete patient
export const deletePatient = async (id: string): Promise<void> => {
  try {
    await api.delete(`/api/patients/${id}`);
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw error;
  }
};
