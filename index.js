const streamMargin = 5;
const streamHeight = 50;
const svgWidth = window.innerWidth - 50;
const height = (streams.length + 1) * (streamHeight + streamMargin);
const svg = d3.select('#svg1')
    .attr('width', svgWidth)
    .attr('height', height)
    .style('background-color', '#eee');
const locale = navigator.languages
    ? navigator.languages[0]
    : (navigator.language || navigator.userLanguage || 'en');

const minimumEventWidthDays = 3;
const now = new Date();
const epochStart = new Date('1970-01-01');
let startDate = now;
let endDate = epochStart;

for(const stream of streams) {
    for(const event of stream.events) {
        event.parsedStartDate = event.startDate ? new Date(event.startDate) : epochStart;
        if (event.parsedStartDate < startDate) {
            startDate = event.parsedStartDate;
        }

        event.parsedEndDate = event.endDate ? new Date(event.endDate) : now;
        if (event.parsedEndDate > endDate) {
            endDate = event.parsedEndDate;
        }

        // for display purposes -- to make the event have at least some width
        if (event.endDate == event.startDate) {
            event.parsedEndDate.setDate(event.parsedEndDate.getDate() + minimumEventWidthDays);
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
                // event dates are parsed above as if they were in UTC, so spit them out in UTC as well
                tooltipHtml += event.parsedStartDate.toLocaleDateString(locale, {timeZone: 'UTC'});
            }
            if (event.endDate != event.startDate) {
                tooltipHtml += '–';
            }
            if (event.endDate && event.endDate != event.startDate) {
                tooltipHtml += event.parsedEndDate.toLocaleDateString(locale, {timeZone: 'UTC'});
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
                if (window.t) {
                    clearTimeout(window.t);
                    window.t = undefined;
                }
                tooltip.html(d.target.getAttribute('data-html'))
                    .style("visibility", "visible")
                    .style("left", (d.clientX + 10) + "px")
                    .style("top", (d.clientY - 28) + "px");
            })
            .on("mouseout", function(d) {
                window.t = setTimeout(function() {
                    tooltip.style("visibility", "hidden");
                }, 500);
            });
        }
}
