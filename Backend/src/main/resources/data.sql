INSERT INTO advertisements (title, description, image_url, expiry_date, status, created_at)
SELECT 'Annual Innovation Challenge',
       'Join the university-wide innovation challenge and present your ideas to industry mentors. Open to all faculties. Prizes worth $5,000 up for grabs!',
       'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
       '2027-12-31', 'ACTIVE', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM advertisements WHERE title = 'Annual Innovation Challenge');

INSERT INTO advertisements (title, description, image_url, expiry_date, status, created_at)
SELECT 'Photography Club Open Day',
       'Meet the photography club, explore equipment demos, and register for upcoming workshops. Beginners and advanced photographers welcome!',
       'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
       '2027-11-30', 'ACTIVE', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM advertisements WHERE title = 'Photography Club Open Day');

INSERT INTO advertisements (title, description, image_url, expiry_date, status, created_at)
SELECT 'Tech Club AI Workshop Series',
       'Weekly hands-on workshops covering Machine Learning, Deep Learning, and AI tools. Every Saturday 2PM at Lab 204. Free for registered members.',
       'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
       '2027-09-15', 'ACTIVE', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM advertisements WHERE title = 'Tech Club AI Workshop Series');

INSERT INTO advertisements (title, description, image_url, expiry_date, status, created_at)
SELECT 'Drama Club Auditions 2025',
       'Auditions are open to all students for the annual drama production. No prior experience required. Auditions at Auditorium Hall A.',
       'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80',
       '2027-08-20', 'ACTIVE', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM advertisements WHERE title = 'Drama Club Auditions 2025');

INSERT INTO advertisements (title, description, image_url, expiry_date, status, created_at)
SELECT 'Inter-College Hackathon 2025',
       'A 48-hour coding challenge open to all computer science and IT students. Form teams of up to 4 members. Registration closes May 30.',
       'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
       '2027-05-30', 'ACTIVE', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM advertisements WHERE title = 'Inter-College Hackathon 2025');

INSERT INTO advertisements (title, description, image_url, expiry_date, status, created_at)
SELECT 'Cricket Club Recruitment Drive',
       'The university cricket club is recruiting new players for the upcoming inter-university tournament. Trials every weekend at the main sports ground.',
       'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
       '2027-07-31', 'ACTIVE', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM advertisements WHERE title = 'Cricket Club Recruitment Drive');

INSERT INTO advertisements (title, description, image_url, expiry_date, status, created_at)
SELECT 'Environmental Club Green Drive',
       'Join our campus clean-up and tree-planting initiative. Be part of the green revolution on campus. All volunteers get a certificate of participation.',
       'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
       '2027-10-05', 'ACTIVE', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM advertisements WHERE title = 'Environmental Club Green Drive');

INSERT INTO advertisements (title, description, image_url, expiry_date, status, created_at)
SELECT 'Past Semester Campaign',
       'Archived advertisement record used for admin cleanup and status-based filtering checks.',
       'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
       '2024-01-01', 'EXPIRED', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM advertisements WHERE title = 'Past Semester Campaign');

INSERT INTO advertisements (title, description, image_url, expiry_date, status, created_at)
SELECT 'Freshers Orientation Week 2023',
       'Welcome new students to campus! Orientation activities including campus tours, club showcases, and networking sessions. All first-year students must attend.',
       'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
       '2023-09-10', 'EXPIRED', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM advertisements WHERE title = 'Freshers Orientation Week 2023');

INSERT INTO advertisements (title, description, image_url, expiry_date, status, created_at)
SELECT 'Semester 1 Book Fair 2023',
       'Annual book fair featuring academic texts, novels, and stationery at discounted rates. Organized by the library committee at the main cafeteria.',
       'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80',
       '2023-11-25', 'EXPIRED', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM advertisements WHERE title = 'Semester 1 Book Fair 2023');

INSERT INTO advertisements (title, description, image_url, expiry_date, status, created_at)
SELECT 'Flagged Promotional Content',
       'This advertisement was flagged by students for containing misleading promotional content and has been marked as inappropriate pending review.',
       'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
       '2027-06-30', 'INAPPROPRIATE', CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM advertisements WHERE title = 'Flagged Promotional Content');



