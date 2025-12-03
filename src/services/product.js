 // adjust the path to where you defined it
import { api } from "./api"

export async function getAllProducts() {
  // If your baseURL is the backend root, include /store here
  const res = await api.get("/store/products"
    , {
    params: {
      limit: 50,
    },
  }
)

  // Medusa returns: { products, count, offset, limit }
  return res.data.products
}
