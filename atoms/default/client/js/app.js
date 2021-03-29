import * as d3B from 'd3'
import * as topojson from 'topojson'
import englandRaw from 'assets/england.json'
import walesRaw from 'assets/wales.json'
import scotlandRaw from 'assets/scotland.json'

import * as geoProjection from 'd3-geo-projection'

const d3 = Object.assign({}, d3B, topojson, geoProjection);

const atomEl = d3.select('.interactive-wrapper').node()

const isMobile = window.matchMedia('(max-width: 600px)').matches;

let width = atomEl.getBoundingClientRect().width;
let height =  width * 2.5 / 5;

const features = topojson.feature(englandRaw, englandRaw.objects['unitary-authority']).features;

//const filtered = topojson.feature(worldMap, worldMap.objects.ne_10m_admin_0_countries_crimea_ukraine).features.filter(f => f.properties.name != 'Antarctica')


console.log(features)

//unitary-authority, metropolitan-borough, mayoralties, county-council, district-council, england
//wales-constituencies, wales-regions

let extents = [{
        type: "LineString",
        id:'england',
         coordinates: [
            [-8.6,56],
            [1.7,56],
            [1.7, 49.8],
            [-8.6, 49.8],
        ]
},
{
        type: "LineString",
        id:'scotland',
         coordinates: [
            [-8.6,60.8],
            [1.7,60.8],
            [1.7, 54],
            [-8.6, 54],
        ]
},
{
        type: "LineString",
        id:'wales',
         coordinates: [
            [-5.293465909090908,53.5],
            [-2.669696969696969,53.5],
            [-2.669696969696969, 51.274877726918454],
            [-5.293465909090908, 51.274877726918454],
        ]
}
]

var projection = d3.geoMercator()
.fitExtent([[0, 0],[width , height]], extents.find(d => d.id === 'england'))

let path = d3.geoPath()
.projection(projection);

d3.select('.interactive-wrapper')
.append('div')
.html('Unitary authorities, metropolitan boroughs and district councils')

const map = d3.select('.interactive-wrapper')
.append('svg')
.attr('id', 'coronavirus-world-map-svg')
.attr('width', width)
.attr('height', height);

map
.append('g')
.selectAll('path')
.data(topojson.feature(englandRaw, englandRaw.objects['england']).features)
.enter()
.append('path')
.attr('d', path)
.style('fill', '#dadada')

map
.append('g')
.selectAll('unitary-authority')
.data(topojson.feature(englandRaw, englandRaw.objects['unitary-authority']).features)
.enter()
.append('path')
.attr('d', path)
.attr('class', d => d.properties.name)
.style('fill', '#ffff00')
.style('stroke', '#ffffff')

map
.selectAll('metropolitan-borough')
.data(topojson.feature(englandRaw, englandRaw.objects['metropolitan-borough']).features)
.enter()
.append('path')
.attr('d', path)
.attr('class', d => d.properties.name)
.style('fill', '#ffaaaa')
.style('stroke', '#ffffff')

map
.selectAll('district-council')
.data(topojson.feature(englandRaw, englandRaw.objects['district-council']).features)
.enter()
.append('path')
.attr('d', path)
.attr('class', d => d.properties.name)
.style('fill', '#00ffaa')
.style('stroke', '#ffffff')

d3.select('.interactive-wrapper')
.append('div')
.html('County councils')

const map2 = d3.select('.interactive-wrapper')
.append('svg')
.attr('id', 'coronavirus-world-map-svg')
.attr('width', width)
.attr('height', height);

map2
.append('g')
.selectAll('path')
.data(topojson.feature(englandRaw, englandRaw.objects['england']).features)
.enter()
.append('path')
.attr('d', path)
.style('fill', '#dadada')

map2
.selectAll('county-council')
.data(topojson.feature(englandRaw, englandRaw.objects['county-council']).features)
.enter()
.append('path')
.attr('d', path)
.attr('class', d => d.properties.name)
.style('fill', '#ff0000')
.style('stroke', '#ffffff')

d3.select('.interactive-wrapper')
.append('div')
.html('Mayoralties')

const map3 = d3.select('.interactive-wrapper')
.append('svg')
.attr('id', 'coronavirus-world-map-svg')
.attr('width', width)
.attr('height', height);

map3
.append('g')
.selectAll('path')
.data(topojson.feature(englandRaw, englandRaw.objects['england']).features)
.enter()
.append('path')
.attr('d', path)
.style('fill', '#dadada')

map3
.selectAll('county-council')
.data(topojson.feature(englandRaw, englandRaw.objects['mayoralties']).features)
.enter()
.append('path')
.attr('d', path)
.attr('class', d => d.properties.name)
.style('fill', '#00ff00')
.style('stroke', '#ffffff')

projection.fitExtent([[0, 0],[width , height]], extents.find(d => d.id === 'wales'))

d3.select('.interactive-wrapper')
.append('div')
.html('Wales regions')

const map4 = d3.select('.interactive-wrapper')
.append('svg')
.attr('id', 'coronavirus-world-map-svg')
.attr('width', width)
.attr('height', height);

map4
.append('g')
.selectAll('path')
.data(topojson.feature(walesRaw, walesRaw.objects['wales-regions']).features)
.enter()
.append('path')
.attr('d', path)
.style('fill', '#ffaaaa')
.style('stroke', '#ffffff')

d3.select('.interactive-wrapper')
.append('div')
.html('Wales constituencies')

const map5 = d3.select('.interactive-wrapper')
.append('svg')
.attr('id', 'coronavirus-world-map-svg')
.attr('width', width)
.attr('height', height);

map5
.append('g')
.selectAll('path')
.data(topojson.feature(walesRaw, walesRaw.objects['wales-constituencies']).features)
.enter()
.append('path')
.attr('d', path)
.style('fill', '#aaffaa')
.style('stroke', '#ffffff')

projection.fitExtent([[0, 0],[width , height]], extents.find(d => d.id === 'scotland'))

d3.select('.interactive-wrapper')
.append('div')
.html('Scotland regions')

const map6 = d3.select('.interactive-wrapper')
.append('svg')
.attr('id', 'coronavirus-world-map-svg')
.attr('width', width)
.attr('height', height);

map6
.append('g')
.selectAll('path')
.data(topojson.feature(scotlandRaw, scotlandRaw.objects['scotland-regions']).features)
.enter()
.append('path')
.attr('d', path)
.style('fill', '#ffaaaa')
.style('stroke', '#ffffff')

d3.select('.interactive-wrapper')
.append('div')
.html('Scotland constituencies')

const map7 = d3.select('.interactive-wrapper')
.append('svg')
.attr('id', 'coronavirus-world-map-svg')
.attr('width', width)
.attr('height', height);


map7
.append('g')
.selectAll('path')
.data(topojson.feature(scotlandRaw, scotlandRaw.objects['scotland-constituencies']).features)
.enter()
.append('path')
.attr('d', path)
.style('fill', '#aaffaa')
.style('stroke', '#ffffff')


map.on('click', d => {
	console.log(projection.invert([d.clientX, d.clientY]))
})