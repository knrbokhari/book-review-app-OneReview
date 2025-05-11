import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Description from "@/components/ui/description";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/text-area";
import Button from "@/components/ui/button";
import { useCreateBookMutation, useUpdateBookMutation } from "@/apis/book";
import Label from "@/components/ui/label";
import ValidationError from "@/components/ui/form-validation-error";
import { DatePicker } from "@/components/ui/date-picker";
import BookCategoryInput from "./book-category-input";
import BookAuthorInput from "./book-author-input";
import BookPublisherInput from "./book-publisher-input";

type FormValues = {
  [x: string]: any;
  id?: any;
  subtitle?: any;
  name: string;
  description?: string;
  image?: string;
  cover_image?: string;
  page?: string;
  publicationDate?: string;
  price: number;
  author: any;
  publication: any;
  categories: any;
};

type IProps = {
  initialValues?: FormValues | null;
};

const BookForm = ({ initialValues }: IProps) => {
  const {
    mutate: createBook,
    isSuccess: createSuccess,
    isPending: creating,
  } = useCreateBookMutation();
  const {
    mutate: updateBook,
    isSuccess: updateSuccess,
    isPending: updating,
  } = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    ...(initialValues && {
      defaultValues: {
        ...initialValues,
        author: {
          id: initialValues?.author?.id,
          name: initialValues?.author?.name,
        },
        publication: {
          id: initialValues?.publicationId,
          name: initialValues?.publication?.name,
        },
        categories: [
          ...(initialValues?.categories?.map((i: any) => {
            return {
              id: i?.id,
              name: i?.name,
            };
          }) || []),
        ],
      },
    }),
    // resolver: yupResolver(BookValidationSchema),
  });

  const onSubmit = async (value: any) => {
    try {
      if (!initialValues) {
        await createBook(value);
      } else {
        await updateBook({
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
          } book's information and description from here.`}
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

          <BookCategoryInput control={control} setValue={setValue} />
          <BookAuthorInput control={control} setValue={setValue} />
          <BookPublisherInput control={control} setValue={setValue} />

          <Input
            label="Price"
            {...register("price")}
            error={errors.price?.message!}
            variant="outline"
            className="mb-5"
            isRequired={true}
          />

          <Input
            label="Page"
            {...register("page")}
            error={errors.page?.message!}
            variant="outline"
            className="mb-5"
            isRequired={true}
          />

          <div className="mb-5 w-full">
            <Label>
              Publication Date<span className="text-red">*</span>
            </Label>
            <Controller
              control={control}
              name="publicationDate"
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
            <ValidationError message={errors.publicationDate?.message!} />
          </div>

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
        </Card>
      </div>
      <div className="mb-4 text-end">
        <Button>{initialValues ? "Update" : "Create"}</Button>
      </div>
    </form>
  );
};

export default BookForm;
