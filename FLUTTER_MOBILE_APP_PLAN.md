# Flutter Mobile App Plan - Biblical Discovery Platform

**Project**: Anthony Adegbulugbe Ministry Mobile App
**Platform**: Flutter (iOS + Android)
**Date**: February 24, 2026
**Status**: Planning

---

## 1. Vision & Purpose

A mobile companion to the existing web platform that lets believers **explore, discover, listen to, and study** the Word of God through curated themes, sermons, books, and personalized study plans — all powered by the existing backend API at `NEXT_PUBLIC_API_BASE_URL`.

### Core Pillars

| Pillar | Description |
|--------|-------------|
| **Discover** | Browse and explore biblical themes, sermons, and books |
| **Recommend** | AI-driven theme recommendations for the day, week, and month |
| **Read & Listen** | Consume content through text and text-to-speech voice playback |
| **Ask** | Ask questions about sermon/book content using an AI assistant |
| **Plan** | Create and follow structured Bible study plans |

---

## 2. Target Users

- Members of the pastoral ministry
- Christians seeking structured Bible study
- Listeners who prefer audio-based learning on the go
- New believers exploring foundational themes
- Study group leaders organizing reading plans

---

## 3. Feature Breakdown

### 3.1 Onboarding & Authentication

**Screens**: Splash, Welcome Carousel, Sign Up / Sign In, Preference Setup

- 3-screen onboarding carousel showcasing app pillars
- Email/password sign-up and sign-in (connects to `POST /auth/login`)
- Google and Apple social sign-in options
- **Preference setup** on first launch:
  - Select favorite themes (fetched from `GET /public/themes`)
  - Reading goal (e.g., 10 min/day, 30 min/day)
  - Preferred notification time for daily devotional nudge
- Guest mode available with limited features (read-only, no study plans)

---

### 3.2 Home / Discovery Feed

**Screen**: Home Tab

The main landing experience after login.

```
┌─────────────────────────────────┐
│  Good morning, [Name]           │
│  "Today's Scripture"            │
│  ─ Psalm 23:1 ─                │
├─────────────────────────────────┤
│  THEME OF THE DAY       [See →] │
│  ┌─────────────────────────┐    │
│  │  🔴 Faith in Trials     │    │
│  │  3 sermons · 1 book     │    │
│  └─────────────────────────┘    │
├─────────────────────────────────┤
│  WEEKLY THEME            [See →] │
│  ┌──────┐ ┌──────┐ ┌──────┐   │
│  │Prayer│ │Grace │ │Hope  │   │
│  └──────┘ └──────┘ └──────┘   │
├─────────────────────────────────┤
│  CONTINUE READING        [See →] │
│  ┌─────────────────────────┐    │
│  │  Sermon: Walking by...  │    │
│  │  ████████░░ 72%         │    │
│  └─────────────────────────┘    │
├─────────────────────────────────┤
│  FEATURED BOOKS          [See →] │
│  ┌──────┐ ┌──────┐             │
│  │ Book │ │ Book │             │
│  │ Cover│ │ Cover│             │
│  └──────┘ └──────┘             │
├─────────────────────────────────┤
│  RECENT SERMONS          [See →] │
│  ┌─────────────────────────┐    │
│  │ Title · Date · 45min    │    │
│  │ Theme tag               │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

**Data Sources**:
- Greeting + daily scripture: local rotation or API endpoint (new)
- Theme of the day/week/month: recommendation engine (see 3.3)
- Continue reading: local reading progress stored in SQLite/Hive
- Featured books: `GET /public/books/featured`
- Recent sermons: `GET /public/sermons`

---

### 3.3 Theme Recommendation Engine

**Screen**: Integrated into Home + dedicated "Explore Themes" screen

Surfaces relevant themes based on time period and user preferences.

#### Recommendation Types

| Period | Logic | Display |
|--------|-------|---------|
| **Daily** | Rotate through user's preferred themes + trending | Single highlighted card on Home |
| **Weekly** | Curated 7-day theme journey (e.g., "Week of Prayer") | Horizontal scroll of 7 daily sub-themes |
| **Monthly** | Overarching theme with related sermons & books | Full-screen feature card with content collection |

#### Recommendation Algorithm (Client-Side + Optional API)

**Phase 1 — Client-side (MVP)**:
- Fetch all active themes from `GET /public/themes`
- Weight by: user preference selections, themes not yet explored, sermon count (richer themes rank higher)
- Rotate daily using seeded random based on date
- Weekly = 7-day grouping from weighted pool
- Monthly = highest-weighted theme with most associated content

**Phase 2 — Server-side (Post-MVP)**:
- New API endpoint: `GET /recommendations?user_id=X&period=daily|weekly|monthly`
- Factor in reading history, completion rates, time spent per theme
- Seasonal/calendar-aware (e.g., Easter, Christmas themes)
- Pastor-curated "theme of the month" override from admin panel

---

### 3.4 Content Reading Experience

**Screens**: Sermon Detail, Book Detail, Reader View

#### Sermon Reader
```
┌─────────────────────────────────┐
│  ← Back              🔖  ⋮     │
├─────────────────────────────────┤
│  Walking by Faith               │
│  Theme: Faith · Jan 12, 2026    │
│  Duration: 45 min read          │
├─────────────────────────────────┤
│  📖 Scripture Reference         │
│  "Hebrews 11:1 — Now faith..." │
├─────────────────────────────────┤
│  [Summary]  [Key Points]  [Full]│
├─────────────────────────────────┤
│                                 │
│  Sermon body text here with     │
│  comfortable reading font,      │
│  adjustable size, and warm      │
│  background tones...            │
│                                 │
├─────────────────────────────────┤
│  ▶ Listen  │  ❓ Ask  │  📋 Plan│
└─────────────────────────────────┘
```

#### Reader Customization
- **Font size**: Small / Medium / Large / Extra Large
- **Font family**: Serif (reading comfort) / Sans-serif (modern)
- **Background**: Light cream (`#f5f1e8`), White, Dark (night mode)
- **Line spacing**: Compact / Normal / Relaxed
- **Bookmarking**: Tap to bookmark any section
- **Highlighting**: Long-press to highlight text with color options
- **Notes**: Inline note-taking attached to highlights

#### Book Reader
- PDF rendering via `flutter_pdfview` or `syncfusion_flutter_pdfviewer`
- Page-by-page navigation with progress tracking
- Table of contents sidebar navigation
- Download for offline reading (stored locally)

---

### 3.5 Voice / Text-to-Speech — Read on the Go

**Screen**: Integrated into Reader + standalone Audio Player

Converts sermon text and book excerpts to spoken audio so users can listen while commuting, exercising, or resting.

#### Features

- **Play / Pause / Stop** controls persistent at bottom of screen
- **Playback speed**: 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x
- **Voice selection**: System TTS voices (English variants)
- **Background playback**: Continues when app is minimized
- **Lock screen controls**: Media notification with play/pause/skip
- **Auto-scroll**: Text highlights in sync with spoken words
- **Sleep timer**: 15 min, 30 min, 45 min, 1 hour, end of sermon
- **Mini player**: Persistent bottom bar when navigating away from reader

```
┌─────────────────────────────────┐
│  🔊 Walking by Faith            │
│  ▶   advancement bar ────○───── │
│  1x  │  🕐 Sleep  │  ⏭ Next    │
└─────────────────────────────────┘
```

#### Technical Implementation
- **Primary**: `flutter_tts` package for on-device TTS
- **Enhanced** (Post-MVP): Cloud TTS API (Google Cloud TTS or ElevenLabs) for more natural voices
- **Audio caching**: Cache generated audio segments locally to reduce re-processing
- **Sentence chunking**: Break content into sentences for smooth playback and text tracking

---

### 3.6 Ask Questions — AI Assistant

**Screen**: Chat interface accessible from any content page

Users can ask questions about the sermon, book, or any biblical topic.

#### Interface
```
┌─────────────────────────────────┐
│  ← Ask About This Sermon        │
├─────────────────────────────────┤
│  Context: "Walking by Faith"    │
│  ─────────────────────────────  │
│                                 │
│  ┌─────────────────────────┐    │
│  │ What does Hebrews 11:1  │    │
│  │ mean in practical terms?│    │
│  └─────────────────────────┘    │
│                                 │
│       ┌─────────────────────┐   │
│       │ Great question!     │   │
│       │ In Hebrews 11:1,   │   │
│       │ faith is described  │   │
│       │ as "the substance   │   │
│       │ of things hoped..." │   │
│       │                     │   │
│       │ Related sermons:    │   │
│       │ · The Shield of...  │   │
│       │ · Standing Firm...  │   │
│       └─────────────────────┘   │
│                                 │
├─────────────────────────────────┤
│  Suggested:                     │
│  [Explain simply] [Go deeper]   │
│  [Related scriptures]           │
├─────────────────────────────────┤
│  ┌───────────────────┐  [Send] │
│  │ Type a question... │         │
│  └───────────────────┘          │
└─────────────────────────────────┘
```

#### Capabilities
- **Contextual Q&A**: Questions scoped to the current sermon/book content
- **Scripture cross-references**: Links to related Bible verses
- **Content recommendations**: Suggests related sermons/books from the platform
- **Explain like I'm new**: Simplifies theological concepts
- **Discussion prompts**: Generates study group questions
- **Conversation history**: Saved per content piece

#### Technical Implementation
- **Backend**: New API endpoint `POST /ai/ask` that wraps an LLM (Claude API recommended)
- **Context injection**: Sends sermon summary + key points + scripture as system context
- **Rate limiting**: Free tier gets 10 questions/day, unlimited for premium
- **Offline fallback**: Pre-generated FAQ per sermon cached locally

---

### 3.7 Study Plans

**Screens**: Study Plan Browser, Plan Detail, Active Plan Tracker

Structured multi-day reading/listening plans that guide users through themes.

#### Plan Types

| Type | Duration | Description |
|------|----------|-------------|
| **Quick Dive** | 3 days | Introduction to a single theme |
| **Weekly Focus** | 7 days | Deep dive into a theme with daily readings |
| **Monthly Journey** | 30 days | Comprehensive study across related themes |
| **Custom** | User-defined | User picks content and sets their own schedule |

#### Plan Structure
```
Study Plan: "Foundations of Faith" (7 days)
├── Day 1: Introduction
│   ├── Read: Sermon "What is Faith?"
│   ├── Scripture: Hebrews 11:1-6
│   └── Reflect: 3 journal prompts
├── Day 2: Faith in Action
│   ├── Read: Sermon "Walking by Faith"
│   ├── Listen: Book excerpt Ch. 1
│   └── Reflect: 2 journal prompts
├── ...
└── Day 7: Living by Faith Daily
    ├── Read: Sermon "Daily Faith Practices"
    ├── Review: Week summary
    └── Action: Personal commitment note
```

#### Features
- **Plan Browser**: Browse pre-built plans by theme, duration, difficulty
- **AI-Generated Plans**: Based on user's selected theme + available content
  - `POST /ai/generate-plan` with theme_id + duration preference
  - Returns structured plan with content IDs mapped to days
- **Custom Plan Builder**:
  - Drag-and-drop sermons/books into day slots
  - Set daily time commitment
  - Add personal notes/goals per day
- **Progress Tracking**:
  - Daily check-off with streak counter
  - Visual progress ring on plan card
  - Completion percentage per day and overall
  - Missed day recovery (reschedule remaining days)
- **Reminders**: Push notification at user's preferred time
- **Journal**: Built-in reflection journal per day with prompts
- **Sharing**: Share plan with study group or friends via deep link
- **Completion certificate**: Shareable graphic on plan completion

#### Plan Data Model
```dart
class StudyPlan {
  final String id;
  final String title;
  final String description;
  final String themeId;
  final int durationDays;
  final List<StudyDay> days;
  final DateTime startDate;
  final PlanStatus status; // notStarted, active, paused, completed
  final double progress;
}

class StudyDay {
  final int dayNumber;
  final String title;
  final List<StudyActivity> activities;
  final List<String> reflectionPrompts;
  final bool completed;
  final DateTime? completedAt;
  final String? journalEntry;
}

class StudyActivity {
  final ActivityType type; // read, listen, watch, reflect
  final String contentId;
  final String contentType; // sermon, book, scripture
  final String title;
  final int estimatedMinutes;
  final bool completed;
}
```

---

## 4. App Architecture

### 4.1 Navigation Structure

```
Bottom Navigation Bar (5 tabs)
├── 🏠 Home (Discovery Feed)
├── 🔍 Explore (Themes & Search)
├── 📖 Library (Books & Sermons)
├── 📋 Study Plans
└── 👤 Profile
```

#### Screen Map
```
Home
├── Theme of the Day → Theme Detail
├── Continue Reading → Reader
├── Featured Books → Book Detail → Book Reader
├── Recent Sermons → Sermon Detail → Sermon Reader
└── Notification Bell → Notifications

Explore
├── Theme Grid → Theme Detail
│   ├── Theme Sermons List → Sermon Detail
│   └── Theme Books List → Book Detail
├── Search (sermons, books, themes)
├── Recommended Daily/Weekly/Monthly
└── Browse All Themes

Library
├── Books Tab
│   ├── Featured Books
│   ├── All Books Grid
│   └── Downloaded Books (Offline)
├── Sermons Tab
│   ├── Recent Sermons
│   ├── Filter by Theme
│   └── Saved Sermons
└── Bookmarks & Highlights

Study Plans
├── Active Plans (with progress)
├── Browse Plans
│   ├── By Theme
│   ├── By Duration
│   └── AI-Recommended
├── Create Custom Plan
└── Completed Plans (history)

Profile
├── Account Settings
├── Reading Stats & Streaks
├── Preferences (themes, notifications, reader)
├── Downloaded Content
├── App Settings (theme, font, TTS voice)
└── About / Support
```

### 4.2 Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Framework** | Flutter 3.x | Cross-platform iOS + Android from single codebase |
| **Language** | Dart 3.x | Null safety, strong typing |
| **State Management** | Riverpod 2.x | Scalable, testable, compile-safe providers |
| **Navigation** | GoRouter | Declarative routing with deep link support |
| **HTTP Client** | Dio | Interceptors for auth tokens, retry logic, caching |
| **Local Database** | Drift (SQLite) | Offline content, reading progress, study plans |
| **Local Key-Value** | SharedPreferences | User settings, onboarding flags |
| **PDF Viewer** | syncfusion_flutter_pdfviewer | Full-featured PDF reading |
| **TTS** | flutter_tts | On-device text-to-speech |
| **Audio** | just_audio + audio_service | Background playback, lock screen controls |
| **Push Notifications** | firebase_messaging + flutter_local_notifications | Study reminders, daily themes |
| **Dependency Injection** | Riverpod (built-in) | Service location via providers |
| **Image Caching** | cached_network_image | Efficient cover image loading |
| **Animations** | flutter_animate | Polished micro-interactions |
| **Charts** | fl_chart | Reading stats visualization |

### 4.3 Project Structure

```
lib/
├── main.dart
├── app.dart
├── router/
│   └── app_router.dart          # GoRouter configuration
├── core/
│   ├── constants/
│   │   ├── colors.dart          # App color palette
│   │   ├── typography.dart      # Text styles
│   │   └── api_endpoints.dart   # API URL constants
│   ├── network/
│   │   ├── dio_client.dart      # Configured Dio instance
│   │   ├── api_interceptor.dart # Auth token injection
│   │   └── api_exceptions.dart  # Custom error types
│   ├── database/
│   │   ├── app_database.dart    # Drift database definition
│   │   └── daos/                # Data access objects
│   ├── services/
│   │   ├── tts_service.dart     # Text-to-speech wrapper
│   │   ├── audio_service.dart   # Background audio handler
│   │   └── notification_service.dart
│   └── utils/
│       ├── date_utils.dart
│       └── text_utils.dart
├── features/
│   ├── auth/
│   │   ├── data/
│   │   │   ├── auth_repository.dart
│   │   │   └── auth_local_source.dart
│   │   ├── domain/
│   │   │   └── models/user.dart
│   │   ├── presentation/
│   │   │   ├── screens/login_screen.dart
│   │   │   ├── screens/onboarding_screen.dart
│   │   │   ├── widgets/
│   │   │   └── providers/auth_provider.dart
│   ├── home/
│   │   ├── data/
│   │   ├── presentation/
│   │   │   ├── screens/home_screen.dart
│   │   │   └── widgets/
│   │   │       ├── daily_theme_card.dart
│   │   │       ├── continue_reading_card.dart
│   │   │       ├── featured_books_row.dart
│   │   │       └── recent_sermons_list.dart
│   ├── explore/
│   │   ├── data/
│   │   │   ├── theme_repository.dart
│   │   │   └── recommendation_engine.dart
│   │   ├── domain/
│   │   │   └── models/theme.dart
│   │   ├── presentation/
│   │   │   ├── screens/explore_screen.dart
│   │   │   ├── screens/theme_detail_screen.dart
│   │   │   └── widgets/theme_card.dart
│   ├── library/
│   │   ├── data/
│   │   │   ├── book_repository.dart
│   │   │   └── sermon_repository.dart
│   │   ├── domain/
│   │   │   ├── models/book.dart
│   │   │   └── models/sermon.dart
│   │   ├── presentation/
│   │   │   ├── screens/library_screen.dart
│   │   │   ├── screens/book_detail_screen.dart
│   │   │   ├── screens/sermon_detail_screen.dart
│   │   │   └── widgets/
│   ├── reader/
│   │   ├── data/
│   │   │   └── reading_progress_repository.dart
│   │   ├── presentation/
│   │   │   ├── screens/sermon_reader_screen.dart
│   │   │   ├── screens/book_reader_screen.dart
│   │   │   └── widgets/
│   │   │       ├── reader_settings_sheet.dart
│   │   │       ├── highlight_toolbar.dart
│   │   │       ├── mini_audio_player.dart
│   │   │       └── tts_controls.dart
│   ├── ask/
│   │   ├── data/
│   │   │   └── ai_repository.dart
│   │   ├── presentation/
│   │   │   ├── screens/ask_screen.dart
│   │   │   └── widgets/
│   │   │       ├── chat_bubble.dart
│   │   │       ├── suggested_questions.dart
│   │   │       └── related_content_card.dart
│   ├── study_plan/
│   │   ├── data/
│   │   │   ├── plan_repository.dart
│   │   │   └── plan_local_source.dart
│   │   ├── domain/
│   │   │   ├── models/study_plan.dart
│   │   │   ├── models/study_day.dart
│   │   │   └── models/study_activity.dart
│   │   ├── presentation/
│   │   │   ├── screens/plans_screen.dart
│   │   │   ├── screens/plan_detail_screen.dart
│   │   │   ├── screens/plan_builder_screen.dart
│   │   │   ├── screens/active_plan_screen.dart
│   │   │   └── widgets/
│   │   │       ├── plan_progress_ring.dart
│   │   │       ├── day_checklist.dart
│   │   │       ├── journal_editor.dart
│   │   │       └── streak_counter.dart
│   └── profile/
│       ├── presentation/
│       │   ├── screens/profile_screen.dart
│       │   ├── screens/stats_screen.dart
│       │   └── screens/settings_screen.dart
├── shared/
│   ├── widgets/
│   │   ├── app_scaffold.dart
│   │   ├── loading_indicator.dart
│   │   ├── error_view.dart
│   │   ├── content_card.dart
│   │   └── theme_badge.dart
│   └── providers/
│       └── connectivity_provider.dart
```

---

## 5. Design System (Mobile)

### 5.1 Color Palette

Derived from the existing website, adapted for mobile.

```
Primary Background:     #F5F1E8  (warm cream)
Surface:                #FFFFFF
Card Background:        #FFFFFF
Primary Accent:         #DC2626  (red — CTAs, highlights)
Secondary Accent:       #1E3A5F  (deep navy — headers, emphasis)
Text Primary:           #1A1A1A
Text Secondary:         #6B7280
Text Tertiary:          #9CA3AF
Border:                 #E5E7EB
Divider:                #F3F4F6

Theme Colors (matching existing):
  Red:      #DC2626  /  #FEE2E2 (bg)
  Blue:     #2563EB  /  #DBEAFE (bg)
  Green:    #16A34A  /  #DCFCE7 (bg)
  Purple:   #9333EA  /  #F3E8FF (bg)
  Yellow:   #CA8A04  /  #FEF9C3 (bg)
  Indigo:   #4F46E5  /  #E0E7FF (bg)

Dark Mode:
  Background:           #121212
  Surface:              #1E1E1E
  Card:                 #2A2A2A
  Text Primary:         #F5F1E8
  Text Secondary:       #9CA3AF
```

### 5.2 Typography

```
Font Family:  Inter (matching web) — via google_fonts package

Display Large:   32sp / Bold    — Screen titles
Display Medium:  28sp / Bold    — Section headers
Title Large:     22sp / SemiBold — Card titles
Title Medium:    18sp / SemiBold — Subtitles
Body Large:      16sp / Regular  — Reader text (default)
Body Medium:     14sp / Regular  — General body
Body Small:      12sp / Regular  — Captions, metadata
Label:           14sp / Medium   — Buttons, tags
```

### 5.3 Component Styles

- **Cards**: 12px border radius, subtle shadow (`elevation: 2`), no heavy borders (softer than web)
- **Buttons**: Rounded (`border-radius: 24px`), primary red fill, secondary outlined
- **Tags/Badges**: Pill-shaped with theme color backgrounds
- **Icons**: Lucide icon set via `lucide_icons` package (matching web)
- **Spacing**: 8px grid system (8, 16, 24, 32, 48)
- **Bottom sheets**: Rounded top corners, drag handle indicator
- **Transitions**: Shared element transitions between list and detail views

---

## 6. API Integration

### 6.1 Existing Endpoints (Reuse)

| Feature | Endpoint | Method |
|---------|----------|--------|
| Auth | `/auth/login` | POST |
| Auth verify | `/auth/verify` | GET |
| Themes list | `/public/themes` | GET |
| Theme detail | `/public/themes/{id}` | GET |
| Books list | `/public/books` | GET |
| Featured books | `/public/books/featured` | GET |
| Book detail | `/public/books/{id}` | GET |
| Sermons list | `/public/sermons` | GET |
| Sermon detail | `/public/sermons/{id}` | GET |
| Sermons by theme | `/sermons/theme/{themeId}` | GET |
| Comments | `/public/comments` | GET/POST |
| Dashboard stats | `/dashboard/stats` | GET |

### 6.2 New Endpoints Required (Backend Work)

| Feature | Endpoint | Method | Description |
|---------|----------|--------|-------------|
| User registration | `/auth/register` | POST | New user sign-up for mobile |
| User profile | `/auth/profile` | GET/PUT | User preferences, avatar |
| Social auth | `/auth/social` | POST | Google/Apple sign-in |
| AI Ask | `/ai/ask` | POST | Contextual Q&A about content |
| AI Study Plan | `/ai/generate-plan` | POST | Generate study plan from theme |
| Recommendations | `/recommendations` | GET | Daily/weekly/monthly themes |
| Study Plans CRUD | `/plans` | GET/POST/PUT/DELETE | Manage study plans |
| Reading Progress | `/progress` | GET/POST/PUT | Track reading/listening progress |
| Bookmarks | `/bookmarks` | GET/POST/DELETE | Save content bookmarks |
| Highlights | `/highlights` | GET/POST/PUT/DELETE | Text highlights with notes |
| Push Tokens | `/devices` | POST/DELETE | Register FCM/APNs tokens |
| Daily Scripture | `/daily-scripture` | GET | Daily verse rotation |
| Reading Stats | `/stats/reading` | GET | User's reading statistics |

---

## 7. Offline Strategy

### 7.1 What Works Offline

| Content | Strategy |
|---------|----------|
| Previously viewed sermons | Cached in Drift/SQLite |
| Downloaded books (PDF) | Stored in app documents directory |
| Active study plan | Fully cached with all referenced content |
| Reading progress | Stored locally, synced when online |
| Bookmarks & highlights | Stored locally, synced when online |
| TTS playback | Works on cached content |
| User preferences | SharedPreferences |

### 7.2 What Requires Network

- AI Q&A (Ask feature)
- New content discovery
- Theme recommendations (server-side, Phase 2)
- Push notifications
- Account operations
- Comments

### 7.3 Sync Strategy

- **Optimistic UI**: Changes apply instantly, sync in background
- **Conflict resolution**: Last-write-wins with server timestamp
- **Queue**: Failed syncs queued and retried on connectivity change
- **Indicator**: Subtle offline badge in app bar when disconnected

---

## 8. Push Notifications

| Notification Type | Trigger | Content |
|-------------------|---------|---------|
| Daily Devotional | User's preferred time | "Today's theme: [Theme]. Start your morning with [Sermon Title]" |
| Study Plan Reminder | User's study time | "Day 4 of 'Foundations of Faith' — Continue where you left off" |
| New Content | New sermon/book published | "New sermon: [Title] — Listen now" |
| Streak Motivation | Evening if no activity | "Keep your 7-day streak alive! Read for just 5 minutes" |
| Weekly Digest | Sunday morning | "This week's theme: [Theme] with 3 new sermons" |
| Plan Completion | Plan finished | "You completed 'Foundations of Faith'! Share your achievement" |

---

## 9. Development Phases

### Phase 1 — MVP (8-10 weeks)

**Goal**: Core reading and discovery experience

| Week | Deliverable |
|------|-------------|
| 1-2 | Project setup, architecture, auth flow, onboarding |
| 3-4 | Home feed, theme browsing, sermon/book listing |
| 5-6 | Sermon reader, book reader (PDF), reading progress |
| 7-8 | TTS integration, basic audio playback |
| 9-10 | Testing, bug fixes, App Store / Play Store prep |

**MVP Features**:
- [x] Onboarding + email auth
- [x] Home discovery feed
- [x] Theme browsing + filtering
- [x] Sermon reading with customizable reader
- [x] Book browsing + PDF reader
- [x] Basic TTS (read aloud)
- [x] Offline caching for viewed content
- [x] Reading progress tracking (local)
- [x] Bookmarks
- [x] Dark mode
- [x] Push notifications (daily theme + new content)

### Phase 2 — Intelligence (4-6 weeks)

**Goal**: AI features and study plans

- [ ] AI Ask (contextual Q&A)
- [ ] Study plan browser (pre-built plans)
- [ ] AI-generated study plans
- [ ] Custom plan builder
- [ ] Journal/reflection per study day
- [ ] Streak tracking + gamification
- [ ] Highlighting + inline notes
- [ ] Reading statistics dashboard
- [ ] Background audio with lock screen controls

### Phase 3 — Community & Growth (4-6 weeks)

**Goal**: Social features and engagement

- [ ] User registration + social auth
- [ ] Comments on sermons/books
- [ ] Share study plans with friends
- [ ] Study groups (shared plan progress)
- [ ] Plan completion certificates
- [ ] Advanced theme recommendations (server-side)
- [ ] Widget for home screen (daily verse)
- [ ] Apple Watch / Wear OS companion (daily verse)
- [ ] Multi-language support

---

## 10. Performance Targets

| Metric | Target |
|--------|--------|
| Cold start | < 2 seconds |
| Screen transition | < 300ms |
| Content load (cached) | < 100ms |
| Content load (network) | < 1.5 seconds |
| TTS start latency | < 500ms |
| Offline mode switch | Instant (no loading) |
| App size (installed) | < 50 MB |
| Memory usage | < 200 MB peak |
| Battery drain (reading 1hr) | < 5% |
| Battery drain (TTS 1hr) | < 8% |

---

## 11. Analytics & Tracking

Key events to track (via Firebase Analytics or similar):

- `theme_viewed` — which themes are popular
- `sermon_read` — completion rate, time spent
- `book_opened` — which books are read
- `tts_started` — voice usage frequency
- `question_asked` — AI feature engagement
- `plan_started` / `plan_completed` — study plan conversion
- `streak_milestone` — engagement health
- `search_performed` — content discovery patterns
- `bookmark_created` — save behavior
- `notification_opened` — notification effectiveness
- `offline_session` — offline usage patterns

---

## 12. Testing Strategy

| Layer | Tool | Coverage Target |
|-------|------|----------------|
| Unit tests | `flutter_test` | 80%+ business logic |
| Widget tests | `flutter_test` | Key screens and interactions |
| Integration tests | `integration_test` | Critical user journeys |
| API mocking | `mocktail` | All repository tests |
| Golden tests | `golden_toolkit` | UI regression prevention |
| E2E | Patrol or Maestro | Smoke tests on real devices |

### Critical Test Paths
1. Onboarding → Login → Home Feed loads
2. Browse theme → Open sermon → Read → TTS playback
3. Start study plan → Complete day → Progress updates
4. Ask question → Receive answer → View related content
5. Offline: read cached sermon → bookmark → sync on reconnect

---

## 13. App Store Considerations

### App Store (iOS)
- **Category**: Reference or Books
- **Age Rating**: 4+ (no objectionable content)
- **Required**: Privacy policy, terms of service
- **In-App Purchases**: None for MVP (consider premium TTS voices later)
- **Review notes**: Religious/spiritual content — factual, educational positioning

### Play Store (Android)
- **Category**: Books & Reference
- **Content Rating**: Everyone
- **Target API**: Android 14 (API 34)
- **Minimum**: Android 8.0 (API 26)

### Shared
- **App name**: "Anthony Adegbulugbe Ministry" (or shorter brand name)
- **Bundle ID**: `com.adegbulugbe.ministry`
- **Screenshots**: 6.7" iPhone + 6.5" Pixel mockups
- **Preview video**: 30-second feature walkthrough

---

## 14. Security

- JWT tokens stored in `flutter_secure_storage` (Keychain/Keystore)
- Certificate pinning for API calls
- No sensitive data in SharedPreferences
- Content downloads encrypted at rest
- API rate limiting on AI endpoints
- Input sanitization on all user inputs (comments, journal entries, questions)
- Biometric lock option for app access

---

## 15. Estimated Backend Changes

To support the mobile app, the existing Go/Node backend needs:

1. **User registration endpoint** — currently admin-only auth
2. **Reading progress API** — new table + CRUD endpoints
3. **Study plans API** — new tables (plans, days, activities) + CRUD
4. **Bookmarks/Highlights API** — new tables + CRUD
5. **AI Ask endpoint** — LLM integration (Claude API recommended)
6. **AI Plan Generation** — LLM-based plan creation
7. **Push notification service** — FCM integration + device token storage
8. **Daily scripture endpoint** — simple verse rotation
9. **Recommendations endpoint** — initially rule-based, later ML
10. **Reading stats aggregation** — query layer over progress data

---

## 16. Open Questions

- [ ] **Monetization**: Will there be a free/premium model? If so, what goes behind the paywall?
- [ ] **Content scope**: Will Bible text itself be included, or only platform sermons/books?
- [ ] **Admin mobile**: Does the pastor need mobile admin capabilities (publish sermons on the go)?
- [ ] **Live streaming**: Should the app support live sermon streaming in the future?
- [ ] **Multi-language**: Is content available in languages other than English?
- [ ] **Branding**: Final app name and icon direction?
- [ ] **Cloud TTS budget**: Is there budget for premium AI voices (ElevenLabs/Google Cloud TTS)?
- [ ] **Backend hosting**: Where is the backend currently hosted? Can it handle mobile traffic?

---

*This document serves as the comprehensive technical and product plan for the Flutter mobile application. Each phase builds incrementally on the previous, ensuring a solid MVP is delivered first before layering intelligence and community features.*
