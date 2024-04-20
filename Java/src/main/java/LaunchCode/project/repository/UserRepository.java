//package LaunchCode.project.repository;
//
//import LaunchCode.project.models.User;
//import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
//import java.util.Optional;
//
//public interface UserRepository extends JpaRepository<User, Integer> {
//    Optional<User> findByUsername(String username);
=======
//import org.springframework.data.jpa.repository.Query;
//
//public interface UserRepository extends JpaRepository<User, Integer> {
//    @Query("SELECT u FROM User u WHERE u.email = ?1")
//    User findByEmail(String email);
>>>>>>> 240414-london
//}
