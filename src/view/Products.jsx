import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Products = () => {
  const data = {
    labels: ['Electronics', 'Clothing', 'Grocery', 'Furniture'],
    datasets: [
      {
        label: 'Product Share',
        data: [400, 300, 300, 200],
        backgroundColor: ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'], 
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
      <Pie data={data} options={options} width={300} height={300} />
    </>
  );
};

export default Products;
