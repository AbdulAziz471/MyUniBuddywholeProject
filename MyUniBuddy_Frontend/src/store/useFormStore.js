import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFormStore = create(
  persist(
    (set, get) => ({
      // ================================
      // 📦 State
      // ================================
      studentInfo: {},
      studentId: null,
   
      setStudentInfo: (info) => {
        const {
          studentId,
          
        } = get();

        set({
          studentInfo: {
            ...get().studentInfo,
            ...info,
            studentId,
          },
        });
      },


      // Set student metadata after student is created
      setStudentMeta: ({ studentId, }) =>
        set({
          studentId,
          studentApplicationId,
        }),

      // Update student fields selectively
      updateStudentFields: (fields) =>
        set((state) => ({
          studentInfo: {
            ...state.studentInfo,
            ...fields,
          },
        })),

      // Set dynamic form-specific fields

      // Reset entire student form state
      resetStudentInfo: () =>
        set({
          studentInfo: {},
          
          studentId: null,
          }),
    }),
    {
      name: "form-storage", // 🌐 Key in localStorage
    }
  )
);

export default useFormStore;
