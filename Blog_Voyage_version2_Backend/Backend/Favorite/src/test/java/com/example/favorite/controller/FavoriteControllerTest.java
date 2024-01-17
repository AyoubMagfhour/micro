package com.example.favorite.controller;

import com.example.favorite.models.FavoriteResponse;
import com.example.favorite.service.FavoriteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class FavoriteControllerTest {

    @Mock
    private FavoriteService favoriteService;

    @InjectMocks
    private FavoriteController favoriteController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllComments() {
        List<FavoriteResponse> favoriteList = new ArrayList<>();
        when(favoriteService.findAll()).thenReturn(favoriteList);
        List<FavoriteResponse> result = favoriteController.getAllComments();
        assertEquals(favoriteList, result);
    }

    @Test
    void testGetCommentById() throws Exception {
        long id = 1L;
        FavoriteResponse response = new FavoriteResponse();
        when(favoriteService.findById(id)).thenReturn(response);
        FavoriteResponse result = favoriteController.getCommentById(id);
        assertEquals(response, result);
    }

    @Test
    void testAddFavoriteWithHandledException() throws Exception {
        Map<String, Long> request = new HashMap<>();
        request.put("userId", 1L);
        request.put("postId", 2L);
        when(favoriteService.addFavorite(anyLong(), anyLong()))
                .thenThrow(new RuntimeException("Some exception message"));
        ResponseEntity<FavoriteResponse> result = favoriteController.addFavorite(request);
        assertEquals(HttpStatus.BAD_REQUEST, result.getStatusCode());
        assertNull(result.getBody());
    }




    @Test
    void testDeleteFavorite() {
        ResponseEntity<Void> result = favoriteController.deleteFavorite(1L);
        assertEquals(HttpStatus.NO_CONTENT, result.getStatusCode());
        verify(favoriteService, times(1)).deleteById(1L);
    }

    @Test
    void testGetFavoritesByUserId() {
        long userId = 1L;
        List<FavoriteResponse> favoriteList = new ArrayList<>();
        when(favoriteService.findFavoritesByUserId(userId)).thenReturn(favoriteList);
        List<FavoriteResponse> result = favoriteController.getFavoritesByUserId(userId);
        assertEquals(favoriteList, result);
    }
}
