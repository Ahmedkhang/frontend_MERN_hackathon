"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPatient } from '@/services/patientService';
import { PatientForm } from '@/components/patients/PatientForm';
import { Toast } from '@/components/patients/Toast';
import { PatientProtectedRoute } from '@/components/patients/PatientProtectedRoute';

export default function AddPatientPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleSubmit = async (data: {
    fullName: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    phone: string;
    address: string;
  }) => {
    try {
      setIsSubmitting(true);
      await createPatient(data);
      setToast({ message: 'Patient added successfully', type: 'success' });
      setTimeout(() => {
        router.push('/patients');
      }, 500);
    } catch (err) {
      setToast({ message: 'Failed to add patient. Please try again.', type: 'error' });
      console.error('Error adding patient:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/patients');
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Add New Patient</h1>
              <p className="mt-1 text-sm text-gray-500">
                Fill in the patient information below
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow p-6">
            <PatientForm
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
