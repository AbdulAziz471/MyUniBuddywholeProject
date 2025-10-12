import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    const root = window.document.documentElement
    const initialTheme = localStorage.getItem("theme") as "dark" | "light" || "dark"
    
    setTheme(initialTheme)
    
    if (initialTheme === "light") {
      root.classList.add("light")
    } else {
      root.classList.remove("light")
    }
  }, [])

  const toggleTheme = () => {
    const root = window.document.documentElement
    const newTheme = theme === "dark" ? "light" : "dark"
    
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    
    if (newTheme === "light") {
      root.classList.add("light")
    } else {
      root.classList.remove("light")
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}