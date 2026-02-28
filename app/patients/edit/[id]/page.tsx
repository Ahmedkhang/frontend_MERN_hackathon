"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Patient, getPatientById, updatePatient } from '@/services/patientService';
import { PatientForm } from '@/components/patients/PatientForm';
import { Toast } from '@/components/patients/Toast';
import { PatientProtectedRoute } from '@/components/patients/PatientProtectedRoute';
import { Loader } from '@/components/Loader';

export default function EditPatientPage() {
  const router = useRouter();
  const params = useParams();
  const patientId = params.id as string;
  
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        const data = await getPatientById(patientId);
        setPatient(data);
      } catch (err) {
        setToast({ message: 'Failed to load patient data', type: 'error' });
        console.error('Error fetching patient:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  const handleSubmit = async (data: {
    fullName: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    phone: string;
    address: string;
  }) => {
    try {
      setIsSubmitting(true);
      await updatePatient(patientId, data);
      setToast({ message: 'Patient updated successfully', type: 'success' });
      setTimeout(() => {
        router.push('/patients');
      }, 500);
    } catch (err) {
      setToast({ message: 'Failed to update patient. Please try again.', type: 'error' });
      console.error('Error updating patient:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/patients');
  };

  if (loading) {
    return (
      <PatientProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader size="large" text="Loading patient data..." />
        </div>
      </PatientProtectedRoute>
    );
  }

  if (!patient) {
    return (
      <PatientProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Patient not found</p>
            <button
              onClick={() => router.push('/patients')}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Go back to patients
            </button>
          </div>
        </div>
      </PatientProtectedRoute>
    );
  }

  return (
    <PatientProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-4"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Patients
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Edit Patient</h1>
              <p className="mt-1 text-sm text-gray-500">
                Update patient information below
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow p-6">
            <PatientForm
              initialData={patient}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </PatientProtectedRoute>
  );
}
