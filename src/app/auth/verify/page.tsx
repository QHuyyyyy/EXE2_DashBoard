"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import api from "@/services/api";

export default function VerifyPage() {
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const submit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        try {
            setLoading(true);
            await api.post("/Auth/verify-email", { token });

            toast.success("Email verified successfully");
            setSuccess(true);
        } catch (err: any) {
            console.error("Verify error", err);
            const msg = err?.response?.data?.message || err?.message || "Verification failed";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md rounded-[10px] bg-white shadow-1 p-6">
                <h2 className="mb-4 text-lg font-semibold">Verify your email</h2>

                {!success ? (
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Verification token (OTP)</label>
                            <input
                                type="text"
                                required
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                                placeholder="Enter OTP"
                                className="mt-1 block w-full rounded border border-stroke px-3 py-2"
                            />
                        </div>

                        <div className="flex items-center justify-between gap-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center justify-center rounded bg-primary px-4 py-2 text-white"
                            >
                                {loading ? "Verifying..." : "Verify"}
                            </button>

                            <Link href="/auth/sign-in" className="text-sm text-gray-600">
                                Back to login
                            </Link>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <p className="text-green-600">Your email has been verified.</p>
                        <Link href="/auth/sign-in" className="inline-flex items-center justify-center rounded bg-primary px-4 py-2 text-white">
                            Back to login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
