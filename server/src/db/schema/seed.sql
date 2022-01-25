INSERT INTO users 
(full_name, nickname, username, email, password, avatar, bio, created_at, is_active) 
VALUES ('Eavan Kim', 'EavanK', 'eavan555', 'eavan.hsk@gmail.com', '$2b$10$R1UslIDbKmIvZ7WI66GBcukgSPo2mU3b1Y2QWFcoJDb1w8dVIamXq', 'https://proofmart.com/wp-content/uploads/2021/06/1-1.png', 'This is Eavan', '2021-12-28T23:21:50.702Z', false),
('Jonathan Su', 'smart lad', 'hjonsu555', 'hjonsu555@gmail.com', '$2b$10$R1UslIDbKmIvZ7WI66GBcukgSPo2mU3b1Y2QWFcoJDb1w8dVIamXq', 'https://proofmart.com/wp-content/uploads/2021/06/7web.png', 'This is Jonathan', '2021-12-28T23:22:08.022Z', false),
('Adam Hirzalla', 'Learth', 'adam555', 'adam555@gmail.com', '$2b$10$R1UslIDbKmIvZ7WI66GBcukgSPo2mU3b1Y2QWFcoJDb1w8dVIamXq', 'https://proofmart.com/wp-content/uploads/2021/06/3-web-1.png', 'This is Adam', '2021-12-28T23:22:15.072Z', false);

INSERT INTO users 
(full_name, nickname, username, email, password, bio, created_at, is_active)
VALUES 
('Amy Hilton', 'Amy', 'amy555', 'amy555@gmail.com', '$2b$10$R1UslIDbKmIvZ7WI66GBcukgSPo2mU3b1Y2QWFcoJDb1w8dVIamXq',  'This is Amy', '2021-12-28T23:22:15.072Z', false);

WITH icons(icon) AS (
  VALUES ('STEAM'), ('EPIC_GAMES'), ('BLIZZARD'), ('DISCORD'), ('RIOT_GAMES'), ('ORIGIN')
)
INSERT INTO icons (name)
SELECT icon FROM icons;

WITH tags(tag) AS (
  VALUES ('FPS'), ('MOBA'), ('MMORPG'), ('RTT'), ('RPG'), ('Indie'), ('RTS')
)
INSERT INTO tags (name)
SELECT tag FROM tags;

INSERT INTO servers
(creator_id, title, logo, invite_code)
VALUES
(3, 'Apex Legends', 'https://www.citypng.com/public/uploads/preview/-51611829928qpmij8bqdr.png','rAnDom_sTR@iNg1'),
(2, 'Valorant', 'https://image.pngaaa.com/480/5028480-middle.png','rAnDom_sTR@iNg2'),
(1, 'League of Legends', 'https://preview.redd.it/w8cver361nf21.png?auto=webp&s=1b70865c34646124728166d0daa7a113a565fd86','rAnDom_sTR@iNg3');

INSERT INTO channels (creator_id, server_id, title)
VALUES 
(3, 1, 'Welcome'), (3, 1, 'To'), (2, 1, 'Server 1'),
(1, 2, 'Welcome'), (1, 2, 'To'), (1, 2, 'Server 2'),
(2, 3, 'Welcome'), (2, 3, 'To'), (1, 3, 'Server 3');

INSERT INTO members (server_id, user_id, role)
VALUES
(1, 3, 'owner'),
(1, 2, 'admin'),
(1, 1, 'user'),
(1, 4, 'user'),
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
(1, 1, 'Hi guys this is channel 1', '2021-12-28T00:29:11.241Z'),
(2, 1, 'Whats up, this is channel 1', '2021-12-28T23:29:38.909Z'),
(3, 2, 'Whats up 2! THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE THIS IS A LONG MESSAGE ', '2021-12-28T23:29:38.909Z'),
(2, 3, 'Whats up 3!', '2021-12-28T23:29:38.909Z'),
(2, 2, 'Whats up 2!!!', '2021-12-28T23:29:38.909Z'),
(2, 4, 'Whats up 4!', '2021-12-28T23:29:38.909Z'),
(1, 4, 'Whats up 4!!!', '2021-12-28T23:29:38.909Z'),
(3, 4, 'Whats up 4!', '2021-12-28T23:29:38.909Z'),
(1, 5, 'Whats up 5!!!', '2021-12-28T23:29:38.909Z'),
(2, 5, 'Whats up 5!', '2021-12-28T23:29:38.909Z'),
(3, 7, 'Whats up 7!!!', '2021-12-28T23:29:38.909Z'),
(1, 7, 'Whats up 7!', '2021-12-28T23:29:38.909Z'),
(2, 8, 'Whats up 8!!!', '2021-12-28T23:29:38.909Z'),
(3, 9, 'Pretty good 9!!!', '2021-12-29T00:29:57.358Z');

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
VALUES (2, 3), (1, 2);

INSERT INTO requests (sender_id, receiver_id, pending)
VALUES (1, 2, false), (3, 4, false), (2, 4, true), (3, 1, true), (4, 1, true);

INSERT INTO socials (user_id, icon_id, url)
VALUES
(1, 1, 'https://steam.ca'),
(2, 3, 'https://blizzard.ca'),
(2, 5, 'https://riotgames.com'),
(3, 2, 'https://epicgames.com'),
(1, 2, 'https://epicgames.com'),
(1, 3, 'https://blizzard.com'),
(2, 2, 'https://epicgames.com'),
(3, 6, 'https://origin.com');

INSERT INTO server_tags
(server_id, tag_id)
VALUES
(1, 1), (1, 5), (2, 4), (2, 2), (3, 3), (3, 6), (3, 2);