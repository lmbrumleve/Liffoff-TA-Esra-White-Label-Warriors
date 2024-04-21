package LaunchCode.project.controller;

import LaunchCode.project.models.User;
import LaunchCode.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/getAll")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/update/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        User user = null;
        user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> userUpdate(@PathVariable int id, @RequestBody User user) {
        user = userService.userUpdate(id, user);
        return ResponseEntity.ok(user);
    }

}
