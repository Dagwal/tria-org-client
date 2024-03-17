"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { fetchDepartements } from "@/store/slices/call";
import DepartementItem from "../_components/DepartmentItem";
import { Dispatch } from "@reduxjs/toolkit";
import { Box, Button, Flex, Modal, Text } from "@mantine/core";
import Sidebar from "../_components/sidebar/sidebar";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import styles from "../_components/sidebar/sidebar.module.scss";
import { IconPlus } from "@tabler/icons-react";
import { DepartementForm } from "../_components/add-employee-modal";
import { TableSelection } from "../_components/DepartementList";

export const Dashboard: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const departements = useSelector((state: RootState) => state.departement.departement);

  useEffect(() => {
    dispatch(fetchDepartements());
  }, [dispatch]);

  return (
    <div>
      <h1>Departements Page</h1>
      <div className="w-full h-full">
        {departements.map((departement: any) => (
          <DepartementItem key={departement.id} departement={departement} />
        ))}
      </div>
    </div>
  );
};



export default function DashboardPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Flex>
      <nav
        className={styles.nav}
        style={{
          backgroundColor: "#fff",
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
          <Flex justify="flex-end" gap={16} className="pt-6">
            <Button
              leftSection={<IconPlus size={14} />}
              variant="outline"
              size="xs"
              onClick={open}
              w={160}
            >
              Add Departement
            </Button>
            <Modal
              opened={opened}
              onClose={close}
              title="Add New Departement"
              size="md"
            >
              <DepartementForm closeModal={close} />
            </Modal>
          </Flex>

          <TableSelection />
        </Box>
      </Box>
    </Flex>
  );
}
