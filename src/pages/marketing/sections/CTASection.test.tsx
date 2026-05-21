import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CTASection from './CTASection'

function renderCTA() {
  return render(
    <MemoryRouter>
      <CTASection />
    </MemoryRouter>
  )
}

describe('CTASection', () => {
  it('renders the heading', () => {
    renderCTA()
    expect(screen.getByText('Ready to grow your business?')).toBeInTheDocument()
  })

  it('renders the supporting copy', () => {
    renderCTA()
    expect(screen.getByText(/no card required/i)).toBeInTheDocument()
  })

  it('renders the Start Free Trial button', () => {
    renderCTA()
    expect(screen.getByText('Start Free Trial')).toBeInTheDocument()
  })

  it('renders the Sign In button', () => {
    renderCTA()
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })
})
