-- ============================================================
-- Projet : Trouve ton artisan
-- Script d'alimentation (jeu d'essai fourni dans le cahier des charges)
-- ============================================================

SET NAMES utf8mb4;
USE trouve_ton_artisan;

INSERT INTO categorie (nom_categorie) VALUES
  ('Alimentation'),   -- 1
  ('Bâtiment'),       -- 2
  ('Fabrication'),    -- 3
  ('Services');       -- 4

INSERT INTO specialite (nom_specialite, id_categorie) VALUES
  ('Boucher',       1),  -- 1
  ('Boulanger',     1),  -- 2
  ('Chocolatier',   1),  -- 3
  ('Traiteur',      1),  -- 4
  ('Chauffagiste',  2),  -- 5
  ('Electricien',   2),  -- 6
  ('Menuisier',     2),  -- 7
  ('Plombier',      2),  -- 8
  ('Bijoutier',     3),  -- 9
  ('Couturier',     3),  -- 10
  ('Ferronier',     3),  -- 11
  ('Coiffeur',      4),  -- 12
  ('Fleuriste',     4),  -- 13
  ('Toiletteur',    4),  -- 14
  ('Webdesign',     4);  -- 15

-- Texte d'attente utilisé pour la rubrique « A propos »
SET @lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.';

INSERT INTO artisan
  (nom, note, ville, a_propos, email, site_web, image, top, id_specialite) VALUES
  ('Boucherie Dumont',       4.5, 'Lyon',            @lorem, 'boucherie.dumond@gmail.com',            NULL,                                   NULL, FALSE, 1),
  ('Au pain chaud',          4.8, 'Montélimar',      @lorem, 'aupainchaud@hotmail.com',               NULL,                                   NULL, TRUE,  2),
  ('Chocolaterie Labbé',     4.9, 'Lyon',            @lorem, 'chocolaterie-labbe@gmail.com',          'https://chocolaterie-labbe.fr',        NULL, TRUE,  3),
  ('Traiteur Truchon',       4.1, 'Lyon',            @lorem, 'contact@truchon-traiteur.fr',           'https://truchon-traiteur.fr',          NULL, FALSE, 4),
  ('Orville Salmons',        5.0, 'Evian',           @lorem, 'o-salmons@live.com',                    NULL,                                   NULL, TRUE,  5),
  ('Mont Blanc Eléctricité', 4.5, 'Chamonix',        @lorem, 'contact@mont-blanc-electricite.com',    'https://mont-blanc-electricite.com',   NULL, FALSE, 6),
  ('Boutot & fils',          4.7, 'Bourg-en-bresse', @lorem, 'boutot-menuiserie@gmail.com',           'https://boutot-menuiserie.com',        NULL, FALSE, 7),
  ('Vallis Bellemare',       4.0, 'Vienne',          @lorem, 'v.bellemare@gmail.com',                 'https://plomberie-bellemare.com',      NULL, FALSE, 8),
  ('Claude Quinn',           4.2, 'Aix-les-bains',   @lorem, 'claude.quinn@gmail.com',                NULL,                                   NULL, FALSE, 9),
  ('Amitee Lécuyer',         4.5, 'Annecy',          @lorem, 'a.amitee@hotmail.com',                  'https://lecuyer-couture.com',          NULL, FALSE, 10),
  ('Ernest Carignan',        5.0, 'Le Puy-en-Velay', @lorem, 'e-carigan@hotmail.com',                 NULL,                                   NULL, FALSE, 11),
  ('Royden Charbonneau',     3.8, 'Saint-Priest',    @lorem, 'r.charbonneau@gmail.com',               NULL,                                   NULL, FALSE, 12),
  ('Leala Dennis',           3.8, 'Chambéry',        @lorem, 'l.dennos@hotmail.fr',                   'https://coiffure-leala-chambery.fr',   NULL, FALSE, 12),
  ('C''est sup''hair',       4.1, 'Romans-sur-Isère',@lorem, 'sup-hair@gmail.com',                    'https://sup-hair.fr',                  NULL, FALSE, 12),
  ('Le monde des fleurs',    4.6, 'Annonay',         @lorem, 'contact@le-monde-des-fleurs-annonay.fr','https://le-monde-des-fleurs-annonay.fr', NULL, FALSE, 13),
  ('Valérie Laderoute',      4.5, 'Valence',         @lorem, 'v-laredoute@gmail.com',                 NULL,                                   NULL, FALSE, 14),
  ('CM Graphisme',           4.4, 'Valence',         @lorem, 'contact@cm-graphisme.com',              'https://cm-graphisme.com',             NULL, FALSE, 15);

-- Contrôle : artisans du mois (colonne top)
-- SELECT nom, note FROM artisan WHERE top = TRUE;