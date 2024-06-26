"use client";
import { APIResponseType } from "@/lib/types/api-request-response";
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
    post: async <T,>(url: string, body: T): Promise<APIResponseType> => {
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
      }

      return r;
    },
    get: async <T,>(
      url: string,
      search_params?: T
    ): Promise<APIResponseType> => {
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
      }
      return r;
    },
    delete: async (
      url: string,
      body: Record<string, unknown>
    ): Promise<APIResponseType> => {
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
        return r;
      }
      return r;
    },
  };
}
