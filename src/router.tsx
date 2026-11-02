import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import CollectionsLayout from "./components/collections_layout/CollectionsLayout";
import NotFound from "./components/NotFound";
import CollectionPage from "./pages/collection_page/CollectionPage";
import QuestionPage from "./pages/question_page/QuestionPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/collections" replace />,
      },

      {
        path: "collections",
        children: [
          {
            index: true,
            element: <CollectionsLayout />,
          },
          {
            path: ":collectionId",
            element: <CollectionPage />,
          },
        ],
      },
      {
        path: "/questions/:questionId",
        element: <QuestionPage />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
