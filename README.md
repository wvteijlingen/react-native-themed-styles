![](https://github.com/wvteijlingen/react-native-themed-styles/workflows/Node%20CI/badge.svg)

# react-native-themed-styles

## Installation

**Using Yarn**

```
yarn add -D react-native-themed-styles react-native-appearance
```

**Using NPM**

```
npm install --save-dev react-native-themed-styles react-native-appearance
```

**Using copy/paste**

If you want to keep your dependencies low and don't care about upstream updates, you can also just
copy the index file into your own repository.

## Usage

Define your themes:

```ts
// themes.ts

import { styleCreator } from "react-native-themed-styles"

const light = { backgroundColor: "white", textColor: "black" }
const dark = { backgroundColor: "black", textColor: "white" }

const createStyles = styleCreator(
  { light, dark }), // All themes you want to use.
  () => "light" // A function that returns the name of the default theme.
)

export { createStyles }
```

Use your themes:

```tsx
// my-component.tsx

import { useTheme } from "react-native-themed-styles"
import { createStyles } from "./themes"

const themedStyles = createStyles(theme => ({
  container: {
    backgroundColor: theme.backgroundColor,
    flex: 1
  },
  text: {
    color: theme.textColor
  }
}))

const MyComponent = () => {
  const [styles] = useTheme(themedStyles)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello there</Text>
    </View>
  )
}
```

## Using the system theme

You can use the `react-native-appearance` package to retrieve the default system theme.
Using the `useColorScheme` hook as the second argument of `styleCreator`, it will use the system theme
when you don't specify a theme in the `useTheme` hook.

```ts
import { useColorScheme } from "react-native-appearance"
const createStyles = styleCreator({ light, dark }), useColorScheme)
```

## Retrieving the raw theme and theme name

`useTheme` returns the following data in a tuple:

```ts
;[
  styles, // The styles with the theme applied.
  theme, // The raw theme that was applied.
  themeName // The name of the applied theme.
] = useTheme(themedStyles)
```
