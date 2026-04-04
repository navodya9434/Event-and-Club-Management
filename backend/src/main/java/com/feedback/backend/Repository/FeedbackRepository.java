package com.feedback.backend.Repository;

import com.feedback.backend.Entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback,Long> {

    @Query("""
	    SELECT f FROM Feedback f
	    WHERE (:keyword IS NULL OR :keyword = '' OR
		  LOWER(f.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
		  LOWER(f.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
		  LOWER(f.message) LIKE LOWER(CONCAT('%', :keyword, '%')) OR
		  LOWER(COALESCE(f.reply, '')) LIKE LOWER(CONCAT('%', :keyword, '%')))
	      AND (:minRating IS NULL OR f.rating >= :minRating)
	      AND (:maxRating IS NULL OR f.rating <= :maxRating)
	      AND (:onlyReplied IS NULL OR :onlyReplied = false OR f.reply IS NOT NULL)
	    ORDER BY f.Id DESC
	    """)
    List<Feedback> searchFeedbacks(
	    @Param("keyword") String keyword,
	    @Param("minRating") Integer minRating,
	    @Param("maxRating") Integer maxRating,
	    @Param("onlyReplied") Boolean onlyReplied
    );
}
