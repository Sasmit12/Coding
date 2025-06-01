import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("renders footer text", () => {
  render(<Footer />);
  expect(screen.getByText(/payorbit/i)).toBeInTheDocument();
});