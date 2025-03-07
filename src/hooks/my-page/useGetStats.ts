import { useQuery } from "@tanstack/react-query";
import myPageApis from "@/service/myPageApis";

export default function useAverageStats(userId: number) {
  const { data, isLoading: isAvgLoading } = useQuery({
    queryKey: ["getAvgStats", userId],
    queryFn: () => myPageApis.getAvgStats(userId),
  });
  const averageStats = data?.data;
  return { averageStats, isAvgLoading };
}
