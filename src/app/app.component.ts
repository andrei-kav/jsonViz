import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ChartsContainerComponent} from './UI-containers/charts-container.component';
import {DataHandlerContainerComponent} from './UI-containers/data-handler-container.component';
import {PrimengImportsModule} from './primeng/imports';
import {StorageService} from './services/storage.service';
import {StartContainerComponent} from './UI-containers/start-container.component';

@Component({
  selector: 'app-root',
  imports: [
    StartContainerComponent,
    ChartsContainerComponent,
    DataHandlerContainerComponent,
    PrimengImportsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  storage: StorageService = inject(StorageService)

}
