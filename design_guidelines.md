# Design Guidelines for Box Logo Application

## Design Approach
**Reference-Based Approach**: Modern SaaS aesthetic combining Stripe's clean professionalism with Linear's bold typography and subtle motion. The box motif from the logo will inform geometric patterns and structured layouts.

## Color System
- **Primary Orange** (#FF6B35 range): CTAs, active states, key highlights
- **Teal** (#00B4B4 range): Secondary actions, success states, accents
- **Dark Blue** (#1A2B4A range): Primary text, navigation, headers
- **Supporting Palette**: 
  - Soft cream/off-white (#FAFAF8) for backgrounds
  - Light gray (#F4F5F7) for secondary surfaces
  - Darker blue (#0F1823) for footers/emphasis

## Typography
- **Headings**: Inter Bold (64px hero, 48px H1, 32px H2, 24px H3)
- **Body**: Inter Regular (18px base, 16px secondary)
- **Monospace**: JetBrains Mono for code/technical elements
- **Line Height**: 1.5 for body, 1.2 for headings

## Layout System
**Spacing**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32 for consistent rhythm
**Container**: max-w-7xl centered, px-6 on mobile, px-8 on desktop
**Section Padding**: py-16 mobile, py-24 desktop

## Core Components

**Navigation**: Dark blue background, logo left, links center, orange CTA button right. Subtle box-shadow separator.

**Hero Section**: Full-width with large background image showing professional workspace/technology context. Overlay gradient (dark blue to transparent). White heading (64px), teal subheading (24px), orange primary CTA with backdrop-blur-lg background, secondary teal-outlined CTA. Include trust indicators below CTAs (client logos, user count).

**Feature Cards**: 3-column grid on desktop. White backgrounds with orange top border (4px). Teal icon containers (rounded-xl, 56px). Dark blue headings, gray body text. Hover: subtle lift shadow, orange accent brightens.

**Statistics Section**: Dark blue background with geometric box pattern overlay (subtle). 4-column grid. Large orange numbers (56px bold), teal labels below. Center-aligned.

**Testimonial Carousel**: Offset grid layout. Testimonial cards: white background, subtle shadow, teal quote marks, customer photo (circular, 64px), orange star ratings, dark blue text. Navigation dots: teal active, gray inactive.

**CTA Section**: Full-width teal gradient background. Large white heading, orange button with backdrop-blur-lg, box-pattern decoration elements in corners.

**Footer**: Dark blue background with box-grid pattern. 4-column layout: logo/description, product links, company links, social icons (orange hover states). Bottom bar with copyright in lighter blue text.

## Images

**Hero Image**: Professional technology workspace - modern office setup, monitors displaying dashboards, clean desk with natural lighting. Overlay: linear gradient dark blue (60% opacity) to transparent. Dimensions: 1920x1080, optimized WebP.

**Feature Section Images**: 3 supporting images showing product in use - dashboard interfaces, mobile app views, team collaboration. Each 800x600, subtle rounded corners.

**Testimonial Photos**: 6 circular customer headshots, diverse representation, professional quality. 256x256 resolution.

**Background Patterns**: Subtle geometric box patterns using logo motif as SVG, teal/orange at 5% opacity for section dividers.

## Interactive Elements
**Buttons**: Primary (orange, white text), Secondary (teal outline, teal text). Rounded-lg corners. On images: backdrop-blur-lg with semi-transparent background.

**Form Inputs**: Dark blue border, teal focus ring, orange error states. Rounded corners, generous padding (p-4).

**Cards**: Hover transforms: translateY(-4px), shadow-lg with orange tint.

## Accessibility
- Contrast ratios exceed WCAG AA for all text combinations
- Focus states: 2px teal outline with 4px offset
- Touch targets minimum 44x44px
- Keyboard navigation for all interactive elements

**Critical Note**: This is a feature-rich, polished design with 6+ distinct sections creating a comprehensive, professional experience that showcases modern SaaS excellence.