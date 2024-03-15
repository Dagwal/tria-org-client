import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Departement } from '../types';

interface DepartementState {
  departement: Departement[];
}

const initialState: DepartementState = {
  departement: [],
};

const departementSlice = createSlice({
  name: 'departements',
  initialState,
  reducers: {
    setDepartement(state, action: PayloadAction<Departement[]>) {
      state.departement = action.payload;
    },
    addDepartement(state, action: PayloadAction<Departement>) {
      state.departement.push(action.payload);
    },
    updateDepartement(state, action: PayloadAction<{ id: string; departement: Departement }>) {
      const index = state.departement.findIndex(dep => dep.id === action.payload.id);
      if (index !== -1) {
        state.departement[index] = action.payload.departement;
      }
    },
    removeDepartement(state, action: PayloadAction<string>) {
      state.departement = state.departement.filter(dep => dep.id !== action.payload);
    },
  },
});

export const { setDepartement, addDepartement, updateDepartement, removeDepartement } = departementSlice.actions;
export default departementSlice.reducer;
