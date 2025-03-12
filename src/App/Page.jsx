import { ThemeProvider } from "./theme-provider"
import { ThemeToggle } from "./theme-toggle"
import ValidationForm from "../form-validations"
import PasswordStrengthIndicator from "../validation-indicators"

export default function Home() {
    return (
        <ThemeProvider>
            <div className="dark min-h-screen bg-gray-950 text-gray-100">
                <ThemeToggle />
                <main className="container mx-auto py-10 px-4">
                    <h1 className="text-3xl font-bold text-center mb-8">React Form Validation </h1>

                    {/* Layout grid - one column on mobile, two columns on medium screens and up */}
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Main registration form */}
                        <div>
                            <ValidationForm />
                        </div>
                        {/* Password strength indicator component */}
                        <div>
                            <PasswordStrengthIndicator />
                        </div>
                    </div>
                </main>
            </div>
        </ThemeProvider>
    )
}

