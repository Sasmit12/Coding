import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

// Add this line if you're using Jest as your test environment.
// If you're using Vitest, "test" and "expect" are also globally available.
// If you are getting "no-undef", add the following comment at the top:

/* global test, expect */

test("renders footer text", () => {
  render(<Footer />);
  expect(screen.getByText(/payorbit/i)).toBeInTheDocument();
});