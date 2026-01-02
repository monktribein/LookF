import { apiSlice } from "../api/apiSlice";
import {
  CategoryResponse,
  IAddCategory,
  IAddCategoryResponse,
  ICategoryDeleteRes,
} from "@/types/category-type";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllCategories: builder.query<CategoryResponse, { parent?: string; isActive?: boolean } | void>({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters?.parent) params.set("parent", filters.parent);
        if (typeof filters?.isActive !== "undefined") {
          params.set("isActive", String(filters.isActive));
        }
        const qs = params.toString();
        return qs ? `/api/categories?${qs}` : `/api/categories`;
      },
      providesTags: ["AllCategory"],
      keepUnusedDataFor: 600,
    }),
    getSubCategories: builder.query<CategoryResponse, string>({
      query: (parentId) => `/api/categories/${parentId}/subcategories`,
      providesTags: ["AllCategory"],
      keepUnusedDataFor: 300,
    }),
    addCategory: builder.mutation<IAddCategoryResponse, IAddCategory>({
      query(data: IAddCategory) {
        return {
          url: `/api/categories`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllCategory"],
    }),
    deleteCategory: builder.mutation<ICategoryDeleteRes, string>({
      query(id: string) {
        return {
          url: `/api/categories/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllCategory"],
    }),
    editCategory: builder.mutation<IAddCategoryResponse, { id: string; data: Partial<IAddCategory> }>({
      query({ id, data }) {
        return {
          url: `/api/categories/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllCategory","getCategory"],
    }),
    getCategory: builder.query<IAddCategory, string>({
      query: (id) => `/api/categories/${id}`,
      providesTags:['getCategory']
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetSubCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryQuery, 
} = authApi;
