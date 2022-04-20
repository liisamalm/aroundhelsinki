package com.example.aroundhelsinki;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class Controller {

  @RequestMapping("/")
  public String hello() {

    return "hello";
  }

  @GetMapping("/places")
  private String getPlaces() {
    String url = "https://open-api.myhelsinki.fi/v2/places/";
    RestTemplate restTemplate = new RestTemplate();
    String result = restTemplate.getForObject(url, String.class);
    return result;
  }

}