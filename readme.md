
# Smart Utility Toolkit

A React Native mobile app built with Expo that bundles four utility modules into one clean interface.

## Utilities

### 🔄 Conversion
- Unit Converter — Length, weight, volume, speed and distance
- Temperature Converter — Celsius, Fahrenheit and Kelvin
- Currency Converter — NGN, USD, EUR, GBP, GHS, KES, CAD, JPY (static rates)

### 🧮 Calculator
- BMI Calculator — Metric and imperial with category feedback
- Tip Calculator — Bill amount, tip presets and per person split
- Bill Split — Total bill, optional tip and equal split across people

### 📝 Text Tools
- Word Count — Words, sentences, paragraphs and reading time
- Character Count — Total, letters, numbers, spaces and special characters
- Case Converter — Upper, lower, title, sentence, camelCase, snake_case and kebab-case with clipboard copy

### ⏱ Time Tools
- Stopwatch — Start, pause and reset with centisecond precision
- Countdown Timer — Preset durations with progress bar and finished state

## Tech Stack

- React Native + Expo
- TypeScript
- React Navigation (Native Stack)
- `@expo/vector-icons` (Ionicons)
- `react-native-safe-area-context`
- `expo-clipboard`

## Notes

- Currency rates are static MVP values — swap the `rateToUSD` values in `constants/currencies.ts` for live API rates when ready
- No authentication or backend required
