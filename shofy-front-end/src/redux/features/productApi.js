import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.category) params.set("category", filters.category);
        if (filters.parent) params.set("parent", filters.parent);
        if (filters.subcategory) params.set("subcategory", filters.subcategory);
        if (filters.status) params.set("status", filters.status);
        if (!filters.status) params.set("status", "active");

        const search = params.toString();
        return search ? `/api/products?${search}` : `/api/products`;
      },
      providesTags:['Products']
    }),
    getProductType: builder.query({
      query: ({ type, query }) => {
        const qs = query ? `?${query}` : "";
        return `/api/product/${type}${qs}`;
      },
      providesTags:['ProductType']
    }),
    getOfferProducts: builder.query({
      query: (type) => `/api/product/offer?type=${type}`,
      providesTags:['OfferProducts']
    }),
    getPopularProductByType: builder.query({
      query: (type) => `/api/product/popular/${type}`,
      providesTags:['PopularProducts']
    }),
    getTopRatedProducts: builder.query({
      query: () => `/api/product/top-rated`,
      providesTags:['TopRatedProducts']
    }),
    // get single product
    getProduct: builder.query({
      query: (id) => `/api/product/single-product/${id}`,
      providesTags: (result, error, arg) => [{ type: "Product", id: arg }],
      invalidatesTags: (result, error, arg) => [
        { type: "RelatedProducts", id:arg },
      ],
    }),
    // get related products
    getRelatedProducts: builder.query({
      query: (id) => `/api/product/related-product/${id}`,
      providesTags: (result, error, arg) => [
        { type: "RelatedProducts", id: arg },
      ],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductTypeQuery,
  useGetOfferProductsQuery,
  useGetPopularProductByTypeQuery,
  useGetTopRatedProductsQuery,
  useGetProductQuery,
  useGetRelatedProductsQuery,
} = productApi;
