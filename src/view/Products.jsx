import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Products = ({ data = [], isLoading }) => {

  if (isLoading || !Array.isArray(data)) return <div className="skeleton-loader"></div>;

  const labels = data.map(p => p.product_name);
  const values = data.map(p => Number(p.total_qty));


  const chartData = {
    labels,
    datasets: [
      {
        label: 'Top Products',
        data: values,
        backgroundColor: ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 20,
          padding: 15,
        },
      },
    },
  };

  return (
    <>
      <Pie data={chartData} options={options} width={300} height={300} />
    </>
  );
};

export default Products;
