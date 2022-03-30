import { mapDiv, mapInput } from "./selectors";

let map: google.maps.Map;
let marker: google.maps.Marker;
let geocoder: google.maps.Geocoder;

type Location = {
  latitude: number;
  longitude: number;
  address: string;
};

export let location: Location = {
  latitude: 0,
  longitude: 0,
  address: "",
};

const mapStyle: google.maps.MapTypeStyle[] = [
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#d3d3d3",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        color: "#808080",
      },
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#b3b3b3",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#ffffff",
      },
      {
        weight: 1.8,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#d7d7d7",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#ebebeb",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#a7a7a7",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#efefef",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#696969",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#737373",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#d6d6d6",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  //   {},
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#dadada",
      },
    ],
  },
];

export const geocode = async (request: google.maps.GeocoderRequest) => {
  const { results } = await geocoder.geocode(request);
  map.setCenter(results[0].geometry.location);
  marker.setPosition(results[0].geometry.location);
  marker.setMap(map);
  return results;
};

export const initMap = () => {
  map = new google.maps.Map(mapDiv, {
    zoom: 8,
    center: { lat: -34.397, lng: 150.644 },
    mapTypeControl: false,
    styles: mapStyle,
  });
  geocoder = new google.maps.Geocoder();

  marker = new google.maps.Marker({
    map,
  });

  //   map.addListener("click", (e: google.maps.MapMouseEvent) => {
  //     geocode({ location: e.latLng });
  //   });
};

export const setAutoComplete = () => {
  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    // types: ["establishment"],
  };

  const autocomplete = new google.maps.places.Autocomplete(mapInput, options);
  // Bind the map's bounds (viewport) property to the autocomplete object,
  // so that the autocomplete requests use the current map bounds for the
  // bounds option in the request.
  autocomplete.bindTo("bounds", map);

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById(
    "infowindow-content"
  ) as HTMLElement;

  infowindow.setContent(infowindowContent);

  autocomplete.addListener("place_changed", () => {
    infowindow.close();
    marker.setVisible(false);

    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    location = {
      longitude: place.geometry.location.lng(),
      latitude: place.geometry.location.lat(),
      address: place.formatted_address || "",
    };

    setLocation(location, place.name, infowindow, infowindowContent);
  });
};

export const setLocation = (
  location: Location,
  placeName?: string,
  infowindow?: google.maps.InfoWindow,
  infowindowContent?: HTMLElement
) => {
  const lat = location.latitude || -33.8567844; // Opera house Sydney if no value
  const lng = location.longitude || 151.2152967;

  map.setCenter({ lat, lng });
  map.setZoom(12);
  marker.setPosition({ lat, lng });
  marker.setVisible(true);

  if (infowindow && infowindowContent) {
    // @ts-ignore
    infowindowContent.children["place-name"].textContent = placeName;
    // @ts-ignore
    infowindowContent.children["place-address"].textContent = location.address;
    infowindow.open({ map, anchor: marker, shouldFocus: false });
  }
};

export const getLocation = async () => {
  if (location.address) {
    return location;
  }
  const results = await geocode({ address: mapInput.value });
  if (results) {
    const formatedAddress = results[0].formatted_address;
    const { lat, lng } = results[0].geometry.location;

    return {
      latitude: lat(),
      longitude: lng(),
      address: formatedAddress,
    };
  }
  return null;
};
