import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen w-full h-full">
      <Header />
      <main className="h-full w-full max-w-3xl text-grey-05">
        <Outlet />
      </main>
    </div>
  );
}
