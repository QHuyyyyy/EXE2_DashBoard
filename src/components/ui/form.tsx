import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

// Form Root Component
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <form ref={ref} className={cn("space-y-6", className)} {...props}>
                {children}
            </form>
        );
    }
);

Form.displayName = "Form";

// Form Field Component
interface FormFieldProps {
    children: React.ReactNode;
    className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ children, className }) => {
    return <div className={cn("space-y-2", className)}>{children}</div>;
};

// Form Label Component
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
    children: React.ReactNode;
}

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
    ({ children, className, required, ...props }, ref) => {
        return (
            <label
                ref={ref}
                className={cn(
                    "text-body-sm font-medium text-dark dark:text-white",
                    className
                )}
                {...props}
            >
                {children}
                {required && <span className="ml-1 select-none text-red">*</span>}
            </label>
        );
    }
);

FormLabel.displayName = "FormLabel";

// Form Input Component
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ className, error, icon, iconPosition = "left", ...props }, ref) => {
        return (
            <div className="relative">
                <input
                    ref={ref}
                    className={cn(
                        "w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 px-5.5 py-3 text-dark placeholder:text-dark-6 dark:text-white dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary",
                        icon && iconPosition === "left" && "pl-12.5",
                        icon && iconPosition === "right" && "pr-12.5",
                        error && "border-red focus:border-red",
                        className
                    )}
                    {...props}
                />
                {icon && (
                    <div
                        className={cn(
                            "absolute top-1/2 -translate-y-1/2 text-dark-6 dark:text-dark-6",
                            iconPosition === "left" ? "left-4.5" : "right-4.5"
                        )}
                    >
                        {icon}
                    </div>
                )}
            </div>
        );
    }
);

FormInput.displayName = "FormInput";

// Form Error Message Component
interface FormErrorProps {
    children?: React.ReactNode;
    className?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ children, className }) => {
    if (!children) return null;

    return (
        <p className={cn("text-sm text-red", className)}>
            {children}
        </p>
    );
};

// Form Button Component
interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: React.ReactNode;
}

export const FormButton = forwardRef<HTMLButtonElement, FormButtonProps>(
    ({ children, className, loading, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={cn(
                    "flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:opacity-50",
                    className
                )}
                {...props}
            >
                {children}
                {loading && (
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent" />
                )}
            </button>
        );
    }
);

FormButton.displayName = "FormButton";