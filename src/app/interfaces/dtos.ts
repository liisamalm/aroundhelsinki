export interface AllDTO{
    place: PlaceDTO[];
    event: EventDTO[];
    activity: ActivityDTO[];
}

export interface PlaceDTO {
    id: string;
    name:  NameClass;
    address: Address;
    latlon: LatLon;
    distance: number;
}

export interface EventDTO {
    id: string;
    name:  NameClass;
    address: Address;
    latlon: LatLon;
    distance: number;

}

export interface ActivityDTO {
    id: string;
    name:  NameClass;
    address: Address;
    latlon: LatLon;
    distance: number;
}

export interface NameClass {
    fi: string;
    en: null | string;
    sv: null | string;
    zh: null | string;
}

export interface Address {
    street_address: null | string;
    postal_code:    null | string;
    locality:       string | null;
}

export interface LatLon {
    lat: number;
    lon: number;
}