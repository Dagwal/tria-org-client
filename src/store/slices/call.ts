import axios from "axios";
import { Departement } from "../types";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { addDepartement, removeDepartement, getDepartement, updateDepartement } from "./employeeSlice";

const baseUrl = 'http://localhost:4500';

export const fetchDepartements = () => async (dispatch: Dispatch) => {
  try {
    // Make API call to fetch departement
    const response = await axios.get(baseUrl + '/api/departement');
    dispatch(getDepartement(response.data));
  } catch (error) {
    // Handle error
    console.error('Error fetching departement:', error);
  }
};

export const fetchDepartementsHeirarchical = () => async (dispatch: Dispatch) => {
  try {
    // Make API call to fetch departement heirarchical
    const response = await axios.get(baseUrl + '/api/departement/hierarchical');
    dispatch(getDepartement(response.data));
  } catch (error) {
    // Handle error
    console.error('Error fetching departement:', error);
  }
}

export const createDepartement = (departmentData: Departement) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post(baseUrl + '/api/department', departmentData);
    dispatch(addDepartement(response.data));
  } catch (error) {
    console.error('Error creating department:', error);
    // Optionally dispatch an action to handle the error in the Redux store
  }
};

export const changeDepartement = (id: string, departementData: Departement) => async (dispatch: Dispatch<UnknownAction>) => {
  try {
    // Make API call to update departement
    const response = await axios.put(baseUrl + `/api/departement/${id}`, departementData);
    dispatch(updateDepartement({ id, departement: response.data }));
  } catch (error) {
    // Handle error
    console.error('Error updating departement:', error);
  }
};

export const deleteDepartement = (id: string) => async (dispatch: Dispatch) => {
  try {
    // Make API call to delete departement
    await axios.delete(baseUrl + `/api/departement/${id}`);
    dispatch(removeDepartement(id));
  } catch (error) {
    // Handle error
    console.error('Error deleting departement:', error);
  }
}