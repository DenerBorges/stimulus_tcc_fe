import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import CreateProject from "../pages/CreateProject";
import api from "../utils/api";

jest.mock("../utils/api");

const renderComponent = () => {
  render(
    <BrowserRouter>
      <CreateProject />
    </BrowserRouter>
  );
};

describe("CreateProject Page", () => {
  test("renders the CreateProject page and creates a project", async () => {
    (api.post as jest.Mock).mockResolvedValue({ data: {} });
    (api.get as jest.Mock).mockResolvedValue({
      data: { id: "test_user_id" },
    });
    localStorage.setItem("userToken", "test_token");
    (api.post as jest.Mock).mockResolvedValue({ data: {} });
    (api.get as jest.Mock).mockResolvedValue({
      data: { id: "test_user_id" },
    });

    renderComponent();

    const nameInput = screen.getByLabelText(/nome/i);
    const descriptionInput = screen.getByLabelText(/descrição/i);
    const goalInput = screen.getByLabelText(/meta/i);
    const deadlineInput = screen.getByLabelText(
      /data de expiração do projeto \(dias\)/i
    );
    const categorySelect = screen.getByLabelText(/categoria/i);
    const submitButton = screen.getByRole("button", { name: /enviar/i });

    fireEvent.change(nameInput, { target: { value: "Projeto Teste" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Descrição do projeto teste" },
    });
    fireEvent.change(goalInput, { target: { value: 150 } });
    fireEvent.change(deadlineInput, { target: { value: 120 } });
    fireEvent.change(categorySelect, { target: { value: "Tecnologia" } });

    fireEvent.click(submitButton);

    await waitFor(() => expect(api.post).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(api.post).toHaveBeenCalledWith("projects", {
        name: "Projeto Teste",
        description: "Descrição do projeto teste",
        category: "Tecnologia",
        total: 0,
        goal: 150,
        deadline: 120,
        userId: "test_user_id",
      })
    );
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("handles a large number of interactions quickly", async () => {
    (api.post as jest.Mock).mockResolvedValue({ data: {} });
    (api.get as jest.Mock).mockResolvedValue({
      data: { id: "test_user_id" },
    });

    renderComponent();

    const nameInput = screen.getByLabelText(/nome/i);
    const descriptionInput = screen.getByLabelText(/descrição/i);
    const goalInput = screen.getByLabelText(/meta/i);
    const deadlineInput = screen.getByLabelText(
      /data de expiração do projeto \(dias\)/i
    );
    const categorySelect = screen.getByLabelText(/categoria/i);
    const submitButton = screen.getByRole("button", { name: /enviar/i });

    const startTime = performance.now();

    for (let i = 0; i < 100; i++) {
      fireEvent.change(nameInput, { target: { value: `Projeto Teste ${i}` } });
      fireEvent.change(descriptionInput, {
        target: { value: `Descrição do projeto teste ${i}` },
      });
      fireEvent.change(goalInput, { target: { value: 150 + i } });
      fireEvent.change(deadlineInput, { target: { value: 120 + i } });
      fireEvent.change(categorySelect, { target: { value: "Tecnologia" } });
      fireEvent.click(submitButton);
    }

    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(5000);
  });

  test("redirects to login page if user is not logged in", async () => {
    renderComponent();

    const nameInput = screen.getByLabelText(/nome/i);
    const submitButton = screen.getByRole("button", { name: /enviar/i });

    fireEvent.change(nameInput, { target: { value: "Projeto Teste" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/signin");
    });
  });
});
