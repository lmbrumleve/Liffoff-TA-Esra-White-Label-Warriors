package LaunchCode.project.controller;

import LaunchCode.project.service.TripService;
import jakarta.persistence.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import LaunchCode.project.models.Trip;

import java.util.List;

@RestController
@CrossOrigin
@Table(name="trip")
public class TripController {

    @Autowired
    private TripService tripService;

    @PostMapping("/trips/add")
    public void saveNewTrip(@RequestBody Trip trip) {
        tripService.saveTrip(trip);
    }


    @GetMapping("/trips/getAll")
    public List<Trip> getAllTrips() {
        return tripService.getAllTrips();
    }

    @GetMapping("/trips/searchByName")
    public List<Trip> queryByName(@RequestParam String name) {
        return tripService.getTripsByName(name);
    }

    @GetMapping("/trips/searchByDestination")
    public List<Trip> queryByDestination(@RequestParam String destination) {
        return tripService.getTripsByDestination(destination);
    }

    @GetMapping("/trips/searchByBudget")
    public List<Trip> queryByBudget(@RequestParam double budget) {
        return tripService.getTripsByBudget(budget);
    }

}
