import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/pages/layout";
import ErrorPage from "@/pages/error";
import EducationPlan from "@/pages/educationPlan";
import HealthPlan from "@/pages/healthPlan";
import ProtectionPlan from "@/pages/protectionPlan";
import RetirementPlan from "@/pages/retirementPlan";
import HomePage from "@/pages/home";
import PDFSave from "@/pages/pdfSave";
import Summary from "@/pages/summary";
import Showdata from "@/pages/showdata";
//edit
import Editeducationplan from "@/pages/edit/educationplan";
import Edithealthplan from "@/pages/edit/healthplan";
import Editprotectionplan from "@/pages/edit/protectionplan";
import Editretirementplan from "@/pages/edit/retirementplan";
//view
import Vieweducationplan from "@/pages/viewdata/educationplan";
import Viewhealthplan from "@/pages/viewdata/healthplan";
import Viewprotectionplan from "@/pages/viewdata/protectionplan";
import Viewretirementplan from "@/pages/viewdata/retirementplan";
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        children: [],
      },
     
      {
        path: "/education-plan",
        element: <EducationPlan />,
        children: [],
      },
      {
        path: "/health-plan",
        element: <HealthPlan />,
        children: [],
      },
      {
        path: "/protection-plan",
        element: <ProtectionPlan />,
        children: [],
      },
      {
        path: "/retirement-plan",
        element: <RetirementPlan />,
        children: [],
      },
      {
        path: "/summary",
        element: <Summary />,
        children: [],
      },
      {
        path: "/report",
        element: <PDFSave />,
        children: [],
      }, {
        path: "/showdata",
        element: <Showdata />,
        children: [],
      }, {
        path: "/edit/educationplan",
        element: <Editeducationplan />,
        children: [],
      }, {
        path: "/edit/healthplan",
        element: <Edithealthplan />,
        children: [],
      }, {
        path: "/edit/protectionplan",
        element: <Editprotectionplan />,
        children: [],
      }, {
        path: "/edit/retirementplan",
        element: <Editretirementplan />,
        children: [],
      },
      {
        path: "/view/retirementplan/:id",
        element: <Viewretirementplan />,
        children: [],
      },
      {
        path: "/view/educationplan/:id",
        element: <Vieweducationplan />,
        children: [],
      },
      {
        path: "/view/healthplan/:id",
        element: <Viewhealthplan />,
        children: [],
      },
      {
        path: "/view/protectionplan/:id",
        element: <Viewprotectionplan />,
        children: [],
      },
    ],
  },
]);
