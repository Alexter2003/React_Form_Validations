"use client"

import { useState } from "react"
import { z } from "zod" // Import Zod for validation
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./components/ui/form"

import { CheckCircle2 } from "lucide-react"
import { Input } from "./components/ui/input"
import { toast } from "./hooks/use-toast"

// Define validation schema using Zod
const formSchema = z
    .object({
        // Username: 3-20 chars, only letters, numbers, underscores
        username: z
            .string()
            .min(3, { message: "Username must be at least 3 characters" })
            .max(20, { message: "Username cannot exceed 20 characters" })
            .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers and underscores" }),

        // Email: must be valid email format
        email: z.string().email({ message: "Please enter a valid email address" }),

        // Password: 8+ chars with uppercase, lowercase, number, special char
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
            .regex(/[0-9]/, { message: "Password must contain at least one number" })
            .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),

        // Confirm password field
        confirmPassword: z.string(),

        // Age: must be number between 18-120
        age: z
            .string()
            .refine((val) => !isNaN(Number(val)), { message: "Age must be a number" })
            .refine((val) => Number(val) >= 18 && Number(val) <= 120, { message: "Age must be between 18 and 120" }),

        // Phone: optional, must match format if provided
        phone: z
            .string()
            .regex(/^\+?[0-9]{10,15}$/, { message: "Please enter a valid phone number" })
            .optional()
            .or(z.literal("")),
        // Custom validation to check if passwords match
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Shows error on confirmPassword field
    })

export default function ValidationForm() {
    // State to track form submission status
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Initialize form with react-hook-form and zod resolver
    const form = useForm({
        resolver: zodResolver(formSchema), // Connect Zod validation to form
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            age: "",
            phone: "",
        },
    })

    // Handle form submission
    async function onSubmit(values) {
        setIsSubmitting(true) // Show loading state

        try {
            // Simulate API call (replace with real API call)
            await new Promise((resolve) => setTimeout(resolve, 1500))
            console.log(values)

            // Show success message using toast notification
            toast({
                title: "Form submitted successfully!",
                description: "All validations passed.",
            })

            setIsSubmitted(true) // Show success state
        } catch (error) {
            console.log(error)
            toast({
                title: "Something went wrong",
                description: "Please try again later.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false) // Hide loading state
        }
    }

    // Show success message after form submission
    if (isSubmitted) {
        return (
            <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-800 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-green-400 flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-6 w-6" />
                        Submission Successful
                    </CardTitle>
                    <CardDescription className="text-center text-gray-400">Thank you for completing the form!</CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button
                        className="w-full"
                        onClick={() => {
                            form.reset() // Reset form values
                            setIsSubmitted(false) // Show form again
                        }}
                    >
                        Submit Another Form
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    // Main form UI
    return (
        <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-800 shadow-xl">
            <CardHeader>
                <CardTitle className="text-white">Registration Form</CardTitle>
                <CardDescription className="text-gray-400">
                    Please fill out all required fields with valid information.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Username field */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Username <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="johndoe" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Your unique username (3-20 characters, letters, numbers, underscores only)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password field */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Password <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Must be at least 8 characters with uppercase, lowercase, number, and special character
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password field */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Confirm Password <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Age field */}
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Age <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" min="18" max="120" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Phone field (optional) */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+1234567890" {...field} />
                                    </FormControl>
                                    <FormDescription>Optional. Format: country code + number (10-15 digits)</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit button with loading state */}
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

