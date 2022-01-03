const width = 1000;
const height = 600;
const svg = d3.select('#svg1')
    .attr('width', width)
    .attr('height', height)
    .style('background-color', '#eee');

const timeScale = d3.scaleTime()
    .domain([new Date(1981, 4, 3), new Date()])
    .range([0, width])
    ;

const streams = [
    {
        index: 1,
        label: "Family",
        color: '#24007b22',
        events: [
            {
                startDate: '2003-07-19',
                endDate: new Date().toLocaleDateString(),
                label: "Marriage"
            },
            {
                startDate: '2005-07-12',
                endDate: new Date().toLocaleDateString(),
                label: "Atlas"
            },
            {
                startDate: '2008-01-21',
                endDate: new Date().toLocaleDateString(),
                label: "Nathan"
            },
            {
                startDate: '2010-09-13',
                endDate: new Date().toLocaleDateString(),
                label: "Claire"
            },
            {
                startDate: '2012-06-01',
                endDate: new Date().toLocaleDateString(),
                label: "Benjamin"
            },
            {
                startDate: '2015-04-09',
                endDate: new Date().toLocaleDateString(),
                label: "Joseph"
            }
        ]
    },
    {
        index: 2,
        label: "Work",
        color: null,
        events: [
            {
                startDate: '1998-02-15',
                endDate: '1998-05-15',
                label: "The Couch and Chair",
                color: '#ab856e'
            },
            {
                startDate: '1998-06-01',
                endDate: '1998-08-15',
                label: "Robert L. Lord, Attorney at Law",
                color: '#666666'
            },
            {
                startDate: '1998-09-15',
                endDate: '1999-04-30',
                label: "Tri Connections",
                color: "#0000dd"
            },
            {
                startDate: '1999-05-15',
                endDate: '1999-08-15',
                label: "Hastings",
                color: '#0d6a3966'
            },
            {
                startDate: '1999-05-15',
                endDate: '1999-08-15',
                label: "Fox 13 News",
                color: '#F4B31066'
            },
            {
                startDate: '1999-08-15',
                endDate: '2000-04-30',
                label: "Tri Connections",
                    color: "#0000dd"
            },
            {
                startDate: '2000-05-10',
                endDate: '2002-04-25',
                label: "Mission Venezuela Maracaibo",
                    color: "#ffa300"
            },
            {
                startDate: '2002-05-21',
                endDate: '2002-06-22',
                label: "Deseret Industries",
                color: "#113d6f"
            },
            {
                startDate: '2002-09-01',
                endDate: '2003-04-25',
                label: "BYU Newsnet",
                color: "#020261"
            },
            {
                startDate: '2003-04-28',
                endDate: '2003-06-20',
                label: "Espacio de Vinculación / Televisa",
                color: "#ff6600"
            },
            {
                startDate: '2003-08-12',
                endDate: '2008-10-19',
                label: "ABC 4 News",
                color: "#e22021"
            },
            {
                startDate: '2008-10-19',
                endDate: '2009-11-22',
                label: "Rocky Mountain Printing",
                color: "#0A0A09"
            },
            {
                startDate: '2009-11-22',
                endDate: '2010-02-05',
                label: "Marketecture",
                color: "#3B78CE"
            },
            {
                startDate: '2010-02-16',
                endDate: '2021-03-23',
                label: "Sound Concepts / Verb",
                color: "#f6303e"
            },
            {
                startDate: '2021-03-26',
                endDate: new Date().toLocaleDateString(),
                label: "Bamboo HR",
                color: "#73c41d"
            },
        ]
    },
    {
        index: 3,
        label: "Residences",
        color: null,
        events: [
            {
                startDate: '1981-05-03',
                endDate: '1995-07-23',
                label: "1140 E 1250 N. Layton, UT",
                color: "#c79276"
            },
            {
                startDate: '1995-07-23',
                endDate: '1998-08-21',
                label: "2408 Country Oaks Dr, Layton, UT",
                color: "#5c4231"
            },
            {
                startDate: '1998-08-21',
                endDate: '1999-04-30',
                label: "BYU (Helaman Halls)",
                color: "#002D5F"
            },
            {
                startDate: '1999-04-30',
                endDate: '1999-08-21',
                label: "2408 Country Oaks Dr, Layton, UT",
                color: "#5c4231"
            },
            {
                startDate: '1999-08-21',
                endDate: '2000-04-30',
                label: "BYU (Helaman Halls)",
                color: "#002D5F"
            },
            {
                startDate: '2000-04-30',
                endDate: '2000-05-10',
                label: "2408 Country Oaks Dr, Layton, UT",
                color: "#5c4231"
            },
            {
                startDate: '2000-05-10',
                endDate: '2000-07-11',
                label: "MTC",
                color: "#dd0000"
            },
            {
                startDate: '2000-07-11',
                endDate: '2000-10-20',
                label: "La Villa del Rosario",
                color: "#cd8f00"
            },
            {
                startDate: '2000-10-20',
                endDate: '2001-01-01',
                label: "Union (Maracaibo)",
                color: "#cf9f2e"
            },
            {
                startDate: '2001-01-01',
                endDate: '2001-04-11',
                label: "Tariba (San Cristobal)",
                color: "#e0b85c"
            },
            {
                startDate: '2001-04-11',
                endDate: '2001-07-05',
                label: "El Pinar (Maracaibo)",
                color: "#e0a723"
            },
            {
                startDate: '2001-07-05',
                endDate: '2001-11-08',
                label: "Obrero (Ojeda)",
                color: "#dd9d06"
            },
            {
                startDate: '2001-11-08',
                endDate: '2001-11-26',
                label: "Colón",
                color: "#eeb735"
            },
            {
                startDate: '2001-11-26',
                endDate: '2002-04-25',
                label: "Boconó (Trujillo)",
                color: "#e0b85c"
            },
            {
                startDate: '2002-04-25',
                endDate: '2002-06-22',
                label: "2408 Country Oaks Dr, Layton, UT",
                color: "#5c4231"
            },
            {
                startDate: '2002-06-22',
                endDate: '2003-04-28',
                label: "Elms Apartments (Provo)",
                color: "#3cd1d6"
            },
            {
                startDate: '2003-04-28',
                endDate: '2003-06-20',
                label: "Ordoñez Family (Mexico City)",
                color: "#913cd6"
            },
            {
                startDate: '2003-06-20',
                endDate: '2003-07-19',
                label: "2408 Country Oaks Dr, Layton, UT",
                color: "#5c4231"
            },
            {
                startDate: '2003-07-19',
                endDate: '2004-11-11',
                label: "4000 S Redwood Rd, #2198V, West Valley City, Utah",
                color: "#f06edc"
            },
            {
                startDate: '2004-11-11',
                endDate: '2009-02-28',
                label: "5130 Park Springs Drive, West Valley City, Utah",
                color: "#1ee610"
            },
            {
                startDate: '2009-02-28',
                endDate: '2016-05-25',
                label: "431 W 380 S, American Fork, Utah",
                color: "#629ade"
            },
            {
                startDate: '2016-05-25',
                endDate: new Date().toLocaleDateString(),
                label: "1236 W 1570 S, Lehi, Utah",
                color: "#fffb00"
            },
        ]
    },
];

const streamHeight = 50;
for(const stream of streams) {
    let y = stream.index * (streamHeight + 5);
    for(const event of stream.events) {
        svg.append('line')
            .style("stroke", event.color || stream.color)
            .style("stroke-width", streamHeight)
            .attr("x1", timeScale(Date.parse(event.startDate)))
            .attr("y1", y)
            .attr("x2", timeScale(Date.parse(event.endDate)))
            .attr("y2", y);
    }
}
