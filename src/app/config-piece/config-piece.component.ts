import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InfosService } from '../services/infos.service';

@Component({
  selector: 'app-config-piece',
  templateUrl: './config-piece.component.html',
  styleUrls: ['./config-piece.component.scss']
})
export class ConfigPieceComponent {  
  form!: FormGroup;
  formCheck!: FormGroup;
  pieces: any[] = [];
  selectedPiece: any = null;
  isDeletePieceVisible: boolean = false;
  user_uuid!: string;
  user_uuid_delete!: string;
  isVisible: boolean = false;
  text: string = '';
  isError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private infosService: InfosService
  ) {}

  ngOnInit () {
    this.formCheck = this.fb.group({ user_email: [''] });

    this.form = this.fb.group({
      piece_label: [''],
      piece_ref: [''],
      piece_ifs: [''],
      piece_uuid_piece: null
    });

    this.fetchPiece();
  }

  private fetchPiece() {
    this.infosService.getPieces().subscribe(
      data => {
        this.pieces = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  updateFormValues() {
    
    if (this.selectedPiece == null) {
      this.form.patchValue({
        piece_label: [''],
        piece_ref: [''],
        piece_ifs: [''],
        piece_uuid_piece: null
      });
    }

    this.form.patchValue({
      piece_label: this.selectedPiece.piece_label,
      piece_ref: this.selectedPiece.piece_ref,
      piece_ifs: this.selectedPiece.piece_ifs,
      piece_uuid_piece: this.selectedPiece.piece_uuid_piece
    });

  }

  submitFormShip () {
    const formData = this.form.value;

    if (this.selectedPiece) {
      this.infosService.updatePiece(formData, this.selectedPiece.piece_uuid).subscribe(
        response => {
          console.log('Updated:', response);

          this.form = this.fb.group({
            piece_label: [''],
            piece_ref: [''],
            piece_ifs: [''],
            piece_uuid_piece: null
          });

          this.selectedPiece = null;

          this.fetchPiece();
          this.isError = false;
          this.text = `Spare has been successfully updated!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while updating the spare!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
          console.error('Erreur:', error);
        }
      );
    } else {
      this.infosService.createPiece(formData).subscribe(
        response => {
          console.log('Created:', response);
          this.form = this.fb.group({
            piece_label: [''],
            piece_ref: [''],
            piece_ifs: [''],
            piece_uuid_piece: null
          });

          this.fetchPiece();
          this.isError = false;
          this.text = `Spare has been successfully created!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while creating the spare!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
          console.error('Erreur:', error);
        }
      );
    }
  }

  cancelCreationPiece () {
    this.form = this.fb.group({
      piece_label: [''],
      piece_ref: [''],
      piece_ifs: [''],
      piece_uuid_piece: null
    });
    
    this.selectedPiece = '';
  }

  toggleDeletePiece () {
    this.isDeletePieceVisible = !this.isDeletePieceVisible;
  }

  deletePiece () {
    if ( this.selectedPiece ) {
      this.infosService.deletePiece(this.selectedPiece.piece_uuid).subscribe(
        response => {
          console.log('Successfully:', response);
          this.form = this.fb.group({
            piece_label: [''],
            piece_ref: [''],
            piece_ifs: [''],
            piece_uuid_piece: null
          });

          this.selectedPiece = null;
          this.fetchPiece();
          this.isDeletePieceVisible = !this.isDeletePieceVisible;
          this.isError = false;
          this.text = `Spare has been successfully deleted!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while deleting the spare!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
          console.error('Erreur:', error);
        }
      );
    }  
  }

  }


