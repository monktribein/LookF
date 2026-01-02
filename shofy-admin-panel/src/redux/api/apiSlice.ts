import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      try {
        const adminInfo = Cookies.get("admin");
        const userInfo = Cookies.get("userInfo");
        const raw = adminInfo || userInfo;
        if (raw) {
          const user = JSON.parse(raw);
          if (user?.accessToken) {
            headers.set("Authorization", `Bearer ${user.accessToken}`);
          }
        } else {
          console.warn("[api] No auth token found in cookies (admin/userInfo)");
        }
      } catch (error) {
        // Silently handle cookie parse errors to prevent console.error loops
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
  tagTypes: [
    "DashboardAmount",
    "DashboardSalesReport",
    "DashboardMostSellingCategory",
    "DashboardRecentOrders",
    "AllProducts",
    "StockOutProducts",
    "AllCategory",
    "AllBrands",
    "getCategory",
    "AllOrders",
    "getBrand",
    "ReviewProducts",
    "AllCoupons",
    "Coupon",
    "AllStaff",
    "Stuff"
  ],
});
