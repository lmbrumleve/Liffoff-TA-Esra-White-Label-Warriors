package LaunchCode.project.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "user")
public class User implements UserDetails {

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "email")
    @Email()
    private String email;

    @Column(nullable = false, length = 64, name = "password")
    @NotBlank
    @Size(min = 3, max = 50)
    private String password;

    @Column(name = "first_name", nullable = false, length = 20)
    @NotBlank
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 20)
    @NotBlank
    private String lastName;

    @Column(name="default_currency", length = 3)
    private String defaultCurrency;

    @Column(name="username", length = 20, unique = true, nullable = false)
    @NotBlank
    private String username;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<Token> tokens;

    //sample default currency, not incl get & set
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name="id")
//    private List<currency> currency;

    //sample favorites, not incl get & set
//    @OneToMany(cascade = CascadeType.ALL)
//    @JoinColumn(name="id", referencedColumnName = "id")
//    private List<Favorite> favorites;

    //sample transaction for user
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id", referencedColumnName = "id")
    private List<Transaction> transactions;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id", referencedColumnName = "id")
    private List<Trip> trips;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDefaultCurrency() {
        return defaultCurrency;
    }

    public void setDefaultCurrency(String defaultCurrency) {
        this.defaultCurrency = defaultCurrency;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Token> getTokens() {
        return tokens;
    }

    public void setTokens(List<Token> tokens) {
        this.tokens = tokens;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    public List<Trip> getTrips() {
        return trips;
    }

    public void setTrips(List<Trip> trips) {
        this.trips = trips;
    }

}