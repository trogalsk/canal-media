import { render, screen } from '@testing-library/react'
import Intro from "../../pages/index";

describe('Intro', () => {
  it('renders a heading', () => {
    render(<Intro />)

    const heading = screen.getByRole('heading', {
      name: "Unlimited movies, TV shows, and more."
    })

    expect(heading).toBeInTheDocument()
  })

  it('renders a get started button', () => {
    render(<Intro />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Get started')
  })

  it('renders intro unchanged', () => {
    const { container } = render(<Intro />)
    expect(container).toMatchSnapshot()
  })
})
