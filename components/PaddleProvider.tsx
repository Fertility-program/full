"use client";

import { useEffect } from "react";
import { PADDLE_CONFIG } from "@/lib/paddle";

/**
 * Loads Paddle.js and initializes it with client token.
 * Add this component to your root layout.
 */
export default function PaddleProvider() {
  useEffect(() => {
    // Don't load if no client token configured
    if (!PADDLE_CONFIG.clientToken) return;

    // Don't load twice
    if (document.querySelector('script[src*="paddle.js"]')) return;

    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => {
      if (typeof window !== "undefined" && (window as any).Paddle) {
        (window as any).Paddle.Initialize({
          token: PADDLE_CONFIG.clientToken,
          environment: PADDLE_CONFIG.environment,
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  return null;
}
