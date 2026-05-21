import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import LoginPage from './LoginPage'

function renderLogin() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  )
}

describe('LoginPage', () => {
  it('renders the heading', () => {
    renderLogin()
    expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument()
  })

  it('renders email and password inputs', () => {
    renderLogin()
    expect(screen.getByPlaceholderText('you@company.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    renderLogin()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('renders the register link', () => {
    renderLogin()
    expect(screen.getByText('Create one free')).toBeInTheDocument()
  })

  it('shows no error message on initial render', () => {
    renderLogin()
    expect(screen.queryByText('Please fill in all fields.')).not.toBeInTheDocument()
  })

  it('shows error when submitting with empty fields', async () => {
    renderLogin()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument()
  })

  it('shows error when only email is filled', async () => {
    renderLogin()
    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText('you@company.com'), 'test@test.com')
    await user.click(screen.getByRole('button', { name: /sign in/i }))
    expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument()
  })

  it('password input is type="password" by default', () => {
    renderLogin()
    expect(screen.getByPlaceholderText('Enter your password')).toHaveAttribute('type', 'password')
  })

  it('toggles password to visible when show button is clicked', async () => {
    renderLogin()
    const user = userEvent.setup()
    await user.click(screen.getByLabelText('Show password'))
    expect(screen.getByPlaceholderText('Enter your password')).toHaveAttribute('type', 'text')
  })

  it('toggles password back to hidden when hide button is clicked', async () => {
    renderLogin()
    const user = userEvent.setup()
    await user.click(screen.getByLabelText('Show password'))
    await user.click(screen.getByLabelText('Hide password'))
    expect(screen.getByPlaceholderText('Enter your password')).toHaveAttribute('type', 'password')
  })
})
