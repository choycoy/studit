import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import pointApis from "@/service/pointApis";
import { PointFilterType, GroupedByDate } from "@/types/interface";
import { useMemo } from "react";

type PaginatedDataResponse = {
  data: GroupedByDate[];
  hasNextPage: boolean;
};

export default function useGetPointHistory(userId: number, selectedFilter: PointFilterType) {
  const apiFunction: Record<PointFilterType, (userId: number, pageParam: number) => Promise<PaginatedDataResponse>> = {
    전체: pointApis.getAllPoints,
    충전: pointApis.getChargedPoints,
    차감: pointApis.getDeductedPoints,
    출금: pointApis.getWithdrawnPoints,
    보상: pointApis.getRewardPoints,
    환불: pointApis.getRefundPoints,
  };

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery<PaginatedDataResponse, Error>({
    queryKey: [selectedFilter],
    queryFn: ({ pageParam = 1 }: QueryFunctionContext) =>
      apiFunction[selectedFilter](userId as number, pageParam as number),
    getNextPageParam: (lastPage: PaginatedDataResponse, allPages: PaginatedDataResponse[]) => {
      if (lastPage.hasNextPage) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const pointHistory = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.data);
  }, [data]);

  return { pointHistory, isLoading, refetch, fetchNextPage, hasNextPage };
}
