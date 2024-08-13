import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SignIn from "../pages/SignIn";
import api from "../utils/api";

jest.mock("../utils/api");

const renderComponent = () => {
  render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <GoogleOAuthProvider clientId="705568925674-u6ubt532k7q69pb7d6kdkgvld8vvk8u2.apps.googleusercontent.com">
        <SignIn />
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

describe("SignIn Page", () => {
  test("renders the SignIn page and performs login", async () => {
    (api.post as jest.Mock).mockResolvedValue({
      data: {
        access_token: "test_token",
        user_name: "test_user",
      },
    });

    renderComponent();

    // Check if the email and password fields are rendered
    const userInput = screen.getByLabelText(/nome de usuário/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole("button", { name: /logar-se/i });

    expect(userInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(userInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Simulate form submission
    fireEvent.click(submitButton);

    // Wait for the API call to complete and verify the localStorage and navigation
    await waitFor(() => {
      expect(localStorage.getItem("userToken")).toBe("test_token");
    });

    await waitFor(() => {
      expect(localStorage.getItem("userName")).toBe("test_user");
    });
  });

  test("displays an error message when fields are empty", async () => {
    renderComponent();

    const submitButton = screen.getByRole("button", { name: /logar-se/i });

    // Simulate form submission without filling in the fields
    fireEvent.click(submitButton);

    // Check for the error message
    await waitFor(() => {
      const errorMessage = screen.getByText(/preencha todos os campos/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("displays an error message for incorrect credentials", async () => {
    (api.post as jest.Mock).mockRejectedValue(new Error("Invalid credentials"));

    renderComponent();

    const userInput = screen.getByLabelText(/nome de usuário/i);
    const passwordInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole("button", { name: /logar-se/i });

    fireEvent.change(userInput, { target: { value: "wronguser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        /seu usuário ou senha estão incorretos!/i
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
