export interface AllDTO{
    place: PlaceDTO[];
    event: EventDTO[];
    // activity: ActivityDTO[];
}

export interface PlaceDTO {
    id: string;
    name:  NameClass;
    address: Address;
    lat: number;
    lon: number;
    distance: number;
}

export interface EventDTO {
    id: string;
    name:  NameClass;
    address: Address;
    lat: number;
    lon: number;
    distance: number;

}

// export interface ActivityDTO {
//     id: string;
//     name:  NameClass;
//     address: Address;
//     lat: number;
//     lon: number;
//     distance: number;
// }

export interface NameClass {
    fi: string;
    en: null | string;
    sv: null | string;
    zh: null | string;
}

export interface Address {
    street_address: null | string;
    postal_code:    null | string;
    locality:       Locality | null;
}

export enum Locality {
    Espoo = "Espoo",
    Harviala = "Harviala,",
    Helsingfors = "Helsingfors",
    Helsingin = "Helsingin",
    Helsinki = "Helsinki",
    Hyvinkää = "Hyvinkää",
    Hämeenlinna = "Hämeenlinna",
    Inkoo = "Inkoo",
    Järvenpää = "Järvenpää",
    Kirkkonummi = "Kirkkonummi",
    Lapinjärvi = "Lapinjärvi",
    LocalityHELSINKI = "HELSINKI",
    LocalityVantaa = "vantaa",
    Luoma = "Luoma,",
    Masala = "Masala",
    Ojakkala = "Ojakkala",
    Otalampi = "Otalampi",
    Palojoki = "Palojoki",
    Porvoo = "Porvoo",
    Sipoo = "Sipoo",
    Söderkulla = "Söderkulla",
    Talma = "Talma",
    Tervalampi = "Tervalampi",
    The00100 = "00100",
    The00180 = "00180",
    Tuusula = "Tuusula",
    Vanda = "Vanda",
    Vantaa = "Vantaa",
}
