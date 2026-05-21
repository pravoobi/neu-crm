import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the NeuCRM brand name', () => {
    render(<Footer />)
    expect(screen.getByText('NeuCRM')).toBeInTheDocument()
  })

  it('renders all three link category headings', () => {
    render(<Footer />)
    expect(screen.getByText('Product')).toBeInTheDocument()
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Support')).toBeInTheDocument()
  })

  it('renders links within each category', () => {
    render(<Footer />)
    expect(screen.getByText('Changelog')).toBeInTheDocument()
    expect(screen.getByText('Careers')).toBeInTheDocument()
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  it('renders the copyright notice', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2026 NeuCRM/)).toBeInTheDocument()
  })

  it('renders the built-with attribution', () => {
    render(<Footer />)
    expect(screen.getByText(/React 19/i)).toBeInTheDocument()
  })
})
