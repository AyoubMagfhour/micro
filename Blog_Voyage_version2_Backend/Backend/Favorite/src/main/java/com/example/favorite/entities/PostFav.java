package com.example.favorite.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostFav {
    private Long id;
    private String title;
    private String description;
    private Date date_poste;
    private String pays;
    private String ville;
    private String imagepost;


}
