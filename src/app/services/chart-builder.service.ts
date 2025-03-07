import {Injectable} from '@angular/core';
import {Selection} from 'd3-selection';
import * as d3 from 'd3';
import {DataItem, WorkbookData} from '../models/models';
import {ScaleSequential} from 'd3-scale';
import {PieArcDatum} from 'd3';

@Injectable({
  providedIn: 'root'
})
export class ChartBuilderService {

  private svgSize = { width: 700, height: 500 }
  private margin = { top: 30, right: 130, bottom: 30, left: 130 };
  private palette = d3.scaleSequential(d3.interpolateViridis);

  barChart(data: WorkbookData, svg: SVGSVGElement) {
    const {width, height} = this.svgSize
    const {left, top, bottom, right} = this.margin

    const svgSelection = d3.select(svg);
    svgSelection
      .attr('width', `${width}`)
      .attr('height', `${height}`);

    const innerWidth = width - left - right;
    const innerHeight = height - top - bottom;

    const maxValue = Math.max(...data.map(item => item.value))

    const colorScale = this.palette
      .domain([0, maxValue]);

    const xScale = d3.scaleBand()
      .domain(data.map(item => item.category))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .nice()
      .range([innerHeight, 0]);

    const mainGroup = svgSelection
      .append('g')
      .attr('transform', `translate(${left}, ${top})`);

    mainGroup
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', data => xScale(data.category) as number)
      .attr('y', data => yScale(data.value))
      .attr('width', xScale.bandwidth())
      .attr('height', data => innerHeight - yScale(data.value))
      .attr('fill', data => colorScale(data.value));

    mainGroup.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));

    mainGroup.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(yScale));

    this.addTooltip(svgSelection, 'bar', colorScale)
  }

  pieChart(data: WorkbookData, svg: SVGSVGElement) {
    const {width, height} = this.svgSize
    const {left, top, bottom, right} = this.margin

    const svgSelection = d3.select(svg);
    svgSelection
      .attr('width', `${width}`)
      .attr('height', `${height}`);

    const innerWidth = width - left - right;
    const innerHeight = height - top - bottom;

    const maxValue = Math.max(...data.map(item => item.value))
    const colorScale = this.palette
      .domain([0, maxValue]);

    const radius = Math.min(innerWidth, innerHeight) / 2;

    const mainGroup = svgSelection
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie<DataItem>()
      .value((d) => d.value)
      .sort(null);

    const arc = d3.arc<PieArcDatum<DataItem>>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = mainGroup
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (data) => colorScale(data.value));

    arcs.append('text')
      .attr('transform', (data) => `translate(${arc.centroid(data)})`)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .text(d => d.data.category);

    this.addTooltip(svgSelection, 'arc', colorScale)
  }

  private addTooltip(svg: Selection<SVGSVGElement, unknown, any, any>, targetSelector: string, colorScale: ScaleSequential<string>) {
    let tooltip = svg
      .append<SVGGElement>('g')
      .attr('class', 'tooltip')
      .style('pointer-events', 'none');

    const mouseover = (_: MouseEvent, item: DataItem | PieArcDatum<DataItem>) => {
      const data: DataItem = (item as PieArcDatum<DataItem>)['data'] || item as DataItem

      const container = tooltip
        .append('g')
        .attr('class', 'tooltip-label')

      // add tooltip text
      const text = container
        .append('text')
        .text(`Category: ${data.category}, Value: ${data.value}`)
        .attr('fill', '#000')

      // add tooltip background and align elements
      const textSize = container.node()?.getBBox() || {x: 0, y: 0, width: 0, height: 0}
      container.insert("rect", 'text')
        .attr('x', textSize.x - 5)
        .attr('y', textSize.y - 5)
        .attr('width', textSize.width + 10)
        .attr('height', textSize.height + 10)
        .attr('fill', '#fff')
        .attr('stroke', colorScale(data.value))
        .attr('stroke-width', '1')
        .attr('transform', `translate(${-textSize.width / 2}, ${-textSize.height/2})`)

      text.attr('transform', `translate(${-textSize.width / 2},${-textSize.height/2})`)
    };

    const mousemove = (event: MouseEvent) => {
      const position = d3.pointer(event, svg.node());
      tooltip.attr('transform', `translate(${position[0]},${position[1]})`)
    };

    const mouseout = () => {
      tooltip.select('.tooltip-label').remove();
    };

    svg.selectAll<SVGGElement, DataItem | PieArcDatum<DataItem>>(`[class=${targetSelector}]`)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseout', mouseout);
  }
}
