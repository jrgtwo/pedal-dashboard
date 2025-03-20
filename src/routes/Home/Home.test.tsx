import { screen, render } from "@testing-library/react";
import { Home } from "./Home";

describe('Home Tests', () => {
  beforeEach(() => {
    render(<Home />)
  })

  it('Should contain a heading', async () => {
    const heading = await screen.findByRole('heading')
    expect(heading).toBeDefined()
  });
})