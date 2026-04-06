package com.clubmanagement.service.clubManagement;

import com.clubmanagement.model.clubManagement.Meeting;
import com.clubmanagement.repository.clubManagement.MeetingRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MeetingService {

    private final MeetingRepository repository;

    public MeetingService(MeetingRepository repository) {
        this.repository = repository;
    }

    public Meeting createMeeting(Meeting meeting) {
        return repository.save(meeting);
    }

    public List<Meeting> getClubMeetings(Long clubId) {
        return repository.findByClubIdOrderByDateTimeAsc(clubId);
    }

    public void deleteMeeting(Long meetingId) {
        repository.deleteById(meetingId);
    }

    public Meeting updateMeeting(Meeting meeting) {
        return repository.save(meeting);
    }
}