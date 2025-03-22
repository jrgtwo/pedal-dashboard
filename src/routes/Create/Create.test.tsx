import { screen, render } from "@testing-library/react"
import { Create } from './Create'

describe('Create Tests', () => {
  beforeEach(() => {
    render(<Create />)
  })

  it('Should render Create component correctly', async () => {
    const heading = await screen.findByRole('heading')
    expect(heading).toBeDefined()
  })
})