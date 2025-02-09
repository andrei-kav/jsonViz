import {ChangeDetectionStrategy, Component, EventEmitter, Output, signal} from '@angular/core';
import {PrimengImportsModule} from '../../primeng/imports';

@Component({
  selector: 'app-upload-json-form',
  imports: [
    PrimengImportsModule
  ],
  templateUrl: './upload-json-form.component.html',
  styleUrl: './upload-json-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadJsonFormComponent {

  isHintVisible = signal(false);

  @Output()
  onUpload: EventEmitter<any> = new EventEmitter<any>()

  showHint() {
    this.isHintVisible.update(() => true)
  }

  hideHint() {
    this.isHintVisible.update(() => false)
  }

  getHint() {
    return `The structure of JSON should be following`
  }

  showMes(e: any) {
    console.log('success')
    console.log(e)
  }
  showErr(e: any) {
    console.log('error')
    console.log(e)
  }

}
