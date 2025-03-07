import { useQuery } from "@tanstack/react-query";
import myPageApis from "@/service/myPageApis";

export default function useGetProfile(userId: number) {
  const {
    data,
    isLoading: isUserDataLoading,
    refetch: reloadProfile,
  } = useQuery({
    queryKey: ["getProfile", userId],
    queryFn: () => myPageApis.getProfile(userId),
  });
  const userData = data?.data;
  return { userData, isUserDataLoading, reloadProfile };
}
