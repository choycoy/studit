import { http, HttpResponse } from "msw";
import { dummyStudyList } from "../data/studyMockData";

const studyDetailHandler = [
  http.get(`/study/:studyId`, ({ params }) => {
    const studyId = Number(params.studyId);

    if (isNaN(studyId)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "잘못된 요청입니다. studyId는 숫자여야 합니다.",
        }),
        { status: 400 },
      );
    }
    const target = dummyStudyList.find((study) => study.roomId === studyId);
    if (!target) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `스터디 ID ${studyId}를 찾을 수 없습니다.`,
        }),
        { status: 404 },
      );
    }
    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "스터디가 조회되었습니다.",
        data: target,
      }),
      { status: 200 },
    );
  }),
];
export default studyDetailHandler;
