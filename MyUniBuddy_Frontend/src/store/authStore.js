// store/authStore.js

import { create } from 'zustand';

const STORAGE_KEY = 'userLoginInfo';

/**
 * Read stored login info, preferring sessionStorage (ephemeral) over localStorage.
 */
const readStored = () => {
  try {
    const rawSession = sessionStorage.getItem(STORAGE_KEY);
    if (rawSession) return JSON.parse(rawSession);
    const rawLocal = localStorage.getItem(STORAGE_KEY);
    if (rawLocal) return JSON.parse(rawLocal);
  } catch (e) {
    console.error("Failed to parse stored login info", e);
  }
  return null;
};

/**
 * Persist login info. By default it goes into sessionStorage (cleared when tab/window closes).
 * If `persistent` is true, it goes into localStorage (survives restarts).
 */
const persist = ({ token, user }, persistent = false) => {
  try {
    const payload = JSON.stringify({ token, user });
    if (persistent) {
      localStorage.setItem(STORAGE_KEY, payload);
      sessionStorage.removeItem(STORAGE_KEY); // avoid duplication
    } else {
      sessionStorage.setItem(STORAGE_KEY, payload);
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.error("Failed to persist login info", e);
  }
};

/**
 * Clear from both storages.
 */
const clearPersisted = () => {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear stored login info", e);
  }
};

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  isAdminAuth: false,
  loading: true,
  user: null,
  token: null,

  /**
   * @param {string} token
   * @param {object} userData
   * @param {{ persistent?: boolean }} options  // if persistent=true, use localStorage; else sessionStorage
   */
  login: (token, userData = {}, { persistent = false } = {}) => {
    persist({ token, user: userData }, persistent);
    set({
      isLoggedIn: true,
      isAdminAuth: true,
      user: userData,
      token,
    });
  },

  logout: () => {
    clearPersisted();
    set({
      isLoggedIn: false,
      isAdminAuth: false,
      loading: false,
      user: null,
      token: null,
    });
  },

  initializeAuth: () => {
    const info = readStored();
    if (info?.token && info.user) {
      set({
        isLoggedIn: true,
        isAdminAuth: true,
        user: info.user,
        token: info.token,
      });
    } else {
      set({
        isLoggedIn: false,
        isAdminAuth: false,
        user: null,
        token: null,
      });
    }
    set({ loading: false });
  },

  isAuthenticated: () => {
    const info = readStored();
    return !!(info && info.token);
  },

  /**
   * Optional helper to retrieve current stored login info.
   */
  getLoginInfo: () => {
    return readStored();
  },
}));

export default useAuthStore;
