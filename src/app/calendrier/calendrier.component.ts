import { Component, OnInit } from '@angular/core';
import { SharedTitleService } from '../services/shared-title.service';
import { InfosService } from '../services/infos.service';
import { OnCallService } from '../services/on-call.service';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss'],
})
export class CalendrierComponent implements OnInit {
  public nextId = 1;
  public addToEvents: any[] = [];
  public addToBackUp: any[] = [];
  showCalendar = false;

  constructor(
    private infosService: InfosService,
    private onCallService: OnCallService,
    private sharedTitleService: SharedTitleService,

  ) {
    setTimeout(() => { this.showCalendar = true }, 2000);
  }
  
  ngOnInit() {
    this.getFetchData();
    this.getUserSkills();
    this.sharedTitleService.changeTitle('Calendrier');
  }

  getUserSkills () {
    this.infosService.getUsersSkill().subscribe(
      data => {
        data.forEach((userskill: any) => {
          if (userskill.skill_id === 1) {
            this.addToBackUp.push({
              Name: `${userskill.user_first_name} ${userskill.user_name}`,
              Id: userskill.user_uuid,
              GroupId: 1,
              Color: '#E3D617'
            });
          } else if (userskill.skill_id === 2) {
            this.addToBackUp.push({
              Name: `${userskill.user_first_name} ${userskill.user_name}`,
              Id: userskill.user_uuid,
              GroupId: 1,
              Color: '#17AFE3'
            });
          } else if (userskill.skill_id === 3) {
            this.addToBackUp.push({
              Name: `${userskill.user_first_name} ${userskill.user_name}`,
              Id: userskill.user_uuid,
              GroupId: 1,
              Color: '#7DC37D'
            });
          } else {
            this.addToBackUp.push({
              Name: `${userskill.user_first_name} ${userskill.user_name}`,
              Id: userskill.user_uuid,
              GroupId: 1,
              Color: '#D3D3D3'
            });
          }
        });
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  getFetchData () {
    this.onCallService.findOnCalls().subscribe(
      data => {
        data.forEach((event: any) => {
          if ( event.primary_backup ) {
            this.getAddEvent(event.year_id, event.week_id, `${event.reason}`, event.user_uuid, event.date_start, event.date_end, event.isDate);
          } else if ( event.emergency_backup ) {
            this.getAddEvent(event.year_id, event.week_id, `${event.reason}`, event.user_uuid, event.date_start, event.date_end, event.isDate);
          }
        })
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }
  
  getAddEvent(year: number, weekNumber: number, text: string,  user_id: string, date_start: any, date_end: any, isDate: boolean) {
    const startDate = this.getStartDateOfWeek(year, weekNumber);
    const endDate = this.getEndDateOfWeek(year, weekNumber);

    console.log(startDate, endDate, text);

    if ( isDate ){
      this.addToEvents.push({ 
        Id: this.nextId, 
        Subject: text, 
        StartTime: new Date(date_start), 
        EndTime: new Date(date_end), 
        EmployeeId: user_id 
      });
    } else {
      this.addToEvents.push({ 
        Id: this.nextId, 
        Subject: text, 
        StartTime: new Date(startDate), 
        EndTime: new Date(endDate), 
        EmployeeId: user_id 
      });
    }

    this.nextId++;
  }

  private getStartDateOfWeek(year: number, weekNumber: number): Date {
    const januaryFirst = new Date(year, 0, 1);
    const dayOfWeek = januaryFirst.getDay(); // 0 (Dimanche) à 6 (Samedi)
    let firstMonday: Date;
  
    // Si le 1er janvier est un lundi
    if (dayOfWeek === 1) {
      firstMonday = januaryFirst;
    } else {
      // Sinon, trouver le premier lundi de l'année
      const daysUntilFirstMonday = (8 - dayOfWeek) % 7;
      firstMonday = new Date(year, 0, 1 + daysUntilFirstMonday);
    }
  
    // Calculer la date de début de la semaine spécifiée
    const daysOffset = (weekNumber - 1) * 7;
    const startOfWeek = new Date(firstMonday);
    startOfWeek.setDate(firstMonday.getDate() + daysOffset);
  
    return startOfWeek;
  }
  
  private getEndDateOfWeek(year: number, weekNumber: number): Date {
    const startDate = this.getStartDateOfWeek(year, weekNumber);
    const endDate = new Date(startDate);
  
    // Déplacer au dimanche de la semaine
    endDate.setDate(startDate.getDate() + 6);
  
    return endDate;
  }
  
    
}
