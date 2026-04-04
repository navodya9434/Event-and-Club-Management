package com.feedback.backend.Service;

import com.feedback.backend.Dto.FeedbackAnalyticsResponse;
import com.feedback.backend.Entity.Feedback;
import com.feedback.backend.Repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository repository;

    public Feedback saveFeedback(Feedback feedback) {
           return repository.save(feedback);
    }

    public List<Feedback> getAllFeedbacks() {
                 return repository.searchFeedbacks(null, null, null, false);
    }

    public Feedback getFeedbackById(Long Id) {
          return  repository.findById(Id).orElseThrow();
    }

       public Optional<Feedback> findById(Long id) {
              return repository.findById(id);
       }

       public Feedback updateFeedback(Long id, Feedback payload) {
              Feedback existing = repository.findById(id)
                            .orElseThrow(() -> new RuntimeException("Feedback not found"));

              existing.setName(payload.getName());
              existing.setEmail(payload.getEmail());
              existing.setMessage(payload.getMessage());
              existing.setRating(payload.getRating());

              // Keep existing reply if the update payload omits it.
              if (payload.getReply() != null) {
                     existing.setReply(payload.getReply());
              }

              return repository.save(existing);
       }

       public Feedback updateReply(Long id, String reply) {
              Feedback existing = repository.findById(id)
                            .orElseThrow(() -> new RuntimeException("Feedback not found"));

              existing.setReply(reply);
              return repository.save(existing);
       }

       public List<Feedback> searchFeedbacks(String keyword, Integer minRating, Integer maxRating, Boolean onlyReplied) {
              return repository.searchFeedbacks(keyword, minRating, maxRating, onlyReplied);
       }

       public FeedbackAnalyticsResponse getAnalytics() {
              List<Feedback> feedbacks = repository.findAll();
              int total = feedbacks.size();
              int repliedCount = 0;
              int sumRatings = 0;
              Map<Integer, Long> ratingDistribution = new HashMap<>();

              for (int i = 1; i <= 5; i++) {
                     ratingDistribution.put(i, 0L);
              }

              for (Feedback feedback : feedbacks) {
                     sumRatings += feedback.getRating();

                     if (feedback.getReply() != null && !feedback.getReply().isBlank()) {
                            repliedCount++;
                     }

                     if (feedback.getRating() >= 1 && feedback.getRating() <= 5) {
                            ratingDistribution.put(
                                          feedback.getRating(),
                                          ratingDistribution.get(feedback.getRating()) + 1
                            );
                     }
              }

              double averageRating = total == 0 ? 0.0 : (double) sumRatings / total;
              int pendingCount = total - repliedCount;

              return new FeedbackAnalyticsResponse(total, repliedCount, pendingCount, averageRating, ratingDistribution);
       }

    public void deleteFeedback(Long id) {
            repository.deleteById(id);
    }

}
