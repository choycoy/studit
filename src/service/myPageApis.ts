import client from "@/utils/client";

const myPageApis = {
  getProfile: async (userId: number) => {
    const { data } = await client.get(`/user/${userId}`);
    return data;
  },
  modifyNickname: async (userId: number, nickname: string) => {
    const { data } = await client.put(`/user/nickname/${userId}`, { nickname: nickname });
    return data;
  },
  modifyProfileImg: async (userId: number, img: string) => {
    const formData = new FormData();
    formData.append("image", img);
    const { data } = await client.put(`/user/profile-image/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
  getAvgStats: async (userId: number) => {
    const { data } = await client.get(`/user/study-stats/${userId}`);
    return data;
  },
};
export default myPageApis;
