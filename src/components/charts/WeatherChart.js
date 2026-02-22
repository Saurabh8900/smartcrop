"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

export function WeatherHourlyChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="humidGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
                <XAxis
                    dataKey="hour"
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                    interval={3}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <Tooltip
                    contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #d1fae5",
                        fontSize: "12px",
                    }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <Area
                    type="monotone"
                    dataKey="temp"
                    name="Temp (°C)"
                    stroke="#16a34a"
                    strokeWidth={2}
                    fill="url(#tempGrad)"
                    dot={false}
                />
                <Area
                    type="monotone"
                    dataKey="humidity"
                    name="Humidity (%)"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#humidGrad)"
                    dot={false}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export function WeatherForecastBar({ data }) {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.05} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <Tooltip
                    contentStyle={{ borderRadius: "8px", border: "1px solid #bae6fd", fontSize: "12px" }}
                />
                <Area
                    type="monotone"
                    dataKey="rainfall"
                    name="Rainfall (mm)"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    fill="url(#rainGrad)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
