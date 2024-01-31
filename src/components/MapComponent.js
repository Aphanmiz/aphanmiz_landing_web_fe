// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
// import { getNewDevelopment } from "../utils";
// import { ConfigProvider } from "antd";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoiYXBoYW5taXotbGFuZGluZyIsImEiOiJjbHJjMThnbzYweDd0Mmluc2dpbDdjbmNrIn0.b4gmHauaibrL53SrPn9jBw";

// const MapComponent = () => {
//   let { year } = useParams();
//   const mapContainerRef = useRef(null);
//   const [map, setMap] = useState(null);
//   const [markers, setMarkers] = useState([]);

//   const longitude = -95.3698; // Longitude for Houston
//   const latitude = 29.7604; // Latitude for Houston

//   const optionsNewDev = [
//     { value: "subdivision_plat_name", label: "Subdivision Plat Name" },
//     { value: "date_submitted", label: "Date Submitted" },
//     { value: "subdivision_plat_type", label: "Subdivision Plat Type" },
//     { value: "variance_request", label: "Variance Request" },
//     { value: "agenda_loc", label: "Agenda Location" },
//     { value: "county", label: "County" },
//     { value: "city_etj", label: "City ETJ" },
//     { value: "council", label: "Council" },
//     { value: "precinct", label: "Precinct" },
//     { value: "census_tract", label: "Census Tract" },
//     { value: "zip_code", label: "Zip Code" },
//     { value: "school_district", label: "School District" },
//     { value: "tirz", label: "TIRZ" },
//     { value: "management_dist", label: "Management District" },
//     { value: "super_neighborhood", label: "Super Neighborhood" },
//     { value: "park_sector", label: "Park Sector" },
//     { value: "mtf", label: "MTF" },
//     { value: "land_use", label: "Land Use" },
//     {
//       value: "property_size_staff_verify",
//       label: "Property Size Staff Verify",
//     },
//     { value: "number_of_lots", label: "Number of Lots" },
//     // ç{ value: "appraisal_district_ids", label: "Appraisal District IDs" },
//     { value: "developer", label: "Developer" },
//     { value: "applicant_company", label: "Applicant Company" },
//     { value: "applicants_name", label: "Applicant's Name" },
//     { value: "phone_number", label: "Phone Number" },
//     { value: "subdivision_plat_pdf", label: "Subdivision Plat PDF" },
//   ];

//   useEffect(() => {
//     // Initialize map when component mounts
//     console.log("mapContainerRef.current: ", mapContainerRef.current);

//     if (!map) {
//       const newMap = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: "mapbox://styles/mapbox/streets-v12", // Use a style that supports 3D buildings
//         center: [longitude, latitude],
//         zoom: 11,
//         pitch: 20, // Tilt of the map for 3D effect
//         bearing: 0, // Rotation of the map
//         attributionControl: false,
//       });

//       setMap(newMap);
//     }

//     // Add geocoder (search box) to the map
//     const geocoder = new MapboxGeocoder({
//       accessToken: mapboxgl.accessToken,
//       placeholder: "Search ...",
//       mapboxgl: mapboxgl,
//       marker: {
//         color: "#D25D5A", // Optional: color of marker after search
//       },
//       style: {
//         width: "700px",
//       },
//     });

//     // Add the geocoder to the map
//     map.addControl(geocoder, "top-left");

//     // Change the width of the geocoder
//     const geocoderElement = document.querySelector(".mapboxgl-ctrl-geocoder");
//     if (geocoderElement) {
//       geocoderElement.style.width = "350px";
//     }

//     // Add navigation control (the +/- zoom buttons)
//     map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

//     const cachedData = localStorage.getItem("newDevelopmentData");

//     // Function to process data
//     function displayData(data, selectedNewDevOptions) {
//       data.forEach((item) => {
//         const coordAvg = item.coord_avg;
//         let popupContent = "";

//         if (selectedNewDevOptions === undefined) {
//           // popupContent = item.subdivision_plat_name;
//           selectedNewDevOptions = optionsNewDev.map((option) => option.value);
//         }
//         for (let option of selectedNewDevOptions) {
//           if (item[option]) {
//             // Replace "_" with " " and capitalize words
//             let formattedOption = option
//               .replace(/_/g, " ")
//               .split(" ")
//               .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//               .join(" ");

//             popupContent += `<strong>${formattedOption}</strong>: ${item[option]}<br>`;
//           }
//         }

//         const popup = new mapboxgl.Popup({ offset: 2 }).setHTML(popupContent);

//         if (isNaN(coordAvg[0]) || isNaN(coordAvg[1])) {
//           console.warn("Invalid coordinates:", coordAvg);
//         } else {
//           var marker = new mapboxgl.Marker({ color: "#002F56", scale: 0.5 })
//             .setLngLat([coordAvg[1], coordAvg[0]])
//             .setPopup(popup)
//             .addTo(map);
//         }
//       });
//     }

//     map.on("load", () => {
//       // Add 3D building layer
//       map.addLayer({
//         id: "3d-buildings",
//         source: "composite",
//         "source-layer": "building",
//         filter: ["==", "extrude", "true"],
//         type: "fill-extrusion",
//         minzoom: 15,
//         paint: {
//           "fill-extrusion-color": "#aaa",
//           "fill-extrusion-height": [
//             "interpolate",
//             ["linear"],
//             ["zoom"],
//             15,
//             0,
//             15.05,
//             ["get", "height"],
//           ],
//           "fill-extrusion-base": [
//             "interpolate",
//             ["linear"],
//             ["zoom"],
//             15,
//             0,
//             15.05,
//             ["get", "min_height"],
//           ],
//           "fill-extrusion-opacity": 0.6,
//         },
//       });

//       getNewDevelopment(year)
//         .then((data) => {
//           console.log("getNewDevelopment called: ", year);
//           displayData(data);
//         })
//         .catch((error) =>
//           console.error("Error loading new development data:", error)
//         );
//     });

//     // Clean up on unmount
//     return () => map.remove();
//   }, [latitude, longitude]); // Dependencies are now included

//   return (
//     //<div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
//     <ConfigProvider
//       theme={{
//         components: {
//           Select: {
//             optionSelectedBg: "rgba(0, 0, 0, 0.04)",
//             // multipleItemBg: "rgba(4, 16, 29, 0.02)",
//           },
//         },
//       }}
//     >
//       <div style={{ position: "relative", height: "90vh" }}>
//         <style>{`
//         .mapboxgl-ctrl-logo {
//           display: none !important;
//         }
//       `}</style>
//         <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
//       </div>
//     </ConfigProvider>
//   );
// };

// export default MapComponent;

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { getNewDevelopment } from "../utils";
import { ConfigProvider } from "antd";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXBoYW5taXotbGFuZGluZyIsImEiOiJjbHJjMThnbzYweDd0Mmluc2dpbDdjbmNrIn0.b4gmHauaibrL53SrPn9jBw";

const MapComponent = () => {
  const { year } = useParams();
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    // Initialize map only once
    if (!map) {
      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-95.3698, 29.7604], // Longitude and Latitude for Houston
        zoom: 11,
        pitch: 20,
        bearing: 0,
        attributionControl: false,
      });

      setMap(newMap);

      newMap.on("load", () => {
        fetchData(year, newMap);
      });

      // Add geocoder (search box) to the map
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        placeholder: "Search ...",
        mapboxgl: mapboxgl,
        marker: {
          color: "#D25D5A",
        },
        style: {
          width: "350px",
        },
      });

      newMap.addControl(geocoder, "top-left");
      newMap.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    }

    // Update markers when the year changes
    return () => {
      if (map) map.remove();
    };
  }, [year]); // Dependency on year

  const fetchData = (year, map) => {
    getNewDevelopment(year)
      .then((data) => {
        displayData(data, map);
      })
      .catch((error) =>
        console.error("Error loading new development data:", error)
      );
  };

  const displayData = (data, map) => {
    // Clear existing markers
    markers.forEach((marker) => marker.remove());

    // Create new markers and add them to the map
    const newMarkers = data
      .map((item) => {
        const coordAvg = item.coord_avg;
        let popupContent = "<strong>Data:</strong><br>";

        // Example content, add more details as needed
        popupContent += `<strong>Year:</strong> ${year}<br>`;
        popupContent += `<strong>Info:</strong> ${item.info || "N/A"}`; // Replace 'info' with actual data property

        if (!isNaN(coordAvg[0]) && !isNaN(coordAvg[1])) {
          const popup = new mapboxgl.Popup({ offset: 2 }).setHTML(popupContent);
          const marker = new mapboxgl.Marker({ color: "#002F56", scale: 0.5 })
            .setLngLat([coordAvg[1], coordAvg[0]])
            .setPopup(popup)
            .addTo(map);

          return marker;
        }

        return null;
      })
      .filter((marker) => marker !== null);

    setMarkers(newMarkers);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionSelectedBg: "rgba(0, 0, 0, 0.04)",
          },
        },
      }}
    >
      <div style={{ position: "relative", height: "90vh" }}>
        <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
      </div>
    </ConfigProvider>
  );
};

export default MapComponent;
