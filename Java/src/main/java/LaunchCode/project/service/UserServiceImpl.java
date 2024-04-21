package LaunchCode.project.service;

import LaunchCode.project.models.User;
import LaunchCode.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById() {
        return null;
    }

    @Override
    public User getUserById(int id) {
        User user = userRepository.findById(id).orElseThrow();
        return user;
    }

    @Override
    public User userUpdate() {
        return null;
    }

    @Override
    public User userUpdate(int id, User user) {
        userRepository.findById(id).orElseThrow(IllegalArgumentException::new);
        user.setUsername(user.getUsername());
        user.setFirstName(user.getFirstName());
        user.setLastName(user.getLastName());
        user.setEmail(user.getEmail());
        user.setPassword(user.getPassword());
        return userRepository.save(user);
    }

}
