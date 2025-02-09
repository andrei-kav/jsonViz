import {ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {SortingType, Workbook} from '../../models/models';
import {StorageService} from '../../services/storage.service';
import {ChartBuilderService} from '../../services/chart-builder.service';
import {ChartComponent} from '../../UI/chart/chart.component';

@Component({
  selector: 'app-charts-container',
  imports: [
    ChartComponent
  ],
  templateUrl: './charts-container.component.html',
  styleUrl: './charts-container.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsContainerComponent implements OnInit {

  private storage: StorageService = inject(StorageService)
  private chartBuilder: ChartBuilderService = inject(ChartBuilderService)

  @ViewChild('barSvg', { static: false })
  private barSvgRef: ElementRef<SVGSVGElement> | null = null;

  @ViewChild('pieSvg', { static: false })
  private pieSvgRef: ElementRef<SVGSVGElement> | null = null;

  ngOnInit() {
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
