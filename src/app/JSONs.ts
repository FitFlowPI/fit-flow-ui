const documentStyle = getComputedStyle(document.documentElement);

export const demoChartData = {
  labels: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul"
  ],
  datasets: [
    {
      type: 'line',
      label: 'Repetições',
      borderColor: documentStyle.getPropertyValue('--yellow'),
      borderWidth: 2,
      fill: false,
      tension: 0.5,
      data: [9, 9, 10, 12, 6, 7, 8]
    },
    {
      type: 'bar',
      label: 'Peso',
      backgroundColor: documentStyle.getPropertyValue('--blue'),
      borderWidth: 1,
      fill: true,
      tension: 0.5,
      data: [5, 6, 7, 8, 12, 13, 13]
    },
  ],
}

export const chartOptions = {
  maintainAspectRatio: true,
  aspectRatio: 1.6,
  plugins: {
    legend: {
      labels: {
        color: documentStyle.getPropertyValue('--white-weak')
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: documentStyle.getPropertyValue('--white-weak')
      },
      grid: {
        color: documentStyle.getPropertyValue('--white-weak')
      }
    },
    y: {
      ticks: {
        color: documentStyle.getPropertyValue('--white-weak')
      },
      grid: {
        color: documentStyle.getPropertyValue('--white-weak')
      }
    }
  }
};

export const demoChartData2 = {
  labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  datasets: [
    {
      type: 'line',
      label: 'A',
      borderColor: documentStyle.getPropertyValue('--yellow'),
      borderWidth: 2,
      fill: false,
      tension: 0,
      data: [1, 1, 2, 1, 2, 4, 4, 3, 5, 5, 3, 5, 6, 7, 8, 9, 7, 9, 10, 8, 9, 10, 12]
    },
  ],
}

export const demoChartOptions2= {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1.8,
  plugins: {
    legend: {
      display: false, // Hides the legend
    },
    tooltip: {
      enabled: false, // Disables tooltips
    }
  },
  scales: {
    x: {
      display: true,
      grid: {
        color: documentStyle.getPropertyValue('--white-weak'),
        display: true,
      },
      ticks: {
        display: false, // Hides the x-axis labels
      },
    },
    y: {
      display: true,
      grid: {
        color: documentStyle.getPropertyValue('--white-weak'),
        display: true,
      },
      ticks: {
        display: false, // Hides the x-axis labels
      },
    }
  },
  elements: {
    point: {
      radius: 4 // Removes points from the line
    }
  }
}
