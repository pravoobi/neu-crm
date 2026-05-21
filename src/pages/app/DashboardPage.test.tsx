import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DashboardPage from './DashboardPage'

describe('DashboardPage', () => {
  it('renders the page heading', () => {
    render(<DashboardPage />)
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })

  it('renders all four KPI stat cards', () => {
    render(<DashboardPage />)
    expect(screen.getByText('Total Contacts')).toBeInTheDocument()
    expect(screen.getByText('Active Campaigns')).toBeInTheDocument()
    expect(screen.getByText('Revenue Tracked')).toBeInTheDocument()
    expect(screen.getByText('Conversion Rate')).toBeInTheDocument()
  })

  it('renders KPI values', () => {
    render(<DashboardPage />)
    expect(screen.getByText('2,847')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('$148,200')).toBeInTheDocument()
    expect(screen.getByText('3.6%')).toBeInTheDocument()
  })

  it('renders trend change labels', () => {
    render(<DashboardPage />)
    expect(screen.getByText(/\+12%/)).toBeInTheDocument()
    expect(screen.getByText(/\+8\.3%/)).toBeInTheDocument()
    expect(screen.getByText(/−0\.4%/)).toBeInTheDocument()
  })

  it('renders the Recent Activity section', () => {
    render(<DashboardPage />)
    expect(screen.getByText('Recent Activity')).toBeInTheDocument()
  })

  it('renders activity entries', () => {
    render(<DashboardPage />)
    expect(screen.getByText(/Sarah Chen/)).toBeInTheDocument()
    expect(screen.getByText(/Spring Promo/)).toBeInTheDocument()
    expect(screen.getByText(/CSV/i)).toBeInTheDocument()
  })

  it('renders activity badges', () => {
    render(<DashboardPage />)
    expect(screen.getByText('New')).toBeInTheDocument()
    expect(screen.getByText('Live')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })
})
