package com.example.post.controller;

import com.example.post.entities.Post;
import com.example.post.models.PostResponse;
import com.example.post.service.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SpringBootTest
@AutoConfigureMockMvc
public class PostControllerTest {

    @InjectMocks
    private PostController postController;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PostService postService;

    @Test
    void testGetPostByIdFound() throws Exception {
        long postId = 1L;
        PostResponse mockPostResponse = new PostResponse(/* Mock data */);

        when(postService.findById(postId)).thenReturn(mockPostResponse);

        mockMvc.perform(get("/api/posts/{id}", postId))
                .andExpect(status().isOk());
    }

    @Test
    void testGetPostByIdNotFound() throws Exception {
        long postId = 1L;

        when(postService.findById(postId)).thenThrow(new Exception());

        mockMvc.perform(get("/api/posts/{id}", postId))
                .andExpect(status().isNotFound());
    }



    @Test
    void testAddPostBadRequest() throws Exception {
        Post invalidPost = new Post(/* Invalid mock data */);

        when(postService.addPost(invalidPost)).thenThrow(new Exception());

        ObjectMapper objectMapper = new ObjectMapper();
        String invalidPostJson = objectMapper.writeValueAsString(invalidPost);

        mockMvc.perform(post("/api/posts/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidPostJson))
                .andExpect(status().isBadRequest());
    }


}
