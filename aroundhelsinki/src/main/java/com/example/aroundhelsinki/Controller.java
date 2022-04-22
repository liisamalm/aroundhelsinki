package com.example.aroundhelsinki;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class Controller {

  @RequestMapping("/")
  public String hello() {

    return "Around Helsinki";
  }

  //PLACES
  @GetMapping("/v1/places")
  private String getPlaces() {
    String url = "https://open-api.myhelsinki.fi/v1/places/";
    RestTemplate restTemplate = new RestTemplate();
    String result = restTemplate.getForObject(url, String.class);
    return result;
  }

  @GetMapping("/place/{id}")
  private String getPlace(@PathVariable Long id) {
    String url = "https://open-api.myhelsinki.fi/v1/place/"+ id;
    RestTemplate restTemplate = new RestTemplate();
    String result = restTemplate.getForObject(url, String.class);
    return result;
  }

  //EVENTS

  @GetMapping("/v1/events")
  private String getEvents() {
    String url = "https://open-api.myhelsinki.fi/v1/events/";
    RestTemplate restTemplate = new RestTemplate();
    String result = restTemplate.getForObject(url, String.class);
    return result;
  }

  @GetMapping("/event/{id}")
  private String getEvent(@PathVariable String id) {
    String url = "https://open-api.myhelsinki.fi/v1/event/"+ id;
    RestTemplate restTemplate = new RestTemplate();
    String result = restTemplate.getForObject(url, String.class);
    return result;
  }


  //ACTIVITIES



}
