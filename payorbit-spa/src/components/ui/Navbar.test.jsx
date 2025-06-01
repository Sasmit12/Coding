import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";

// Mock AuthContext to simulate a logged-out state
jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    currentUser: null,
    logout: jest.fn(),
  }),
}));

test("renders all main navbar links", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  expect(screen.getByText(/Features/i)).toBeInTheDocument();
  expect(screen.getByText(/About/i)).toBeInTheDocument();
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
});