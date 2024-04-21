package LaunchCode.project.service;

import LaunchCode.project.models.User;

import java.util.List;

public interface UserService {
    public List<User> getAllUsers();
    User getUserById();
    User getUserById(int id);
    User userUpdate();
    User userUpdate(int id, User user);
}
