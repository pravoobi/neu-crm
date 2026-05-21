import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SettingsPage from './SettingsPage'

describe('SettingsPage', () => {
  it('renders the page heading', () => {
    render(<SettingsPage />)
    expect(screen.getByRole('heading', { name: 'Settings' })).toBeInTheDocument()
  })

  it('renders the page subtitle', () => {
    render(<SettingsPage />)
    expect(screen.getByText(/Manage your profile and notification preferences/i)).toBeInTheDocument()
  })

  it('renders the Profile section', () => {
    render(<SettingsPage />)
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })

  it('renders profile fields with default values', () => {
    render(<SettingsPage />)
    expect(screen.getByDisplayValue('Jane Smith')).toBeInTheDocument()
    expect(screen.getByDisplayValue('jane.smith@neucrm.io')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Admin')).toBeInTheDocument()
  })

  it('renders profile field labels', () => {
    render(<SettingsPage />)
    expect(screen.getByText('Full name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Role')).toBeInTheDocument()
  })

  it('renders the Save changes button', () => {
    render(<SettingsPage />)
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument()
  })

  it('shows Saved! feedback after clicking Save changes', () => {
    render(<SettingsPage />)
    expect(screen.queryByText('Saved!')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Save changes' }))
    expect(screen.getByText('Saved!')).toBeInTheDocument()
  })

  it('renders the Notifications section', () => {
    render(<SettingsPage />)
    expect(screen.getByText('Notifications')).toBeInTheDocument()
  })

  it('renders all notification labels', () => {
    render(<SettingsPage />)
    expect(screen.getByText('New contact added')).toBeInTheDocument()
    expect(screen.getByText('Campaign goes live')).toBeInTheDocument()
    expect(screen.getByText('Campaign completes')).toBeInTheDocument()
    expect(screen.getByText('Weekly digest email')).toBeInTheDocument()
  })

  it('checkboxes reflect default notification state', () => {
    render(<SettingsPage />)
    const newContact = screen.getByRole('checkbox', { name: 'New contact added' })
    const campaignComplete = screen.getByRole('checkbox', { name: 'Campaign completes' })
    expect(newContact).toBeChecked()
    expect(campaignComplete).not.toBeChecked()
  })

  it('toggling a checkbox changes its checked state', () => {
    render(<SettingsPage />)
    const checkbox = screen.getByRole('checkbox', { name: 'New contact added' })
    expect(checkbox).toBeChecked()
    fireEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('profile name field is editable', () => {
    render(<SettingsPage />)
    const nameInput = screen.getByDisplayValue('Jane Smith')
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
  })
})
