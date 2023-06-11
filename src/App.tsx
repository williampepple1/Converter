import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Homepage from './pages/Homepage';
import ImagePDF from './pages/ImagePDF';
import { Toaster } from 'react-hot-toast';
import Dashboard from "./pages/Dashboard";

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