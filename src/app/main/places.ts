export interface Places {

    id: Number;
    name: String;
    source_type: String;
    info_url: String;
    modified_at: String;
    location: String;
    description: String;
    tags: String;
    opening_hours: String;
    extra_searchwords: String;

    // id: number;
    // name: {
    //     fi: string;
    //     en: string;
    //     sv: string;
    //     zh: string;
    // };
    // source_type: {
    //     id: number;
    //     name: string;
    // },
    // info_url: string;
    // modified_at: string;
    // location: {
    //     lat: number;
    //     lon: number;
    //     address: {
    //         street_address: string;
    //         postal_code: number;
    //         locality: string;
    //         neighbourhood: string;
    //     }
    // },
    // description: {
    //     intro: string;
    //     body: string;
    //     images: [
    //         {
    //             url: string;
    //             copyright_holder: string;
    //             license_type: {
    //                 id: number;
    //                 name: string;
    //             },
    //             media_id: string;
    //         }
    //     ]
    // },
    // tags: [
    //     {
    //         id: string;
    //         name: string;
    //     }
    // ],
    // opening_hours: {
    //     hours: [
    //         {
    //             weekday_id: number,
    //             opens: string;
    //             closes: string;
    //             open24h: boolean;
    //         }
    //     ],
    //     openinghours_exception: string;
    // },
    // extra_searchwords: string;

}


