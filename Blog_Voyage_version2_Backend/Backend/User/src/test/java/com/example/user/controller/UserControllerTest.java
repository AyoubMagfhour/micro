package com.example.user.controller;

import com.example.user.entities.User;
import com.example.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllUsers_whenNoUsersExist() {
        when(userService.getAllUsers()).thenReturn(new ArrayList<>());

        List<User> result = userController.getAllUsers();

        assertTrue(result.isEmpty());
        verify(userService, times(1)).getAllUsers();
    }



    @Test
    void getUserById_whenUserExists() {
        User user = new User();
        user.setId(1L);
        when(userService.getUserById(1L)).thenReturn(Optional.of(user));

        ResponseEntity<User> result = userController.getUserById(1L);

        assertEquals(user, result.getBody());
        assertEquals(HttpStatus.OK, result.getStatusCode());
        verify(userService, times(1)).getUserById(1L);
    }

    @Test
    void getUserById_whenUserDoesNotExist() {
        when(userService.getUserById(2L)).thenReturn(Optional.empty());

        ResponseEntity<User> result = userController.getUserById(2L);

        assertNull(result.getBody());
        assertEquals(HttpStatus.NOT_FOUND, result.getStatusCode());
        verify(userService, times(1)).getUserById(2L);
    }

    @Test
    void updateUser_withValidData() {
        User user = new User();
        user.setId(1L);
        user.setUsername("newUsername");

        when(userService.updateUser(eq(1L), any(User.class))).thenReturn(user);

        ResponseEntity<User> result = userController.updateUser(1L, user);

        assertEquals(user, result.getBody());
        assertEquals(HttpStatus.OK, result.getStatusCode());
        verify(userService, times(1)).updateUser(eq(1L), any(User.class));

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userService).updateUser(eq(1L), userCaptor.capture());
        assertEquals("newUsername", userCaptor.getValue().getUsername());
    }

    @Test
    void updateUser_withInvalidData() {
        User user = new User(); // Create an invalid user object

        ResponseEntity<User> result = userController.updateUser(1L, user);

        assertNull(result.getBody());
        assertEquals(HttpStatus.NOT_FOUND, result.getStatusCode());
        verify(userService, times(1)).updateUser(eq(1L), any(User.class));
    }

    // Test scenarios for delete user
    @Test
    void deleteUser_withValidUserId() {
        Long userId = 1L;

        ResponseEntity<Void> result = userController.deleteUser(userId);

        assertEquals(HttpStatus.NO_CONTENT, result.getStatusCode());
        verify(userService, times(1)).deleteUser(userId);
    }

    @Test
    void deleteUser_withInvalidUserId() {
        Long userId = 2L;
        doThrow(new IllegalArgumentException()).when(userService).deleteUser(userId);

        ResponseEntity<Void> result = userController.deleteUser(userId);

        assertEquals(HttpStatus.NOT_FOUND, result.getStatusCode());
        verify(userService, times(1)).deleteUser(userId);
    }

    @Test
    void login_withValidCredentials() {
        User user = new User();
        user.setEmail("maghfour858@gmail.com");
        user.setPassword("1234");

        when(userService.authenticateSuperuser("maghfour858@gmail.com", "1234")).thenReturn(user);

        ResponseEntity<User> result = userController.login(user);

        assertEquals(user, result.getBody());
        assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    @Test
    void login_withInvalidCredentials() {
        User user = new User();
        user.setEmail("maghfour858@gmail.com");
        user.setPassword("12345");

        when(userService.authenticateSuperuser(anyString(), anyString())).thenReturn(null);

        ResponseEntity<User> result = userController.login(user);

        assertNull(result.getBody());
        assertEquals(HttpStatus.UNAUTHORIZED, result.getStatusCode());
    }

    // Test scenarios for getSuperuserByEmail
    @Test
    void getSuperuserByEmail_withValidEmail() {
        User user = new User();
        user.setEmail("maghfour858@gmail.com");

        when(userService.findByEmail("maghfour858@gmail.com")).thenReturn(user);

        User result = userController.getSuperuserByEmail("maghfour858@gmail.com");

        assertEquals(user, result);
    }

    @Test
    void getSuperuserByEmail_withInvalidEmail() {
        when(userService.findByEmail(anyString())).thenReturn(null);

        User result = userController.getSuperuserByEmail("maghfousr858@gmail.com");

        assertNull(result);
    }

}
