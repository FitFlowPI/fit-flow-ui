import { Injectable } from '@angular/core';
import {PerformanceData} from "../models/performance-data.model";
import {ChartOptions} from "chart.js";

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  documentStyle = getComputedStyle(document.documentElement);

  public chartOptions2: ChartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 16.9,
    plugins: {
      legend: {
        labels: {
          color: this.documentStyle.getPropertyValue('--white-weak')
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: this.documentStyle.getPropertyValue('--white-weak')
        },
        grid: {
          color: this.documentStyle.getPropertyValue('--white-weak')
        }
      },
      y: {
        ticks: {
          color: this.documentStyle.getPropertyValue('--white-weak')
        },
        grid: {
          color: this.documentStyle.getPropertyValue('--white-weak')
        }
      }
    }
  }

  public chartOptions: Object = {
    stacked: false,
    maintainAspectRatio: false,
    aspectRatio: 1.0,
    plugins: {
      legend: {
        labels: {
          color: this.documentStyle.getPropertyValue('--white-weak')
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: this.documentStyle.getPropertyValue('--white-weak')
        },
        grid: {
          color: this.documentStyle.getPropertyValue('--white-weak')
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: this.documentStyle.getPropertyValue('--white-weak')
        },
        grid: {
          color: this.documentStyle.getPropertyValue('--white-weak')
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: this.documentStyle.getPropertyValue('--white-weak')
        },
        grid: {
          drawOnChartArea: false,
          color: this.documentStyle.getPropertyValue('--white-weak')
        }
      }
    }
  };

  groupDataByMonth(
    data: Array<PerformanceData>
  ): Record<
    number,
    {
      averageRepetitions: number;
      averageWeight: number;
      averageExerciseTime: number;
      averageBreakTime: number;
    }
  > {
    const grouped: Record<
      number,
      {
        totalRepetitions: number;
        totalWeight: number;
        totalExerciseTime: number;
        totalBreakTime: number;
        count: number;
      }
    > = {};

    data.forEach(({ date, exerciseExecution }) => {
      const month = date.getMonth();
      if (!grouped[month]) {
        grouped[month] = {
          totalRepetitions: 0,
          totalWeight: 0,
          totalExerciseTime: 0,
          totalBreakTime: 0,
          count: 0,
        };
      }

      grouped[month].totalRepetitions += exerciseExecution.repetitions || 0;
      grouped[month].totalWeight += exerciseExecution.weight || 0;
      grouped[month].totalExerciseTime += exerciseExecution.exerciseTime || 0;
      grouped[month].totalBreakTime += exerciseExecution.breakTime || 0;
      grouped[month].count += 1;
    });

    const result: Record<
      number,
      {
        averageRepetitions: number;
        averageWeight: number;
        averageExerciseTime: number;
        averageBreakTime: number;
      }
    > = {};

    Object.keys(grouped).forEach((month) => {
      const { totalRepetitions, totalWeight, totalExerciseTime, totalBreakTime, count } = grouped[Number(month)];

      result[Number(month)] = {
        averageRepetitions: totalRepetitions / count,
        averageWeight: totalWeight / count,
        averageExerciseTime: totalExerciseTime / count,
        averageBreakTime: totalBreakTime / count,
      };
    });

    return result;
  }

  createDataset(
    label: string,
    color: string,
    data: number[],
    type: 'line' | 'bar'
  ): { label: string; type: string; borderColor: string; backgroundColor?: string; borderWidth: number; fill: boolean; tension: number; data: number[] } {
    return {
      type,
      label,
      borderColor: color,
      backgroundColor: type === 'bar' ? color : undefined,
      borderWidth: 2,
      fill: type === 'bar',
      tension: 0.5,
      data,
    };
  }

  getLabelsFromGroupedData(
    groupedData: Record<
      number,
      {
        averageRepetitions: number;
        averageWeight: number;
        averageExerciseTime: number;
        averageBreakTime: number;
      }
    >
  ): string[] {
    return Object.keys(groupedData)
      .map((month) => new Date(0, Number(month)).toLocaleString('default', { month: 'short' }))
      .sort((a, b) => new Date(`01 ${a} 2000`).getMonth() - new Date(`01 ${b} 2000`).getMonth());
  }

  filterGroupedData(
    groupedData: Record<
      number,
      {
        averageRepetitions: number;
        averageWeight: number;
        averageExerciseTime: number;
        averageBreakTime: number;
      }
    >,
    filters: Array<'averageRepetitions' | 'averageWeight' | 'averageExerciseTime' | 'averageBreakTime'>
  ): Record<
    number,
    Partial<{
      averageRepetitions: number;
      averageWeight: number;
      averageExerciseTime: number;
      averageBreakTime: number;
    }>
  > {
    const filteredData: Record<
      number,
      Partial<{
        averageRepetitions: number;
        averageWeight: number;
        averageExerciseTime: number;
        averageBreakTime: number;
      }>
    > = {};

    Object.entries(groupedData).forEach(([month, data]) => {
      filteredData[Number(month)] = {};
      filters.forEach((filter) => {
        filteredData[Number(month)][filter] = data[filter];
      });
    });

    return filteredData;
  }
}
