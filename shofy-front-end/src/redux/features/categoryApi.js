import { apiSlice } from "../api/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  overrideExisting:true,
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.parent) params.set("parent", filters.parent);
        if (typeof filters.isActive !== "undefined") {
          params.set("isActive", filters.isActive);
        }
        const qs = params.toString();
        return qs ? `/api/categories?${qs}` : `/api/categories`;
      }
    }),
    getSubCategories: builder.query({
      query: (parentId) => `/api/categories/${parentId}/subcategories`,
    }),
  }),
});

export const {
 useGetCategoriesQuery,
 useGetSubCategoriesQuery,
} = categoryApi;
