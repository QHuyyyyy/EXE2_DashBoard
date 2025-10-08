"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInFormData } from "@/lib/validations/auth";
import toast from "react-hot-toast";
import {
    Form,
    FormField,
    FormLabel,
    FormInput,
    FormError,
    FormButton
} from "../ui/form";
import { PasswordInput } from "../ui/password-input";
import { Checkbox } from "../FormElements/checkbox";

export default function SigninWithPassword() {
    const { login, isLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: "",
            password: "",
            remember: false,
        },
    });

    const onSubmit = async (data: SignInFormData) => {
        try {
            console.log('Starting login process...');
            const success = await login(data.username, data.password);
            console.log('Login result:', success);
            // No need to manually redirect here - AuthWrapper will handle it
            // if (success) {
            //     const redirectTo = searchParams.get('redirect') || '/';
            //     console.log('Redirecting to:', redirectTo);
            //     router.push(redirectTo);
            // }
        } catch (err) {
            console.error('Login error:', err);
            toast.error("An error occurred during login");
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormField>
                <FormLabel htmlFor="username" required>Username</FormLabel>
                <FormInput
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    icon={<EmailIcon />}
                    error={!!errors.username}
                    {...register("username")}
                />
                <FormError>{errors.username?.message}</FormError>
            </FormField>

            <FormField>
                <FormLabel htmlFor="password" required>Password</FormLabel>
                <PasswordInput
                    id="password"
                    placeholder="Enter your password"
                    icon={<PasswordIcon />}
                    error={!!errors.password}
                    {...register("password")}
                />
                <FormError>{errors.password?.message}</FormError>
            </FormField>

            <div className="flex items-center justify-between gap-2 py-2 font-medium">
                <Checkbox
                    label="Remember me"
                    withIcon="check"
                    minimal
                    radius="md"
                    {...register("remember")}
                    onChange={(e) => setValue("remember", e.target.checked)}
                />

                <Link
                    href="/auth/forgot-password"
                    className="hover:text-primary dark:text-white dark:hover:text-primary"
                >
                    Forgot Password?
                </Link>
            </div>

            <FormButton type="submit" loading={isLoading || isSubmitting}>
                Sign In
            </FormButton>
        </Form>
    );
}