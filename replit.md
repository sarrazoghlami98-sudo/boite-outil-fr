# Ma Boite a outil

## Vue d'ensemble

Application d'apprentissage du français pour 6e année du primaire, basée sur le Programme de formation du Québec. L'application comprend 8 catégories de contenu avec des flashcards interactives, des exercices pratiques et un système de suivi de progression.

## État actuel

**Version**: 1.0 MVP
**Date**: Novembre 2025

### Fonctionnalités complétées

✅ 8 catégories de contenu (Conjugaison, Homophones, Orthographe, Grammaire, Accords, Ponctuation, Vocabulaire, Types de phrases)
✅ 14 flashcards complètes pour Conjugaison et Homophones
✅ 25+ images extraites des PPT fournis
✅ Système de remplacement de mots interactif avec codes couleur
✅ Synthèse vocale (TTS) avec contrôle de vitesse
✅ Exercices pratiques (QCM, remplir les blancs)
✅ Suivi de progression avec localStorage
✅ Navigation au clavier (Esc, flèches, Space)
✅ Design responsive (mobile, tablette, desktop)
✅ Tuiles de catégories uniformes avec progression
✅ Modal flashcard plein écran (90% viewport)

### En cours de développement

🚧 Contenu pour Orthographe, Grammaire, Accords, Ponctuation, Vocabulaire, Types de phrases
🚧 Exercices drag-and-drop fonctionnels
🚧 Contenu Grade 5

## Architecture du projet

### Structure de fichiers

```
client/
├── src/
│   ├── components/
│   │   ├── CategoryTile.tsx          # Tuile de catégorie sur page d'accueil
│   │   ├── FlashcardModal.tsx        # Modal flashcard plein écran
│   │   ├── WordReplacement.tsx       # Mots cliquables avec remplacement
│   │   ├── InteractiveSentence.tsx   # Phrase avec mots interactifs
│   │   ├── TTSControls.tsx           # Contrôles audio
│   │   ├── PracticeMCQ.tsx           # Questions à choix multiples
│   │   └── PracticeFillBlank.tsx     # Exercices à trous
│   ├── pages/
│   │   ├── Home.tsx                  # Page d'accueil avec grille de catégories
│   │   └── CategoryPage.tsx          # Liste de flashcards d'une catégorie
│   ├── lib/
│   │   ├── progress.ts               # Gestion localStorage progression
│   │   └── tts.ts                    # Service synthèse vocale
│   └── index.css                     # Styles globaux et design tokens

shared/
├── schema.ts                          # Types TypeScript et validation Zod
└── content-data.ts                    # Données centralisées (flashcards, catégories)

attached_assets/
└── images/                            # 25 images des PPT fournis
    ├── homophones/Presentation3/      # 9 slides homophones
    └── Ma boîte à outils_v1/          # 16 slides conjugaison
```

### Technologies

- **Frontend**: React 18, TypeScript, Wouter (routing)
- **Styling**: Tailwind CSS, Shadcn UI components
- **État**: React hooks, localStorage
- **TTS**: Web Speech API
- **Fonts**: Poppins (display), Open Sans (body)

### Design System

**Couleurs des catégories**:
- Conjugaison: Bleu (#3B82F6)
- Homophones: Violet (#A855F7)
- Orthographe: Vert (#10B981)
- Grammaire: Orange (#F97316)
- Accords: Rose (#EC4899)
- Ponctuation: Turquoise (#14B8A6)
- Vocabulaire: Indigo (#6366F1)
- Types de phrases: Rouge (#EF4444)

**Couleurs grammaticales** (remplacements):
- Verbe: Vert
- Déterminant: Orange
- Pronom: Bleu
- Conjonction: Rouge
- Adverbe: Jaune
- Préposition: Violet

## Préférences utilisateur

### Contenu

- Suivre le Programme de formation du Québec 6e année
- Utiliser ressources Alloprof comme référence
- Garder contenu centralisé en JSON pour faciliter expansion Grade 5
- Ajouter exemples avec illustrations quand possible
- Chaque flashcard: 1 règle + 2-4 exemples + 1+ exercices

### Design

- Kid-friendly, visuellement attrayant
- Tuiles catégories EXACTEMENT même taille à tous breakpoints
- Modal 90% de l'écran, contenu scrollable
- Mots remplaçables soulignés en pointillés, colorés par type
- Feedback visuel immédiat sur exercices
- Accessibilité complète (alt text, focus styles, keyboard nav)

### Technique

- Pas de base de données (localStorage suffisant pour MVP)
- Images statiques dans attached_assets/
- TTS natif du navigateur (pas d'API externe)
- Mobile-first responsive design

## Modifications récentes

### Novembre 2025
- ✅ Configuration initiale avec design tokens kid-friendly
- ✅ Création data model complet (shared/schema.ts)
- ✅ Extraction 25 images des PPT fournis
- ✅ Implémentation 14 flashcards Conjugaison + Homophones avec contenu riche
- ✅ Système remplacement mots avec 20+ paires configurées
- ✅ Composants TTS avec vitesses multiples
- ✅ Exercices QCM et fill-blank avec feedback
- ✅ Page accueil avec 8 tuiles uniformes
- ✅ Système progression localStorage
- ✅ Navigation clavier complète

## Prochaines étapes

1. Développer contenu pour 6 catégories restantes
2. Ajouter plus d'exercices pratiques variés
3. Implémenter drag-and-drop fonctionnel
4. Créer structure données Grade 5
5. Ajouter sélecteur niveau (5e/6e)
6. Tests utilisateur avec enfants 6e année
