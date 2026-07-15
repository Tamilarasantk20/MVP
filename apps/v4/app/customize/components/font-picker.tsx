"use client"

import { FONT_DEFINITIONS } from "@/lib/design-system/config"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"

export function FontPicker({
  value,
  onChange,
  allowInherit,
}: {
  value: string
  onChange: (name: string) => void
  allowInherit?: boolean
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger size="sm" className="w-full bg-neutral-900 text-neutral-100">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {allowInherit && <SelectItem value="inherit">Inherit (body font)</SelectItem>}
        {FONT_DEFINITIONS.map((font) => (
          <SelectItem key={font.name} value={font.name}>
            {font.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
