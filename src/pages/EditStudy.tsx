import { useParams } from "react-router-dom";
import useGetStudyDetail from "@/hooks/study-detail/useGetStudyDetail";
import { useState, useEffect } from "react";
import useStudyMutation from "@/hooks/study-detail/useStudyMutation";
import { handleMaxLengthChange } from "@/utils/commonUtils";

export default function EditStudy() {
  const params = useParams();
  const studyId = Number(params.studyId);
  const { studyDetail, isDetailLoading, refetchDetail } = useGetStudyDetail(studyId);
  const [editInfo, setEditInfo] = useState({
    title: "",
    description: "",
    tags: [] as string[],
  });
  const { editStudy } = useStudyMutation(editInfo, studyId, refetchDetail);
  const [tagInput, setTagInput] = useState("");
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (studyDetail) {
      setEditInfo({
        title: studyDetail.title || "",
        description: studyDetail.description || "",
        tags: studyDetail.tags || [],
      });
    }
  }, [studyDetail]);

  useEffect(() => {
    if (
      editInfo.title !== studyDetail?.title ||
      editInfo.description !== studyDetail?.description ||
      JSON.stringify(editInfo.tags) !== JSON.stringify(studyDetail?.tags)
    )
      setIsModified(true);
    else setIsModified(false);
  }, [editInfo, studyDetail]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!editInfo.tags.includes(tagInput.trim())) {
        setEditInfo((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditInfo((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };
  if (!studyDetail || isDetailLoading) return null;
  return (
    <div className="h-full w-full pt-3 pb-8">
      <section className="flex flex-col gap-y-3 px-4 text-sm">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="studyTitle" className="font-medium">
            스터디 제목
          </label>
          <input
            id="studyTitle"
            placeholder="스터디 제목을 입력해주세요"
            type="text"
            value={editInfo.title}
            onChange={(e) =>
              handleMaxLengthChange(e, 14, () => setEditInfo((prev) => ({ ...prev, title: e.target.value })))
            }
            className="text-input1"
          />
          <span className="self-end text-xs">{editInfo.title?.length}/14</span>
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="studyDescription" className="font-medium">
            스터디 설명
          </label>
          <textarea
            placeholder="스터디 설명을 입력해주세요"
            id="studyDescription"
            value={editInfo.description}
            onChange={(e) => setEditInfo((prev) => ({ ...prev, description: e.target.value }))}
            className="text-input1 h-[200px]"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="studyTags" className="font-medium">
            태그
          </label>
          <div className="relative w-[200px]">
            <span className="absolute top-1/2 left-1 -translate-y-1/2 text-sm">#</span>
            <input
              id="studyTags"
              type="text"
              value={tagInput}
              placeholder="태그 입력 후 Enter"
              onChange={(e) => setTagInput(e.target.value)}
              className="w-full border-b border-main py-1 pl-4 text-sm"
              onKeyDown={(e) => handleAddTag(e)}
              disabled={editInfo.tags.length > 4}
            />
          </div>
          <div className="mt-1 flex flex-wrap gap-2">
            {editInfo.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-main hover:bg-main-hover flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-medium text-white transition-colors"
              >
                #{tag}
                <button
                  className="text-xs text-white transition-colors"
                  onClick={() => handleRemoveTag(tag)}
                  aria-label="태그 제거"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          {editInfo.tags.length > 4 && <p className="mt-1 text-xs font-medium">*태그는 최대 5개까지 생성 가능해요.</p>}
        </div>
        <button
          onClick={() => {
            if (isModified) editStudy();
          }}
          className="mt-0.5 button"
          disabled={!isModified}
        >
          수정하기
        </button>
      </section>
    </div>
  );
}
