import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { Departement } from "../types";
import { addDepartement, getDepartement, removeDepartement, updateDepartement, getHeirarchicalDepartements } from "./reducers";

const baseUrl = 'http://localhost:4500/api/departement';

export const fetchDepartements = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(baseUrl);
    dispatch(getDepartement(response.data));
  } catch (error) {
    console.error('Error fetching departements:', error);
  }
};

export const fetchHierarchicalDepartements = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(baseUrl + '/hierarchical');
    dispatch(getHeirarchicalDepartements(response.data));
  } catch (error) {
    console.error('Error fetching hierarchical departements:', error);
  }
};

export const createDepartement = (departmentData: Departement) => async (dispatch: Dispatch) =>{
  try {
    const response = await axios.post(baseUrl, departmentData);
    dispatch(addDepartement(response.data));
    return response;
  } catch (error) {
    console.error('Error creating departement:', error);
    throw error;
  }
};

export const updateDepartementById = (id: string, departementData: Departement) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, departementData);
    dispatch(updateDepartement({ id, departement: response.data }));
  } catch (error) {
    console.error('Error updating departement:', error);
  }
};

export const deleteDepartementById = (id: string) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
    dispatch(removeDepartement(id));
  } catch (error) {
    console.error('Error deleting departement:', error);
  }
};
