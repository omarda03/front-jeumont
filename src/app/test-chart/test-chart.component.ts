import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DataParserService } from './data-parser.service';
import { SharedTitleService } from '../services/shared-title.service';

Chart.register(...registerables);

@Component({
  selector: 'app-test-chart',
  templateUrl: './test-chart.component.html',
  styleUrls: ['./test-chart.component.scss']
})
export class TestChartComponent implements OnInit, OnDestroy {
  chart: any;
  fileContent: string | ArrayBuffer | null = '';
  tableHeaders1: string[] = [];
  tableData1: string[][] = [];
  tableHeaders2: string[] = [];
  tableData2: string[][] = [];
  timeData: number[] = [];

  constructor(
    private dataParserService: DataParserService,
    private sharedTitleService: SharedTitleService
  ) { }

  ngOnInit(): void {
    this.sharedTitleService.changeTitle('Chart Example');
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.fileContent = reader.result;
      this.processFileContent();
    };

    reader.onerror = () => {
      console.error('Error reading file');
      alert('There was an error reading the file. Please try again.');
    };

    reader.readAsText(file);
  }

  processFileContent(): void {
    if (typeof this.fileContent === 'string') {
      const lines = this.fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);

      if (lines.length < 4) {
        console.error('Invalid file format');
        alert('The file format is invalid. Please upload a correctly formatted file.');
        return;
      }

      // Process sections
      this.processSection1(lines);
      this.processSection2(lines);
      this.processTimeData(lines);

      // Validate numeric data
      const numericDataLines = this.timeData.filter(num => !isNaN(num));

      // if (numericDataLines.length !== this.timeData.length) {
      //   console.error('Invalid numeric data');
      //   alert('The file contains invalid numeric data. Please check the file content.');
      //   return;
      // }

      // Display only the first 100 points
      const dataToDisplay = numericDataLines.slice(0, 10000);

      // Update the chart with the new data
      this.createChart(dataToDisplay);
    }
  }

  processSection1(lines: string[]): void {
    // Process first section
    const section1Headers = lines[0].split(';');
    const section1Data = lines[1].split(';');
    this.tableHeaders1 = section1Headers;
    this.tableData1 = [section1Data];
  }

  processSection2(lines: string[]): void {
    // Process second section
    const section2Headers = lines[2].split(';');
    const section2Data = lines[3].split(';');
    this.tableHeaders2 = section2Headers;
    this.tableData2 = [section2Data];
  }

  processTimeData(lines: string[]): void {
    // Process remaining lines as time data
    const timeDataLines = lines.slice(4);
    this.timeData = timeDataLines.map(line => {
      const num = parseFloat(line);
      return isNaN(num) ? NaN : num;
    });
  }

  createChart(numericDataLines: number[]): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    const color1 = '#3cba9f';

    // Prepare data for MD0 dataset
    const dataPointsMD0 = numericDataLines.map((value, index) => ({
      x: index,
      y: value
    }));

    if (this.chart) {
      this.chart.destroy(); // Destroy the old chart before creating a new one
    }

    console.log(dataPointsMD0);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'MD0',
            data: dataPointsMD0,
            borderColor: color1,
            backgroundColor: color1,
            fill: false,
            pointStyle: 'circle',
            pointRadius: 2
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            type: 'linear',
            ticks: {
              stepSize: 1
            }
          },
          y: {
            display: true,
            type: 'linear',
          }
        }
      }
    });
  }
}
