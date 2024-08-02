import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../pages/SignUp";
import api from "../utils/api";

jest.mock("../utils/api");

const renderComponent = () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );
};

describe("SignUp Page", () => {
  test("renders the SignUp page and performs registration", async () => {
    (api.post as jest.Mock).mockResolvedValue({});

    renderComponent();

    const userInput = screen.getByLabelText(/nome de usuário/i);
    const dateInput = screen.getByLabelText(/data de nascimento/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText("Senha", { selector: "input" });
    const confirmPasswordInput = screen.getByLabelText("Confirmar senha", {
      selector: "input",
    });
    const submitButton = screen.getByRole("button", { name: /registre-se/i });

    expect(userInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(userInput, { target: { value: "testuser" } });
    fireEvent.change(dateInput, { target: { value: "2000-01-01" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    fireEvent.click(submitButton);
  });

  test("displays an error message when fields are empty", async () => {
    renderComponent();

    const submitButton = screen.getByRole("button", { name: /registre-se/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/preencha o campo de usuário/i)
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(/você precisa ter 18 anos ou mais/i)
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(/a senha deve contar no mínimo 8 caracteres/i)
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/senhas não correspondem/i)).toBeInTheDocument();
    });
  });

  test("displays an error message for incorrect email", async () => {
    (api.post as jest.Mock).mockRejectedValue(new Error("Invalid data"));

    renderComponent();

    const userInput = screen.getByLabelText(/nome de usuário/i);
    const dateInput = screen.getByLabelText(/data de nascimento/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText("Senha", { selector: "input" });
    const confirmPasswordInput = screen.getByLabelText("Confirmar senha", {
      selector: "input",
    });
    const submitButton = screen.getByRole("button", { name: /registre-se/i });

    fireEvent.change(userInput, { target: { value: "testuser" } });
    fireEvent.change(dateInput, { target: { value: "2000-01-01" } });
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    });
  });
});
