import * as yup from "yup";
import { InferType } from "yup";

const authorValidationSchemaDefinition = yup.object({
  name: yup.string().required("Name is required"),
  slug: yup.string(),
  bio: yup.string(),
  death: yup.string(),
  born: yup.string(),
  image: yup.string(),
  cover_image: yup.string(),
});

export const authorValidationSchema: typeof authorValidationSchemaDefinition =
  authorValidationSchemaDefinition;
