import axios from "axios";
import { Departement } from "../types";
import { Dispatch } from "@reduxjs/toolkit";
import { addDepartement, removeDepartement, setDepartement, updateDepartement } from "./employeeSlice";

const baseUrl = 'http://localhost:4500';

export const fetchDepartments = () => async (dispatch: Dispatch) => {
  try {
    // Make API call to fetch employee
    const response = await axios.get(baseUrl + '/api/departement');
    dispatch(setDepartement(response.data));
  } catch (error) {
    // Handle error
    console.error('Error fetching departement:', error);
  }
};

export const fetchDepartmentsHeirarchical = () => async (dispatch: Dispatch) => {
  try {
    // Make API call to fetch departement
    const response = await axios.get(baseUrl + '/api/departement/hierarchical');
    dispatch(setDepartement(response.data));
  } catch (error) {
    // Handle error
    console.error('Error fetching departement:', error);
  }
}

export const createDepartment = (departementData: Departement) => async (dispatch: Dispatch) => {
  try {
    // Make API call to create departement
    const response = await axios.post(baseUrl + '/api/departement', departementData);
    dispatch(addDepartement(response.data));
  } catch (error) {
    // Handle error
    console.error('Error creating departement:', error);
  }
};

export const changeDepartment = (id: string, departementData: Departement) => async (dispatch: Dispatch) => {
  try {
    // Make API call to update departement
    const response = await axios.put(baseUrl + `/api/departement/${id}`, departementData);
    dispatch(updateDepartement({ id, departement: response.data }));
  } catch (error) {
    // Handle error
    console.error('Error updating departement:', error);
  }
};

export const deleteDepartment = (id: string) => async (dispatch: Dispatch) => {
  try {
    // Make API call to delete departement
    await axios.delete(baseUrl + `/api/departement/${id}`);
    dispatch(removeDepartement(id));
  } catch (error) {
    // Handle error
    console.error('Error deleting departement:', error);
  }
}