import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedTitleService } from '../services/shared-title.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  searchForm!: FormGroup;
  isLoading = true; 
  customers: any[] = []; 
  ships: any[] = [];
  user_uuid: string = '';
  
  
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,    
    private cookieService: CookieService,
    private sharedTitleService: SharedTitleService,
    private authService: AuthService
  ) {
    this.searchForm = this.formBuilder.group({
      searchQuery: [''] 
    });
  }

  ngOnInit() {
    this.sharedTitleService.changeTitle('searchClient');
    this.fetchCustomers(); 
    this.user_uuid = this.cookieService.get('user_uuid');
  }

  isSalesSupportDisabled(): boolean {
    return this.authService.getUserRole() === 3 
  }

  fetchCustomers(): void {
    const searchQuery = this.searchForm.value.searchQuery;
    this.customerService.getCustomers(searchQuery).subscribe(
      data => {
        this.customers = data; 
        this.isLoading = false;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

}