import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Topbar from './Topbar'

function renderTopbar(path: string, onMenuClick = vi.fn()) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="*" element={<Topbar onMenuClick={onMenuClick} />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('Topbar', () => {
  it('shows "Dashboard" for /app/dashboard', () => {
    renderTopbar('/app/dashboard')
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })

  it('shows "Contacts" for /app/contacts', () => {
    renderTopbar('/app/contacts')
    expect(screen.getByRole('heading', { name: 'Contacts' })).toBeInTheDocument()
  })

  it('shows "Campaigns" for /app/campaigns', () => {
    renderTopbar('/app/campaigns')
    expect(screen.getByRole('heading', { name: 'Campaigns' })).toBeInTheDocument()
  })

  it('shows "Settings" for /app/settings', () => {
    renderTopbar('/app/settings')
    expect(screen.getByRole('heading', { name: 'Settings' })).toBeInTheDocument()
  })

  it('falls back to "NeuCRM" for an unknown path', () => {
    renderTopbar('/unknown/route')
    expect(screen.getByRole('heading', { name: 'NeuCRM' })).toBeInTheDocument()
  })

  it('calls onMenuClick when the menu button is clicked', async () => {
    const onMenuClick = vi.fn()
    renderTopbar('/app/dashboard', onMenuClick)
    const user = userEvent.setup()
    await user.click(screen.getByLabelText('Open sidebar'))
    expect(onMenuClick).toHaveBeenCalledOnce()
  })

  it('renders the search input', () => {
    renderTopbar('/app/dashboard')
    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument()
  })

  it('renders the notifications button', () => {
    renderTopbar('/app/dashboard')
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument()
  })
})
