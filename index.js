const streamMargin = 5;
const streamHeight = 50;
const svgWidth = window.innerWidth - 50;
const height = (streams.length + 1) * (streamHeight + streamMargin);
const svg = d3.select('#svg1')
    .attr('width', svgWidth)
    .attr('height', height)
    .style('background-color', '#eee');

let startDate = new Date();
let endDate = Date.parse('1970-01-01');
for(const stream of streams) {
    for(const event of stream.events) {
        eventStartDate = event.startDate || '1970-01-01';
        event.parsedStartDate = Date.parse(eventStartDate);
        if (event.parsedStartDate < startDate) {
            startDate = event.parsedStartDate;
        }
        eventEndDate = event.endDate || new Date().toLocaleDateString();
        event.parsedEndDate = Date.parse(eventEndDate);
        if (event.parsedEndDate > endDate) {
            endDate = event.parsedEndDate;
        }
    }
}

const timeScale = d3.scaleTime()
    .domain([
        new Date(startDate),
        new Date(endDate)
    ])
    .range([0, svgWidth]);

const xAxis = d3.axisBottom()
                .scale(timeScale);

svg.append("g")
    .call(xAxis);

for(const stream of streams) {
    const y = stream.index * (streamHeight + streamMargin);
    for(const event of stream.events) {
        svg.append('line')
            .style("stroke", event.color || stream.color)
            .style("stroke-width", streamHeight)
            .attr("x1", timeScale(new Date(event.parsedStartDate)))
            .attr("y1", y)
            .attr("x2", timeScale(new Date(event.parsedEndDate)))
            .attr("y2", y);
    }
}
