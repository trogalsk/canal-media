import { render, screen } from '@testing-library/react'
import { AppLogo } from "../../components/AppLogo/index";

describe('App Logo', () => {
  it('renders a link', () => {
    render(<AppLogo />)

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', '/home')
  })
})
