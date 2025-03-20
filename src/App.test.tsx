import { screen, render } from "@testing-library/react"
import '@testing-library/jest-dom'
import App from './App'

describe('App Tests', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('Should render Header component correctly', async () => {
    const header = await screen.findByRole('header')
    expect(header).toBeDefined()
  })

  it('Should render a navigation menu', async () => {
    const navigation = await screen.findByRole('navigation')
    expect(navigation).toBeDefined()
  })

  it('Should render the home page initially', async () => {
    const headings = await screen.findAllByRole('heading')
    expect(headings[1]).toHaveTextContent(/welcome/i)
  })

  it('Should contain a footer component', async () => {
    const footer = await screen.findByRole('footer')
    expect(footer).toBeDefined()
  })
})
