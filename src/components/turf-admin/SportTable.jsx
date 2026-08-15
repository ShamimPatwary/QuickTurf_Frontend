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

      {sports.length === 0 ? (
        <EmptyState title="No sports yet" description="Add a sport to start configuring time slots and pricing." />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-qt-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-qt-mist text-xs uppercase tracking-wide text-qt-charcoal/60">
              <tr>
                <th className="px-4 py-3">Sport</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-qt-line">
              {sports.map((sport) => (
                <tr key={sport.id} className="hover:bg-qt-mist/50">
                  <td className="px-4 py-3 capitalize font-medium text-qt-navy">{sport.name}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" onClick={() => onDelete(sport.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

