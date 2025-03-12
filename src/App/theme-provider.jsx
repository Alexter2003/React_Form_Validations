"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => { } })

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("dark")

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark"
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
        document.documentElement.classList.toggle("dark", newTheme === "dark")
    }

    useEffect(() => {
        // Check for saved theme preference or use system preference
        const savedTheme =
            localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

        setTheme(savedTheme)
        document.documentElement.classList.toggle("dark", savedTheme === "dark")
    }, [])

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)

