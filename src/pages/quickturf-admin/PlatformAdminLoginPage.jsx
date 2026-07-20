import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePlatformAdminAuth } from "../../context/PlatformAdminAuthContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

export default function PlatformAdminLoginPage() {
  const { login } = usePlatformAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(email, password);
      navigate("/admin/turfs");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-qt-mist px-6">
      <Card className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <span className="font-display text-xl font-bold text-qt-navy">QuickTurf</span>
          <p className="mt-1 text-sm text-qt-charcoal/60">Platform Admin Login</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-sm text-qt-red">{error}</p>}
          <Button type="submit" variant="primary" fullWidth disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <Link to="/" className="mt-4 block text-center text-xs text-qt-charcoal/50 hover:text-qt-navy">
          ← Back to QuickTurf
        </Link>
      </Card>
    </div>
  );
}
