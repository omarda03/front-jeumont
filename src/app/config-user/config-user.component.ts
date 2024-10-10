import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-config-user',
  templateUrl: './config-user.component.html',
  styleUrls: ['./config-user.component.scss']
})
export class ConfigUserComponent implements OnInit {
  form!: FormGroup;
  formCheck!: FormGroup;
  formPassword!: FormGroup;
  roles: any[] = [];
  isChangePasswordVisible: boolean = false;  
  isDeleteUserVisible: boolean = false;
  user_uuid!: string;
  user_uuid_password!: string;
  user_uuid_delete!: string;
  suggestions: any[] = [];
  isVisible: boolean = false;
  text: string = '';
  isError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService, 
  ) {}
  
  ngOnInit () {
    this.formCheck = this.fb.group({ user_email: [''] });
    this.formPassword = this.fb.group({ user_password: [''], user_password_confirm: [''] });

    this.form = this.fb.group({
      user_email: [''],
      user_name: [''],
      user_first_name: [''],
      user_numero: [''],
      role_id: 0,
    });

    this.fetchRoles();
  }

  private fetchRoles (): void {
    this.usersService.getRoles().subscribe(
      data => {
        this.roles = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  submitFormUser () {
    const formData = this.form.value;

    if (this.user_uuid) {
      this.usersService.editUser(formData, this.user_uuid).subscribe(
        response => {
          console.log('Updated:', response);
          this.form.reset();
          this.user_uuid = '';
          this.isError = false;
          this.text = `User has been successfully updated!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while updating user!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
          console.error('Erreur:', error);
        }
      );
    } else {
      this.usersService.createUser(formData).subscribe(
        response => {
          console.log('Created:', response);
          this.form.reset();
          this.isError = false;
          this.text = `User has been successfully created!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while creating user!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
          console.error('Erreur:', error);
        }
      );
    }
  }

  cancelCreationUser () {
    this.form.reset(); 
    this.user_uuid = '';
  }

  toggleDeleteUser () {
    const userEmail = this.formCheck.get('user_email')?.value;
    if ( userEmail ) {
      this.usersService.findUser(userEmail).subscribe(
        response => {
          console.log('Successfully:', response);
          this.user_uuid_delete = response.user_uuid,
          this.isDeleteUserVisible = !this.isDeleteUserVisible
          this.isError = false;
          this.text = `User has been successfully deleted!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while deleting user!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
          console.error('Erreur:', error);
        }
      );
    }  
  }
  
  toggleChangePassword () {
    const userEmail = this.formCheck.get('user_email')?.value;
    if ( userEmail ) {
      this.usersService.findUser(userEmail).subscribe(
        response => {
          console.log('Successfully:', response);
          this.user_uuid_password = response.user_uuid,
          this.isChangePasswordVisible = !this.isChangePasswordVisible;
          
          this.isError = false;
          this.text = `User has been successfully updated!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while updating user!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
          console.error('Erreur:', error);
        }
      );
    } 
  }

  editUser () {
    const userEmail = this.formCheck.get('user_email')?.value;
    if ( userEmail ) {
      this.usersService.findUser(userEmail).subscribe(
        response => {
          console.log('Successfully:', response);
          this.user_uuid = response.user_uuid,
    
          this.form.patchValue({
            user_email: response.user_email,
            user_name: response.user_name,
            user_first_name: response.user_first_name,
            user_numero: response.user_numero,
            role_id: response.role_id,
          });
    
          this.formCheck.reset();
          this.isError = false;
          this.text = `User has been successfully updated!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while updating user!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
          console.error('Erreur:', error);
        }
      );
    }
  }

  changePassword() {
    const password = this.formPassword.get('user_password')?.value;
    const passwordConfirm = this.formPassword.get('user_password_confirm')?.value;
  
    if (password !== passwordConfirm) {
      console.log("Les mots de passe ne correspondent pas.");
      return;
    }
  
    const requestData = { user_password: password, user_password_confirm: passwordConfirm };
  
    this.usersService.editPasswordUser(requestData, this.user_uuid_password).subscribe(
      response => {
        console.log('Successfully:', response);
        this.user_uuid_password = '';
        this.isChangePasswordVisible = !this.isChangePasswordVisible;
        this.formPassword.reset();
        this.formCheck.reset();
        this.isError = false;
        this.text = `User has been successfully updating!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
      },
      error => {
        this.isError = true;
        this.text = `There was an error while updating user!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
        console.error('Erreur:', error);
      }
    );
  }
  
  cancelChangePassword () {
    this.user_uuid_password = '',
    this.formPassword.reset();
    
    this.isChangePasswordVisible = !this.isChangePasswordVisible;
  }

  deleteUser() {
    if (this.user_uuid_delete) {
      this.usersService.deleteUser(this.user_uuid_delete).subscribe(
        response => {
          console.log('Successfully:', response);
          this.user_uuid_delete = '',
          this.formCheck.reset();
          this.isDeleteUserVisible = !this.isDeleteUserVisible;
          
          this.isError = false;
          this.text = `User has been successfully deleting!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while deleting user!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
          console.error('Erreur:', error);
        }
      );
    }  
  }

  onInputChange() {
    this.searchUsers();
  }

  searchUsers() {
    const userEmail = this.formCheck.get('user_email')?.value;

    if (userEmail.trim() !== '') {
      this.usersService.findUsers(userEmail).subscribe(
        (data) => {
          this.suggestions = data;
        },
        (error) => {
          console.error('Erreur:', error);
        }
      );
    }
  }

  selectSuggestion(suggestion: string) {
    this.formCheck.get('user_email')!.setValue(suggestion);
    this.suggestions = [];
  }
}
