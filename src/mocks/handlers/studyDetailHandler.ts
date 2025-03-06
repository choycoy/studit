import { http, HttpResponse } from "msw";
import { dummyStudyList, dummyNotices } from "../data/studyMockData";
import { NoticeRequest } from "@/types/request";

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
  http.patch("/study/notice/:studyId", async ({ params, request }) => {
    const studyId = Number(params.studyId);
    if (isNaN(studyId)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request. 'studyId' must be a number.",
        }),
        { status: 400 },
      );
    }

    const body = (await request.json()) as NoticeRequest;
    if (!body) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request body or missing data.",
        }),
        { status: 400 },
      );
    }

    const notice = dummyNotices[studyId];
    if (!notice) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `No notice found for study ID ${studyId}.`,
        }),
        { status: 404 },
      );
    }
    const { content } = body;
    if (!content) {
      return new HttpResponse(JSON.stringify({ success: false, message: "content is required." }), { status: 400 });
    }

    notice.content = content;

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "Notice has been successfully updated.",
      }),
      { status: 200 },
    );
  }),
  http.post("/study/notice/:studyId", async ({ params, request }) => {
    const studyId = Number(params.studyId);
    if (isNaN(studyId)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request. 'studyId' must be a number.",
        }),
        { status: 400 },
      );
    }

    const body = (await request.json()) as NoticeRequest;
    if (!body) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request body or missing data.",
        }),
        { status: 400 },
      );
    }

    const { content } = body;
    if (!content) {
      return new HttpResponse(JSON.stringify({ success: false, message: "content is required." }), { status: 400 });
    }

    const target = dummyStudyList.find((dummyStudy) => dummyStudy.roomId === studyId);
    if (!target) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `No data found for study ID ${studyId}.`,
        }),
        { status: 404 },
      );
    }
    target.hasNotice = true;

    const newNotice = {
      noticeId: studyId,
      content: content,
      created: new Date().toISOString(),
    };
    dummyNotices[studyId] = newNotice;

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "Notice has been successfully created.",
      }),
      { status: 200 },
    );
  }),
  http.delete("/study/notice/:studyId", async ({ params }) => {
    const studyId = Number(params.studyId);
    if (isNaN(studyId)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request. 'studyId' must be a number.",
        }),
        { status: 400 },
      );
    }

    const target = dummyStudyList.find((dummyStudy) => dummyStudy.roomId === studyId);
    if (!target) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `No data found for study ID ${studyId}.`,
        }),
        { status: 404 },
      );
    }
    target.hasNotice = false;
    delete dummyNotices[studyId];
    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "Notice has been successfully deleted.",
      }),
      { status: 200 },
    );
  }),
];
export default studyDetailHandler;
