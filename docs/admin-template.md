# Vue + Tailwind Admin Template (Phased Build Doc)

This document is the implementation roadmap for turning this project into a **full-featured admin template** built with:

- Vue 3 (`<script setup lang="ts">`)
- Vite + TypeScript
- TailwindCSS (already installed)
- Pinia (already installed)
- Vue Router (already installed)
- lucide/vue icons (already installed)

## Non-negotiables

- **Composition API `<script setup>` only** for all new `.vue` code.
- **TypeScript everywhere** (stores, composables, UI configs, pages).
- **Reusable components first** (primitives + composed components).
- **Real-time input validation** (field-level errors as the user types).
- **No extra package installs without confirmation** (call out explicitly when needed).

## Brand palette (must be applied)

- **Deep night** `#1B3A4B` — primary dark (navbar, sidebar, footer)
- **Sunrise Orange** `#E8894A` — brand primary (CTA, logo, primary button)
- **River teal** `#2E9E8F` — secondary/success/links
- **Kuasha Mist** `#FDF4EC` — primary light (background, cards)

## Target UX (default)

- **Sidebar + Topbar layout** with responsive mobile drawer.
- **Mock auth** (Pinia + localStorage) with **route guards** (no backend).

## Phase 0 — Project structure & conventions

### Outcome checklist

- Standard folders exist for UI primitives, composed components, layouts, pages, stores, types.
- Imports use `@/` consistently (already configured in `vite.config.ts` and `tsconfig.app.json`).

### Create folder structure

Create these directories:

- `src/components/ui/` (hand-built reusable UI primitives)
- `src/components/app/` (template-specific composed components)
- `src/layouts/` (Admin layout)
- `src/pages/` (route pages)
- `src/composables/` (shared Vue composables)
- `src/lib/` (utilities such as `cn`, variants, constants)
- `src/types/` (shared TS types)

### Naming conventions

- Files: `PascalCase.vue` for components, `camelCase.ts` for utilities/composables.
- Components:
  - UI primitives: `src/components/ui/*`
  - composed components: `src/components/app/*`
- Stores: `src/stores/<name>.ts` using Pinia setup stores (`defineStore(..., () => {})`).

## Phase 1 — UI component system foundation (Tailwind-only)

### Outcome checklist

- `src/lib/utils.ts` exposes a `cn()` helper for class merging.
- Variant patterns exist for components (e.g. `Button` variants and sizes).
- UI primitives live under `src/components/ui/` and are framework-native Vue components.

### Recommended utilities (already installed in this repo)

- `clsx` + `tailwind-merge` via a `cn()` helper in `src/lib/utils.ts`
- `class-variance-authority` (CVA) for typed variant props (e.g. `variant="primary" size="sm"`)

## Phase 2 — Theme tokens (Tailwind + CSS variables) using your palette

### Outcome checklist

- Global CSS variables exist for background/card/primary/secondary/etc.
- Components can use semantic utility classes consistently (e.g. `bg-[var(--background)]`, `text-[var(--foreground)]`, or custom Tailwind theme keys if you choose to define them).
- Deep night / Sunrise Orange / River teal / Kuasha Mist appear in layout surfaces and CTAs.

### Where to implement

- Add theme variables into `src/style.css` (preferred since it’s already global).
- Keep the font-face section intact.

### Token mapping (guidance)

You will set:

- `--background` / `--card` → Kuasha Mist (light surfaces)
- `--primary` → Sunrise Orange (CTA/button)
- `--secondary` (or `--accent`) → River teal
- Sidebar/topbar/footer surfaces: use dedicated tokens like `--sidebar`/`--topbar` or map to `--muted`/custom tokens
- `--foreground` should be readable on Kuasha Mist

Use a HEX→OKLCH/HSL converter only if you choose to store tokens in those formats; otherwise store HEX directly as CSS variables and reference via Tailwind arbitrary values.

## Phase 3 — Layout system (Sidebar + Topbar)

### Outcome checklist

- `src/layouts/AdminLayout.vue` exists and is used by `/admin/*` routes.
- Sidebar supports collapse/expand.
- Topbar supports breadcrumb + action slot.
- Mobile: sidebar becomes a drawer (Sheet/Drawer pattern).

### Layout building blocks (recommended)

UI primitives (hand-built):

- `Drawer` (mobile sidebar)
- `DropdownMenu` (user menu)
- `Separator`
- `Button`

App components (composed):

- `src/components/app/SidebarNav.vue` (driven by typed nav config)
- `src/components/app/Topbar.vue`
- `src/components/app/Breadcrumbs.vue`

### Navigation config (single source of truth)

Create a typed config in `src/lib/nav.ts`:

- Each item: `label`, `to`, `icon`, optional `children`, optional `permission`/feature flags
- Sidebar renders from this config
- Breadcrumbs derive from router matched records or from config

## Phase 4 — Routing + mock auth (Pinia + Vue Router)

### Outcome checklist

- Routes exist for `/auth/login` and `/admin/*`.
- Route guard redirects to login when not authenticated.
- Auth store persists session in localStorage.

### Recommended route layout

- `/auth/login` — public
- `/admin` — redirects to `/admin/dashboard`
- `/admin/dashboard` — protected
- `/admin/users` — protected
- `/admin/settings` — protected
- `/admin/ui` — protected (UI playground)

### Auth store requirements

Create `src/stores/auth.ts`:

- `user: Ref<User | null>`
- `isAuthenticated: ComputedRef<boolean>`
- `login(credentials)` → sets user + token (mock)
- `logout()` → clears
- `hydrate()` → reads localStorage on app init

### Router guard pattern

Use route `meta`:

- `meta: { requiresAuth: true }` for protected routes
- Global `beforeEach` checks auth store

## Phase 5 — Reusable component inventory (what to build first)

### Outcome checklist

- `src/components/ui/*` includes core primitives used across the template.
- `src/components/app/*` composes primitives into admin-specific patterns.

### “Must-have” UI primitives (Tailwind-only)

Build these first under `src/components/ui/`:

- `Accordion`
- `Alert`
- `AlertDialog`
- `AspectRatio`
- `Avatar`
- `Badge`
- `Breadcrumb`
- `Button`
- `ButtonGroup`
- `Calendar`
- `Card`
- `Carousel`
- `Chart`
- `Checkbox`
- `Collapsible`
- `Combobox`
- `Command`
- `ContextMenu`
- `DataTable`
- `DatePicker`
- `Dialog`  
- `Direction`
- `Drawer`
- `DropdownMenu`
- `Empty`
- `Field`
- `HoverCard`
- `Input`
- `InputGroup`
- `InputOTP`
- `Item`
- `Kbd`
- `Label`
- `Menubar`
- `NativeSelect`
- `NavigationMenu`
- `Pagination`  
- `Popover`
- `Progress`
- `RadioGroup`
- `Resizable`
- `ScrollArea`
- `Select`
- `Separator`
- `Sheet`
- `Sidebar`
- `Skeleton`
- `Slider`
- `Sonner`
- `Spinner`
- `Switch`
- `Table`
- `Tabs`
- `Textarea`
- `Toast`
- `Toggle`
- `ToggleGroup`
- `Tooltip`
- `Typography`

For table use `@tanstack/vue-table` package

(only if you want a component wrapper around validation state)

### Toasts
use `vue-toastification` package for toasts

### App-level composed components (reusable)

Create these in `src/components/app/`:

- `AppLogo.vue` (brand mark; Sunrise Orange accents)
- `PageHeader.vue` (title/description/actions)
- `StatCard.vue` (dashboard metric card)
- `ConfirmDialog.vue` (wrapper around Dialog)
- `EmptyState.vue`

## Phase 6 — Forms + real-time validation (two approaches)

### Outcome checklist

- Inputs show validation errors while typing.
- Submit disabled until valid (or shows clear errors on submit).
- Errors are accessible (aria, semantics where applicable).
- Server/submit errors shown via Alert + toast.

### Validation UX rules (apply to both options)

- Show errors **as the user types** once a field is `dirty`, or immediately if the field was previously submitted.
- Prefer validating on **input** for format constraints (email, min length) and on **blur** for expensive checks.
- Keep messages short and actionable (e.g. “Password must be at least 8 characters”).
- Inputs should visually reflect state:
  - invalid: red border + helper text
  - valid: optional subtle state (don’t over-noise)
- On submit:
  - focus the first invalid field
  - show a page-level `Alert` only for non-field errors (e.g. “Login failed”)

### Option A (recommended) — `vee-validate` + `zod` (**requires install confirmation**)

Why:

- Strong TS typing
- Schema-driven validation
- Great “validate as you type” support (`validateOnInput`)

Packages (ask for confirmation before installing):

- `vee-validate`
- `zod`
- optional: `@vee-validate/zod`

Doc pattern:

- Define `zod` schema per form
- Wire into `vee-validate` form + field components/composables
- Use `validateOnInput: true` for real-time errors

### Option B (no new deps) — composable validators

Why:

- No new dependencies
- Fully controllable

Doc pattern:

- `useField<T>(initialValue, rules)` composable that tracks:
  - `value`, `error`, `touched`, `dirty`, `valid`
- Validate on:
  - `watch(value)` for realtime feedback
  - `blur` to set touched
- Central `useForm()` that aggregates field states and blocks submit

#### Minimal API shape (recommended)

Create:

- `src/composables/useField.ts`
- `src/composables/useForm.ts`

`useField<T>()` should expose:

- `value: Ref<T>`
- `error: ComputedRef<string | null>`
- `valid: ComputedRef<boolean>`
- `dirty: Ref<boolean>`
- `touched: Ref<boolean>`
- `onBlur(): void`
- `validate(): boolean`

`useForm()` should expose:

- `isSubmitting: Ref<boolean>`
- `submitted: Ref<boolean>`
- `valid: ComputedRef<boolean>`
- `validateAll(): boolean` (sets `submitted` true, validates all fields)

Rules should be typed and composable:

- `required(message?)`
- `minLength(n, message?)`
- `email(message?)`

Real-time validation wiring:

- `watch(value, () => { if (dirty.value || submitted.value) validate() })`

## Phase 7 — Starter admin pages (minimal but real)

### Outcome checklist

- Pages demonstrate all primitives and composed components.
- Users page includes create/edit flows with validation + toast feedback.

Pages (`src/pages/`):

- `auth/LoginPage.vue`
- `admin/DashboardPage.vue`
- `admin/UsersPage.vue`
- `admin/SettingsPage.vue`
- `admin/UiPlaygroundPage.vue`

Suggested page capabilities:

- **Dashboard**: stat cards + “recent activity” table (static/mock data)
- **Users**: table + search + add/edit dialog; form validation on fields
- **Settings**: profile form + toggles (Switch) + save toast
- **UI Playground**: showcase each UI primitive + states

## Phase 8 — Quality gates

### Outcome checklist

- Type-check passes: `npm run type-check`
- Unit tests pass: `npm run test:unit`

### Minimum test coverage (recommended)

- Router guard redirect behavior
- Auth store hydrate/login/logout
- One component snapshot/behavior test (e.g., Sidebar collapse)

## Appendix — Notes

- All UI primitives are implemented as first-party Vue components styled with Tailwind.
