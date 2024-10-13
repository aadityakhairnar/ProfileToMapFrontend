import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';



const Map = ({ address,Cwidth,Cheight }) => {
    const containerStyle = {
        width: Cwidth || '',
        height: Cheight || 'full',
      };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to New York City
  const [markerPosition, setMarkerPosition] = useState(null); // Separate state for the marker

  useEffect(() => {
    const geocode = async () => {
      const addressString = `${address.city}, ${address.state}, ${address.country}`;
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addressString)}`);
        const data = await response.json();
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);
          setCenter({ lat, lng });
          setMarkerPosition({ lat, lng });
        }
      } catch (error) {
        console.error("Error geocoding address:", error);
      }
    };

    if (address) {
      geocode();
    }
  }, [address]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading Maps...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
    >
      {markerPosition && <Marker position={markerPosition} />} {/* Ensure marker is rendered */}
    </GoogleMap>
  );
};

export default Map;
