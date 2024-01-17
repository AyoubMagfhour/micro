package com.example.commentaire.controller;

import com.example.commentaire.entities.Commentaire;
import com.example.commentaire.models.CommentResponse;
import com.example.commentaire.service.CommentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

class CommentControllerTest {

    @Mock
    private CommentService commentService;

    @InjectMocks
    private CommentController commentController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllComments() {
        // Mocking service behavior
        List<CommentResponse> commentList = new ArrayList<>(); // Provide sample comment list data
        when(commentService.findAll()).thenReturn(commentList);

        // Perform the test
        List<CommentResponse> result = commentController.getAllComments();

        // Verify the result
        assertEquals(commentList, result);
    }

    @Test
    void testGetCommentById() throws Exception {
        // Mocking service behavior
        long commentId = 1L;
        CommentResponse comment = new CommentResponse(); // Provide a sample comment
        when(commentService.findById(commentId)).thenReturn(comment);

        // Perform the test
        CommentResponse result = commentController.getCommentById(commentId);

        // Verify the result
        assertEquals(comment, result);
    }

    @Test
    void testAddComment() throws Exception {
        // Mocking service behavior
        Commentaire comment = new Commentaire(); // Provide a sample comment
        CommentResponse addedComment = new CommentResponse(); // Provide a sample added comment
        when(commentService.addComment(any())).thenReturn(addedComment);

        // Perform the test
        ResponseEntity<CommentResponse> result = commentController.addComment(comment);

        // Verify the result
        assertEquals(HttpStatus.CREATED, result.getStatusCode());
        assertEquals(addedComment, result.getBody());
    }

    @Test
    void testGetCommentsByPostId() {
        // Mocking service behavior
        long postId = 1L;
        List<CommentResponse> comments = new ArrayList<>(); // Provide sample comments list
        when(commentService.findCommentsByPostId(postId)).thenReturn(comments);

        // Perform the test
        ResponseEntity<List<CommentResponse>> result = commentController.getCommentsByPostId(postId);

        // Verify the result
        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(comments, result.getBody());
    }
}
