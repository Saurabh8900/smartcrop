"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, Mail, Lock, User, Phone, MapPin, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

const STATES = [
    "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu",
    "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const SOIL_TYPES = [
    "Alluvial", "Black Cotton (Regur)", "Red Loamy", "Sandy Loam",
    "Clay", "Laterite", "Saline/Alkaline",
];

const IRRIGATION_TYPES = ["Drip Irrigation", "Sprinkler", "Canal", "Borewell", "Rainwater / Rainfed"];
const FARMER_TYPES = ["Marginal Farmer (< 1 acre)", "Small Farmer (1–2.5 acres)", "Semi-Medium Farmer (2.5–5 acres)", "Medium Farmer (5–10 acres)"];

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        village: "",
        district: "",
        state: "",
        soilType: "",
        irrigationType: "",
        landHolding: "",
        farmerType: "",
    });

    const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

    function validateStep1() {
        if (!form.name.trim()) return "Name is required";
        if (!form.email.includes("@")) return "Valid email required";
        if (form.password.length < 6) return "Password must be 6+ characters";
        if (form.password !== form.confirmPassword) return "Passwords don't match";
        return null;
    }

    function handleNextStep() {
        const err = validateStep1();
        if (err) { setError(err); return; }
        setError("");
        setStep(2);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!form.state) { setError("Please select your state"); return; }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    phone: form.phone,
                    village: form.village,
                    district: form.district,
                    state: form.state,
                    soilType: form.soilType,
                    irrigationType: form.irrigationType,
                    landHolding: form.landHolding,
                    farmerType: form.farmerType || "Small Farmer",
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Registration failed");
                setLoading(false);
                return;
            }

            router.push("/login?registered=1");
        } catch {
            setError("Network error. Please try again.");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-600 flex items-center justify-center px-4 py-12">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-900/30 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-lg">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex flex-col items-center gap-2">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
                            <Leaf className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-white font-bold text-2xl">SmartCrop Advisor</span>
                    </Link>
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    {/* Progress */}
                    <div className="flex items-center gap-3 mb-6">
                        {[1, 2].map((s) => (
                            <div key={s} className="flex items-center gap-2 flex-1">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s ? "bg-green-600 text-white" : "bg-gray-100 text-gray-400"
                                    }`}>
                                    {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                                </div>
                                <span className={`text-xs font-medium ${step >= s ? "text-green-700" : "text-gray-400"}`}>
                                    {s === 1 ? "Account" : "Farm Details"}
                                </span>
                                {s < 2 && <div className={`flex-1 h-0.5 ${step > s ? "bg-green-500" : "bg-gray-200"}`} />}
                            </div>
                        ))}
                    </div>

                    <h1 className="text-xl font-bold text-gray-900 mb-1">
                        {step === 1 ? "Create your account 🌱" : "Tell us about your farm 🏡"}
                    </h1>
                    <p className="text-gray-500 text-sm mb-6">
                        {step === 1 ? "Join 1 lakh+ farmers on SmartCrop" : "Help us personalize your advisory"}
                    </p>

                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-4 text-sm text-red-600">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    {/* Step 1 */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={set("name")}
                                        placeholder="Ramesh Patel"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={set("email")}
                                        placeholder="you@example.com"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={set("phone")}
                                        placeholder="+91 98765-43210"
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Password *</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="password"
                                            value={form.password}
                                            onChange={set("password")}
                                            placeholder="Min 6 chars"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password *</label>
                                    <input
                                        type="password"
                                        value={form.confirmPassword}
                                        onChange={set("confirmPassword")}
                                        placeholder="Repeat password"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition"
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleNextStep}
                                className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors mt-2"
                            >
                                Continue →
                            </button>
                        </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Village / Town</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            value={form.village}
                                            onChange={set("village")}
                                            placeholder="e.g. Nadiad"
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">District</label>
                                    <input
                                        type="text"
                                        value={form.district}
                                        onChange={set("district")}
                                        placeholder="e.g. Kheda"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">State *</label>
                                <select
                                    value={form.state}
                                    onChange={set("state")}
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition bg-white"
                                >
                                    <option value="">Select your state</option>
                                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Farmer Type</label>
                                <select
                                    value={form.farmerType}
                                    onChange={set("farmerType")}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition bg-white"
                                >
                                    <option value="">Select farmer type</option>
                                    {FARMER_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Soil Type</label>
                                    <select
                                        value={form.soilType}
                                        onChange={set("soilType")}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition bg-white"
                                    >
                                        <option value="">Select soil</option>
                                        {SOIL_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Irrigation</label>
                                    <select
                                        value={form.irrigationType}
                                        onChange={set("irrigationType")}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition bg-white"
                                    >
                                        <option value="">Select type</option>
                                        {IRRIGATION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Land Holding</label>
                                <input
                                    type="text"
                                    value={form.landHolding}
                                    onChange={set("landHolding")}
                                    placeholder="e.g. 2.5 acres"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 transition"
                                />
                            </div>

                            <div className="flex gap-3 mt-2">
                                <button
                                    type="button"
                                    onClick={() => { setStep(1); setError(""); }}
                                    className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-xl hover:border-gray-300 transition-colors"
                                >
                                    ← Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Registering...</>
                                    ) : (
                                        "Create Account 🌱"
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-green-600 font-semibold hover:text-green-700">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
