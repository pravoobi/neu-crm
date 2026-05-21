import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './AppLayout'

function renderLayout(path = '/app/dashboard') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/app/*" element={<AppLayout />}>
          <Route path="dashboard" element={<div>Dashboard content</div>} />
          <Route path="contacts" element={<div>Contacts content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}

describe('AppLayout', () => {
  it('renders the sidebar logo', () => {
    renderLayout()
    expect(screen.getByText('NeuCRM')).toBeInTheDocument()
  })

  it('renders the topbar page title', () => {
    renderLayout('/app/dashboard')
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })

  it('renders the outlet content', () => {
    renderLayout('/app/dashboard')
    expect(screen.getByText('Dashboard content')).toBeInTheDocument()
  })

  it('renders outlet content for a different route', () => {
    renderLayout('/app/contacts')
    expect(screen.getByText('Contacts content')).toBeInTheDocument()
  })

  it('renders the user profile in the sidebar footer', () => {
    renderLayout()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })
})
