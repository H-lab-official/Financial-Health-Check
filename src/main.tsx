import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

// import "./assets/global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      {/* <BrowserRouter basename={"/financial-health-check/"}> */}
      <RouterProvider router={router} />
      {/* </BrowserRouter> */}
    </RecoilRoot>
  </React.StrictMode>
);
