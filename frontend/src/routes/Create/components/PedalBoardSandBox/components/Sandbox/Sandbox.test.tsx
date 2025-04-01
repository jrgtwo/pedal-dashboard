import { screen, render } from '@testing-library/react'

import { Sandbox } from './Sandbox'

describe('Sandbox Component', () => {
  beforeEach(() => {
    render(<Sandbox />)
  })

  it('Should render Sandbox component correctly', async () => {
    const sandbox = await screen.findByRole('sandbox')
    expect(sandbox).toBeDefined()
  })
});
