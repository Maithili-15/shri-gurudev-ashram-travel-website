---
name: Sacred Minimalist
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#efeee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c19'
  on-surface-variant: '#554336'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#887364'
  outline-variant: '#dbc2b0'
  surface-tint: '#904d00'
  primary: '#8d4b00'
  on-primary: '#ffffff'
  primary-container: '#b15f00'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb77d'
  secondary: '#665d4e'
  on-secondary: '#ffffff'
  secondary-container: '#eee1cd'
  on-secondary-container: '#6c6353'
  tertiary: '#6e5747'
  on-tertiary: '#ffffff'
  tertiary-container: '#88705e'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc3'
  primary-fixed-dim: '#ffb77d'
  on-primary-fixed: '#2f1500'
  on-primary-fixed-variant: '#6e3900'
  secondary-fixed: '#eee1cd'
  secondary-fixed-dim: '#d1c5b2'
  on-secondary-fixed: '#211b0f'
  on-secondary-fixed-variant: '#4e4637'
  tertiary-fixed: '#fcddc7'
  tertiary-fixed-dim: '#dfc1ac'
  on-tertiary-fixed: '#28180b'
  on-tertiary-fixed-variant: '#574333'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2de'
  text-charcoal: '#2B2B2B'
  saffron-light: '#F59E0B'
  deep-earth: '#78350F'
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  margin-mobile: 24px
  margin-desktop: 64px
  gutter: 16px
  section-gap: 48px
---

## Brand & Style
The design system is rooted in the concepts of **tranquility, reverence, and spiritual elevation**. It balances the ancient warmth of an ashram with the sophisticated polish of a premium wellness retreat. The target audience seeks a digital sanctuary—a space free from the cognitive load of modern "attention-economy" apps.

The aesthetic follows a **Modern Minimalist** approach with **Glassmorphism** accents. It prioritizes breathable layouts, high-quality spiritual imagery, and a sense of "sacred space" created through generous margins and a warm, low-intensity color palette. Interactions should feel deliberate and rhythmic, mirroring the pace of a meditative breath.

## Colors
This design system utilizes a palette inspired by the earth and the sun. 
- **Primary (Saffron/Amber Gold):** Used sparingly for meaningful actions, highlights, and spiritual significance. 
- **Secondary (Champagne/Sand):** Acts as a soft bridge between the background and foreground elements, providing subtle structural definition.
- **Tertiary (Earthly Bronze):** Provides grounding and high-contrast legibility for sub-headers or decorative iconography.
- **Neutral (Soft Cream):** The canvas of the app, chosen to reduce eye strain and provide a warmer, more organic feel than pure white.

## Typography
The typography strategy relies on the contrast between the **classical elegance** of Playfair Display and the **functional clarity** of Inter. 

- **Serif Headlines:** Used for titles, quotes, and spiritual teachings to evoke a sense of tradition and authority.
- **Sans-Serif Body:** Used for all instructional text and long-form reading to ensure maximum accessibility and modern feel.
- **Letter Spacing:** Headlines utilize slight negative tracking for a tighter, editorial look, while labels use expanded tracking and uppercase styling for a sophisticated navigational feel.

## Layout & Spacing
The layout philosophy is **Fluid with Dynamic Safe Zones**. The design avoids clutter by implementing a "breathable" grid. 

- **Margins:** High horizontal margins (24px on mobile) ensure that content never feels cramped against the screen edges.
- **Vertical Rhythm:** Large gaps (48px+) between sections are encouraged to allow the user's eyes to rest while scrolling.
- **Alignment:** Centralized alignment is preferred for spiritual content (meditation prompts, daily verses), while a standard left-aligned grid is used for functional lists and settings.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Soft Ambient Shadows** rather than harsh borders.

- **Surface Layers:** The background (#FFFDF8) is the base. Cards use the Secondary color (#F4E7D3) or a semi-transparent glass effect when overlaying imagery.
- **Shadows:** Use extremely diffused shadows with a large blur radius (e.g., `box-shadow: 0 10px 30px rgba(91, 70, 54, 0.08)`). The shadow color is tinted with the Tertiary Bronze to maintain warmth.
- **Glassmorphism:** Navigation bars and player overlays use a backdrop blur (20px) with a 70% opacity white/cream tint to maintain a sense of lightness and transparency.

## Shapes
The shape language is organic and soft. There are no sharp corners in this design system. 

- **Primary Radius:** A consistent 0.5rem (8px) for buttons and small inputs.
- **Container Radius:** Cards and large containers use 1rem (16px) or 1.5rem (24px) to feel friendly and approachable.
- **Buttons:** Large action buttons may use a pill-shape (3rem) to distinguish them from content containers.

## Components
- **Buttons:** Primary buttons use the Saffron color with white text. Ghost buttons use a Thin Tertiary border. All buttons have a subtle hover scale effect.
- **Cards:** Content cards should feature a 3:2 aspect ratio for imagery at the top, with Serif headlines nested below. The card container has no border, only a soft ambient shadow.
- **Inputs:** Fields use a bottom-border-only style or a very light Champagne fill to minimize visual "noise."
- **Chips:** Used for "Moods" or "Categories," these are pill-shaped with a Champagne background and Charcoal text.
- **Meditation Player:** Features a large, circular "Play" button with a glassmorphic background. All icons in the player are "Light" or "Thin" weight.
- **Progress Indicators:** Use the Saffron color in thin (2px) lines to indicate session completion without being distracting.