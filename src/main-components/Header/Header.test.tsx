import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { Header } from "./Header";

describe('Header Component', () => {
  beforeEach(() => {
    render(<Header />, { wrapper: BrowserRouter })
  })
  it('Should render component correctly', async () => {
    const header = await screen.findByRole('header')
    expect(header).toBeDefined()
  });
})
