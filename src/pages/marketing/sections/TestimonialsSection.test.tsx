import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TestimonialsSection from './TestimonialsSection'

describe('TestimonialsSection', () => {
  it('renders the section heading', () => {
    render(<TestimonialsSection />)
    expect(screen.getByText('Trusted by growing teams')).toBeInTheDocument()
  })

  it('renders all three testimonial author names', () => {
    render(<TestimonialsSection />)
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument()
    expect(screen.getByText('Marcus Williams')).toBeInTheDocument()
    expect(screen.getByText('Priya Patel')).toBeInTheDocument()
  })

  it('renders testimonial roles and companies', () => {
    render(<TestimonialsSection />)
    expect(screen.getByText(/VP of Marketing/)).toBeInTheDocument()
    expect(screen.getByText(/Head of Sales/)).toBeInTheDocument()
    expect(screen.getByText(/Founder & CEO/)).toBeInTheDocument()
  })

  it('renders all three testimonial quotes', () => {
    render(<TestimonialsSection />)
    expect(screen.getByText(/lead response time in half/i)).toBeInTheDocument()
    expect(screen.getByText(/close rate climbed 23%/i)).toBeInTheDocument()
    expect(screen.getByText(/four CRMs before NeuCRM/i)).toBeInTheDocument()
  })
})
