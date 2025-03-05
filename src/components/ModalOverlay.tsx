import { ReactNode } from "react";

export default function ModalOverlay({ children }: { children: ReactNode }) {
  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 z-[1000] flex items-center justify-center"
      style={{ backgroundColor: "rgba(51, 51, 51, 0.6)" }}
    >
      {children}
    </div>
  );
}
