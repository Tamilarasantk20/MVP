"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { decodePreset, encodePreset, isPresetCode, generateRandomConfig } from "shadcn/preset"

import {
  DEFAULT_CONFIG,
  sanitizeConfig,
  type DesignSystemConfig,
} from "@/lib/design-system/config"
import { GetCodeDialog } from "@/app/customize/components/get-code-dialog"
import { OpenPresetDialog } from "@/app/customize/components/open-preset-dialog"
import { PreviewPane } from "@/app/customize/components/preview-pane"
import { Sidebar } from "@/app/customize/components/sidebar"
import { useGoogleFonts } from "@/app/customize/hooks/use-google-font"
import { useHistoryState } from "@/app/customize/hooks/use-history"

function decodeFromParam(code: string): DesignSystemConfig | null {
  if (!isPresetCode(code)) return null
  const decoded = decodePreset(code)
  if (!decoded) return null

  return sanitizeConfig({
    baseColor: decoded.baseColor,
    theme: decoded.theme,
    radius: decoded.radius as DesignSystemConfig["radius"],
    font: decoded.font,
    fontHeading: decoded.fontHeading ?? "inherit",
    menuAccent: decoded.menuAccent ?? "subtle",
  })
}

export function Customizer() {
  const searchParams = useSearchParams()

  // Computed once on mount: seed from a shared ?preset= link if present.
  const initialConfig = React.useMemo(() => {
    const presetParam = searchParams.get("preset")
    return (presetParam && decodeFromParam(presetParam)) || DEFAULT_CONFIG
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const history = useHistoryState<DesignSystemConfig>(initialConfig)
  const config = history.value

  const [dark, setDark] = React.useState(false)
  const [getCodeOpen, setGetCodeOpen] = React.useState(false)
  const [openPresetOpen, setOpenPresetOpen] = React.useState(false)

  useGoogleFonts([config.font, config.fontHeading])

  const presetCode = React.useMemo(
    () =>
      encodePreset({
        style: "vega",
        iconLibrary: "lucide",
        menuColor: "default",
        chartColor: config.theme,
        baseColor: config.baseColor,
        theme: config.theme,
        radius: config.radius,
        font: config.font,
        fontHeading: config.fontHeading,
        menuAccent: config.menuAccent,
      }),
    [config]
  )

  function handleChange(patch: Partial<DesignSystemConfig>) {
    history.set((prev) => ({ ...prev, ...patch }))
  }

  function handleShuffle() {
    history.set(sanitizeConfig(generateRandomConfig()))
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar
        config={config}
        onChange={handleChange}
        presetCode={presetCode}
        onShuffle={handleShuffle}
        onUndo={history.undo}
        onRedo={history.redo}
        canUndo={history.canUndo}
        canRedo={history.canRedo}
        onOpenPreset={() => setOpenPresetOpen(true)}
        onGetCode={() => setGetCodeOpen(true)}
      />
      <PreviewPane config={config} dark={dark} onToggleDark={() => setDark((d) => !d)} />

      <GetCodeDialog
        open={getCodeOpen}
        onOpenChange={setGetCodeOpen}
        config={config}
        presetCode={presetCode}
      />
      <OpenPresetDialog
        open={openPresetOpen}
        onOpenChange={setOpenPresetOpen}
        onApply={handleChange}
      />
    </div>
  )
}
