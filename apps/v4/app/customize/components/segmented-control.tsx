"use client"

import { cn } from "@/lib/utils"

export function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: { name: string; label: string }[]
  value: string
  onChange: (name: string) => void
}) {
  return (
    <div className="grid grid-cols-3 gap-1 rounded-md bg-neutral-900 p-1">
      {options.map((option) => (
        <button
          key={option.name}
          type="button"
          onClick={() => onChange(option.name)}
          className={cn(
            "rounded-sm px-2 py-1 text-xs text-neutral-400 transition-colors hover:text-neutral-100",
            value === option.name && "bg-neutral-700 text-neutral-100"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
