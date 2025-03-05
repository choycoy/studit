import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import worker from "@/mocks/browser";
import * as Sentry from "@sentry/react";

async function startWorker() {
  await worker.start({
    onUnhandledRequest: "bypass",
  });
}

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DNS,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", import.meta.env.VITE_SERVER_URL],
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
});

startWorker().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
