import React, { useState } from "react";
import TurfAdminLayout from "./TurfAdminLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { changeTurfAdminPassword } from "../../api/turfAdminApi";

export default function TurfAdminSettingsPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");
    try {
      await changeTurfAdminPassword(oldPassword, newPassword);
      setMessage("Password updated successfully.");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.detail || "Could not update password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TurfAdminLayout title="Settings">
      <Card className="max-w-md">
        <h3 className="font-display font-semibold text-qt-navy">Change password</h3>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <Input label="Old password" name="old_password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
          <Input label="New password" name="new_password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          {message && <p className="text-sm text-qt-green">{message}</p>}
          {error && <p className="text-sm text-qt-red">{error}</p>}
          <Button type="submit" variant="accent" fullWidth disabled={submitting}>
            {submitting ? "Updating..." : "Update password"}
          </Button>
        </form>
      </Card>
    </TurfAdminLayout>
  );
}
