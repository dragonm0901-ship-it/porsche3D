# Collectcar Showcase

A full-bleed car showcase built from the supplied showroom reference video. The landing hero now fills the entire viewport, locks the scroll while the three cars transition in sequence, and only releases the page after the final car completes its scroll range.

## Stack

- Next.js App Router
- React 19
- TypeScript
- CSS for layout, motion, and scroll choreography
- `@google/model-viewer` for future `.glb` / `.gltf` car models

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Included Locales

- English: `/en`
- Nepali: `/ne`
- Spanish: `/es`
- German: `/de`
- Japanese: `/ja`

All editable copy and labels live in:

- `src/content/site.ts`

## Hero Scroll Behavior

The top section is set up like a controlled showroom sequence:

- The hero stays pinned while you scroll through the 3 cars
- The page only moves to the next section after the last car finishes its scroll range
- Scrolling upward reverses the same sequence before leaving the hero

This behavior is implemented in:

- `src/components/PortfolioPage.tsx`

## Garage Mode

Garage mode is a dedicated car viewer section with:

- Selection buttons for all 3 cars
- A matching studio-like background
- A circular flat stand under the car
- Mouse drag orbit when a real 3D model loads
- A strict lower-angle limit to avoid the broken under-car view
- Pointer-based fallback tilt for poster images when a model package is incomplete

Garage mode is implemented in:

- `src/components/GarageViewer.tsx`

## Where To Add Your 3D Car Models

Place each exported model inside `public/cars/models/`.

Recommended structure:

```text
public/
  cars/
    models/
      car-01/
        scene.gltf
        scene.bin
        textures/...
      car-02/
        scene.gltf
        scene.bin
        textures/...
      car-03/
        scene.gltf
        scene.bin
        textures/...
```

If you use `.gltf`, you must include every linked file beside it, especially `scene.bin` and the full `textures/` folder.

## How To Activate Real 3D Cars

Open:

- `src/content/site.ts`

Inside `featuredSlides`, update each slide:

```ts
{
  imagePath: "/cars/car-01-wide.png",
  modelPath: "/cars/models/car-01/scene.gltf",
}
```

Do the same for all 3 cars.

## Current Placeholder Assets

The current hero and collection use extracted placeholder renders from the supplied reference video:

- `public/cars/car-01-wide.png`
- `public/cars/car-02-wide.png`
- `public/cars/car-03-wide.png`

These remain as poster/fallback images even after real models are added.

## Important Files

- `app/[locale]/page.tsx`: locale entry route
- `app/globals.css`: full-bleed layout, hero timing, section styling, and garage environment
- `src/components/PortfolioPage.tsx`: page structure, locked hero scroll logic, overlays, and section navigation
- `src/components/GarageViewer.tsx`: garage scene and inspection behavior
- `src/components/ModelStage.tsx`: shared image/model rendering
- `src/components/CrestIcon.tsx`: crest mark used in the hero
- `src/content/site.ts`: cars, labels, locales, and section content

## Production Check

The app builds successfully with:

```bash
npm run build
```
# porsche3D
