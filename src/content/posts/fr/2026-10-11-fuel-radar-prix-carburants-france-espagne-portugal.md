---
title: "Fuel Radar : le prix des carburants en France, en Espagne et au Portugal"
subtitle: "Une PWA gratuite et sans pub qui affiche le prix de près de 24 000 stations à partir des données publiques de trois pays, sans serveur."
description: "Fuel Radar compare le prix des carburants dans près de 24 000 stations en France, Espagne et Portugal. PWA gratuite, sans pub ni compte, open source."
date: 2026-10-11T00:00:00.000Z
lang: fr
translationKey: "fuel-radar-fuel-prices"
slug: "fuel-radar-prix-carburants-france-espagne-portugal"
tags:
  - "Développement"
  - "Web"
author: "Angelo Lima"
thumbnail: "/assets/img/fuel-radar-prix-carburants.webp"
shareImg: "/assets/img/fuel-radar-prix-carburants.webp"
faq:
  - q: "Qu'est-ce que Fuel Radar ?"
    a: "Fuel Radar est une application web gratuite (PWA) qui compare le prix des carburants en France, en Espagne et au Portugal. Elle affiche sur une carte le prix de près de 24 000 stations, à partir des données publiques officielles des trois pays, mises à jour toutes les deux heures."
  - q: "Fuel Radar est-il gratuit ?"
    a: "Oui. Fuel Radar est gratuit, sans publicité, sans compte et sans achat intégré. Le code source est public sur GitHub. Le projet peut être soutenu par un don facultatif sur Ko-fi."
  - q: "D'où viennent les prix affichés par Fuel Radar ?"
    a: "Fuel Radar utilise les données ouvertes officielles : prix-carburants.gouv.fr pour la France, le Ministerio para la Transición Ecológica pour l'Espagne et la DGEG pour le Portugal. Les marques des stations sont complétées avec OpenStreetMap."
  - q: "Faut-il installer Fuel Radar ?"
    a: "Non. Fuel Radar s'ouvre dans le navigateur à l'adresse lingelo.github.io/fuel-radar. C'est une PWA : on peut l'ajouter à l'écran d'accueil du téléphone pour l'utiliser comme une application. Une version Android native est en cours de test avant sa publication sur le Play Store."
  - q: "Fuel Radar utilise-t-il ma position ?"
    a: "Seulement si tu l'autorises, pour centrer la carte autour de toi. Fuel Radar ne stocke ni ne partage la position, ne demande pas de compte et n'utilise pas de traceur publicitaire. Les favoris et les filtres restent dans le navigateur."
---
Le 11 octobre 2026, le litre de gazole coûtait en prix médian 2,34 € en France, 2,22 € au Portugal et 1,92 € en Espagne. Sur un plein de 50 litres, la frontière espagnole vaut donc une vingtaine d'euros. Et dans une même ville, deux stations peuvent afficher plusieurs dizaines de centimes d'écart.

Le prix des carburants augmente trop. En France, la moyenne nationale du gazole est passée de 1,65 € le litre au 1er janvier 2026 à 2,32 € le 10 octobre : 41 % de plus en neuf mois, et 25 % pour le SP95-E10. Je ne peux rien contre la hausse, alors j'ai voulu aider à ma façon, avec ce que je sais faire : un outil gratuit pour trouver la station la moins chère autour de soi.

La France, l'Espagne et le Portugal publient tous les trois les prix de leurs stations en données ouvertes, chacun dans son format. Personne ne les réunissait sur une seule carte. **[Fuel Radar](https://lingelo.github.io/fuel-radar/)** le fait : une carte des prix des carburants pour les trois pays, gratuite, sans pub et sans compte.

> **L'essentiel**
>
> - **Quoi** : Fuel Radar est une application web (PWA) qui compare le prix des carburants en France, en Espagne et au Portugal, sur une carte et dans une liste triée par prix ou par distance.
> - **Chiffres clés** : 23 667 stations au 11 octobre 2026 (9 253 en France, 11 345 en Espagne, 3 069 au Portugal), des prix rafraîchis toutes les 2 heures, 4 langues.
> - **Ordre de grandeur** : ce jour-là, le gazole médian était à 2,34 €/L en France, 2,22 € au Portugal et 1,92 € en Espagne (prix de moins d'une semaine, données Fuel Radar).
> - **Pourquoi** : en France, le gazole a pris 41 % entre le 1er janvier et le 10 octobre 2026 (moyenne nationale de 1,65 € à 2,32 € le litre).
> - **Sources** : prix-carburants.gouv.fr, le Ministerio para la Transición Ecológica et la DGEG, plus OpenStreetMap pour les marques.
> - **Architecture** : aucun serveur. GitHub Actions télécharge les données et les transforme en fichiers JSON statiques, servis par GitHub Pages.
> - **Modèle** : gratuit, sans publicité, sans compte, code source public. Une app Android native est en recette.

## Ce que fait l'application

On ouvre la carte, on autorise la position ou on tape une adresse, et chaque station apparaît avec son prix affiché directement sur le pin. Les couleurs vont du vert (les moins chères autour de toi) au rouge. Sur ordinateur, la liste des stations reste à gauche ; sur mobile, elle passe dans un panneau qui remonte du bas de l'écran.

![La carte de Fuel Radar à Paris, avec le prix du gazole sur chaque station](/assets/img/fuel-radar-prix-carburants.webp)

La liste se trie par prix ou par distance, avec un rayon réglable et un badge « Le moins cher » sur la meilleure station. On filtre par carburant (gazole, SP95, SP95-E10, SP98, E85, GPLc), par marque ou par stations ouvertes 24 h/24.

En touchant une station, on arrive sur sa fiche : tous ses prix, leur tendance sur 7 jours, les services, et un itinéraire. L'itinéraire est calculé avec le serveur public d'[OSRM](https://project-osrm.org/) et tracé sur la carte. Un bouton ouvre aussi Google Maps pour la navigation.

Il y a enfin un écran Tendances, avec la moyenne quotidienne des prix par pays sur 30 jours, 90 jours ou un an, et des favoris pour garder ses stations habituelles sous la main. L'interface existe en français, espagnol, portugais et anglais.

Un détail compte beaucoup sur la route : Fuel Radar signale les stations situées sur une aire d'autoroute, dans les trois pays. La France le précise dans son XML (attribut `pop="A"`) et le Portugal dans le champ `TipoPosto`. Le flux espagnol n'a aucun champ de ce type, alors je le déduis de l'adresse de la station.

## Trois pays, trois formats

C'est la partie la moins visible de l'application.

La **France** publie sur prix-carburants.gouv.fr une archive XML instantanée de toutes les stations. Le script la télécharge, la parse et découpe le résultat en un fichier JSON par département. Les marques ne figurent pas dans ce flux : une station TotalEnergies ou Leclerc y est juste une adresse. Je les retrouve en interrogeant OpenStreetMap via l'API Overpass, avec un cache pour ne pas tout redemander à chaque passage.

L'**Espagne** expose une API REST du Ministerio para la Transición Ecológica, que je regroupe par province (`ES-{code}.json`). Le **Portugal** a sa propre API, celle de la DGEG, regroupée par district (`PT-{district}.json`).

Pour que tout cohabite sur la même carte, les identifiants espagnols sont décalés de 100 millions et les portugais de 200 millions. Un id français et un id espagnol ne peuvent jamais entrer en collision, et l'application n'a pas besoin de savoir d'où vient une station pour l'afficher.

Les trois pays n'étiquettent pas non plus le sans-plomb 95 de la même façon : la France affiche surtout du SP95-E10, l'Espagne et le Portugal du SP95. C'est le même indice d'octane, seule la part d'éthanol change. Pour l'app Android, j'ai décidé de les fusionner en un seul choix « Sans-plomb 95 », sinon un voyageur qui filtre sur le E10 ne voit plus aucune station passé la frontière.

## Une app sans serveur

Fuel Radar n'a pas de backend. Toutes les deux heures, un workflow GitHub Actions lance les scripts de collecte, met à jour l'historique des prix, reconstruit l'application avec Vite et publie le tout sur GitHub Pages. Le navigateur télécharge ensuite uniquement les fichiers JSON des zones qu'il affiche.

L'hébergement ne coûte rien, et il n'y a ni base de données ni serveur à surveiller la nuit. Surtout, les URLs des données (`lingelo.github.io/fuel-radar/data/*.json`) forment un contrat stable : la future app Android lit exactement les mêmes fichiers que le site, sans rien embarquer.

La limite est connue : les prix ont jusqu'à deux heures de retard sur la source, qui elle-même dépend de la saisie des stations. L'application affiche donc la date de chaque prix et prévient quand une donnée est ancienne.

Côté front, la stack est volontairement classique : React 19, TypeScript, Vite 7, Tailwind CSS v4 et Leaflet avec le regroupement des marqueurs. Le fond de carte sombre vient de MapTiler. `vite-plugin-pwa` rend l'application installable et garde les données récentes en cache pour les zones sans réseau.

## Ni compte ni publicité

Fuel Radar ne demande aucune inscription. La position sert uniquement à centrer la carte et ne quitte pas le téléphone. Les favoris et les filtres sont gardés dans le `localStorage` du navigateur. L'application n'embarque ni publicité ni outil de mesure d'audience.

Les recherches d'adresse passent par l'[API Adresse](https://adresse.data.gouv.fr/) de l'État pour la France et par [Photon](https://photon.komoot.io/) (Komoot, basé sur OpenStreetMap) pour l'Espagne et le Portugal.

## La suite : une app Android native

Le dépôt est devenu un monorepo cet été. À côté de la PWA, il contient une application Android native en Kotlin et Jetpack Compose, qui lit les mêmes données. Elle est en recette sur un vrai téléphone avant sa publication sur le Play Store. Elle apporte un mode trajet : on choisit un départ et une arrivée, l'app découpe l'itinéraire en tronçons et propose la station la moins chère de chacun, avec un filtre pour ne garder que les aires d'autoroute.

Pour organiser ce travail, j'ai utilisé le plugin Compound Engineering, que je présentais dans [mon article sur SDD, Compound Engineering et BMAD](/fr/sdd-compound-engineering-bmad-philosophies-ia/) : chaque fonctionnalité part d'un brainstorm, puis d'un plan, avant le code. Ces documents sont versionnés dans le dossier `docs/` du dépôt, ce qui permet de retrouver pourquoi chaque décision a été prise. C'est cette même démarche que j'ai ensuite outillée dans [Kaizen](/fr/kaizen-sdlc-ia-claude-code/).

## Essayer et soutenir

Fuel Radar s'ouvre sur **[lingelo.github.io/fuel-radar](https://lingelo.github.io/fuel-radar/)**. Sur téléphone, le bouton « Installer » l'ajoute à l'écran d'accueil. Le code est sur [GitHub](https://github.com/Lingelo/fuel-radar), et les retours de bugs y sont les bienvenus.

Comme [Prelude of the Chambered Reborn](/fr/prelude-of-the-chambered-reborn/), c'est un projet perso, gratuit et sans pub. Si l'application t'a fait économiser quelques euros sur un plein, tu peux m'offrir un café sur [Ko-fi](https://ko-fi.com/angelolima).
