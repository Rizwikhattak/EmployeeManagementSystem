import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const ProgressGraph = ({ module }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const progressPercentage = module.progress_percentage;

    const chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Completed", "Remaining"],
        datasets: [
          {
            data: [progressPercentage, 100 - progressPercentage],
            backgroundColor: ["#0FA4AF", "#964734"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: `${module.title} Progress: ${progressPercentage.toFixed(2)}%`,
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [module]);

  return (
    <div className="progress-graph">
      <h3>{module.title} Progress Graph</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ProgressGraph;
