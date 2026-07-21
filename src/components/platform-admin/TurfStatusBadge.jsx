import React from "react";
import Badge from "../common/Badge";

export default function TurfStatusBadge({ status }) {
  if (status === "active") return <Badge color="green">Active</Badge>;
  return <Badge color="red">Suspended</Badge>;
}
