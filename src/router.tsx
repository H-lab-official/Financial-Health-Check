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
        path: "/Financial-Health-Check",
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
        path: "/export-pdf",
        element: <PDFSave />,
        children: [],
      }, {
        path: "/showdata",
        element: <Showdata />,
        children: [],
      },
    ],
  },
]);
