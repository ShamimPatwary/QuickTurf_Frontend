import React, { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import EmptyState from "../common/EmptyState";

export default function SportTable({ sports, onCreate, onDelete, creating }) {
  const [name, setName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name.trim());
    setName("");
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleAdd} className="flex gap-3">
        <div className="flex-1">
          <Input
            name="sport_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. football, cricket"
          />
        </div>
        <Button type="submit" variant="accent" disabled={creating}>
          Add sport
        </Button>
      </form>
