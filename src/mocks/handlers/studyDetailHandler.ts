import { http, HttpResponse } from "msw";
import { dummyStudyList, dummyNotices } from "../data/studyMockData";

const studyDetailHandler = [
  http.get("/study/:studyId", ({ params }) => {
    const studyId = Number(params.studyId);

    if (isNaN(studyId)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request. studyId must be a number.",
        }),
        { status: 400 },
      );
    }

    const target = dummyStudyList.find((study) => study.roomId === studyId);
    if (!target) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `Study ID ${studyId} not found.`,
        }),
        { status: 404 },
      );
    }

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "Study retrieved successfully.",
        data: target,
      }),
      { status: 200 },
    );
  }),
  http.get("/study/notice/:studyId", ({ params }) => {
    const studyId = Number(params.studyId);

    if (isNaN(studyId)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid studyId. It must be a number.",
        }),
        { status: 400 },
      );
    }

    const notice = dummyNotices[studyId];

    if (!notice) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `No notice found for studyId: ${studyId}`,
        }),
        { status: 404 },
      );
    }

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "Notice retrieved successfully.",
        data: notice,
      }),
      { status: 200 },
    );
  }),
];
export default studyDetailHandler;
