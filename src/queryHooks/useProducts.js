import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"], 
    queryFn: async () => {
    const res = await axios.get("/api/products"); // call Next.js API route
    return res.data;
  }
  });
};
