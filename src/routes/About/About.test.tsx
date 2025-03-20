import { screen, render } from "@testing-library/react";
import { About } from "./About";

describe('Home Tests', () => {
  beforeEach(() => {
    render(<About />)
  })

  it('Should contain a heading', async () => {
    const heading = await screen.findByRole('heading')
    expect(heading).toBeDefined()
  });
});
