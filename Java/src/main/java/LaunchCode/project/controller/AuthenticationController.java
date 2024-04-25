package LaunchCode.project.controller;

import LaunchCode.project.models.AuthenticationResponse;
import LaunchCode.project.models.User;
import LaunchCode.project.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Collections;
import java.util.Map;

@RestController
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register (@RequestBody User request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @GetMapping("/demo")
    public ResponseEntity<String> demo() {
        return ResponseEntity.ok("Demo");
    }

    @PostMapping("/auth/google")
    public ResponseEntity<?> authenticate(@RequestBody Map<String, String> requestBody) {
        String code = requestBody.get("code");
        String accessToken = getAccessToken(code);
        return ResponseEntity.ok(Collections.singletonMap("access_token", accessToken));
    }
    private String getAccessToken(String code) {
        //implement logic to exchange code for an access token
        //can use RestTemplate to make a request to Google's token endpoint with the code
        //return the access token obtained from response
        return "sample_token";
    }
}

