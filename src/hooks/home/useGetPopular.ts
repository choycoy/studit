import { useQuery } from "@tanstack/react-query";
import homeApis from "@/service/homeApi";

export default function useGetPopular() {
  const { data, isLoading: isPopularLoading } = useQuery({
    queryKey: ["getPopular"],
    queryFn: () => homeApis.getPopular(),
  });
  const popularStudies = data?.data;
  return { popularStudies, isPopularLoading };
}
