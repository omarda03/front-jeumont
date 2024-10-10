import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NgApexchartsModule } from "ng-apexcharts";
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { TechnnavComponent } from './technnav/technnav.component';
import { CreatePrfmComponent } from './create-prfm/create-prfm.component';
import { CreatePrfsComponent } from './create-prfs/create-prfs.component';
import { CreatePrmaComponent } from './create-prma/create-prma.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FooterAuthComponent } from './footer-auth/footer-auth.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { TicketComponent } from './ticket/ticket.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { NavbarClientComponent } from './navbar-client/navbar-client.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { CustomersComponent } from './customers/customers.component';
import { DocumentsComponent } from './documents/documents.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CustomerComponent } from './customer/customer.component';
import { TicketPrfsComponent } from './ticket-prfs/ticket-prfs.component';
import { TicketPrfmComponent } from './ticket-prfm/ticket-prfm.component';
import { TicketPrmpComponent } from './ticket-prmp/ticket-prmp.component';
import { UpdatePrfsComponent } from './update-prfs/update-prfs.component';
import { UpdatePrfmComponent } from './update-prfm/update-prfm.component';
import { UpdatePrmaComponent } from './update-prma/update-prma.component';
import { ScheduleModule, ScheduleAllModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';

import { ConfigComponent } from './config/config.component';
import { ConfigPrfsComponent } from './config-prfs/config-prfs.component';
import { ConfigPrfmComponent } from './config-prfm/config-prfm.component';
import { ConfigPrmaComponent } from './config-prma/config-prma.component';
import { ConfigCategorieComponent } from './config-categorie/config-categorie.component';
import { ConfigUserComponent } from './config-user/config-user.component';
import { ConfigCustomerComponent } from './config-customer/config-customer.component';
import { PopupComponent } from './popup/popup.component';
import { ChatComponent } from './chat/chat.component';
import { OnCallPlanningComponent } from './on-call-planning/on-call-planning.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { StatistiqueClientComponent } from './statistique-client/statistique-client.component';
import { ListTicketClientComponent } from './list-ticket-client/list-ticket-client.component';
import { LogsComponent } from './logs/logs.component';
import { CustomersClientComponent } from './customers-client/customers-client.component';
import { GlobalErrorHandler } from './services/global-error-handler.service';
import { ModelCreateComponent } from './model-create/model-create.component';
import { ScheduleTestComponent } from './schedule-test/schedule-test.component';
import { ConfigShipsComponent } from './config-ships/config-ships.component';
import { ConfigDocumentsComponent } from './config-documents/config-documents.component';
import { ConfigPieceComponent } from './config-piece/config-piece.component';
import { TestChartComponent } from './test-chart/test-chart.component';
import { DataParserService } from './test-chart/data-parser.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    TechnnavComponent,
    CreatePrfmComponent,
    CreatePrfsComponent,
    CreatePrmaComponent,
    HeaderComponent,
    LoginComponent,
    FooterAuthComponent,
    ForgetPasswordComponent,
    TicketComponent,
    StatistiqueComponent,
    NotFoundComponent,
    AdminLayoutComponent,
    ClientLayoutComponent,
    NavbarClientComponent,
    NavbarAdminComponent,
    CustomersComponent,
    DocumentsComponent,
    TicketsListComponent,
    AuthLayoutComponent,
    ContactComponent,
    UnauthorizedComponent,
    CustomerComponent,
    TicketPrfsComponent,
    TicketPrfmComponent,
    TicketPrmpComponent,
    UpdatePrfsComponent,
    UpdatePrfmComponent,
    UpdatePrmaComponent,
    ConfigComponent,
    ConfigPrfsComponent,
    ConfigPrfmComponent,
    ConfigPrmaComponent,
    ConfigCategorieComponent,
    ConfigUserComponent,
    ConfigCustomerComponent,
    PopupComponent,
    ChatComponent,
    OnCallPlanningComponent,
    CalendrierComponent,
    StatistiqueClientComponent,
    ListTicketClientComponent,
    LogsComponent,
    CustomersClientComponent,
    ModelCreateComponent,
    ScheduleTestComponent,
    ConfigShipsComponent,
    ConfigDocumentsComponent,
    ConfigPieceComponent,
    TestChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    NgApexchartsModule,
    CommonModule,
    ScheduleModule,
    RecurrenceEditorModule,
    ScheduleAllModule,
  ],
  providers: [
    DayService, 
    WeekService, 
    WorkWeekService, 
    MonthService, 
    MonthAgendaService,
    CookieService, 
    { 
      provide: JWT_OPTIONS, 
      useValue: JWT_OPTIONS 
    },
    { 
      provide: ErrorHandler, 
      useClass: GlobalErrorHandler 
    },
    JwtHelperService,
    DataParserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
