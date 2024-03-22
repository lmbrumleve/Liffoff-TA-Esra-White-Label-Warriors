package LaunchCode.project.service;

import LaunchCode.project.models.Trip;
import LaunchCode.project.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripServiceImpl implements TripService {

    @Autowired
    private TripRepository tripRepository;

    @Override
    public void saveTrip(Trip trip) {
        tripRepository.save(trip);
    };
    @Override
    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    };

    @Override
    public List<Trip> getTripsByName(String name) {
        return tripRepository.getTripsByName(name);
    };

    @Override
    public List<Trip> getTripsByDestination(String destination) {
        return tripRepository.getTripsByDestination(destination);
    };
}
