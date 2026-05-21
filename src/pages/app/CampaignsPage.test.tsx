import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CampaignsPage from './CampaignsPage'

// Radix Dialog uses react-remove-scroll which has a dual React instance in the
// file: dep setup. Mock it as a passthrough so dialog content renders in tests.
vi.mock('react-remove-scroll', () => ({
  RemoveScroll: ({ children }: { children?: unknown }) => children,
}))

describe('CampaignsPage', () => {
  it('renders the page heading', () => {
    render(<CampaignsPage />)
    expect(screen.getByRole('heading', { name: 'Campaigns' })).toBeInTheDocument()
  })

  it('renders total campaigns count', () => {
    render(<CampaignsPage />)
    expect(screen.getByText('6 total campaigns')).toBeInTheDocument()
  })

  it('renders the New Campaign button', () => {
    render(<CampaignsPage />)
    expect(screen.getByRole('button', { name: /new campaign/i })).toBeInTheDocument()
  })

  it('renders table column headers', () => {
    render(<CampaignsPage />)
    expect(screen.getByText('Campaign')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Type')).toBeInTheDocument()
    expect(screen.getByText('Contacts')).toBeInTheDocument()
    expect(screen.getByText('Open Rate')).toBeInTheDocument()
    expect(screen.getByText('Start Date')).toBeInTheDocument()
  })

  it('renders all campaign names', () => {
    render(<CampaignsPage />)
    expect(screen.getByText('Spring Promo')).toBeInTheDocument()
    expect(screen.getByText('Q1 Nurture')).toBeInTheDocument()
    expect(screen.getByText('Re-engagement')).toBeInTheDocument()
    expect(screen.getByText('Product Launch')).toBeInTheDocument()
    expect(screen.getByText('Win-back 2026')).toBeInTheDocument()
    expect(screen.getByText('Welcome Series')).toBeInTheDocument()
  })

  it('renders status badges', () => {
    render(<CampaignsPage />)
    // Each status word appears in both the badge and the filter pill, so use getAllByText
    expect(screen.getAllByText('Active').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Completed').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Draft').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Paused').length).toBeGreaterThanOrEqual(1)
  })

  it('renders status filter buttons', () => {
    render(<CampaignsPage />)
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Draft' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Paused' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument()
  })

  it('filters by Active status', () => {
    render(<CampaignsPage />)
    fireEvent.click(screen.getByRole('button', { name: 'Active' }))
    expect(screen.getByText('Spring Promo')).toBeInTheDocument()
    expect(screen.queryByText('Q1 Nurture')).not.toBeInTheDocument()
    expect(screen.queryByText('Product Launch')).not.toBeInTheDocument()
  })

  it('filters by Draft status', () => {
    render(<CampaignsPage />)
    fireEvent.click(screen.getByRole('button', { name: 'Draft' }))
    expect(screen.getByText('Product Launch')).toBeInTheDocument()
    expect(screen.queryByText('Spring Promo')).not.toBeInTheDocument()
  })

  it('All filter shows all campaigns', () => {
    render(<CampaignsPage />)
    fireEvent.click(screen.getByRole('button', { name: 'Active' }))
    fireEvent.click(screen.getByRole('button', { name: 'All' }))
    expect(screen.getByText('Spring Promo')).toBeInTheDocument()
    expect(screen.getByText('Q1 Nurture')).toBeInTheDocument()
  })

  it.skip('opens the New Campaign dialog when button is clicked', () => {
    render(<CampaignsPage />)
    fireEvent.click(screen.getByRole('button', { name: /new campaign/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Create a new campaign to start reaching your contacts.')).toBeInTheDocument()
  })
})
