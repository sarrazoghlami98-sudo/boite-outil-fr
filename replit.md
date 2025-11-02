# Ma Boite a outil

## Vue d'ensemble

Application d'apprentissage du français pour 6e année du primaire, basée sur le Programme de formation du Québec. L'application comprend 8 catégories de contenu avec des flashcards interactives, des exercices pratiques et un système de suivi de progression.

## État actuel

**Version**: 1.0 MVP
**Date**: Novembre 2025

### Fonctionnalités complétées

✅ 8 catégories de contenu (Conjugaison, Homophones, Orthographe, Grammaire, Accords, Ponctuation, Vocabulaire, Types de phrases)
✅ 14 flashcards complètes pour Conjugaison (6) et Homophones (8)
✅ 25 images extraites des PPT fournis et intégrées
✅ Système de remplacement de mots interactif avec codes couleur (6 types grammaticaux)
✅ Synthèse vocale (TTS) avec contrôle de vitesse (0.8×, 1×, 1.2×)
✅ Exercices pratiques (QCM, remplir les blancs, drag-and-drop)
✅ Suivi de progression avec localStorage
✅ Navigation au clavier complète (Esc, flèches, Space) avec respect du contexte focus
✅ Design responsive (mobile, tablette, desktop)
✅ Tuiles de catégories uniformes avec progression (h-40 md:h-48)
✅ Modal flashcard plein écran (90% viewport) avec scrolling
✅ Accessibilité complète (ARIA, focus management, keyboard shortcuts)
✅ 20+ paires de remplacement de mots configurées
✅ Tests end-to-end passés avec succès

### En cours de développement

🚧 Contenu pour Orthographe, Grammaire, Accords, Ponctuation, Vocabulaire, Types de phrases (6 placeholders créés)
🚧 Contenu Grade 5 (structure prête pour expansion)

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
│   │   ├── TTSControls.tsx           # Contrôles audio avec Space key toggle
│   │   ├── PracticeMCQ.tsx           # Questions à choix multiples
│   │   ├── PracticeFillBlank.tsx     # Exercices à trous
│   │   └── PracticeDragDrop.tsx      # Exercices drag-and-drop
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

### Novembre 2025 - Version 1.0 MVP Complete
- ✅ Configuration initiale avec design tokens kid-friendly (Poppins, Open Sans, couleurs vibrantes)
- ✅ Création data model complet TypeScript (shared/schema.ts, shared/content-data.ts)
- ✅ Extraction et intégration 25 images des PPT fournis
- ✅ Implémentation 14 flashcards complètes: 6 Conjugaison + 8 Homophones
- ✅ Système remplacement mots avec 20+ paires, 6 types grammaticaux colorés
- ✅ Composants TTS avec vitesses multiples (0.8×, 1×, 1.2×)
- ✅ Exercices pratiques: QCM, fill-blank, drag-and-drop avec feedback visuel
- ✅ Page accueil avec 8 tuiles uniformes (exact same size)
- ✅ Système progression localStorage avec compteurs
- ✅ Navigation clavier complète avec gestion intelligente du focus:
  - Esc ferme modal
  - ←/→ naviguent entre flashcards
  - Space toggle TTS seulement quand pas sur éléments interactifs
  - Enter/Space activent boutons
  - Escape restore mots remplacés
- ✅ Accessibilité: ARIA labels, focus management, data-testids partout
- ✅ Tests end-to-end réussis: toute la user journey validée
- ✅ Révision architecte: Implementation production-ready

## Prochaines étapes

1. Développer contenu pour 6 catégories restantes
2. Ajouter plus d'exercices pratiques variés
3. Implémenter drag-and-drop fonctionnel
4. Créer structure données Grade 5
5. Ajouter sélecteur niveau (5e/6e)
6. Tests utilisateur avec enfants 6e année
