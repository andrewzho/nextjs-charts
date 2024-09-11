"use client";  // Add this line at the very top

import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import { CandlestickController, OhlcElement } from 'chartjs-chart-financial';
import axios from 'axios';

// Register Chart.js components, including the candlestick chart components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  OhlcElement,  // Register OhlcElement for candlestick charts
  CandlestickController,  // Register CandlestickController
  TimeScale  // Register time scale for x-axis
);

const Dashboard = () => {
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [{ label: 'Line Data', data: [], borderColor: 'blue', backgroundColor: 'lightblue' }]
  });
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [{
      label: 'Bar Data',
      data: [],
      backgroundColor: ['lightblue', 'lightcoral', 'lightyellow'],
      borderColor: ['blue', 'red', 'yellow'],
      borderWidth: 1
    }]
  });
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['pink', 'skyblue', 'yellow', 'lightgreen'],
      borderColor: ['red', 'blue', 'yellow', 'green'],
      borderWidth: 1
    }]
  });

  const [candlestickData, setCandlestickData] = useState({
    datasets: [{
      label: 'Candlestick Data',
      data: []
    }]
  });

  useEffect(() => {
    // Fetch Line Chart Data
    axios.get('http://127.0.0.1:8000/api/line-chart-data/')
      .then(res => setLineData({
        labels: res.data.labels || [],
        datasets: [{
          label: 'Line Data',
          data: res.data.data || [],
          borderColor: 'blue',
          backgroundColor: 'lightblue'
        }]
      }));

    // Fetch Bar Chart Data
    axios.get('http://127.0.0.1:8000/api/bar-chart-data/')
      .then(res => setBarData({
        labels: res.data.labels || [],
        datasets: [{
          label: 'Bar Data',
          data: res.data.data || [],
          backgroundColor: ['lightblue', 'lightcoral', 'lightyellow'],
          borderColor: ['blue', 'red', 'yellow'],
          borderWidth: 1
        }]
      }));

    // Fetch Pie Chart Data
    axios.get('http://127.0.0.1:8000/api/pie-chart-data/')
      .then(res => setPieData({
        labels: res.data.labels || [],
        datasets: [{
          data: res.data.data || [],
          backgroundColor: ['pink', 'skyblue', 'yellow', 'lightgreen'],
          borderColor: ['red', 'blue', 'yellow', 'green'],
          borderWidth: 1
        }]
      }));

    // Fetch Candlestick Data
    axios.get('http://127.0.0.1:8000/api/candlestick-data/')
      .then(res => {
        const candlestickFormattedData = res.data.data.map(item => ({
          x: new Date(item.x),  // Convert x to a Date object
          o: item.open,  // Open
          h: item.high,  // High
          l: item.low,  // Low
          c: item.close  // Close
        }));

        setCandlestickData({
          datasets: [{
            label: 'Candlestick Data',
            data: candlestickFormattedData,
            borderColor: 'black',
            backgroundColor: 'green'
          }]
        });
      })
      .catch(err => console.log("Error fetching candlestick data: ", err));
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div className="bg-gray-100 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Line Chart</h2>
          <Line data={lineData} />
        </div>

        <div className="bg-gray-100 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Bar Chart</h2>
          <Bar data={barData} />
        </div>

        <div className="bg-gray-100 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Pie Chart</h2>
          <Pie data={pieData} />
        </div>

        <div className="bg-gray-100 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Candlestick Chart</h2>
          <canvas id="candlestickChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
