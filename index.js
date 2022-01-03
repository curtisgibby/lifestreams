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
        if (!event.startDate) {
            event.startDate = '1970-01-01';
        }
        parsedStartDate = Date.parse(event.startDate);
        if (parsedStartDate < startDate) {
            startDate = parsedStartDate;
        }
        if (!event.endDate) {
            event.endDate = new Date().toLocaleDateString();
        }
        parsedEndDate = Date.parse(event.endDate);
        if (parsedEndDate > endDate) {
            endDate = parsedEndDate;
        }
    }
}

const timeScale = d3.scaleTime()
    .domain([
        new Date(startDate),
        new Date(endDate)
    ])
    .range([0, svgWidth]);

// Add scales to axis
const xAxis = d3.axisBottom()
                .scale(timeScale);

//Append group and insert axis
svg.append("g")
    .call(xAxis);

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
