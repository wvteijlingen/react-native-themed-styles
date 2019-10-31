import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { useColorScheme } from "react-native-appearance"

interface Theme {}

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

export function styleCreator<N extends string, T extends Theme>(themes: Record<N, T>) {
  return <S extends NamedStyles<S> | NamedStyles<any>>(fn: (theme: T) => S): Record<N, { theme: T, styles: S }> => {
    const styles: any = {}
    for(const [name, theme] of Object.entries(themes)) {
      styles[name] = { theme, styles: fn(theme as T) }
    }
    return styles
  }
}

export function useTheme<T, N extends string, S extends NamedStyles<S> | NamedStyles<any>>(styles: Record<N, { theme: T, styles: S }>, name?: N): [NamedStyles<S>, T, N] {
  const colorScheme: N = useColorScheme()
  const themeName = name || colorScheme
  const config = styles[themeName]

  if(!config) {
    throw new Error(`Theme not defined: ${themeName}`)
  }

  return [config.styles, config.theme, themeName]
}
