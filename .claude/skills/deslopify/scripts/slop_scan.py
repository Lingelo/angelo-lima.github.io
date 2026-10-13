#!/usr/bin/env python3
"""Scan chiffré des marqueurs IA dans un article Markdown du blog (FR ou EN).

Usage : python3 .claude/skills/deslopify/scripts/slop_scan.py src/content/posts/fr/AAAA-MM-JJ-slug.md [...]

Ne remplace pas la relecture : il repère les marqueurs mesurables (ponctuation,
patrons syntaxiques, lexique signature) pour que la passe deslopify parte de
faits, ligne par ligne. Le frontmatter, les blocs de code et le code inline
sont ignorés.
"""
import re
import sys

LEXIQUE_FR = [
    r"paysage en constante évolution", r"à l'ère d[ue] ", r"de nos jours", r"au cœur d[eu] ",
    r"dans un contexte où", r"plong(er|e|eons|ez) dans", r"naviguer (dans|à travers)",
    r"libérer le potentiel", r"tirer parti", r"ouvrir la voie", r"révolutionn",
    r"il convient de noter", r"il est (important|crucial|essentiel) de", r"en fin de compte",
    r"en conclusion", r"en définitive", r"changer? la donne", r"un véritable levier",
    r"sans couture", r"\bpuissant", r"\bcrucial", r"\bincontournable",
]
LEXIQUE_EN = [
    r"\bdelv", r"\brealm\b", r"\btapestry", r"\blandscape\b", r"\bunleash", r"\bunlock",
    r"\bharness", r"\bleverag", r"\bembark", r"\bnavigat", r"\bfoster", r"\bseamless",
    r"\brobust\b", r"testament to", r"it'?s worth noting", r"game.chang", r"\bcrucial\b",
]
PATRONS = {
    "pas X, mais/c'est Y": r"(n'est (pas|plus)|ne s'agit pas|ce n'est pas)[^.\n]{0,90}(, mais |, c'est |; c'est )",
    "not X, but/it's Y": r"\b(isn't|is not|is no longer|not just|not only)\b[^.\n]{0,90}(, but |; it'?s |, it'?s )",
    "participe présent après virgule": r", (permettant|offrant|garantissant|assurant|facilitant|rendant)\b",
    "ouverture « Imaginez »": r"^(Imaginez|Imagine|Et si|What if)\b",
}


def corps(texte):
    """Retire le frontmatter, les blocs de code et le code inline."""
    parties = texte.split("\n---\n", 1)
    if texte.startswith("---") and len(parties) == 2:
        texte = parties[1]
    texte = re.sub(r"```.*?```", "", texte, flags=re.S)
    return re.sub(r"`[^`\n]*`", "", texte)


def scan(chemin):
    brut = open(chemin, encoding="utf-8").read()
    lignes = corps(brut).split("\n")
    en = "/en/" in chemin
    print(f"\n=== {chemin} ({'EN' if en else 'FR'})")
    alertes = 0

    def rapporte(titre, hits, seuil=0):
        nonlocal alertes
        statut = "OK" if len(hits) <= seuil else "À REVOIR"
        if statut != "OK":
            alertes += 1
        print(f"- {titre} : {len(hits)} (seuil {seuil}) {statut}")
        for n, l in hits[:8]:
            print(f"    l.{n}: {l.strip()[:110]}")

    prose = [(i + 1, l) for i, l in enumerate(lignes) if l.strip() and not l.lstrip().startswith("|")]
    rapporte("Tirets cadratins (—)", [(n, l) for n, l in prose if "—" in l], 2)
    rapporte("Points-virgules", [(n, l) for n, l in prose if ";" in l and not l.lstrip().startswith(">")], 0 if not en else 2)
    # Le gras d'un libellé de liste (« - Les **sous-agents** … ») ou d'un lien seul est légitime.
    def gras_suspect(l):
        if l.lstrip().startswith(">") or re.match(r"^\s*[-*] (\S+ ){0,2}\*\*", l):
            return False
        return re.search(r"\*\*[^*]+\*\*", l) is not None
    rapporte("Lignes avec du gras dans la prose", [(n, l) for n, l in prose if gras_suspect(l)], 4)
    for nom, motif in PATRONS.items():
        rapporte(nom, [(n, l) for n, l in prose if re.search(motif, l, re.I | re.M)])
    lex = LEXIQUE_EN if en else LEXIQUE_FR
    rapporte("Lexique signature", [(n, l) for n, l in prose if any(re.search(m, l, re.I) for m in lex)])
    ternaires = [(n, l) for n, l in prose if re.search(r"\b\w[\w'-]*, (un |une |des |le |la |les |a |an |the )?[\w'-]+(,)? (et|and) [\w'-]+[.!:]", l)]
    rapporte("Rythme ternaire possible (à juger)", ternaires, 3)
    print(f"→ {alertes} catégorie(s) à revoir. Aucune alerte ne dispense de la relecture.")
    return alertes


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    total = sum(scan(p) for p in sys.argv[1:])
    sys.exit(1 if total else 0)
