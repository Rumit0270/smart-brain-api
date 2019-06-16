
INSERT INTO users (name, email, entries, joined)
VALUES ('john', 'jdoe@example.com', 5, '2019-01-01');

INSERT INTO login(hash, email) values ('YOUR_HASH', 'YOUR_EMAIL');

COMMIT;