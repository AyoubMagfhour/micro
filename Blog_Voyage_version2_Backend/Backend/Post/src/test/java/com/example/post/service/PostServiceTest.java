package com.example.post.service;

import com.example.post.entities.Post;
import com.example.post.entities.Userpost;
import com.example.post.models.PostResponse;
import com.example.post.repository.PostRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private PostService postService;


















}
