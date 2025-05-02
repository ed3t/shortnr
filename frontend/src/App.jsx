import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@app/pages/Index';
import Redirect from '@components/Redirect';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:shortUrl" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
