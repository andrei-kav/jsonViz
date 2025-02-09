import {Injectable} from '@angular/core';
import {Selection} from 'd3-selection';
import * as d3 from 'd3';
import {WorkbookData} from '../models/models';
import {ScaleSequential} from 'd3-scale';

@Injectable({
  providedIn: 'root'
})
export class ChartBuilderService {

  private svgSize = { width: 800, height: 500 }
  private margin = { top: 20, right: 180, bottom: 40, left: 190 };
  private palette = d3.scaleSequential(d3.interpolateViridis);

  barChart(data: WorkbookData, svg: SVGSVGElement) {

    const {width, height} = this.svgSize
    const {left, top, bottom, right} = this.margin

    const svgSelection = d3.select(svg);
    svgSelection.attr('width', `${width}`);
    svgSelection.attr('height', `${height}`);

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

    const g = svgSelection.append('g')
      .attr('transform', `translate(${left}, ${top})`);

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', data => xScale(data.category) as number)
      .attr('y', data => yScale(data.value))
      .attr('width', xScale.bandwidth())
      .attr('height', data => innerHeight - yScale(data.value))
      .attr('fill', data => colorScale(data.value));

    g.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale));

    g.append('g')
      .attr('class', 'y axis')
      .call(d3.axisLeft(yScale));

    this.addTooltip(svgSelection, 'bar', colorScale)
  }

  private addTooltip(svg: Selection<SVGSVGElement, unknown, any, any>, targetSelector: string, colorScale: ScaleSequential<string>) {
    let tooltip = svg
      .append<SVGGElement>('g')
      .attr('class', 'tooltip')
      .style('pointer-events', 'none');

    const mouseover = (_: any, item: any) => {
      const container = tooltip
        .append('g')
        .attr('class', 'tooltip-label')

      // add tooltip text
      const text = container
        .append('text')
        .text(`Category: ${item.category}, Value: ${item.value}`)
        .attr('fill', '#000')

      // add tooltip background and align elements
      const textSize = container.node()?.getBBox() || {x: 0, y: 0, width: 0, height: 0}
      container.insert("rect", 'text')
        .attr('x', textSize.x - 5)
        .attr('y', textSize.y - 5)
        .attr('width', textSize.width + 10)
        .attr('height', textSize.height + 10)
        .attr('fill', '#fff')
        .attr('stroke', colorScale(item.value))
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

    const bars = svg.selectAll(`[class=${targetSelector}]`);
    bars.on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseout', mouseout);
  }
}
