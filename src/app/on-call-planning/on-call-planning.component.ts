import { Component, Input, OnInit } from '@angular/core';
import { OnCallService } from '../services/on-call.service';

@Component({
  selector: 'app-on-call-planning',
  templateUrl: './on-call-planning.component.html',
  styleUrls: ['./on-call-planning.component.scss']
})

export class OnCallPlanningComponent  implements OnInit {
  
  @Input() user: string | undefined;
  @Input() week: number | undefined;
  @Input() year: number | undefined;
  onCall: any;
  skill: any;
  title: string= '';
  nameToshow: string='';

  constructor(
    private oncallService: OnCallService,
  ) {}
  
  ngOnInit(): void {
    this.fetchOnCall();
  }
  
  fetchOnCall() {
    if ( this.user && this.week && this.year ) {
      this.oncallService.findOnCallsById(this.user, this.week, this.year).subscribe(
        data => {
          this.onCall = data.onCall;
          this.skill = data.userSkill;
          this.title = `${data.onCall.User.user_name} ${data.onCall.User.user_first_name}`
          const split = this.title.split(" ");
          this.nameToshow = `${split[0][0]}.${split[1][0]}.`
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getBackgroundColor(skillId: number): string {
    switch (skillId) {
      case 1:
        return 'yellow';
      case 2:
        return 'blue';
      case 3:
        return 'yellow'; 
      default:
        return 'white'; 
    }
  }
}

