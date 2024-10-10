import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedTitleService } from '../services/shared-title.service';
import { TicketsService } from '../services/tickets.service';
import {
  ApexChart,
  ApexAxisChartSeries,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexGrid
} from "ng-apexcharts";
import { InfosService } from '../services/infos.service';
import { TagsService } from '../services/tags.service';
import { UsersService } from '../services/users.service';

type ApexXAxis = {
  type?: "category" | "datetime" | "numeric";
  categories?: any[];
  labels?: {
    style?: {
      colors?: string | string[];
      fontSize?: string;
    };
  };
};

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  chartOptions!: ChartOptions;
  statistics: any = {};
  statisticsChart: any = {};
  selectedMode: 'number' | 'percent' = 'number';
  askedCount!: number;
  durationOptions: { label: string; value: number }[] = [
    { label: '1h', value: 1 },
    { label: '24h', value: 24 },
    { label: '48h', value: 48 },
    { label: '72h', value: 72 },
    { label: '1w', value: 168 },
    { label: '1m', value: 720 },
    { label: '1y', value: 8760 },
    { label: 'All', value: -1 }
  ];
  selectedDuration: number = -1;
  ships: any[] = [];
  customers: any[] = [];
  skills: any[] = [];
  effects: any[] = [];
  sides: any[] = [];
  tags: any[] = [];
  effectTypes: any[] = [];
  levels: any[] = [];
  users: any[] = [];

  client: string = '';
  ship: string = '';
  user: string = '';
  skill: number = 0;
  effect: number = 0;
  side: number = 0;
  tag: number = 0;
  ri: number = 0;
  effectType: number = 0;
  level: number = 0;
  asked_type: string = '';
  startDate: string | undefined;
  endDate: string | undefined;

  constructor(
    private ticketsService: TicketsService,
    private infosService: InfosService,
    private sharedTitleService: SharedTitleService,
    private tagsService: TagsService,
    private usersService: UsersService
  ) {}


  ngOnInit() {
    this.sharedTitleService.changeTitle('statisticsTickets');
    this.getGlobalStatistics();
    this.updateChartData();
    this.fetchCustomers();
    this.fetchSkills();
    this.fetchShips();
    this.fetchEffects();
    this.fetchSides();
    this.fetchTags();
    this.fetchLevels();
    this.fetchEffectTypes();
    this.fetchUsersStFSM();
  }

  private fetchUsersStFSM(): void {
    this.usersService.findUserSTFSL().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchLevels(): void {
    this.infosService.getLevels().subscribe(
      data => {
        this.levels = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchEffectTypes(): void {
    this.infosService.getEffectTypes().subscribe(
      data => {
        this.effectTypes = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchTags() {
    this.tagsService.getTags().subscribe(
      data => {
        this.tags = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchSides(): void {
    this.infosService.getSides().subscribe(
      data => {
        this.sides = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchEffects(): void {
    this.infosService.getEffects().subscribe(
      data => {
        this.effects = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchSkills(): void {
    this.infosService.getSkills().subscribe(
      data => {
        this.skills = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  getGlobalStatistics() {
    this.ticketsService.getAskedDataStatistics(
      this.selectedDuration,
      this.client,
      this.user,
      this.ship,
      this.asked_type,
      this.skill,
      this.effect,
      this.side,
      this.tag,
      this.effectType,
      this.level,
      this.ri,
      this.startDate,
      this.endDate
    ).subscribe(
      (data) => {
        this.statistics = data.statistics;
      },
      (error) => {
        console.error('Erreur:', error);
      }
    );
  }

  calculateTime() {
    const totalSeconds = this.statistics.totalResponseTime;
    const years = Math.floor(totalSeconds / (365 * 24 * 60 * 60));
    let remainingSeconds = totalSeconds % (365 * 24 * 60 * 60);
    const days = Math.floor(remainingSeconds / (24 * 60 * 60));
    remainingSeconds %= (24 * 60 * 60);
    const hours = Math.floor(remainingSeconds / (60 * 60));
    remainingSeconds %= (60 * 60);
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = Math.floor(remainingSeconds % 60);

    const months = Math.floor(years * 12 + (days / 30.4375)); // Moyenne des jours par mois sur une année civile

    return `${years} Y ${months} M ${days} D ${hours} H`;
  }


  getGlobalStatisticsChart() {
    this.ticketsService.getAskedDataChart(
      this.selectedDuration,
      this.client,
      this.user,
      this.ship,
      this.asked_type,
      this.skill,
      this.effect,
      this.side,
      this.tag,
      this.effectType,
      this.level,
      this.ri,
      this.startDate,
      this.endDate
    ).subscribe(
      (data) => {
        console.log(data);

        this.statisticsChart = data.statistics;
        this.askedCount = data.askedCount;
        const maxCount = this.selectedMode === 'number' ? this.askedCount : 100;
        const seriesData = this.statisticsChart.map((item: any) => {
          return this.selectedMode === 'number' ? item.count : (item.percentage > maxCount ? maxCount : item.percentage);
        });

        this.chartOptions = {
          series: [{ name: "distibuted", data: seriesData }],
          chart: { height: 300, type: "bar", events: { click: function(chart, w, e) {}}},
          colors: ["#E30039", "#E30039", "#E30039", "#E30039", "#E30039", "#E30039"],
          plotOptions: { bar: { columnWidth: "45%", distributed: true }},
          dataLabels: { enabled: false },
          legend: { show: false },
          grid: { show: false },
          xaxis: {
            categories: this.statisticsChart.map((item: any) => item.status_label),
            labels: {
              style: {
                colors: "#000",
                fontSize: "14px",
              }
            }
          },
          yaxis: {
            max: maxCount,
            min:0,
            tickAmount: 5,
            labels: {
              style: {
                colors: "#000",
                fontSize: "14px",
                fontFamily: "font-inter",
                fontWeight: "bold"
              },
              formatter:  (value: any) => {
                if (this.selectedMode === 'number') {
                  return Math.floor(value).toString();
                } else {
                  return Math.floor(value).toString() + ' %';
                }
              }
            }
          }
        };

      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


  updateChartData() {
    this.fetchShips();
    if (this.selectedMode === 'number') {
      this.getGlobalStatisticsChart();
      this.getGlobalStatistics();
    } else if (this.selectedMode === 'percent') {
      this.getGlobalStatisticsChart();
      this.getGlobalStatistics();
    }
  }

  updateDuration(duration: number) {
    this.selectedDuration = duration;
    this.getGlobalStatisticsChart();
  }

  private fetchCustomers(): void {
    this.infosService.getCustomers().subscribe(
      data => {
        this.customers = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  private fetchShips(): void {
    if (this.client) {
      this.infosService.getShipsByCustomer(this.client).subscribe(
        data => {
          this.ships = data;
        },
        error => {
          console.error('Erreur:', error);
        }
      );

    } else {
      this.infosService.getShips().subscribe(
        data => {
          this.ships = data;
        },
        error => {
          console.error('Erreur:', error);
        }
      );
    }
  }
}
