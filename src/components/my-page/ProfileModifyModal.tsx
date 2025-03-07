import ModalOverlay from "../ModalOverlay";
import EditIcon from "@/assets/icons/edit.svg";
import CloseIcon from "@/assets/icons/close.svg";
import { handleMaxLengthChange, handleKeyDown } from "../../utils/commonUtils";
import { useState, useRef, ChangeEvent } from "react";
import useModifyNickname from "@/hooks/my-page/useModifyNickname";
import useModifyProfileImg from "@/hooks/my-page/useModifyProfileImg";
import * as Sentry from "@sentry/react";

export default function ProfileModifyModal({
  userImg,
  nickname,
  isOpen,
  close,
  userId,
}: {
  userImg: string;
  nickname: string;
  isOpen: boolean;
  close: () => void;
  userId: number;
}) {
  const [profile, setProfile] = useState({ userImg: userImg, nickname: nickname });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { modifyNickname } = useModifyNickname({
    currentNickname: profile.nickname,
    userId,
  });
  const { modifyProfileImg } = useModifyProfileImg({ currentImg: profile.userImg, userId });

  const handleModifyProfile = async (close: () => void) => {
    try {
      const promises = [];
      if (nickname !== profile.nickname && profile.nickname) promises.push(modifyNickname());
      if (userImg !== profile.userImg && profile.userImg) promises.push(modifyProfileImg());
      await Promise.all(promises);
      close();
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const handleClick = () => fileInputRef.current?.click();

  const handleImgUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile((prevState) => ({ ...prevState, userImg: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const onNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile((prevState) => ({ ...prevState, nickname: e.target.value }));
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <section className="modal-container">
        <h1 className="font-bold">프로필을 수정해요</h1>
        <div className="relative mt-3.5">
          <img src={profile.userImg} alt={profile.nickname + "프로필"} className="h-20 w-20 rounded-full" />
          <button
            className="bg-main hover:bg-main-hover absolute right-0 -bottom-1 cursor-pointer rounded-full p-1 text-white transition-colors"
            aria-label="프로필 사진 변경하기"
            onClick={handleClick}
          >
            <EditIcon className="h-5 w-5" alt="프로필 사진 변경" />
          </button>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImgUpload} className="hidden" />
        </div>
        <div className="mb-4 flex flex-col gap-y-1">
          <input
            onKeyDown={(e) => handleKeyDown(e, () => handleModifyProfile(close))}
            placeholder="변경할 닉네임 입력"
            type="text"
            onChange={(e) => handleMaxLengthChange(e, 8, onNicknameChange)}
            className="mt-6 w-[140px] border-b border-main py-1 pl-1.5 text-sm"
            value={profile.nickname}
          />
          <span className="text-xs self-end">{profile.nickname.length}/8</span>
        </div>
        <button aria-label="프로필 수정 모달 닫기" className="close-position" onClick={() => close()}>
          <CloseIcon className="close-btn" alt="프로필 수정 모달 닫기" />
        </button>
        <button onClick={() => handleModifyProfile(close)} className="button">
          수정하기
        </button>
      </section>
    </ModalOverlay>
  );
}
