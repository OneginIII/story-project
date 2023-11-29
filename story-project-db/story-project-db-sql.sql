CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid()  ,
  "username" text,
  "password" varchar,
  "created_at" timestamptz
);

CREATE TABLE "stories" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_by" uuid,
  "title" text,
  "icon" text,
  "url" varchar UNIQUE,
  "visible" boolean,
  "created_at" timestamptz,
  "modified_at" timestamptz
);

CREATE TABLE "chapters" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "story_id" uuid,
  "number" smallint,
  "title" text,
  "text" text,
  "created_at" timestamptz,
  "modified_at" timestamptz
);

ALTER TABLE "stories" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "chapters" ADD FOREIGN KEY ("story_id") REFERENCES "stories" ("id") ON DELETE CASCADE;

INSERT INTO users (username, password, created_at)
VALUES
  ('story-admin', 'story-master', NOW());
  
INSERT INTO stories (created_by, title, url, visible, created_at, modified_at)
VALUES
  ((SELECT id FROM users WHERE username='story-admin'),
  'A Night in the Woods', 'a-night-in-the-woods', true, NOW(), NOW());

INSERT INTO chapters (story_id, number, title, text, created_at, modified_at)
VALUES
  ((SELECT id FROM stories WHERE url='a-night-in-the-woods'),
  1 ,'Nightfall', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget justo eget leo ultricies facilisis. Cras semper vel erat tincidunt egestas. Phasellus dictum urna nec eros vulputate iaculis. Fusce felis dui, sodales gravida iaculis id, tristique luctus dolor. Nam ut sapien enim. Etiam ut ex quis libero vulputate ultrices sed sed magna. Mauris dolor nibh, suscipit eu gravida eu, rhoncus efficitur nulla. Pellentesque blandit elit lorem. Duis hendrerit eget magna at ultricies.',
  NOW(), NOW()),
  ((SELECT id FROM stories WHERE url='a-night-in-the-woods'),
  2 ,'Midnight', 'Etiam varius nibh ut metus tempor, sed hendrerit nibh ultrices. Phasellus et mi sed elit volutpat tristique. Maecenas vitae pulvinar ex, nec efficitur nulla. Pellentesque tellus sem, vulputate a quam eget, vestibulum sagittis dolor. Aliquam lacinia eros massa, eu ultricies metus tincidunt vel. Fusce et tortor ex. Suspendisse a dictum nisl. Vestibulum ipsum risus, scelerisque eu volutpat nec, auctor eu tortor. Proin posuere eu augue ac dapibus. Quisque non consectetur nulla.',
  NOW(), NOW()),
  ((SELECT id FROM stories WHERE url='a-night-in-the-woods'),
  3 ,'The Darkest Hour', 'Praesent massa velit, accumsan at dui at, auctor malesuada tellus. Morbi malesuada nulla et tellus egestas, sit amet cursus dui scelerisque. Proin et maximus erat, sed pellentesque augue. Integer ante ex, venenatis vitae nunc eu, tempor molestie turpis. Nullam blandit metus nisi, sit amet placerat risus finibus ut. Praesent vitae condimentum felis. Aliquam vel vehicula diam. Aliquam laoreet nisl et lacus sodales, eget accumsan ex pulvinar. Cras venenatis varius erat. Aenean quis pellentesque justo. Praesent non convallis est. Duis semper mollis cursus. Curabitur arcu justo, tempus sit amet orci sed, venenatis hendrerit lacus. Curabitur nec urna vel nunc sagittis interdum. Duis bibendum diam sit amet ante tincidunt condimentum.',
  NOW(), NOW()),
  ((SELECT id FROM stories WHERE url='a-night-in-the-woods'),
  4 ,'Dawn''s Light', 'Nam ultrices blandit efficitur. Aliquam erat volutpat. Sed consectetur vel magna ut aliquam. Ut imperdiet velit sit amet leo varius ultricies. Pellentesque sodales aliquam nunc vitae viverra. Aliquam vulputate quis neque non varius. Aliquam pulvinar mollis ultricies. Morbi tempor in quam vitae dignissim. Pellentesque id tortor et sapien ultricies lacinia nec et lectus. Nunc interdum risus a ligula lobortis fringilla. Morbi diam nisl, scelerisque ut odio id, tincidunt commodo augue. Suspendisse eu congue nunc, at sollicitudin massa. Suspendisse lacinia nisl molestie risus tempus rutrum. Maecenas volutpat non justo malesuada interdum. Nulla vitae libero a leo auctor bibendum.',
  NOW(), NOW());

INSERT INTO stories (created_by, title, icon, url, visible, created_at, modified_at)
VALUES
  ((SELECT id FROM users WHERE username='story-admin'),
  'Forever Lost', '', 'forever-lost', true, NOW(), NOW());

INSERT INTO chapters (story_id, number, title, text, created_at, modified_at)
VALUES
  ((SELECT id FROM stories WHERE url='forever-lost'),
  1 ,'A Perilous Journey', 'We landed upon unforseen shores at the break of dawn.',
  NOW(), NOW()),
  ((SELECT id FROM stories WHERE url='forever-lost'),
  2 ,'In the Jungle', 'We found a native village deep in the jungle by a riverbed. We stayed there for the night.',
  NOW(), NOW()),
  ((SELECT id FROM stories WHERE url='forever-lost'),
  3 ,'Adventure Bekons', 'The natives guided us on our journey to reach the volcano. We begun to climb the slopes first thing in the morning.',
  NOW(), NOW()),
  ((SELECT id FROM stories WHERE url='forever-lost'),
  4 ,'The Beast Awakens', 'We reached the crater when suddenly the volcano awoke from it''s centuries long sleep. It blasted us out of the core of the mountain with enormous force.',
  NOW(), NOW()),
    ((SELECT id FROM stories WHERE url='forever-lost'),
  5 ,'The Escape', 'Once we came to our senses, we ran toward the shore as quickly as possible. The mountain was spewing fire and brimstone.',
  NOW(), NOW()),
    ((SELECT id FROM stories WHERE url='forever-lost'),
  6 ,'Last Goodbye', 'We saw panicked natives on the shore performing some kind of ritual. They saw us and cried because of our sudden departure. We took to our rowboats.',
  NOW(), NOW()),
    ((SELECT id FROM stories WHERE url='forever-lost'),
  7 ,'Hope Fading', 'We reached our ship in the nick of time. The sails were raised, but the wind was not in our favor. The hull was struck by a falling lava stone.',
  NOW(), NOW()),
    ((SELECT id FROM stories WHERE url='forever-lost'),
  8 ,'Forever Lost', 'As the ship was sinking and the island burning, we saw our time was at an end. We grabbed pieces of the ship to hold on to. Soon the sun set on us as we were stranded on open seas. THE END',
  NOW(), NOW());

INSERT INTO stories (created_by, title, icon, url, visible, created_at, modified_at)
VALUES
  ((SELECT id FROM users WHERE username='story-admin'),
  'The Crimson Lady', '', 'the-crimson-lady', true, NOW(), NOW());

INSERT INTO chapters (story_id, number, title, text, created_at, modified_at)
VALUES
  ((SELECT id FROM stories WHERE url='the-crimson-lady'),
  1 ,'The Lady', 'I arrived at the ball in the evening, hoping to talk to some old friends from the navy. I saw a beautiful lady descending down the stairs of the main hall.',
  NOW(), NOW()),
    ((SELECT id FROM stories WHERE url='the-crimson-lady'),
  2 ,'Dressed in Crimson', 'She was dressed in Crimson. I didn''t like crimson. :(',
  NOW(), NOW());
  
INSERT INTO stories (created_by, title, icon, url, visible, created_at, modified_at)
VALUES
  ((SELECT id FROM users WHERE username='story-admin'),
  'Hidden Tales', '', 'hidden-tales', false, NOW(), NOW());

INSERT INTO chapters (story_id, number, title, text, created_at, modified_at)
VALUES
  ((SELECT id FROM stories WHERE url='hidden-tales'),
  1 ,'The Story So Far', 'This happened when we were talking to our teacher in the library. We were looking for a certain book.',
  NOW(), NOW()),
    ((SELECT id FROM stories WHERE url='hidden-tales'),
  2 ,'The Book', 'She told us that the book was in a hidden section of the library. This was because the book contained...',
  NOW(), NOW()),
    ((SELECT id FROM stories WHERE url='hidden-tales'),
  3 ,'Work In Progress', 'What happens next? Who knows.',
  NOW(), NOW());
