import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {SortingType, Workbook} from '../models/models';
import {StorageService} from '../services/storage.service';
import {ChartBuilderService} from '../services/chart-builder.service';
import {ChartComponent} from '../UI/chart/chart.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-charts-container',
  imports: [
    CommonModule,
    ChartComponent
  ],
  template: `
    <app-chart><svg #barSvg></svg></app-chart>
    <app-chart><svg #pieSvg></svg></app-chart>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsContainerComponent implements AfterViewInit {

  storage: StorageService = inject(StorageService)

  private chartBuilder: ChartBuilderService = inject(ChartBuilderService)

  @ViewChild('barSvg', { static: false })
  private barSvgRef: ElementRef<SVGSVGElement> | null = null;

  @ViewChild('pieSvg', { static: false })
  private pieSvgRef: ElementRef<SVGSVGElement> | null = null;

  ngAfterViewInit() {
    this.storage.renderRelated$
      .subscribe(([workbook, sorting, hideIf]: [Workbook | null, SortingType, number | null]) => {
        if (!workbook) {
          return
        }

        const numberUsedToHide = typeof hideIf === 'number' ? hideIf + 1 : 0
        const data = workbook.data
          .filter(item => item.value >= numberUsedToHide);

        switch (sorting) {
          case SortingType.ASCENDING:
            data.sort((itemA, itemB) =>
              itemA.category.toLowerCase().localeCompare(itemB.category.toLowerCase())
            )
            break;
          case SortingType.DESCENDING:
            data
              .sort((itemA, itemB) =>
                itemA.category.toLowerCase().localeCompare(itemB.category.toLowerCase())
              )
              .reverse()
            break;
          case SortingType.REVERSE:
            data.reverse()
            break;
        }

        if (this.barSvgRef) {
          this.barSvgRef.nativeElement.textContent = ''
          this.chartBuilder.barChart(data, this.barSvgRef.nativeElement)
        }
        if (this.pieSvgRef) {
          this.pieSvgRef.nativeElement.textContent = ''
          this.chartBuilder.pieChart(data, this.pieSvgRef.nativeElement)
        }
      })
  }

}
