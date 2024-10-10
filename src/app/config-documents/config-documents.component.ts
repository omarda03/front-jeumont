import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InfosService } from '../services/infos.service';

@Component({
  selector: 'app-config-documents',
  templateUrl: './config-documents.component.html',
  styleUrls: ['./config-documents.component.scss']
})
export class ConfigDocumentsComponent {
  form!: FormGroup;
  formCheck!: FormGroup;
  categories: any[] = [];
  documentsInterne: any[] = [];
  users: any[] = [];
  isDeleteDocumentVisible: boolean = false;
  selectedDocument:any = null;
  isVisible: boolean = false;
  text: string = '';
  isError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService, 
    private infosService: InfosService
  ) {}
  
  ngOnInit () {
    this.formCheck = this.fb.group({ user_email: [''] });

    this.form = this.fb.group({ 
      doc_ref: [''],
      doc_description: [''],
      doc_type: [''],
      doc_size: 0,
      doc_last_version: [''],
      doc_localisation_numerique: [''],
      doc_url: [''],
      user_uuid: [''],
      cat_id: 0,
      localisation_espace_reseau: [''],
    });
    
    this.fetchDocuments();
    this.fetchUsers();
    this.fetchCategories();
  } 

  fetchCategories(): void {
    this.infosService.getCtageories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  private fetchUsers() {
    this.usersService.findUsers('').subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  updateFormValues() {
    
    console.log(this.selectedDocument, "selected")

    if (this.selectedDocument == null) {
      this.form.patchValue({        
        doc_ref: '',
        doc_description: '',
        doc_type: '',
        doc_size: 0,
        doc_last_version: '',
        doc_localisation_numerique: '',
        doc_url: '',
        user_uuid: '',
        cat_id: 0,
        localisation_espace_reseau: '',
      });
    }

    this.form.patchValue({
      doc_ref: this.selectedDocument.doc_ref,
      doc_description: this.selectedDocument.doc_description,
      doc_type: this.selectedDocument.doc_type,
      doc_size: this.selectedDocument.doc_size,
      doc_last_version: this.selectedDocument.doc_last_version,
      doc_localisation_numerique: this.selectedDocument.doc_localisation_numerique,
      doc_url: this.selectedDocument.doc_url,
      user_uuid: this.selectedDocument.user_uuid,
      cat_id: this.selectedDocument.cat_id,
      localisation_espace_reseau: this.selectedDocument.localisation_espace_reseau,
    });

  }

  private fetchDocuments() {
    this.infosService.getDocumentsAll().subscribe(
      data => {

        console.log(data);
        this.documentsInterne = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  submitFormUser () {
    const formData = this.form.value;

    if (this.selectedDocument) {
      this.infosService.updateDocument(formData, this.selectedDocument.doc_uuid).subscribe(
        response => {
          console.log('Updated:', response);

          this.form = this.fb.group({
            doc_ref: '',
            doc_description: '',
            doc_type: '',
            doc_size: 0,
            doc_last_version: '',
            doc_localisation_numerique: '',
            doc_url: '',
            user_uuid: '',
            cat_id: 0,
            localisation_espace_reseau: '',
          });

          this.selectedDocument = null;

          this.fetchDocuments();
          this.isError = false;
          this.text = `Document has been successfully updated!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while updating the document!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
          console.error('Erreur:', error);
        }
      );
    } else {
      this.infosService.createDocument(formData).subscribe(
        response => {
          console.log('Created:', response);
          this.form = this.fb.group({
            doc_ref: '',
            doc_description: '',
            doc_type: '',
            doc_size: 0,
            doc_last_version: '',
            doc_localisation_numerique: '',
            doc_url: '',
            user_uuid: '',
            cat_id: 0,
            localisation_espace_reseau: '',
          });

          this.fetchDocuments();
          this.isError = false;
          this.text = `Document has been successfully created!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while creating the document!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
          console.error('Erreur:', error);
        }
      );
    }
  }

  cancelCreationDocument () {
    this.form = this.fb.group({
      doc_ref: '',
      doc_description: '',
      doc_type: '',
      doc_size: 0,
      doc_last_version: '',
      doc_localisation_numerique: '',
      doc_url: '',
      user_uuid: '',
      cat_id: 0,
      localisation_espace_reseau: '',
    });
    this.selectedDocument = null;
  }

  toggleDeleteDocument () {
    this.isDeleteDocumentVisible = !this.isDeleteDocumentVisible
  }

  deleteDocument() {
    this.infosService.deleteDocument(this.selectedDocument.doc_uuid).subscribe(
      response => {
        console.log('Successfully:', response);
        this.cancelCreationDocument();
        this.toggleDeleteDocument();
        this.fetchDocuments();
        this.isError = false;
        this.text = `Document has been successfully deleted!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
      },
      error => {
        this.isError = true;
        this.text = `There was an error while deleting the document!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
        console.error('Erreur:', error);
      }
    ); 
  }
}

