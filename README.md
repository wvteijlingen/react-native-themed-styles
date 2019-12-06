![](https://github.com/wvteijlingen/react-native-themed-styles/workflows/Node%20CI/badge.svg)

# react-native-themed-styles

A small package that allows you to create custom UI themes and use them throughout your app with a useTheme hook.

It does not impose any structure on your theme, which means you can use it not only for light/dark mode, but also for spacing, fonts or whatever you dream up.

- No dependencies
- Simple and clear API
- Fully typed
- No new concepts to learn, it builds on StyleSheets and hooks

## Installation

**Using Yarn**

```
yarn add -D react-native-themed-styles
```

**Using NPM**

```
npm install --save-dev react-native-themed-styles
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
  { light, dark }, // All themes you want to use.
  () => "light" // A function that returns the name of the default theme.
)

export { createStyles }
```

Use your themes:

```tsx
// my-component.tsx

import { useTheme } from "react-native-themed-styles"
import { createStyles } from "./themes"

// Create a themed StyleSheet by using the `createStyles` function that you
// exported from themes.ts.
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
  // Retrieve the computed styles with a theme applied using the useTheme hook.
  const [styles] = useTheme(themedStyles)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello there</Text>
    </View>
  )
}
```

## Mirroring the OS theme

You most likely want your app to automatically switch themes based on the OS theme, i.e. dark or light mode.
You can easily implement this using the `react-native-appearance` package.

Passing its `useColorScheme` hook as the second argument of `styleCreator`, it will use the OS theme by default.

```ts
import { useColorScheme } from "react-native-appearance"
import { styleCreator } from "react-native-themed-styles"

const createStyles = styleCreator({ light, dark }), useColorScheme)
```

## API

### Function: `styleCreator(themes, appearanceProvider)`

Use this function to register your themes. This will return an anonymous function that you can use to create a themed StyleSheet.

**Parameters**

- `themes`: An object containing all your themes, keyed by name.
- `appearanceProvider`: A function that returns the name of the default theme. If you want your app to match the OS theme, you can query the OS in this function and return the appropriate theme name,

**Returns**

```
function createStyles(stylesheetBuilder)
```

A function that you can use to create a themed StyleSheet.

### Function: `useTheme(themedStyles, themeName)`

Use this function to retrieve component styles with a theme applied.

**Parameters**

- `themedStyles`: A themed StyleSheet as returned from the `createStyles` function.
- `themeName`: Optional string defining which theme to apply. If not passed, it applies the theme returned by the `appearanceProvider` that you passed to the `styleCreator` function.

**Returns**

```
[styles, theme, themeName]
```

A tuple containing the following entries:

- `styles`: The styles with the theme applied
- `theme`: The raw theme that was applied.
- `themeName`: The name of the applied theme.
