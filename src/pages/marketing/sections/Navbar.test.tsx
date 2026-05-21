import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  )
}

describe('Navbar', () => {
  it('renders the NeuCRM logo', () => {
    renderNavbar()
    expect(screen.getByText('NeuCRM')).toBeInTheDocument()
  })

  it('renders the desktop navigation links', () => {
    renderNavbar()
    expect(screen.getAllByText('Features').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Pricing').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Testimonials').length).toBeGreaterThan(0)
  })

  it('renders Sign In and Get Started CTAs', () => {
    renderNavbar()
    expect(screen.getAllByText('Sign In').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Get Started').length).toBeGreaterThan(0)
  })

  it('mobile menu is closed by default', () => {
    renderNavbar()
    // When closed the mobile menu div is not in the DOM — only desktop links render
    expect(screen.getAllByText('Features')).toHaveLength(1)
  })

  it('opens the mobile menu when the toggle button is clicked', async () => {
    renderNavbar()
    const user = userEvent.setup()
    await user.click(screen.getByLabelText('Toggle menu'))
    // Desktop + mobile panel both have the links
    expect(screen.getAllByText('Features')).toHaveLength(2)
  })

  it('closes the mobile menu when a link inside it is clicked', async () => {
    renderNavbar()
    const user = userEvent.setup()
    await user.click(screen.getByLabelText('Toggle menu'))
    const mobileFeatureLink = screen.getAllByText('Features')[1]
    await user.click(mobileFeatureLink)
    expect(screen.getAllByText('Features')).toHaveLength(1)
  })
})
