INSERT INTO advertisements (title, description, image_url, expiry_date, status, created_at)
SELECT
    'Annual Innovation Challenge',
    'Join the university-wide innovation challenge and present your ideas to industry mentors.',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    '2030-12-31',
    'ACTIVE',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM advertisements WHERE title = 'Annual Innovation Challenge'
);

INSERT INTO advertisements (title, description, image_url, expiry_date, status, created_at)
SELECT
    'Photography Club Open Day',
    'Meet the photography club, explore equipment demos, and register for upcoming workshops.',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    '2030-11-30',
    'ACTIVE',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM advertisements WHERE title = 'Photography Club Open Day'
);

INSERT INTO advertisements (title, description, image_url, expiry_date, status, created_at)
SELECT
    'Past Semester Campaign',
    'Archived advertisement record used for admin cleanup and status-based filtering checks.',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    '2024-01-01',
    'EXPIRED',
    CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM advertisements WHERE title = 'Past Semester Campaign'
);


