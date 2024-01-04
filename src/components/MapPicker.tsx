import React, { useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const center = {
    lat: 25.270722356939793,
    lng: 55.29683498495664,
}

type Location = {
    lat: number
    lng: number
}

interface MapComponentProps {
    onSelectLocation: (location: Location) => void
}

const MapComponent = ({ onSelectLocation }: MapComponentProps) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY || '',
    })

    const [markerLocation, setMarkerLocation] = useState<Location>()

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    const handleMapClick = (event: any) => {
        onSelectLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        })
        setMarkerLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        })
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{
                height: '500px',
                width: '100%',
                maxWidth: '500px',
            }}
            center={center}
            zoom={8}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={handleMapClick}
        >
            {markerLocation && <Marker position={markerLocation} />}
        </GoogleMap>
    ) : (
        <></>
    )
}

export default MapComponent
