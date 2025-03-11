import { useEffect, useState } from "react";
import aiApis from "@/service/aiApis";

interface ContentData {
  category: string;
  tags: string[];
  goalTime: number;
}

const Home = () => {
  const [sortedContents, setSortedContents] = useState<ContentData[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchContents = async () => {
      const contentsData = await aiApis.getStudyList();
      const targetContentData: ContentData = { category: "기타", tags: ["마음챙김", "사진", "요리"], goalTime: 35 };

      const worker = new Worker(new URL("../ai/contentWorker.ts", import.meta.url), { type: "module" });
      const startTime = performance.now();

      worker.postMessage({ targetContentData, contentsData });

      worker.onmessage = (event) => {
        const sortedContents = event.data;
        setSortedContents(sortedContents);
        const endTime = performance.now();
        setElapsedTime(endTime - startTime);
      };

      return () => worker.terminate();
    };
    fetchContents();
  }, []);

  return (
    <div>
      <h1>📌 가장 유사한 콘텐츠 순서:</h1>
      {elapsedTime !== null && <p>⏱ 처리 시간: {elapsedTime.toFixed(2)} ms</p>}
      {sortedContents.map((content, index) => (
        <div key={index}>
          {index + 1}. 카테고리: {content.category}, 태그: [{content.tags.join(", ")}], 목표 시간: {content.goalTime}
        </div>
      ))}
    </div>
  );
};

export default Home;
