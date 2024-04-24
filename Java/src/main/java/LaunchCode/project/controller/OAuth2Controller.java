package LaunchCode.project.controller;

import LaunchCode.project.models.User;
import LaunchCode.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import java.util.LinkedHashMap;
import java.util.Optional;

@RestController
public class OAuth2Controller {
    private final OAuth2AuthorizedClientService clientService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public OAuth2Controller(OAuth2AuthorizedClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/login/oauth2/code/{provider}")
    public RedirectView loginSuccess(@PathVariable String provider, OAuth2AuthenticationToken authenticationToken) {
        OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(
                authenticationToken.getAuthorizedClientRegistrationId(),
                authenticationToken.getName()
        );

        String userEmail = (String) client.getPrincipalAttributes().get("email");
        String provider = authenticationToken.getAuthorizedClientRegistrationId();

        Optional<User> existingUser = userRepository.findByEmail(userEmail);
        if (!existingUser.isPresent()) {
            User user = new User();
            user.setEmail(userEmail);
            userRepository.save(user);
        }

        // Handle storing the user information and token, then redirect to a successful login page
        // For example, store user details in your database and generate a JWT token for further authentication.

        return new RedirectView("/login-success");
    }

    @GetMapping("/user")
    public Authentication user(OAuth2Authentication authentication) {
        LinkedHashMap<String, Object> details = (LinkedHashMap<String, Object>) authentication.getUserAuthentication().getDetails();
        return details.get("email");
    }
}
