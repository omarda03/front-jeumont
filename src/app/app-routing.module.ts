import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { TechnnavComponent } from './technnav/technnav.component';
import { CreatePrfmComponent } from './create-prfm/create-prfm.component';
import { CreatePrfsComponent } from './create-prfs/create-prfs.component';
import { CreatePrmaComponent } from './create-prma/create-prma.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { DocumentsComponent } from './documents/documents.component';
import { CustomersComponent } from './customers/customers.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './guard/auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthLoginGuard } from './guard/authLogin.guard';
import { CustomerComponent } from './customer/customer.component';
import { UpdatePrfsComponent } from './update-prfs/update-prfs.component';
import { UpdatePrfmComponent } from './update-prfm/update-prfm.component';
import { UpdatePrmaComponent } from './update-prma/update-prma.component';
import { ConfigComponent } from './config/config.component';
import { ConfigPrfsComponent } from './config-prfs/config-prfs.component';
import { ConfigPrfmComponent } from './config-prfm/config-prfm.component';
import { ConfigPrmaComponent } from './config-prma/config-prma.component';
import { ConfigCategorieComponent } from './config-categorie/config-categorie.component';
import { ConfigUserComponent } from './config-user/config-user.component';
import { ConfigCustomerComponent } from './config-customer/config-customer.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { StatistiqueClientComponent } from './statistique-client/statistique-client.component';
import { ListTicketClientComponent } from './list-ticket-client/list-ticket-client.component';
import { LogsComponent } from './logs/logs.component';
import { CustomersClientComponent } from './customers-client/customers-client.component';
import { ConfigShipsComponent } from './config-ships/config-ships.component';
import { ConfigDocumentsComponent } from './config-documents/config-documents.component';
import { ConfigPieceComponent } from './config-piece/config-piece.component';
import { TestChartComponent } from './test-chart/test-chart.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: AuthLayoutComponent, 
    canActivate: [AuthLoginGuard], 
    children: [
      { path: '', component: LoginComponent },
      { path: 'forget/password', component: ForgetPasswordComponent }, 
    ]
  }, 
  {
    path: 'rh',
    canActivate: [AuthGuard],
    data: { roles: [5] },
    component: AdminLayoutComponent,
    children: [
      { path: '', component: CalendrierComponent },
    ]
  }, 
  {
    path: 'client',
    canActivate: [AuthGuard],
    data: { roles: [10, 11, 12] },
    component: ClientLayoutComponent,
    children: [
      { path: '', component: ClientComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'customer', component: CustomersClientComponent },
      { path: 'customer/:customer_uuid', component: CustomerComponent },
      { path: 'update/prfs/:asked_uuid', component: UpdatePrfsComponent },
      { path: 'update/prfm/:asked_uuid', component: UpdatePrfmComponent },
      { path: 'update/prma/:asked_uuid', component: UpdatePrmaComponent },
      { path: 'document', component: DocumentsComponent },
      { path: 'statistique', component: StatistiqueClientComponent },
      { path: 'tickets', component: ListTicketClientComponent },
    ]
  },
  { 
    path: '',  
    canActivate: [AuthGuard], 
    data: { roles: [1, 2, 3, 4] }, 
    component: AdminLayoutComponent,
    children: [
      { path: '', component: TechnnavComponent },
      { path: 'chart/test', component: TestChartComponent },
      { path: 'document', component: DocumentsComponent },
      { path: 'customer', component: CustomersComponent },
      { path: 'log', component: LogsComponent },
      { path: 'customer/:customer_uuid', component: CustomerComponent },
      { path: 'statistique', component: StatistiqueComponent },
      { path: 'tickets', component: TicketsListComponent },
      { path: 'create/prfs', component: CreatePrfsComponent },
      { path: 'create/prfm', component: CreatePrfmComponent }, 
      { path: 'create/prma', component: CreatePrmaComponent }, 
      { path: 'update/prfs/:asked_uuid', component: UpdatePrfsComponent },
      { path: 'update/prfm/:asked_uuid', component: UpdatePrfmComponent },
      { path: 'update/prma/:asked_uuid', component: UpdatePrmaComponent },
      { path: 'calendrier', component: CalendrierComponent },
      { 
        path: 'config', 
        component: ConfigComponent,
        children: [
          { path: '', redirectTo: 'prfs', pathMatch: 'full' }, 
          { path: 'prfs', component: ConfigPrfsComponent },
          { path: 'prfm', component: ConfigPrfmComponent },
          { path: 'prma', component: ConfigPrmaComponent },
          { path: 'categories', component: ConfigCategorieComponent},
          { path: 'users', component: ConfigUserComponent },
          { path: 'customers', component: ConfigCustomerComponent },
          { path: 'ships', component: ConfigShipsComponent },
          { path: 'documents', component: ConfigDocumentsComponent },
          { path: 'pieces', component: ConfigPieceComponent }
        ] 
      },
    ]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  { path: '**', component: NotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
