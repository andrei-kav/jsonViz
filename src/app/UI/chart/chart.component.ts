import {ChangeDetectionStrategy, Component, Input, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-chart',
  imports: [
    CommonModule
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {

  @Input()
  svg: TemplateRef<SVGSVGElement> | null = null

}
