import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="h-full w-full max-w-3xl">
        <Outlet />
      </main>
    </div>
  );
}
