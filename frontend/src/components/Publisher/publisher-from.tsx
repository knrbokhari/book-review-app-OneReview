import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Description from "../ui/description";
import Card from "../ui/card";
import Input from "../ui/input";
import TextArea from "../ui/text-area";
import Button from "../ui/button";
import {
  useCreatePublisherMutation,
  useUpdatePublisherMutation,
} from "@/apis/publisher";

type FormValues = {
  id?: any;
  name: string;
  description?: string;
  image?: string;
  cover_image?: string;
};

type IProps = {
  initialValues?: FormValues | null;
};

const PublisherForm = ({ initialValues }: IProps) => {
  const {
    mutate: createPublisher,
    isSuccess: createSuccess,
    isPending: creating,
  } = useCreatePublisherMutation();
  const {
    mutate: updatePublisher,
    isSuccess: updateSuccess,
    isPending: updating,
  } = useUpdatePublisherMutation();

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
    // resolver: yupResolver(PublisherValidationSchema),
  });

  const onSubmit = async (value: any) => {
    try {
      if (!initialValues) {
        await createPublisher(value); // Make sure this is awaited
      } else {
        await updatePublisher({
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
          } publisher's information and description from here.`}
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

          <TextArea
            label="Description"
            {...register("description")}
            variant="outline"
            className="mb-5"
          />

          <Input
            label="Image"
            {...register("image")}
            error={errors.image?.message!}
            variant="outline"
            className="mb-5"
            type="url"
            placeholder="Ex: http://one-review.com/image.jpg"
          />

          <input type="url" />

          <Input
            label="Cover Image"
            {...register("cover_image")}
            error={errors.cover_image?.message!}
            variant="outline"
            className="mb-5"
            type="url"
            placeholder="Ex: http://one-review.com/cover-image.jpg"
          />
        </Card>
      </div>
      <div className="mb-4 text-end">
        <Button>{initialValues ? "Update" : "Create"}</Button>
      </div>
    </form>
  );
};

export default PublisherForm;
