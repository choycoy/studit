import { useQuery } from "@tanstack/react-query";
import pointApis from "@/service/pointApis";

export default function useGetUserPoints(userId: number) {
  const {
    data,
    isLoading: isUserPointsLoading,
    refetch: refetchUserPoints,
  } = useQuery({
    queryKey: ["getUserPoints"],
    queryFn: () => pointApis.getUserPoints(userId),
  });
  const userPoints = data?.data;
  return { userPoints, isUserPointsLoading, refetchUserPoints };
}
