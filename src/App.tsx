import { Routes, Route } from 'react-router'
import { LanguageProvider } from './context/LanguageContext'
import Home from './pages/Home'

export default function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </LanguageProvider>
  )
}
