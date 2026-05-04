import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import GodCore from './pages/GodCore'
import DisputeDesk from './pages/DisputeDesk'
import EnginePage from './pages/engines/EnginePage'
import Covenant from './pages/Covenant'
import Wallet from './pages/Wallet'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/god-core" element={<GodCore />} />
        <Route path="/dispute-desk" element={<DisputeDesk />} />
        <Route path="/engine/:slug" element={<EnginePage />} />
        <Route path="/covenant" element={<Covenant />} />
        <Route path="/wallet" element={<Wallet />} />
      </Route>
    </Routes>
  )
}
