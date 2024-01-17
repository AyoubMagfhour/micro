package com.example.user.entities;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class UserTest {

    @Test
    void testUserIdGetterSetter() {
        User user = new User();
        Long id = 1L;
        user.setId(id);
        assertEquals(id, user.getId());
    }

    @Test
    void testUserNomGetterSetter() {
        User user = new User();
        String nom = "John";
        user.setNom(nom);
        assertEquals(nom, user.getNom());
    }

    @Test
    void testUserEmailGetterSetter() {
        User user = new User();
        String email = "john@example.com";
        user.setEmail(email);
        assertEquals(email, user.getEmail());
    }

    @Test
    void testUserPrenomGetterSetter() {
        User user = new User();
        String prenom = "Doe";
        user.setPrenom(prenom);
        assertEquals(prenom, user.getPrenom());
    }

    @Test
    void testUserPasswordGetterSetter() {
        User user = new User();
        String password = "securePassword";
        user.setPassword(password);
        assertEquals(password, user.getPassword());
    }

    @Test
    void testUserUsernameGetterSetter() {
        User user = new User();
        String username = "johndoe";
        user.setUsername(username);
        assertEquals(username, user.getUsername());
    }

    @Test
    void testUserPhotoGetterSetter() {
        User user = new User();
        String photo = "profile.jpg";
        user.setPhoto(photo);
        assertEquals(photo, user.getPhoto());
    }

    @Test
    void testUserDescriptionGetterSetter() {
        User user = new User();
        String description = "Test user description";
        user.setDescription(description);
        assertEquals(description, user.getDescription());
    }
}
