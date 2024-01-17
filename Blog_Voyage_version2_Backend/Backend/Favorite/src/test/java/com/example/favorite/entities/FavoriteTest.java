package com.example.favorite.entities;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class FavoriteTest {

    @Test
    void testFavoriteEntity() {
        Long id = 1L;
        Long postfavId = 5L;
        Long userfavId = 10L;
        Favorite favorite = new Favorite(id, postfavId, userfavId);
        assertThat(favorite.getId()).isEqualTo(id);
        assertThat(favorite.getPostfav_id()).isEqualTo(postfavId);
        assertThat(favorite.getUserfav_id()).isEqualTo(userfavId);
        Long newPostFavId = 20L;
        Long newUserFavId = 30L;
        favorite.setId(id);
        favorite.setPostfav_id(newPostFavId);
        favorite.setUserfav_id(newUserFavId);
        assertThat(favorite.getId()).isEqualTo(id);
        assertThat(favorite.getPostfav_id()).isEqualTo(newPostFavId);
        assertThat(favorite.getUserfav_id()).isEqualTo(newUserFavId);
    }
}
