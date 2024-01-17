package com.example.favorite.repository;

import com.example.favorite.entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    @Query("SELECT f FROM Favorite f WHERE f.userfav_id = :userId")
    List<Favorite> findByUserFavId(@Param("userId") Long userId);
}
