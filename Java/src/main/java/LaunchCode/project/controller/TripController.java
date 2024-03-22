package LaunchCode.project.controller;

import LaunchCode.project.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import LaunchCode.project.models.Trip;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
@CrossOrigin
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

}
