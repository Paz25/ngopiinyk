"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
  labelLink?: { text: string; href: string };
}

export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete,
  labelLink,
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label row */}
      <div
        className={labelLink ? "flex justify-between items-center" : undefined}
      >
        <label htmlFor={id} className="text-sm text-white/70">
          {label}
        </label>
        {labelLink && (
          <Link
            href={labelLink.href}
            className="text-xs text-[var(--color-primary)] hover:brightness-110 transition-all"
          >
            {labelLink.text}
          </Link>
        )}
      </div>

      {/* Input */}
      <div className="relative">
        <input
          id={id}
          type={resolvedType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          className={[
            "w-full px-6 py-2.5 rounded-full",
            "bg-white/5 border border-white/10",
            "text-sm text-white placeholder:text-white/30",
            "focus:outline-none focus:border-[var(--color-primary)]",
            "transition-colors duration-200",
            "[&::-ms-reveal]:hidden [&::-ms-clear]:hidden",
            "[&::-webkit-contacts-auto-fill-button]:hidden",
            "[&::-webkit-credentials-auto-fill-button]:hidden",
            isPassword ? "pr-11" : "",
          ].join(" ")}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors cursor-pointer"
            aria-label={
              showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
            }
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}
