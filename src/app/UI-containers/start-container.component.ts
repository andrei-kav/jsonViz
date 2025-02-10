import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {CustomMessagesService} from '../services/custom-messages.service';
import {delay, of} from 'rxjs';
import {JsonUploaderService} from '../services/json-uploader.service';
import {StartComponent} from '../UI/start/start.component';

@Component({
  selector: 'app-start-container',
  imports: [
    StartComponent
  ],
  template: `
    <app-start
      [title]="'jsonViz'"
      [isHintVisible]="isJsonHintVisible()"
      (titleClicked)="onTitleClicked()"
      (fileUploaded)="onJsonUpload($event)"
      (showHintClicked)="onShowJsonHintClicked()"
    ></app-start>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartContainerComponent {

  isJsonHintVisible = signal(false);

  private customMessagesService: CustomMessagesService = inject(CustomMessagesService)
  private jsonService: JsonUploaderService = inject(JsonUploaderService)

  onJsonUpload(event: { files: File[] }) {
    this.jsonService.uploadJson(event?.files?.[0])
  }

  onShowJsonHintClicked() {
    this.isJsonHintVisible.update(() => true)
    this.customMessagesService.message('info', 'Info', this.getJsonStructureHintDetail())
    of(false)
      .pipe(delay(3000))
      .subscribe(value => this.isJsonHintVisible.update(() => value))
  }

  onTitleClicked() {
    console.log('go to')
  }

  private getJsonStructureHintDetail(): string {
    return `The Json structure shall be following:
      [ {"category": "any string", "value": number }, ... ].
      Data items containing negative values will be ignored during rendering.
      Sorting alphabetically is case-insensitive.
      Data files examples you can find in the "examples" folder under the root.
    `
  }

}
