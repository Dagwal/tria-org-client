import { configureStore } from '@reduxjs/toolkit';
import departementReducer from './slices/reducers';

// combine reducers and create the Redux store.
const store = configureStore({
  reducer: {
    departement: departementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;