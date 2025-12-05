//  // adjust the path to where you defined it
// import { api } from "./api"

// export async function getAllProducts() {
//   // If your baseURL is the backend root, include /store here
//   const res = await api.get("/store/products"
//     , {
//     params: {
//       limit: 50,
//     },
//   }
// )

//   // Medusa returns: { products, count, offset, limit }
//   return res.data.products
// }

// import { medusa } from "@/lib/medusa-client"
  
// export async function getAllProducts() {
//   const { products } = await medusa.store.product.list({
//     limit: 20, // you can tune this
//     // you can also add filters like collection_id, q, etc.
//   })

//   return products
// }