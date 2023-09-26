"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function Chart({ hits }) {

  // get only hits this month
  const currentMonth = new Date().getMonth();
  hits.filter((date) => date.getMonth() === currentMonth);

  // count clicks per day
  let hitsPerDay = {}
  hits.forEach((hit) => {
    const date = hit.getDate();
    if (hitsPerDay[date]) {
      hitsPerDay[date] += 1;
    }
    else {
      hitsPerDay[date] = 1;
    }
  })



  // create data
  const data = {
    labels: Object.keys(hitsPerDay),
    datasets: [
      {
        label: "Hits per day",
        data: Object.values(hitsPerDay),
        borderColor: 'rgb(230,230,250)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }

  // configure axis
  const options = {
    type: "line",
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  return <Line data={data} options={options}></Line>
}