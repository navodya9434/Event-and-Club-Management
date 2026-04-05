package com.feedback.backend.dto;

import java.util.Map;

public record FeedbackAnalyticsResponse(
        int totalFeedbacks,
        int repliedCount,
        int pendingCount,
        double averageRating,
        Map<Integer, Long> ratingDistribution
) {
}
