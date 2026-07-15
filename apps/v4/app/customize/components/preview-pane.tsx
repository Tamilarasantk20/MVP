"use client"

import { MoonIcon, SunIcon } from "lucide-react"

import { buildScopedCss, type DesignSystemConfig } from "@/lib/design-system/config"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"
import { CheckoutForm } from "@/components/payment/checkout-form"

const SCOPE_CLASS = "customize-preview-scope"

export function PreviewPane({
  config,
  dark,
  onToggleDark,
}: {
  config: DesignSystemConfig
  dark: boolean
  onToggleDark: () => void
}) {
  return (
    <div className="relative flex h-full flex-1 items-center justify-center overflow-auto bg-neutral-100 p-10">
      <style>{buildScopedCss(config, SCOPE_CLASS)}</style>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 bg-white"
        onClick={onToggleDark}
        aria-label="Toggle dark preview"
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </Button>

      <div className={cn(SCOPE_CLASS, dark && "dark")}>
        <div className="w-full max-w-md bg-background p-2 text-foreground">
          <CheckoutForm />
        </div>
      </div>
    </div>
  )
}
