import {inject, Injectable} from '@angular/core';
import {CustomMessagesService} from './custom-messages.service';
import {WorkbookData} from '../models/models';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class JsonUploaderService {

  private customMessagesService: CustomMessagesService = inject(CustomMessagesService)
  private storage: StorageService = inject(StorageService)

  uploadJson(file: File | undefined) {
    if (!file) {
      this.customMessagesService.message('info', 'Info', 'No files chosen')
      return
    }

    if (file.type !== 'application/json') {
      this.customMessagesService.message('error', 'Error', 'Only JSON files are available')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      this.customMessagesService.message('error', 'Error', 'The file size is too big (max is 5MB)')
      return
    }

    this.handleFile(file as File)
  }

  private handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string)
        if (this.parseData(data)) {
          return this.storage.addWorkbook(file.name, data)
        }
        this.customMessagesService.message('error', 'Error', 'JSON structure is not correct')
      } catch (error: unknown) {
        this.customMessagesService.message('error', 'Error', 'JSON processing error occurred')
      }
    }
    reader.readAsText(file);
  }

  /**
   * Provided data should be of the type WorkbookData
   * { category: "any string", value: number }[]
   * @param data
   * @private
   */
  private parseData(data: unknown): data is WorkbookData {
    return Array.isArray(data) && data
      .every(item => typeof item === 'object'
        && Object.keys(item).length === 2
        && ['category', 'value'].every(value => Object.keys(item).includes(value))
        && typeof item['category'] === 'string'
        && typeof item['value'] === 'number'
      )
  }
}
