"use client"

import * as React from "react"

import { getFont } from "@/lib/design-system/config"

const LINK_ID_PREFIX = "google-font-"
const loaded = new Set<string>()

function ensureFontLoaded(fontName: string) {
  if (loaded.has(fontName) || typeof document === "undefined") return

  const def = getFont(fontName)
  if (!def) return

  const linkId = `${LINK_ID_PREFIX}${def.name}`
  if (document.getElementById(linkId)) {
    loaded.add(fontName)
    return
  }

  const family = def.googleFamily.replace(/ /g, "+")
  const link = document.createElement("link")
  link.id = linkId
  link.rel = "stylesheet"
  link.href = `https://fonts.googleapis.com/css2?family=${family}:wght@400;500;600;700&display=swap`
  document.head.appendChild(link)
  loaded.add(fontName)
}

// Lazily injects Google Fonts <link> stylesheets for whichever font names
// are passed in. Fonts are never unloaded once fetched (cheap, avoids
// flicker when undo/redo revisits a previous font choice).
export function useGoogleFonts(fontNames: (string | undefined)[]) {
  const key = fontNames.filter(Boolean).join(",")

  React.useEffect(() => {
    for (const name of fontNames) {
      if (name && name !== "inherit") {
        ensureFontLoaded(name)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
}
