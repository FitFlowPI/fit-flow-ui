import {Component, Input, OnInit} from '@angular/core';
import {PerformanceData} from "../../models/performance-data.model";
import {ChartService} from "../../services/chart.service";
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css'
})
export class PerformanceComponent implements OnInit{

  documentStyle = getComputedStyle(document.documentElement);

  performanceDataList: Array<PerformanceData> = [
    {
        exerciseExecution: {
            exerciseTime: 120000,
            breakTime: 30000,
            weight: 30,
            repetitions: 12
        },
        exercise: {
            id: '1',
            name: 'Supino Reto',
            category: 'Peito',
            time: 120000
        },
        date: new Date('2024-03-15')
    },
    {
        exerciseExecution: {
            exerciseTime: 90000,
            breakTime: 45000,
            weight: 45,
            repetitions: 10
        },
        exercise: {
            id: '2',
            name: 'Puxada Frontal',
            category: 'Costas',
            time: 90000
        },
        date: new Date('2024-02-22')
    },
    {
        exerciseExecution: {
            exerciseTime: 150000,
            breakTime: 60000,
            weight: 60,
            repetitions: 8
        },
        exercise: {
            id: '3',
            name: 'Agachamento Livre',
            category: 'Pernas',
            time: 150000
        },
        date: new Date('2024-04-10')
    },
    {
        exerciseExecution: {
            exerciseTime: 75000,
            breakTime: 25000,
            weight: 20,
            repetitions: 15
        },
        exercise: {
            id: '4',
            name: 'Rosca Direta',
            category: 'Braços',
            time: 75000
        },
        date: new Date('2024-01-05')
    },
    {
        exerciseExecution: {
            exerciseTime: 100000,
            breakTime: 40000,
            weight: 25,
            repetitions: 10
        },
        exercise: {
            id: '5',
            name: 'Elevação Lateral',
            category: 'Ombros',
            time: 100000
        },
        date: new Date('2024-05-18')
    },
    {
        exerciseExecution: {
            exerciseTime: 110000,
            breakTime: 35000,
            weight: 50,
            repetitions: 12
        },
        exercise: {
            id: '6',
            name: 'Supino Inclinado',
            category: 'Peito',
            time: 110000
        },
        date: new Date('2024-02-14')
    },
    {
        exerciseExecution: {
            exerciseTime: 85000,
            breakTime: 30000,
            weight: 35,
            repetitions: 10
        },
        exercise: {
            id: '7',
            name: 'Remada Curvada',
            category: 'Costas',
            time: 85000
        },
        date: new Date('2024-06-07')
    },
    {
        exerciseExecution: {
            exerciseTime: 130000,
            breakTime: 50000,
            weight: 70,
            repetitions: 8
        },
        exercise: {
            id: '8',
            name: 'Leg Press',
            category: 'Pernas',
            time: 130000
        },
        date: new Date('2024-03-25')
    },
    {
        exerciseExecution: {
            exerciseTime: 70000,
            breakTime: 20000,
            weight: 15,
            repetitions: 15
        },
        exercise: {
            id: '9',
            name: 'Rosca Martelo',
            category: 'Braços',
            time: 70000
        },
        date: new Date('2024-01-30')
    },
    {
        exerciseExecution: {
            exerciseTime: 95000,
            breakTime: 35000,
            weight: 30,
            repetitions: 12
        },
        exercise: {
            id: '10',
            name: 'Desenvolvimento com Halteres',
            category: 'Ombros',
            time: 95000
        },
        date: new Date('2024-05-03')
    },
    {
        exerciseExecution: {
            exerciseTime: 105000,
            breakTime: 45000,
            weight: 40,
            repetitions: 10
        },
        exercise: {
            id: '11',
            name: 'Crucifixo com Halteres',
            category: 'Peito',
            time: 105000
        },
        date: new Date('2024-04-12')
    },
    {
        exerciseExecution: {
            exerciseTime: 80000,
            breakTime: 25000,
            weight: 45,
            repetitions: 10
        },
        exercise: {
            id: '12',
            name: 'Barra Fixa',
            category: 'Costas',
            time: 80000
        },
        date: new Date('2024-02-08')
    },
    {
        exerciseExecution: {
            exerciseTime: 140000,
            breakTime: 55000,
            weight: 65,
            repetitions: 8
        },
        exercise: {
            id: '13',
            name: 'Afundo com Halteres',
            category: 'Pernas',
            time: 140000
        },
        date: new Date('2024-06-19')
    },
    {
        exerciseExecution: {
            exerciseTime: 65000,
            breakTime: 15000,
            weight: 25,
            repetitions: 15
        },
        exercise: {
            id: '14',
            name: 'Tríceps Pulley',
            category: 'Braços',
            time: 65000
        },
        date: new Date('2024-01-17')
    },
    {
        exerciseExecution: {
            exerciseTime: 90000,
            breakTime: 40000,
            weight: 35,
            repetitions: 12
        },
        exercise: {
            id: '15',
            name: 'Elevação Frontal',
            category: 'Ombros',
            time: 90000
        },
        date: new Date('2024-05-22')
    },
    {
        exerciseExecution: {
            exerciseTime: 115000,
            breakTime: 50000,
            weight: 55,
            repetitions: 10
        },
        exercise: {
            id: '16',
            name: 'Peck Deck',
            category: 'Peito',
            time: 115000
        },
        date: new Date('2024-03-08')
    },
    {
        exerciseExecution: {
            exerciseTime: 75000,
            breakTime: 30000,
            weight: 40,
            repetitions: 12
        },
        exercise: {
            id: '17',
            name: 'Pulldown',
            category: 'Costas',
            time: 75000
        },
        date: new Date('2024-02-16')
    },
    {
        exerciseExecution: {
            exerciseTime: 160000,
            breakTime: 60000,
            weight: 75,
            repetitions: 8
        },
        exercise: {
            id: '18',
            name: 'Stiff',
            category: 'Pernas',
            time: 160000
        },
        date: new Date('2024-06-05')
    },
    {
        exerciseExecution: {
            exerciseTime: 60000,
            breakTime: 20000,
            weight: 20,
            repetitions: 15
        },
        exercise: {
            id: '19',
            name: 'Rosca Concentrada',
            category: 'Braços',
            time: 60000
        },
        date: new Date('2024-01-12')
    },
    {
        exerciseExecution: {
            exerciseTime: 100000,
            breakTime: 45000,
            weight: 40,
            repetitions: 12
        },
        exercise: {
            id: '20',
            name: 'Crucifixo Invertido',
            category: 'Ombros',
            time: 100000
        },
        date: new Date('2024-05-11')
    },
    {
        exerciseExecution: {
            exerciseTime: 120000,
            breakTime: 40000,
            weight: 45,
            repetitions: 10
        },
        exercise: {
            id: '21',
            name: 'Flexões de Braço',
            category: 'Peito',
            time: 120000
        },
        date: new Date('2024-04-05')
    },
    {
        exerciseExecution: {
            exerciseTime: 85000,
            breakTime: 25000,
            weight: 50,
            repetitions: 10
        },
        exercise: {
            id: '22',
            name: 'Remada Unilateral',
            category: 'Costas',
            time: 85000
        },
        date: new Date('2024-02-20')
    },
    {
        exerciseExecution: {
            exerciseTime: 135000,
            breakTime: 55000,
            weight: 65,
            repetitions: 8
        },
        exercise: {
            id: '23',
            name: 'Extensão de Pernas',
            category: 'Pernas',
            time: 135000
        },
        date: new Date('2024-06-14')
    },
    {
        exerciseExecution: {
            exerciseTime: 70000,
            breakTime: 15000,
            weight: 25,
            repetitions: 15
        },
        exercise: {
            id: '24',
            name: 'Tríceps Testa',
            category: 'Braços',
            time: 70000
        },
        date: new Date('2024-01-25')
    },
    {
        exerciseExecution: {
            exerciseTime: 95000,
            breakTime: 35000,
            weight: 35,
            repetitions: 12
        },
        exercise: {
            id: '25',
            name: 'Encolhimento com Barra',
            category: 'Ombros',
            time: 95000
        },
        date: new Date('2024-05-16')
    },
    {
        exerciseExecution: {
            exerciseTime: 110000,
            breakTime: 50000,
            weight: 55,
            repetitions: 10
        },
        exercise: {
            id: '26',
            name: 'Supino Reto',
            category: 'Peito',
            time: 110000
        },
        date: new Date('2024-03-20')
    },
    {
        exerciseExecution: {
            exerciseTime: 80000,
            breakTime: 30000,
            weight: 45,
            repetitions: 12
        },
        exercise: {
            id: '27',
            name: 'Puxada Frontal',
            category: 'Costas',
            time: 80000
        },
        date: new Date('2024-02-06')
    },
    {
        exerciseExecution: {
            exerciseTime: 150000,
            breakTime: 60000,
            weight: 70,
            repetitions: 8
        },
        exercise: {
            id: '28',
            name: 'Agachamento Livre',
            category: 'Pernas',
            time: 150000
        },
        date: new Date('2024-06-25')
    },
    {
        exerciseExecution: {
            exerciseTime: 65000,
            breakTime: 20000,
            weight: 20,
            repetitions: 15
        },
        exercise: {
            id: '29',
            name: 'Rosca Direta',
            category: 'Braços',
            time: 65000
        },
        date: new Date('2024-01-08')
    },
    {
        exerciseExecution: {
            exerciseTime: 100000,
            breakTime: 40000,
            weight: 30,
            repetitions: 12
        },
        exercise: {
            id: '30',
            name: 'Elevação Lateral',
            category: 'Ombros',
            time: 100000
        },
        date: new Date('2024-05-07')
    },
    {
        exerciseExecution: {
            exerciseTime: 120000,
            breakTime: 45000,
            weight: 50,
            repetitions: 10
        },
        exercise: {
            id: '31',
            name: 'Supino Inclinado',
            category: 'Peito',
            time: 120000
        },
        date: new Date('2024-04-18')
    },
    {
        exerciseExecution: {
            exerciseTime: 90000,
            breakTime: 35000,
            weight: 40,
            repetitions: 12
        },
        exercise: {
            id: '32',
            name: 'Remada Curvada',
            category: 'Costas',
            time: 90000
        },
        date: new Date('2024-02-12')
    }
    ]

  public data: any = { labels: [], datasets: [] };

  private groupedDataMemo: Record<string, any> | null = null;

  constructor(protected chartService: ChartService) {}

  ngOnInit(): void {
    // Group and cache the data on initialization
    this.groupedDataMemo = this.chartService.groupDataByMonth(this.performanceDataList);
    this.data.labels = this.chartService.getLabelsFromGroupedData(this.groupedDataMemo);

    this.toggleAvarageWeight();
    this.toggleAvarageRepetitions();
  }

  private updateDataset(filter: 'averageRepetitions' | 'averageWeight' | 'averageExerciseTime' | 'averageBreakTime', label: string, color: string): void {
    if (!this.groupedDataMemo) return;

    const filteredData = this.chartService.filterGroupedData(this.groupedDataMemo, [filter]);
    const datasetData = Object.values(filteredData).map(item => item[filter] || 0);

    const dataset = this.chartService.createDataset(label, color, datasetData, 'line');
    this.data.datasets.push(dataset);
  }

  toggleAvarageRepetitions(): void {
    this.updateDataset('averageRepetitions', 'Average Repetitions', this.documentStyle.getPropertyValue('--yellow'));
  }

  toggleAvarageWeight(): void {
    this.updateDataset('averageWeight', 'Average Weight', this.documentStyle.getPropertyValue('--blue'));
  }

  toggleAvarageExerciseTime(): void {
    this.updateDataset('averageExerciseTime', 'Average Exercise Time', this.documentStyle.getPropertyValue('--green'));
  }

  toggleAvarageBreakTime(): void {
    this.updateDataset('averageBreakTime', 'Average Break Time', this.documentStyle.getPropertyValue('--red'));
  }

}
