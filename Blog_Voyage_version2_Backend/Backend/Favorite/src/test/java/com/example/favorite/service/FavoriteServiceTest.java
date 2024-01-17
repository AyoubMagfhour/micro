package com.example.favorite.service;

import com.example.favorite.entities.Favorite;
import com.example.favorite.entities.PostFav;
import com.example.favorite.entities.UserFav;
import com.example.favorite.models.FavoriteResponse;
import com.example.favorite.repository.FavoriteRepository;
import com.example.favorite.service.FavoriteService;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class FavoriteServiceTest {

    @Mock
    private FavoriteRepository favoriteRepository;

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private FavoriteService favoriteService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindAll() {
        List<Favorite> favorites = new ArrayList<>(); // Provide sample favorites data
        when(favoriteRepository.findAll()).thenReturn(favorites);
        UserFav[] userFavs = {}; // Provide sample userFavs data
        when(restTemplate.getForEntity(anyString(), eq(UserFav[].class))).thenReturn(ResponseEntity.ok(userFavs));
        PostFav[] postFavs = {}; // Provide sample postFavs data
        when(restTemplate.getForEntity(anyString(), eq(PostFav[].class))).thenReturn(ResponseEntity.ok(postFavs));
        List<FavoriteResponse> result = favoriteService.findAll();
    }

    @Test
    void testFindById() throws Exception {
        long id = 1L;
        Favorite favorite = new Favorite(); // Provide a sample favorite with id 1
        when(favoriteRepository.findById(id)).thenReturn(Optional.of(favorite));
        UserFav userFav = new UserFav(); // Provide a sample userFav
        when(restTemplate.getForObject(anyString(), eq(UserFav.class))).thenReturn(userFav);
        PostFav postFav = new PostFav(); // Provide a sample postFav
        when(restTemplate.getForObject(anyString(), eq(PostFav.class))).thenReturn(postFav);
        FavoriteResponse result = favoriteService.findById(id);
        assertEquals(favorite.getId(), result.getId(), "IDs should match");
    }

    @Test
    void testAddFavorite() throws Exception {
        long userId = 1L;
        long postId = 1L;
        UserFav userFav = new UserFav(); // Provide a sample userFav
        when(restTemplate.getForObject(anyString(), eq(UserFav.class))).thenReturn(userFav);
        PostFav postFav = new PostFav(); // Provide a sample postFav
        when(restTemplate.getForObject(anyString(), eq(PostFav.class))).thenReturn(postFav);
        Favorite savedFavorite = new Favorite(); // Provide a sample savedFavorite
        when(favoriteRepository.save(any())).thenReturn(savedFavorite);
        FavoriteResponse result = favoriteService.addFavorite(userId, postId);
        assertNotNull(result, "Returned FavoriteResponse should not be null");
        assertEquals(savedFavorite.getId(), result.getId(), "IDs should match");
    }

    @Test
    void testAddFavoriteWithInvalidUser() {
        long userId = 1L;
        long postId = 1L;
        when(restTemplate.getForObject(anyString(), eq(UserFav.class))).thenReturn(null);
        assertThrows(Exception.class, () -> favoriteService.addFavorite(userId, postId));
    }
}
