import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Homepage from './pages/Homepage';
import ImagePDF from './pages/ImagePDF';
import { Toaster } from 'react-hot-toast';
import Dashboard from "./pages/Dashboard";
import DocPDF from "./pages/DocPDF";

export default function App() {
  const router = createBrowserRouter([
    {
      element: <Homepage/>,
      children: [
        {
          path: '',
          element: <Dashboard />
        },
        {
          path: 'image-converter',
          element: <ImagePDF />,
        }
        ,
        {
          path: 'doc-pdf-converter',
          element: <DocPDF />,
        }
      ]
  },


])
  return (
    <div >
     <RouterProvider router={router} />
     <Toaster />
    </div>
  )
}