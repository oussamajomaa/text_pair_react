CREATE TABLE `alignement` (
  `source_end_byte` BIGINT,
  `source_end_position` VARCHAR(255),
  `source_filename` VARCHAR(255),
  `source_head` VARCHAR(255),
  `source_id` VARCHAR(255),
  `source_idno` VARCHAR(255),
  `source_keywords` VARCHAR(255),
  `source_language` VARCHAR(255),
  `source_n` VARCHAR(255),
  `source_next` VARCHAR(255),
  `source_ngrams` VARCHAR(255),
  `source_notes` VARCHAR(255),
  `source_page` VARCHAR(255),
  `source_parent` VARCHAR(255),
  `source_parsed_filename` VARCHAR(255),
  `source_passage` TEXT,
  `source_philo_div1_id` VARCHAR(255),
  `source_philo_div2_id` VARCHAR(255),
  `source_philo_div3_id` VARCHAR(255),
  `source_philo_doc_id` VARCHAR(255),
  `source_philo_id` VARCHAR(255),
  `source_philo_name` VARCHAR(255),
  `source_philo_seq` VARCHAR(255),
  `source_philo_type` VARCHAR(255),
  `source_prev` VARCHAR(255),
  `source_pub_date` VARCHAR(255),
  `source_resp` VARCHAR(255),
  `source_speaker` VARCHAR(255),
  `source_start_byte` BIGINT,
  `source_start_position` VARCHAR(255),
  `source_structure` VARCHAR(255),
  `source_text_form` VARCHAR(255),
  `source_text_genre` VARCHAR(255),
  `source_title` VARCHAR(255),
  `source_type` VARCHAR(255),
  `source_who` VARCHAR(255),
  `source_word_count` VARCHAR(255),
  `source_year` VARCHAR(255),
  `target_auth_gender` VARCHAR(255),
  `target_author` VARCHAR(255),
  `target_collection` VARCHAR(255),
  `target_context_after` TEXT,
  `target_context_before` TEXT,
  `target_doc_id` VARCHAR(255),
  `target_editor` VARCHAR(255),
  `target_end_byte` BIGINT,
  `target_end_position` VARCHAR(255),
  `target_filename` VARCHAR(255),
  `target_head` VARCHAR(255),
  `target_id` VARCHAR(255),
  `target_idno` VARCHAR(255),
  `target_keywords` VARCHAR(255),
  `target_language` VARCHAR(255),
  `target_n` VARCHAR(255),
  `target_next` VARCHAR(255),
  `target_ngrams` VARCHAR(255),
  `target_notes` VARCHAR(255),
  `target_page` TEXT,
  `target_parent` VARCHAR(255),
  `target_parsed_filename` VARCHAR(255),
  `target_passage` VARCHAR(255),
  `target_philo_div1_id` VARCHAR(255),
  `target_philo_div2_id` VARCHAR(255),
  `target_philo_div3_id` VARCHAR(255),
  `target_philo_doc_id` VARCHAR(255),
  `target_philo_id` VARCHAR(255),
  `target_philo_name` VARCHAR(255),
  `target_philo_seq` VARCHAR(255),
  `target_philo_type` VARCHAR(255),
  `target_prev` VARCHAR(255),
  `target_pub_date` VARCHAR(255),
  `target_resp` VARCHAR(255),
  `target_speaker` VARCHAR(255),
  `target_start_byte` BIGINT,
  `target_start_position` VARCHAR(255),
  `target_structure` VARCHAR(255),
  `target_text_form` VARCHAR(255),
  `target_text_genre` VARCHAR(255),
  `target_title` VARCHAR(255),
  `target_type` VARCHAR(255),
  `target_who` VARCHAR(255),
  `target_word_count` VARCHAR(255),
  `target_year` VARCHAR(255),
  `banality` BOOLEAN,
  `group_id` BIGINT,
  `count` BIGINT
);

INSERT INTO `alignement` (`source_auth_gender`,`source_author`,`source_collection`,`source_context_after`,`source_context_before`,`source_doc_id`,`source_editor`,`source_end_byte`,`source_end_position`,`source_filename`,`source_head`,`source_id`,`source_idno`,`source_keywords`,`source_language`,`source_n`,`source_next`,`source_ngrams`,`source_notes`,`source_page`,`source_parent`,`source_parsed_filename`,`source_passage`,`source_philo_div1_id`,`source_philo_div2_id`,`source_philo_div3_id`,`source_philo_doc_id`,`source_philo_id`,`source_philo_name`,`source_philo_seq`,`source_philo_type`,`source_prev`,`source_pub_date`,`source_resp`,`source_speaker`,`source_start_byte`,`source_start_position`,`source_structure`,`source_text_form`,`source_text_genre`,`source_title`,`source_type`,`source_who`,`source_word_count`,`source_year`,`target_auth_gender`,`target_author`,`target_collection`,`target_context_after`,`target_context_before`,`target_doc_id`,`target_editor`,`target_end_byte`,`target_end_position`,`target_filename`,`target_head`,`target_id`,`target_idno`,`target_keywords`,`target_language`,`target_n`,`target_next`,`target_ngrams`,`target_notes`,`target_page`,`target_parent`,`target_parsed_filename`,`target_passage`,`target_philo_div1_id`,`target_philo_div2_id`,`target_philo_div3_id`,`target_philo_doc_id`,`target_philo_id`,`target_philo_name`,`target_philo_seq`,`target_philo_type`,`target_prev`,`target_pub_date`,`target_resp`,`target_speaker`,`target_start_byte`,`target_start_position`,`target_structure`,`target_text_form`,`target_text_genre`,`target_title`,`target_type`,`target_who`,`target_word_count`,`target_year`,`banality`,`group_id`,`count`)
VALUES
('','author_03346','','','me manus tua conversus sum in aerumna mea; dum configitur mihi; spina diapsalma 5 delictum meum cognitum tibi; feci et iniustitiam meam non abscondi dixi confitebor adversus me iniustitiam meam Domino et tu remisisti impietatem peccati mei diapsalma 6 pro hac orabit ad te omnis sanctus in tempore oportuno verumtamen in diluvio aquarum multarum ad eum non adproximabunt 7 tu es refugium meum a tribulatione quae circumdedit me exultatio mea erue me a circumdantibus me diapsalma 8 intellectum tibi dabo et instruam te in via hac qua gradieris firmabo super te oculos meos 9 ','1','ModERN',2321381,'43.72','/var/www/html/philologic/modern_all/data/TEXT/modern_Bible_Vulgate.tei','','','','','','','','1.json','','','0 0 0 0 0 0 0','/var/www/html/philologic/modern_all/data/words_and_philo_ids/1.lz4','nolite fieri sicut equus et mulus quibus non est intellectus','','','','1','1 0 0 0 0 0 0','text','0','doc','','1500','','',2321321,'43.71','','','','Latin Vulgate Bible','','','607172','1500','','author_03306','','. Le prophète a déclaré Qu''on boive muscadet, claré, Ypocras et vin de pineau, Et dit qu''on n''y mette point d''eau. Qui jure, se tu y [en] mets, Vraiment, tu n''entreras jamais En paradis ; crois cet article, Car il est écrit en la Bible, Undecimo libri Regum. LE CUISINIER. Il n''y a d''ici en',' S''il ne porte encor les cliquettes, Je suis content d''être tondu. LE PRÊCHEUR. Vas, tu puisses être pendu ! Le très puissant roi divin Dit qu''on boive du meilleur vin, Et nous défend de boire l''eau, Car autant en fait un chevau Chevau : cheval. Quant on le mène à la rivière. Et le prophète nous declare ','5','ModERN',15917,'47.08','/var/www/html/philologic/modern_all/data/TEXT/modern_theatre18_clean_ANONYME_SERMONJOYEUX_clean.tei','','','ANONYME_RESURRECTIONJENINLANDORE','','','','','5.json','','','0 0 0 0 0 0 0','/var/www/html/philologic/modern_all/data/words_and_philo_ids/5.lz4','Nolite fieri sicut equus et mulus Quibus non est intellectus','','','','5','5 0 0 0 0 0 0','text','40345','doc','','1501','','',15820,'46.79','Un acte','','Farce','SERMON JOYEUX DE BIEN BOIRE, FARCE','','','2343','1501',FALSE,215,1);



Conversation ouverte. 2 messages. Tous les messages ont été lus. 

Aller au contenu
Utiliser Gmail avec un lecteur d'écran
9 sur 1 425
Fwd: structure de BDD ModERN
Boîte de réception

Motasem Alrahabi
Pièces jointes
15 mai 2024 16:24 (il y a 1 jour)
À moi



---
Motasem



---------- Forwarded message ---------
From: Glenn Roe <glennroe@gmail.com>
Date: Wed, 15 May 2024 at 15:24
Subject: structure de BDD ModERN
To: Motasem Alrahabi <motasem.alrahabi@gmail.com>




--
Glenn Roe
Professor of French Literature & Digital Humanities, 
Faculty of Letters, Sorbonne University.
Astra Foundation Research Fellow in Digital Humanities, 
Voltaire Foundation, University of Oxford.
Senior Research Fellow, 
ARTFL Project, University of Chicago.
 1 pièce jointe
  • Analyse effectuée par Gmail

Oussama Jomaa <osmjom@gmail.com>
11:19 (il y a 10 heures)
À Motasem

Salut Motasem,
La structure de la base de données que tu m'as envoyé ne sert pas à grand- chose selon le brouillon du cahier des charges.
Il suffit une seule table sql ou sous format json contenant les métadonnées suivants:
source_author, source_title, source_date, source_before, source_passage, source_after, target_author, target_title, target_date, target_before, target_passage et target_after.
Alors que la structure que tu as envoyé comprend  24 tables liées entre elles.
En suite, je vais créer une gestion d'authentification avec des rôles (administrator, annotateur et validateur) c'est à dire une table d'utilisateurs et une autre table qui contiendra les évaluations de chaque annotateur pour chaque alignement et ensuite ils seront validés par un validateur. Tout le travail s'effectura côté client (utilisateur) avec react et javascript afin de réaliser la comparaison entre les passages.
Cordialement


Le mer. 15 mai 2024 à 16:24, Motasem Alrahabi <motasem.alrahabi@gmail.com> a écrit :


---
Motasem



---------- Forwarded message ---------
From: Glenn Roe <glennroe@gmail.com>
Date: Wed, 15 May 2024 at 15:24
Subject: structure de BDD ModERN
To: Motasem Alrahabi <motasem.alrahabi@gmail.com>




--
Glenn Roe
Professor of French Literature & Digital Humanities, 
Faculty of Letters, Sorbonne University.
Astra Foundation Research Fellow in Digital Humanities, 
Voltaire Foundation, University of Oxford.
Senior Research Fellow, 
ARTFL Project, University of Chicago.


CREATE TABLE author (
    author_id SERIAL PRIMARY KEY,
    author_key TEXT UNIQUE NOT NULL,
    author_first_name TEXT NULL,
    author_last_name TEXT NULL,
    author_date_of_birth DATE NULL,
    author_date_of_death DATE NULL,
    author_place_of_birth TEXT NULL,
    author_place_of_death TEXT NULL,
    author_bnf_ark TEXT NULL,
    author_bnf_name TEXT NULL,
    author_country TEXT NULL,
    author_language TEXT NULL,
    author_gender TEXT NULL,
    author_notes TEXT NULL,
    author_field TEXT NULL,
    author_name_variants TEXT NULL
);

CREATE TABLE procope_academy (
    procope_academy_id SERIAL PRIMARY KEY,
    procope_academy_name TEXT
);

CREATE TABLE procope_social_network (
    procope_social_network_id SERIAL PRIMARY KEY,
    procope_social_network_description TEXT
);

CREATE TABLE procope_occupation (
    procope_occupation_id SERIAL PRIMARY KEY,
    procope_occupation_description TEXT NOT NULL
);

CREATE TABLE procope_knowledge_network (
    procope_knowledge_network_id SERIAL PRIMARY KEY,
    procope_knowledge_network_description TEXT NOT NULL
);

CREATE TABLE procope_professional_network (
    procope_professional_network_id SERIAL PRIMARY KEY,
    procope_professional_network_description TEXT
);

CREATE TABLE author_procope_academy (
    author_id INT NOT NULL,
    procope_academy_id INT NOT NULL,
    PRIMARY KEY (author_id, procope_academy_id),
    FOREIGN KEY (author_id) REFERENCES author(author_id),
    FOREIGN KEY (procope_academy_id) REFERENCES procope_academy(procope_academy_id)
);

CREATE TABLE author_procope_social_network (
    author_id INT NOT NULL,
    procope_social_network_id INT NOT NULL,
    PRIMARY KEY (author_id, procope_social_network_id),
    FOREIGN KEY (author_id) REFERENCES author(author_id),
    FOREIGN KEY (procope_social_network_id) REFERENCES procope_social_network(procope_social_network_id)
);

CREATE TABLE author_procope_occupation (
    author_id INT NOT NULL,
    procope_occupation_id INT NOT NULL,
    PRIMARY KEY (author_id, procope_occupation_id),
    FOREIGN KEY (author_id) REFERENCES author(author_id),
    FOREIGN KEY (procope_occupation_id) REFERENCES procope_occupation(procope_occupation_id)
);

CREATE TABLE author_procope_knowledge_network (
    author_id INT NOT NULL,
    procope_knowledge_network_id INT NOT NULL,
    PRIMARY KEY (author_id, procope_knowledge_network_id),
    FOREIGN KEY (author_id) REFERENCES author(author_id),
    FOREIGN KEY (procope_knowledge_network_id) REFERENCES procope_knowledge_network(procope_knowledge_network_id)
);

CREATE TABLE author_procope_professional_network (
    author_id INT NOT NULL,
    procope_professional_network_id INT NOT NULL,
    PRIMARY KEY (author_id, procope_professional_network_id),
    FOREIGN KEY (author_id) REFERENCES author(author_id),
    FOREIGN KEY (procope_professional_network_id) REFERENCES procope_professional_network(procope_professional_network_id)
);

CREATE TABLE text (
    text_id SERIAL PRIMARY KEY,
    text_title TEXT NOT NULL,
    text_title_key TEXT UNIQUE NOT NULL,
    text_publication_date DATE NULL,
    text_first_publication_date DATE NULL,
    text_source_repository TEXT NULL, #ECCO, BnF etc
    text_file_name TEXT NOT NULL,
    text_bnf_ark TEXT NULL,
    text_notes TEXT NULL,
    text_classification INT NOT NULL,
    text_publication_status TEXT NULL,
    text_corpus INT NOT NULL #Canon, Presse etc
);

CREATE TABLE publisher (
    publisher_id SERIAL PRIMARY KEY,
    publisher_name TEXT NULL,
    publisher_place TEXT NULL
);

CREATE TABLE translator (
    translator_id SERIAL PRIMARY KEY,
    translator_name TEXT NULL
    translator_place TEXT NULL
);

CREATE TABLE text_publisher (
    text_id INT NOT NULL,
    publisher_id INT NOT NULL,
    PRIMARY KEY (text_id, publisher_id),
    FOREIGN KEY (text_id) REFERENCES text(text_id),
    FOREIGN KEY (publisher_id) REFERENCES publisher(publisher_id)
);

CREATE TABLE text_translator (
    text_id INT NOT NULL,
    translator_id INT NOT NULL,
    PRIMARY KEY (text_id, translator_id),
    FOREIGN KEY (text_id) REFERENCES text(text_id),
    FOREIGN KEY (translator_id) REFERENCES translator(translator_id)
);

CREATE TABLE text_author (
    text_id INT NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY (text_id, author_id),
    FOREIGN KEY (text_id) REFERENCES text(text_id)
    FOREIGN KEY (author_id) REFERENCES author(author_id),
);

CREATE TABLE source_passage (
    source_passage_id SERIAL PRIMARY KEY,
    text_id INT NOT NULL,
    source_passage_lang TEXT NOT NULL,
    source_passage_content TEXT NOT NULL,
    source_passage_automatic_classification TEXT NULL,
    source_passage_content_analysis TEXT NOT NULL,
    source_passage_content_context_before TEXT NOT NULL,
    source_passage_content_context_before_analysis TEXT NOT NULL,
    source_passage_content_context_after TEXT NOT NULL,
    source_passage_content_context_after_analysis TEXT NOT NULL,
    source_start_byte INT NOT NULL,
    source_end_byte INT NOT NULL,
    source_length INT NOT NULL,
    source_word_count INT NOT NULL,
    source_file_name TEXT NOT NULL,
    FOREIGN KEY (text_id) REFERENCES text(text_id)
);

CREATE TABLE text_source_passage (
    source_id INT NOT NULL,
    text_id INT NOT NULL,
    PRIMARY KEY (source_id, text_id),
    FOREIGN KEY (source_id) REFERENCES source_passage(source_passage_id),
    FOREIGN KEY (text_id) REFERENCES text(text_id)
);

CREATE TABLE author_source_passage (
    source_id INT NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY (source_id, author_id),
    FOREIGN KEY (source_id) REFERENCES source_passage(source_passage_id),
    FOREIGN KEY (author_id) REFERENCES author(author_id)
);

CREATE TABLE target_passage (
    target_passage_id SERIAL PRIMARY KEY,
    text_id INT NOT NULL,
    target_passage_lang TEXT NOT NULL,
    target_passage_content TEXT NOT NULL,
    target_passage_automatic_classification TEXT NOT NULL,
    target_passage_content_analysis TEXT NOT NULL,
    target_passage_content_context_before TEXT NOT NULL,
    target_passage_content_context_before_analysis TEXT NOT NULL,
    target_passage_content_context_after TEXT NOT NULL,
    target_passage_content_context_after_analysis TEXT NOT NULL,
    target_start_byte INT NOT NULL,
    target_end_byte INT NOT NULL,
    target_length INT NOT NULL,
    target_word_count INT NOT NULL,
    target__file_name TEXT NOT NULL,
    FOREIGN KEY (text_id) REFERENCES text(text_id)
);

CREATE TABLE text_target_passage (
    target_id INT NOT NULL,
    text_id INT NOT NULL,
    PRIMARY KEY (target_id, text_id),
    FOREIGN KEY (target_id) REFERENCES target_passage(target_passage_id),
    FOREIGN KEY (text_id) REFERENCES text(text_id)
);

CREATE TABLE author_target_passage (
    target_passage_id INT NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY (target_passage_id, author_id),
    FOREIGN KEY (target_passage_id) REFERENCES target_passage(target_passage_id),
    FOREIGN KEY (author_id) REFERENCES author(author_id)
);

CREATE TABLE source_relation_target (
    target_passage_id INT NOT NULL,
    source_passage_id INT NOT NULL,
    mesure_de_similarité_distance_Levenshtein INT NOT NULL,
    mesure_de_similarité_vector INT NOT NULL,
    PRIMARY KEY (target_passage_id, source_passage_id),
    FOREIGN KEY (target_passage_id) REFERENCES target_passage(target_passage_id),
    FOREIGN KEY (source_passage_id) REFERENCES source_passage(source_passage_id)
);



database_script.sql
Affichage de database_script.sql en cours...