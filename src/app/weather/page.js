import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WeatherHourlyChart, WeatherForecastBar } from "@/components/charts/WeatherChart";
import {
    generateCurrentWeather,
    generateWeatherForecast,
    generateHourlyWeather,
} from "@/lib/faker-data";
import {
    Droplets,
    Wind,
    Eye,
    Gauge,
    Sun,
    Thermometer,
    MapPin,
    Clock,
    CloudRain,
} from "lucide-react";

function WeatherConditionEmoji({ condition }) {
    const map = {
        Sunny: "☀️",
        "Partly Cloudy": "⛅",
        Cloudy: "☁️",
        "Light Rain": "🌦️",
        "Heavy Rain": "🌧️",
        Thunderstorm: "⛈️",
        Foggy: "🌫️",
        Clear: "🌤️",
    };
    return map[condition] || "🌤️";
}

function RainChanceBar({ value }) {
    const color = value > 70 ? "bg-blue-500" : value > 40 ? "bg-blue-400" : "bg-blue-200";
    return (
        <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className={`${color} h-1.5 rounded-full`} style={{ width: `${value}%` }} />
        </div>
    );
}

export default function WeatherPage() {
    const weather = generateCurrentWeather();
    const forecast = generateWeatherForecast(7);
    const hourly = generateHourlyWeather();

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <CloudRain className="w-5 h-5 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-900">Weather Forecast</h1>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{weather.location}</span>
                        <span className="text-gray-300">·</span>
                        <Clock className="w-3.5 h-3.5" />
                        <span>Updated: {weather.lastUpdated}</span>
                    </div>
                </div>

                {/* Current Conditions Hero */}
                <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 text-white rounded-2xl p-8 mb-6 shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Left: main temp */}
                        <div>
                            <div className="flex items-end gap-4 mb-4">
                                <span className="text-8xl">{WeatherConditionEmoji({ condition: weather.condition })}</span>
                                <div>
                                    <div className="text-7xl font-bold leading-none">{weather.temp}°</div>
                                    <div className="text-blue-200 text-lg mt-1">{weather.condition}</div>
                                </div>
                            </div>
                            <div className="text-blue-200 text-sm">Feels like {weather.feelsLike}°C · {weather.location}</div>
                            <div className="mt-4 inline-block px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20">
                                AQI: {weather.aqiIndex} ({weather.aqiLabel})
                            </div>
                        </div>

                        {/* Right: metrics grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Droplets, label: "Humidity", value: `${weather.humidity}%` },
                                { icon: Wind, label: "Wind Speed", value: `${weather.windSpeed} km/h ${weather.windDir}` },
                                { icon: Eye, label: "Visibility", value: `${weather.visibility} km` },
                                { icon: Gauge, label: "Pressure", value: `${weather.pressure} hPa` },
                                { icon: CloudRain, label: "Rainfall", value: `${weather.rainfall} mm` },
                                { icon: Sun, label: "Cloud Cover", value: `${weather.cloudCover}%` },
                                { icon: Thermometer, label: "Dew Point", value: `${weather.dewPoint}°C` },
                                { icon: Sun, label: "UV Index", value: `${weather.uvIndex}/11` },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-center gap-2.5">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        <Icon className="w-4 h-4 text-blue-100" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-blue-300">{label}</div>
                                        <div className="text-sm font-semibold">{value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Hourly Chart */}
                <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm mb-6">
                    <h2 className="font-bold text-gray-900 mb-1">24-Hour Temperature & Humidity</h2>
                    <p className="text-xs text-gray-400 mb-5">Hourly breakdown for field planning</p>
                    <WeatherHourlyChart data={hourly} />
                </div>

                {/* Rainfall Chart */}
                <div className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm mb-6">
                    <h2 className="font-bold text-gray-900 mb-1">7-Day Rainfall Forecast</h2>
                    <p className="text-xs text-gray-400 mb-5">Expected rainfall in mm per day</p>
                    <WeatherForecastBar data={forecast} />
                </div>

                {/* 7-Day Cards */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">7-Day Detailed Forecast</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {forecast.map((day) => (
                            <div
                                key={day.date}
                                className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm card-hover"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="font-bold text-gray-900">{day.day}</div>
                                        <div className="text-xs text-gray-400">{day.date}</div>
                                    </div>
                                    <span className="text-3xl">{WeatherConditionEmoji({ condition: day.condition })}</span>
                                </div>

                                <div className="text-sm text-gray-600 mb-3">{day.condition}</div>

                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-lg font-bold text-gray-800">{day.high}°</span>
                                    <span className="text-sm text-gray-400">/</span>
                                    <span className="text-sm text-gray-500">{day.low}°</span>
                                </div>

                                <div className="space-y-2 text-xs mb-3">
                                    <div className="flex justify-between text-gray-500">
                                        <span>Rain chance</span>
                                        <span className="font-medium text-gray-700">{day.chanceOfRain}%</span>
                                    </div>
                                    <RainChanceBar value={day.chanceOfRain} />
                                    <div className="flex justify-between text-gray-500">
                                        <span>💧 Rainfall</span>
                                        <span>{day.rainfall} mm</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                        <span>💨 Wind</span>
                                        <span>{day.windSpeed} km/h</span>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-green-50">
                                    <p className="text-[10px] text-green-700 font-medium leading-snug">
                                        🌱 {day.farmingAdvice}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}
