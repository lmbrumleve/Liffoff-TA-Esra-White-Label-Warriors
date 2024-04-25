package LaunchCode.project.controller;

import LaunchCode.project.models.User;
import LaunchCode.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Collections;


@RestController
@CrossOrigin
public class OAuth2Controller {

    private final OAuth2AuthorizedClientService clientService;
    private final UserRepository userRepository;

    @Autowired
    public OAuth2Controller(OAuth2AuthorizedClientService clientService, UserRepository userRepository) {
        this.clientService = clientService;
        this.userRepository = userRepository;
    }

    @GetMapping("/login/oauth2/code/google")
    public RedirectView loginSuccess(OAuth2AuthenticationToken authenticationToken) {
        OAuth2AuthorizedClient client = clientService.loadAuthorizedClient(
                authenticationToken.getAuthorizedClientRegistrationId(),
                authenticationToken.getName()
        );

        String userEmail = client.getPrincipalName();

        Optional<User> existingUser = userRepository.findByEmail(userEmail);
        if (!existingUser.isPresent()) {
            User user = new User();
            user.setEmail(userEmail);
            userRepository.save(user);
        }

        //handle storing user information and token, then redirect to a successful login page
        //store user details in database and generate a token for further authentication.

        return new RedirectView("/login-success");
    }

    @PostMapping("/register/google")
    public ResponseEntity<?> registerWithGoogle(@RequestBody Map<String, String> googleData) {
        String userEmail = googleData.get("email");

        Optional<User> existingUser = userRepository.findByEmail(userEmail);
        if (!existingUser.isPresent()) {
            User user = new User();
            //extract other user details from googleData as needed
            userRepository.save(user);
        }

        return ResponseEntity.ok().build();
    }
    @PostMapping("/auth/google")
    public ResponseEntity<?> authenticate(@RequestBody Map<String, String> requestBody) {
        String code = requestBody.get("code");
        String accessToken = getAccessToken(code);
        return ResponseEntity.ok(Collections.singletonMap("access_token", accessToken));
    }

    private String getAccessToken(String code) {

        RestTemplate restTemplate = new RestTemplate();
        String tokenEndpointUrl = "";
        String clientId = "";
        String clientSecret = "";
        String redirectUri = "http://localhost:8080/login/oauth2/code/google";
        Map<String, String> requestBody = Collections.singletonMap("code", code);
        Map<String, String> response = restTemplate.postForObject(tokenEndpointUrl + "?client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=" + redirectUri + "&code=" + code + "&grant_type=authorization_code", requestBody, Map.class);
        return response.get("access_token");
    }
}
