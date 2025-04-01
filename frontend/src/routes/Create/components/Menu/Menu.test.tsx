import { screen, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router'

import { Menu } from './Menu'

describe('Menu Component', () => {
  beforeEach(() => {
    render(<Menu />, { wrapper: BrowserRouter })
  })

  it('Should render Menu component correctly', async () => {
    const menu = await screen.findByRole('menu')
    expect(menu).toBeDefined()
  });
})
