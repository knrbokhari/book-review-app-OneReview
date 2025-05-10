"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function getErrorMessage(error: any) {
  const processedError = {
    message: "",
    validation: [],
  };

  if (error?.graphQLErrors) {
    for (const graphQLError of error.graphQLErrors) {
      const category = graphQLError.extensions?.category;

      if (category === "validation") {
        processedError.message = graphQLError.message;
        processedError.validation = graphQLError.extensions?.validation || [];
        return processedError;
      } else if (category === "authorization") {
        Cookies.remove("auth_token");
        Cookies.remove("auth_permissions");

        // You can't call router.push() directly here, because this is not inside a component or hook.
        // Instead, return a flag to redirect, and handle the redirect in a React component.
        processedError.message = "Unauthorized";
        // processedError["redirect"] = true;
        return processedError;
      }
    }
  }

  processedError.message = error.message || "Something went wrong";
  return processedError;
}
