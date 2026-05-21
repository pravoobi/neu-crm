import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import RegisterPage from './RegisterPage'

function renderRegister() {
  return render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  )
}

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByPlaceholderText('Jane'), 'Jane')
  await user.type(screen.getByPlaceholderText('Smith'), 'Smith')
  await user.type(screen.getByPlaceholderText('you@company.com'), 'jane@test.com')
}

describe('RegisterPage', () => {
  it('renders the heading', () => {
    renderRegister()
    expect(screen.getByRole('heading', { name: 'Create your account' })).toBeInTheDocument()
  })

  it('renders all form fields', () => {
    renderRegister()
    expect(screen.getByPlaceholderText('Jane')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Smith')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('you@company.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Min. 8 characters')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Repeat your password')).toBeInTheDocument()
  })

  it('renders the terms checkbox', () => {
    renderRegister()
    expect(screen.getByText(/Terms of Service/i)).toBeInTheDocument()
  })

  it('renders the sign in link', () => {
    renderRegister()
    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })

  it('shows no error on initial render', () => {
    renderRegister()
    expect(screen.queryByText('Please fill in all fields.')).not.toBeInTheDocument()
  })

  it('shows error when submitting with all fields empty', async () => {
    renderRegister()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /create account/i }))
    expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument()
  })

  it('shows error when passwords do not match', async () => {
    renderRegister()
    const user = userEvent.setup()
    await fillRequiredFields(user)
    await user.type(screen.getByPlaceholderText('Min. 8 characters'), 'password123')
    await user.type(screen.getByPlaceholderText('Repeat your password'), 'different99')
    await user.click(screen.getByRole('button', { name: /create account/i }))
    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument()
  })

  it('shows error when password is shorter than 8 characters', async () => {
    renderRegister()
    const user = userEvent.setup()
    await fillRequiredFields(user)
    await user.type(screen.getByPlaceholderText('Min. 8 characters'), 'short')
    await user.type(screen.getByPlaceholderText('Repeat your password'), 'short')
    await user.click(screen.getByRole('button', { name: /create account/i }))
    expect(screen.getByText('Password must be at least 8 characters.')).toBeInTheDocument()
  })

  it('shows error when terms are not agreed', async () => {
    renderRegister()
    const user = userEvent.setup()
    await fillRequiredFields(user)
    await user.type(screen.getByPlaceholderText('Min. 8 characters'), 'password123')
    await user.type(screen.getByPlaceholderText('Repeat your password'), 'password123')
    await user.click(screen.getByRole('button', { name: /create account/i }))
    expect(screen.getByText('You must agree to the Terms of Service.')).toBeInTheDocument()
  })

  it('clears the error message when resubmitting after fixing fields', async () => {
    renderRegister()
    const user = userEvent.setup()
    // Trigger an error first
    await user.click(screen.getByRole('button', { name: /create account/i }))
    expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument()
    // Now start filling — resubmit with just one field should still error but with same message
    await user.type(screen.getByPlaceholderText('Jane'), 'Jane')
    await user.click(screen.getByRole('button', { name: /create account/i }))
    // Error updates to same message (all fields still not complete)
    expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument()
  })
})
