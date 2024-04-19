package LaunchCode.project.service;

import LaunchCode.project.models.User;
import org.springframework.stereotype.Service;

import java.util.List;
public interface UserService {
    User createUser(User user);
    List<User> getAllUsers();
}
