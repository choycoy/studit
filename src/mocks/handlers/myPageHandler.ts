import { http, HttpResponse } from "msw";
import { profileData, avgStatsData, upcomingStudies, ongoingStudies, completedStudies } from "../data/userMockData";
import { ModifyNicknameRequest } from "@/types/request";

const myPageHandler = [
  http.get("/user/:userId", ({ params }) => {
    const userId = Number(params.userId);
    if (isNaN(userId)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request. userId must be a number.",
        }),
        { status: 400 },
      );
    }

    const target = profileData.find((user) => user.userId === userId);
    if (!target) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `User ID ${userId} not found.`,
        }),
        { status: 404 },
      );
    }

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "User Data retrieved successfully.",
        data: target,
      }),
      { status: 200 },
    );
  }),
  http.put("/user/nickname/:userId", async ({ params, request }) => {
    const userId = Number(params.userId);
    if (isNaN(userId)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request. userId must be a number.",
        }),
        { status: 400 },
      );
    }

    const target = profileData.find((user) => user.userId === userId);
    if (!target) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `User ID ${userId} not found.`,
        }),
        { status: 404 },
      );
    }

    const body = (await request.json()) as ModifyNicknameRequest;
    if (!body) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request body or missing data.",
        }),
        { status: 400 },
      );
    }

    const { nickname } = body;
    if (!nickname) {
      return new HttpResponse(JSON.stringify({ success: false, message: "nickname is required." }), { status: 400 });
    }
    target.nickname = nickname;

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "Nickname has been successfully updated.",
      }),
      { status: 200 },
    );
  }),
  http.put("/user/profile-image/:userId", async ({ params, request }) => {
    const userId = Number(params.userId);
    if (isNaN(userId)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request. userId must be a number.",
        }),
        { status: 400 },
      );
    }

    const target = profileData.find((user) => user.userId === userId);
    if (!target) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `User ID ${userId} not found.`,
        }),
        { status: 404 },
      );
    }

    const formData = await request.formData();
    if (!formData) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request body or missing data.",
        }),
        { status: 400 },
      );
    }

    const img = formData.get("image") as string;
    if (!img) {
      return new HttpResponse(JSON.stringify({ success: false, message: "img is required." }), { status: 400 });
    }
    target.profileImage = img;

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "Nickname has been successfully updated.",
      }),
      { status: 200 },
    );
  }),
  http.get("/user/study-stats/:userId", ({ params }) => {
    const userId = Number(params.userId);
    if (isNaN(userId)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request. userId must be a number.",
        }),
        { status: 400 },
      );
    }

    const target = avgStatsData.find((user) => user.userId === userId);
    if (!target) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `User ID ${userId} not found.`,
        }),
        { status: 404 },
      );
    }

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "User Data retrieved successfully.",
        data: target,
      }),
      { status: 200 },
    );
  }),
  http.get("/user/study-list/upcoming/:userId", ({ params, request }) => {
    const userId = Number(params.userId);
    if (isNaN(userId)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request. userId must be a number.",
        }),
        { status: 400 },
      );
    }

    if (!upcomingStudies[userId]) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `No study list found for user ID ${userId}.`,
        }),
        { status: 404 },
      );
    }

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const paginatedData = upcomingStudies[userId].slice(startIndex, startIndex + pageSize);
    const hasNextPage = upcomingStudies[userId].length > startIndex + pageSize;

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "Upcoming Study List Data retrieved successfully.",
        data: paginatedData,
        hasNextPage,
      }),
      { status: 200 },
    );
  }),
  http.get("/user/study-list/ongoing/:userId", ({ params, request }) => {
    const userId = Number(params.userId);
    if (isNaN(userId)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request. userId must be a number.",
        }),
        { status: 400 },
      );
    }

    if (!ongoingStudies[userId]) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `No study list found for user ID ${userId}.`,
        }),
        { status: 404 },
      );
    }

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const paginatedData = ongoingStudies[userId].slice(startIndex, startIndex + pageSize);
    const hasNextPage = ongoingStudies[userId].length > startIndex + pageSize;

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "Ongoing Study List Data retrieved successfully.",
        data: paginatedData,
        hasNextPage,
      }),
      { status: 200 },
    );
  }),
  http.get("/user/study-list/completed/:userId", ({ params, request }) => {
    const userId = Number(params.userId);
    if (isNaN(userId)) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request. userId must be a number.",
        }),
        { status: 400 },
      );
    }

    if (!completedStudies[userId]) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `No study list found for user ID ${userId}.`,
        }),
        { status: 404 },
      );
    }

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const paginatedData = completedStudies[userId].slice(startIndex, startIndex + pageSize);
    const hasNextPage = completedStudies[userId].length > startIndex + pageSize;

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: "Completed Study List Data retrieved successfully.",
        data: paginatedData,
        hasNextPage,
      }),
      { status: 200 },
    );
  }),
];
export default myPageHandler;
