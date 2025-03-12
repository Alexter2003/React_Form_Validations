"use client"

import { useState, useEffect } from "react"
import { Label } from "./components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { CheckCircle2, XCircle } from "lucide-react"
import { Input } from "./components/ui/input"

export default function PasswordStrengthIndicator() {
    // State to store the password input
    const [password, setPassword] = useState("")

    // State to track which validation criteria are met
    const [validations, setValidations] = useState({
        length: false, // At least 8 characters
        uppercase: false, // Has uppercase letter
        lowercase: false, // Has lowercase letter
        number: false, // Has number
        special: false, // Has special character
    })

    // Update validations whenever password changes
    useEffect(() => {
        setValidations({
            length: password.length >= 8, // Check length
            uppercase: /[A-Z]/.test(password), // Check for uppercase
            lowercase: /[a-z]/.test(password), // Check for lowercase
            number: /[0-9]/.test(password), // Check for numbers
            special: /[^A-Za-z0-9]/.test(password), // Check for special chars
        })
    }, [password]) // Run effect when password changes

    // Calculate password strength based on criteria met
    const getPasswordStrength = () => {
        // Count how many criteria are met
        const criteriaCount = Object.values(validations).filter(Boolean).length

        // Return strength level based on criteria count
        if (criteriaCount === 0) return { strength: 0, label: "Very Weak", color: "bg-gray-200" }
        if (criteriaCount === 1) return { strength: 20, label: "Very Weak", color: "bg-red-500" }
        if (criteriaCount === 2) return { strength: 40, label: "Weak", color: "bg-orange-500" }
        if (criteriaCount === 3) return { strength: 60, label: "Medium", color: "bg-yellow-500" }
        if (criteriaCount === 4) return { strength: 80, label: "Strong", color: "bg-blue-500" }
        return { strength: 100, label: "Very Strong", color: "bg-green-500" }
    }

    // Get current strength information
    const strengthInfo = getPasswordStrength()

    return (
        <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-800 shadow-xl">
            <CardHeader>
                <CardTitle className="text-white">Password Strength Validator</CardTitle>
                <CardDescription className="text-gray-400">See real-time feedback as you type your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Password input field */}
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update state on input
                        placeholder="Enter a strong password"
                    />
                </div>

                {/* Strength meter */}
                <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-300">Strength: {strengthInfo.label}</div>
                    {/* Progress bar for visual strength indicator */}
                    <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${strengthInfo.color} transition-all duration-300`}
                            style={{ width: `${strengthInfo.strength}%` }} // Dynamic width based on strength
                        />
                    </div>
                </div>

                {/* Requirements checklist */}
                <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-300">Requirements:</div>
                    <ul className="space-y-1 text-sm">
                        {/* Length requirement */}
                        <li className="flex items-center gap-2">
                            {
                                validations.length ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                    // Show check if valid
                                    <XCircle className="h-4 w-4 text-red-500" />
                                ) // Show X if invalid
                            }
                            At least 8 characters
                        </li>
                        {/* Uppercase requirement */}
                        <li className="flex items-center gap-2">
                            {validations.uppercase ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            At least one uppercase letter
                        </li>
                        {/* Lowercase requirement */}
                        <li className="flex items-center gap-2">
                            {validations.lowercase ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            At least one lowercase letter
                        </li>
                        {/* Number requirement */}
                        <li className="flex items-center gap-2">
                            {validations.number ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            At least one number
                        </li>
                        {/* Special character requirement */}
                        <li className="flex items-center gap-2">
                            {validations.special ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            At least one special character
                        </li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}

