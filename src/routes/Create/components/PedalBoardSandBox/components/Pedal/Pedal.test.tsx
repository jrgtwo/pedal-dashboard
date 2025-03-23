import { screen, render } from '@testing-library/react'

import { Pedal } from './Pedal'

describe('Pedal Component', () => {
  it('Should render Pedal component correctly', async () => {
    render(<Pedal x={0} y={0} />)
    const pedal = await screen.findByRole('pedal')
    expect(pedal).toBeDefined()
  })
})