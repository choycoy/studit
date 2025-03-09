import { http, HttpResponse } from "msw";
import {
  userPoints,
  allPointRecords,
  chargedPoints,
  withDrawnPoints,
  deductedPoints,
  rewardPoints,
  refundPoints,
} from "../data/pointMockData";
import { PointRequest } from "@/types/interface";
import { profileData } from "../data/userMockData";
import { PointFilterType } from "@/types/interface";

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

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0].replace(/-/g, ".");
    const idxAll = allPointRecords[userId].findIndex((record) => record.date === formattedDate);
    const idxTop = chargedPoints[userId].findIndex((record) => record.date === formattedDate);

    const newRecord = {
      id: Date.now(),
      type: "충전" as PointFilterType,
      amount: amount,
      total_after: target1.totalPoints,
      time: today.toTimeString().split(" ")[0],
    };

    if (idxAll !== -1) {
      allPointRecords[userId][idxAll].records.unshift(newRecord);
    } else {
      allPointRecords[userId].unshift({
        date: formattedDate,
        records: [newRecord],
      });
    }

    if (idxTop !== -1) {
      chargedPoints[userId][idxTop].records.unshift(newRecord);
    } else {
      chargedPoints[userId].unshift({
        date: formattedDate,
        records: [newRecord],
      });
    }

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: `${amount} P has been successfully charged.`,
      }),
      { status: 200 },
    );
  }),
  http.post("/point/withdraw/:userId", async ({ params, request }) => {
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
    target1.totalPoints -= amount;
    target2.points -= amount;

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0].replace(/-/g, ".");
    const idxAll = allPointRecords[userId].findIndex((r) => r.date === formattedDate);
    const idxWithdraw = withDrawnPoints[userId].findIndex((r) => r.date === formattedDate);

    const newRecord = {
      id: Date.now(),
      type: "출금" as PointFilterType,
      amount: amount,
      total_after: target1.totalPoints,
      time: today.toTimeString().split(" ")[0],
    };

    if (idxAll !== -1) {
      allPointRecords[userId][idxAll].records.unshift(newRecord);
    } else {
      allPointRecords[userId].unshift({
        date: formattedDate,
        records: [newRecord],
      });
    }

    if (idxWithdraw !== -1) {
      withDrawnPoints[userId][idxWithdraw].records.unshift(newRecord);
    } else {
      withDrawnPoints[userId].unshift({
        date: formattedDate,
        records: [newRecord],
      });
    }

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: `${amount} P has been successfully withdrawn.`,
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
    const hasNextPage = allPointRecords[userId].length > startIndex + pageSize;

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
    const hasNextPage = chargedPoints[userId].length > startIndex + pageSize;

    return new HttpResponse(
      JSON.stringify({
        success: true,
        data: paginatedData,
        hasNextPage,
      }),
      { status: 200 },
    );
  }),
  http.get("/point/deduct/:userId", ({ params, request }) => {
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
    if (!deductedPoints[userId]) {
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
    const paginatedData = deductedPoints[userId].slice(startIndex, startIndex + pageSize);
    const hasNextPage = deductedPoints[userId].length > startIndex + pageSize;

    return new HttpResponse(
      JSON.stringify({
        success: true,
        data: paginatedData,
        hasNextPage,
      }),
      { status: 200 },
    );
  }),
  http.get("/point/withdraw/:userId", ({ params, request }) => {
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
    if (!withDrawnPoints[userId]) {
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
    const paginatedData = withDrawnPoints[userId].slice(startIndex, startIndex + pageSize);
    const hasNextPage = withDrawnPoints[userId].length > startIndex + pageSize;

    return new HttpResponse(
      JSON.stringify({
        success: true,
        data: paginatedData,
        hasNextPage,
      }),
      { status: 200 },
    );
  }),
  http.get("/point/reward/:userId", ({ params, request }) => {
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
    if (!rewardPoints[userId]) {
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
    const paginatedData = rewardPoints[userId].slice(startIndex, startIndex + pageSize);
    const hasNextPage = rewardPoints[userId].length > startIndex + pageSize;

    return new HttpResponse(
      JSON.stringify({
        success: true,
        data: paginatedData,
        hasNextPage,
      }),
      { status: 200 },
    );
  }),
  http.get("/point/refund/:userId", ({ params, request }) => {
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
    if (!refundPoints[userId]) {
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
    const paginatedData = refundPoints[userId].slice(startIndex, startIndex + pageSize);
    const hasNextPage = refundPoints[userId].length > startIndex + pageSize;

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
