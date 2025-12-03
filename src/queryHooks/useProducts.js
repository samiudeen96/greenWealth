import { getAllProducts } from "@/services/product";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"], 
    queryFn: getAllProducts
  });
};
