# Stealth BJJ Timer

A Brazilian Jiu-Jitsu round timer app built with React Native and Expo, developed for Stealth BJJ. Built as a real-world portfolio project demonstrating clean React Native architecture, native device integration, and production App Store deployment on both iOS and Android.

---

## Screenshots

| Home                                 | Timer                                  | Settings                                     | Sound Picker                                        |
| ------------------------------------ | -------------------------------------- | -------------------------------------------- | --------------------------------------------------- |
| ![Home](./docs/screenshots/Home.png) | ![Timer](./docs/screenshots/Timer.png) | ![Settings](./docs/screenshots/Settings.png) | ![Sound Picker](./docs/screenshots/SoundPicker.png) |

| Record Sound                                  | Gym Mode                                    |
| --------------------------------------------- | ------------------------------------------- |
| ![Record](./docs/screenshots/RecordSound.png) | ![Gym Mode](./docs/screenshots/GymMode.png) |

---

## Features

- Configurable round length (1–15 minutes), rest periods (0–3 minutes in 10s increments), and number of rounds (1–10)
- Audio cues at round start, round end and rest end — separate sounds for each
- Preset sounds (Bell, Buzzer, Whistle, Finish, OG) with in-app preview
- Custom sound recording via device microphone — record your own gym sounds
- Delete custom recordings
- Haptic feedback on round transitions
- Keep Awake — screen stays on during training
- **Gym Mode** — fullscreen display optimised for TV mirroring, tap anywhere to pause/resume
- Settings persist between sessions via AsyncStorage
- Animated splash screen
- Dark mode throughout
- Available on iOS and Android

---

## Tech Stack

- **React Native** with **Expo SDK 54**
- **Expo Router** — file-based navigation
- **Zustand** — global state management with AsyncStorage persistence
- **expo-av** — audio playback and recording
- **expo-haptics** — haptic feedback
- **expo-keep-awake** — screen management
- **TypeScript** throughout
- **Jest** + **React Native Testing Library** — unit tests
- **ESLint** + **Prettier** — code quality
- **EAS Build** — cloud builds and App Store / Google Play submission

---

## Project Structure

```
stealth-timer/
├── app/                      # Screens (Expo Router file-based routing)
│   ├── _layout.tsx           # Root layout, fonts, audio config, splash animation
│   ├── index.tsx             # Home screen (session configuration)
│   ├── countdown.tsx         # Timer screen with gym mode
│   ├── settings.tsx          # Settings screen
│   ├── soundPicker.tsx       # Sound selection screen
│   └── recordSound.tsx       # Custom sound recording screen
├── components/
│   ├── UI/
│   │   ├── Button.tsx        # Reusable button with haptics
│   │   ├── Slider.tsx        # Reusable slider
│   │   ├── Card.tsx          # Settings card container
│   │   ├── ListItem.tsx      # Tappable list row with chevron
│   │   ├── Toggle.tsx        # Switch row
│   │   └── SectionHeader.tsx # Uppercase section label
│   ├── Controls.tsx          # Stop/Start button pair
│   ├── Timer.tsx             # Countdown display with rest state
│   ├── Logo.tsx              # App logo
│   └── ScreenWrapper.tsx     # SafeAreaView wrapper
├── hooks/
│   ├── useTimer.ts           # Timer logic with rest periods and sound
│   ├── useSound.ts           # Sound playback with load state tracking
│   ├── useHaptics.ts         # Haptic feedback respecting settings
│   └── useKeepAwake.ts       # Screen keep awake respecting settings
├── store/
│   ├── useSessionStore.ts    # Round/rest/session settings (persisted)
│   └── useSettingsStore.ts   # Sound, haptics, keep awake (persisted)
├── types/
│   └── sounds.ts             # Shared sound types
├── constants/
│   ├── theme.ts              # Colors, typography, spacing tokens
│   └── storage.ts            # AsyncStorage keys
└── __tests__/
    ├── hooks/
    │   └── useTimer.test.ts
    └── components/
        └── TimerDisplay.test.tsx
```

---

## Getting Started

### Prerequisites

- Node.js v18 or later
- A development build or Expo Go app (iOS/Android)

### Installation

```bash
git clone https://github.com/DigOut25/Stealth-Timer
cd stealth-timer
npm install
npx expo start
```

### Running Tests

```bash
npm test               # run all tests
npm run test:watch     # watch mode
npm run test:coverage  # with coverage report
```

### Linting and Formatting

```bash
npm run lint           # check for issues
npm run lint:fix       # auto fix
npm run format         # format all files
```

---

## Architecture Decisions

**Zustand over Redux** — lightweight global state without boilerplate. `persist` middleware handles AsyncStorage automatically so all session and sound settings survive app restarts.

**Custom hooks for logic separation** — `useTimer`, `useSound`, `useHaptics` and `useKeepAwake` keep screens clean and logic independently testable.

**Refs alongside state in useTimer** — `isRestingRef` and `currentRoundRef` prevent stale closure issues inside `setInterval` callbacks while state values drive the UI.

**Sound load state tracking** — `isLoadedRef` in `useSound` prevents sounds firing before they are ready, fixing race conditions on cold start.

**File-based routing with Expo Router** — clean navigation structure, type-safe params, and easy deep linking.

**Barrel exports with direct imports** — components, hooks, stores and constants all have `index.ts` barrel files for clean imports, with direct file paths used within the components folder to avoid circular dependencies.

---

## Building for Production

This project uses EAS Build for production builds on both platforms.

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Production builds
npm run build:ios
npm run build:android

# Submit to stores
npm run submit:ios
npm run submit:android
```

---

## Available Scripts

```bash
npm run start              # Start dev server
npm run android            # Run on Android
npm run ios                # Run on iOS
npm run build:ios          # EAS production iOS build
npm run build:android      # EAS production Android build
npm run build:ios:dev      # EAS development iOS build
npm run build:android:dev  # EAS development Android build
npm run submit:ios         # Submit to App Store
npm run submit:android     # Submit to Google Play
npm run test               # Run tests
npm run lint               # Lint
npm run format             # Format
```

---

## Licence

Built for Stealth BJJ. All rights reserved.
