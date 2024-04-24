package LaunchCode.project.repository;

import LaunchCode.project.models.FavoriteRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRateRepository extends JpaRepository <FavoriteRate, Integer> {

//TODO: Does this need to have anything else?

}
