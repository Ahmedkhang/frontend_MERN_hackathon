import api from './axios';

// Dashboard stats interface
export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  todayAppointments: number;
  pendingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
}

// Get dashboard statistics
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await api.get('/dashboard/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

// Get recent appointments
export const getRecentAppointments = async (limit: number = 5): Promise<any[]> => {
  try {
    const response = await api.get(`/appointments/recent?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent appointments:', error);
    throw error;
  }
};
