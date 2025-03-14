import { http, HttpResponse } from "msw";
import { dummyStudyList } from "../data/studyMockData";
import { StudyOngoingType } from "@/types/interface";

export const getPopularStudies = (studies: StudyOngoingType[]) => {
  return [...studies]
    .filter((study) => study.status === "ACTIVE")
    .sort((a, b) => {
      const scoreA = a.currentMembers * 3 + a.goalTime * 0.5 + (a.hasNotice ? 5 : 0);
      const scoreB = b.currentMembers * 3 + b.goalTime * 0.5 + (b.hasNotice ? 5 : 0);
      return scoreB - scoreA;
    })
    .slice(0, 10);
};

const homeHandlers = [
  http.get("/study-list/popular", () => {
    if (!dummyStudyList) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `Study List not found.`,
        }),
        { status: 404 },
      );
    }

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "Study List retrieved successfully.",
        data: getPopularStudies(dummyStudyList),
      }),
      { status: 200 },
    );
  }),
];
export default homeHandlers;
