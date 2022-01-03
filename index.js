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

const tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("padding", ".1rem")
    .style("background", "#dddddddd");

for(const stream of streams) {
    const y = stream.index * (streamHeight + streamMargin);
    for(const event of stream.events) {
        let tooltipHtml = '';
        if (stream.label) {
            tooltipHtml += '<h4>' + stream.label + '</h4>';
        }
        if (event.label) {
            tooltipHtml += '<h5>' + event.label + '</h5>';
        }
        if (event.startDate || event.endDate) {
            tooltipHtml += '<p><i>';
            if (event.startDate) {
                tooltipHtml += new Date(event.startDate).toLocaleDateString();
            }
            tooltipHtml += '–';
            if (event.endDate) {
                tooltipHtml += new Date(event.endDate).toLocaleDateString();
            }
            tooltipHtml += '</i></p>';
        }
        if (event.imageUrl) {
            tooltipHtml += '<img style="max-width: 200px; max-height: 200px;" src="' + event.imageUrl + '">';
        }
        svg.append('line')
            .style("stroke", event.color || stream.color)
            .style("stroke-width", streamHeight)
            .attr("x1", timeScale(new Date(event.parsedStartDate)))
            .attr("y1", y)
            .attr("x2", timeScale(new Date(event.parsedEndDate)))
            .attr("y2", y)
            .attr("data-html", tooltipHtml)
            .on("mouseover", function(d) {
                tooltip.html(d.target.getAttribute('data-html'))
                    .style("visibility", "visible")
                    .style("left", (d.clientX) + "px")
                    .style("top", (d.clientY - 28) + "px");
                })
            .on("mouseout", function(d) {
                tooltip.style("visibility", "hidden");
            });
        }
}
