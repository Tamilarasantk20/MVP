import { BASE_COLORS, getThemesForBaseColor, THEMES } from "@/lib/design-system/themes"

// The CSS custom properties this app actually renders with. (No chart-*/sidebar-*
// vars: the checkout form doesn't use charts or a sidebar.)
const THEME_KEYS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "border",
  "input",
  "ring",
] as const

export const RADII = [
  { name: "default", label: "Default", value: "0.625rem" },
  { name: "none", label: "None", value: "0rem" },
  { name: "small", label: "Small", value: "0.45rem" },
  { name: "medium", label: "Medium", value: "0.625rem" },
  { name: "large", label: "Large", value: "0.875rem" },
] as const

export type RadiusName = (typeof RADII)[number]["name"]

export const MENU_ACCENTS = [
  { name: "subtle", label: "Subtle" },
  { name: "bold", label: "Bold" },
] as const

export type MenuAccentName = (typeof MENU_ACCENTS)[number]["name"]

export type FontType = "sans" | "mono" | "serif"

export type FontDefinition = {
  name: string
  title: string
  type: FontType
  fallback: string
  googleFamily: string
  previewVariable: string
}

const sansFallback = "ui-sans-serif, system-ui, sans-serif"
const monoFallback = "ui-monospace, monospace"
const serifFallback = "ui-serif, serif"

export const FONT_DEFINITIONS: FontDefinition[] = [
  { name: "inter", title: "Inter", type: "sans", googleFamily: "Inter", fallback: sansFallback, previewVariable: "--font-preview-inter" },
  { name: "geist", title: "Geist", type: "sans", googleFamily: "Geist", fallback: sansFallback, previewVariable: "--font-preview-geist" },
  { name: "noto-sans", title: "Noto Sans", type: "sans", googleFamily: "Noto Sans", fallback: sansFallback, previewVariable: "--font-preview-noto-sans" },
  { name: "nunito-sans", title: "Nunito Sans", type: "sans", googleFamily: "Nunito Sans", fallback: sansFallback, previewVariable: "--font-preview-nunito-sans" },
  { name: "figtree", title: "Figtree", type: "sans", googleFamily: "Figtree", fallback: sansFallback, previewVariable: "--font-preview-figtree" },
  { name: "roboto", title: "Roboto", type: "sans", googleFamily: "Roboto", fallback: sansFallback, previewVariable: "--font-preview-roboto" },
  { name: "raleway", title: "Raleway", type: "sans", googleFamily: "Raleway", fallback: sansFallback, previewVariable: "--font-preview-raleway" },
  { name: "dm-sans", title: "DM Sans", type: "sans", googleFamily: "DM Sans", fallback: sansFallback, previewVariable: "--font-preview-dm-sans" },
  { name: "public-sans", title: "Public Sans", type: "sans", googleFamily: "Public Sans", fallback: sansFallback, previewVariable: "--font-preview-public-sans" },
  { name: "outfit", title: "Outfit", type: "sans", googleFamily: "Outfit", fallback: sansFallback, previewVariable: "--font-preview-outfit" },
  { name: "oxanium", title: "Oxanium", type: "sans", googleFamily: "Oxanium", fallback: sansFallback, previewVariable: "--font-preview-oxanium" },
  { name: "manrope", title: "Manrope", type: "sans", googleFamily: "Manrope", fallback: sansFallback, previewVariable: "--font-preview-manrope" },
  { name: "space-grotesk", title: "Space Grotesk", type: "sans", googleFamily: "Space Grotesk", fallback: sansFallback, previewVariable: "--font-preview-space-grotesk" },
  { name: "montserrat", title: "Montserrat", type: "sans", googleFamily: "Montserrat", fallback: sansFallback, previewVariable: "--font-preview-montserrat" },
  { name: "ibm-plex-sans", title: "IBM Plex Sans", type: "sans", googleFamily: "IBM Plex Sans", fallback: sansFallback, previewVariable: "--font-preview-ibm-plex-sans" },
  { name: "source-sans-3", title: "Source Sans 3", type: "sans", googleFamily: "Source Sans 3", fallback: sansFallback, previewVariable: "--font-preview-source-sans-3" },
  { name: "instrument-sans", title: "Instrument Sans", type: "sans", googleFamily: "Instrument Sans", fallback: sansFallback, previewVariable: "--font-preview-instrument-sans" },
  { name: "jetbrains-mono", title: "JetBrains Mono", type: "mono", googleFamily: "JetBrains Mono", fallback: monoFallback, previewVariable: "--font-preview-jetbrains-mono" },
  { name: "geist-mono", title: "Geist Mono", type: "mono", googleFamily: "Geist Mono", fallback: monoFallback, previewVariable: "--font-preview-geist-mono" },
  { name: "noto-serif", title: "Noto Serif", type: "serif", googleFamily: "Noto Serif", fallback: serifFallback, previewVariable: "--font-preview-noto-serif" },
  { name: "roboto-slab", title: "Roboto Slab", type: "serif", googleFamily: "Roboto Slab", fallback: serifFallback, previewVariable: "--font-preview-roboto-slab" },
  { name: "merriweather", title: "Merriweather", type: "serif", googleFamily: "Merriweather", fallback: serifFallback, previewVariable: "--font-preview-merriweather" },
  { name: "lora", title: "Lora", type: "serif", googleFamily: "Lora", fallback: serifFallback, previewVariable: "--font-preview-lora" },
  { name: "playfair-display", title: "Playfair Display", type: "serif", googleFamily: "Playfair Display", fallback: serifFallback, previewVariable: "--font-preview-playfair-display" },
  { name: "eb-garamond", title: "EB Garamond", type: "serif", googleFamily: "EB Garamond", fallback: serifFallback, previewVariable: "--font-preview-eb-garamond" },
  { name: "instrument-serif", title: "Instrument Serif", type: "serif", googleFamily: "Instrument Serif", fallback: serifFallback, previewVariable: "--font-preview-instrument-serif" },
]

export function getFont(name: string) {
  return FONT_DEFINITIONS.find((f) => f.name === name)
}

export type DesignSystemConfig = {
  baseColor: string
  theme: string
  radius: RadiusName
  font: string
  fontHeading: string // "inherit" or a FONT_DEFINITIONS name
  menuAccent: MenuAccentName
}

export const DEFAULT_CONFIG: DesignSystemConfig = {
  baseColor: "mauve",
  theme: "blue",
  radius: "large",
  font: "inter",
  fontHeading: "geist",
  menuAccent: "subtle",
}

export { BASE_COLORS, THEMES, getThemesForBaseColor }

// Coerces an arbitrary (possibly externally-decoded or randomly-generated)
// config-like object into one this app can actually render. The real preset
// package's enums are a superset of what we have oklch data for (e.g. "gray"
// isn't one of our ported base colors/themes) and its font/radius lists can
// drift from ours over time, so unknown values fall back to safe defaults
// instead of throwing.
export function sanitizeConfig(input: Partial<DesignSystemConfig>): DesignSystemConfig {
  const baseColor = BASE_COLORS.some((c) => c.name === input.baseColor)
    ? input.baseColor!
    : DEFAULT_CONFIG.baseColor

  const themeCandidates = getThemesForBaseColor(baseColor)
  const theme = themeCandidates.some((t) => t.name === input.theme)
    ? input.theme!
    : baseColor

  const radius = RADII.some((r) => r.name === input.radius)
    ? (input.radius as RadiusName)
    : DEFAULT_CONFIG.radius

  const font = getFont(input.font ?? "") ? input.font! : DEFAULT_CONFIG.font
  const fontHeading =
    input.fontHeading === "inherit" || getFont(input.fontHeading ?? "")
      ? input.fontHeading!
      : DEFAULT_CONFIG.fontHeading

  const menuAccent = MENU_ACCENTS.some((a) => a.name === input.menuAccent)
    ? (input.menuAccent as MenuAccentName)
    : DEFAULT_CONFIG.menuAccent

  return { baseColor, theme, radius, font, fontHeading, menuAccent }
}

type CssVars = Record<string, string>

function pick(vars: CssVars | undefined, keys: readonly string[]): CssVars {
  const result: CssVars = {}
  for (const key of keys) {
    if (vars?.[key]) result[key] = vars[key]
  }
  return result
}

// Mirrors the real shadcn registry's buildRegistryTheme merge order:
// base color supplies the neutral foundation, the accent theme overlays
// primary/secondary on top, trimmed to the vars this app renders with.
export function buildTheme(config: DesignSystemConfig) {
  const baseColor = BASE_COLORS.find((c) => c.name === config.baseColor)
  const theme = THEMES.find((t) => t.name === config.theme)

  if (!baseColor || !theme) {
    throw new Error(`Unknown baseColor "${config.baseColor}" or theme "${config.theme}"`)
  }

  const light: CssVars = {
    ...pick(baseColor.cssVars?.light as CssVars, THEME_KEYS),
    ...pick(theme.cssVars?.light as CssVars, THEME_KEYS),
  }
  const dark: CssVars = {
    ...pick(baseColor.cssVars?.dark as CssVars, THEME_KEYS),
    ...pick(theme.cssVars?.dark as CssVars, THEME_KEYS),
  }

  if (config.menuAccent === "bold") {
    light.accent = light.primary
    light["accent-foreground"] = light["primary-foreground"]
    dark.accent = dark.primary
    dark["accent-foreground"] = dark["primary-foreground"]
  }

  const radius = RADII.find((r) => r.name === config.radius)
  const radiusValue = radius?.value ?? RADII[0].value

  const fontDef = getFont(config.font)
  const headingDef =
    config.fontHeading === "inherit" ? undefined : getFont(config.fontHeading)

  return {
    light,
    dark,
    radius: radiusValue,
    fontSans: fontDef
      ? `var(${fontDef.previewVariable}), ${fontDef.fallback}`
      : sansFallback,
    fontHeading: headingDef
      ? `var(${headingDef.previewVariable}), ${headingDef.fallback}`
      : undefined,
  }
}

function toCssDeclarations(vars: CssVars, extra: CssVars = {}) {
  return Object.entries({ ...vars, ...extra })
    .map(([key, value]) => `  --${key}: ${value};`)
    .join("\n")
}

// Full, unscoped :root/.dark block ready to paste into globals.css.
export function buildExportCss(config: DesignSystemConfig) {
  const built = buildTheme(config)
  const rootExtra: CssVars = { radius: built.radius }
  if (built.fontHeading) rootExtra["font-heading"] = built.fontHeading

  return [
    `:root {\n${toCssDeclarations(built.light, rootExtra)}\n}`,
    `.dark {\n${toCssDeclarations(built.dark)}\n}`,
  ].join("\n\n")
}

// CSS scoped to a class, for live-previewing without touching the real page theme.
export function buildScopedCss(config: DesignSystemConfig, scopeClassName: string) {
  const built = buildTheme(config)
  const rootExtra: CssVars = {
    radius: built.radius,
    "font-sans": built.fontSans,
  }
  if (built.fontHeading) rootExtra["font-heading"] = built.fontHeading

  return [
    `.${scopeClassName} {\n${toCssDeclarations(built.light, rootExtra)}\n}`,
    `.${scopeClassName}.dark {\n${toCssDeclarations(built.dark)}\n}`,
  ].join("\n\n")
}
