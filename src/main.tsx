import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="font-new-allianz-neo">
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </div>
  </React.StrictMode>
);