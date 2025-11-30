# Planning Guide

A comprehensive digital platform for Sindhi Cultural Society Jodhpur to showcase their mission of preserving Indian culture, art, and the Sindhi language while enabling administrators to manage organizational content, events, and leadership information.

**Experience Qualities**:
1. **Culturally Rich** - The website should evoke pride in heritage through vibrant colors, traditional patterns, and respectful presentation of cultural content that honors the society's 40+ year legacy.
2. **Welcoming and Accessible** - Visitors should immediately understand the society's mission and feel invited to participate, whether they're students seeking workshops, donors looking to contribute, or community members interested in events.
3. **Professional and Trustworthy** - As a registered non-profit affiliated with prestigious government institutions, the design should communicate legitimacy, transparency, and organizational maturity.

**Complexity Level**: Light Application (multiple features with basic state)
- The website needs to display dynamic content (leadership, events, programs) that can be configured through a simple admin interface, but doesn't require complex user accounts or advanced state management beyond configuration storage.

## Essential Features

### 1. Dynamic Leadership Board Display
- **Functionality**: Display current office bearers (President, Vice President, Secretary, Adhyaksh) with photos, names, and roles
- **Purpose**: Establish organizational transparency and provide clear contact points for stakeholders
- **Trigger**: Automatically displayed on homepage and dedicated "Leadership" section
- **Progression**: Visitor views homepage → Scrolls to leadership section → Sees organized grid of current office bearers with photos and titles → Can access detailed contact information
- **Success criteria**: Leadership information is prominently displayed, easily updatable via configuration, and presents a professional organizational structure

### 2. Configurable Events & Programs Showcase
- **Functionality**: Display upcoming and past cultural events, plays, workshops, and training camps with dates, descriptions, and media
- **Purpose**: Inform community about participation opportunities and showcase the society's active cultural programming
- **Trigger**: Visible on homepage featured events and dedicated events page
- **Progression**: Visitor lands on homepage → Views featured upcoming events → Clicks "View All Events" → Browses comprehensive event calendar → Selects event for detailed information including date, venue, description, and related media
- **Success criteria**: Events are clearly organized by date, filterable by type (plays, workshops, camps), and easily maintainable through configuration

### 3. Mission & History Presentation
- **Functionality**: Comprehensive display of society's mission statement, history since 1982, affiliations, and achievements
- **Purpose**: Establish credibility and communicate the society's values and impact to potential donors, partners, and participants
- **Trigger**: Accessible from main navigation "About Us" section
- **Progression**: Visitor clicks "About" → Reads mission statement → Learns about 40+ year history → Sees government affiliations (Sahitya Akademi, Rajasthan Sangeet Natak Akademi) → Views organizational achievements
- **Success criteria**: Information is presented in an engaging, scannable format with visual hierarchy that emphasizes key credentials and affiliations

### 4. Multimedia Integration (YouTube & Photos)
- **Functionality**: Embedded YouTube video gallery showcasing plays, performances, and cultural programs
- **Purpose**: Provide visual proof of the society's work and engage visitors through dynamic content
- **Trigger**: Featured prominently on homepage and dedicated media gallery
- **Progression**: Visitor navigates to media section → Views curated YouTube playlist/videos → Clicks to watch performances → Can share videos or visit YouTube channel
- **Success criteria**: Videos load efficiently, gallery is organized by program type or date, and channel link is prominent

### 5. Newspaper Publications Archive
- **Functionality**: Display newspaper articles and press coverage featuring the society's work and achievements
- **Purpose**: Establish credibility through third-party validation and showcase media recognition
- **Trigger**: Accessible from main navigation and featured on homepage
- **Progression**: Visitor clicks "Press & Publications" → Views grid of newspaper clippings with publication names and dates → Clicks on article for larger view or external link → Can see chronological history of media coverage
- **Success criteria**: Publications are organized by date, display clearly with newspaper name, date, and thumbnail, support external links to online articles, and are easily manageable through admin configuration

### 6. Contact & Donation Information
- **Functionality**: Clear display of contact details, physical address, email, phone, and PAN number for donations
- **Purpose**: Enable supporters to reach out for inquiries, registrations, or donations while providing transparency required for non-profit status
- **Trigger**: Accessible from navigation, footer, and prominent call-to-action buttons
- **Progression**: Visitor wants to connect → Clicks contact → Sees multiple contact methods (phone, email, address) → Views PAN for donation purposes → Can directly initiate contact
- **Success criteria**: Contact information is accurate, easy to copy, and includes all necessary details for various stakeholder needs

### 7. Admin Configuration Panel
- **Functionality**: Secure interface allowing administrators to update leadership roster, add/edit events, add newspaper publications, modify content without code changes
- **Purpose**: Enable non-technical administrators to maintain current information and scale content as the organization grows
- **Trigger**: Accessible via admin link (owner-only access)
- **Progression**: Admin logs in → Navigates to configuration panel → Selects section to edit (leadership/events/programs/publications) → Updates information through forms → Saves changes → Changes reflect immediately on public site
- **Success criteria**: Interface is intuitive for non-technical users, changes persist correctly, and only authorized users can access configuration

## Edge Case Handling
- **No Events Scheduled**: Display encouraging message about checking back soon with prominent contact information for inquiries
- **No Publications Available**: Display placeholder message encouraging visitors to check back as media coverage is added
- **Missing Leadership Photos**: Show placeholder with name and title to maintain professional appearance
- **YouTube API Issues**: Gracefully degrade to direct channel links if embedding fails
- **Long Event Descriptions**: Implement "Read More" expansion to maintain clean layout
- **Large Publication Images**: Optimize display with aspect ratio controls and lazy loading
- **Mobile Navigation**: Collapsible menu for easy access to all sections on small screens
- **Empty Configuration**: Provide sensible defaults and sample data to demonstrate functionality

## Design Direction
The design should evoke cultural pride while maintaining modern accessibility - feeling traditional yet contemporary, warm yet professional. The interface should be rich enough to honor the cultural heritage with patterns and vibrant colors inspired by Rajasthani/Sindhi textiles, but minimal enough to let content (performances, mission, people) take center stage. This balance serves both the dignity of a 40-year institution and the dynamic nature of its cultural programming.

## Color Selection
Triadic color scheme combining traditional Indian cultural colors with modern accessibility

The palette draws from traditional Rajasthani and Sindhi textile colors - saffron representing cultural heritage and energy, deep teal for trust and spirituality, and warm crimson for celebration and passion. This creates visual richness appropriate for a cultural organization while maintaining professionalism.

- **Primary Color**: Rich Saffron Orange (oklch(0.72 0.15 65)) - Communicates cultural vitality, warmth, and Indian heritage; used for primary CTAs and brand emphasis
- **Secondary Colors**: 
  - Deep Teal (oklch(0.45 0.08 220)) - Represents trust, stability, and spiritual depth; used for navigation and secondary elements
  - Warm Crimson (oklch(0.52 0.18 25)) - Celebrates passion and festivity; used sparingly for highlights and important announcements
- **Accent Color**: Golden Yellow (oklch(0.85 0.15 85)) - Eye-catching highlight for CTAs, important dates, and featured content; creates urgency and celebration
- **Foreground/Background Pairings**:
  - Background (Warm Cream oklch(0.98 0.01 85)): Dark text (oklch(0.25 0.01 65)) - Ratio 14.2:1 ✓
  - Card (White oklch(1 0 0)): Dark text (oklch(0.25 0.01 65)) - Ratio 15.8:1 ✓
  - Primary (Saffron oklch(0.72 0.15 65)): White text (oklch(1 0 0)) - Ratio 5.2:1 ✓
  - Secondary (Deep Teal oklch(0.45 0.08 220)): White text (oklch(1 0 0)) - Ratio 7.8:1 ✓
  - Accent (Golden Yellow oklch(0.85 0.15 85)): Dark text (oklch(0.25 0.01 65)) - Ratio 8.1:1 ✓
  - Muted (Light Sand oklch(0.95 0.01 75)): Medium text (oklch(0.50 0.02 65)) - Ratio 6.5:1 ✓

## Font Selection
Typography should balance traditional elegance with modern readability, conveying both cultural heritage and contemporary professionalism suitable for an established institution.

Primary: **Cormorant Garamond** - An elegant serif that brings classical sophistication for headings and titles, reflecting the society's connection to traditional arts and literature
Secondary: **Inter** - A modern, highly legible sans-serif for body text ensuring accessibility and professional presentation across devices

- **Typographic Hierarchy**:
  - H1 (Organization Name): Cormorant Garamond Bold/42px/tight letter spacing/-0.02em/line-height 1.1
  - H2 (Section Headers): Cormorant Garamond SemiBold/32px/tight letter spacing/-0.01em/line-height 1.2
  - H3 (Subsections): Inter SemiBold/24px/normal letter spacing/line-height 1.3
  - H4 (Card Titles): Inter SemiBold/18px/normal letter spacing/line-height 1.4
  - Body Text: Inter Regular/16px/normal letter spacing/line-height 1.6
  - Small Text (Meta info): Inter Regular/14px/normal letter spacing/line-height 1.5
  - Button Text: Inter Medium/16px/wide letter spacing/0.02em/line-height 1.2

## Animations
Animations should be subtle and purposeful, enhancing the sense of cultural richness without overwhelming content - feeling graceful and deliberate like traditional dance movements rather than flashy or distracting.

- **Purposeful Meaning**: Gentle fade-ins for content sections evoke the gradual revelation of a stage curtain; cards lift slightly on hover like pages of a treasured book; smooth scrolling between sections mirrors the flow of cultural narratives
- **Hierarchy of Movement**: 
  - Primary: Hero section fade-in and featured events carousel transitions (300ms ease-out)
  - Secondary: Leadership card hover lifts and event card interactions (200ms ease)
  - Tertiary: Navigation highlights and button state changes (150ms ease)
  - Ambient: Parallax scroll effects on hero imagery and subtle background pattern animations (ambient, non-blocking)

## Component Selection
- **Components**: 
  - Navigation: Custom header with mobile-responsive hamburger menu
  - Hero: Card component with background image and overlay for mission statement
  - Leadership Grid: Card components in responsive grid layout with Avatar components for photos
  - Events: Card components with Badge for event type, Calendar integration visual, Tabs for filtering (Upcoming/Past/All)
  - Publications: Card components in responsive grid with publication images, newspaper names, dates, and external link buttons
  - About Section: Accordion or standard card layout for affiliations and history
  - Media Gallery: Aspect-ratio components for YouTube embeds, organized in responsive grid
  - Contact: Card with separate sections for phone, email, address using Separator components
  - Admin Panel: Dialog component for configuration modal, Tabs for different sections (Leadership/Events/Videos/Publications), Form components with Input, Textarea, and Button elements, Switch for status toggles
  - Call-to-Actions: Button variants (primary for donate, secondary for contact)
  - Toast notifications (sonner) for admin save confirmations

- **Customizations**: 
  - Custom hero section with cultural pattern overlay (SVG or CSS)
  - Decorative border elements using traditional Indian motifs
  - Custom event calendar view beyond standard components
  - YouTube embed wrapper with fallback handling

- **States**: 
  - Buttons: Default (solid primary), hover (scale 1.02 + brightness increase), active (scale 0.98), disabled (50% opacity)
  - Cards: Default (subtle shadow), hover (lift with increased shadow, scale 1.01), active state for selected filters
  - Inputs: Default (border input color), focus (ring primary color, border primary), error (border destructive, ring destructive), success (border teal)
  - Navigation: Active page (primary color, underline decoration), hover (accent color transition)

- **Icon Selection**:
  - Users/UsersFour: Leadership section
  - Calendar/CalendarBlank: Events and dates
  - Play/PlayCircle: Video gallery and performances
  - Newspaper: Publications and press coverage
  - Phone/Envelope/MapPin: Contact information
  - TreeEvergreen: Environmental programs
  - Student: Youth programs and workshops
  - MusicNotes/Masks: Cultural programs and theater
  - Gear: Admin configuration
  - Plus/PencilSimple/Trash: Admin actions
  - ArrowSquareOut: External links to articles

- **Spacing**:
  - Section padding: py-16 md:py-24 (vertical breathing room between major sections)
  - Container max-width: max-w-7xl with mx-auto and px-4 md:px-6
  - Card padding: p-6 md:p-8
  - Grid gaps: gap-6 md:gap-8 for card grids
  - Element spacing: space-y-4 for related elements, space-y-8 for distinct sections
  - Button padding: px-6 py-3 for primary actions, px-4 py-2 for secondary

- **Mobile**:
  - Navigation: Hamburger menu at md breakpoint, full-height slide-in drawer
  - Hero: Stack elements vertically, reduce heading sizes (text-3xl → text-4xl at md)
  - Leadership Grid: 1 column mobile, 2 columns tablet (md), 4 columns desktop (lg)
  - Events: 1 column mobile, 2 columns tablet, 3 columns desktop
  - Publications: 1 column mobile, 2 columns tablet, 3 columns desktop with optimized image display
  - Typography: Responsive scale (base 14px mobile, 16px desktop)
  - Touch targets: Minimum 44px for all interactive elements
  - Forms in admin: Stack labels above inputs on mobile, side-by-side on desktop where appropriate
