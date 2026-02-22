import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PestRiskHistoryChart } from "@/components/charts/PestRiskChart";
import {
    generatePestRisks,
    generateCurrentWeather,
    generatePestRiskHistory,
} from "@/lib/faker-data";
import { Bug, AlertTriangle, CheckCircle2, ShieldAlert, FlaskConical, CloudRain } from "lucide-react";

function RiskBadge({ level, color }) {
    const map = {
        red: "bg-red-100 text-red-700 border-red-200",
        amber: "bg-amber-100 text-amber-700 border-amber-200",
        green: "bg-green-100 text-green-700 border-green-200",
    };
    return (
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${map[color]}`}>
            {level} Risk
        </span>
    );
}

function RiskScoreBar({ score, color }) {
    const barColor = color === "red" ? "bg-red-500" : color === "amber" ? "bg-amber-400" : "bg-green-500";
    return (
        <div className="w-full bg-gray-100 rounded-full h-2 mt-1">
            <div
                className={`${barColor} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${score}%` }}
            />
        </div>
    );
}

export default function PestRiskPage() {
    const pestRisks = generatePestRisks();
    const weather = generateCurrentWeather();
    const history = generatePestRiskHistory();

    const highRisk = pestRisks.filter((p) => p.riskLevel === "High");
    const medRisk = pestRisks.filter((p) => p.riskLevel === "Medium");
    const lowRisk = pestRisks.filter((p) => p.riskLevel === "Low");

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <Bug className="w-5 h-5 text-red-500" />
                        <h1 className="text-2xl font-bold text-gray-900">Pest & Disease Risk</h1>
                    </div>
                    <p className="text-gray-500">ML-based predictions updated every 6 hours using weather, soil and historical outbreak data.</p>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {[
                        { label: "High Risk Crops", count: highRisk.length, color: "red", icon: ShieldAlert, bg: "bg-red-50 border-red-200", text: "text-red-700" },
                        { label: "Medium Risk Crops", count: medRisk.length, color: "amber", icon: AlertTriangle, bg: "bg-amber-50 border-amber-200", text: "text-amber-700" },
                        { label: "Low Risk Crops", count: lowRisk.length, color: "green", icon: CheckCircle2, bg: "bg-green-50 border-green-200", text: "text-green-700" },
                    ].map(({ label, count, icon: Icon, bg, text }) => (
                        <div key={label} className={`rounded-2xl border p-5 flex items-center gap-4 ${bg}`}>
                            <Icon className={`w-8 h-8 ${text}`} />
                            <div>
                                <div className={`text-3xl font-bold ${text}`}>{count}</div>
                                <div className={`text-sm ${text} opacity-80`}>{label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Weather impact banner */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8 flex flex-wrap items-center gap-4">
                    <CloudRain className="w-8 h-8 text-blue-500 shrink-0" />
                    <div>
                        <div className="font-semibold text-blue-800">Current Weather Influence on Pest Risk</div>
                        <div className="text-sm text-blue-600">
                            Temp: {weather.temp}°C · Humidity: {weather.humidity}% · {weather.condition} —{" "}
                            {weather.humidity > 70
                                ? "⚠️ High humidity increases fungal disease risk. Monitor crops closely."
                                : "Normal conditions. Continue regular scouting."}
                        </div>
                    </div>
                </div>

                {/* Risk Trend Chart */}
                <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm mb-8">
                    <h2 className="font-bold text-gray-900 mb-1">Pest Risk Trend (8 Weeks)</h2>
                    <p className="text-xs text-gray-400 mb-4">Historical ML risk scores — higher = greater outbreak probability</p>
                    <PestRiskHistoryChart data={history} />
                </div>

                {/* Pest Risk Cards */}
                <h2 className="text-lg font-bold text-gray-900 mb-4">Crop-wise Pest Risk Assessment</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {pestRisks.map((pest, i) => (
                        <div
                            key={i}
                            className={`bg-white rounded-2xl border shadow-sm p-6 card-hover ${pest.riskLevel === "High"
                                    ? "border-red-200"
                                    : pest.riskLevel === "Medium"
                                        ? "border-amber-200"
                                        : "border-green-200"
                                }`}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${pest.riskLevel === "High" ? "bg-red-100" :
                                            pest.riskLevel === "Medium" ? "bg-amber-100" : "bg-green-100"
                                        }`}>
                                        🐛
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{pest.crop}</h3>
                                        <p className="text-xs text-gray-500">{pest.pest}</p>
                                    </div>
                                </div>
                                <RiskBadge level={pest.riskLevel} color={pest.riskColor} />
                            </div>

                            {/* Risk score bar */}
                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Risk Score</span>
                                    <span className="font-semibold text-gray-700">{pest.riskScore}/100</span>
                                </div>
                                <RiskScoreBar score={pest.riskScore} color={pest.riskColor} />
                            </div>

                            {/* Details grid */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-600 mb-4">
                                <div>
                                    <span className="text-gray-400">Affected area: </span>
                                    <span className="font-medium">{pest.affectedArea}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Spread: </span>
                                    <span className="font-medium">{pest.predictedSpread}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Risk peak: </span>
                                    <span className="font-medium">{pest.nextRiskPeak}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Weather: </span>
                                    <span className="font-medium">{pest.weatherFavorability}</span>
                                </div>
                            </div>

                            {/* Recommendation */}
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2">
                                <FlaskConical className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                                <div>
                                    <div className="text-xs font-semibold text-amber-800 mb-0.5">Recommended Treatment</div>
                                    <p className="text-xs text-amber-700">{pest.recommendation}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Prevention tips */}
                <div className="mt-10 bg-green-50 border border-green-200 rounded-2xl p-7">
                    <h3 className="font-bold text-green-800 text-lg mb-4 flex items-center gap-2">
                        <Bug className="w-5 h-5" />
                        General Integrated Pest Management Tips
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {[
                            "Scout fields every 3 days during Kharif season",
                            "Use yellow sticky traps for whitefly and aphid monitoring",
                            "Maintain field hygiene — remove crop residues promptly",
                            "Follow recommended pesticide dosage; never over-apply",
                            "Use biological control agents (Trichogramma, Bt) first",
                            "Avoid spraying in rain or strong wind conditions",
                            "Rotate pesticides to prevent resistance development",
                            "Install pheromone traps for early warning of moths",
                            "Keep irrigation canals clean to avoid vector breeding",
                        ].map((tip, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-green-700">
                                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                {tip}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}
