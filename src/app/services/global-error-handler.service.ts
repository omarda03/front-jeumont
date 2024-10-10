import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    handleError(error: any): void {
        console.error('Une erreur est survenue :', error);
        this.displayErrorMessage();
    }

    displayErrorMessage(): void {
        console.log('Une erreur est survenue. Veuillez contacter le support.');
    }
}
