# Security System Builder

A high-fidelity, highly interactive prototype of a dynamic security system bundle builder.

## Getting Started

1. **Install dependencies:**

   ```bash [yarn]
   yarn install
   ```

2. **Environment Setup:**
   Create a `.env` file in the root directory of the project to configure the local API backend:

   ```env
   API_PORT=3000
   API_URL=http://localhost:3000
   ```

3. **Run the application:**
   Start the local development server (this boots up both the Vite frontend and the Express backend).

   ```bash [yarn]
   yarn dev
   ```

## Tech Stack

- **React 19:** Frontend UI framework leveraging the new React Compiler for automatic memoization and optimization.
- **Vite:** Lightning-fast build tool and development server.
- **TypeScript:** End-to-end type safety for a robust, refactorable codebase.
- **Tailwind CSS v4:** Utility-first styling for rapid, highly-customizable UI development.
- **Base UI:** Unstyled, headless UI primitives used for complex, accessible interactive components (Accordions, NumberFields).
- **Express / Node.js:** Lightweight backend serving the local JSON mock API.
- **ESLint & Prettier:** Strictly enforced linting and formatting rules to maintain code quality and consistency across the project.

## Architecture & Trade-offs

**1. Framework & Infrastructure**
_Tradeoff:_ Using a full Next.js stack with a database vs. a Vite SPA with a mock API.
_Decision:_ We opted for Vite + React + TypeScript for the frontend, and abandoned a traditional database in favor of a lightweight Node/Express REST API.
_Reasoning:_ The challenge explicitly focuses on frontend UI fidelity and complex state synchronization. A full database introduces unnecessary setup overhead and risk. Building a dedicated Express server perfectly satisfies the requirement of fetching from a real API without over-engineering the data layer.

**2. State Management**
_Tradeoff:_ Using a global state library (like Zustand or Redux) vs. Native React hooks.
_Decision:_ I deliberately chose native React hooks (`useSyncExternalStore`) rather than introducing a global state library.
_Reasoning:_ I specifically chose to rely entirely on native React hooks to demonstrate my ability to architect complex state systems from scratch without leaning on unnecessary third-party dependencies, as the website is also a single page not needing all the complexities of zustand and other complex state management libraries. I utilized `useSyncExternalStore` instead of the standard `useContext` API to completely eliminate React Context's blanket re-rendering behavior. By normalizing the cart state into a flat array, `useSyncExternalStore` allows individual UI components to subscribe strictly to their own specific variant's primitive integer. Furthermore, bridging our `localStorage` cart persistence directly with `useSyncExternalStore` guarantees that the UI stays perfectly in sync with the storage layer without any race conditions or hydration mismatch errors. However, if this application were to scale into a larger e-commerce platform, I would migrate to Zustand to utilize its built-in persist middleware.

**3. Performance & Memoization**
_Tradeoff:_ Manually optimizing re-renders with `useMemo` and `useCallback` vs. adopting react compiler.
_Decision:_ We chose to use the React 19 Compiler.
_Reasoning:_ Since this is a cart application with heavy derived state, manual memoization clutters the codebase. Utilizing the React Compiler proves knowledge of the bleeding-edge React 19 ecosystem, keeps component files exceptionally clean, and handles granular re-renders automatically at build time.

**4. UI Library Integration**
_Tradeoff:_ Building complex accessible components from scratch vs. using a headless library.
_Decision:_ We adopted a hybrid approach. We used Base UI for complex interactive elements (the Accordion and the Variant RadioGroup), but stuck to Native HTML Elements for simpler primitives (the Button and Product Card).
_Reasoning:_ Base UI handles the complex ARIA attributes and keyboard roving focus required for accordions and radio groups. However, wrapping a native `<button>` in a headless library when it is already natively accessible just adds unnecessary bundle bloat. This demonstrates a mature understanding of when not to use a tool.

**5. Component Architecture (The Builder)**
_Tradeoff:_ Using Render Props vs. Compound Components for the multi-step Accordion.
_Decision:_ We chose the Compound Component pattern (`<BuilderAccordion>` wrapping `<BuilderStep>`), driven dynamically by a `STEP_CONFIG` mapping object.
_Reasoning:_ This inversion of control prevents massive switch statements inside the accordion. It allows the layout logic (e.g., passing `grid-cols-2` vs. `grid-cols-1`) to live independently of the data payload, making the UI incredibly scalable if the design team adds a fifth step later.

**6. Data Modeling**
_Tradeoff:_ Using a flat array of products vs. categorizing by step and variant.
_Decision:_ We designed a grouped JSON schema where products are categorized (e.g., cameras, sensors), and variants are strictly typed with individual IDs.
_Reasoning:_ Tracking quantity at the variant level rather than the product level prevents cart bugs (e.g., differentiating between 1 White Camera and 1 Black Camera). Categorizing the data payload prevents expensive `.filter()` operations on the frontend and makes grouping items in the Review Panel automatic.

## Developer Notes

- **Mathematical Integrity:** Noticed mathematical inconsistencies in the Figma mockup's review panel totals. I architected the application to calculate mathematically accurate totals based on the unit prices defined in the JSON schema rather than hardcoding the mockup's placeholder numbers.
- **Timeline & Execution:** Please note that while it has been 7 days since I received the initial email for this challenge, I was only able to dedicate the last 3 days to actively architecting and building this codebase due to schedule conflicts with my current full-time role.
