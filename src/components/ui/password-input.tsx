"use client";
import { cn } from "@/lib/utils";
import React, { forwardRef, useState } from "react";
import { EyeIcon, EyeOffIcon } from "@/assets/icons";

// Password Input Component with toggle visibility
interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    icon?: React.ReactNode;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, error, icon, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        return (
            <div className="relative">
                <input
                    ref={ref}
                    type={showPassword ? "text" : "password"}
                    className={cn(
                        "w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 px-5.5 py-3 text-dark placeholder:text-dark-6 dark:text-white dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary",
                        icon && "pl-12.5",
                        "pr-12.5", // Always add right padding for the toggle icon
                        error && "border-red focus:border-red",
                        className
                    )}
                    {...props}
                />
                {/* Left icon (password icon) */}
                {icon && (
                    <div className="absolute left-4.5 top-1/2 -translate-y-1/2 text-dark-6 dark:text-dark-6">
                        {icon}
                    </div>
                )}
                {/* Right icon (toggle visibility) */}
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4.5 top-1/2 -translate-y-1/2 text-dark-6 dark:text-dark-6 hover:text-primary dark:hover:text-primary transition-colors focus:outline-none"
                    tabIndex={-1}
                >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            </div>
        );
    }
);

PasswordInput.displayName = "PasswordInput";