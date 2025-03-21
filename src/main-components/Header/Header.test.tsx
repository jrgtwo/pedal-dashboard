import { screen, render } from "@testing-library/react";
import { Header } from "./Header";

describe('Header Component', () => {
  it('Should render component correctly', async () => {
    render(<Header />)
    const header = await screen.findByRole('header')
    expect(header).toBeDefined()
  });
})