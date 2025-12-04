// lib/medusa.js
import Medusa from "@medusajs/js-sdk"

if (!process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  throw new Error("Missing NEXT_PUBLIC_MEDUSA_BACKEND_URL")
}

if (!process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) {
  throw new Error("Missing NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY")
}

export const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})
