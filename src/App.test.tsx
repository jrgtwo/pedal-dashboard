import { screen, render } from "@testing-library/react"
import '@testing-library/jest-dom'
import App from './App'

describe('App Tests', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('Should Render the header correctly', async () => {
    const heading = await screen.findByRole('heading')
    expect(heading).toHaveTextContent('Home')
  })

  it('Should render a link to About page', async () => {
    const link = await screen.findByText(/about/i)
    expect(link).toBeDefined()
  })
})

describe('App Tests', () => {
  it.todo('Should render App component correctly')
  it.todo('Should render a navigation menu')
  it.todo('Should render the home page initially')
  it.todo('Should contain a footer component')
})
