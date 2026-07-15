import type { Metadata } from "next"
import { Suspense } from "react"

import { Customizer } from "@/app/customize/customizer"

export const metadata: Metadata = {
  title: "Customize",
  description: "Live theme editor for the checkout component.",
}

export default function CustomizePage() {
  return (
    <Suspense>
      <Customizer />
    </Suspense>
  )
}
