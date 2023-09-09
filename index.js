// Create a map
const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }),
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([77.09667807902194, 28.571101381602933]),
        zoom: 10,
    }),
});

const sourceCoordinates = [77.2042788412794, 28.54831392212583];

function addSourceAndDestinationMarkers(sourceCoords) {
    const markers = [];

    // Create a marker for the source
    const sourceMarker = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat(sourceCoords)),
    });
    sourceMarker.setStyle(new ol.style.Style({
        image: new ol.style.Icon({
            src: 'img/source.png', // Replace with the path to your source icon image
            scale: 0.03, // Adjust the scale to your desired size (0.3 means 30% of the original size)
        }),
    }));
    markers.push(sourceMarker);

    const markerSource = new ol.source.Vector({
        features: markers,
    });

    const markerLayer = new ol.layer.Vector({
        source: markerSource,
    });

    map.addLayer(markerLayer);
}

// Call the function to add source and destination markers
addSourceAndDestinationMarkers(sourceCoordinates);


const facilities = [
    [80.95073288119396, 26.851046999131455],
    [77.40841518368636, 28.54124732134948],
    [77.08157192656734,28.741319015483622],
    [77.31571804031307,28.394265894492264]
    // Add more facility coordinates as needed
];

function addFacilityMarkers(facilityCoords) {
    const markers = [];

    facilityCoords.forEach(coord => {
        const marker = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(coord)),
        });

        markers.push(marker);
    });

    const markerSource = new ol.source.Vector({
        features: markers,
    });

    const markerLayer = new ol.layer.Vector({
        source: markerSource,
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({ color: 'green' }), // You can customize the marker style here
            }),
        }),
    });

    map.addLayer(markerLayer);
}

addFacilityMarkers(facilities);

function findClosestFacility(sourceCoords, facilities) {
    let closestFacility = null;
    let closestDistance = Infinity;

    for (const facility of facilities) {
        const distance = turf.distance(turf.point(sourceCoords), turf.point(facility), { units: 'kilometers' });
        if (distance < closestDistance) {
            closestDistance = distance;
            closestFacility = facility;
        }
    }

    return closestFacility;
}

async function calculateAndSortRoutes(sourceCoords, facilities) {
    const routes = [];

    for (const facility of facilities) {
        const osrmBaseUrl = `http://router.project-osrm.org/route/v1/driving/`;
        const coordinatesString = `${sourceCoords.join(',')};${facility.join(',')}`;
        const routeUrl = `${osrmBaseUrl}${coordinatesString}?overview=false&alternatives=false&steps=true&hints=;`;

        try {
            const response = await fetch(routeUrl);
            const data = await response.json();

            if (data.code === 'Ok') {
                const routeCoordinates = data.routes[0].legs[0].steps;
                const distance = data.routes[0].distance; // Distance in meters

                // Create a LineString feature for the route
                const routeFeature = new ol.Feature({
                    geometry: new ol.geom.LineString(routeCoordinates.map(coord => ol.proj.fromLonLat(coord.intersections[0].location))),
                });

                // Store the route with distance
                routes.push({ distance, routeLayer: routeFeature });

            } else {
                alert('Error: Unable to fetch the route.');
            }
        } catch (error) {
            alert('Error: Unable to fetch the route.');
            console.error(error);
        }
    }

    // Sort routes by distance (ascending order)
    routes.sort((a, b) => a.distance - b.distance);

    // Display the sorted routes on the map
    for (const route of routes) {
        const routeLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [route.routeLayer],
            }),
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'blue',
                    width: 6,
                }),
            }),
        });

        map.addLayer(routeLayer);
    }

    // Display the distances
    for (const [index, route] of routes.entries()) {
        const distance = (route.distance / 1000).toFixed(2); // Convert meters to kilometers
        alert(`Route ${index + 1}: Distance to facility: ${distance} km`);
    }
}

function findRoutes(){
    calculateAndSortRoutes(sourceCoordinates, facilities);
}

