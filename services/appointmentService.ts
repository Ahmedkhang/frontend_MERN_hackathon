import api from './axios';

// Appointment interface
export interface Appointment {
  _id?: string;
  id?: string;
  patientId: string;
  patientName?: string;
  doctorId: string;
  doctorName?: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show';
  reason: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Get all appointments
export const getAllAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await api.get('/appointments');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

// Get appointment by ID
export const getAppointmentById = async (id: string): Promise<Appointment> => {
  try {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching appointment:', error);
    throw error;
  }
};

// Create new appointment
export const createAppointment = async (data: Omit<Appointment, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<Appointment> => {
  try {
    const response = await api.post('/appointments', data);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

// Update appointment
export const updateAppointment = async (id: string, data: Partial<Appointment>): Promise<Appointment> => {
  try {
    const response = await api.put(`/appointments/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

// Delete appointment
export const deleteAppointment = async (id: string): Promise<void> => {
  try {
    await api.delete(`/appointments/${id}`);
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};
