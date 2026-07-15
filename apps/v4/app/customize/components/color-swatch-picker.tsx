"use client"

import { cn } from "@/lib/utils"

export function ColorSwatchPicker({
  options,
  value,
  onChange,
}: {
  options: { name: string; title: string; swatch: string }[]
  value: string
  onChange: (name: string) => void
}) {
  return (
    <div className="grid grid-cols-4 gap-1.5">
      {options.map((option) => (
        <button
          key={option.name}
          type="button"
          title={option.title}
          onClick={() => onChange(option.name)}
          className={cn(
            "flex flex-col items-center gap-1 rounded-md border border-transparent p-1.5 text-[10px] text-neutral-400 transition-colors hover:bg-neutral-800",
            value === option.name && "border-neutral-700 bg-neutral-800 text-neutral-100"
          )}
        >
          <span
            className="size-5 rounded-full ring-1 ring-white/10"
            style={{ backgroundColor: option.swatch }}
          />
          <span className="line-clamp-1 w-full text-center">{option.title}</span>
        </button>
      ))}
    </div>
  )
}
