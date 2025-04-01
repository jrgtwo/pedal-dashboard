import { screen, render } from '@testing-library/react'
import { BrowserRouter } from 'react-router'

import { PedalBoardSandBox } from './PedalBoardSandBox'

describe('PedalBoardSandBox Component', () => {
  beforeEach(() => {
    render(<PedalBoardSandBox />, { wrapper: BrowserRouter })
  })
  it('Should Render PedalBoardSandBox component correctly', async () => {
    const sections = await screen.findAllByRole('section')
    expect(sections.length).toBeGreaterThan(0)
  })
});
