import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {PrimengImportsModule} from '../../primeng/imports';

@Component({
  selector: 'app-start',
  imports: [
    PrimengImportsModule
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartComponent {

  @Input()
  title = ''
  @Input()
  isHintVisible = false

  @Output()
  titleClicked: EventEmitter<void> = new EventEmitter<void>()
  @Output()
  fileUploaded: EventEmitter<{ files: File[] }> = new EventEmitter<{ files: File[] }>()
  @Output()
  showHintClicked: EventEmitter<void> = new EventEmitter<void>()

}
