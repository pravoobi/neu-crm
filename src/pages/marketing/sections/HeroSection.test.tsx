import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HeroSection from './HeroSection'

function renderHero() {
  return render(
    <MemoryRouter>
      <HeroSection />
    </MemoryRouter>
  )
}

describe('HeroSection', () => {
  it('renders the main headline', () => {
    renderHero()
    expect(screen.getByText(/Close More Deals/i)).toBeInTheDocument()
  })

  it('renders the sub-headline', () => {
    renderHero()
    expect(screen.getByText(/Grow Faster/i)).toBeInTheDocument()
  })

  it('renders the Start Free Trial CTA', () => {
    renderHero()
    expect(screen.getByText('Start Free Trial')).toBeInTheDocument()
  })

  it('renders the Watch Demo button', () => {
    renderHero()
    expect(screen.getByText('Watch Demo')).toBeInTheDocument()
  })

  it('renders all four social proof stats', () => {
    renderHero()
    expect(screen.getByText('10,000+')).toBeInTheDocument()
    expect(screen.getByText('99.9%')).toBeInTheDocument()
    expect(screen.getByText('$2B+')).toBeInTheDocument()
    expect(screen.getByText('4.9 / 5')).toBeInTheDocument()
  })

  it('renders the stat labels', () => {
    renderHero()
    expect(screen.getByText('Companies')).toBeInTheDocument()
    expect(screen.getByText('Uptime')).toBeInTheDocument()
    expect(screen.getByText('Customer Rating')).toBeInTheDocument()
  })
})
