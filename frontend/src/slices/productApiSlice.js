import { apiSlice } from "./apiSlices";
import { PRODUCTS_URL } from "../constants";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5
        }),
        getProductDetails: builder.query({
            query: (productId) => {
                return {
                    url: `${PRODUCTS_URL}/${productId}`
                }
            },
            keepUnusedDataFor: 5,
        })
    }),
})

export const {useGetProductsQuery, useGetProductDetailsQuery} = productApiSlice; 