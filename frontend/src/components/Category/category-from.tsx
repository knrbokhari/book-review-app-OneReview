import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Description from "../ui/description";
import Card from "../ui/card";
import Input from "../ui/input";
import Button from "../ui/button";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/apis/category";

type FormValues = {
  id?: any;
  name: string;
};

type IProps = {
  initialValues?: FormValues | null;
};

const CategoryForm = ({ initialValues }: IProps) => {
  const {
    mutate: createCategory,
    isSuccess: createSuccess,
    isPending: creating,
  } = useCreateCategoryMutation();
  const {
    mutate: updateCategory,
    isSuccess: updateSuccess,
    isPending: updating,
  } = useUpdateCategoryMutation();

  const {
    register,
    handleSubmit,
    control,
    setError,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    ...(initialValues && {
      defaultValues: initialValues,
    }),
    // resolver: yupResolver(CategoryValidationSchema),
  });

  const onSubmit = async (value: any) => {
    console.log(value);
    try {
      if (!initialValues) {
        await createCategory(value); // Make sure this is awaited
      } else {
        await updateCategory({
          ...value,
          id: initialValues.id!,
        });
      }
    } catch (error) {
      // const serverErrors = getErrorMessage(error);
      // Object.keys(serverErrors?.validation).forEach((field: any) => {
      //   setError(field.split(".")[1], {
      //     type: "manual",
      //     message: serverErrors?.validation[field][0],
      //   });
      // });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title="Description"
          details={`${
            initialValues ? "Edit" : "Add"
          } category's information from here.`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="Name"
            {...register("name")}
            error={errors.name?.message!}
            variant="outline"
            className="mb-5"
            isRequired={true}
          />
        </Card>
      </div>
      <div className="mb-4 text-end">
        <Button>{initialValues ? "Update" : "Create"}</Button>
      </div>
    </form>
  );
};

export default CategoryForm;
