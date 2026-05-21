import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@practics/ui'
import LandingPage from '@/pages/marketing/LandingPage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import AppLayout from '@/components/layout/AppLayout'
import DashboardPage from '@/pages/app/DashboardPage'
import ContactsPage from '@/pages/app/ContactsPage'
import CampaignsPage from '@/pages/app/CampaignsPage'
import SettingsPage from '@/pages/app/SettingsPage'

export default function App() {
  return (
    <HashRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Marketing */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* App — nested under AppLayout (sidebar + topbar) */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
