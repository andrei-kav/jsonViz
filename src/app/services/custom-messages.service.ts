import {inject, Injectable} from '@angular/core';
import {ConfirmationService, MessageService, ToastMessageOptions} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CustomMessagesService {

  private confirmationService: ConfirmationService = inject(ConfirmationService)
  private messageService: MessageService = inject(MessageService)

  private rejectButtonProps: Record<string, string | boolean> = {
    label: 'Cancel',
    icon: 'pi pi-times',
    outlined: true,
    size: 'small'
  }

  private acceptButtonProps: Record<string, string | boolean> = {
    label: 'Save',
    icon: 'pi pi-check',
    size: 'small'
  }

  private exclamationIcon = 'pi pi-exclamation-circle'

  confirm(message: string): ConfirmationService {
    return this.confirmationService.confirm({
      header: 'Confirmation',
      message: message,
      icon: this.exclamationIcon,
      rejectButtonProps: this.rejectButtonProps,
      acceptButtonProps: this.acceptButtonProps,
    })
  }

  message(severity: string, summary: string, detail: string, life?: number) {
    const options: ToastMessageOptions = { severity, summary, detail }
    if (life) {
      options.life = life
    }
    this.messageService.add(options)
  }

}
