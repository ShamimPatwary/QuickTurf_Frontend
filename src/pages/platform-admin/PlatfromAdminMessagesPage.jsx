import React, { useEffect, useState } from "react";
import PlatformAdminLayout from "./PlatformAdminLayout";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import { listContactMessages, deleteContactMessage } from "../../api/platformAdminApi";

export default function PlatformAdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listContactMessages()
      .then((res) => setMessages(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteContactMessage(messageId);
      setMessages((prev) => prev.filter((m) => m.id !== messageId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete the message. Please try again.");
    }
  };

  return (
    <PlatformAdminLayout title="Contact Messages">
      {loading && <Loader label="Loading messages..." />}
      {!loading && messages.length === 0 && (
        <EmptyState title="No messages yet" description="Messages sent from the Contact page will appear here." />
      )}
      {!loading && messages.length > 0 && (
        <div className="grid gap-4">
          {messages.map((m) => (
            <div key={m.id} className="rounded-xl border border-qt-line bg-white p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-qt-navy">{m.name}</p>
                  <p className="text-sm text-qt-charcoal/60">{m.email}</p>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                  <span className="text-xs text-qt-charcoal/50">
                    {new Date(m.created_at).toLocaleString()}
                  </span>
                  <Button variant="ghost" onClick={() => handleDelete(m.id)}>
                    Delete
                  </Button>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-qt-charcoal">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </PlatformAdminLayout>
  );
}
