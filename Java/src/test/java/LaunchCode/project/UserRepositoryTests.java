package LaunchCode.project;

import LaunchCode.project.models.User;
import LaunchCode.project.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)
public class UserRepositoryTests {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository repo;

    @Test
    public void testCreateUser() {
        User user = new User();
        user.setEmail("no@mail.com");
        user.setPassword("nonono");
        user.setFirstName("Yes");
        user.setLastName("No");
        user.setDefaultCurrency("EUR");

        User savedUser = repo.save(user);

        User foundUser = entityManager.find(User.class, savedUser.getId());

        assert(user.getEmail()).equals(foundUser.getEmail());
    }
}
