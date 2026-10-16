---
title: "Ocarina of Time: a Proustian madeleine, now with jam"
subtitle: "What I saw at 11, what the Nintendo 64 was hiding from me, and what the Switch 2 remake will finally show"
description: "I was 11 when I discovered Zelda Ocarina of Time. I only understood its technical tricks years later. The Switch 2 remake comes out November 5, 2026."
date: 2026-10-16T07:00:00.000Z
lang: en
translationKey: "zelda-ocarina-of-time-remake"
slug: "zelda-ocarina-of-time-remake-childhood-en"
tags:
  - "Personal"
  - "Tech"
author: "Angelo Lima"
related:
  - "prelude-of-the-chambered-reborn"
  - "gbts-typescript-gameboy"
faq:
  - q: "When does the Zelda Ocarina of Time remake come out?"
    a: "The remake of The Legend of Zelda: Ocarina of Time comes out on November 5, 2026, exclusively on Nintendo Switch 2. Nintendo announced it in June 2026 and confirmed the date during the Zelda 40th Anniversary Direct on September 8, 2026."
  - q: "What changes in the Ocarina of Time remake?"
    a: "The Switch 2 remake of Ocarina of Time fully rebuilds the graphics and adds a free camera, manual jumping and sprinting, a continuous day/night cycle even in towns, voiced cutscenes and an orchestral soundtrack. It also adds a quest menu, microphone recognition of songs and timed boss rematches."
  - q: "Why was there so much fog in Ocarina of Time on Nintendo 64?"
    a: "On Nintendo 64, the fog in Ocarina of Time hid the limit of the draw distance: the console could not render the whole landscape far away. The developers turned it into part of the atmosphere instead of a visible flaw."
  - q: "What technical compromises did Ocarina of Time make on Nintendo 64?"
    a: "Ocarina of Time ran at around 20 frames per second with a 4 KB texture cache. The game used pre-rendered backgrounds with fixed cameras (the market, the outside of the Temple of Time), slow door animations to hide loading, and fog to limit the draw distance."
  - q: "Was the European version of Ocarina of Time different?"
    a: "Yes. In Europe, Ocarina of Time ran in PAL 50 Hz. The game ran about one sixth slower than the American or Japanese version, with black bars at the top and bottom of the screen."
---
I never write about video games on this blog. But on November 5, 2026, Nintendo releases a remake of *The Legend of Zelda: Ocarina of Time* on Switch 2, and I can't pretend it isn't happening. For me, this game is a Proustian madeleine. And this time it comes with jam on top, served in a very pretty shape.

> **In brief**
>
> - **The game:** *Ocarina of Time*, released at the end of 1998 on Nintendo 64, is the first 3D Zelda.
> - **The remake:** a full rebuild, exclusive to Switch 2, out on November 5, 2026.
> - **The 1998 tricks:** around 20 frames per second, a 4 KB texture cache, fog to hide the horizon, pre-rendered backgrounds and doors that double as loading screens.
> - **What the remake fixes:** free camera, manual jump, time that flows even in towns, voices, orchestra, rebuilt graphics.
> - **My angle:** a childhood memory, revisited with a developer's eyes.

## Eleven years old, first year of middle school

I was 11 or 12, in my first year of middle school, and I had the game. My own copy, not a friend's.

From the first minutes, I loved it. Link asleep in his treehouse, lost in a nightmare. Navi rushing in to drag him out of bed. I didn't know yet that I would spend weeks in that world, but I was already in it.

Then came that moment. Link pulls the Master Sword in the Temple of Time, the screen goes white, and he wakes up seven years later. An adult. His shouts are no longer a kid's, his voice has broken. For an 11-year-old, it was a real cliffhanger. The hero had grown up all at once, and I was still 11 in front of my TV.

The Forest Temple, seven years later in the game, hit me even harder. You go back to where it all started, and Saria hasn't grown. The Kokiri never age. Link has changed. It was the first time a game made me feel something close to nostalgia, when I was too young to know what that was.

I had nothing to compare it to. I didn't know what a draw distance was. To me, it was simply beautiful.

## What the Nintendo 64 was hiding from me

I discovered what was behind the scenes much later, in a YouTube video that took the game apart. And I realized my memories were built on a series of magic tricks.

The first one is the camera. It only shows what was built. Everything is framed and cropped so your eye never lands on an empty spot. Outside the frame, there is often nothing at all.

The second one is layering. The scenery is stacked like a theater set: real 3D up front, very simplified models further away, and a painted backdrop at the very back. Seen from where Link stands, it looks like a huge world. Seen from the side, it would fall apart.

The rest is the list of compromises I learned about at the same time:

- **Fog.** On Hyrule Field or in the woods, it hides the limit of the draw distance. What I took for atmosphere was also a patch.
- **Pre-rendered backgrounds.** The Castle Town market and the outside of the Temple of Time are still images with a locked camera. You think you're walking through a 3D town, you're actually walking in front of a painting.
- **Doors.** They open slowly, with a little bit of staging. Meanwhile, the console loads the next room.
- **Frame rate.** The game runs at around 20 frames per second.
- **Textures.** The Nintendo 64 only has a 4 KB texture cache. Hence those blurry surfaces my child brain filled in on its own.

And one compromise was about me specifically. In France, I played the PAL version, at 50 Hz. It ran about one sixth slower than the American or Japanese version, with black bars at the top and bottom of the screen. So I played the most constrained version of the game without knowing it, and I loved it anyway.

None of this spoiled the memory. It made it more impressive. Now that this is my job, I know what it means to fit inside constraints like these. When I [rewrote Prelude of the Chambered in TypeScript](/en/prelude-of-the-chambered-reborn-typescript-web-port/), I found that same joy of watching an old engine do a lot with very little. Ocarina of Time is that, at the scale of a whole world.

## The jam: what the remake changes

And now comes a version that no longer needs to cheat. Nintendo's announcements and the first hands-on previews published on October 14 show that many of the new features answer the N64's compromises directly.

| On Nintendo 64 (1998) | On Switch 2 (2026) |
|---|---|
| Market as a still image, locked camera | Castle Town rebuilt in real 3D, better connected to the rest of the world |
| Automatic camera, Z-targeting essential | Free camera on the right stick |
| Automatic jump at ledges | Manual jump and sprint (the old auto-jump stays as an option) |
| Time stops in towns | Continuous day/night cycle, towns included |
| Music generated by the console | Orchestral soundtrack |
| Text-only dialogue | Fully voiced cutscenes |
| Tiny textures | Rebuilt graphics: models, lighting, materials |

There is also new content, according to the previews:

- A quest menu, "Threads of Time", that tracks objectives and fills in a woven picture as you progress.
- Song recognition through the Switch 2 microphone: hum a melody you've learned and Link plays it on the ocarina.
- A room displaying statues of defeated monsters, with timed boss rematches.
- Reworked bosses, with new attacks for King Dodongo and Volvagia and new phases for the Poe Sisters.
- A redesigned Forest Temple, closer to a haunted house, with modified puzzles.
- A fifth bottle to earn at the Castle Town bazaar, new characters and longer dialogue.
- Faster combat, with combos.

On the technical side, Nintendo announces HDR and VRR. Previews also point out two weak spots: shimmering on hair and foliage, and a Hyrule Field that still feels small next to *Breath of the Wild*. Nintendo hasn't shared the resolution or the frame rate.

## Will I miss the fog?

That's the question I've been asking myself since the announcement. The 1998 fog was a constraint, and it became part of my memory. The remake will show me the horizon of Hyrule Field for the first time, and I don't know yet whether I'll find it more beautiful or just different.

I'll go back to Kokiri Forest, climb up to the Forest Temple and find Saria, who still won't have grown. I'll be 28 years older than the middle-school kid in front of his TV. Same game, without the strings. And I really want to know what that feels like.
