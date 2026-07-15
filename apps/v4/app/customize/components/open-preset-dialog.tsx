"use client"

import * as React from "react"
import { decodePreset, isPresetCode } from "shadcn/preset"

import { sanitizeConfig, type DesignSystemConfig } from "@/lib/design-system/config"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/new-york-v4/ui/dialog"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Label } from "@/registry/new-york-v4/ui/label"

function extractCode(input: string) {
  const trimmed = input.trim()
  try {
    const url = new URL(trimmed)
    const fromQuery = url.searchParams.get("preset")
    if (fromQuery) return fromQuery
  } catch {
    // Not a URL, fall through and treat the raw input as the code.
  }
  return trimmed.replace(/^--preset\s+/, "")
}

export function OpenPresetDialog({
  open,
  onOpenChange,
  onApply,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApply: (patch: Partial<DesignSystemConfig>) => void
}) {
  const [value, setValue] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  function apply() {
    const code = extractCode(value)

    if (!isPresetCode(code)) {
      setError("That doesn't look like a valid preset code.")
      return
    }

    const decoded = decodePreset(code)
    if (!decoded) {
      setError("Couldn't decode that preset code.")
      return
    }

    onApply(
      sanitizeConfig({
        baseColor: decoded.baseColor,
        theme: decoded.theme,
        radius: decoded.radius as DesignSystemConfig["radius"],
        font: decoded.font,
        fontHeading: decoded.fontHeading ?? "inherit",
        menuAccent: decoded.menuAccent ?? "subtle",
      })
    )
    setError(null)
    setValue("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Open Preset</DialogTitle>
          <DialogDescription>
            Paste a preset code (or a ui.shadcn.com/create?preset=... link) to
            apply it here.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="preset-code-input">Preset code or URL</Label>
          <Input
            id="preset-code-input"
            placeholder="b3Zg9vM2Tr"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setError(null)
            }}
            onKeyDown={(e) => e.key === "Enter" && apply()}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button onClick={apply}>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
