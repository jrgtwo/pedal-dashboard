import { screen, render } from '@testing-library/react'
import { Header } from './Header'

describe('Header Component', () => {
  beforeEach(() => {
    render(<Header />);
  })

  it('Should render Header Component correctly', async () => {
    const menu = await screen.findByRole('menu')
    expect(menu).toBeDefined()
  })
})
