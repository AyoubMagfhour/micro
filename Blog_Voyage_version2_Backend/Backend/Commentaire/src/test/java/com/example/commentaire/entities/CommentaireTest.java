package com.example.commentaire.entities;

import com.example.commentaire.entities.Commentaire;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class CommentaireTest {

    @Test
    void testCommentaireEntity() {
        // Create a sample Commentaire object
        Long id = 1L;
        String comment = "This is a comment.";
        Long userId = 10L;
        Long postId = 20L;

        Commentaire commentaire = new Commentaire(id, comment, userId, postId);

        // Validate the getters
        assertThat(commentaire.getId()).isEqualTo(id);
        assertThat(commentaire.getComment()).isEqualTo(comment);
        assertThat(commentaire.getUser_id()).isEqualTo(userId);
        assertThat(commentaire.getPost_id()).isEqualTo(postId);

        // Validate the setters
        Long newUserId = 30L;
        Long newPostId = 40L;

        commentaire.setId(id);
        commentaire.setComment(comment);
        commentaire.setUser_id(newUserId);
        commentaire.setPost_id(newPostId);

        assertThat(commentaire.getId()).isEqualTo(id);
        assertThat(commentaire.getComment()).isEqualTo(comment);
        assertThat(commentaire.getUser_id()).isEqualTo(newUserId);
        assertThat(commentaire.getPost_id()).isEqualTo(newPostId);
    }
}
