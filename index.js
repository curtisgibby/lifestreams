const streamMargin = 5;
const streamHeight = 50;
const svgWidth = window.innerWidth - 50;
const height = (streams.length + 1) * (streamHeight + streamMargin);
const svg = d3.select('#svg1')
    .attr('width', svgWidth)
    .attr('height', height)
    .style('background-color', '#eee');

const timeScale = d3.scaleTime()
    .domain([new Date(1981, 4, 3), new Date()])
    .range([0, svgWidth])
    ;

for(const stream of streams) {
    let y = stream.index * (streamHeight + streamMargin);
    for(const event of stream.events) {
        if (!event.endDate) {
            event.endDate = new Date().toLocaleDateString();
        }
        svg.append('line')
            .style("stroke", event.color || stream.color)
            .style("stroke-width", streamHeight)
            .attr("x1", timeScale(Date.parse(event.startDate)))
            .attr("y1", y)
            .attr("x2", timeScale(Date.parse(event.endDate)))
            .attr("y2", y);
    }
}
