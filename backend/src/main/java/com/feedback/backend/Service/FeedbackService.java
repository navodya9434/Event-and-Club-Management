package com.feedback.backend.Service;

import com.feedback.backend.Entity.Feedback;
import com.feedback.backend.Repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository repository;

    public Feedback saveFeedback(Feedback feedback) {
           return repository.save(feedback);
    }

    public List<Feedback> getAllFeedbacks() {
           return repository.findAll();
    }

    public Feedback getFeedbackById(Long Id) {
          return  repository.findById(Id).orElseThrow();
    }

    public void deleteFeedback(Long id) {
            repository.deleteById(id);
    }

}
