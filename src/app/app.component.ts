import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ChartsContainerComponent} from './UI-containers/charts-container/charts-container.component';
import {DataHandlerContainerComponent} from './UI-containers/data-handler-container/data-handler-container.component';
import {PrimengImportsModule} from './primeng/imports';

@Component({
  selector: 'app-root',
  imports: [
    ChartsContainerComponent,
    DataHandlerContainerComponent,
    PrimengImportsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'json Viz App';
}
