package com.example.post.entities;

import com.example.post.entities.Post;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class PostTest {

    @Test
    void testPostEntityCreation() {
        Long postId = 1L;
        String title = "Sample Title";
        String description = "Sample Description";
        String ville = "Sample Ville";
        String pays = "Sample Pays";
        String imagepost = "Sample Image URL";
        Date datePoste = new Date(); // You can use any specific date
        Long userId = 1L;

        Post post = new Post(postId, title, description, ville, pays, imagepost, datePoste, userId);

        assertEquals(postId, post.getId(), "IDs should match");
        assertEquals(title, post.getTitle(), "Titles should match");
        assertEquals(description, post.getDescription(), "Descriptions should match");
        assertEquals(ville, post.getVille(), "Villes should match");
        assertEquals(pays, post.getPays(), "Pays should match");
        assertEquals(imagepost, post.getImagepost(), "Imageposts should match");
        assertEquals(datePoste, post.getDate_poste(), "Date_poste should match");
        assertEquals(userId, post.getUser_id(), "User IDs should match");
    }
}
