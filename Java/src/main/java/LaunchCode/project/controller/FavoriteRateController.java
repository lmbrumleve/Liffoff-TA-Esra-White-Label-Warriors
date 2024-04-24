package LaunchCode.project.controller;

import LaunchCode.project.models.FavoriteRate;
import LaunchCode.project.service.FavoriteRateService;
import jakarta.persistence.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin//(origins = "http://localhost:5173")
@Table(name = "favoriteRate")
//@RequestMapping("/favorite")
public class FavoriteRateController {

    @Autowired(required = false)
    private FavoriteRateService favoriteRateService;

    //TODO: Is this "/" and the above @RequestMapping correct?
    @PostMapping("/favorite")
    public String addFavoriteRate(@RequestBody FavoriteRate favoriteRate) {
        favoriteRateService.saveFavoriteRate(favoriteRate);
        return "New favorite saved";
    }

}
