import api from './axios';

// Doctor interface
export interface Doctor {
  _id?: string;
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  availableDays: string[];
  availableTime: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
}

// Get all doctors
export const getAllDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await api.get('/doctors');
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

// Get doctor by ID
export const getDoctorById = async (id: string): Promise<Doctor> => {
  try {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor:', error);
    throw error;
  }
};

// Create new doctor
export const createDoctor = async (data: Omit<Doctor, '_id' | 'id' | 'createdAt' | 'updatedAt'>): Promise<Doctor> => {
  try {
    const response = await api.post('/doctors', data);
    return response.data;
  } catch (error) {
    console.error('Error creating doctor:', error);
    throw error;
  }
};

// Update doctor
export const updateDoctor = async (id: string, data: Partial<Doctor>): Promise<Doctor> => {
  try {
    const response = await api.put(`/doctors/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating doctor:', error);
    throw error;
  }
};

// Delete doctor
export const deleteDoctor = async (id: string): Promise<void> => {
  try {
    await api.delete(`/doctors/${id}`);
  } catch (error) {
    console.error('Error deleting doctor:', error);
    throw error;
  }
};
