import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { StudyStatusType, StudyItemType } from "@/types/interface";
import myPageApis from "@/service/myPageApis";
import { useMemo } from "react";

type PaginatedDataResponse = {
  data: StudyItemType[];
  hasNextPage: boolean;
};

export default function useGetMyStudyList(userId: number, studyType: StudyStatusType) {
  const apiFunctions: Record<StudyStatusType, (userId: number, pageParam: number) => Promise<PaginatedDataResponse>> = {
    upcoming: myPageApis.getUpcomingList,
    ongoing: myPageApis.getOngoingList,
    completed: myPageApis.getCompletedList,
  };

  const { data, refetch, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<PaginatedDataResponse>({
    queryKey: [studyType],
    queryFn: ({ pageParam = 1 }: QueryFunctionContext) =>
      apiFunctions[studyType](userId as number, pageParam as number),
    getNextPageParam: (lastPage: PaginatedDataResponse, allPages: PaginatedDataResponse[]) => {
      if (lastPage.hasNextPage) return allPages.length + 1;
      return undefined;
    },
    initialPageParam: 1,
  });

  const studyList = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((page) => page.data);
  }, [data]);

  return {
    studyList,
    refetch,
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
}
