INSERT INTO users 
(full_name, display_name, username, email, password, avatar, bio, created_at, is_active) 
VALUES ('Eavan Kim', 'EavanK', 'eavan555', 'eavan.hsk@gmail.com', '$2b$10$R1UslIDbKmIvZ7WI66GBcukgSPo2mU3b1Y2QWFcoJDb1w8dVIamXq', 'https://proofmart.com/wp-content/uploads/2021/06/1-1.png', 'This is Eavan', '2021-12-28T23:21:50.702Z', true),
('Jonathan Su', 'smart lad', 'hjonsu555', 'hjonsu555@gmail.com', '$2b$10$R1UslIDbKmIvZ7WI66GBcukgSPo2mU3b1Y2QWFcoJDb1w8dVIamXq', 'https://proofmart.com/wp-content/uploads/2021/06/7web.png', 'This is Jonathan', '2021-12-28T23:22:08.022Z', true),
('Adam Hirzalla', 'Learth', 'adam555', 'adam555@gmail.com', '$2b$10$R1UslIDbKmIvZ7WI66GBcukgSPo2mU3b1Y2QWFcoJDb1w8dVIamXq', 'https://proofmart.com/wp-content/uploads/2021/06/3-web-1.png', 'This is Adam', '2021-12-28T23:22:15.072Z', false);

INSERT INTO users 
(full_name, display_name, username, email, password, bio, created_at, is_active)
VALUES 
('Amy Hilton', 'Amy', 'amy555', 'amy555@gmail.com', '$2b$10$R1UslIDbKmIvZ7WI66GBcukgSPo2mU3b1Y2QWFcoJDb1w8dVIamXq',  'This is Amy', '2021-12-28T23:22:15.072Z', false);

INSERT INTO icons (name, path)
VALUES
('Steam', 'https://www.cleanpng.com/png-steam-mervils-a-vr-adventure-computer-icons-person-4290699/preview.html' ),
('Epic games', 'https://upload.wikimedia.org/wikipedia/commons/3/31/Epic_Games_logo.svg'),
('Blizzard', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Steam_2016_logo_black.svg/1920px-Steam_2016_logo_black.svg.png');

WITH tags(tag) AS (
  VALUES ('games'), ('online'), ('mmo'), ('FPS')
)
INSERT INTO tags (name)
SELECT tag FROM tags;

INSERT INTO servers
(creator_id, title, image, invite_code)
VALUES
(3, 'Apex Regends', 'https://www.citypng.com/public/uploads/preview/-51611829928qpmij8bqdr.png','Random_string');

INSERT INTO servers
(creator_id, title, invite_code)
VALUES
(2, 'League of Legends', 'Random_string'),
(1, 'Valorant', 'Random_string');

INSERT INTO channels (creator_id, server_id, title)
VALUES 
(3, 1, 'Welcome'), (3, 1, 'Rules'), (2, 1, 'Announcements'),
(1, 2, 'Welcome'), (1, 2, 'Rules'), (1, 2, 'Announcements'),
(2, 3, 'Welcome'), (2, 3, 'Rules'), (1, 3, 'Announcements');

INSERT INTO members (server_id, user_id, role)
VALUES
(1, 3, 'owner'),
(1, 2, 'admin'),
(1, 1, 'user'),
(2, 1, 'owner'),
(2, 3, 'user'),
(3, 2, 'owner'),
(3, 1, 'admin');

INSERT INTO dms (creator_id, updated_at)
VALUES 
(1, '2021-12-28T22:22:08.022Z'),
(2, '2021-12-28T22:28:08.022Z');

INSERT INTO participants (dm_id, user_id)
VALUES(1, 1), (1, 3), (1, 2), (2, 2), (2, 3);

INSERT INTO messages (sender_id, channel_id, body, sent_at)
VALUES
(1, 1, 'Hi guys', '2021-12-28T00:29:11.241Z'),
(2, 1, 'Whats up', '2021-12-28T23:29:38.909Z'),
(1, 1, 'Pretty good', '2021-12-29T00:29:57.358Z');

INSERT INTO messages (sender_id, dm_id, body, sent_at)
VALUES
(1, 1, 'Hi Adam', '2021-12-28T23:22:08.022Z'),
(3, 1, 'Hey Hyunsu', '2021-12-28T23:22:15.072Z'),
(2, 2, 'Hey Adam', '2021-12-28T23:20:15.072Z'),
(3, 2, 'Hey Jonathan', '2021-12-28T23:21:15.072Z');

INSERT INTO views (message_id, user_id, viewed_at)
VALUES
(1, 1, '2021-12-28T00:29:11.241Z'),
(1, 2, '2021-12-28T00:30:11.241Z'),
(1, 3, '2021-12-28T00:31:11.241Z'),
(2, 2, '2021-12-28T23:29:38.909Z'),
(2, 1, '2021-12-28T23:30:38.909Z'),
(3, 1, '2021-12-29T00:29:57.358Z'),
(4, 1, '2021-12-28T23:22:08.022Z'),
(4, 3, '2021-12-28T23:22:09.022Z'),
(4, 2, '2021-12-28T23:22:10.022Z'),
(5, 3, '2021-12-28T23:22:15.072Z'),
(5, 2, '2021-12-28T23:22:18.072Z'),
(6, 2, '2021-12-28T23:20:15.072Z'),
(6, 3, '2021-12-28T23:20:30.072Z'),
(7, 3, '2021-12-28T23:21:15.072Z');

INSERT INTO friends (user1_id, user2_id)
VALUES (1, 3), (2, 3), (4, 1);

INSERT INTO requests (sender_id, receiver_id)
VALUES (1, 2), (3, 4), (2, 4);

INSERT INTO connections (user_id, icon_id, url)
VALUES
(1, 1, 'https://google.ca'),
(2, 1, 'https://google.ca'),
(2, 3, 'https://google.ca'),
(3, 1, 'https://google.ca'),
(3, 3, 'https://google.ca');

INSERT INTO server_tags
(server_id, tag_id)
VALUES
(1, 1), (1, 2), (2, 3), (2, 1), (3, 4), (3, 1), (3, 2);