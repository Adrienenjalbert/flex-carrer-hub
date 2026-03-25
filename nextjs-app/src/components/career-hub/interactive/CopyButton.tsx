"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  text: string;
  label?: string;
  variant?: "inline" | "block";
  className?: string;
}

export default function CopyButton({
  text,
  label = "Copy",
  variant = "inline",
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  if (variant === "block") {
    return (
      <Button
        onClick={handleCopy}
        variant="outline"
        className={`w-full gap-2 ${className}`}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-green-500" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            {label}
          </>
        )}
      </Button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded-md transition-all hover:bg-gray-100 ${
        copied ? "text-green-500" : "text-gray-400 hover:text-gray-600"
      } ${className}`}
      title={copied ? "Copied!" : label}
      aria-label={label}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}
