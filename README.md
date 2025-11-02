# Ma Boite a outil

Une application d'apprentissage du français pour les élèves de 6e année du primaire, basée sur le Programme de formation du Québec et les ressources d'Alloprof.

## 📚 Fonctionnalités

- **8 catégories de contenu**: Conjugaison, Homophones, Orthographe, Grammaire, Accords, Ponctuation, Vocabulaire, Types de phrases
- **Cartes flashcards interactives** avec règles claires et exemples illustrés
- **Remplacement de mots interactif** pour comprendre les homophones et conjugaisons
- **Synthèse vocale (TTS)** avec contrôle de vitesse (0.8×, 1×, 1.2×)
- **Exercices pratiques**: QCM, remplir les blancs, glisser-déposer
- **Suivi de progression** avec localStorage
- **Navigation au clavier**: Esc, ← →, Espace

## 🎨 Ajouter du contenu

### Structure des données

Tout le contenu est centralisé dans `shared/content-data.ts`. Chaque catégorie contient un tableau de flashcards.

### Ajouter une nouvelle flashcard

1. Ouvrez `shared/content-data.ts`
2. Trouvez la catégorie appropriée dans le tableau `categories`
3. Ajoutez un nouvel objet dans le tableau `flashcards`:

```typescript
{
  id: 'unique-id',
  title: 'Titre de la règle',
  rule: 'Explication de la règle grammaticale',
  examples: [
    {
      id: 'ex1',
      sentence: 'Phrase d\'exemple.',
      imageUrl: '/assets/images/mon-image.png',
      imageAlt: 'Description de l\'image',
      replacements: [
        {
          original: 'mot',
          replacement: 'remplaçant',
          hint: '✅ Remplacement possible — explication!',
          grammarType: 'verbe' // ou: determinant, pronom, conjonction, adverbe, preposition
        }
      ]
    }
  ],
  practice: [
    {
      id: 'q1',
      type: 'mcq', // ou: fill-blank, drag-drop
      question: 'La question?',
      options: ['Option 1', 'Option 2', 'Option 3'],
      correctAnswer: 'Option 2',
      explanation: 'Pourquoi c\'est la bonne réponse.'
    }
  ]
}
```

### Ajouter une image

1. Placez l'image dans `attached_assets/images/`
2. Référencez-la avec le chemin: `/assets/images/nom-du-fichier.png`
3. Ajoutez toujours un texte alternatif (`imageAlt`) pour l'accessibilité

### Types d'exercices pratiques

**QCM (Multiple Choice)**:
```typescript
{
  type: 'mcq',
  question: 'Question?',
  options: ['A', 'B', 'C'],
  correctAnswer: 'B',
  explanation: 'Explication optionnelle'
}
```

**Remplir les blancs**:
```typescript
{
  type: 'fill-blank',
  question: 'Phrase avec _____ à remplir.',
  correctAnswer: 'réponse attendue',
  explanation: 'Explication optionnelle'
}
```

**Glisser-déposer** (en développement):
```typescript
{
  type: 'drag-drop',
  question: 'Instruction',
  options: ['Option 1', 'Option 2'],
  correctAnswer: ['Option 1'],
  explanation: 'Explication'
}
```

### Remplacements de mots

Les remplacements permettent aux élèves de cliquer sur des mots soulignés pour voir une alternative et comprendre la différence.

**Types grammaticaux et couleurs**:
- `verbe`: Vert
- `determinant`: Orange
- `pronom`: Bleu
- `conjonction`: Rouge
- `adverbe`: Jaune
- `preposition`: Violet

**Exemple**:
```typescript
replacements: [
  {
    original: 'est',
    replacement: 'était',
    hint: '✅ Remplacement possible — c\'est l\'imparfait!',
    grammarType: 'verbe'
  }
]
```

## 🚀 Développement

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

## 📱 Navigation

- **Accueil**: Grille de catégories
- **Page catégorie**: Liste des flashcards
- **Modal flashcard**: Contenu détaillé avec navigation

## ⌨️ Raccourcis clavier

- `Esc`: Fermer la carte
- `←` / `→`: Naviguer entre les cartes
- `Space`: Lire/Pause audio

## 🎯 Ajouter Grade 5

Pour ajouter du contenu de 5e année:

1. Créez une nouvelle structure de données similaire à `content-data.ts`
2. Ajoutez un sélecteur de niveau (5e / 6e) sur la page d'accueil
3. Chargez dynamiquement les données selon le niveau sélectionné

## 📝 Notes techniques

- **Frontend**: React, TypeScript, Tailwind CSS, Wouter (routing)
- **Stockage**: localStorage pour la progression
- **TTS**: Web Speech API (navigateurs modernes)
- **Images**: Statiques dans attached_assets/images/
- **Polices**: Poppins (titres), Open Sans (corps de texte)
