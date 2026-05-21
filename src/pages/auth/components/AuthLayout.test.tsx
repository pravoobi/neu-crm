import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AuthLayout from './AuthLayout'

function renderAuthLayout(children = <div>Form content</div>) {
  return render(
    <MemoryRouter>
      <AuthLayout>{children}</AuthLayout>
    </MemoryRouter>
  )
}

describe('AuthLayout', () => {
  it('renders children in the form panel', () => {
    renderAuthLayout(<div>Test form</div>)
    expect(screen.getByText('Test form')).toBeInTheDocument()
  })

  it('renders the marketing tagline on the left panel', () => {
    renderAuthLayout()
    expect(screen.getByText('Grow your business with smarter CRM')).toBeInTheDocument()
  })

  it('renders all four feature bullet points', () => {
    renderAuthLayout()
    expect(screen.getByText('Track every lead from first touch to closed deal')).toBeInTheDocument()
    expect(screen.getByText('Run email campaigns to thousands of contacts')).toBeInTheDocument()
    expect(screen.getByText('Real-time analytics and revenue reporting')).toBeInTheDocument()
    expect(screen.getByText('Automate follow-ups and nurture sequences')).toBeInTheDocument()
  })

  it('renders the NeuCRM logo', () => {
    renderAuthLayout()
    expect(screen.getAllByText('NeuCRM').length).toBeGreaterThan(0)
  })

  it('renders the copyright notice', () => {
    renderAuthLayout()
    expect(screen.getByText(/© 2026 NeuCRM/)).toBeInTheDocument()
  })
})
