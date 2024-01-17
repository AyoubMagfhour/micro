package com.example.commentaire.repository;

import com.example.commentaire.entities.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Commentaire, Long > {
    @Query("SELECT c FROM Commentaire c WHERE c.post_id = :postId")
    List<Commentaire> findCommentByPostId(Long postId);

}
