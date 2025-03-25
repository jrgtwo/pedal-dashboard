import { screen, render } from '@testing-library/react'

import { Pedal } from './Pedal'

describe('Pedal Component', () => {
  it('Should render Pedal component correctly', async () => {
    render(<Pedal x={0} y={0} w={0} h={0} pedalId="1" />)
    const pedal = await screen.findByRole('pedal')
    expect(pedal).toBeDefined()
  })
})