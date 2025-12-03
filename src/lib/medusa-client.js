import Medusa from "@medusajs/medusa-js";

export const medusaClient = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
  apiKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  defaultSalesChannelId: process.env.NEXT_PUBLIC_MEDUSA_SALES_CHANNEL_ID,
  maxRetries: 3,
});
