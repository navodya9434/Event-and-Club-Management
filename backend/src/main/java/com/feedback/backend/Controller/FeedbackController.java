package com.feedback.backend.Controller;


import com.feedback.backend.dto.FeedbackAnalyticsResponse;
import com.feedback.backend.dto.ReplyRequest;
import com.feedback.backend.Entity.Feedback;
import com.feedback.backend.Service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/feedback")
@RequiredArgsConstructor
@CrossOrigin
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public Feedback createFeedback(@RequestBody Feedback feedback) {
          return feedbackService.saveFeedback(feedback);
    }

    @PutMapping("/{id}")
    public Feedback updateFeedback(@PathVariable Long id, @RequestBody Feedback feedback) {
        return feedbackService.updateFeedback(id, feedback);
    }

    @GetMapping
    public List<Feedback> getAllFeedbacks() {
        return feedbackService.getAllFeedbacks();
    }

    @GetMapping("/search")
    public List<Feedback> searchFeedbacks(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Integer minRating,
            @RequestParam(required = false) Integer maxRating,
            @RequestParam(required = false, defaultValue = "false") Boolean onlyReplied
    ) {
        return feedbackService.searchFeedbacks(keyword, minRating, maxRating, onlyReplied);
    }

    @GetMapping("/analytics")
    public FeedbackAnalyticsResponse getAnalytics() {
        return feedbackService.getAnalytics();
    }

    @GetMapping("/{id}")
    public Feedback getFeedback(@PathVariable Long id) {
        return feedbackService.getFeedbackById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
    }

    @PutMapping("/{id}/reply")
    public Feedback replyToFeedback(@PathVariable Long id, @RequestBody ReplyRequest request) {
        return feedbackService.updateReply(id, request.reply());
    }


}
