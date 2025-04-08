import { useState, useEffect } from "react";
import useGetStudyDetail from "@/hooks/study-detail/useGetStudyDetail";
import { useParams } from "react-router-dom";

export default function useStudyDetail() {
  const studyId = Number(useParams().studyId);
  const userId = 1;
  const { studyDetail, isDetailLoading } = useGetStudyDetail(studyId);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return {
    isDetailLoading,
    isMenuOpen,
    showTooltip,
    toggleMenu,
    studyDetail,
    setIsMenuOpen,
    studyId,
    userId,
  };
}
