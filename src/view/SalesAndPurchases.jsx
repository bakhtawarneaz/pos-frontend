import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { format, parseISO } from "date-fns";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SalesAndPurchases = ({ data = [], isLoading }) => {

  if (isLoading || !Array.isArray(data)) return <div className="skeleton-loader"></div>;
  
  const grouped = {};

  data.forEach((item) => {
    const monthLabel = format(parseISO(item.month), "MMM yyyy");
    if (!grouped[monthLabel]) {
      grouped[monthLabel] = { sales: 0, purchases: 0 };
    }

    if (item.invoice_mode === 1) {
      grouped[monthLabel].purchases = Number(item.total);
    } else if (item.invoice_mode === 2) {
      grouped[monthLabel].sales = Number(item.total);
    }
  });

  const labels = Object.keys(grouped);
  const purchases = labels.map(label => grouped[label].purchases);
  const sales = labels.map(label => grouped[label].sales);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Purchases',
        data: purchases,
        backgroundColor: '#f43f5e',
      },
      {
        label: 'Sales',
        data: sales,
        backgroundColor: '#8884d8',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true },
    },
  };

  return (
    <>
      <Bar data={chartData} options={options} />
    </>
  );
};

export default SalesAndPurchases;
