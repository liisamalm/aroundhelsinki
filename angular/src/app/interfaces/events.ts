export interface Events {
  meta: Meta;
  data: Datum[];
  tags: { [key: string]: string };
}

export interface Datum {
  id: string;
  name: NameClass;
  source_type: EType;
  info_url: null | string;
  modified_at: Date;
  location: Location;
  description: Description;
  tags: Tag[];
  event_dates: EventDates;
}

export interface Description {
  intro: null | string;
  body: string;
  images: Image[];
}

export interface Image {
  url: string;
  copyright_holder: string;
  license_type: EType;
  media_id: null;
}

export interface EType {
  id: number;
  name: NameEnum;
}

export enum NameEnum {
  AllRightsReserved = 'All rights reserved.',
  LinkedEvents = 'LinkedEvents',
}

export interface EventDates {
  starting_day: Date | null;
  ending_day: Date | null;
  additional_description: null;
}

export interface Location {
  lat: number;
  lon: number;
  address: Address;
}

export interface Address {
  street_address: null | string;
  postal_code: null | string;
  locality: Locality | null;
  neighbourhood: null;
}

export enum Locality {
  Espoo = 'Espoo',
  Helsinki = 'Helsinki',
  Kauniainen = 'Kauniainen',
  Vantaa = 'Vantaa',
}

export interface NameClass {
  fi: string;
  en: null | string;
  sv: null | string;
  zh: null | string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Meta {
  count: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toEvents(json: string): Events {
    return cast(JSON.parse(json), r('Events'));
  }

  public static eventsToJson(value: Events): string {
    return JSON.stringify(uncast(value, r('Events')), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
  if (key) {
    throw Error(
      `Invalid value for key "${key}". Expected type ${JSON.stringify(
        typ
      )} but got ${JSON.stringify(val)}`
    );
  }
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`
  );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) { }
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
        ? transformArray(typ.arrayItems, val)
        : typ.hasOwnProperty('props')
          ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  Events: o(
    [
      { json: 'meta', js: 'meta', typ: r('Meta') },
      { json: 'data', js: 'data', typ: a(r('Datum')) },
      { json: 'tags', js: 'tags', typ: m('') },
    ],
    false
  ),
  Datum: o(
    [
      { json: 'id', js: 'id', typ: '' },
      { json: 'name', js: 'name', typ: r('NameClass') },
      { json: 'source_type', js: 'source_type', typ: r('EType') },
      { json: 'info_url', js: 'info_url', typ: u(null, '') },
      { json: 'modified_at', js: 'modified_at', typ: Date },
      { json: 'location', js: 'location', typ: r('Location') },
      { json: 'description', js: 'description', typ: r('Description') },
      { json: 'tags', js: 'tags', typ: a(r('Tag')) },
      { json: 'event_dates', js: 'event_dates', typ: r('EventDates') },
    ],
    false
  ),
  Description: o(
    [
      { json: 'intro', js: 'intro', typ: u(null, '') },
      { json: 'body', js: 'body', typ: '' },
      { json: 'images', js: 'images', typ: a(r('Image')) },
    ],
    false
  ),
  Image: o(
    [
      { json: 'url', js: 'url', typ: '' },
      { json: 'copyright_holder', js: 'copyright_holder', typ: '' },
      { json: 'license_type', js: 'license_type', typ: r('EType') },
      { json: 'media_id', js: 'media_id', typ: null },
    ],
    false
  ),
  EType: o(
    [
      { json: 'id', js: 'id', typ: 0 },
      { json: 'name', js: 'name', typ: r('NameEnum') },
    ],
    false
  ),
  EventDates: o(
    [
      { json: 'starting_day', js: 'starting_day', typ: u(Date, null) },
      { json: 'ending_day', js: 'ending_day', typ: u(Date, null) },
      {
        json: 'additional_description',
        js: 'additional_description',
        typ: null,
      },
    ],
    false
  ),
  Location: o(
    [
      { json: 'lat', js: 'lat', typ: 3.14 },
      { json: 'lon', js: 'lon', typ: 3.14 },
      { json: 'address', js: 'address', typ: r('Address') },
    ],
    false
  ),
  Address: o(
    [
      { json: 'street_address', js: 'street_address', typ: u(null, '') },
      { json: 'postal_code', js: 'postal_code', typ: u(null, '') },
      { json: 'locality', js: 'locality', typ: u(r('Locality'), null) },
      { json: 'neighbourhood', js: 'neighbourhood', typ: null },
    ],
    false
  ),
  NameClass: o(
    [
      { json: 'fi', js: 'fi', typ: '' },
      { json: 'en', js: 'en', typ: u(null, '') },
      { json: 'sv', js: 'sv', typ: u(null, '') },
      { json: 'zh', js: 'zh', typ: u(null, '') },
    ],
    false
  ),
  Tag: o(
    [
      { json: 'id', js: 'id', typ: '' },
      { json: 'name', js: 'name', typ: '' },
    ],
    false
  ),
  Meta: o([{ json: 'count', js: 'count', typ: '' }], false),
  NameEnum: ['All rights reserved.', 'LinkedEvents'],
  Locality: ['Espoo', 'Helsinki', 'Kauniainen', 'Vantaa'],
};
