"use client";

import { useRef, useState } from "react";

export function FileUpload({
  label,
  helpText,
  name,
  accept,
  onChange
}: {
  label: string;
  helpText?: string;
  name: string;
  accept?: string;
  onChange?: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-navy-700">
        {label}
      </label>
      <div
        className="flex cursor-pointer items-center justify-between rounded-sm border border-dashed border-navy-200 px-4 py-3 text-sm text-navy-500 hover:border-gold"
        onClick={() => inputRef.current?.click()}
      >
        <span className="truncate">{fileName || helpText}</span>
        <span className="ms-3 shrink-0 rounded-sm bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-700">
          Browse
        </span>
      </div>
      <input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          setFileName(file?.name || null);
          onChange?.(file);
        }}
      />
    </div>
  );
}
