package LaunchCode.project.service;

import LaunchCode.project.models.Trip;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TripService {
    void saveTrip(Trip trip);

    List<Trip> getAllTrips();

    List<Trip> getTripsByName(String name);
    List<Trip> getTripsByDestination(String destination);
}
