import { Component, Input, OnInit } from '@angular/core';
import { ConversationService } from '../services/conversation.service';
import { MessageService } from '../services/message.service';
import { CookieService } from 'ngx-cookie-service';
import { OnCallService } from '../services/on-call.service';
import { UsersService } from '../services/users.service';
import { TicketsService } from '../services/tickets.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() idAsked: any;
  addUserOnCharge: boolean = false;
  messages: any[] = [];
  conversation: any;
  newMessage: string = '';
  onCallsWeek: any[] = [];
  isHovered:boolean = false;
  isHoveredButton:boolean = false;
  idMessage: string = '';
  userMail: string = '';
  userEmail: string = '';
  userId: string = '';
  messageId: any;
  suggestions: any[] = [];
  message_public: boolean = false;
  message_important: boolean = false;
  isDeleteMessageVisible: boolean = false;

  constructor(
    private onCallService: OnCallService,
    private ticketsService: TicketsService,
    private conversationService: ConversationService,
    private messageService: MessageService,
    private cookieService: CookieService,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getOnCallNextWeek();
    this.fetchConversationByAsked();
  }

  onInputChange() {
    this.searchUsers();
  }

  isSalesSupportDisabled(): boolean {
    return this.authService.getUserRole() === 3 
  }

  isCustomerEnabled(): boolean {
    return this.authService.getUserRole() === 10 || this.authService.getUserRole() === 11 || this.authService.getUserRole() === 12;
  }

  taggeUser(email: string) {
    this.ticketsService.getOneAskedData(this.idAsked).subscribe(
      (result) => {
        console.log(result);
        const data = {
          email: email,
          asked_ref: result.asked_ref
        }
    
        this.ticketsService.taggingUser(data).subscribe(
          (data) => {
            
          },
          (error) => {
            console.error('Erreur:', error);
          }
        );  
      },
      (error) => {
        console.error('Erreur:', error);
      }
    );
  }

  deleteMsg () {
    this.deleteMessage(this.messageId);
    this.toggleDeleteMessage();
  }

  deleteMessage (message_id: any) {
    this.messageService.deleteMessage(message_id).subscribe(
      response => {
        this.fetchMessagesConversation(this.conversation.convers_uuid);
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  toggleDeleteMessage() {
    this.isDeleteMessageVisible = !this.isDeleteMessageVisible;
  }

  onDoubleClick(message: any) {
    if (this.authService.getUserRole() === 1) {
      this.toggleDeleteMessage();
      this.messageId = message.message_id;
    } else if (this.authService.getUserRole() === 2) {
      if (this.authService.getUserRole() === message.User.role_id) {
        const messageCreatedTimestamp = new Date(message.message_created_date).getTime();

        const timeElapsed = Date.now() - messageCreatedTimestamp;        
        const hoursInMilliseconds = 72 * 60 * 60 * 1000;

        if (timeElapsed < hoursInMilliseconds) {
          this.toggleDeleteMessage();
          this.messageId = message.message_id;
        } else {
          alert("La date du message est supérieure à 72 heures.");
        }
      } else {
        alert("Vous n'avez pas le droit de supprimer ce message.");
      }
    } else {
      alert("Vous n'avez pas le droit de supprimer ce message.");
    }
  }  

  searchUsers() {
    this.usersService.findUsersTech(this.userEmail).subscribe(
      (data) => {
        this.suggestions = data;
      },
      (error) => {
        console.error('Erreur:', error);
      }
    );
  }

  selectSuggestionPrim(suggestion: string, user_uuid: string) {
    this.userId = user_uuid
    this.userEmail = suggestion;
    this.suggestions = [];
  }

  private fetchConversationByAsked (): void {
    if (this.idAsked) {
      this.conversationService.findConversationByAsked(this.idAsked).subscribe(
        data => {
          this.conversation = data;
          console.log(this.conversation);
          this.fetchMessagesConversation(data.convers_uuid);
        },
        error => {
          console.error('Erreur:', error);
        }
      );
    }
  }

  private fetchMessagesConversation (conversationUuid: string): void  {
    this.messageService.findMessagesByConversation(conversationUuid).subscribe(
      data => {
        this.messages = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  createAskedUser() {
    const data = { user_uuid: this.userId, asked_uuid: this.idAsked };

    this.ticketsService.createAskedUser(data).subscribe(
      response => {
        this.addUserOnCharge = false;
        this.userId = '';
        this.getOnCallNextWeek();
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

  createMessage(message: any) {
    const wordPattern = /@\S+/g;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    const words = message.message_text.match(wordPattern);
      
    console.log(words);
  
    if (words) {
      words.forEach((word: string) => {
        const email = word.substring(1); // Retire le symbole @
        if (emailPattern.test(email)) {
          console.log('Email extrait:', email);
          this.taggeUser(email);
        }
      });
    }
  
    this.messageService.createMessage(message).subscribe(
      response => {
        this.newMessage = '';
        this.fetchMessagesConversation(this.conversation.convers_uuid);
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }  
  
  get getUserUuid() {
    return this.cookieService.get('user_uuid')
  }

  toggleAddUserOnCall() { this.addUserOnCharge = !this.addUserOnCharge }

  sendMessage() {
    if (this.newMessage.trim() === '') { return }

    const user_uuid = this.cookieService.get('user_uuid');
    const message: any = { 
      message_text: this.newMessage, 
      convers_uuid: this.conversation.convers_uuid, 
      support_type_id: 3, 
      user_uuid,
      message_public: this.message_public,
      message_important: this.message_important
    };
    this.createMessage(message);
  }

  getImageSource(supportTypeId: number): string {
    if (supportTypeId === 4) {
      return 'assets/icons/whatsapp.png';
    } else if (supportTypeId === 1) {
      return 'assets/icons/mail.png';
    } else {
      return 'assets/icons/user.png';
    }
  }

  getOnCallNextWeek () {
    this.onCallService.findOnChangeId(this.idAsked).subscribe(
      data => {
        this.onCallsWeek = data;
      },
      error => {
        console.error('Erreur:', error);
      }
    );
  }

}
