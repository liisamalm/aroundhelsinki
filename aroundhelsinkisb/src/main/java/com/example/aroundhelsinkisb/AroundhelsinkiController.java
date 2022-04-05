package com.example.aroundhelsinkisb;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class AroundhelsinkiController {

    @RequestMapping("/")
    public String home() {
        return "This is home";
    }

    @GetMapping(value = "/home")
    private String getHome() {
        String uri = "http://localhost:8080";
        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.getForObject(uri, String.class);
        return result;
    }

    @GetMapping(value = "/places")
    public List<Object> getHelsinki() {
        
        String url = "http://open-api.myhelsinki.fi/v2/places/";
        RestTemplate restTemplate = new RestTemplate();

        String places = restTemplate.getForObject(url, String.class);
        return Arrays.asList(places);


    }
    
}
