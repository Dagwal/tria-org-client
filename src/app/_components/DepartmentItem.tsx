import React, { useState } from "react";
import { Departement } from "@/store/types";
import { Button } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";

interface DepartementProps {
  employee: Departement;
}

const DepartementItem: React.FC<DepartementProps> = ({ employee }) => {
  const [isManagingDepartementOpen, setIsManagingDepartementOpen] =
    useState(false);
  const [isManagedDepartementOpen, setIsManagedDepartementOpen] = useState(false);

  const toggleManagingDepartement = () => {
    setIsManagingDepartementOpen(!isManagingDepartementOpen);
  };

  const toggleManagedDepartement = () => {
    setIsManagedDepartementOpen(!isManagedDepartementOpen);
  };

  return (
    <div className="border rounded p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{employee.name}</h3>

        <Button
          leftSection={<IconEye size={14} />}
          variant="outline"
          size="xs"
          onClick={toggleManagingDepartement}
        >
          {isManagingDepartementOpen ? "Hide" : "Show"} Managing Departement
        </Button>
      </div>
      <p>{employee.description}</p>
      {isManagingDepartementOpen && (
        <p className="mt-2 text-green-500">
          Managing Department: {employee.parentId ? employee.name : "None"}
        </p>
      )}

      <div className="mt-4">
        <button
          className="bg-cyan-500 text-white py-1 px-2 rounded mr-2"
          onClick={toggleManagingDepartement}
        >
          {isManagedDepartementOpen ? "Hide" : "Render"} employees under its
          management
        </button>
        {isManagedDepartementOpen &&
          employee.children &&
          employee.children.length > 0 && (
            <div className="mt-2">
              <p className="text-lg font-semibold mb-1">
                Departements under its management:
              </p>
              <ul className="list-disc list-inside">
                {employee.children.map((child) => (
                  <li key={child.id}>{child.name}</li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
};

export default DepartementItem;
