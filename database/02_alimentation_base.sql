-- ============================================================
-- Projet : Trouve ton artisan
-- Script d'alimentation (version hébergement, indépendante des identifiants)
-- ============================================================

USE trouve_ton_artisan;
SET NAMES utf8mb4;

DELETE FROM artisan;
DELETE FROM specialite;
DELETE FROM categorie;

INSERT INTO categorie (nom_categorie) VALUES
  ('Alimentation'),
  ('Bâtiment'),
  ('Fabrication'),
  ('Services');

-- Spécialités rattachées à leur catégorie par le nom de la catégorie
INSERT INTO specialite (nom_specialite, id_categorie)
  SELECT 'Boucher', id_categorie FROM categorie WHERE nom_categorie = 'Alimentation';
INSERT INTO specialite (nom_specialite, id_categorie)
  SELECT 'Boulanger', id_categorie FROM categorie WHERE nom_categorie = 'Alimentation';
INSERT INTO specialite (nom_specialite, id_categorie)
  SELECT 'Chocolatier', id_categorie FROM categorie WHERE nom_categorie = 'Alimentation';
INSERT INTO specialite (nom_specialite, id_categorie)
  SELECT 'Traiteur', id_categorie FROM categorie WHERE nom_categorie = 'Alimentation';
INSERT INTO specialite (nom_specialite, id_categorie)
  SELECT 'Chauffagiste', id_categorie FROM categorie WHERE nom_categorie = 'Bâtiment';
INSERT INTO specialite (nom_specialite, id_categorie)
  SELECT 'Electricien', id_categorie FROM categorie WHERE nom_categorie = 'Bâtiment';
INSERT INTO specialite (nom_specialite, id_categorie)
  SELECT 'Menuisier', id_categorie FROM categorie WHERE nom_categorie = 'Bâtiment';
INSERT INTO specialite (nom_specialite, id_categorie)
  SELECT 'Plombier', id_categorie FROM categorie WHERE nom_categorie = 'Bâtiment';
INSERT INTO specialite (nom_specialite, id_categorie)
  SELECT 'Bijoutier', id_categorie FROM categorie WHERE nom_categorie = 'Fabrication';
INSERT INTO specialite (nom_specialite, id_categorie)
  SELECT 'Couturier', id_categorie FROM categorie WHERE nom_categorie = 'Fabrication';
INSERT INTO specialite (nom_specialite, id_categorie)
  SELECT 'Ferronier', id_categorie FROM categorie WHERE nom_categorie = 'Fabrication';
INSERT INTO specialite (nom_specialite, id_categorie)
  SELECT 'Coiffeur', id_categorie FROM categorie WHERE nom_categorie = 'Services';
INSERT INTO specialite (nom_specialite, id_categorie)
  SELECT 'Fleuriste', id_categorie FROM categorie WHERE nom_categorie = 'Services';
INSERT INTO specialite (nom_specialite, id_categorie)
  SELECT 'Toiletteur', id_categorie FROM categorie WHERE nom_categorie = 'Services';
INSERT INTO specialite (nom_specialite, id_categorie)
  SELECT 'Webdesign', id_categorie FROM categorie WHERE nom_categorie = 'Services';

-- Artisans rattachés à leur spécialité par le nom de la spécialité
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'Boucherie Dumont', 4.5, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'boucherie.dumond@gmail.com', NULL, NULL, FALSE, id_specialite FROM specialite WHERE nom_specialite = 'Boucher';
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'Au pain chaud', 4.8, 'Montélimar', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'aupainchaud@hotmail.com', NULL, NULL, TRUE, id_specialite FROM specialite WHERE nom_specialite = 'Boulanger';
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'Chocolaterie Labbé', 4.9, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', NULL, TRUE, id_specialite FROM specialite WHERE nom_specialite = 'Chocolatier';
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'Traiteur Truchon', 4.1, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', NULL, FALSE, id_specialite FROM specialite WHERE nom_specialite = 'Traiteur';
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'Orville Salmons', 5.0, 'Evian', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'o-salmons@live.com', NULL, NULL, TRUE, id_specialite FROM specialite WHERE nom_specialite = 'Chauffagiste';
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'Mont Blanc Eléctricité', 4.5, 'Chamonix', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', NULL, FALSE, id_specialite FROM specialite WHERE nom_specialite = 'Electricien';
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'Boutot & fils', 4.7, 'Bourg-en-bresse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', NULL, FALSE, id_specialite FROM specialite WHERE nom_specialite = 'Menuisier';
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'Vallis Bellemare', 4.0, 'Vienne', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', NULL, FALSE, id_specialite FROM specialite WHERE nom_specialite = 'Plombier';
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'Claude Quinn', 4.2, 'Aix-les-bains', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'claude.quinn@gmail.com', NULL, NULL, FALSE, id_specialite FROM specialite WHERE nom_specialite = 'Bijoutier';
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'Amitee Lécuyer', 4.5, 'Annecy', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'a.amitee@hotmail.com', 'https://lecuyer-couture.com', NULL, FALSE, id_specialite FROM specialite WHERE nom_specialite = 'Couturier';
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'Ernest Carignan', 5.0, 'Le Puy-en-Velay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'e-carigan@hotmail.com', NULL, NULL, FALSE, id_specialite FROM specialite WHERE nom_specialite = 'Ferronier';
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'Royden Charbonneau', 3.8, 'Saint-Priest', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'r.charbonneau@gmail.com', NULL, NULL, FALSE, id_specialite FROM specialite WHERE nom_specialite = 'Coiffeur';
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'Leala Dennis', 3.8, 'Chambéry', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', NULL, FALSE, id_specialite FROM specialite WHERE nom_specialite = 'Coiffeur';
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'C''est sup''hair', 4.1, 'Romans-sur-Isère', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'sup-hair@gmail.com', 'https://sup-hair.fr', NULL, FALSE, id_specialite FROM specialite WHERE nom_specialite = 'Coiffeur';
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'Le monde des fleurs', 4.6, 'Annonay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', NULL, FALSE, id_specialite FROM specialite WHERE nom_specialite = 'Fleuriste';
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'Valérie Laderoute', 4.5, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'v-laredoute@gmail.com', NULL, NULL, FALSE, id_specialite FROM specialite WHERE nom_specialite = 'Toiletteur';
INSERT INTO artisan (nom, note, ville, a_propos, email, site_web, image, top, id_specialite)
  SELECT 'CM Graphisme', 4.4, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin.', 'contact@cm-graphisme.com', 'https://cm-graphisme.com', NULL, FALSE, id_specialite FROM specialite WHERE nom_specialite = 'Webdesign';

-- Contrôles
-- SELECT COUNT(*) FROM artisan;            -- attendu : 17
-- SELECT nom FROM artisan WHERE top = TRUE; -- attendu : 3 artisans