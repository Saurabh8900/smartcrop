"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from "recharts";

export function MarketPriceTrendChart({ data, msp }) {
    return (
        <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0fdf4" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <YAxis
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `₹${v}`}
                />
                <Tooltip
                    contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #d1fae5",
                        fontSize: "12px",
                    }}
                    formatter={(val) => [`₹${val}`, "Market Price"]}
                />
                {msp && (
                    <ReferenceLine
                        y={msp}
                        stroke="#f59e0b"
                        strokeDasharray="5 5"
                        label={{ value: `MSP ₹${msp}`, fontSize: 10, fill: "#f59e0b", position: "right" }}
                    />
                )}
                <Area
                    type="monotone"
                    dataKey="price"
                    name="Market Price"
                    stroke="#16a34a"
                    strokeWidth={2.5}
                    fill="url(#priceGrad)"
                    dot={{ r: 3, fill: "#16a34a" }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
