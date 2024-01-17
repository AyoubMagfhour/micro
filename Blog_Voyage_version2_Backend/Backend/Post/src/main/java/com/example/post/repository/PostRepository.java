package com.example.post.repository;

import com.example.post.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository  extends JpaRepository<Post,Long> {
    @Query("SELECT p FROM Post p WHERE p.user_id = :userId") // Use the exact column name
    List<Post> findByUserId(@Param("userId") Long userId);

    List<Post> findByPays(String pays);



}
