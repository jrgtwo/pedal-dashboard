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


