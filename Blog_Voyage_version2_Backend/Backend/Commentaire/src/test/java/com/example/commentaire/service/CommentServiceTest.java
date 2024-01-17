package com.example.commentaire.service;

import com.example.commentaire.entities.Commentaire;
import com.example.commentaire.entities.PostComment;
import com.example.commentaire.entities.UserComment;
import com.example.commentaire.models.CommentResponse;
import com.example.commentaire.repository.CommentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private CommentService commentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAll() {
        List<Commentaire> comments = new ArrayList<>(); // Provide sample comments data
        when(commentRepository.findAll()).thenReturn(comments);
        UserComment[] userComments = {};
        when(restTemplate.getForEntity(anyString(), eq(UserComment[].class))).thenReturn(ResponseEntity.ok(userComments));
        PostComment[] postComments = {};
        when(restTemplate.getForEntity(anyString(), eq(PostComment[].class))).thenReturn(ResponseEntity.ok(postComments));
        List<CommentResponse> result = commentService.findAll();
        assertEquals(comments.size(), result.size(), "Size of comment responses should match the size of comments");

    }

    @Test
    void testFindById() throws Exception {
        long commentId = 1L;
        Commentaire comment = new Commentaire(); // Provide a sample comment
        when(commentRepository.findById(commentId)).thenReturn(Optional.of(comment));
        UserComment userComment = new UserComment(); // Provide a sample userComment
        when(restTemplate.getForObject(anyString(), eq(UserComment.class))).thenReturn(userComment);
        PostComment postComment = new PostComment(); // Provide a sample postComment
        when(restTemplate.getForObject(anyString(), eq(PostComment.class))).thenReturn(postComment);
        CommentResponse result = commentService.findById(commentId);
        assertEquals(comment.getId(), result.getId(), "IDs should match");
        assertEquals(comment.getComment(), result.getComment(), "Comments should match");

    }

    @Test
    void testAddComment() throws Exception {
        Commentaire comment = new Commentaire(); // Provide a sample comment
        when(commentRepository.save(any())).thenReturn(comment);
        UserComment userComment = new UserComment(); // Provide a sample userComment
        when(restTemplate.getForObject(anyString(), eq(UserComment.class))).thenReturn(userComment);
        PostComment postComment = new PostComment(); // Provide a sample postComment
        when(restTemplate.getForObject(anyString(), eq(PostComment.class))).thenReturn(postComment);
        CommentResponse result = commentService.addComment(comment);
        assertEquals(comment.getId(), result.getId(), "IDs should match");
    }

    @Test
    void testAddCommentWithInvalidUser() {
        Commentaire comment = new Commentaire(); // Provide a sample comment
        when(commentRepository.save(any())).thenReturn(comment);
        when(restTemplate.getForObject(anyString(), eq(UserComment.class))).thenReturn(null);
        assertThrows(Exception.class, () -> commentService.addComment(comment));
    }

    // Implement similar test methods for other functionalities like findById, addComment, findCommentsByPostId, etc.
}
