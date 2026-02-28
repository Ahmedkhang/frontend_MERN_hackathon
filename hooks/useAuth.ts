"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
    isAuthenticated: false,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    setAuthState({
      user,
      token,
      loading: false,
      isAuthenticated: !!token && !!user,
    });
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setAuthState({
      user: data.user,
      token: data.token,
      loading: false,
      isAuthenticated: true,
    });

    router.push("/dashboard");
  }, [router]);

  // Register function
  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setAuthState({
        user: data.user,
        token: data.token,
        loading: false,
        isAuthenticated: true,
      });

      router.push("/dashboard");
    },
    [router]
  );

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setAuthState({
      user: null,
      token: null,
      loading: false,
      isAuthenticated: false,
    });

    router.push("/login");
  }, [router]);

  // Get token for API calls
  const getToken = useCallback(() => {
    return localStorage.getItem("token");
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
    getToken,
  };
}
