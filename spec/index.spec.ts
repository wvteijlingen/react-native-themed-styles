import { styleCreator, useTheme } from ".."

const lightTheme = { backgroundColor: "white" }
const darkTheme = { backgroundColor: "black" }

const createStyles = styleCreator({ light: lightTheme, dark: darkTheme }, () => "light")

const themedStyles = createStyles(theme => ({
  container: {
    backgroundColor: theme.backgroundColor
  }
}))

describe("useTheme with explicit theme name", function() {
  it("should return the correct data", function() {
    const [styles, theme, name] = useTheme(themedStyles, "dark")
    expect(styles.container.backgroundColor).toEqual("black")
    expect(theme).toEqual(darkTheme)
    expect(name).toEqual("dark")
  })
})

describe("useTheme without explicit theme name", function() {
  it("should return the correct data", function() {
    const [styles, theme, name] = useTheme(themedStyles)
    expect(styles.container.backgroundColor).toEqual("white")
    expect(theme).toEqual(lightTheme)
    expect(name).toEqual("light")
  })
})
