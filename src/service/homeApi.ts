import client from "@/utils/client";
const homeApis = {
  getPopular: async () => {
    const { data } = await client.get("/study-list/popular");
    return data;
  },
};
export default homeApis;
