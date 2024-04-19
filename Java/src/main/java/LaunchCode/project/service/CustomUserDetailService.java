//package LaunchCode.project.service;
//
//import LaunchCode.project.models.CustomUserDetails;
//import LaunchCode.project.models.User;
//import LaunchCode.project.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//
//import java.util.Optional;
//
//public class CustomUserDetailService implements UserDetailsService {
//    @Autowired
//    private UserRepository userRepository;
//
//    @Override
//    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Optional<User> optionalUser = userRepository.findByEmail(username);
//        User user = optionalUser.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
//        return new CustomUserDetails(user);
//    }
//}
