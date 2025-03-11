import { collection, getDocs } from "firebase/firestore";
import db from "@/firebaseConfig";

const aiApis = {
  getStudyList: async () => {
    const querySnapshot = await getDocs(collection(db, "studit"));
    const contents = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return contents;
  },
};
export default aiApis;
