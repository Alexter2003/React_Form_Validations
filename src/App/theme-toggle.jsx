"use client"

import { Moon, Sun } from "lucide-react"

import { useTheme } from "./theme-provider"
import { Button } from "./../components/ui/button"

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="fixed top-4 right-4 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white"
        >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}

