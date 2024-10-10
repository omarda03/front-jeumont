import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { ScheduleComponent, GroupModel } from '@syncfusion/ej2-angular-schedule';
import { OnCallService } from '../services/on-call.service';
import { InfosService } from '../services/infos.service';
import { getISOWeek } from 'date-fns';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-schedule-test',
  templateUrl: './schedule-test.component.html',
  styleUrls: ['./schedule-test.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ScheduleTestComponent implements OnInit {
  errorMessage!: string;
  
  @ViewChild('scheduleObj') 
  public scheduleObj?: ScheduleComponent;

  @Input() addToBackUp: any[] = [];
  @Input() addToEvents: Record<string, any>[] = [];
  public data: Record<string, any>[] = [];
  public selectedDate: Date = new Date();
  public employeeDataSource: Record<string, any>[] = [];
  public nextId = 1;
  weeks: any[] = [];
  years: any[] = [];
  oncall: any = undefined;
  oncallToUpdate: any;
  oncalls: any[] = [];
  idWeek: number = 0;
  idYear: number = 0;
  date_start: Date = new Date();
  date_end: Date = new Date();
  userId: string = '';
  reason: string = '';
  primary_backup: boolean = false;
  emergency_backup: boolean = false;  
  indisponible: boolean = false;
  isAddEventVisible: boolean = false;
  isChangeEventVisible: boolean = false;
  isWeek: boolean = true;
  isDate: boolean = false;
  
  currentDate: Date = new Date();
  currentWeek: number = getISOWeek(this.currentDate);
  currentYear: number = this.currentDate.getFullYear();

  isVisible: boolean = false;
  text: string = '';
  isError: boolean = false;
  
  day = this.currentDate.getDate().toString().padStart(2, '0'); 
  month = (this.currentDate.getMonth() + 1).toString().padStart(2, '0');
  year = this.currentDate.getFullYear().toString();

  constructor(
    private infosService: InfosService, 
    private onCallService: OnCallService,
  ) {}

  ngOnInit() {
    const elementToRemove = document.querySelector('div[style*="position: fixed;"]');

    if (elementToRemove) {
      elementToRemove.remove();
    } else {
      console.log('Element not found');
    }

    this.updateData();
    this.fetchWeeks();
    this.fetchYears();
    this.findPlanifiers();
  }
  
  fetchWeeks() {
    this.infosService.getWeeks().subscribe(
      data => {
        this.weeks = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  fetchYears() {
    this.infosService.getYears().subscribe(
      data => {
        this.years = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  findPlanifiers() {
    this.onCallService.findOnCalls().subscribe(
      response => {
        this.oncalls = response;
      },
      error => {
        console.error('Erreur:', error);
      }
    )    
  }

  updateCheckbox(checkboxType: string) {
    if (checkboxType === 'isDate' && this.isDate) {
      this.isWeek = !this.isDate ;
    } else if (checkboxType === 'isWeek' && this.isWeek) {
      this.isDate = !this.isWeek ; 
    }
  }
  

  private updateData() {
    this.employeeDataSource = this.addToBackUp;
    this.data = extend([], this.addToEvents, undefined, true) as Record<string, any>[];
    this.data = this.data.map((event: Record<string, any>) => ({
      ...event
    }));

    this.eventSettings = { 
      dataSource: this.data,
      fields: {
        subject: { title: 'Event Name', name: 'Subject', default: 'Add Name' },
        description: { title: 'Summary', name: 'Description' },
        startTime: { title: 'From', name: 'StartTime' },
        endTime: { title: 'To', name: 'EndTime' }
      } 
    };
  }

  toggleAddEvent () {
    this.isAddEventVisible = !this.isAddEventVisible;
  }

  toggleUpdateEvent () {
    this.isChangeEventVisible = !this.isChangeEventVisible;
  }

  onUpdatePlanning() {
    this.onCallService.putOnCallsById(this.oncall.on_call_support_uuid, this.oncallToUpdate).subscribe(
      response => {
        console.log(response);
        this.isError = false;
        this.text = `Event has been successfully updated!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
        window.location.reload();
      },
      error => {
        this.isError = true;
        this.text = `There was an error while updating!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
        console.error('Erreur:', error);
      }
    ) 
  }

  assignOnCallToUpdate() {
    this.oncallToUpdate = { ...this.oncall };
  }

  genererAstreintes() {
    const doc = new jsPDF.jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
  
    const title = 'Recapitulatif des Astreintes';
    const headers = [['Name', 'Event Subject', 'Start Time', 'End Time', 'Number of Days']];

    // Map user data to a dictionary for quick lookup
    const userDict = this.addToBackUp.reduce((acc, user) => {
      acc[user.Id] = user.Name;
      return acc;
    }, {});

    // Group events by user
    const groupedEvents = this.addToEvents.reduce((acc, event) => {
      const userName = userDict[event['EmployeeId']];
      if (!acc[userName]) {
        acc[userName] = [];
      }
      acc[userName].push(event);
      return acc;
    }, {});

    let bodyData = [];

    // Prepare data for autoTable
    for (const [userName, userEvents] of Object.entries(groupedEvents)) {
      bodyData.push([{ content: userName, colSpan: 5, styles: { fillColor: '#D3D3D3' } }]);
      userEvents.forEach((event: any) => {
        const startTime: any = new Date(event.StartTime);
        const endTime: any = new Date(event.EndTime);
        const numberOfDays = Math.ceil((endTime - startTime) / (1000 * 60 * 60 * 24));
        bodyData.push([
          '',
          event.Subject,
          startTime.toLocaleString(),
          endTime.toLocaleString(),
          numberOfDays
        ]);
      });
    }

    autoTable(doc, {
      head: headers,
      body: bodyData,
      startY: 20, // Start after the title
    });

    // Sample data for demonstration purposes
    // const data = [
    //   ['John Doe', '2023-01-01', '2023-01-05'],
    //   ['Jane Smith', '2023-02-10', '2023-02-12'],
    //   ['Alice Johnson', '2023-03-15', '2023-03-20'],
    // ];

    // console.log(this.addToBackUp);
    // console.log(this.addToEvents);

    // autoTable(doc, {
    //   head: headers,
    //   body: data,
    // })
  
    let yPosition = 10;
    doc.setFontSize(18);
    doc.text(title, 10, yPosition);
  
    yPosition += 10;
  
    doc.save(`astreintes_${this.day}${this.month}${this.year}.pdf`);
  }

  onDeletePlanning() {
    this.onCallService.deleteOnCallsById(this.oncall.on_call_support_uuid).subscribe(
      response => {
        console.log(response);
        this.isError = false;
        this.text = `Event has been successfully deleted!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
        window.location.reload();
      },
      error => {
        this.isError = true;
        this.text = `There was an error while deleting!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
        console.error('Erreur:', error);
      }
    )    
  }
  
  cancelUpdatePlanning () {
    this.toggleUpdateEvent();
    this.oncall = undefined ;
  }

  onActionFailure(eventData: any): void {
    console.log(eventData);
  }

  onAddToPlanning() {

    if ( this.primary_backup && this.emergency_backup && this.isWeek ) {
      this.errorMessage = "Please select either primary or emergency.";
      setTimeout(() => { this.errorMessage = ''; }, 5000);
    } else if ( !this.primary_backup && !this.emergency_backup && this.isWeek ) {
      this.errorMessage = "Please select either primary or emergency.";
      setTimeout(() => { this.errorMessage = ''; }, 5000);
    } else {
      const data = {
        user_uuid: this.userId,  
        week_id: this.idWeek == 0 ? null : this.idWeek,
        year_id: this.idYear == 0 ? null : this.idYear, 
        date_start: this.date_start,
        date_end: this.date_end,
        reason: this.reason,
        isWeek: this.isWeek,
        isDate: this.isDate,
        primary_backup: this.primary_backup,
        emergency_backup: this.emergency_backup,
        indisponible: this.indisponible
      }
  
      this.onCallService.createOnCall(data).subscribe(
        response => {
          console.log('Successfully:', response);
          
          this.getAddEventSche(response);
  
          this.date_start = new Date();
          this.date_end = new Date();
          this.idWeek = 0;
          this.idYear = 0;
          this.userId = '';
          this.reason = '';
          this.primary_backup = false;
          this.emergency_backup = false;
          this.indisponible = false; 
  
          this.toggleAddEvent();
          
          this.isError = false;
          this.text = `Event has been successfully created!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while creating!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
          console.error('Erreur:', error);
        }
      )
    }

  }

  

  getAddEventSche(response: any) {
    const startDate = this.getStartDateOfWeek(response.year_id, response.week_id);
    const endDate = this.getEndDateOfWeek(response.year_id, response.week_id);

    let newEvent;

    if ( this.idWeek == 0 && this.idYear == 0 ) {
      newEvent = {
        EmployeeId: response.user_uuid,
        Subject: response.primary_backup ? `${response.reason} : Primary`: `${response.reason} : Emergency`,
        StartTime: new Date(this.date_start), 
        EndTime: new Date(this.date_end),
      };
    } else {
      newEvent = {
        EmployeeId: response.user_uuid,
        Subject: response.primary_backup ? `${response.reason} : Primary`: `${response.reason} : Emergency`,
        StartTime: new Date(startDate), 
        EndTime: new Date(endDate),
      };
    }

    this.eventSettings.dataSource.push(newEvent);
    
    this.scheduleObj?.refresh();
  }

  formatDate(date: any): any {
    return new Date(date).toISOString().slice(0, 16);
  }

  toDateString(date: Date): string {
    return (date.getFullYear().toString() + '-' 
       + ("0" + (date.getMonth() + 1)).slice(-2) + '-' 
       + ("0" + (date.getDate())).slice(-2))
       + 'T' + date.toTimeString().slice(0,5);
  }

  getFetchData () {
    this.onCallService.findOnCalls().subscribe(
      data => {
        data.forEach((event: any) => {
          if ( event.primary_backup ) {
            this.getAddEvent(event.year_id, event.week_id, `${event.reason} : Primary`, event.user_uuid);
          } else if ( event.emergency_backup ) {
            this.getAddEvent(event.year_id, event.week_id, `${event.reason} : Emergency`, event.user_uuid);
          }
        })
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  getAddEvent(year: number, weekNumber: number, text: string,  user_id: string) {
    const startDate = this.getStartDateOfWeek(year, weekNumber);
    const endDate = this.getEndDateOfWeek(year, weekNumber);

    this.addToEvents.push({ Id: this.nextId, Subject: text, StartTime: new Date(startDate), EndTime: new Date(endDate), EmployeeId: user_id });
    this.nextId++;
  }

  private getStartDateOfWeek(year: number, weekNumber: number): Date {
    const januaryFirst = new Date(year, 0, 1);
    const daysOffset = (weekNumber - 1) * 7;
    const startOfWeek = new Date(januaryFirst);

    startOfWeek.setDate(januaryFirst.getDate() + (7 - januaryFirst.getDay()) + daysOffset);
    return startOfWeek;
  }

  private getEndDateOfWeek(year: number, weekNumber: number): Date {
    const startDate = this.getStartDateOfWeek(year, weekNumber);
    const endDate = new Date(startDate);

    endDate.setDate(startDate.getDate() + 6);
    return endDate;
  }

  public allowInline = true;
  public group: GroupModel = { 
    resources: ['Employee'], 
    allowGroupEdit: true
  };
  public allowMultiple = false;
  public eventSettings: any;

  public getEmployeeName(value: any): string {
    const details = value;
    if (details.resource && details.resource.textField !== undefined) {
      return details.resourceData[details.resource.textField] as string;
    }
    return '';
  }

  public getEmployeeDesignation(value: any): string {
    const details = value;
    if (details.resource && details.resource.textField !== undefined) {
      const resourceName: string = details.resourceData[details.resource.textField] as string;
      return details.resourceData['Designation'] as string;
    }
    return ''; 
  }

  public getEmployeeImageName(value: any): string {
    return this.getEmployeeName(value).toLowerCase();
  }

  addNewEvent() {
    const newEvent = {
      EmployeeId: 'fa4a5716-6e0d-4a68-9908-1ea499569fab',
      Subject: 'Nouvel événement',
      StartTime: new Date(),
      EndTime: new Date(new Date().getTime() + (60 * 60 * 1000))
    };

    this.eventSettings.dataSource.push(newEvent);

    this.scheduleObj?.refresh();
  }
}