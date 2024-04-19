package LaunchCode.project.config;

//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    UserDetailsService userDetailsService() {
//        return new CustomUserDetailService();
//    }
//
//    @Bean
//    PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public DaoAuthenticationProvider authenticationProvider() {
//        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//        authProvider.setUserDetailsService(userDetailsService());
//        authProvider.setPasswordEncoder(passwordEncoder());
//
//        return authProvider;
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//            .csrf(csrf -> csrf
//            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
//            )
//            .authorizeHttpRequests(auth -> auth
//            .requestMatchers("/users").authenticated()
//                .anyRequest().permitAll()
//            )
//                .formLogin(form -> form
//            .loginProcessingUrl("/login")
//            .usernameParameter("email")
//                .defaultSuccessUrl("/users", true)
//                .permitAll()
//            )
//                .logout(logout -> logout
//            .logoutUrl("/logout")
//            .logoutSuccessUrl("/")
//                .permitAll()
//            );
//
//        return http.build();
//    }
//}
////This Class is to enable users and non-users to access certain parts of the website
