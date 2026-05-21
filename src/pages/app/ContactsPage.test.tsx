import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ContactsPage from './ContactsPage'

// react-remove-scroll (used by Radix Dialog) pulls in comp-lib-prac's React instance.
// Vite's resolve.alias doesn't apply to native CJS require() calls, so we mock the
// package to a no-op passthrough — Dialog content still renders, no dual-React error.
vi.mock('react-remove-scroll', () => ({
  RemoveScroll: ({ children }: { children?: unknown }) => children,
}))

describe('ContactsPage', () => {
  it('renders the page heading', () => {
    render(<ContactsPage />)
    expect(screen.getByRole('heading', { name: 'Contacts' })).toBeInTheDocument()
  })

  it('renders total contacts count', () => {
    render(<ContactsPage />)
    expect(screen.getByText('6 total contacts')).toBeInTheDocument()
  })

  it('renders the Add Contact button', () => {
    render(<ContactsPage />)
    expect(screen.getByRole('button', { name: /add contact/i })).toBeInTheDocument()
  })

  it('renders table column headers', () => {
    render(<ContactsPage />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Last Contacted')).toBeInTheDocument()
  })

  it('renders all contact names', () => {
    render(<ContactsPage />)
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument()
    expect(screen.getByText('Marcus Williams')).toBeInTheDocument()
    expect(screen.getByText('Priya Nair')).toBeInTheDocument()
    expect(screen.getByText('James Okafor')).toBeInTheDocument()
    expect(screen.getByText('Elena Vasquez')).toBeInTheDocument()
    expect(screen.getByText('Tom Bradley')).toBeInTheDocument()
  })

  it('renders status badges', () => {
    render(<ContactsPage />)
    expect(screen.getByText('Customer')).toBeInTheDocument()
    expect(screen.getAllByText('Qualified').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Lead').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText('Churned')).toBeInTheDocument()
  })

  it('filters contacts by name', () => {
    render(<ContactsPage />)
    const searchInput = screen.getByPlaceholderText('Search contacts…')
    fireEvent.change(searchInput, { target: { value: 'Sarah' } })
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument()
    expect(screen.queryByText('Marcus Williams')).not.toBeInTheDocument()
  })

  it('filters contacts by company', () => {
    render(<ContactsPage />)
    const searchInput = screen.getByPlaceholderText('Search contacts…')
    fireEvent.change(searchInput, { target: { value: 'Globex' } })
    expect(screen.getByText('Marcus Williams')).toBeInTheDocument()
    expect(screen.queryByText('Sarah Chen')).not.toBeInTheDocument()
  })

  it('shows No results when filter matches nothing', () => {
    render(<ContactsPage />)
    const searchInput = screen.getByPlaceholderText('Search contacts…')
    fireEvent.change(searchInput, { target: { value: 'zzznomatch' } })
    expect(screen.getByText('No results.')).toBeInTheDocument()
  })

  it.skip('opens the Add Contact dialog when button is clicked', () => {
    render(<ContactsPage />)
    fireEvent.click(screen.getByRole('button', { name: /add contact/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Fill in the details to add a new contact.')).toBeInTheDocument()
  })
})
