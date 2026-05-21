import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FeaturesSection from './FeaturesSection'

describe('FeaturesSection', () => {
  it('renders the section heading', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('Everything your team needs')).toBeInTheDocument()
  })

  it('renders all six feature card titles', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('Contact Management')).toBeInTheDocument()
    expect(screen.getByText('Pipeline Tracking')).toBeInTheDocument()
    expect(screen.getByText('Email Campaigns')).toBeInTheDocument()
    expect(screen.getByText('Analytics & Reports')).toBeInTheDocument()
    expect(screen.getByText('Automation')).toBeInTheDocument()
    expect(screen.getByText('Team Permissions')).toBeInTheDocument()
  })

  it('renders two Core-tagged features', () => {
    render(<FeaturesSection />)
    expect(screen.getAllByText('Core')).toHaveLength(2)
  })

  it('renders Pro and Enterprise tier tags', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('Pro')).toBeInTheDocument()
    expect(screen.getByText('Enterprise')).toBeInTheDocument()
  })

  it('renders the Features section badge', () => {
    render(<FeaturesSection />)
    expect(screen.getByText('Features')).toBeInTheDocument()
  })
})
