# Aroundhelsinki

<!--Mikä tämä ohjelma on ja mitä tällä voi tehdä-->

This is a Web application that uses a given location and shows a list of places of interest near by.

### Additional features

- The user will see additional information about places of interest when the place is selected
- The user can view the places of interest in a map
- The user can see a weather forecast for the next 3 hours
- The user can also view activities and events
- The user can filter places / activities / events

[Computer view prototype](https://xd.adobe.com/view/05531c53-b475-4c4f-8233-4a99dd1d40f1-5000/?fullscreen)

[Mobile view prototype](https://xd.adobe.com/view/d587891e-286f-4f51-a83d-c9b6cdb7fd96-80d4/?fullscreen)

## Tools used in the project

- [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0
- [SpringBoot](https://spring.io/projects/spring-boot) version 2.6.7
- [OpenJDK](https://jdk.java.net/archive/) version 11.0.12
- [Node](https://nodejs.org/en/) version 16.14.2

### Modules, components & add-ons used

- [@fortawesome/angular-fontawesome](https://github.com/FortAwesome/angular-fontawesome) version 0.10.x
- [@ng-bootstrap/ng-bootstrap](https://ng-bootstrap.github.io/#/home) version 12.1.1
- [@popperjs/core ngx-popperjs](https://github.com/MrFrankel/ngx-popper/)
- [@types/leaflet](https://github.com/Leaflet/Leaflet) version 1.8.0
- [leaflet-geosearch](https://github.com/smeijer/leaflet-geosearch) version 3.6.0
- [leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)
- [@ngx-translate/core](https://github.com/ngx-translate/core) version 14.0.0
- [@ngx-translate/http-loader](https://github.com/ngx-translate/core) 14.0.0
- [moment](https://github.com/moment/moment)

### APIs used

- [MyHelsinki Open API](https://open-api.myhelsinki.fi/doc#/) version 1
- [OpenStreetMap API](https://wiki.openstreetmap.org/wiki/API_v0.6) version 0.6
- [OpenWeatherMap API](https://openweathermap.org/api)

<!--mitä pitää olla asennettuna, jotta koodi toimii omalla koneella
 -->

## Installation

<!--miten ohjelman saa käyntiin-->

Clone the repository `git clone https://github.com/liisamalm/aroundhelsinki`

Install modules by running `npm i @types/leaflet leaflet-geosearch @ngx-translate/core @ngx-translate/http-loader leaflet.markercluster moment --save` in the project folder.

Run `mvn spring-boot:run` in the aroundhelsinki/aroundhelsinki folder.

Run `ng serve` in the project folder for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
