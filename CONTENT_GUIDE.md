# Guide d'ajout de contenu - Ma Boite a outil

Ce guide explique comment ajouter du nouveau contenu à l'application sans toucher au code.

## 📝 Structure générale

Tout le contenu est dans le fichier `shared/content-data.ts`. Ce fichier contient un tableau `categories` avec 8 catégories.

## 🎯 Ajouter une nouvelle flashcard

### Étape 1: Trouver la bonne catégorie

Ouvrez `shared/content-data.ts` et trouvez la catégorie:
- `conjugaison` - Temps de verbes
- `homophones` - Mots qui sonnent pareil
- `orthographe` - Orthographe d'usage
- `grammaire` - Classes de mots
- `accords` - Accords en genre et nombre
- `ponctuation` - Virgules, points, etc.
- `vocabulaire` - Enrichissement vocabulaire
- `phrases` - Types de phrases

### Étape 2: Copier un modèle

Copiez une flashcard existante et modifiez-la:

```typescript
{
  id: 'mon-nouveau-contenu',           // Unique!
  title: 'Le titre de ma règle',
  rule: 'La règle grammaticale expliquée simplement.',
  examples: [
    {
      id: 'ex1',
      sentence: 'Ma phrase d\'exemple.',
      imageUrl: '/assets/images/mon-image.png',  // Optionnel
      imageAlt: 'Description pour accessibilité',
      replacements: [...]  // Optionnel, voir ci-dessous
    }
  ],
  practice: [...]  // Voir ci-dessous
}
```

## 🖼️ Ajouter des images

### Option 1: Utiliser les images existantes

Les 25 images des PowerPoints sont déjà disponibles:
- Conjugaison: `/assets/images/Ma boîte à outils_v1/Diapositive1.PNG` à `Diapositive16.PNG`
- Homophones: `/assets/images/homophones/Presentation3/Diapositive1.PNG` à `Diapositive9.PNG`

### Option 2: Ajouter de nouvelles images

1. Placez votre image dans `attached_assets/images/`
2. Utilisez le chemin: `/assets/images/votre-image.png`
3. **Important**: Toujours ajouter `imageAlt` pour l'accessibilité

Exemple:
```typescript
{
  imageUrl: '/assets/images/orthographe/exemple1.png',
  imageAlt: 'Un enfant écrivant au tableau'
}
```

## 🔄 Remplacements de mots interactifs

Les remplacements permettent aux élèves de cliquer sur un mot pour le remplacer et comprendre la différence.

### Anatomie d'un remplacement

```typescript
replacements: [
  {
    original: 'est',              // Le mot dans la phrase
    replacement: 'était',         // Le mot de remplacement
    hint: '✅ Remplacement possible — c\'est l\'imparfait!',
    grammarType: 'verbe'          // Pour la couleur
  }
]
```

### Types grammaticaux disponibles

| Type | Couleur | Exemple |
|------|---------|---------|
| `verbe` | Vert | est → était |
| `determinant` | Orange | son → mon |
| `pronom` | Bleu | ce → le |
| `conjonction` | Rouge | ou → ou bien |
| `adverbe` | Jaune | là → ici |
| `preposition` | Violet | à → de |

### Conseils pour les remplacements

**✅ Bon remplacement**:
```typescript
{
  original: 'mange',
  replacement: 'mangeais',
  hint: '✅ Remplacement possible — c\'est l\'imparfait!',
  grammarType: 'verbe'
}
```

**❌ Remplacement impossible** (pour enseigner la différence):
```typescript
{
  original: 'à',
  replacement: 'avait',
  hint: '❌ Impossible — « à » est une préposition!',
  grammarType: 'preposition'
}
```

## ✏️ Exercices pratiques

### Type 1: Questions à choix multiples (QCM)

```typescript
{
  id: 'q1',
  type: 'mcq',
  question: 'Quelle est la bonne réponse? « Il ___ content. »',
  options: ['est', 'et', 'es', 'ai'],
  correctAnswer: 'est',
  explanation: 'On peut dire "était content", donc c\'est "est" (verbe être).'
}
```

### Type 2: Remplir les blancs

```typescript
{
  id: 'q2',
  type: 'fill-blank',
  question: 'Complète la phrase: « Demain, je _____ (aller) au parc. »',
  correctAnswer: 'irai',
  explanation: 'Futur simple de "aller": j\'irai, tu iras...'
}
```

### Type 3: Glisser-déposer (en développement)

```typescript
{
  id: 'q3',
  type: 'drag-drop',
  question: 'Place les mots dans le bon ordre.',
  options: ['est', 'content', 'Il', 'très'],
  correctAnswer: ['Il', 'est', 'très', 'content'],
  explanation: 'L\'ordre correct de la phrase.'
}
```

## 📋 Exemples complets

### Exemple 1: Flashcard simple sans image

```typescript
{
  id: 'futur-proche',
  title: 'Le futur proche',
  rule: 'Le futur proche exprime une action qui va se produire bientôt. Formation: aller (présent) + verbe à l\'infinitif.',
  examples: [
    {
      id: 'fp-ex1',
      sentence: 'Je vais manger dans cinq minutes.'
    },
    {
      id: 'fp-ex2',
      sentence: 'Tu vas finir tes devoirs bientôt.'
    }
  ],
  practice: [
    {
      id: 'fp-q1',
      type: 'mcq',
      question: 'Quelle phrase utilise le futur proche?',
      options: [
        'Je mangerai demain',
        'Je vais manger maintenant',
        'J\'ai mangé hier'
      ],
      correctAnswer: 'Je vais manger maintenant',
      explanation: 'Futur proche = aller + infinitif'
    }
  ]
}
```

### Exemple 2: Flashcard avec image et remplacements

```typescript
{
  id: 'homo-la-la',
  title: 'la / là',
  rule: '« la » est un déterminant ou pronom. « là » indique un lieu et a un accent.',
  examples: [
    {
      id: 'la-ex1',
      sentence: 'Je vois la lune dans le ciel.',
      imageUrl: '/assets/images/lune.png',
      imageAlt: 'Lune dans le ciel nocturne',
      replacements: [
        {
          original: 'la',
          replacement: 'une',
          hint: '✅ Remplacement possible — c\'est un déterminant!',
          grammarType: 'determinant'
        }
      ]
    },
    {
      id: 'la-ex2',
      sentence: 'Ton livre est là, sur la table.',
      replacements: [
        {
          original: 'là',
          replacement: 'ici',
          hint: '✅ Remplacement possible — c\'est un adverbe de lieu!',
          grammarType: 'adverbe'
        }
      ]
    }
  ],
  practice: [
    {
      id: 'la-q1',
      type: 'mcq',
      question: 'Choisis: « Regarde ___ étoile! »',
      options: ['la', 'là'],
      correctAnswer: 'la',
      explanation: 'Déterminant féminin avant "étoile".'
    }
  ]
}
```

## 🔍 Vérification avant publication

Checklist:
- ✅ Tous les `id` sont uniques
- ✅ Les chemins d'images commencent par `/assets/images/`
- ✅ Chaque image a un `imageAlt`
- ✅ Les `grammarType` sont valides (verbe, determinant, pronom, conjonction, adverbe, preposition)
- ✅ Les questions pratiques ont des `correctAnswer`
- ✅ Testé dans l'application

## 🚀 Expansion Grade 5

Pour ajouter du contenu de 5e année:

1. Créez un nouveau fichier `shared/content-data-grade5.ts`
2. Copiez la structure de `content-data.ts`
3. Ajoutez le contenu Grade 5
4. Modifiez l'application pour charger dynamiquement selon le niveau

## 💡 Conseils pédagogiques

1. **Règles**: Courtes et claires (2-3 phrases max)
2. **Exemples**: Variés et concrets
3. **Images**: Colorées et attrayantes pour enfants
4. **Remplacements**: Enseigner par la manipulation
5. **Exercices**: Progression graduelle
6. **Feedback**: Toujours positif et encourageant

## ❓ Questions fréquentes

**Q: Combien d'exemples par flashcard?**
R: 2-4 exemples recommandés.

**Q: Faut-il une image pour chaque exemple?**
R: Non, mais c'est mieux pour l'engagement des élèves.

**Q: Puis-je avoir plusieurs remplacements dans une phrase?**
R: Oui! Voir l'exemple `imparfait-ex1` avec 2 remplacements.

**Q: Comment tester mon contenu?**
R: Lancez `npm run dev` et naviguez vers votre catégorie.

**Q: Les emojis sont-ils autorisés?**
R: Oui, dans les hints et explications pour rendre ça fun! ✨
