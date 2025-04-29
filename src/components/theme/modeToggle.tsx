import { FiMoon, FiSun } from "react-icons/fi";
import { useThemeContext } from './themeProvider'

export function ModeToggle() {
  const { isDarkMode, toggleDarkMode } = useThemeContext()

  return (
    <button
      onClick={toggleDarkMode}
      className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-[var(--color-hover)] focus:ring-2 focus:ring-[var(--color-primary)]"
      style={{ color: "var(--color-primary)" }}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
    </button>
  )
}
