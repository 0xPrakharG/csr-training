import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

const HistoryChart = ({ data }) => {
    if (!data || data.length === 0) return <p>No History available</p>;

    const chartData = data.slice(0, 10).map((item) => ({
        date: new Date(item.created_at || Date.now()).toLocaleDateString(),
        bmi: parseFloat(item.bmi),
        category: item.category,
    }));

    const getCategoryColor = (category) => {
        switch (category) {
            case "underweight":
                return "#3498db";
            case "healthy":
                return "#2ecc71";
            case "overweight":
                return "#f39c12";
            case "obese":
                return "#e74c3c";
            default:
                return "#888";
        }
    };

    return (
        <div className="history-chart">
            <div style={{ width: "100%", height: 450 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            angle={-55}
                            textAnchor="end"
                            height={80}
                            label={{
                                value: "Date",
                                position: "bottom",
                                fill: "#8884d8",
                            }}
                        />
                        <YAxis
                            label={{
                                value: "BMI",
                                angle: -90,
                                position: "insideLeft",
                                fill: "#8884d8",
                            }}
                            domain={[0, "auto"]}
                        />
                        <Tooltip />
                        <Bar
                            dataKey="bmi"
                            name="BMI Value"
                            fill="#8884d8"
                            radius={[4, 4, 0, 0]}
                            fillOpacity={0.8}
                            isAnimationActive={true}
                            animationDuration={1000}
                            animationEasing="ease-out"
                            barSize={30}
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`rect-${index}`}
                                    fill={getCategoryColor(entry.category)}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default HistoryChart;
