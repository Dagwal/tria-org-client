"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchDepartments } from "@/store/slices/call";
import EmployeeItem from "../_components/DepartmentItem";
import { Dispatch } from "@reduxjs/toolkit";
import { Box, Flex, Text } from "@mantine/core";
import Sidebar from "../_components/sidebar/sidebar";
import { useMediaQuery } from "@mantine/hooks";
import styles from "../_components/sidebar/sidebar.module.scss";


export const Dashboard: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const employees = useSelector((state: RootState) => state.departement.departement);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard Page</h1>
      <div className="w-full h-full">
        {employees.map((employee: any) => (
          <EmployeeItem key={employee.id} departement={employee} />
        ))}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Flex>
      <nav
        className={styles.nav}
        style={{
          // backgroundColor: "#fff",
          display: isMobile ? "none" : "block",
        }}
      >
        <Sidebar />
      </nav>
      <Box className="w-full flex p-6  bg-[#e7f4f7]">
        <Box className=" w-full p-6 bg-white">
          <Flex direction={"column"} className="py-2 mb-4 border-b-2">
            <Text fw={700} fz="xl" c={"#121A3E"}>
              Organization Structure Hierarchy
            </Text>
          </Flex>
          <Dashboard />
        </Box>
      </Box>
    </Flex>
  );
}
