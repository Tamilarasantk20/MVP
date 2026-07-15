"use client"

import { buildExportCss, getFont, type DesignSystemConfig } from "@/lib/design-system/config"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/registry/new-york-v4/ui/dialog"
import { CopyBlock } from "@/app/customize/components/copy-block"

function toNextFontImportName(googleFamily: string) {
  return googleFamily.replace(/ /g, "_")
}

function buildFontSnippet(config: DesignSystemConfig) {
  const font = getFont(config.font)
  const heading = config.fontHeading === "inherit" ? undefined : getFont(config.fontHeading)
  if (!font) return ""

  const imports = [font, ...(heading ? [heading] : [])]
  const importNames = Array.from(new Set(imports.map((f) => toNextFontImportName(f.googleFamily))))

  const lines = [
    `import { ${importNames.join(", ")} } from "next/font/google"`,
    "",
    `const fontSans = ${toNextFontImportName(font.googleFamily)}({ subsets: ["latin"], variable: "--font-sans" })`,
  ]

  if (heading) {
    lines.push(
      `const fontHeading = ${toNextFontImportName(heading.googleFamily)}({ subsets: ["latin"], variable: "--font-heading" })`,
      "",
      `// <html className={\`\${fontSans.variable} \${fontHeading.variable}\`}>`
    )
  } else {
    lines.push("", "// <html className={fontSans.variable}>")
  }

  return lines.join("\n")
}

export function GetCodeDialog({
  open,
  onOpenChange,
  config,
  presetCode,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  config: DesignSystemConfig
  presetCode: string
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Get Code</DialogTitle>
          <DialogDescription>
            Paste these into your project to reproduce this look.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <CopyBlock label="globals.css" code={buildExportCss(config)} />
          <CopyBlock label="layout.tsx (fonts)" code={buildFontSnippet(config)} />
          <CopyBlock
            label="shadcn CLI (apply to a real shadcn project)"
            code={`npx shadcn@latest init --preset ${presetCode}`}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
