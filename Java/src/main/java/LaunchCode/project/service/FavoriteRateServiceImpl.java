package LaunchCode.project.service;

import LaunchCode.project.models.FavoriteRate;
import LaunchCode.project.repository.FavoriteRateRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class FavoriteRateServiceImpl implements FavoriteRateService{

    @Autowired
    private FavoriteRateRepository favoriteRateRepository;
    @Override
    public void saveFavoriteRate(FavoriteRate favoriteRate) {
        favoriteRateRepository.save(favoriteRate);
    }

//    @Override
//    public void updateFavoriteRate(FavoriteRate favoriteRate, int id){
//        FavoriteRate favoriteRate1 = favoriteRateRepository.findById(id).get();
//        favoriteRate1.setFavorite(favoriteRate1.getFavorite());
//        favoriteRateRepository.save(favoriteRate1);
//        ;}
}
