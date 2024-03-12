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
    post: async (url: string, body: Record<string, unknown>) => {
      const api_response = await fetch(url, {
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
    get: async <T,>(url: string, search_params?: T) => {
      let request = url;
      if (search_params)
        request += "?" + new URLSearchParams(search_params).toString();

      const api_response = await fetch(request);
      const r = await api_response.json();
      if (r.status !== "OK") {
        setError({
          status: r.status,
          message: r.message,
        });
        return r;
      }
      return r;
    },
    delete: async (url: string, body: Record<string, unknown>) => {
      const api_response = await fetch(url, {
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
