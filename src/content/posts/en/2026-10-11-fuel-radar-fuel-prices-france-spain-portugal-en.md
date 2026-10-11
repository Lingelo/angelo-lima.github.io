---
title: "Fuel Radar: fuel prices across France, Spain and Portugal"
subtitle: "A free, ad-free PWA showing prices at nearly 24,000 stations from three countries' public data, with no server."
description: "Fuel Radar compares fuel prices at nearly 24,000 stations in France, Spain and Portugal. Free PWA, no ads, no account, open source."
date: 2026-10-11T00:00:00.000Z
lang: en
translationKey: "fuel-radar-fuel-prices"
slug: "fuel-radar-fuel-prices-france-spain-portugal-en"
tags:
  - "Development"
  - "Web"
author: "Angelo Lima"
thumbnail: "/assets/img/fuel-radar-prix-carburants.webp"
shareImg: "/assets/img/fuel-radar-prix-carburants.webp"
faq:
  - q: "What is Fuel Radar?"
    a: "Fuel Radar is a free web app (PWA) that compares fuel prices in France, Spain and Portugal. It shows the prices of nearly 24,000 stations on a map, using official public data from the three countries, refreshed every two hours."
  - q: "Is Fuel Radar free?"
    a: "Yes. Fuel Radar is free, with no ads, no account and no in-app purchases. Its source code is public on GitHub. The project can be supported with an optional donation on Ko-fi."
  - q: "Where do Fuel Radar's prices come from?"
    a: "Fuel Radar uses official open data: prix-carburants.gouv.fr for France, the Ministerio para la Transición Ecológica for Spain and the DGEG for Portugal. Station brands are filled in from OpenStreetMap."
  - q: "Do I need to install Fuel Radar?"
    a: "No. Fuel Radar runs in the browser at lingelo.github.io/fuel-radar. It is a PWA, so it can be added to a phone's home screen and used like an app. A native Android version is being tested before its Play Store release."
  - q: "Does Fuel Radar use my location?"
    a: "Only if you allow it, to center the map around you. Fuel Radar does not store or share your location, needs no account and has no advertising tracker. Favorites and filters stay in your browser."
---
On October 11, 2026, the median price of a liter of diesel was €2.34 in France, €2.22 in Portugal and €1.92 in Spain. On a 50-liter tank, the Spanish border is worth about twenty euros. And within the same city, two stations can be tens of cents apart.

Fuel prices are rising too much. In France, the national average for diesel went from €1.65 a liter on January 1, 2026 to €2.32 on October 10: 41% more in nine months, and 25% for SP95-E10. I can't do anything about the increase, so I wanted to help in my own way, with what I know how to do: a free tool to find the cheapest station near you.

France, Spain and Portugal all publish their station prices as open data, each in its own format. Nobody was putting them together on a single map. **[Fuel Radar](https://lingelo.github.io/fuel-radar/)** does: a fuel price map for all three countries, free, with no ads and no account.

> **In brief**
>
> - **What:** Fuel Radar is a web app (PWA) that compares fuel prices in France, Spain and Portugal, on a map and in a list sorted by price or distance.
> - **Key numbers:** 23,667 stations on October 11, 2026 (9,253 in France, 11,345 in Spain, 3,069 in Portugal), prices refreshed every 2 hours, 4 languages.
> - **Scale:** that day, median diesel was €2.34/L in France, €2.22 in Portugal and €1.92 in Spain (prices under a week old, Fuel Radar data).
> - **Why:** in France, diesel rose 41% between January 1 and October 10, 2026 (national average from €1.65 to €2.32 a liter).
> - **Sources:** prix-carburants.gouv.fr, Spain's Ministerio para la Transición Ecológica and Portugal's DGEG, plus OpenStreetMap for brands.
> - **Architecture:** no server. GitHub Actions downloads the data and turns it into static JSON files served by GitHub Pages.
> - **Model:** free, ad-free, no account, public source code. A native Android app is in testing.

## What the app does

You open the map, allow your location or type an address, and every station shows up with its price right on the pin. Colors go from green (the cheapest around you) to red. On desktop the station list stays on the left; on mobile it moves into a panel that slides up from the bottom.

![The Fuel Radar map in Paris, with the diesel price on each station](/assets/img/fuel-radar-prix-carburants.webp)

The list sorts by price or distance, with an adjustable radius and a "Cheapest" badge on the best station. You can filter by fuel (diesel, SP95, SP95-E10, SP98, E85, LPG), by brand, or by stations open 24/7.

Tapping a station opens its page: every price, its 7-day trend, the services, and directions. The route is computed with the public [OSRM](https://project-osrm.org/) server and drawn on the map. A button also opens Google Maps for navigation.

There is also a Trends screen, with the daily average price per country over 30 days, 90 days or a year, and favorites to keep your usual stations at hand. The interface is available in French, Spanish, Portuguese and English.

One detail matters a lot on the road: Fuel Radar flags stations located at motorway service areas, in all three countries. France states it in its XML (the `pop="A"` attribute) and Portugal in the `TipoPosto` field. The Spanish feed has no such field, so I infer it from the station's address.

## Three countries, three formats

This is the part of the app you don't see.

**France** publishes an instant XML archive of every station on prix-carburants.gouv.fr. The script downloads it, parses it and splits the result into one JSON file per department. Brands are not in that feed: a TotalEnergies or Leclerc station is just an address there. I recover them by querying OpenStreetMap through the Overpass API, with a cache so I don't ask for everything again on each run.

**Spain** exposes a REST API from the Ministerio para la Transición Ecológica, which I group by province (`ES-{code}.json`). **Portugal** has its own API, from the DGEG, grouped by district (`PT-{district}.json`).

To make everything live on the same map, Spanish IDs are offset by 100 million and Portuguese ones by 200 million. A French ID and a Spanish ID can never collide, and the app doesn't need to know where a station comes from to display it.

The three countries don't label 95 unleaded the same way either: France mostly shows SP95-E10, Spain and Portugal show SP95. It's the same octane rating, only the ethanol share differs. For the Android app, I decided to merge them into a single "Unleaded 95" choice. Otherwise a traveler filtering on E10 sees no station at all once past the border.

## An app with no server

Fuel Radar has no backend. Every two hours, a GitHub Actions workflow runs the collection scripts, updates the price history, rebuilds the app with Vite and publishes everything to GitHub Pages. The browser then downloads only the JSON files for the areas it displays.

Hosting costs nothing, and there is no database or server to watch at night. Above all, the data URLs (`lingelo.github.io/fuel-radar/data/*.json`) form a stable contract: the upcoming Android app reads exactly the same files as the website, with nothing bundled.

The limit is known: prices can lag the source by up to two hours, and the source itself depends on what stations report. So the app shows the date of each price and warns you when data is old.

On the front end, the stack is deliberately standard: React 19, TypeScript, Vite 7, Tailwind CSS v4 and Leaflet with marker clustering. The dark base map comes from MapTiler. `vite-plugin-pwa` makes the app installable and caches recent data for areas without signal.

## No account, no ads

Fuel Radar asks for no sign-up. Your location is only used to center the map and never leaves your phone. Favorites and filters are kept in the browser's `localStorage`. The app has no advertising and no audience-measurement tool.

Address searches go through the French government's [Adresse API](https://adresse.data.gouv.fr/) for France and [Photon](https://photon.komoot.io/) (Komoot, based on OpenStreetMap) for Spain and Portugal.

## Next: a native Android app

The repository became a monorepo this summer. Next to the PWA, it contains a native Android app in Kotlin and Jetpack Compose that reads the same data. It is being tested on a real phone before its Play Store release. It adds a trip mode: you pick a start and a destination, the app splits the route into segments and suggests the cheapest station on each, with a filter to keep only motorway service areas.

To organize this work, I used the Compound Engineering plugin, which I covered in [my article on SDD, Compound Engineering and BMAD](/en/sdd-compound-engineering-bmad-philosophies-en/): every feature starts from a brainstorm, then a plan, before any code. Those documents are versioned in the repository's `docs/` folder, so you can trace why each decision was made. It's the same approach I later turned into tooling with [Kaizen](/en/kaizen-ai-sdlc-claude-code-en/).

## Try it and support it

Fuel Radar is at **[lingelo.github.io/fuel-radar](https://lingelo.github.io/fuel-radar/)**. On a phone, the "Install" button adds it to your home screen. The code is on [GitHub](https://github.com/Lingelo/fuel-radar), and bug reports are welcome there.

Like [Prelude of the Chambered Reborn](/en/prelude-of-the-chambered-reborn-typescript-web-port/), it's a personal project, free and ad-free. If the app saved you a few euros on a tank, you can buy me a coffee on [Ko-fi](https://ko-fi.com/angelolima).
