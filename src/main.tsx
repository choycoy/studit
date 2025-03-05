import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import worker from "@/mocks/browser";

async function startWorker() {
  await worker.start({
    onUnhandledRequest: "bypass",
  });
}

startWorker().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
