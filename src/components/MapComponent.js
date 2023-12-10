import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getNewDevelopment } from "../utils";
import { Layout } from "antd";
const { Content } = Layout;

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXBoYW5taXotbGFuZGluZyIsImEiOiJjbHBoZWxsaHgwNzFlMnFwNGdoc3R2azU5In0.-HAJtCRMbwMO_1Vv_VFttA";

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  const longitude = -95.3698; // Longitude for Houston
  const latitude = 29.7604; // Latitude for Houston

  useEffect(() => {
    // Initialize map when component mounts
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12", // Use a style that supports 3D buildings
      center: [longitude, latitude],
      zoom: 11,
      pitch: 20, // Tilt of the map for 3D effect
      bearing: 0, // Rotation of the map
    });

    map.on("load", () => {
      // Add 3D building layer
      map.addLayer({
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
          "fill-extrusion-color": "#aaa",
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "height"],
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "min_height"],
          ],
          "fill-extrusion-opacity": 0.6,
        },
      });

      // Fetch new development data and add markers
      // getNewDevelopment()
      //   .then((data) => {
      //     console.log("getNewDevelopment called");
      //     console.log(data);
      //     data.forEach((item) => {
      //       // Parse coord_avg and coord_boundary
      //       const coordAvg = JSON.parse(
      //         item.fields.coord_avg.replace("(", "[").replace(")", "]")
      //       );
      //       const coordBoundary = JSON.parse(
      //         item.fields.coord_boundary.replace(/\(/g, "[").replace(/\)/g, "]")
      //       );

      //       // Use coordAvg and coordBoundary in your code
      //       new mapboxgl.Marker({
      //         color: "#002F56",  // Set the color of the marker
      //         scale: 0.3  // Set the scale of the marker
      //       })
      //         .setLngLat(coordAvg.reverse())
      //         .addTo(map);
      //     });
      //   })
      //   .catch((error) =>
      //     console.error("Error loading new development data:", error)
      //   );

      getNewDevelopment()
        .then((data) => {
          console.log("getNewDevelopment called");
          console.log(data);
          data.forEach((item) => {
            // Use coordAvg and coordBoundary directly in your code
            // const coordAvg = item.fields.coord_avg;
            // const coordBoundary = item.fields.coord_boundary;

            // new mapboxgl.Marker({
            //   color: "#002F56", // Set the color of the marker
            //   scale: 0.3, // Set the scale of the marker
            // })
            //   .setLngLat(JSON.parse(coordAvg).reverse())
            //   .addTo(map);

            const coordAvg = JSON.parse(item.fields.coord_avg);

            // Create a popup
            const popup = new mapboxgl.Popup({ offset: 25 }).setText(
              item.fields.subdivision_plat_name
            );

            // Create a marker and add it to the map
            new mapboxgl.Marker({ color: "#002F56", scale: 0.6 })
              .setLngLat(coordAvg.reverse())
              .setPopup(popup) // Associate the popup with the marker
              .addTo(map);
          });
        })
        .catch((error) =>
          console.error("Error loading new development data:", error)
        );
    });

    // Clean up on unmount
    return () => map.remove();
  }, [latitude, longitude]); // Dependencies are now included

  return (
    // <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
    <Content className="full-height-no-padding">
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
    </Content>
  );
};

export default MapComponent;
