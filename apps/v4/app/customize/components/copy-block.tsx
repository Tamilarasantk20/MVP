"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/registry/new-york-v4/ui/button"

export function CopyBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = React.useState(false)

  function copy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <Button variant="ghost" size="sm" onClick={copy}>
          {copied ? <Check /> : <Copy />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="max-h-56 overflow-auto rounded-md bg-neutral-950 p-3 text-xs text-neutral-100">
        <code>{code}</code>
      </pre>
    </div>
  )
}
