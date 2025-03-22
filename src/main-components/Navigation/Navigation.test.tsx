import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { Navigation } from "./Navigation";

describe('Navigation Component', () => {
  beforeEach(() => {
    render(<Navigation />, { wrapper: BrowserRouter })
  })
  it('Should render Navigation component correctly', async () => {
    const navigation = await screen.findByRole('navigation')
    expect(navigation).toBeDefined()
  })
  it('Should contain at least 1 link', async () => {
    const links = await screen.findAllByRole('link')
    expect(links.length).toBeGreaterThanOrEqual(1)
  })
})