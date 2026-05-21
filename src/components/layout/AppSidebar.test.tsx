import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import AppSidebar from './AppSidebar'

function renderSidebar(isOpen = true, onClose = vi.fn()) {
  return render(
    <MemoryRouter initialEntries={['/app/dashboard']}>
      <AppSidebar isOpen={isOpen} onClose={onClose} />
    </MemoryRouter>
  )
}

describe('AppSidebar', () => {
  it('renders the NeuCRM logo', () => {
    renderSidebar()
    expect(screen.getByText('NeuCRM')).toBeInTheDocument()
  })

  it('renders all four navigation labels', () => {
    renderSidebar()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Contacts')).toBeInTheDocument()
    expect(screen.getByText('Campaigns')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders the mock user name and role', () => {
    renderSidebar()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  it('renders the sign out button', () => {
    renderSidebar()
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument()
  })

  it('applies active class to the Dashboard link when on /app/dashboard', () => {
    renderSidebar()
    // NavItem renders as <a href="/app/dashboard"> — find it by href
    const link = screen.getByRole('link', { name: /dashboard/i })
    expect(link).toHaveClass('bg-accent')
  })

  it('does not apply active class to non-current links', () => {
    renderSidebar()
    const contactsLink = screen.getByRole('link', { name: /contacts/i })
    expect(contactsLink).not.toHaveClass('bg-accent')
  })

  it('calls onClose when a nav link is clicked', async () => {
    const onClose = vi.fn()
    renderSidebar(true, onClose)
    const user = userEvent.setup()
    await user.click(screen.getByRole('link', { name: /contacts/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
