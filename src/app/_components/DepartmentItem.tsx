"use client";
import React, { useState } from "react";
import { Departement } from "@/store/types";
import { Button, Modal } from "@mantine/core";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { deleteDepartement } from "@/store/slices/call";

interface DepartementProps {
  departement: Departement;
}

const DepartementItem: React.FC<DepartementProps> = ({ departement }) => {
  const [isManagingDepartementOpen, setIsManagingDepartementOpen] = useState(false);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const dispatch = useDispatch();

  const toggleManagingDepartement = () => {
    setIsManagingDepartementOpen(!isManagingDepartementOpen);
  };

  // Fetch parent department data from Redux store based on parentId
  const parentDepartment = useSelector((state: RootState) =>
    state.departement.departement.find((dep) => dep.id === departement.parentId)
  );

  const handleDelete = () => {
    dispatch(deleteDepartement(departement.id));
    setShowDeleteConfirmation(false);
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

        <Button
          leftSection={<IconTrash size={14} />}
          variant="outline"
          size="xs"
          onClick={() => setShowDeleteConfirmation(true)}
          className="ml-2"
        >
          Delete
        </Button>
      </div>
      <p>{departement.description}</p>
      {isManagingDepartementOpen && (
        <p className="mt-2 text-green-500">
          Managing Departement:{" "}
          {parentDepartment ? parentDepartment.name : "None"}
        </p>
      )}
      <Modal
        opened={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        title="Confirm Delete"
        size="sm"
      >
        <p>Are you sure you want to delete this department?</p>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => setShowDeleteConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleDelete} color="red" className="ml-2">
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DepartementItem;
