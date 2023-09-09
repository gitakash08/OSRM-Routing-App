# OpenLayers Routing and Facility Location Example

This repository contains a JavaScript code example that demonstrates how to use OpenLayers, Turf.js, and the OSRM API to find the closest facility from a given source point and calculate the shortest routes to multiple facilities. This README file provides an overview of the code and explains how to use it.

## Introduction

This code example demonstrates the following functionality:

1. Creating a map using OpenLayers with a base layer from OpenStreetMap (OSM).
2. Adding source and destination markers to the map.
3. Finding the closest facility from the source point using Turf.js.
4. Calculating and sorting the shortest routes to multiple facilities using the OSRM API.
5. Displaying the routes on the map and showing the distances in kilometers.

## Getting Started

To run this code example, follow these steps:

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/gitakash08/OSRM-Routing-App.git
   ```

2. Open the `index.html` file in your web browser.

## Usage

Once you've opened the `index.html` file in your browser, you will see a map with a source marker and facility markers. To find and display the shortest routes to the facilities, follow these steps:

1. The map will initially show a source marker (blue) and facility markers (green).
2. Click the "Find Routes" button.
3. The code will calculate and display the shortest routes to the facilities on the map, along with their distances in kilometers.

## Code Explanation

Here's a brief explanation of the key parts of the code:

- **Map Initialization:** The code initializes a map using OpenLayers, adds a base OSM layer, and sets the initial view.

- **Adding Source and Facility Markers:** The `addSourceAndDestinationMarkers` and `addFacilityMarkers` functions add markers to the map for the source and facilities, respectively.

- **Finding the Closest Facility:** The `findClosestFacility` function uses Turf.js to find the closest facility to the source point.

- **Calculating and Sorting Routes:** The `calculateAndSortRoutes` function calculates the shortest routes to all facilities using the OSRM API, stores the routes, and sorts them by distance.

- **Displaying Routes:** The code displays the sorted routes on the map and shows the distances in an alert dialog.

- **Usage:** The "Find Routes" button triggers the route calculation and display when clicked.

## License

This code example is provided under the MIT License. Feel free to use and modify it for your own projects.

---

This README provides an overview of the code and its functionality. If you have any questions or need further assistance, please don't hesitate to reach out.

[OpenLayers Documentation](https://openlayers.org/)

[Turf.js Documentation](https://turfjs.org/)

[OSRM API Documentation](http://project-osrm.org/docs/v5.5.1/api/)

[MIT License](LICENSE)
 
