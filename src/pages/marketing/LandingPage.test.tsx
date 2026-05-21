import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LandingPage from './LandingPage'

function renderLanding() {
  return render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  )
}

describe('LandingPage', () => {
  it('renders without crashing', () => {
    renderLanding()
  })

  it('renders the navbar', () => {
    renderLanding()
    // Navbar logo text appears once in the navbar
    expect(screen.getAllByText('NeuCRM').length).toBeGreaterThan(0)
  })

  it('renders the hero section headline', () => {
    renderLanding()
    expect(screen.getByRole('heading', { name: /Close More Deals/i })).toBeInTheDocument()
  })

  it('renders the features section', () => {
    renderLanding()
    expect(screen.getByText('Everything your team needs')).toBeInTheDocument()
  })

  it('renders the testimonials section', () => {
    renderLanding()
    expect(screen.getByText('Trusted by growing teams')).toBeInTheDocument()
  })

  it('renders the pricing section', () => {
    renderLanding()
    expect(screen.getByText('Simple, transparent pricing')).toBeInTheDocument()
  })

  it('renders the CTA section', () => {
    renderLanding()
    expect(screen.getByText('Ready to grow your business?')).toBeInTheDocument()
  })

  it('renders the footer copyright', () => {
    renderLanding()
    expect(screen.getByText(/© 2026 NeuCRM/)).toBeInTheDocument()
  })
})
