import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
        <h1>This is Navbar</h1>
      <Outlet />
    </div>
  );
}