import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authorValidationSchema } from "./author-validations-scheme";
import Description from "../ui/description";
import Card from "../ui/card";
import Input from "../ui/input";
import TextArea from "../ui/text-area";
import Label from "../ui/label";
import Button from "../ui/button";
import ValidationError from "../ui/form-validation-error";
import { DatePicker } from "@/components/ui/date-picker";
import {
  useCreateAuthorMutation,
  useUpdateAuthorMutation,
} from "@/apis/authors";
import { getErrorMessage } from "@/utils/form-error";

type FormValues = {
  id?: any;
  name: string;
  slug?: string;
  bio?: string;
  death?: string;
  born?: string;
  image?: string;
  cover_image?: string;
};

type IProps = {
  initialValues?: FormValues | null;
};

const AuthorForm = ({ initialValues }: IProps) => {
  const {
    mutate: createAuthor,
    isSuccess: createSuccess,
    isPending: creating,
  } = useCreateAuthorMutation();
  const {
    mutate: updateAuthor,
    isSuccess: updateSuccess,
    isPending: updating,
  } = useUpdateAuthorMutation();

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
    // resolver: yupResolver(authorValidationSchema),
  });

  const onSubmit = async (value: any) => {
    try {
      if (!initialValues) {
        await createAuthor(value); // Make sure this is awaited
      } else {
        await updateAuthor({
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
          } author's information and bio from here.`}
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
            label="Bio"
            {...register("bio")}
            variant="outline"
            className="mb-5"
          />

          <div className="mb-5 flex flex-col sm:flex-row">
            <div className="mb-5 w-full p-0 sm:mb-0 sm:w-1/2 sm:pe-2">
              <Label>Born</Label>
              <Controller
                control={control}
                name="born"
                render={({ field: { onChange, onBlur, value } }) => (
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    //@ts-ignore
                    selected={value}
                    // selectsStart
                    startDate={new Date()}
                    className="border-border-base border"
                  />
                )}
              />
              <ValidationError message={errors.born?.message!} />
            </div>
            <div className="w-full p-0 sm:w-1/2 sm:ps-2">
              <Label>Death</Label>

              <Controller
                control={control}
                name="death"
                render={({ field: { onChange, onBlur, value } }) => (
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    onChange={onChange}
                    onBlur={onBlur}
                    //@ts-ignore
                    selected={value}
                    // selectsEnd
                    startDate={new Date()}
                    className="border-border-base border"
                  />
                )}
              />
              <ValidationError message={errors.death?.message!} />
            </div>
          </div>

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

export default AuthorForm;
