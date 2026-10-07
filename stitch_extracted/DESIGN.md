---
name: Spatial Gesture Engine
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#c0c1ff'
  on-secondary: '#1000a9'
  secondary-container: '#3131c0'
  on-secondary-container: '#b0b2ff'
  tertiary: '#fff5de'
  on-tertiary: '#3b2f00'
  tertiary-container: '#fed639'
  on-tertiary-container: '#715d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#ffe179'
  tertiary-fixed-dim: '#eac324'
  on-tertiary-fixed: '#231b00'
  on-tertiary-fixed-variant: '#554500'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an atmospheric, spatial computing paradigm tailored for real-time gesture tracking and contactless interaction. The visual aesthetic draws inspiration from spatial operating environments and precision instrumentation: lightweight translucent materials, photonic light sources, and ultra-crisp typography anchored in deep void space. 

The emotional tone balances tactical precision with fluid, frictionless control. The user feels sovereign and unencumbered, navigating complex 3D-aware controls through intuitive, glowing feedback mechanisms. Rather than relying on flat digital sheets, the interface adopts a multi-layered optical approach—utilizing frosted glass surfaces, hairline refractive borders, and localized luminescence to confirm user intention without physical haptic contact.

## Colors

The palette leverages a deep void architecture to maximize the perceived luminance of tracking points, state changes, and spatial feedback.

- **Primary (`#00F0FF` - Luminous Cyan):** Used strictly for direct user input confirmations, active tracking reticles, high-confidence gesture states, and primary call-to-actions.
- **Secondary (`#6366F1` - Electric Indigo):** Used for ambient field backgrounds, secondary interactive states, spatial volume indicators, and subtle radiant depth gradients.
- **Neutral Core (`#090D16` - Deep Obsidian):** The foundational infinite canvas. A secondary slate (`#0D111D`) serves as the base for layered spatial planes, floating sheets, and nested surface panels.
- **Surfaces & Overlays:** Translucent layers are constructed with low-opacity white tints (`rgba(255, 255, 255, 0.04)` to `rgba(255, 255, 255, 0.08)`) with frosted borders (`rgba(255, 255, 255, 0.12)`). Active focus or target detection introduces subtle edge flares of Cyan (`rgba(0, 240, 255, 0.4)`).

## Typography

The typographic hierarchy prioritizes rapid scanning and immediate optical legibility across varying optical distances. Utilizing Inter across all roles preserves visual unity and modern technical rigor.

- **Display & Headlines:** Tightly tracked with refined optical weight (`500` to `600`) to evoke a calibrated heads-up display (HUD). Mobile downscaling guarantees zero truncation within constrained floating viewports.
- **Body:** Neutral and highly legible against dark backgrounds. Color values must maintain a high contrast ratio (minimum `rgba(255, 255, 255, 0.88)` for primary body; `rgba(255, 255, 255, 0.60)` for secondary metadata).
- **Labels & Telemetry:** Uppercase tracking (`+0.05em`) is applied to `label-sm` when displaying spatial coordinates, tracking degrees, or connection states to match hardware-level telemetry aesthetics.

## Layout & Spacing

The layout is structured around an adaptive 4-column fluid grid on mobile, expanding to 8 columns on tablet and 12 columns on desktop. Because gesture interaction demands generous, forgiving targeting regions, interactive touch and gesture targets enforce a strict minimum clearance.

- **Air Margins & Safe Areas:** The primary interaction plane is suspended away from screen boundaries using `margin` tokens to maintain the illusion of an operating card floating above spatial sensor feeds.
- **Rhythm:** Spacing follows a modular 4px/8px baseline grid. Compact controls use `space-sm` internal padding, while spatial cards and module groups rely on `space-lg` to create distinct optical volumes.

## Elevation & Depth

Depth in this system is achieved through physical transmission of light, material translucency, and photonic glow rather than traditional drop shadows.

- **Tier 0 (Sensor Canvas / Backdrop):** Solid `#090D16`, housing background point clouds, camera feeds, or ambient depth fields.
- **Tier 1 (Spatial Plates & Glass Panels):** Background set to `rgba(13, 17, 29, 0.65)` layered with a `backdrop-filter: blur(24px)`. Borders use a precise 1px hairline stroke of `rgba(255, 255, 255, 0.08)`.
- **Tier 2 (Floating Controls & Hover Reticles):** Background elevated to `rgba(255, 255, 255, 0.06)` with a `backdrop-filter: blur(32px)` and light-catching top border `rgba(255, 255, 255, 0.20)`.
- **Active / Target State (Photonic Glow):** When a gesture raycast, pinch, or hover locks onto a node, the element emanates a diffuse specular glow: `box-shadow: 0 0 24px -4px rgba(0, 240, 255, 0.35)`.

## Shapes

The interface embraces a continuous curvature geometry (`roundedness: 2`, with base radius at 8px, larger containers at 16px, and top-tier cards at 24px). Micro-interactions (toggles, indicators, status badges) utilize pill-shaped geometries (`rounded-full`) to clearly signal interactive affordance. The interplay between pill-shaped interactive pills and geometric, frosted rounded panels creates a cohesive hardware-software aesthetic.

## Components

- **Buttons:**
  - *Primary (Active State):* Solid or subtle gradient background (`linear-gradient(135deg, #00F0FF, #6366F1)`), text in deep `#090D16` with font weight `600`. Surrounding ambient glow of `rgba(0, 240, 255, 0.3)`.
  - *Spatial Ghost (Default State):* Frosted glass container (`rgba(255, 255, 255, 0.05)`), hairline border (`rgba(255, 255, 255, 0.12)`), text in high-contrast white. On focus/hover, border transitions to `#00F0FF`.
- **Cards & Spatial Containers:**
  - Layered with `backdrop-filter: blur(20px)` and an inner specular stroke (`1px solid rgba(255, 255, 255, 0.08)`).
  - Header regions feature micro-telemetry (e.g., active tracking Hz or gesture profile state) rendered in `label-sm`.
- **Chips & Mode Selectors:**
  - Compact pill-shaped elements with subtle frosted backgrounds. Active chip transitions to a semi-translucent Cyan fill (`rgba(0, 240, 255, 0.15)`) with an accented `#00F0FF` outline.
- **Input Fields & Sliders:**
  - Input fields use an inset slate background (`#0D111D`) with frosted glass borders. Focus ring illuminates via a subtle Cyan glow.
  - Sliders feature continuous photonic tracks with glowing thumb indicators that expand dynamically during hover/pinch interactions.
- **Gesture Reticles & Spatial Trackers (Domain-Specific):**
  - Circular nodes containing concentric hairline rings and a center focal dot.
  - Transition smoothly between idle (subtle white opacity), targeting (pulsing Indigo), and confirmed activation (high-intensity Luminous Cyan lock-in).