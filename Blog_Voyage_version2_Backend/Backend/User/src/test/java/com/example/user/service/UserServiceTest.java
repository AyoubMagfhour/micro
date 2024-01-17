package com.example.user.service;

import com.example.user.entities.User;
import com.example.user.repository.UserRepository;
import com.example.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import javax.mail.Session;
import javax.mail.internet.MimeMessage;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUsers() {
        // Mocking the userRepository.findAll() method
        when(userRepository.findAll()).thenReturn(List.of(new User(), new User()));

        assertEquals(2, userService.getAllUsers().size());

        // Verifying that the findAll() method of userRepository was called exactly once
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testGetUserById() {
        User user = new User();
        user.setId(1L);

        // Mocking the userRepository.findById() method
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        assertEquals(user, userService.getUserById(1L).orElse(null));

        // Verifying that the findById() method of userRepository was called exactly once with argument 1L
        verify(userRepository, times(1)).findById(1L);
    }

    // Write similar tests for other methods in UserService

    @Test
    void testCreateUser() {
        User user = new User();
        user.setId(1L);

        // Mocking the userRepository.save() method
        when(userRepository.save(any(User.class))).thenReturn(user);

        assertEquals(user, userService.createUser(new User()));

        // Verifying that the save() method of userRepository was called exactly once with any User argument
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testUpdateUser() {
        User user = new User();
        user.setId(1L);

        // Mocking the userRepository.existsById() method
        when(userRepository.existsById(1L)).thenReturn(true);
        // Mocking the userRepository.save() method
        when(userRepository.save(any(User.class))).thenReturn(user);

        assertEquals(user, userService.updateUser(1L, new User()));

        // Verifying that the existsById() method of userRepository was called exactly once with argument 1L
        verify(userRepository, times(1)).existsById(1L);
        // Verifying that the save() method of userRepository was called exactly once with any User argument
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testDeleteUser() {
        doNothing().when(userRepository).deleteById(1L);
        userService.deleteUser(1L);
        verify(userRepository, times(1)).deleteById(1L);
    }

    @Test
    void testAuthenticateSuperuser_WithValidCredentials() {
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);
        assertEquals(user, userService.authenticateSuperuser("test@example.com", "password"));
        verify(userRepository, times(1)).findByEmail("test@example.com");
    }

    @Test
    void testAuthenticateSuperuser_WithInvalidCredentials() {
        when(userRepository.findByEmail(any())).thenReturn(null);
        assertNull(userService.authenticateSuperuser("test@example.com", "password"));
        verify(userRepository, times(1)).findByEmail(any());
    }



    @Test
    void testFindByEmail() {
        User user = new User();
        user.setEmail("test@example.com");
        when(userRepository.findByEmail("test@example.com")).thenReturn(user);
        assertEquals(user, userService.findByEmail("test@example.com"));
        verify(userRepository, times(1)).findByEmail("test@example.com");
    }

    @Test
    void testUpdatePassword() {
        User user = new User();
        user.setId(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);
        assertEquals(user, userService.updatePassword(1L, "newPassword"));
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testUpdateUserProfile() {
        User existingUser = new User();
        existingUser.setId(1L);
        User updatedUser = new User();
        updatedUser.setNom("New Name");
        when(userRepository.findById(1L)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);
        assertEquals(updatedUser, userService.updateUserprofil(1L, updatedUser));
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(any(User.class));
    }


}
