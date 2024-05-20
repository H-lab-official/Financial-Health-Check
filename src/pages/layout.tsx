import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <main className="max-w-2xl mx-auto m-4 h-dynamic-screen">
      <Outlet />
    </main>
  );
}
