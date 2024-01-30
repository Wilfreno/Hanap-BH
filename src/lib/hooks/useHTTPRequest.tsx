"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useHTTPRequest() {
  const [error, setError] = useState({
    status: "",
    message: "",
  });
  useEffect(() => {
    if (error.status && error.message) {
      toast(error.status, {
        description: error.message,
        action: {
          label: "close",
          onClick: () => console.log(error.status),
        },
      });
    }
  }, [error]);
  return {
    post: async (route: string, body: Record<string, unknown>) => {
      const api_response = await fetch(route, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const r = await api_response.json();
      if (r.status !== "OK") {
        setError({
          status: r.status,
          message: r.message,
        });
        return;
      }
      return r;
    },
    delete: async (route: string, body: Record<string, unknown>) => {
      const api_response = await fetch(route, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const r = await api_response.json();
      if (r.status !== "OK") {
        setError({
          status: r.status,
          message: r.message,
        });
        return;
      }
      return r;
    },
  };
}
