import { ImageStyle, TextStyle, ViewStyle } from "react-native"

type AppearanceProvider<T> = () => T

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

interface StyleSheetData<N extends string, T, S> {
  styles: Record<N, S>
  themes: Record<N, T>
  appearanceProvider: AppearanceProvider<N>
}

export function registerThemes<N extends string, T, R extends N>(
  themes: Record<N, T>,
  appearanceProvider: AppearanceProvider<R>
) {
  return <S extends NamedStyles<S> | NamedStyles<any>>(
    fn: (theme: T) => S
  ): StyleSheetData<N, T, S> => {
    const styles: any = {}
    for (const [name, theme] of Object.entries(themes)) {
      styles[name] = fn(theme as T)
    }
    return { styles, themes, appearanceProvider }
  }
}

export function useTheme<T, N extends string, S extends NamedStyles<S> | NamedStyles<any>>(
  data: StyleSheetData<N, T, S>,
  name?: N
): [NamedStyles<S>, T, N] {
  const resolvedName = name || data.appearanceProvider()
  const theme = data.themes[resolvedName]
  if (!theme) {
    throw new Error(`Theme not defined: ${resolvedName}`)
  }
  const styles = data.styles[resolvedName]

  return [styles, theme, resolvedName]
}
