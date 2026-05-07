import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout'
import { Explore } from './pages/Explore'
import { Home } from './pages/Home'
import { MyVocab } from './pages/MyVocab'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'explore', element: <Explore /> },
      { path: 'my-vocab', element: <MyVocab /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
