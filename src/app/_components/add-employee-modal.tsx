"use client";
import { Button, Flex, Paper, Select, Textarea } from "@mantine/core";
import { createDepartement, fetchDepartements } from "@/store/slices/action";
import { Controller, useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UUID } from "crypto";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

const ddata = [
  "CEO",
  "CTO",
  "CFO",
  "HR",
  "Sales",
  "Marketing",
  "Operations",
  "Finance",
  "Engineering",
  "Product",
];

export interface DepartementResponseType {
  name: string;
  description: string;
  parentId: UUID;
  tags: string[];
}

const employeeSchema: ZodType<any> = z.object({
  name: z.string().min(1, { message: "Departement Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  parentId: z.string().uuid().min(1, { message: "Parent is required" }),
  tags: z.array(z.string()).optional(),
});

export function DepartementForm({ closeModal }: { closeModal: () => void }) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch: Dispatch<any> = useDispatch();
  const onError = (error: any) => {};

  const onSubmit = (data: DepartementResponseType) => {
    console.log("Form submitted with data:", data);
    setIsLoading(true);
    try {
      dispatch(createDepartement(data));
      closeModal();
    } catch (error) {
      console.error("Error creating department:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper
      style={{
        position: "relative",
        backgroundColor: "var(--mantine-color-body)",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Textarea
          label="Departement Name"
          mt={"md"}
          {...register("name")}
          error={errors.name?.message?.toString()}
          withAsterisk
        />

        <Textarea
          label="Description"
          mt={"md"}
          {...register("description")}
          error={errors.description?.message?.toString()}
          withAsterisk
        />

        <Textarea
          label="Parent Id"
          mt={"md"}
          {...register("parentId")}
          error={errors.parentId?.message?.toString()}
          withAsterisk
        />

        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <Select
              {...field}
              mt={"md"}
              mb={"md"}
              label="Reports To"
              withAsterisk
              data={ddata}
              searchable
              clearable
              error={errors.tags?.message?.toString()}
            />
          )}
        />

        <Flex gap={8} mt="lg">
          <Button w={100} variant="outline">
            Clear
          </Button>
          <Button variant="outline" w={100} type="submit" loading={isLoading}>
            Submit
          </Button>
        </Flex>
      </form>
    </Paper>
  );
}
