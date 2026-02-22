import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generateAdvisory, generateFarmer, generateSoilSensors } from "@/lib/faker-data";
import {
    CheckCircle2,
    Leaf,
    Droplets,
    TrendingUp,
    Lightbulb,
    Clock,
    BadgeIndianRupee,
    FlaskConical,
    Tag,
} from "lucide-react";

function ConfidenceBadge({ label, score }) {
    const color =
        label === "High"
            ? "bg-green-100 text-green-700 border-green-200"
            : label === "Medium"
                ? "bg-amber-100 text-amber-700 border-amber-200"
                : "bg-gray-100 text-gray-600 border-gray-200";
    return (
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${color}`}>
            {label} confidence ({score}%)
        </span>
    );
}

function PriorityDot({ priority }) {
    const map = {
        High: "bg-red-500",
        Medium: "bg-amber-400",
        Low: "bg-gray-300",
    };
    return <span className={`inline-block w-2 h-2 rounded-full ${map[priority]}`} />;
}

export default function AdvisoryPage() {
    const advisories = generateAdvisory();
    const farmer = generateFarmer();
    const sensors = generateSoilSensors();

    const avgMoisture = (sensors.reduce((s, x) => s + x.moisture, 0) / sensors.length).toFixed(1);
    const avgPH = (sensors.reduce((s, x) => s + x.ph, 0) / sensors.length).toFixed(1);
    const avgN = (sensors.reduce((s, x) => s + x.nitrogen, 0) / sensors.length).toFixed(1);

    const seasons = ["Kharif", "Rabi", "Zaid"];

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-5 h-5 text-green-600" />
                        <h1 className="text-2xl font-bold text-gray-900">AI Crop Advisory</h1>
                    </div>
                    <p className="text-gray-500">
                        Personalized recommendations for {farmer.name} based on your soil sensors, weather data,
                        and historical yield patterns.
                    </p>
                </div>

                {/* Soil Context Bar */}
                <div className="bg-green-700 text-white rounded-2xl p-5 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                        <div className="text-green-300 text-xs mb-1">Avg Soil Moisture</div>
                        <div className="text-xl font-bold">{avgMoisture}%</div>
                    </div>
                    <div>
                        <div className="text-green-300 text-xs mb-1">Avg Soil pH</div>
                        <div className="text-xl font-bold">{avgPH}</div>
                    </div>
                    <div>
                        <div className="text-green-300 text-xs mb-1">Avg Nitrogen</div>
                        <div className="text-xl font-bold">{avgN} kg/ha</div>
                    </div>
                    <div>
                        <div className="text-green-300 text-xs mb-1">Soil Type</div>
                        <div className="text-xl font-bold">{farmer.soilType}</div>
                    </div>
                </div>

                {/* Season filter tabs */}
                <div className="flex gap-2 mb-6">
                    {["All", ...seasons].map((s) => (
                        <span
                            key={s}
                            className={`px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors ${s === "All"
                                    ? "bg-green-600 text-white"
                                    : "bg-white border border-green-200 text-gray-600 hover:bg-green-50"
                                }`}
                        >
                            {s}
                        </span>
                    ))}
                </div>

                {/* Advisory Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {advisories.map((adv, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl border border-green-100 shadow-sm p-6 card-hover"
                        >
                            {/* Card header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                                        🌾
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-900 text-lg">{adv.crop}</h3>
                                            <PriorityDot priority={adv.priority} />
                                            <span className="text-xs text-gray-400">{adv.priority} priority</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <ConfidenceBadge label={adv.confidenceLabel} score={adv.confidence} />
                                            <span className="text-xs text-gray-400">· {adv.season}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Confidence arc */}
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-green-700">{adv.confidence}%</div>
                                    <div className="text-[10px] text-gray-400">ML confidence</div>
                                </div>
                            </div>

                            {/* Main recommendation */}
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                    <p className="text-sm font-medium text-green-800">{adv.recommendedAction}</p>
                                </div>
                            </div>

                            {/* Metrics grid */}
                            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                                    <div>
                                        <div className="text-[10px] text-gray-400">Water Need</div>
                                        <div className="font-medium">{adv.waterRequirement}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FlaskConical className="w-3.5 h-3.5 text-purple-500" />
                                    <div>
                                        <div className="text-[10px] text-gray-400">Fertilizer Dose</div>
                                        <div className="font-medium">{adv.fertilizerDose}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                                    <div>
                                        <div className="text-[10px] text-gray-400">Expected Yield</div>
                                        <div className="font-medium">{adv.expectedYield}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <BadgeIndianRupee className="w-3.5 h-3.5 text-amber-500" />
                                    <div>
                                        <div className="text-[10px] text-gray-400">Est. Profit Margin</div>
                                        <div className="font-medium">₹{adv.profitMargin.toLocaleString("en-IN")}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Data basis chips */}
                            <div className="flex items-center gap-1.5 flex-wrap mb-3">
                                <span className="text-[10px] text-gray-400 mr-1">Based on:</span>
                                {adv.basis.map((b) => (
                                    <span key={b} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                        {b}
                                    </span>
                                ))}
                            </div>

                            {/* Tags */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <Tag className="w-3 h-3 text-gray-400" />
                                {adv.tags.map((tag) => (
                                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-10 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-2xl p-8 text-center">
                    <Leaf className="w-8 h-8 mx-auto mb-3 text-green-300" />
                    <h3 className="text-xl font-bold mb-2">Need Expert Help?</h3>
                    <p className="text-green-200 text-sm mb-4">
                        Call our Kisan Helpline for personalized advice from an agricultural expert in your language.
                    </p>
                    <a
                        href="tel:18001801551"
                        className="inline-flex items-center gap-2 bg-yellow-400 text-green-900 font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors"
                    >
                        📞 1800-180-1551 (Toll Free)
                    </a>
                </div>

            </div>

            <Footer />
        </div>
    );
}
