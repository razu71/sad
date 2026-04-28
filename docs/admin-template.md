# Vue + Tailwind Admin Template (Phased Build Doc)

This document is the implementation roadmap for turning this project into a **full-featured admin template**. It is organized into sequential phases. Each phase has an outcome checklist, the files/folders it touches, and — for every component — a behavior spec (purpose, props, slots, events, states, accessibility, brand styling).

---

## Tech stack (packages installed already)

- `Vue 3` (`<script setup lang="ts">`)
- `Vite + TypeScript`
- `TailwindCSS`
- `Pinia`
- `Vue Router`
- `lucide-vue-next` icons
- `clsx` + `tailwind-merge` — for the `cn()` helper
- `@tanstack/vue-table` — for `DataTable`
- `vue-toastification` — for toasts
- `vue3-apexcharts` — for charts
- `vee-validate` — for form validation
- `zod` — for schema validation
- `@vee-validate/zod` — for zod schema validation
- `@tanstack/vue-table` — for `DataTable`
- `vue-multiselect` - for multiselect dropdown
- `vue-i18n` - for internationalization

## Non-negotiables

- **Comments**: use comments almost everywhere to explain the code. So that, I can understand properly.
- **Composition API `<script setup>` only** for all new `.vue` code.
- **TypeScript everywhere** (stores, composables, UI configs, pages, props).
- **Reusable components first** (primitives → composed → layout → pages).
- **Real-time input validation** (field-level errors as the user types).
- **No extra package installs without confirmation** (call out explicitly when needed).
- **Icons**: never inline SVGs or static icon files. Always use `lucide-vue-next`.
- **Imports**: always use the `@/` alias (configured in `vite.config.ts` and `tsconfig.app.json`).
- **No global event bus**. Cross-component communication uses props/emits, Pinia, or `provide/inject`.
- **Multilingual**: the application should be multilingual. The default language should be English. The supported languages should be English and Bangla.

## Folder structure

- `src/components/ui/` — hand-built reusable UI primitives (`Button`, `Input`, `Dialog`, etc.)
- `src/components/app/` — template-specific composed components (`SidebarNav`, `Topbar`, `Breadcrumbs`, `AppLogo`, `PageHeader`, `StatCard`, etc.)
- `src/components/forms/` — forms related components like `FormGroup.vue`, `FormSelect.vue`, `FormDatePicker.vue`, `FormFileUpload.vue` and other forms related components should be in this folder.
- `src/components/charts/` — charts related components like `Chart.vue`, `ChartArea.vue`, `ChartBar.vue`, `ChartLine.vue`, `ChartPie.vue`, `ChartRadar.vue`, `ChartScatter.vue` and other charts related components should be in this folder.
- `src/layouts/` — layouts like `AdminLayout.vue` for authenticated routes and `AuthLayout.vue` for public routes
- `src/pages/` — route pages, grouped by area (`auth/`, `admin/`, `errors/`)
- `src/composables/` — shared Vue composables like `useField.ts` for form fields and `useForm.ts` for form validation
- `src/stores/` — Pinia setup stores like `auth.ts` for authentication and `ui.ts` for UI state and stores for other features should be in this folder.
- `src/types/` — shared TS types and DTOs like `User.ts` for the user and `NavItem.ts` for the navigation and types for other features should be in this folder.
- `src/router/` — router setup like `index.ts` for the router and route guards and route guards for other features should be in this folder.
- `src/schemas/` — schema validation like `auth.schemas.ts` for authentication and `user.schemas.ts` for the user and schemas for other features should be in this folder.
- `src/utils/` — utility functions like `formatDate.ts` for formatting dates and `formatNumber.ts` for formatting numbers and utility functions for other features should be in this folder. In this folder, we will also keep the `cn()` helper function. Create a libs folder here and put library related customized function only. rest you can put directly under utils folder.
- `src/assets/` — assets like logo, images, icons, fonts, styles etc should be in this folder.
- `src/style.css` — global styles for the application
- `src/main.ts` — the main entry point for the application like `main.ts` for the application and other entry points should be in this folder.

## Brand palette (must be applied)

The **brand colors** (Sunrise Orange, River Teal) stay constant across both themes. Only **surface** and **text** tokens flip between light and dark.

### Brand (constant in both themes)

| Token name     | HEX       | Usage                                              |
| -------------- | --------- | -------------------------------------------------- |
| Sunrise Orange | `#E8894A` | Brand primary, CTAs, primary buttons, logo accents |
| River Teal     | `#2E9E8F` | Secondary, success, links, active indicators       |

### Light theme surfaces

| Token name        | HEX       | Usage                                          |
| ----------------- | --------- | ---------------------------------------------- |
| Deep Night        | `#1B3A4B` | Foreground text, headings                      |
| Off-White Surface | `#FBFBFB` | Sidebar / topbar / footer surfaces, page bg    |
| White             | `#FFFFFF` | Cards, dialogs, inputs                         |
| Cool Gray 200     | `#E5E7EB` | Borders, dividers                              |

### Dark theme surfaces

| Token name      | HEX       | Usage                                                       |
| --------------- | --------- | ----------------------------------------------------------- |
| Deep Night 950  | `#0E1F29` | Page background                                             |
| Deep Night 900  | `#13293A` | Sidebar / topbar / footer surfaces                          |
| Deep Night 800  | `#1B3A4B` | Cards, dialogs, inputs (the original Deep Night)            |
| Mist 50         | `#F2F5F7` | Foreground text on dark surfaces                            |
| Mist 400        | `#8FA2AE` | Muted text, helper text                                     |
| Deep Night 700  | `#264A5E` | Borders, dividers                                           |

> The hex values for the dark scale above are recommendations derived from Deep Night `#1B3A4B`. Adjust during implementation if contrast checks fail.

Typography: **Plus Jakarta Sans** (already loaded via `@font-face` in `src/style.css`). Use a single font family across both themes.

---

## Phase 0 — Project structure & conventions

### Outcome checklist

- Standard folders exist for UI primitives, composed components, layouts, pages, stores, types, composables, lib.
- All imports use the `@/` alias.
- Naming conventions are consistent across the project.

### Folder structure

Create (or keep) the following directories:

- `src/components/ui/` — hand-built reusable UI primitives (`Button`, `Input`, `Dialog`, etc.)
- `src/components/app/` — template-specific composed components (`SidebarNav`, `Topbar`, `Breadcrumbs`, `AppLogo`, `PageHeader`, `StatCard`, etc.)
- `src/layouts/` — `AdminLayout.vue`, `AuthLayout.vue`
- `src/pages/` — route pages, grouped by area (`auth/`, `admin/`, `errors/`)
- `src/composables/` — shared Vue composables (`useField`, `useForm`, `useBreakpoint`, etc.)
- `src/lib/` — pure utilities and configs (`utils.ts` for `cn()`, `nav.ts` for navigation, `variants.ts`, `constants.ts`)
- `src/stores/` — Pinia setup stores (`auth.ts`, `ui.ts`)
- `src/types/` — shared TS types and DTOs
- `src/router/` — router setup (`index.ts`) and route guards

### Naming conventions

- Component files: `PascalCase.vue` (e.g. `Button.vue`, `SidebarNav.vue`).
- TS utilities and composables: `camelCase.ts` (e.g. `useField.ts`, `nav.ts`).
- Stores: `src/stores/<name>.ts` using **Pinia setup stores**: `defineStore('name', () => { ... })`.
- Types: `PascalCase` interfaces/types inside `src/types/*.ts`. All types should be in types folder with related named file. If type is used in multiple files, it should be in the common (common.types.ts) types file.
- Folders: lowercase, kebab-friendly, but components stay PascalCase.

### Single sources of truth

- Navigation: `src/lib/nav.ts`
- Theme tokens: `src/style.css` (CSS variables on `:root`)
- Auth state: `src/stores/auth.ts`
- UI/layout state (sidebar collapsed, mobile drawer open, theme): `src/stores/ui.ts`

---

## Phase 1 — Theme tokens & global styles (light + dark)

### Outcome checklist

- All semantic colors are defined as CSS variables in `src/style.css`.
- Components reference variables (never hard-coded HEX in templates).
- **Both light and dark themes are fully implemented from day one.**
- A `data-theme="dark"` attribute on `<html>` (or a `.dark` class) flips the entire UI.
- Theme preference is persisted and respects the OS preference by default.
- Typography, radius, and shadow tokens are documented.

### Theme switching strategy

- **Mechanism**: toggle a `data-theme` attribute on the `<html>` element (`data-theme="light"` or `data-theme="dark"`). CSS variables redefine themselves under each selector.
- **Why attribute over class**: it cannot collide with utility classes and is trivial to flip via a single line of JS.
- **Three user choices**: `'light' | 'dark' | 'system'`. `'system'` follows `prefers-color-scheme`.
- **Persistence**: store the user choice in `localStorage` under the key `theme` (`'light' | 'dark' | 'system'`). Default is `'system'` on first load.
- **Boot order**: a tiny inline script in `index.html` (or the very first lines of `main.ts`) reads `localStorage` and sets `data-theme` on `<html>` **before** Vue mounts, to prevent a flash of the wrong theme (FOUC).
- **System changes**: when the user's choice is `'system'`, listen to `window.matchMedia('(prefers-color-scheme: dark)')` and re-apply the attribute on change.
- **No transitions on theme switch**: optionally suppress `transition` on `*` for a single tick during a switch to avoid jarring color crossfades.

### CSS variables — semantic token list

Define every token in **both** the `:root` (light) and `[data-theme="dark"]` selectors in `src/style.css`. Components only ever reference these semantic names:

Surfaces & text:

- `--background` — page background
- `--foreground` — default text on `--background`
- `--card`, `--card-foreground` — card / dialog surface and text
- `--muted`, `--muted-foreground` — secondary text, captions, helper text
- `--border` — dividers, input borders
- `--input` — input background
- `--ring` — focus ring color (Sunrise Orange at reduced opacity)
- `--overlay` — dialog/drawer backdrop (semi-transparent)

Brand:

- `--primary`, `--primary-foreground` — Sunrise Orange + readable text
- `--secondary`, `--secondary-foreground` — River Teal + readable text
- `--accent`, `--accent-foreground` — hover/active tints

Status:

- `--destructive`, `--destructive-foreground`
- `--success`, `--success-foreground`
- `--warning`, `--warning-foreground`
- `--info`, `--info-foreground`

Layout chrome:

- `--sidebar-bg`, `--sidebar-text`, `--sidebar-active-bg`, `--sidebar-active-text`
- `--topbar-bg`, `--topbar-text`, `--topbar-border`
- `--footer-bg`, `--footer-text`

Non-color tokens (mode-independent):

- `--radius-sm`, `--radius-md`, `--radius-lg`
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`

### Token values — light theme (`:root`)

| Token                   | Value     |
| ----------------------- | --------- |
| `--background`          | `#FBFBFB` |
| `--foreground`          | `#1B3A4B` |
| `--card`                | `#FFFFFF` |
| `--card-foreground`     | `#1B3A4B` |
| `--muted`               | `#F3F4F6` |
| `--muted-foreground`    | `#5C6B75` |
| `--border`              | `#E5E7EB` |
| `--input`               | `#FFFFFF` |
| `--ring`                | `rgba(232, 137, 74, 0.45)` |
| `--overlay`             | `rgba(27, 58, 75, 0.45)` |
| `--primary`             | `#E8894A` |
| `--primary-foreground`  | `#FFFFFF` |
| `--secondary`           | `#2E9E8F` |
| `--secondary-foreground`| `#FFFFFF` |
| `--accent`              | `#FCEBD9` |
| `--accent-foreground`   | `#1B3A4B` |
| `--destructive`         | `#DC2626` |
| `--success`             | `#2E9E8F` |
| `--warning`             | `#D97706` |
| `--info`                | `#2563EB` |
| `--sidebar-bg`          | `#FBFBFB` |
| `--sidebar-text`        | `#1B3A4B` |
| `--sidebar-active-bg`   | `#FCEBD9` |
| `--sidebar-active-text` | `#E8894A` |
| `--topbar-bg`           | `#FFFFFF` |
| `--topbar-text`         | `#1B3A4B` |
| `--topbar-border`       | `#E5E7EB` |
| `--footer-bg`           | `#FBFBFB` |
| `--footer-text`         | `#5C6B75` |

### Token values — dark theme (`[data-theme="dark"]`)

| Token                   | Value     |
| ----------------------- | --------- |
| `--background`          | `#0E1F29` |
| `--foreground`          | `#F2F5F7` |
| `--card`                | `#1B3A4B` |
| `--card-foreground`     | `#F2F5F7` |
| `--muted`               | `#13293A` |
| `--muted-foreground`    | `#8FA2AE` |
| `--border`              | `#264A5E` |
| `--input`               | `#13293A` |
| `--ring`                | `rgba(232, 137, 74, 0.55)` |
| `--overlay`             | `rgba(0, 0, 0, 0.65)` |
| `--primary`             | `#E8894A` |
| `--primary-foreground`  | `#1B3A4B` |
| `--secondary`           | `#2E9E8F` |
| `--secondary-foreground`| `#0E1F29` |
| `--accent`              | `#264A5E` |
| `--accent-foreground`   | `#F2F5F7` |
| `--destructive`         | `#F87171` |
| `--success`             | `#34D399` |
| `--warning`             | `#FBBF24` |
| `--info`                | `#60A5FA` |
| `--sidebar-bg`          | `#13293A` |
| `--sidebar-text`        | `#F2F5F7` |
| `--sidebar-active-bg`   | `#264A5E` |
| `--sidebar-active-text` | `#E8894A` |
| `--topbar-bg`           | `#13293A` |
| `--topbar-text`         | `#F2F5F7` |
| `--topbar-border`       | `#264A5E` |
| `--footer-bg`           | `#13293A` |
| `--footer-text`         | `#8FA2AE` |

### Tailwind usage rules

- Reference tokens via arbitrary values: `bg-[var(--card)]`, `text-[var(--foreground)]`, `border-[var(--border)]`.
- **Never** use raw HEX or named Tailwind colors (`bg-white`, `text-slate-900`, etc.) for theme-aware surfaces.
- Brand colors and status colors are **also** referenced via tokens (e.g. `bg-[var(--primary)]`), so dark adjustments propagate automatically.
- Keep the existing `@font-face` block for Plus Jakarta Sans intact.
- The `html, body` font-family rule already applies the brand font globally — do not duplicate.

### Contrast & accessibility

- Every text/surface combination must meet **WCAG AA** (4.5:1 for body, 3:1 for large text). Verify both themes.
- Focus rings (`--ring`) must remain visible on every surface in both themes.
- Status colors in dark mode use **lighter tints** (e.g. `#F87171` for destructive) for adequate contrast on dark backgrounds.

---

## Phase 2 — Core utilities & lib

### Outcome checklist

- `src/lib/utils.ts` exports a `cn()` helper.
- A variants pattern is defined for components with multiple visual variants.
- Shared types live in `src/types/`.

### `src/lib/utils.ts`

- Export `cn(...inputs: ClassValue[])` that composes `clsx(...)` and pipes the result through `tailwind-merge`.
- Export any small, framework-agnostic helpers used across components (e.g. `isExternal(href)`, `formatDate`, `formatNumber`).

### `src/lib/variants.ts` (optional but recommended)

- Define typed variant maps for components like `Button`, `Badge`, `Alert`, `Input` to avoid stringly-typed props.
- Pattern: an object literal mapping `variant` → Tailwind class string, plus a `size` map. Compose with `cn()` in the component.

### `src/types/`

- `User.ts` — shape of the mock user (`id`, `name`, `email`, `avatarUrl?`, `role`).
- `NavItem.ts` — shape of navigation entries (see Phase 5).
- `Toast.ts` — toast options if a thin wrapper is built around `vue-toastification`.

---

## Phase 3 — UI primitives (`src/components/ui/`)

### Outcome checklist

- Every primitive listed below exists, is typed, accessible, and respects the brand palette.
- Every primitive is documented in the UI Playground page (Phase 9).
- No primitive imports from `src/components/app/` or `src/pages/`.

### Universal rules for every primitive

- **`<script setup lang="ts">`** with `defineProps<Props>()` and `defineEmits<{...}>()`.
- **A11y**: correct `role`, `aria-*`, keyboard handling (Enter, Space, Esc, Arrow keys where applicable), visible focus ring using `--ring`.
- **States** for interactive elements: `default`, `hover`, `focus-visible`, `active`, `disabled`, `loading` (where relevant), `invalid` (form fields).
- **Sizes**: `sm | md | lg` where applicable; `md` is default.
- **Variants** for color: `primary | secondary | ghost | outline | destructive` where applicable; `primary` uses Sunrise Orange.
- **Slots**: provide a default slot plus named slots (`#leading`, `#trailing`, `#header`, `#footer`) where useful.
- **Events**: pass DOM events through (`@click`, `@input`, `@change`, `@focus`, `@blur`).
- **Theme-aware colors only**: every color must reference a CSS variable from Phase 1 (e.g. `bg-[var(--card)]`, `text-[var(--foreground)]`, `border-[var(--border)]`). **No raw HEX, no named Tailwind colors** (`bg-white`, `text-slate-900`, etc.) for theme-aware surfaces. This guarantees every primitive works in both light and dark without per-component overrides.
- **No `dark:` variant classes** in primitives — the variable swap handles dark mode automatically. `dark:` utilities are only acceptable for one-off illustrative artwork (e.g. an SVG that needs a hard-coded dark-only color).

### Primitive list with behavior spec

> Each primitive includes: **purpose**, **props**, **slots**, **emits**, **states/behavior**, **a11y**.

#### Accordion

- Purpose: vertically stacked, expandable sections.
- Props: `multiple?: boolean` (allow multiple panels open), `modelValue?: string | string[]`.
- Slots: default (one or more `AccordionItem`).
- Emits: `update:modelValue`.
- Behavior: clicking a header toggles its panel; smooth height animation; chevron rotates 180°.
- A11y: header is a `<button>` with `aria-expanded`, panel has `role="region"` and `aria-labelledby`.

#### Alert

- Purpose: inline status messaging.
- Props: `variant: 'info' | 'success' | 'warning' | 'destructive'`, `title?: string`, `dismissible?: boolean`.
- Slots: default (body), `#icon`, `#actions`.
- Emits: `dismiss`.
- Behavior: shows a leading lucide icon based on variant; close button when `dismissible`.
- A11y: `role="alert"` for `destructive`/`warning`, `role="status"` for `info`/`success`.

#### AlertDialog

- Purpose: modal that requires explicit user confirmation (destructive actions).
- Props: `open: boolean`, `title: string`, `description?: string`, `confirmText?: string`, `cancelText?: string`, `variant?: 'default' | 'destructive'`.
- Slots: `#description`, `#actions` (override default buttons).
- Emits: `update:open`, `confirm`, `cancel`.
- Behavior: traps focus, ESC cancels, click outside cancels, default focus on cancel button.
- A11y: `role="alertdialog"`, `aria-labelledby`, `aria-describedby`.

#### AspectRatio

- Purpose: maintain a fixed ratio container (e.g. media thumbnails).
- Props: `ratio?: number` (default `16/9`).
- Slots: default.
- Behavior: pure layout wrapper with padding-bottom trick or aspect-ratio CSS.

#### Avatar

- Purpose: user profile image with fallback initials.
- Props: `src?: string`, `alt: string`, `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'`, `fallback?: string` (initials), `status?: 'online' | 'offline' | 'away' | 'busy'`.
- Behavior: shows image; on error, renders initials on a Sunrise Orange tint background; optional status dot.
- A11y: `<img alt="...">`; decorative status dot has `aria-hidden`.

#### Badge

- Purpose: small status/label pill.
- Props: `variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline'`, `size?: 'sm' | 'md'`.
- Slots: default.
- Behavior: rounded full pill; uppercase optional.

#### Breadcrumb

- Purpose: navigation path display.
- Props: `items: { label: string; to?: string }[]`, `separator?: string` (default `/`).
- Slots: `#separator`, `#item`.
- Behavior: last item is current page (not a link); preceding items are router links.
- A11y: `<nav aria-label="Breadcrumb">`, current page has `aria-current="page"`.

#### Button

- Purpose: primary interactive element.
- Props: `variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'`, `size: 'sm' | 'md' | 'lg' | 'icon'`, `loading?: boolean`, `disabled?: boolean`, `as?: 'button' | 'a' | RouterLink`, `to?: RouteLocationRaw`, `type?: 'button' | 'submit' | 'reset'`.
- Slots: default, `#leading` (icon), `#trailing` (icon).
- Emits: `click`.
- Behavior: `loading` shows a spinner and disables interaction; renders as `<router-link>` when `to` is provided; full-width when used in forms via parent class.
- A11y: visible focus ring; `aria-busy` when loading; `aria-disabled` when disabled.

#### ButtonGroup

- Purpose: grouped buttons sharing borders.
- Props: `attached?: boolean`, `orientation?: 'horizontal' | 'vertical'`.
- Slots: default (multiple `Button`s).
- Behavior: removes border-radius on inner edges; merges adjacent borders.

#### Calendar

- Purpose: month/date grid used by `DatePicker`.
- Props: `modelValue?: Date | null`, `min?: Date`, `max?: Date`, `disabledDates?: (d: Date) => boolean`, `weekStartsOn?: 0 | 1`.
- Emits: `update:modelValue`.
- Behavior: keyboard navigation (Arrow keys move days, PageUp/Down move months); today highlighted; selected day uses Sunrise Orange.
- A11y: grid role, `aria-selected`, `aria-current="date"` for today.

#### Card

- Purpose: surface container for grouped content.
- Slots: `#header`, default (body), `#footer`.
- Props: `padded?: boolean` (default `true`), `bordered?: boolean` (default `true`).
- Behavior: white background, `--radius-md`, optional shadow on hover (configurable).

#### Carousel

- Purpose: horizontally scrollable slides.
- Props: `autoplay?: boolean`, `interval?: number`, `loop?: boolean`.
- Slots: default (slides), `#prev`, `#next`, `#indicators`.
- Behavior: arrow buttons to navigate; pagination dots; pause on hover when autoplay.
- A11y: `aria-roledescription="carousel"`, slides labeled.

#### Chart

- Purpose: thin wrapper for charts. v1 can be a placeholder shell that renders a fallback empty state until a chart lib is selected.
- Props: `type: 'line' | 'bar' | 'area' | 'pie'`, `data: unknown`, `options?: unknown`.
- Behavior: do **not** install a chart library yet; render `EmptyState` with a "Charts coming soon" message. Confirm package choice (e.g. `chart.js`, `apexcharts`) before installing.

#### Checkbox

- Props: `modelValue: boolean`, `indeterminate?: boolean`, `disabled?: boolean`, `label?: string`, `id?: string`.
- Emits: `update:modelValue`, `change`.
- Behavior: native `<input type="checkbox">` visually styled; checkmark uses Sunrise Orange.
- A11y: associated `<label for>`; `aria-checked="mixed"` for indeterminate.

#### Collapsible

- Purpose: lightweight show/hide region (no chrome).
- Props: `open: boolean`.
- Slots: `#trigger`, default (content).
- Emits: `update:open`.

#### Combobox

- Purpose: text input with filterable dropdown of options.
- Props: `modelValue`, `options: { label: string; value: string }[]`, `placeholder?`, `loading?`, `multiple?`.
- Emits: `update:modelValue`, `search`.
- Behavior: typing filters; ArrowDown opens; Enter selects highlighted; Esc closes.
- A11y: `role="combobox"`, `aria-expanded`, `aria-activedescendant`.

#### Command

- Purpose: command palette / quick search (⌘K style).
- Props: `open: boolean`, `groups: { heading: string; items: { label: string; shortcut?: string; onSelect: () => void }[] }[]`.
- Emits: `update:open`.
- Behavior: opens with global shortcut; arrow keys navigate; Enter selects; Esc closes.
- A11y: `role="dialog"` + inner `role="listbox"`.

#### ContextMenu

- Purpose: right-click menu.
- Props: items list (same shape as `DropdownMenu`).
- Behavior: triggered by `contextmenu` event on slot target; positioned at cursor.

#### DataTable

- Purpose: feature-rich table backed by `@tanstack/vue-table`.
- Props: `columns: ColumnDef<T>[]`, `data: T[]`, `pagination?: boolean`, `sorting?: boolean`, `filtering?: boolean`, `selection?: 'none' | 'single' | 'multi'`, `loading?: boolean`, `empty?: { title: string; description?: string }`.
- Slots: `#toolbar`, `#empty`, `#row-actions`.
- Emits: `selection-change`, `sort-change`, `page-change`.
- Behavior: client-side by default; server-mode prop (`manual`) bypasses internal sort/filter; shows `Skeleton` rows while `loading`.
- A11y: semantic `<table>`, sortable headers as `<button>`s with `aria-sort`.

#### DatePicker

- Purpose: input that opens `Calendar` in a `Popover`.
- Props: `modelValue?: Date | null`, `min?`, `max?`, `placeholder?`, `format?: string`.
- Emits: `update:modelValue`.

#### Dialog

- Purpose: generic modal.
- Props: `open: boolean`, `title?: string`, `description?: string`, `size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'`, `closeOnOverlay?: boolean` (default `true`), `closeOnEsc?: boolean` (default `true`).
- Slots: `#header`, default (body), `#footer`.
- Emits: `update:open`.
- Behavior: traps focus, restores focus on close, prevents background scroll.
- A11y: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`/`aria-describedby`.

#### Direction

- Purpose: provides LTR/RTL context to descendants via `provide/inject`.
- Props: `dir: 'ltr' | 'rtl'`.

#### Drawer

- Purpose: side-anchored panel, used for the mobile sidebar.
- Props: `open: boolean`, `side: 'left' | 'right' | 'top' | 'bottom'`, `size?: string`.
- Slots: `#header`, default, `#footer`.
- Emits: `update:open`.
- Behavior: overlay backdrop, slide-in transition, ESC closes, focus trap.

#### DropdownMenu

- Purpose: button-triggered menu.
- Props: `items?: MenuItem[]` (or use slots), `align?: 'start' | 'center' | 'end'`, `side?: 'top' | 'right' | 'bottom' | 'left'`.
- Slots: `#trigger`, default (menu items).
- Behavior: ArrowUp/Down moves focus; Enter selects; Esc closes; auto-flips on overflow.
- A11y: `role="menu"` / `role="menuitem"`.

#### Empty

- Purpose: empty-state placeholder for lists, tables, search.
- Props: `title: string`, `description?: string`, `icon?: Component`.
- Slots: `#actions`.

#### Field

- Purpose: form field wrapper that composes `Label`, control, helper text, and error.
- Props: `label?: string`, `description?: string`, `error?: string`, `required?: boolean`, `id?: string`.
- Slots: default (the actual input).
- Behavior: passes `id` and `aria-describedby` down via `provide`; renders error text in `--destructive`.

#### HoverCard

- Purpose: rich tooltip shown on hover with delay.
- Props: `openDelay?: number` (default `300`), `closeDelay?: number` (default `150`).
- Slots: `#trigger`, default (content).

#### Input

- Purpose: single-line text input.
- Props: `modelValue: string`, `type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'`, `placeholder?`, `disabled?`, `readonly?`, `invalid?: boolean`, `size?: 'sm' | 'md' | 'lg'`, `id?`, `autocomplete?`.
- Slots: `#leading`, `#trailing` (icon or button).
- Emits: `update:modelValue`, `input`, `change`, `focus`, `blur`.
- Behavior: focus ring uses `--ring`; `invalid` shows `--destructive` border; `password` type pairs with a visibility toggle in `#trailing`.

#### InputGroup

- Purpose: visually attached prefix/suffix around an `Input` (e.g. "https://" prefix, "@" suffix).
- Slots: `#prefix`, default, `#suffix`.

#### InputOTP

- Purpose: one-time-password segmented input.
- Props: `modelValue: string`, `length: number` (default `6`).
- Emits: `update:modelValue`, `complete`.
- Behavior: auto-advance, paste fills all boxes, backspace moves to previous box.

#### Item

- Purpose: generic list item used inside menus, command lists, navigation menus. Standardizes height, padding, hover, and focus styles.

#### Kbd

- Purpose: render keyboard shortcut hints (e.g. `⌘K`).

#### Label

- Purpose: form label.
- Props: `for: string`, `required?: boolean`.
- Behavior: required adds an asterisk in `--destructive`.

#### Menubar

- Purpose: horizontal menu bar (rarely used in admin; include for completeness).

#### NativeSelect

- Purpose: native `<select>` styled to match the theme. Use this for short, simple option lists; use `Select` for searchable/customized option lists.

#### NavigationMenu

- Purpose: horizontal navigation with optional mega-menu panels.

#### Pagination

- Purpose: page selector for tables/lists.
- Props: `page: number`, `pageSize: number`, `total: number`, `siblingCount?: number`.
- Emits: `update:page`, `update:pageSize`.
- Slots: `#info` (e.g. "Showing 1–10 of 42").
- A11y: `<nav aria-label="Pagination">`; current page button has `aria-current="page"`.

#### Popover

- Purpose: floating panel anchored to a trigger.
- Props: `open: boolean`, `align`, `side`, `offset?: number`.
- Slots: `#trigger`, default.
- Behavior: closes on outside click and Esc; auto-flips on overflow.

#### Progress

- Props: `value: number` (0–100), `indeterminate?: boolean`, `size?: 'sm' | 'md' | 'lg'`.
- Behavior: filled bar uses Sunrise Orange; indeterminate animates.
- A11y: `role="progressbar"`, `aria-valuenow/min/max`.

#### RadioGroup

- Props: `modelValue`, `options: { label, value }[]`, `name`, `orientation?: 'horizontal' | 'vertical'`.
- A11y: `role="radiogroup"`; arrow keys move selection.

#### Resizable

- Purpose: split panes with draggable handle (used in playgrounds, settings layouts).

#### ScrollArea

- Purpose: custom-styled scrollable region with thin scrollbars.

#### Select

- Purpose: custom dropdown select with search.
- Props: `modelValue`, `options`, `placeholder?`, `multiple?`, `searchable?`, `disabled?`, `invalid?`.
- Behavior: similar to `Combobox` but options are non-creatable.

#### Separator

- Purpose: thin divider line.
- Props: `orientation?: 'horizontal' | 'vertical'`, `decorative?: boolean`.
- A11y: `role="separator"` when not `decorative`.

#### Sheet

- Purpose: alias/wrapper for `Drawer` used in form contexts (e.g. side-panel forms).

#### Sidebar

- Purpose: low-level sidebar primitive (chrome and slots only). The composed nav lives in `SidebarNav` (Phase 4).
- Props: `collapsed: boolean`.
- Slots: `#header`, default (nav), `#footer`.
- Emits: `update:collapsed`.

#### Skeleton

- Purpose: shimmer placeholder shapes while content loads.
- Props: `as?: 'div' | 'span'`, plus arbitrary classes for shape.

#### Slider

- Props: `modelValue: number | [number, number]`, `min`, `max`, `step`, `disabled?`.
- Behavior: arrow keys adjust by `step`; supports range when value is a tuple.
- A11y: `role="slider"`, `aria-valuenow/min/max`.

#### Sonner

- Purpose: alternative toast surface. v1 will use `vue-toastification` (see `Toast`). `Sonner` is reserved for a future iteration; do not implement now.

#### Spinner

- Props: `size?: 'sm' | 'md' | 'lg'`, `label?: string` (visually hidden).
- A11y: `role="status"` with visually-hidden text.

#### Switch

- Props: `modelValue: boolean`, `disabled?`, `label?`.
- Emits: `update:modelValue`, `change`.
- Behavior: thumb slides; on-state uses Sunrise Orange; off-state uses `--muted`.
- A11y: `role="switch"`, `aria-checked`.

#### Table

- Purpose: low-level styled table primitive (`Table`, `THead`, `TBody`, `Tr`, `Th`, `Td`). `DataTable` composes these.

#### Tabs

- Props: `modelValue: string`, `orientation?: 'horizontal' | 'vertical'`.
- Slots: default (multiple `Tab` and `TabPanel`).
- Behavior: arrow keys move between tabs; Home/End jump to first/last.
- A11y: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`.

#### Textarea

- Props: `modelValue: string`, `rows?: number`, `autosize?: boolean`, `placeholder?`, `invalid?`, `disabled?`, `readonly?`.
- Behavior: auto-resize when `autosize` is true.

#### Toast

- Purpose: thin wrapper around `vue-toastification` that exposes a typed API.
- API: `useToast()` returns `success(msg, opts?)`, `error(msg, opts?)`, `info(msg, opts?)`, `warning(msg, opts?)`.
- Behavior: position bottom-right; auto-dismiss in 4s; pause on hover; Sunrise Orange for `info`-style brand toasts is allowed but not required.

#### Toggle

- Purpose: single on/off button (e.g. "bold" in a toolbar).
- Props: `modelValue: boolean`, `pressed?: boolean` (alias).
- A11y: `aria-pressed`.

#### ToggleGroup

- Purpose: group of `Toggle`s.
- Props: `modelValue: string | string[]`, `type: 'single' | 'multiple'`.

#### Tooltip

- Props: `content: string | Component`, `side?`, `delay?: number`.
- Slots: `#trigger`, `#content`.
- Behavior: shows on hover and focus; hides on Esc.
- A11y: trigger has `aria-describedby`.

#### Typography

- Purpose: a small set of typed components (`H1`, `H2`, `H3`, `P`, `Lead`, `Muted`, `Code`) wrapping consistent type styles. All map to brand fonts and `--foreground`/`--muted-foreground`.

---

## Phase 4 — App-level composed components (`src/components/app/`)

### Outcome checklist

- Each composed component reuses primitives from Phase 3.
- No composed component contains business logic — only presentation and orchestration.
- Each is fully typed.

### `AppLogo.vue`

- Purpose: brand mark for the topbar/sidebar.
- Props: `collapsed?: boolean`, `to?: RouteLocationRaw` (default `/admin/dashboard`).
- Behavior: shows a logomark + wordmark when expanded, logomark only when `collapsed`. Uses Sunrise Orange accent. Wraps in `<router-link>`.

### `SidebarNav.vue`

- Purpose: the admin sidebar navigation list.
- Props: `items: NavItem[]`, `collapsed: boolean`.
- Emits: `update:collapsed`, `navigate`.
- Behavior:
  - Renders a header row with `AppLogo` and a collapse toggle (a hamburger / chevron icon when collapsed, an "X" or chevron-left when expanded).
  - Each nav item renders icon + label; when `collapsed`, only the icon is visible and a `Tooltip` shows the label on hover.
  - Items with `children` render an expandable submenu (uses `Collapsible`).
  - Hovering an item changes its color to Sunrise Orange.
  - Active item (matched by route) shows a Sunrise Orange left indicator + tinted background.
  - Items whose `permission` does not match the current user are hidden.
  - On mobile, this component is rendered inside a `Drawer` (see `AdminLayout`).
- A11y: `<nav aria-label="Primary">`; submenus use `aria-expanded`.
- Add padding on all sides of nav items. 
- On collapse at the top should show the small logo only.

### `Topbar.vue`

- Purpose: the admin top navigation bar.
- Props: none required; uses Pinia stores.
- Slots: `#actions` (extra right-side actions).
- Behavior:
  - Left: hamburger (mobile only — opens the sidebar `Drawer`) + `Breadcrumbs`.
  - Right: notification icon (opens a `Popover` or `Dialog` with notifications), user `Avatar` that opens a `DropdownMenu` (Profile, Settings, Logout).
  - Logout calls `auth.logout()` and redirects to `/auth/login`.
- A11y: each icon button has `aria-label`.

### `Breadcrumbs.vue`

- Purpose: derive a breadcrumb trail from the current route.
- Props: `items?: { label: string; to?: string }[]` (optional override).
- Behavior: when `items` not provided, derive from `route.matched`, using each record's `meta.title` and path. Last item is current page (not a link). Wraps the `Breadcrumb` UI primitive.

### `PageHeader.vue`

- Purpose: standard page title block at the top of every admin page.
- Props: `title: string`, `description?: string`.
- Slots: `#actions`.
- Behavior: `H1` for title, muted paragraph for description, right-aligned actions slot (typically Buttons).

### `StatCard.vue`

- Purpose: dashboard metric card.
- Props: `label: string`, `value: string | number`, `delta?: { value: string; trend: 'up' | 'down' | 'flat' }`, `icon?: Component`.
- Behavior: renders large value, label, and a trend indicator (up = River Teal, down = `--destructive`).

### `ConfirmDialog.vue`

- Purpose: thin wrapper around `AlertDialog` for confirm flows.
- Props: `open`, `title`, `description?`, `confirmText?`, `cancelText?`, `variant?: 'default' | 'destructive'`.
- Emits: `update:open`, `confirm`.

### `EmptyState.vue`

- Purpose: page-level empty state. Wraps `Empty` with brand-aligned defaults and an optional CTA button.

### `NotificationsPanel.vue`

- Purpose: contents shown when the topbar bell is clicked.
- Props: `notifications: Notification[]`, `loading?: boolean`.
- Behavior: list of items with icon + title + time; "Mark all as read" action; empty state when none.
- v1 uses mock data from `src/stores/ui.ts` or a `notifications.ts` store.

### `UserMenu.vue`

- Purpose: contents shown when the topbar avatar is clicked.
- Behavior: shows the user's name + email at the top, then menu items: **Profile**, **Settings**, **Theme** (a submenu / inline `ThemeToggle` showing Light / Dark / System), **Logout**.
- The Theme entry shows the **currently active resolved theme** as a small icon (sun/moon) and a checkmark next to the selected option.

### `ThemeToggle.vue`

- Purpose: switch between light, dark, and system themes.
- Props: `variant?: 'icon' | 'segmented' | 'menu'` (default `'icon'`).
- Emits: none — writes directly to the `ui` store.
- Behavior:
  - `'icon'`: a single button that cycles `light → dark → system → light`. Shows a `Sun`, `Moon`, or `Monitor` lucide icon based on the **resolved** theme.
  - `'segmented'`: three pills (Light / Dark / System) used inside Settings → Appearance.
  - `'menu'`: a sub-menu used inside `UserMenu` (three radio items).
- A11y: `aria-label="Toggle theme"`; the `'segmented'` variant uses a radio group with `aria-label="Theme"`.
- The button transitions the chosen theme through `ui.setTheme(...)`.

---

## Phase 5 — Navigation config (single source of truth)

### Outcome checklist

- `src/lib/nav.ts` exports a typed `nav: NavItem[]`.
- The `SidebarNav` and `Breadcrumbs` derive entirely from it (or from router meta + this file).

### `NavItem` shape

- `label: string`
- `to: RouteLocationRaw` (or `href` for external)
- `icon: Component` (lucide-vue-next icon)
- `children?: NavItem[]`
- `permission?: string | string[]` (gated visibility)
- `featureFlag?: string`
- `badge?: { text: string; variant: BadgeVariant }`

### Source of truth rules

- The sidebar renders strictly from `nav.ts`.
- Breadcrumbs prefer `route.matched[i].meta.title`; fall back to label lookup in `nav.ts`.
- Adding a new admin page = add a route + a `nav.ts` entry. Nothing else.

---

## Phase 6 — Layout system

### Outcome checklist

- `src/layouts/AdminLayout.vue` and `src/layouts/AuthLayout.vue` exist.
- Admin routes are wrapped in `AdminLayout`. Auth routes are wrapped in `AuthLayout`.
- Sidebar collapse state and mobile drawer state live in `src/stores/ui.ts`.
- Layouts are responsive (mobile-first).

### `src/stores/ui.ts`

State:

- `sidebarCollapsed: Ref<boolean>` — persisted in `localStorage` under `sidebar-collapsed`.
- `mobileDrawerOpen: Ref<boolean>` — not persisted.
- `theme: Ref<'light' | 'dark' | 'system'>` — persisted in `localStorage` under `theme`. Default `'system'`.
- `systemPrefersDark: Ref<boolean>` — reactive mirror of `window.matchMedia('(prefers-color-scheme: dark)').matches`.

Getters:

- `resolvedTheme: ComputedRef<'light' | 'dark'>` — resolves `'system'` against `systemPrefersDark`. This is the value actually applied to `<html>`.

Actions:

- `toggleSidebar()`, `openMobileDrawer()`, `closeMobileDrawer()`.
- `setTheme(theme: 'light' | 'dark' | 'system')` — updates `theme`, writes to `localStorage`, and applies `data-theme` on `<html>`.
- `cycleTheme()` — convenience: `light → dark → system → light` (used by `ThemeToggle` in `'icon'` variant).
- `hydrateTheme()` — reads from `localStorage` (or falls back to `'system'`), wires up the `matchMedia` listener, and applies `data-theme` to `<html>`. Called from `main.ts` **before** Vue mounts.

Side effects:

- A `watch(resolvedTheme, ...)` in the store sets `document.documentElement.dataset.theme = resolvedTheme.value` whenever the resolved value changes.

### `src/layouts/AdminLayout.vue`

Structure (top-down):

1. **Sidebar** — fixed on the left for `md+`, becomes a `Drawer` for `< md`.
2. **Topbar** — fixed at the top, spans the area to the right of the sidebar.
3. **Main content** — `<router-view />` inside a scroll container; default padding `p-4 md:p-6`.
4. **Footer** — at the bottom of the main column.

#### Sidebar (admin)

- At the very top: `AppLogo` + product title.
- Below: `SidebarNav` rendering nav items from `nav.ts`. Each item is clickable and navigates via `router-link`.
- A collapse toggle is shown at the top-right of the sidebar; clicking it toggles `ui.sidebarCollapsed` with a smooth width animation.
- Collapsed state: width `~64px`, only icons visible; expanded state: width `~240–260px`, icons + labels.
- On hover, item text and icon transition to Sunrise Orange.
- Active item shows a Sunrise Orange left bar + tinted background.
- Mobile (`< md`): the sidebar is rendered inside a `Drawer` anchored to the left. The hamburger in the topbar opens it. Closes on overlay click, Esc, or when a nav link is clicked.

#### Topbar (admin)

- Left side:
  - Hamburger button (visible only on mobile) — opens the sidebar drawer.
  - `Breadcrumbs` — clickable; clicking a segment navigates to that route.
- Right side (action slot, in this order):
  - **`ThemeToggle`** (`variant="icon"`) — quick light/dark/system cycle. Icon updates to reflect the **resolved** theme.
  - **Notification icon** — clicking opens a panel (Popover on desktop, Dialog/Drawer on mobile) listing notifications. Shows an unread count badge.
  - **User menu** — `Avatar` button opens a `DropdownMenu` containing Profile, Settings, Theme submenu, and Logout.

#### Footer (admin)

- Left: copyright text (`© {year} {brand}. All rights reserved.`).
- Right: version text (read from `import.meta.env.VITE_APP_VERSION` or `package.json`).
- Single row, muted text, top border.

#### Main content (admin)

- Hosts the active page via `<router-view />`.
- Each page is expected to begin with a `PageHeader`.
- Scroll is contained to the main column; the topbar and sidebar do not scroll with the page.

### `src/layouts/AuthLayout.vue`

- Centered `Card` on a tinted background (Off-White Surface in light, Deep Night 950 in dark). All colors use Phase 1 tokens — no hard-coded HEX.
- Slots: default (the auth form page).
- Header: small bar with `AppLogo` on the left and a `ThemeToggle` (`variant="icon"`) on the right, so unauthenticated users can also pick a theme on the login screen.
- Footer: small bar with copyright text in `--muted-foreground`.
- No sidebar, no admin topbar.
- Optional decorative gradient/illustration must reference tokens (e.g. `from-[var(--primary)] to-[var(--secondary)]`) so it remains brand-consistent in dark mode.

---

## Phase 7 — Routing + mock auth

### Outcome checklist

- Routes exist for `/auth/*`, `/admin/*`, and `/404`.
- Route guard redirects unauthenticated users to `/auth/login`.
- Auth store persists session in `localStorage` and rehydrates on app init.

### Route map

Public (uses `AuthLayout`):

- `/auth/login` — Login
- `/auth/sign-up` — Sign up
- `/auth/forgot-password` — Forgot password
- `/auth/reset-password` — Reset password (accepts a `token` query)

Protected (uses `AdminLayout`, `meta: { requiresAuth: true }`):

- `/admin` → redirects to `/admin/dashboard`
- `/admin/dashboard`
- `/admin/users`
- `/admin/settings`
- `/admin/ui` (UI playground)

Catch-all:

- `/:pathMatch(.*)*` → 404 page (no layout, or a minimal layout). **No social login buttons here.**

Each route's `meta.title` is set so `Breadcrumbs` and `document.title` can read from it.

### `src/stores/auth.ts` (Pinia setup store)

State:

- `user: Ref<User | null>`
- `token: Ref<string | null>`

Getters:

- `isAuthenticated: ComputedRef<boolean>` — `!!token.value && !!user.value`

Actions:

- `login(credentials: { email: string; password: string; remember?: boolean })` — mock: validates against a hard-coded user; sets `user` + `token`; persists to `localStorage` if `remember`.
- `signUp(payload: { name: string; email: string; password: string })` — mock: stores the user in `localStorage`, then logs them in.
- `forgotPassword(email: string)` — mock: simulates network delay and resolves.
- `resetPassword(token: string, password: string)` — mock: simulates network delay and resolves.
- `logout()` — clears `user`, `token`, and any persisted state; redirects to `/auth/login`.
- `hydrate()` — reads `localStorage` on app init and restores session.

### Router guard pattern

- A single global `beforeEach` checks `to.meta.requiresAuth`:
  - If required and not authenticated → redirect to `/auth/login?redirect=<from>`.
  - If on an `/auth/*` route and already authenticated → redirect to `/admin/dashboard`.
- `hydrate()` runs in `main.ts` **before** mounting the app, alongside `ui.hydrateTheme()` so the correct theme is applied before the first paint.

### Boot sequence (`src/main.ts`)

1. Create the Vue app and Pinia.
2. Call `ui.hydrateTheme()` — sets `data-theme` on `<html>` from `localStorage` or `prefers-color-scheme`.
3. Call `auth.hydrate()` — restores the session from `localStorage`.
4. Install the router (which has the guard).
5. `app.mount('#app')`.

> A tiny inline script in `index.html` may also pre-set `data-theme` to avoid any flash before step 2 runs. If used, it must be the **only** place outside the `ui` store that touches `data-theme`.

---

## Phase 8 — Forms + real-time validation

### Outcome checklist

- Inputs show validation errors **while the user types** (after the field is `dirty` or after a submit attempt).
- Submit is disabled until the form is valid (or shows clear errors on submit).
- Errors are accessible (`aria-invalid`, `aria-describedby` linking to error text).
- Server/submit errors are shown via `Alert` at the top of the form **and** via a `Toast`.

### Validation UX rules (apply to both options)

- Validate on **input** for format constraints (email, min length, regex).
- Validate on **blur** for expensive checks (e.g. uniqueness, async).
- Keep messages short and actionable (e.g. "Password must be at least 8 characters").
- Visual states:
  - `invalid`: red border + helper text in `--destructive`
  - `valid`: subtle (no excessive green noise)
- On submit:
  - Focus the first invalid field.
  - Show a page-level `Alert` only for non-field errors (e.g. "Login failed").

### `vee-validate` + `zod` (**requires install confirmation**)

Why: strong TS typing, schema-driven validation, great real-time support (`validateOnInput`).

Packages to install (ask first):

- `vee-validate`
- `zod`
- optional: `@vee-validate/zod`

Pattern:

- Define a `zod` schema per form in the page or a colocated `schema.ts`.
- Wire the schema into a `useForm()` from `vee-validate`.
- Use `validateOnInput: true` for real-time errors.
- Bind field state to `Field` UI primitive via `meta.touched` + `errorMessage`.

## Phase 9 — Starter pages

### Outcome checklist

- Every primitive and composed component has at least one usage in the playground.
- Auth pages are functional with mock auth and validation.
- Admin pages demonstrate real data flows (mock data is fine).

### Auth pages (`src/pages/auth/`)

> All auth pages share `AuthLayout`. None of them show navigation chrome.

#### `LoginPage.vue` — `/auth/login`

- Fields: `email` (required, email format), `password` (required, min 8).
- Controls: `Checkbox` "Remember me", `Button` (primary) "Sign in".
- Links: "Forgot password?" → `/auth/forgot-password`. "Don't have an account? Sign up" → `/auth/sign-up`.
- Bottom: social login buttons (Google, GitHub) — visual only in v1, no real OAuth.
- Behavior: on submit, calls `auth.login(...)`. On success → redirect to `?redirect` query or `/admin/dashboard`. On failure → `Alert` + `Toast`.

#### `SignUpPage.vue` — `/auth/sign-up`

- Fields: `name` (required), `email` (required, email), `password` (required, min 8 + strength meter).
- Controls: `Button` "Create account".
- Bottom: social login buttons (visual only).
- Behavior: on success → redirect to `/admin/dashboard`.

#### `ForgotPasswordPage.vue` — `/auth/forgot-password`

- Fields: `email` (required, email).
- Controls: `Button` "Send reset link".
- Bottom: social login buttons (visual only).
- Behavior: on success → show success `Alert` ("Check your email") and disable the button.

#### `ResetPasswordPage.vue` — `/auth/reset-password`

- Fields: `password` (required, min 8), `confirmPassword` (required, must match `password`).
- Controls: `Button` "Reset password".
- Bottom: social login buttons (visual only).
- Behavior: reads `token` from query; on success → redirect to `/auth/login`.

### Error pages (`src/pages/errors/`)

#### `NotFoundPage.vue` — `/:pathMatch(.*)*`

- Big "404" headline, short message, and a `Button` "Back to home" → `/admin/dashboard` (or `/auth/login` if not authed).
- **No social login buttons.** No sidebar/topbar.

### Admin pages (`src/pages/admin/`)

#### `DashboardPage.vue` — `/admin/dashboard`

- `PageHeader` with title "Dashboard".
- Grid of `StatCard`s (4 cards): users, revenue, orders, conversion.
- A "Recent activity" `Card` containing a `Table` of mock activity rows.
- A two-column section: a `Chart` placeholder + a "Top users" mini-list.

#### `UsersPage.vue` — `/admin/users`

- `PageHeader` with title "Users" and a primary `Button` "Add user" in the actions slot.
- `DataTable` with columns: avatar+name, email, role (`Badge`), status (`Switch`), created (date), actions (DropdownMenu: Edit, Delete).
- Toolbar above the table: search `Input`, role `Select` filter.
- "Add user" / "Edit user" open the same `Dialog` with a validated form.
- "Delete" opens `ConfirmDialog`.
- All mutations show success/error `Toast`s.

#### `SettingsPage.vue` — `/admin/settings`

- `Tabs`: Profile, Account, Notifications, Appearance.
- Profile tab: avatar upload (mock), name, email, bio (`Textarea`), Save button.
- Notifications tab: list of `Switch` rows.
- **Appearance tab**:
  - **Theme** — `ThemeToggle` (`variant="segmented"`) with three options: Light, Dark, System. Selecting an option calls `ui.setTheme(...)` and the change is immediate (no separate Save).
  - A small live preview `Card` showing how surface, text, and primary button look in the chosen theme.
  - (Reserved) **Density**, **Sidebar default state**, **Reduce motion** — list as future settings; not implemented in v1.
- Each save shows a `Toast`.

#### `UiPlaygroundPage.vue` — `/admin/ui`

- Shows every UI primitive in every variant/state.
- Grouped sections (Forms, Feedback, Overlays, Data Display, Navigation, Misc).
- Used as a living style guide and regression check.
- Includes a sticky `ThemeToggle` (`variant="segmented"`) at the top so reviewers can flip themes and visually verify every primitive in both modes without leaving the page.

---

## Phase 10 — Quality gates

### Outcome checklist

- Type-check passes: `npm run type-check`.
- Build passes: `npm run build`.
- Unit tests pass: `npm run test:unit`.
- Lint passes (if a linter is later added).

### Minimum test coverage

- Router guard: redirect when unauthenticated; allow when authenticated; redirect away from auth pages when authenticated.
- Auth store: `hydrate`, `login`, `logout` happy paths and persistence.
- UI store theme: `setTheme('dark')` writes `data-theme="dark"` to `<html>` and persists; `setTheme('system')` follows `matchMedia`; `hydrateTheme()` restores the saved choice.
- One sidebar behavior test (collapse/expand state, active item highlighting).
- One form composable test (`useField` real-time validation + `dirty`/`touched` flags).

### Manual QA checklist

- Keyboard-only navigation across the entire admin layout works.
- Focus is visible everywhere (`--ring`) **in both themes**.
- All dialogs trap focus and restore on close.
- Mobile drawer works on a real touch device or emulator.
- Sidebar collapse persists across reloads.
- Logged-out users hitting `/admin/*` are redirected.
- **Theme**: every page (auth + admin + 404 + UI playground) renders correctly in light, dark, and system modes.
- **Theme persistence**: refreshing the page keeps the chosen theme; no flash of the wrong theme on first paint.
- **System theme**: setting OS to dark while app is on `'system'` flips the UI without a reload.
- **Contrast**: spot-check key surfaces (cards, inputs, buttons, sidebar active item, status alerts) with a WCAG contrast checker in both themes.

---

## Appendix — Notes

- All UI primitives are first-party Vue components styled with Tailwind. No headless-UI library is used.
- Any new package install requires explicit confirmation from the user.
- **Both light and dark themes are first-class** in v1 (see Phase 1). i18n and real backend integration remain out of scope for v1.
- This document is the single source of truth for the build. When a phase changes, update this file in the same PR.
