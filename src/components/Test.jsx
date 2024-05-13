import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/react';

const BarChart = ({ data }) => {
  const svgRef = useRef();
  const legendRef = useRef(); // Reference for the legend SVG
  const [loading, setLoading] = useState(true); // State variable to track loading
  const [tooltipContent, setTooltipContent] = useState(null); // State variable for tooltip content

  // Function to update the chart
  const updateChart = () => {
    const margin = { top: 20, right: 20, bottom: 50, left: 70 };
    const svg = d3.select(svgRef.current); // Access SVG element using svgRef

    // Clear Existing Elements:
    // Remove all existing children of the SVG element
    svg.selectAll("*").remove();

    const legendSvg = d3.select(legendRef.current);
    legendSvg.selectAll("*").remove();

    // Creating Scales
    const keys = Object.keys(data[0] || {}).filter(key => key !== "Entity" && key !== "Code" && key !== "Year");
    const numYears = data.length;
    const barWidth = 200;
    const width = numYears * barWidth + margin.left + margin.right;
    const height = 700 - margin.top - margin.bottom;

    const newSvg = svg
      .attr("width", width)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x0 = d3.scaleBand()
      .domain(data.map(d => d.Year))
      .rangeRound([0, numYears * barWidth])
      .paddingInner(0.1);

    const x1 = d3.scaleBand()
      .domain(keys)
      .rangeRound([0, x0.bandwidth()])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d3.max(keys, key => d[key])) + 10000])
      .nice()
      .rangeRound([height, 0]);

    const color = d3.scaleOrdinal()
      .domain(keys)
      .range(d3.schemeCategory10);

    // Creating Bars
    newSvg.selectAll(".bar-group")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bar-group")
      .attr("transform", d => `translate(${x0(d.Year)},0)`)
      .selectAll("rect")
      .data(d => keys.map(key => ({ key, value: d[key] })))
      .enter()
      .append("rect")
      .attr("x", d => x1(d.key))
      .attr("y", d => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => y(0) - y(d.value))
      .attr("fill", d => color(d.key))
      .append("title")
      .text(d => `${d.key}: ${d.value}`)
      .on('mouseover', (event, d) => {
        setTooltipContent({
          location: d.Entity,
          year: d.Year,
          disease: d.key, // Access the disease name directly from d
          value: d.value, // Access the disease value directly from d
          x: event.pageX,
          y: event.pageY
        });
      })
      .on('mouseleave', () => {
        setTooltipContent(null);
      });

    // Adding Axes
    newSvg.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x0).tickSizeOuter(2));

    newSvg.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y));

    // Adding Axis Labels
    newSvg.append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.top + 20)
      .text("Year");

    newSvg.append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", 0 - height / 2)
      .attr("y", 0 - margin.left)
      .attr("dy", "1em")
      .text("Number of Deaths");

    // Legend
    const legend = legendSvg.selectAll(".legend")
      .data(keys)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(0,${i * 20})`);

    legend.append("rect")
      .attr("x", 0)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

    legend.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text(d => d)
      .style("cursor", "pointer");

    setLoading(false); // Set loading to false after rendering
  };

  useEffect(() => {
    updateChart(); // Call the updateChart function here
  }, [data]); // Include data in the dependency array

  useEffect(() => {
    // Render tooltip
    if (tooltipContent) {
      const tooltip = d3.select(svgRef.current.parentElement).append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      tooltip.transition().duration(200).style('opacity', 0.9);
      tooltip.html(
        `<strong>${tooltipContent.location}</strong><br>
        Year: ${tooltipContent.year}<br>
        Disease: ${tooltipContent.disease}<br>
        Value: ${tooltipContent.value}`
      )
      .style('left', `${tooltipContent.x}px`)
      .style('top', `${tooltipContent.y - 28}px`);
    } else {
      d3.select(".tooltip").remove();
    }
  }, [tooltipContent]);

  const spinnerStyle = css`
    display: block;
    margin: 0 auto;
  `;

  if (loading) {
    return (
      <div className="spinner-container flex flex-row justify-center m-4">
        <ClipLoader color="red" loading={loading} css={spinnerStyle} size={50} padding={20} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg ref={svgRef}></svg>
      </div>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg ref={legendRef}></svg>
      </div>
    </div>
  );
};

export default BarChart;
