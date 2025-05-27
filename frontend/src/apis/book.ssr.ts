// import { dehydrate, QueryClient } from "@tanstack/react-query";
// import type { GetStaticPaths, GetStaticProps } from "next";
// import client from "./client";

// type ParsedQueryParams = {
//   slug: string;
//   id?: string;
// };

// type PageProps = {
//   book: any;
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   // Fetch your book list
//   const books = await client.book.getAll({}); // example function

//   const paths = books.map((book: any) => ({
//     params: {
//       id: book.id.toString(), // make sure id is a string
//       slug: book.slug,
//     },
//   }));

//   return {
//     paths,
//     fallback: "blocking", // or true/false based on your needs
//   };
// };

// export const getStaticProps: GetStaticProps<
//   PageProps,
//   ParsedQueryParams
// > = async ({ params }) => {
//   const { slug, id } = params!; //* we know it's required because of getStaticPaths

//   const queryClient = new QueryClient();
//   console.log(params, "params");

//   try {
//     const product = await client.book.getById(id!);
//     console.log(product);
//     const props = {
//       props: {
//         book: product,
//         dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
//       },
//       revalidate: 60,
//     };

//     // Check if the current destination is different from the fetched product's destination
//     // if (destination !== `/book/${product.id}/${product.slug}`) {
//     //   return {
//     //     ...props,
//     //     revalidate: 60,
//     //     redirect: {
//     //       destination: `/book/${product.id}/${product.slug}`,
//     //       permanent: false,
//     //     },
//     //   };
//     // } else {
//     //   return {
//     //     ...props,
//     //   };
//     // }
//     return {
//       ...props,
//     };
//   } catch (error: any) {
//     console.log(error?.response?.data);
//     return {
//       notFound: true,
//     };
//   }
// };

import { dehydrate, QueryClient } from "@tanstack/react-query";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { ReactElement, ReactNode } from "react";
import client from "./client";
import page from "@/app/page";

type ParsedQueryParams = {
  slug: string;
  id: string; // make this required
};

type PageProps = {
  book: any;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await client.book.getAll({ page: 1, limit: 1000 }); // Fetch a limited number of books

  const paths = books.map((book: any) => ({
    params: {
      id: book.id.toString(),
      slug: book.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  PageProps,
  ParsedQueryParams
> = async ({ params }) => {
  console.log(params);
  if (!params?.id || !params?.slug) {
    return { notFound: true };
  }

  const queryClient = new QueryClient();

  try {
    const product = await client.book.getById(params.id);
    return {
      props: {
        book: product,
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
};
