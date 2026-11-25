INSERT INTO movie (name, release, synopsis, duration_minutes, age_rating, language) VALUES
('Interestelar', 2014, 'Exploradores viajam por um buraco de minhoca em busca de um novo lar para a humanidade.', 169, '10', 'Inglês'),
 
('Parasita', 2019, 'Uma família pobre se infiltra aos poucos na vida de uma família rica.', 132, '16', 'Coreano'),
 
('Pulp Fiction', 1994, 'Histórias de criminosos de Los Angeles se cruzam de forma inesperada.', 154, '18', 'Inglês'),
 
('Clube da Luta', 1999, 'Um homem entediado cria um clube secreto de lutas com um desconhecido carismático.', 139, '18', 'Inglês'),
 
('Mullholland Drive', 2001, 'Um filme de suspense e mistério que explora os limites da realidade e do sonho.', 147, '18', 'Inglês'),
 
('Fire Walk With Me', 1992, 'Um filme de suspense e mistério que explora os limites da realidade e do sonho.', 135, '18', 'Inglês'),
 
('Lost Highway', 1997, 'Um filme de suspense e mistério que explora os limites da realidade e do sonho.', 135, '18', 'Inglês'),
 
('No Other Choice', 2025, 'um homem de meia-idade chamado Man-su (Lee Byung-hun) é demitido após 25 anos na indústria do papel quando sua empresa é comprada por uma companhia americana. Desesperado para sustentar a família e manter o padrão de vida ao lado da esposa Mi-ri (Son Ye-jin) e dos filhos, ele passa por longos meses de desemprego e decide eliminar literalmente seus concorrentes para conquistar uma nova vaga.', 139, '16', 'Coreano'),
 
('Oldboy', 2003, 'Após passar 15 anos sequestrado, Oh Dae-su é libertado misteriosamente e inicia uma busca por vingança.', 120, '18', 'Coreano'),
 
('Foi Apenas um Acidente', 2025, 'Um mecânico acredita reconhecer em um cliente o homem que o torturou durante sua prisão e procura descobrir a verdade.', 102, '14', 'Persa'),
 
('You Can See Everything', 2026, 'Um documentário acompanha Elizabeth Holmes e sua vida antes de começar a cumprir sua sentença de prisão.', 174, '12', 'Inglês'),
 
('House', 1977, 'Uma estudante viaja com amigas para visitar sua tia em uma casa isolada, onde acontecimentos sobrenaturais começam a ocorrer.', 88, NULL, 'Japonês'),
 
('Martyrs', 2008, 'Anos após escapar de um trauma na infância, Lucie acredita ter encontrado os responsáveis por seu sofrimento e busca vingança.', 99, '18', 'Francês'),
 
('Oddity', 2024, 'Uma médium cega visita a casa onde sua irmã foi assassinada, determinada a descobrir o que realmente aconteceu.', 98, NULL, 'Inglês'),
 
('Backrooms', 2026, 'Uma passagem misteriosa surge no porão de uma loja de móveis, levando a uma rede aparentemente infinita de corredores.', 110, NULL, 'Inglês'),
 
('The Invite', 2026, 'Um casal em crise convida seus misteriosos vizinhos para um jantar que toma rumos inesperados.', 107, NULL, 'Inglês'),
 
('Matrix', 1999, 'Neo descobre que a realidade em que vive é uma simulação controlada por máquinas e se junta a um grupo de rebeldes.', 136, '12', 'Inglês');



--DIRETORES
INSERT INTO director (name) VALUES
('Christopher Nolan'),
('Bong Joon-ho'),
('Quentin Tarantino'),
('David Fincher'),
('David Lynch'),
('Park Chan-wook'),
('Jafar Panahi'),
('Nathan Fielder'),
('Lance Oppenheim'),
('Nobuhiko Obayashi'),
('Pascal Laugier'),
('Damian McCarthy'),
('Kane Parsons'),
('Olivia Wilde'),
('Lana Wachowski'),
('Lilly Wachowski');



--ATORES
INSERT INTO actor (name) VALUES
('Matthew McConaughey'), -- Interestelar
('Anne Hathaway'), -- Interestelar
('Jessica Chastain'), -- Interestelar

('Song Kang-ho'), -- Parasita
('Lee Sun-kyun'), -- Parasita
('Cho Yeo-jeong'), -- Parasita
('Choi Woo-shik'), -- Parasita

('John Travolta'), -- Pulp Fiction
('Samuel L. Jackson'), -- Pulp Fiction
('Uma Thurman'), -- Pulp Fiction
('Bruce Willis'), -- Pulp Fiction

('Edward Norton'), -- Clube da Luta
('Brad Pitt'), -- Clube da Luta
('Helena Bonham Carter'), -- Clube da Luta

('Naomi Watts'), -- Mulholland Drive
('Laura Harring'), -- Mulholland Drive

('Sheryl Lee'), -- Fire Walk With Me
('Ray Wise'), -- Fire Walk With Me

('Bill Pullman'), -- Lost Highway
('Balthazar Getty'), -- Lost Highway
('Patricia Arquette'), -- Lost Highway

('Lee Byung-hun'), -- No Other Choice
('Son Ye-jin'), -- No Other Choice
('Park Hee-soon'), -- No Other Choice

('Choi Min-sik'), -- Oldboy
('Yoo Ji-tae'), -- Oldboy
('Kang Hye-jung'), -- Oldboy

('Vahid Mobasseri'), -- Foi Apenas um Acidente
('Ebrahim Azizi'), -- Foi Apenas um Acidente
('Mariam Afshari'), -- Foi Apenas um Acidente

('Kimiko Ikegami'), -- House
('Miki Jinbo'), -- House
('Kumiko Oba'), -- House

('Morjana Alaoui'), -- Martyrs
('Mylène Jampanoï'), -- Martyrs
('Catherine Bégin'), -- Martyrs

('Carolyn Bracken'), -- Oddity
('Gwilym Lee'), -- Oddity
('Steve Wall'), -- Oddity

('Chiwetel Ejiofor'), -- Backrooms
('Renate Reinsve'), -- Backrooms
('Finn Bennett'), -- Backrooms

('Seth Rogen'), -- The Invite
('Olivia Wilde'), -- The Invite
('Penélope Cruz'), -- The Invite
 -- Edward Norton

('Keanu Reeves'), -- Matrix
('Laurence Fishburne'), -- Matrix
('Carrie-Anne Moss'), -- Matrix
('Hugo Weaving'); -- Matrix

--generos
INSERT INTO genre (name) VALUES
('Ficção Científica'),
('Drama'),
('Suspense'),
('Mistério'),
('Terror'),
('Ação'),
('Comédia'),
('Romance'),
('Thriller'),
('Fantasia');


--Diretores filmes
INSERT INTO movie_director (director_id, movie_id)
SELECT d.id, m.id
FROM (VALUES
  ('Christopher Nolan',  'Interestelar'),
  ('Bong Joon-ho',       'Parasita'),
  ('Quentin Tarantino',  'Pulp Fiction'),
  ('David Fincher',      'Clube da Luta'),
  ('David Lynch',        'Mulholland Drive'),
  ('David Lynch',        'Fire Walk With Me'),
  ('David Lynch',        'Lost Highway'),
  ('Park Chan-wook',     'No Other Choice'),
  ('Park Chan-wook',     'Oldboy'),
  ('Jafar Panahi',       'Foi Apenas um Acidente'),   
  ('Nathan Fielder',     'You Can See Everything'),   
  ('Lance Oppenheim',    'You Can See Everything'),   
  ('Nobuhiko Obayashi',  'House'),
  ('Pascal Laugier',     'Martyrs'),
  ('Damian McCarthy',    'Oddity'),
  ('Kane Parsons',       'Backrooms'),
  ('Olivia Wilde',       'The Invite'),              
  ('Lana Wachowski',     'Matrix'),
  ('Lilly Wachowski',    'Matrix')
) AS v(director, movie)
JOIN director d ON d.name = v.director
JOIN movie m ON m.name = v.movie;

--Atores filmes
INSERT INTO movie_actor (actor_id, movie_id)
SELECT a.id, m.id
FROM (VALUES
  ('Matthew McConaughey',  'Interestelar'),
  ('Anne Hathaway',        'Interestelar'),
  ('Jessica Chastain',     'Interestelar'),

  ('Song Kang-ho',         'Parasita'),
  ('Lee Sun-kyun',         'Parasita'),
  ('Cho Yeo-jeong',        'Parasita'),
  ('Choi Woo-shik',        'Parasita'),

  ('John Travolta',        'Pulp Fiction'),
  ('Samuel L. Jackson',    'Pulp Fiction'),
  ('Uma Thurman',          'Pulp Fiction'),
  ('Bruce Willis',         'Pulp Fiction'),

  ('Edward Norton',        'Clube da Luta'),
  ('Brad Pitt',            'Clube da Luta'),
  ('Helena Bonham Carter', 'Clube da Luta'),

  ('Naomi Watts',          'Mulholland Drive'),
  ('Laura Harring',        'Mulholland Drive'),

  ('Sheryl Lee',           'Fire Walk With Me'),
  ('Ray Wise',             'Fire Walk With Me'),

  ('Bill Pullman',         'Lost Highway'),
  ('Balthazar Getty',      'Lost Highway'),
  ('Patricia Arquette',    'Lost Highway'),

  ('Lee Byung-hun',        'No Other Choice'),
  ('Son Ye-jin',           'No Other Choice'),
  ('Park Hee-soon',        'No Other Choice'),

  ('Choi Min-sik',         'Oldboy'),
  ('Yoo Ji-tae',           'Oldboy'),
  ('Kang Hye-jung',        'Oldboy'),

  ('Vahid Mobasseri',      'Foi Apenas um Acidente'),
  ('Ebrahim Azizi',        'Foi Apenas um Acidente'),
  ('Mariam Afshari',       'Foi Apenas um Acidente'),

  ('Kimiko Ikegami',       'House'),
  ('Miki Jinbo',           'House'),
  ('Kumiko Oba',           'House'),

  ('Morjana Alaoui',       'Martyrs'),
  ('Mylène Jampanoï',      'Martyrs'),
  ('Catherine Bégin',      'Martyrs'),

  ('Carolyn Bracken',      'Oddity'),
  ('Gwilym Lee',           'Oddity'),
  ('Steve Wall',           'Oddity'),

  ('Chiwetel Ejiofor',     'Backrooms'),
  ('Renate Reinsve',       'Backrooms'),
  ('Finn Bennett',         'Backrooms'),

  ('Seth Rogen',           'The Invite'),
  ('Olivia Wilde',         'The Invite'),
  ('Penélope Cruz',        'The Invite'),
  ('Edward Norton',        'The Invite'),   

  ('Keanu Reeves',         'Matrix'),
  ('Laurence Fishburne',   'Matrix'),
  ('Carrie-Anne Moss',     'Matrix'),
  ('Hugo Weaving',         'Matrix')
) AS v(actor, movie)
JOIN actor a ON a.name = v.actor
JOIN movie m ON m.name = v.movie;

--genero filme
INSERT INTO movie_genre (genre_id, movie_id)
SELECT g.id, m.id
FROM (VALUES
  ('Ficção Científica', 'Interestelar'),
  ('Drama',             'Interestelar'),

  ('Drama',             'Parasita'),
  ('Thriller',          'Parasita'),
  ('Comédia',           'Parasita'),

  ('Thriller',          'Pulp Fiction'),
  ('Comédia',           'Pulp Fiction'),

  ('Drama',             'Clube da Luta'),
  ('Thriller',          'Clube da Luta'),

  ('Mistério',          'Mulholland Drive'),
  ('Suspense',          'Mulholland Drive'),

  ('Terror',            'Fire Walk With Me'),
  ('Mistério',          'Fire Walk With Me'),

  ('Mistério',          'Lost Highway'),
  ('Suspense',          'Lost Highway'),

  ('Drama',             'No Other Choice'),
  ('Comédia',           'No Other Choice'),
  ('Thriller',          'No Other Choice'),

  ('Thriller',          'Oldboy'),
  ('Mistério',          'Oldboy'),
  ('Ação',              'Oldboy'),

  ('Drama',             'Foi Apenas um Acidente'),
  ('Suspense',          'Foi Apenas um Acidente'),

  ('Terror',            'House'),
  ('Fantasia',          'House'),
  ('Comédia',           'House'),

  ('Terror',            'Martyrs'),
  ('Suspense',          'Martyrs'),

  ('Terror',            'Oddity'),
  ('Mistério',          'Oddity'),

  ('Terror',            'Backrooms'),
  ('Ficção Científica', 'Backrooms'),

  ('Comédia',           'The Invite'),
  ('Drama',             'The Invite'),

  ('Ficção Científica', 'Matrix'),
  ('Ação',              'Matrix')
) AS v(genre, movie)
JOIN genre g ON g.name = v.genre
JOIN movie m ON m.name = v.movie;