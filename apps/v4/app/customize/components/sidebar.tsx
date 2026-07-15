"use client"

import * as React from "react"
import { Check, Code2, Copy, FolderOpen, Redo2, Shuffle, Undo2 } from "lucide-react"

import {
  BASE_COLORS,
  DesignSystemConfig,
  getThemesForBaseColor,
  MENU_ACCENTS,
  RADII,
} from "@/lib/design-system/config"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"
import { ColorSwatchPicker } from "@/app/customize/components/color-swatch-picker"
import { FontPicker } from "@/app/customize/components/font-picker"
import { SegmentedControl } from "@/app/customize/components/segmented-control"

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 border-b border-neutral-800 px-4 py-3">
      <div className="text-xs text-neutral-500">{label}</div>
      {children}
    </div>
  )
}

export function Sidebar({
  config,
  onChange,
  presetCode,
  onShuffle,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onOpenPreset,
  onGetCode,
}: {
  config: DesignSystemConfig
  onChange: (patch: Partial<DesignSystemConfig>) => void
  presetCode: string
  onShuffle: () => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  onOpenPreset: () => void
  onGetCode: () => void
}) {
  const [copied, setCopied] = React.useState(false)
  const themeOptions = getThemesForBaseColor(config.baseColor)

  function copyPresetCode() {
    navigator.clipboard.writeText(`--preset ${presetCode}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex h-full w-[280px] shrink-0 flex-col overflow-y-auto border-r border-neutral-800 bg-neutral-950 text-neutral-100">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium">Customize</span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={!canUndo}
            onClick={onUndo}
            aria-label="Undo"
            className="text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
          >
            <Undo2 />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={!canRedo}
            onClick={onRedo}
            aria-label="Redo"
            className="text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
          >
            <Redo2 />
          </Button>
        </div>
      </div>

      <Row label="Base Color">
        <ColorSwatchPicker
          value={config.baseColor}
          onChange={(baseColor) => {
            const stillValid = getThemesForBaseColor(baseColor).some(
              (t) => t.name === config.theme
            )
            onChange({
              baseColor,
              ...(stillValid ? {} : { theme: baseColor }),
            })
          }}
          options={BASE_COLORS.map((c) => ({
            name: c.name,
            title: c.title ?? c.name,
            swatch: (c.cssVars?.light as Record<string, string>)?.primary ?? "",
          }))}
        />
      </Row>

      <Row label="Theme">
        <ColorSwatchPicker
          value={config.theme}
          onChange={(theme) => onChange({ theme })}
          options={themeOptions.map((t) => ({
            name: t.name,
            title: t.title ?? t.name,
            swatch: (t.cssVars?.light as Record<string, string>)?.primary ?? "",
          }))}
        />
      </Row>

      <Row label="Radius">
        <SegmentedControl
          value={config.radius}
          onChange={(radius) => onChange({ radius: radius as DesignSystemConfig["radius"] })}
          options={RADII.map((r) => ({ name: r.name, label: r.label }))}
        />
      </Row>

      <Row label="Font">
        <FontPicker value={config.font} onChange={(font) => onChange({ font })} />
      </Row>

      <Row label="Heading Font">
        <FontPicker
          value={config.fontHeading}
          onChange={(fontHeading) => onChange({ fontHeading })}
          allowInherit
        />
      </Row>

      <Row label="Menu Accent">
        <SegmentedControl
          value={config.menuAccent}
          onChange={(menuAccent) =>
            onChange({ menuAccent: menuAccent as DesignSystemConfig["menuAccent"] })
          }
          options={MENU_ACCENTS.map((a) => ({ name: a.name, label: a.label }))}
        />
      </Row>

      <div className="px-4 py-3 text-[11px] leading-relaxed text-neutral-500">
        Style, icon library, and menu color aren&apos;t shown &mdash; this app
        only ships one component style with no icons or site menu, so those
        pickers would have nothing to change.
      </div>

      <div className="mt-auto space-y-2 border-t border-neutral-800 p-4">
        <button
          type="button"
          onClick={copyPresetCode}
          className="flex w-full items-center justify-between gap-2 rounded-md bg-neutral-900 px-3 py-2 font-mono text-xs text-neutral-300 hover:bg-neutral-800"
        >
          <span className="truncate">--preset {presetCode}</span>
          {copied ? <Check className="size-3.5 shrink-0" /> : <Copy className="size-3.5 shrink-0" />}
        </button>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="bg-neutral-900 text-neutral-100 hover:bg-neutral-800" onClick={onOpenPreset}>
            <FolderOpen /> Open Preset
          </Button>
          <Button variant="outline" size="sm" className="bg-neutral-900 text-neutral-100 hover:bg-neutral-800" onClick={onShuffle}>
            <Shuffle /> Shuffle
          </Button>
        </div>

        <Button size="sm" className={cn("w-full")} onClick={onGetCode}>
          <Code2 /> Get Code
        </Button>
      </div>
    </div>
  )
}
