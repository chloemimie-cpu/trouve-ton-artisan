-- ============================================================
-- Projet : Trouve ton artisan
-- Script de création de la base de données (MySQL / MariaDB)
-- ============================================================

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS trouve_ton_artisan;

CREATE DATABASE trouve_ton_artisan
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

-- ------------------------------------------------------------
-- Table categorie : Alimentation, Bâtiment, Fabrication, Services
-- ------------------------------------------------------------
CREATE TABLE categorie (
  id_categorie  INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nom_categorie VARCHAR(50)  NOT NULL,
  PRIMARY KEY (id_categorie),
  UNIQUE KEY uq_categorie_nom (nom_categorie)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Table specialite : rattachée à UNE seule catégorie
-- ------------------------------------------------------------
CREATE TABLE specialite (
  id_specialite  INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nom_specialite VARCHAR(80)  NOT NULL,
  id_categorie   INT UNSIGNED NOT NULL,
  PRIMARY KEY (id_specialite),
  UNIQUE KEY uq_specialite_nom (nom_specialite),
  CONSTRAINT fk_specialite_categorie
    FOREIGN KEY (id_categorie) REFERENCES categorie (id_categorie)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- Table artisan : appartient à UNE seule spécialité
-- top = artisan du mois (TRUE) ou non (FALSE)
-- ------------------------------------------------------------
CREATE TABLE artisan (
  id_artisan    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  nom           VARCHAR(100)  NOT NULL,
  note          DECIMAL(2,1)  NOT NULL DEFAULT 0.0,
  ville         VARCHAR(80)   NOT NULL,
  a_propos      TEXT          NULL,
  email         VARCHAR(150)  NOT NULL,
  site_web      VARCHAR(255)  NULL,
  image         VARCHAR(255)  NULL,
  top           BOOLEAN       NOT NULL DEFAULT FALSE,
  id_specialite INT UNSIGNED  NOT NULL,
  PRIMARY KEY (id_artisan),
  CONSTRAINT ck_artisan_note CHECK (note >= 0 AND note <= 5),
  CONSTRAINT fk_artisan_specialite
    FOREIGN KEY (id_specialite) REFERENCES specialite (id_specialite)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  INDEX idx_artisan_nom (nom),
  INDEX idx_artisan_top (top)
) ENGINE=InnoDB;