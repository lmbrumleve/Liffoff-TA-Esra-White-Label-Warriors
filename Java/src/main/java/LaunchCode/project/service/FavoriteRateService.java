package LaunchCode.project.service;

import LaunchCode.project.models.FavoriteRate;
import org.springframework.stereotype.Service;

@Service
public interface FavoriteRateService {



    void saveFavoriteRate(FavoriteRate favoriteRate);

//    void updateFavoriteRate(FavoriteRate favoriteRate, int id);

}
