import { screen, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import { Footer } from './Footer'

describe('Footer component', () => {
  beforeEach(() => {
    render(<Footer />, { wrapper: BrowserRouter })
  })
  it('Should render Footer component correctly', async () => {
    const footer = await screen.findByRole('footer')
    expect(footer).toBeDefined()
  })
})