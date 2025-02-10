import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PrimengImportsModule} from '../../primeng/imports';

@Component({
  selector: 'app-upload-json-form',
  imports: [
    PrimengImportsModule
  ],
  templateUrl: './upload-json-form.component.html',
  styleUrl: './upload-json-form.component.less',
})
export class UploadJsonFormComponent {

  @Input()
  isHintVisible = false;

  @Output()
  onUpload: EventEmitter<any> = new EventEmitter<any>()
  @Output()
  onShowHintClick: EventEmitter<any> = new EventEmitter<any>()

}
