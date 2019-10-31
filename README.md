# react-native-themed-styles

## Installation

This package relies on the `useColorScheme` hook in `react-native-appearance` to get the system theme.
You will need to install that as well if you want to automatically switch themes based on the system
setting. Don't forget to wrap your application in an `<AppearanceProvider>` if you use `react-native-appearance`.

**Using Yarn**

```
yarn add -D react-native-themed-styles react-native-appearance
```

**Using NPM**

```
npm install --save-dev react-native-themed-styles react-native-appearance
```

**Using copy/paste**

If you want to keep your dependencies low and don't care about upstream updates, you can also just copy the index file into your own repository.

## Usage

Define your themes:

```ts
// themes.ts

import { styleCreator } from "react-native-themed-styles"

const light = { backgroundColor: "white", textColor: "black" }
const dark  = { backgroundColor: "black", textColor: "white" }
const dusk  = { backgroundColor: "lightbrown", textColor: "darkbrown" }

const createStyles = styleCreator({ light, dark, dusk })

export { createStyles }
```

Use your themes:

```tsx
// my-component.tsx

import { useTheme } from "react-native-themed-styles"
import { createStyles } from "./themes"

const MyComponent = () => {
  const [styles] = useTheme(themedStyles)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello there</Text>
    </View>
  )
}

const themedStyles = createStyles(theme => ({
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1
  },
  text: {
    color: theme.textColor
  }
}))
```

## Overriding the system theme

By default, `useTheme` uses the system theme (light or dark). You can override this by
specifying a theme name as the second argument:

```ts
const [styles] = useTheme(themedStyles, "dusk")
```

## Retrieving the raw theme and theme name

`useTheme` returns the following data in a tuple:

```ts
[
  styles,   // The styles with the theme applied.
  theme,    // The raw theme that was applied.
  themeName // The name of the applied theme.
] = useTheme(themedStyles)
```
