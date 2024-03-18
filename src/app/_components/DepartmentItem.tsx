"use client";
import React, { useState } from "react";
import { Departement } from "@/store/types";
import { Button, Flex, Modal, Textarea } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  deleteDepartementById,
  updateDepartementById,
} from "@/store/slices/action";

interface DepartementProps {
  departement: Departement;
}

const DepartementItem: React.FC<DepartementProps> = ({ departement }) => {
  const [isManagingDepartementOpen, setIsManagingDepartementOpen] =
    useState(false);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to control edit modal visibility
  const [editedDepartement, setEditedDepartement] =
    useState<Departement>(departement); // State to hold edited department data

  const dispatch = useDispatch();

  const toggleManagingDepartement = () => {
    setIsManagingDepartementOpen(!isManagingDepartementOpen);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
    setEditedDepartement(departement); // Reset edited department data to current department data when opening modal
  };

  // Fetch parent department data from Redux store based on parentId
  const parentDepartment = useSelector((state: RootState) =>
    state.departement.departement.find((dep) => dep.id === departement.parentId)
  );

  const handleDelete = () => {
    dispatch(deleteDepartementById(departement.id));
    setShowDeleteConfirmation(false);
  };

  const handleEdit = () => {
    dispatch(
      updateDepartementById(editedDepartement.id ?? "", editedDepartement)
    );
    setIsEditModalOpen(false); // Close edit modal after submission
  };

  return (
    <div className="border rounded p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold">{departement?.name}</h3>

        <Flex justify={"space-around"}>
          <Button
            leftSection={<IconEye size={12} />}
            variant="outline"
            size="xs"
            onClick={toggleManagingDepartement}
          >
            {isManagingDepartementOpen ? "Hide" : "Show"}
          </Button>

          {/* Edit */}
          <Button
            leftSection={<IconEdit size={12} />}
            variant="outline"
            size="xs"
            onClick={toggleEditModal}
            className="ml-2"
          >
            Edit
          </Button>

          <Button
            leftSection={<IconTrash size={12} />}
            variant="outline"
            size="xs"
            onClick={() => setShowDeleteConfirmation(true)}
            className="ml-2"
          >
            Delete
          </Button>
        </Flex>
      </div>
      <p>{departement.description}</p>
      {isManagingDepartementOpen && (
        <p className="mt-2 text-green-500">
          Managing Departement:{" "}
          {parentDepartment ? parentDepartment.name : "None"}
        </p>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        opened={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        title="Confirm Delete"
        size="sm"
      >
        <p>Are you sure you want to delete this department?</p>
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            color="red"
            className="ml-2"
          >
            Delete
          </Button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        opened={isEditModalOpen}
        onClose={toggleEditModal}
        title="Edit Department"
        size="sm"
      >
        <form onSubmit={handleEdit}>
          {editedDepartement.id}
          <Textarea
            label="Department Name"
            value={editedDepartement.name}
            onChange={(e) =>
              setEditedDepartement({
                ...editedDepartement,
                name: e.target.value,
              })
            }
            required
          />
          <Textarea
            label="Description"
            value={editedDepartement.description}
            onChange={(e) =>
              setEditedDepartement({
                ...editedDepartement,
                description: e.target.value,
              })
            }
            required
          />
          <Button type="submit" variant="outline">
            Save Changes
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default DepartementItem;
