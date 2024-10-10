import { Component, OnInit } from '@angular/core';
import { TagsService } from '../services/tags.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-config-categorie',
  templateUrl: './config-categorie.component.html',
  styleUrls: ['./config-categorie.component.scss']
})
export class ConfigCategorieComponent  implements OnInit {
  form!: FormGroup;
  tags: any[] = [];
  isCreateTagVisible: boolean = false;
  selectedTag:any ;
  isVisible: boolean = false;
  text: string = '';
  isError: boolean = false;
  isDeleteTagVisible: boolean = false;
  isUpdateTagVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private tagsService: TagsService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      tag_label: [''],
    });
    this.fetchTags();
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

  toggleCancel() {
    this.selectedTag = null;
    this.isCreateTagVisible = false;
    this.isDeleteTagVisible = false;
    this.isUpdateTagVisible = false;
  }

  toggleCreateTag () {
    this.isCreateTagVisible = !this.isCreateTagVisible;
  }
  
  updateTag() {
    if (this.selectedTag) {
      this.tagsService.editTag(this.selectedTag, this.selectedTag.tag_id).subscribe(
        response => {
          console.log('Successfully:', response);
          
          this.selectedTag = null;
          this.fetchTags();
          this.isUpdateTagVisible = !this.isUpdateTagVisible;
          this.text = `Tag has been successfully updated!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while updating the tag!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
          console.error('Erreur:', error);
        }
      );
    }
  }


  createTag () {
    const formData = this.form.value;
    this.tagsService.createTag(formData).subscribe(
      response => {
        console.log('Successfully:', response);
        this.form.reset();
        this.fetchTags();
        this.isCreateTagVisible = !this.isCreateTagVisible;
        this.text = `Tag has been successfully created!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
      },
      error => {
        this.isError = true;
        this.text = `There was an error while creating the tag!`;
        this.isVisible = true;
        setTimeout(() => {
          this.isVisible = false;
        }, 2000);
        console.error('Erreur:', error);
      }
    );
  }

  toggleDeleteTag () {
    this.isDeleteTagVisible = !this.isDeleteTagVisible;
  }
  
  toggleUpdateTag() {
    this.isUpdateTagVisible = !this.isUpdateTagVisible;
  }

  deletePiece () {
    if ( this.selectedTag ) {
      this.tagsService.deleteTag(this.selectedTag.tag_id).subscribe(
        response => {
          console.log('Successfully:', response);
          this.form = this.fb.group({
            piece_label: [''],
            piece_ref: [''],
            piece_ifs: [''],
            piece_uuid_piece: null
          });

          this.selectedTag = null;
          this.fetchTags();
          this.isDeleteTagVisible = !this.isDeleteTagVisible;
          this.isError = false;
          this.text = `Tag has been successfully deleted!`;
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
          }, 2000);
        },
        error => {
          this.isError = true;
          this.text = `There was an error while deleting the tag!`;
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
