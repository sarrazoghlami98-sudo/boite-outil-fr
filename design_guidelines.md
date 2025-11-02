# Design Guidelines: Ma Boite a outil

## Design Approach
**Educational Application** - Reference-based approach drawing from kid-friendly learning platforms (Khan Academy Kids, Duolingo Kids) with a focus on playful, accessible French grammar instruction for 6th-grade students.

## Core Design Principles
- **Uniform & Predictable**: Same-size elements create visual stability for young learners
- **Playful & Friendly**: Kid-appropriate color palette and illustrations that make grammar fun
- **Interactive Learning**: Visual feedback and clear affordances for clickable elements
- **Accessibility-First**: Clear focus states, keyboard navigation, high contrast

---

## Layout System

### Spacing
Use Tailwind spacing units: **2, 4, 6, 8, 12, 16, 20, 24** for consistent rhythm
- Small gaps/padding: 2, 4
- Component spacing: 6, 8, 12
- Section spacing: 16, 20, 24

### Responsive Grid
- Mobile: 2 columns
- Tablet (md): 3 columns  
- Desktop (lg): 4 columns

---

## Typography

### Font Families
- **Primary**: Poppins or Quicksand (friendly, rounded sans-serif via Google Fonts)
- **Secondary**: Open Sans (readable body text)

### Hierarchy
- **Category Tiles**: 
  - Title: font-bold text-lg md:text-xl
  - Same size regardless of text length (text wraps, tile doesn't resize)
- **Flashcard Content**:
  - Rule heading: text-2xl font-bold
  - Examples: text-lg leading-relaxed
  - Hints/bubbles: text-sm
- **Interactive Elements**:
  - Buttons: text-base font-semibold
  - Legend text: text-xs

---

## Component Library

### 1. Home Page - Category Tiles
**Critical Requirements**:
- Identical dimensions at all breakpoints (e.g., h-40 w-full on mobile, h-48 on desktop)
- Same padding (p-6), border radius (rounded-xl), typography scale
- Each tile uses distinct color from a vibrant palette:
  - Conjugaison: Blue (#3B82F6)
  - Homophones: Purple (#A855F7)
  - Orthographe: Green (#10B981)
  - Grammaire: Orange (#F97316)
  - Accords: Pink (#EC4899)
  - Ponctuation: Teal (#14B8A6)
  - Vocabulaire: Indigo (#6366F1)
  - Types de phrases: Red (#EF4444)
- Centered text, no icons inside tiles
- Subtle shadow (shadow-lg) with hover lift effect (hover:shadow-xl transform hover:-translate-y-1)

### 2. Flashcard Modal
**Layout**:
- Covers 90% of viewport (fixed positioning with backdrop)
- Header bar: Fixed at top with close button (X) and navigation arrows (← →)
- Content area: Scrollable with generous padding (p-8 md:p-12)
- Footer: Fixed with progress indicator "N/total" and completion checkmarks

**Card Structure** (stacked vertically):
1. **Rule Section**: Rounded container (bg-blue-50, p-6, rounded-lg) with bold heading + concise explanation
2. **Examples Section**: 2-4 illustrated examples, each in own card (bg-white, p-4, rounded-lg, shadow-md, mb-4)
3. **Audio Controls**: Sticky bottom bar with play/pause icon button + speed selector pills (0.8× / 1× / 1.2×)
4. **Practice Section**: Interactive quiz area with instant feedback (green checkmark or red X)

### 3. Word Replacement Feature
**Visual Treatment**:
- Underlined words: `border-b-2 border-dotted` with 2px offset from text
- Color-coded by grammar category:
  - Verbe: Green (#10B981)
  - Déterminant: Orange (#F97316)
  - Pronom: Blue (#3B82F6)
  - Conjonction: Red (#EF4444)
  - Adverbe: Yellow (#FBBF24)
  - Préposition: Purple (#A855F7)
- Hover state: `cursor-pointer opacity-80`
- Active (swapped) state: Yellow highlight background (#FEF3C7), bold text
- Hint bubble: Small rounded popup (bg-white, shadow-lg, text-xs, p-2) with checkmark icon

**Interaction Flow**:
- Click underlined word → Replacement appears with yellow highlight + hint bubble
- "Revenir à la phrase" button (text-sm, text-blue-600, underline) restores original
- Legend below each card: Small gray text with example underline

### 4. Interactive Practice Elements
**Multiple Choice**:
- Large clickable options (p-4, rounded-lg, border-2, hover:border-blue-500)
- Selected: bg-blue-50, border-blue-500
- Correct: bg-green-100, border-green-500 with checkmark
- Incorrect: bg-red-100, border-red-500 with X

**Fill-in-the-Blank**:
- Input fields: Rounded (rounded-md), large padding (px-4 py-3), border-2
- Focus state: ring-2 ring-blue-500

**Drag-and-Drop**:
- Draggable items: Pill-shaped (rounded-full), shadow, grabbable cursor
- Drop zones: Dashed border, bg-gray-50, rounded-lg
- Successful drop: Green border pulse animation

### 5. Navigation & Controls
**Keyboard Shortcuts** (displayed in small badge):
- Esc: Close modal
- ← →: Navigate cards
- Space: Toggle audio

**Focus Styles**: 
- All interactive elements: `ring-2 ring-offset-2 ring-blue-500` on focus
- High contrast, 3px thick outlines

---

## Images

### Required Illustrations (24+ total)
**Style**: Flat design, colorful, cartoon-style kid-friendly illustrations
**Placement**:
1. **Category Tiles**: Optional small icon in top-right corner (32x32px)
2. **Flashcard Examples**: 1-2 illustrations per example sentence (200x150px, rounded-lg)
3. **Practice Activities**: Visual aids for context (150x150px)

**Image Guidelines**:
- Alt text mandatory for every image
- Illustrations show diverse kids (various skin tones, hairstyles)
- Grammar concepts visualized (e.g., verb tenses with timeline, homophones with side-by-side comparisons)
- Optimized SVG or WebP format

**No Large Hero**: This is a learning tool, not a marketing page - go directly to category tiles

---

## Animations
**Minimal & Purposeful**:
- Modal enter/exit: Fade + scale (200ms ease-out)
- Tile hover: Subtle lift (transform translateY -4px, 150ms)
- Word swap: Highlight fade-in (300ms)
- Quiz feedback: Checkmark/X scale pop (200ms cubic-bezier)
- Page transitions: None (instant loading priority)

---

## Accessibility
- WCAG AA contrast (4.5:1 minimum)
- Focus visible on all interactive elements
- Screen reader labels for icons
- Reduced motion respected (`prefers-reduced-motion`)
- Keyboard navigation complete (no mouse-only interactions)
- Touch targets minimum 44x44px