"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpFormData } from "@/lib/validations/auth";
import {
    Form,
    FormField,
    FormLabel,
    FormInput,
    FormError,
    FormButton,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { UserService } from "@/services/user.service";


interface Props {
    isOpen: boolean;
    onClose: () => void;
    onCreated?: () => void;
}

export default function UserCreateModal({ isOpen, onClose, onCreated }: Props) {
    const [createdEmail, setCreatedEmail] = useState<string | null>(null);
    // fixed roles (no API endpoint available)
    const [roles] = useState<string[]>(["admin", "manager", "lander", "user"]);

    type FormData = SignUpFormData & { role: string };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<any>({
        resolver: zodResolver(signUpSchema) as any,
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: 'user',
        }
    });

    const onSubmit = async (data: any) => {
        try {
            const payload = {
                username: data.username,
                email: data.email,
                password: data.password,
                role: data.role || 'user'
            };

            await UserService.createUser(payload);
            toast.success('User created. Please verify the email.');
            setCreatedEmail(data.email);
            if (onCreated) onCreated();
        } catch (err: any) {
            console.error('Create user failed', err);
            toast.error(err?.message || 'Create user failed');
        }
    };

    if (!isOpen) return null;



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-xl font-semibold">Create User</h3>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormField>
                        <FormLabel htmlFor="username" required>Username</FormLabel>
                        <FormInput id="username" placeholder="Username" {...register('username')} error={!!errors.username} />
                        <FormError>{errors.username?.message as unknown as string}</FormError>
                    </FormField>

                    <FormField>
                        <FormLabel htmlFor="email" required>Email</FormLabel>
                        <FormInput id="email" type="email" placeholder="Email" {...register('email')} error={!!errors.email} />
                        <FormError>{errors.email?.message as unknown as string}</FormError>
                    </FormField>
                    <FormField>
                        <FormLabel htmlFor="role" required>Role</FormLabel>
                        <select
                            id="role"
                            {...register('role', { required: 'Role is required' })}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 px-5.5 py-3 text-dark placeholder:text-dark-6 dark:text-white dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
                        >
                            {roles && roles.length ? (
                                roles.map((r) => (
                                    <option key={r} value={r}>{r}</option>
                                ))
                            ) : (
                                <option value="user">user</option>
                            )}
                        </select>
                        <FormError>{errors.role?.message as unknown as string}</FormError>
                    </FormField>
                    <FormField>
                        <FormLabel htmlFor="password" required>Password</FormLabel>
                        <FormInput id="password" type="password" placeholder="Password" {...register('password')} error={!!errors.password} />
                        <FormError>{errors.password?.message as unknown as string}</FormError>
                    </FormField>



                    <FormField>
                        <FormLabel htmlFor="confirmPassword" required>Confirm Password</FormLabel>
                        <FormInput id="confirmPassword" type="password" placeholder="Confirm Password" {...register('confirmPassword')} error={!!errors.confirmPassword} />
                        <FormError>{errors.confirmPassword?.message as unknown as string}</FormError>
                    </FormField>

                    <div className="flex items-center gap-3 mt-4">
                        <FormButton type="submit" loading={isSubmitting}>Create</FormButton>
                        <button type="button" onClick={onClose} className="ml-auto text-sm text-gray-600">Cancel</button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
