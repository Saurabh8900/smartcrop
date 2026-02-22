"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Leaf, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

const DEMO_USERS = [
    { name: "Ramesh Patel", email: "ramesh@demo.com" },
    { name: "Sunita Yadav", email: "sunita@demo.com" },
    { name: "Harish Singh", email: "harish@demo.com" },
];

export default function LoginPage() {
    const router = useRouter(); const searchParams = useSearchParams();
    const registered = searchParams.get("registered") === "1"; const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            setError("Invalid email or password. Please try again.");
            return;
        }

        router.push("/dashboard");
        router.refresh();
    }

    function fillDemo(demoEmail) {
        setEmail(demoEmail);
        setPassword("demo1234");
        setError("");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-600 flex items-center justify-center px-4 py-12">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-900/30 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex flex-col items-center gap-2">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
                            <Leaf className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-white font-bold text-2xl">SmartCrop Advisor</span>
                        <span className="text-green-200 text-sm">AI-Driven Crop Advisory Platform</span>
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back 👋</h1>
                    <p className="text-gray-500 text-sm mb-6">Sign in to your SmartCrop account</p>

                    {/* Demo login buttons */}
                    <div className="mb-6">
                        <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wider">Quick Demo Login</p>
                        <div className="grid grid-cols-3 gap-2">
                            {DEMO_USERS.map((u) => (
                                <button
                                    key={u.email}
                                    type="button"
                                    onClick={() => fillDemo(u.email)}
                                    className="text-xs px-2 py-2 rounded-lg bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 transition-colors font-medium text-center leading-tight"
                                >
                                    {u.name.split(" ")[0]}
                                </button>
                            ))}
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1.5 text-center">Password for all demo accounts: <code className="bg-gray-100 px-1 rounded">demo1234</code></p>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400">or sign in manually</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Registration success */}
                    {registered && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl mb-4 text-sm text-green-700">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            Account created! Sign in with your credentials.
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-4 text-sm text-red-600">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type={showPw ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPw(!showPw)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        New farmer?{" "}
                        <Link href="/register" className="text-green-600 font-semibold hover:text-green-700">
                            Register here
                        </Link>
                    </p>
                </div>

                <p className="text-center text-green-300 text-xs mt-6">
                    Kisan Helpline: 1800-180-1551 · Free for small & marginal farmers
                </p>
            </div>
        </div>
    );
}
