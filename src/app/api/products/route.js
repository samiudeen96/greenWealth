// import API from "@/services/axiosInstance";

// export async function GET() {
//   try {
//     const res = await API.get(`/products`);
//     return new Response(JSON.stringify(res.data), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     return new Response(JSON.stringify({ error: err.message }), { status: 500 });
//   }
// }


// import API from "@/services/axiosInstance";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     // Call Odoo API server-side
//     const res = await API.get("/products");

//     // Return JSON response to frontend
//     return NextResponse.json(res.data);
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message || "Failed to fetch products" },
//       { status: 500 }
//     );
//   }
// }


// import API from "@/services/axiosInstance";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const res = await API.get("/products");
//     return NextResponse.json(res.data);
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }


// import API from "@/services/axiosInstance";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const res = await API.get("/products"); // full URL: baseURL + /products
//     return NextResponse.json(res.data);
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.response?.data || err.message },
//       { status: err.response?.status || 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import API from "@/services/axiosInstance";

export async function GET() {
  try {

    // Always filter for Floradyle
    const params = { "xStudioBrand.equals": "Floradyle" };

    const res = await API.get("/products", { params });
    return NextResponse.json(res.data);
  } catch (err) {
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: err.response?.status || 500 }
    );
  }
}
