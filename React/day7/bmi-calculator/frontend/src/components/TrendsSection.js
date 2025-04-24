import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

function TrendsSection({ data }) {
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

    const getCategoryDistribution = () => {
        const categories = {
            underweight: 0,
            healthy: 0,
            overweight: 0,
            obese: 0,
        };

        data.forEach((item) => {
            if (categories.hasOwnProperty(item.category)) {
                categories[item.category]++;
            }
        });

        return Object.keys(categories).map((key) => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value: categories[key],
            color: getCategoryColor(key),
        }));
    };

    return (
        <div className="trends-section-container">
            <div className="category-distribution">
                <h3>BMI Category Distribution</h3>
                <div style={{ width: "100%", height: 380 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={getCategoryDistribution()}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                label={({ name, percent }) =>
                                    `${name} ${(percent * 100).toFixed(1)}%`
                                }
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                                isAnimationActive={true}
                                animationDuration={1000}
                                animationEasing="ease-out"
                            >
                                {getCategoryDistribution().map(
                                    (entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    )
                                )}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default TrendsSection;
