import axios from "axios";

const API_URL = "http://localhost:4500"; 

export const getAllDepartments = async () => {
  const response = await axios.get(`${API_URL}/departments`);
  return response.data;
};

export const addDepartment = async (department: any) => {
  const response = await axios.post(`${API_URL}/departments`, department);
  return response.data;
};

export const editDepartment = async (department: any) => {
  const response = await axios.put(
    `${API_URL}/departments/${department.id}`,
    department
  );
  return response.data;
};

export const deleteDepartment = async (id: string) => {
  const response = await axios.delete(`${API_URL}/departments/${id}`);
  return response.data;
};
