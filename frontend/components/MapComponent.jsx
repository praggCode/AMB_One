import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import axios from 'axios';

const MapUpdater = ({ pickup, destination }) => {
    const map = useMap();

    useEffect(() => {
        if (pickup && destination) {
            const bounds = [
                [pickup.lat, pickup.lon],
                [destination.lat, destination.lon]
            ];
            map.fitBounds(bounds, { padding: [50, 50] });
        } else if (pickup) {
            map.flyTo([pickup.lat, pickup.lon], 13);
        } else if (destination) {
            map.flyTo([destination.lat, destination.lon], 13);
        }
    }, [pickup, destination, map]);

    return null;
};

const MapClickHandler = ({ onLocationSelect }) => {
    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const markerRef = React.useRef(null);

    const map = useMapEvents({
        click: async (e) => {
            const { lat, lng } = e.latlng;
            setPosition(e.latlng);
            setLoading(true);
            setAddress('Fetching address...');

            try {
                const response = await axios.get(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
                );
                setAddress(response.data.display_name);
            } catch (error) {
                console.error('Error reverse geocoding:', error);
                setAddress('Address not found');
            } finally {
                setLoading(false);
            }
        },
    });

    useEffect(() => {
        if (position && markerRef.current) {
            markerRef.current.openPopup();
        }
    }, [position]);

    return position === null ? null : (
        <Marker position={position} ref={markerRef}>
            <Popup>
                <div className="p-2 min-w-[200px]">
                    <p className="text-sm font-medium mb-2">{loading ? 'Loading...' : address}</p>
                    {!loading && (
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => {
                                    onLocationSelect('pickup', { lat: position.lat, lon: position.lng, address });
                                    map.closePopup();
                                }}
                                className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition"
                            >
                                Set as Pickup
                            </button>
                            <button
                                onClick={() => {
                                    onLocationSelect('destination', { lat: position.lat, lon: position.lng, address });
                                    map.closePopup();
                                }}
                                className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition"
                            >
                                Set as Destination
                            </button>
                        </div>
                    )}
                </div>
            </Popup>
        </Marker>
    );
};

const MapComponent = ({ pickup, destination, onLocationSelect, onLocationRemove }) => {
    const defaultCenter = [20.5937, 78.9629]; // India center

    return (
        <MapContainer
            center={defaultCenter}
            zoom={5}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {pickup && (
                <Marker position={[pickup.lat, pickup.lon]}>
                    <Popup>
                        <div className="p-2">
                            <p className="font-medium mb-2">Pickup Location</p>
                            <button
                                onClick={() => onLocationRemove('pickup')}
                                className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition w-full"
                            >
                                Remove
                            </button>
                        </div>
                    </Popup>
                </Marker>
            )}

            {destination && (
                <Marker position={[destination.lat, destination.lon]}>
                    <Popup>
                        <div className="p-2">
                            <p className="font-medium mb-2">Destination</p>
                            <button
                                onClick={() => onLocationRemove('destination')}
                                className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition w-full"
                            >
                                Remove
                            </button>
                        </div>
                    </Popup>
                </Marker>
            )}

            <MapUpdater pickup={pickup} destination={destination} />
            <MapClickHandler onLocationSelect={onLocationSelect} />
        </MapContainer>
    );
};

export default MapComponent;
