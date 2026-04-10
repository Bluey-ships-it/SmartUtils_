# Smart Utility Toolkit

A React Native mobile app built with Expo that bundles five everyday utility tools into one clean interface.

## Tools

- **Unit Converter** — Length, weight, volume, speed, and distance
- **Currency Converter** — NGN, USD, EUR, GBP, GHS, KES, CAD, JPY (static rates)
- **BMI Calculator** — Metric and imperial, with category feedback
- **Temperature Converter** — Celsius, Fahrenheit, and Kelvin
- **Stopwatch** — Start, pause, and reset with centisecond precision

## Tech Stack

- React Native + Expo
- TypeScript
- React Navigation (Native Stack)
- React Context (theme management)
- `@expo/vector-icons` (Ionicons)
- `react-native-safe-area-context`

## Notes

- Currency rates are static MVP values — swap the `rateToUSD` values in `constants/currencies.ts` for live API rates when ready
- Light and dark mode toggle is available on the home screen
- No authentication or backend required