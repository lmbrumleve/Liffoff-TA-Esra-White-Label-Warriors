//package LaunchCode.project.controller;
//
//import LaunchCode.project.models.User;
<<<<<<< HEAD
=======
//import LaunchCode.project.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
>>>>>>> 240414-london
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
<<<<<<< HEAD

=======
//
>>>>>>> 240414-london
//@RestController
//@RequestMapping("/user")
//@CrossOrigin
//public class UserController {
<<<<<<< HEAD
////    @Autowired
////    private UserService userService;
=======
//    @Autowired
//    private UserService userService;
>>>>>>> 240414-london
//
////    @GetMapping("/register")
////    public String displayRegistration() {
////        return "registration_form";
////    }
//
//    @PostMapping("/register_processing")
//    public String registerProcessing(@RequestBody User user) {
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        String encodedPassword = passwordEncoder.encode(user.getPassword());
//        user.setPassword(encodedPassword);
//
//        userService.createUser(user);
//
//        return "register_successful";
//    }
//    @GetMapping("/users")
//    public List<User> getAllUsers() {
//        return userService.getAllUsers();
//    }
//}
