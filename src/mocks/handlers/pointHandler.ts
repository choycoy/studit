import { http, HttpResponse } from "msw";
import { userPoints, allPointRecords, chargedPoints } from "../data/pointMockData";
import { PointRequest } from "@/types/interface";
import { profileData } from "../data/userMockData";

const pointHandler = [
  http.get("/point/:userId", ({ params }) => {
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

    const target = userPoints.find((user) => user.userId === userId);
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
        message: "Point Data retrieved successfully.",
        data: target,
      }),
      { status: 200 },
    );
  }),
  http.post("/point/charge/:userId", async ({ params, request }) => {
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

    const target1 = userPoints.find((user) => user.userId === userId);
    const target2 = profileData.find((user) => user.userId === userId);
    if (!target1 || !target2) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `User ID ${userId} not found.`,
        }),
        { status: 404 },
      );
    }

    const body = (await request.json()) as PointRequest;
    if (!body) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: "Invalid request body or missing data.",
        }),
        { status: 400 },
      );
    }

    const { amount } = body;
    if (!amount) {
      return new HttpResponse(JSON.stringify({ success: false, message: "amount is required." }), { status: 400 });
    }
    target1.totalPoints += amount;
    target2.points += amount;

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: `${amount} P has been successfully charged.`,
      }),
      { status: 200 },
    );
  }),
  http.get("/point/all/:userId", ({ params, request }) => {
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
    if (!allPointRecords[userId]) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `No point records found for user ID ${userId}.`,
        }),
        { status: 404 },
      );
    }

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const paginatedData = allPointRecords[userId].slice(startIndex, startIndex + pageSize);
    const hasNextPage = paginatedData.length === pageSize;

    return new HttpResponse(
      JSON.stringify({
        success: true,
        data: paginatedData,
        hasNextPage,
      }),
      { status: 200 },
    );
  }),
  http.get("/point/charge/:userId", ({ params, request }) => {
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
    if (!chargedPoints[userId]) {
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: `No point records found for user ID ${userId}.`,
        }),
        { status: 404 },
      );
    }

    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const paginatedData = chargedPoints[userId].slice(startIndex, startIndex + pageSize);
    const hasNextPage = paginatedData.length === pageSize;

    return new HttpResponse(
      JSON.stringify({
        success: true,
        data: paginatedData,
        hasNextPage,
      }),
      { status: 200 },
    );
  }),
];
export default pointHandler;
