"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ReferenceLine,
} from "recharts";

export function PestRiskHistoryChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fef3c7" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip
                    contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #fde68a",
                        fontSize: "12px",
                    }}
                    formatter={(val) => [`${val}%`, ""]}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} />
                <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="4 4" label={{ value: "High Risk", fontSize: 10, fill: "#ef4444" }} />
                <ReferenceLine y={40} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: "Med Risk", fontSize: 10, fill: "#f59e0b" }} />
                <Line type="monotone" dataKey="wheat" name="Wheat" stroke="#16a34a" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="rice" name="Rice" stroke="#0ea5e9" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="maize" name="Maize" stroke="#f59e0b" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="cotton" name="Cotton" stroke="#a855f7" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}
