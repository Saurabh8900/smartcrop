"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    Leaf,
    LayoutDashboard,
    CloudSun,
    Bug,
    TrendingUp,
    Users,
    Lightbulb,
    Menu,
    X,
    Bell,
    ChevronDown,
} from "lucide-react";

const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/advisory", label: "Advisory", icon: Lightbulb },
    { href: "/weather", label: "Weather", icon: CloudSun },
    { href: "/pest-risk", label: "Pest Risk", icon: Bug },
    { href: "/market", label: "Market", icon: TrendingUp },
    { href: "/community", label: "Community", icon: Users },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href) => pathname === href;

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-green-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="p-1.5 bg-green-600 rounded-lg group-hover:bg-green-700 transition-colors">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <div className="leading-tight">
                            <span className="font-bold text-green-800 text-lg">SmartCrop</span>
                            <span className="block text-[10px] text-green-500 font-medium -mt-1 tracking-wider uppercase">Advisor</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive(href)
                                        ? "bg-green-100 text-green-800"
                                        : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Right side */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Notification bell */}
                        <button className="relative p-2 rounded-lg text-gray-500 hover:bg-green-50 hover:text-green-700 transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full pulse-green" />
                        </button>

                        {/* Language Selector */}
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-green-200 text-sm text-green-700 hover:bg-green-50 transition-colors">
                            <span className="text-xs">🇮🇳</span> Hindi
                            <ChevronDown className="w-3.5 h-3.5" />
                        </button>

                        {/* CTA */}
                        <Link
                            href="/dashboard"
                            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                        >
                            Open App
                        </Link>
                    </div>

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-green-50"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-green-100 bg-white px-4 pb-4 pt-2 space-y-1">
                    {navLinks.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive(href)
                                    ? "bg-green-100 text-green-800"
                                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </Link>
                    ))}
                    <div className="pt-2 border-t border-green-100">
                        <Link
                            href="/dashboard"
                            onClick={() => setMobileOpen(false)}
                            className="block text-center px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Open App
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
