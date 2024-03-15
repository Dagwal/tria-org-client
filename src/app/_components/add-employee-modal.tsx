import { Button, Flex, MultiSelect, Paper, Text, Textarea } from "@mantine/core";

import { Controller, useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { useSubmitResponseMutation } from "@/store/api/employee/employee.api";
import { useState } from "react";
import { UUID } from "crypto";
import { setDepartement } from "@/store/slices/employeeSlice";

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
}

const employeeSchema: ZodType<any> = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  parentId: z.string().uuid().min(1, { message: "Parent is required" }),
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

  // const [saveDepartement] = setDepartement({});

  const onSubmit = async (data: DepartementResponseType) => {
    setIsLoading(true);
    const tempData = {
      ...data,
    };

    try {
      closeModal();
      // const res = await saveDepartement(tempData).unwrap();
    } catch (e) {
      setIsLoading(false);
    }
  };

  const onError = (error: any) => {};

  const [isLoading, setIsLoading] = useState<boolean>(false);

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
          error={errors.rephrasedQuestion?.message?.toString()}
          withAsterisk
        />

        <Textarea
          label="Description"
          mt={"md"}
          {...register("description")}
          error={errors.request?.message?.toString()}
          withAsterisk
        />

        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <MultiSelect
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
