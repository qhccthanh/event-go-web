import React from 'react';
import { withGoogleMap,GoogleMap,Marker } from "react-google-maps";

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const EVMap = withGoogleMap( props => ({
    render() {
        const markers = props.markers === undefined ? [] : props.markers
        var center = props.center;
        if (center === undefined || center.lat === undefined || center.lng === undefined) {
            center = { lat: 10.7626444, lng: 106.6798381 };
        }
        return (
            <GoogleMap
                ref={props.onMapLoad}
                defaultZoom={16}
                defaultCenter={center}
                onClick={props.onMapClick}
            >
                {
                    markers.map((marker, index) => (
                    <Marker
                        {...marker}
                        onRightClick={() => props.onMarkerRightClick(index)}
                    />
                    ))
                }
            </GoogleMap>
        );
    }
}))

export default EVMap;