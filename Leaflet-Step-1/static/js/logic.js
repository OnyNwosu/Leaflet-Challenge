// Function to determine marker size based on population
function markerSize(depth) {
    return depth * 200;
}

// An array containing all of the information needed to create city and state markers
function init() {
    var locations = [
        // {
        //     coordinates: [40.7128, -74.0059],
        //     state: {
        //         name: "New York State",
        //         population: 19795791
        //     },
        //     city: {
        //         name: "New York",
        //         population: 8550405
        //     }
        // },
        // {
        //     coordinates: [34.0522, -118.2437],
        //     state: {
        //         name: "California",
        //         population: 39250017
        //     },
        //     city: {
        //         name: "Lost Angeles",
        //         population: 3971883
        //     }
        // },
        // {
        //     coordinates: [41.8781, -87.6298],
        //     state: {
        //         name: "Illinois",
        //         population: 12671821
        //     },
        //     city: {
        //         name: "Chicago",
        //         population: 2695598
        //     }
        // },
        // {
        //     coordinates: [29.7604, -95.3698],
        //     state: {
        //         name: "Texas",
        //         population: 26960000
        //     },
        //     city: {
        //         name: "Houston",
        //         population: 2296224
        //     }
        // },
        // {
        //     coordinates: [41.2524, -95.9980],
        //     state: {
        //         name: "Nebraska",
        //         population: 1882000
        //     },
        //     city: {
        //         name: "Omaha",
        //         population: 446599
        //     }
        // }
    ];
    d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function (earthquakeData) {
        console.log(earthquakeData);

        // Define arrays to hold created city and state markers
        var index = 0
        var earthquakeMarkers = [];
        console.log([earthquakeData.features[index].geometry.coordinates[0],earthquakeData.features[index].geometry.coordinates[1]])
        // Loop through locations and create city and state markers
        for (var i = 0; i < earthquakeData.features.length; i++) {


            // Setting the marker radius for the city by passing population into the markerSize function
            earthquakeMarkers.push(
                L.circle([earthquakeData.features[i].geometry.coordinates[1],earthquakeData.features[i].geometry.coordinates[0]], {
                    stroke: false,
                    fillOpacity: 0.75,
                    color: "pink",
                    fillColor: "pink",
                    // radius: markerSize(earthquakeData.features[i].properties.mag)
                    radius: markerSize(earthquakeData.features[i].properties.mag*40)
                    // radius: 50
                })
            );
        }

        // Create base layers

        // Streetmap Layer
        var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/streets-v11",
            accessToken: API_KEY
        });

        var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "dark-v10",
            accessToken: API_KEY
        });

        // Create two separate layer groups: one for cities and one for states
        var cities = L.layerGroup(earthquakeMarkers);

        // Create a baseMaps object
        var baseMaps = {
            "Dark Map": darkmap,
            "Street Map": streetmap,
            
        };

        // Create an overlay object
        var overlayMaps = {
            "City Population": cities
        };

        // Define a map object
        var myMap = L.map("mapid", {
            center: [37.09, -95.71],
            zoom: 5,
            layers: [darkmap, cities]
        });

        // Pass our map layers into our layer control
        // Add the layer control to the map
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);
    })



};

window.addEventListener('DOMContentLoaded', init);