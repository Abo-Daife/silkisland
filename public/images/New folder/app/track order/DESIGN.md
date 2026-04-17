# Design System Strategy: The Shadowed Atrium

## 1. Overview & Creative North Star
**Creative North Star: "The Shadowed Atrium"**

This design system moves away from the clinical, flat nature of standard e-commerce to create a digital sanctuary. We are not building a store; we are curating a private viewing. The visual language balances the heavy, architectural weight of ancient Rome with the ethereal lightness of modern silk. 

To break the "template" look, we utilize **Intentional Asymmetry**. Components should not always align to a rigid 12-column center; instead, use generous, uneven whitespace (e.g., a headline offset to the left with an image overlapping the right margin) to create an editorial, high-fashion layout. We embrace the "void" of the `#131313` background, treating it not as empty space, but as a velvety atmosphere that holds our elements.

---

## 2. Colors & Atmospheric Depth

The palette is designed to mimic dramatic, Chiaroscuro-style lighting. 

*   **Primary Foundation:** `surface` (#131313) acts as our "Obsidian Stone." All content emerges from this darkness.
*   **The Gold Standard:** `primary_container` (#FFD700) is reserved for moments of absolute intent—Primary CTAs and vital brand markers.
*   **The Rose Highlight:** `tertiary_fixed` (#FFD9E1) provides a soft, human contrast to the cold stone, used for secondary text and delicate UI flourishes.
*   **Midnight Depth:** `secondary_container` (#3D3F93) is used for deep shadows and interactive states, providing a "cooler" nocturnal feel than pure black.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. 
*   **The Technique:** Boundaries must be defined through background color shifts. A product detail section should transition from `surface` to `surface_container_low` to create a natural "zone" without a physical line.
*   **The Glass & Gradient Rule:** For floating menus or overlays, use "Glassmorphism." Apply `surface_variant` at 40% opacity with a `20px` backdrop-blur. To add "soul," use a subtle linear gradient on large surfaces transitioning from `surface_container_lowest` to `surface_container_high`.

---

## 3. Typography: The Editorial Voice

Our typography is a dialogue between the ancient and the modern.

*   **Display & Headlines (Noto Serif):** This is our "Classical Roman" voice. It should feel chiseled and authoritative. For `display-lg`, increase letter-spacing by `0.05em` to allow the characters to breathe like a museum inscription.
*   **Body & Labels (Manrope):** A clean, architectural sans-serif. It provides the "Modern Sophistication" required for legibility in luxury e-commerce.

**Hierarchy as Identity:** Use extreme scale. Pair a massive `display-lg` headline with a tiny, all-caps `label-md` sub-header. This contrast is the hallmark of premium editorial design.

---

## 4. Elevation & Depth: Tonal Layering

In this system, "Elevation" is not a drop shadow; it is a change in material density.

*   **The Layering Principle:** Treat the UI as stacked sheets of polished stone. 
    *   **Base:** `surface` (The floor)
    *   **Secondary Content:** `surface_container_low` (Recessed niches)
    *   **Interactive Cards:** `surface_container_highest` (Raised plinths)
*   **Ambient Shadows:** If a floating element (like a modal) requires a shadow, use a "Velvet Shadow": `0px 20px 50px rgba(0, 0, 0, 0.8)`. The shadow must feel like a natural falloff of light, not a digital effect.
*   **The Ghost Border:** If a container sits on an identical color and needs definition, use the `outline-variant` token at **15% opacity**. This creates a "glint" on the edge of the object, mimicking a polished stone corner.

---

## 5. Components

### Buttons: The Golden Seal
*   **Primary:** Background: `primary_container` (#FFD700), Text: `on_primary_container`. Shape: `DEFAULT` (0.25rem) for a sharp, architectural look. No border.
*   **Tertiary (Ghost):** No background. Text: `primary_fixed_dim`. Hover state: A subtle `surface_bright` background bleed-in.

### Cards & Collections
*   **Forbid Dividers:** Never use a line to separate products. Use `1.5rem` to `3rem` of vertical whitespace.
*   **Image Treatment:** Images should use a "Mirror-like" finish. Apply a very subtle inner glow (10% white) to the top edge of image containers to simulate a light source hitting a glass frame.

### Input Fields: The Minimalist Scribe
*   **Styling:** No box. Use a `surface_container_highest` background with a `0.25rem` bottom radius. 
*   **Focus State:** The bottom edge glows with a `primary_fixed` (#FFE16D) 1px line. Helper text uses `tertiary_fixed_dim` (Rose) for a soft, non-aggressive guidance.

### Contextual Component: The "Atrium" Carousel
*   Instead of standard dots, use `label-sm` Roman Numerals (I, II, III, IV) to navigate high-end collections, emphasizing the ancient Roman inspiration.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use "High-Contrast" scale (e.g., placing a `display-lg` heading next to a `body-sm` paragraph).
*   **Do** use photography with "Dramatic Lighting"—heavy shadows and singular light sources.
*   **Do** utilize the "Ghost Border" at low opacities to suggest edges.

### Don't:
*   **Don't** use standard "Material" blue for links. Use `tertiary_fixed_dim` (Rose).
*   **Don't** use rounded corners above `0.5rem` (`lg`). We want sharp, sophisticated edges, not "bubbly" app-like shapes.
*   **Don't** clutter the screen. If a section feels "full," remove an element rather than shrinking it. Luxury is the luxury of space.

### Accessibility Note:
While we embrace "Shadowed" aesthetics, ensure all `on_surface` text meets a 4.5:1 contrast ratio against its respective `surface_container`. Use the Gold `primary_fixed_dim` for critical interactive prompts to ensure they are never missed.