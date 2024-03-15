'use client';
import React, { useState } from "react";
import { Departement } from "@/store/types";
import { Button } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";

interface DepartementProps {
  departement: Departement;
}

const DepartementItem: React.FC<DepartementProps> = ({ departement }) => {
  const [isManagingDepartementOpen, setIsManagingDepartementOpen] =
    useState(false);

  const toggleManagingDepartement = () => {
    setIsManagingDepartementOpen(!isManagingDepartementOpen);
  };

  return (
    <div className="border rounded p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{departement?.name}</h3>

        <Button
          leftSection={<IconEye size={14} />}
          variant="outline"
          size="xs"
          onClick={toggleManagingDepartement}
        >
          {isManagingDepartementOpen ? "Hide" : "Show"} Managing Departement
        </Button>
      </div>
      <p>{departement.description}</p>
      {isManagingDepartementOpen && (
        <p className="mt-2 text-green-500">
          Managing Department: {departement?.parentId ? departement?.name : "None"}
        </p>
      )}
    </div>
  );
};

export default DepartementItem;
