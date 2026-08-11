import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Modal from "../../../components/common/Modal";
import Badge from "../../../components/common/Badge";
import EmptyState from "../../../components/common/EmptyState";
import Loader from "../../../components/common/Loader";

describe("Button", () => {
  it("TC01 - renders children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
  it("TC02 - calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Go</Button>);
    fireEvent.click(screen.getByText("Go"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it("TC03 - is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText("Disabled")).toBeDisabled();
  });
  it("TC04 - does not fire onClick when disabled", () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Blocked</Button>);
    fireEvent.click(screen.getByText("Blocked"));
    expect(handleClick).not.toHaveBeenCalled();
  });
  it("TC05 - applies danger variant class", () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByText("Delete").className).toMatch(/qt-red/);
  });
});

describe("Input", () => {
  it("TC06 - renders label text", () => {
    render(<Input label="Email" name="email" value="" onChange={() => {}} />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });
  it("TC07 - calls onChange when typed into", () => {
    const handleChange = vi.fn();
    render(<Input label="Name" name="name" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Karim" } });
    expect(handleChange).toHaveBeenCalled();
  });
  it("TC08 - shows error message when error prop is set", () => {
    render(<Input label="Phone" name="phone" value="" onChange={() => {}} error="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });
  it("TC09 - renders as required when required prop is true", () => {
    render(<Input label="Name" name="name" value="" onChange={() => {}} required />);
    expect(screen.getByLabelText("Name")).toBeRequired();
  });
});

describe("Modal", () => {
  it("TC10 - renders nothing when open is false", () => {
    const { container } = render(<Modal open={false} onClose={() => {}} title="Hidden">content</Modal>);
    expect(container.firstChild).toBeNull();
  });
  it("TC11 - renders title and children when open", () => {
    render(<Modal open={true} onClose={() => {}} title="My Modal">Body text</Modal>);
    expect(screen.getByText("My Modal")).toBeInTheDocument();
    expect(screen.getByText("Body text")).toBeInTheDocument();
  });
  it("TC12 - calls onClose when close button clicked", () => {
    const handleClose = vi.fn();
    render(<Modal open={true} onClose={handleClose} title="Closable">x</Modal>);
    fireEvent.click(screen.getByLabelText("Close"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});

describe("Badge", () => {
  it("TC13 - renders badge text with correct color class", () => {
    render(<Badge color="green">Active</Badge>);
    expect(screen.getByText("Active").className).toMatch(/qt-green/);
  });
});

describe("EmptyState and Loader", () => {
  it("TC14 - EmptyState renders title and description", () => {
    render(<EmptyState title="Nothing here" description="Try adding something" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });
  it("TC15 - Loader renders default label text", () => {
    render(<Loader />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
