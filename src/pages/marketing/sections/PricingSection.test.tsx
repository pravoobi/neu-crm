import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PricingSection from './PricingSection'

function renderPricing() {
  return render(
    <MemoryRouter>
      <PricingSection />
    </MemoryRouter>
  )
}

describe('PricingSection', () => {
  it('renders the section heading', () => {
    renderPricing()
    expect(screen.getByText('Simple, transparent pricing')).toBeInTheDocument()
  })

  it('renders all three plan names', () => {
    renderPricing()
    expect(screen.getByText('Starter')).toBeInTheDocument()
    expect(screen.getByText('Pro')).toBeInTheDocument()
    expect(screen.getByText('Enterprise')).toBeInTheDocument()
  })

  it('renders the "Most Popular" badge on the Pro plan', () => {
    renderPricing()
    expect(screen.getByText('Most Popular')).toBeInTheDocument()
  })

  it('renders all three plan prices', () => {
    renderPricing()
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('$49')).toBeInTheDocument()
    expect(screen.getByText('Custom')).toBeInTheDocument()
  })

  it('renders a CTA button for each plan', () => {
    renderPricing()
    expect(screen.getByText('Get Started Free')).toBeInTheDocument()
    expect(screen.getByText('Start Free Trial')).toBeInTheDocument()
    expect(screen.getByText('Talk to Sales')).toBeInTheDocument()
  })
})
