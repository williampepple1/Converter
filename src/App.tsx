import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Homepage from './pages/Homepage';
import ImagePDF from './pages/ImagePDF';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Homepage/>,
      children: [
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