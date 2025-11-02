import { Category } from './schema';

export const categories: Category[] = [
  {
    id: 'conjugaison',
    name: 'Conjugaison',
    color: '#3B82F6',
    flashcards: [
      {
        id: 'conjugaison-present',
        title: 'Le présent de l\'indicatif',
        rule: 'Le présent exprime une action qui se déroule maintenant, une vérité générale ou une habitude. Les terminaisons varient selon le groupe du verbe.',
        examples: [
          {
            id: 'present-ex1',
            sentence: 'Je mange une pomme tous les jours.',
            imageUrl: '/assets/images/Ma boîte à outils_v1/Diapositive1.PNG',
            imageAlt: 'Illustration du présent',
            replacements: [
              {
                original: 'mange',
                replacement: 'mangeais',
                hint: '✅ Remplacement possible — c\'est l\'imparfait!',
                grammarType: 'verbe'
              }
            ]
          },
          {
            id: 'present-ex2',
            sentence: 'Tu finis tes devoirs avant de jouer.',
            imageUrl: '/assets/images/Ma boîte à outils_v1/Diapositive2.PNG',
            imageAlt: 'Enfant faisant ses devoirs'
          },
          {
            id: 'present-ex3',
            sentence: 'Nous allons à l\'école en autobus.',
            imageUrl: '/assets/images/Ma boîte à outils_v1/Diapositive3.PNG',
            imageAlt: 'Enfants dans un autobus scolaire'
          }
        ],
        practice: [
          {
            id: 'present-q1',
            type: 'mcq',
            question: 'Quelle est la terminaison correcte? « Tu chant___ une chanson. »',
            options: ['e', 'es', 'ent', 'ons'],
            correctAnswer: 'es',
            explanation: 'Au présent, avec "tu", les verbes du 1er groupe prennent "-es".'
          }
        ]
      },
      {
        id: 'conjugaison-passe-compose',
        title: 'Le passé composé',
        rule: 'Le passé composé exprime une action passée et terminée. Il se forme avec l\'auxiliaire "avoir" ou "être" au présent + le participe passé du verbe.',
        examples: [
          {
            id: 'passe-ex1',
            sentence: 'J\'ai mangé une pizza hier soir.',
            imageUrl: '/assets/images/Ma boîte à outils_v1/Diapositive4.PNG',
            imageAlt: 'Pizza',
            replacements: [
              {
                original: 'ai',
                replacement: 'avais',
                hint: '✅ Remplacement possible — c\'est le plus-que-parfait!',
                grammarType: 'verbe'
              }
            ]
          },
          {
            id: 'passe-ex2',
            sentence: 'Elle est allée au parc ce matin.',
            imageUrl: '/assets/images/Ma boîte à outils_v1/Diapositive5.PNG',
            imageAlt: 'Parc avec balançoires'
          },
          {
            id: 'passe-ex3',
            sentence: 'Nous avons fini nos exercices de mathématiques.',
            imageUrl: '/assets/images/Ma boîte à outils_v1/Diapositive6.PNG',
            imageAlt: 'Cahier de mathématiques'
          }
        ],
        practice: [
          {
            id: 'passe-q1',
            type: 'fill-blank',
            question: 'Complete: « Hier, nous _____ (aller) au cinéma. »',
            correctAnswer: 'sommes allés',
            explanation: 'Le verbe "aller" se conjugue avec l\'auxiliaire "être".'
          }
        ]
      },
      {
        id: 'conjugaison-imparfait',
        title: 'L\'imparfait de l\'indicatif',
        rule: 'L\'imparfait exprime une action passée qui durait ou se répétait. Formation: radical de "nous" au présent + terminaisons -ais, -ais, -ait, -ions, -iez, -aient.',
        examples: [
          {
            id: 'imparfait-ex1',
            sentence: 'Quand j\'étais petit, je jouais au soccer tous les samedis.',
            imageUrl: '/assets/images/Ma boîte à outils_v1/Diapositive7.PNG',
            imageAlt: 'Enfant jouant au soccer',
            replacements: [
              {
                original: 'étais',
                replacement: 'suis',
                hint: '✅ Remplacement possible — c\'est le présent!',
                grammarType: 'verbe'
              },
              {
                original: 'jouais',
                replacement: 'joue',
                hint: '✅ Remplacement possible — c\'est le présent!',
                grammarType: 'verbe'
              }
            ]
          },
          {
            id: 'imparfait-ex2',
            sentence: 'Tu finissais toujours tes devoirs avant le souper.',
            imageUrl: '/assets/images/Ma boîte à outils_v1/Diapositive8.PNG',
            imageAlt: 'Enfant étudiant'
          },
          {
            id: 'imparfait-ex3',
            sentence: 'Mes grands-parents habitaient à la campagne.',
            imageUrl: '/assets/images/Ma boîte à outils_v1/Diapositive9.PNG',
            imageAlt: 'Maison à la campagne'
          }
        ],
        practice: [
          {
            id: 'imparfait-q1',
            type: 'mcq',
            question: 'Complète: « Avant, nous _____ au parc. »',
            options: ['allons', 'allions', 'irons', 'sommes allés'],
            correctAnswer: 'allions',
            explanation: 'L\'imparfait de "aller" avec "nous" est "allions".'
          }
        ]
      },
      {
        id: 'conjugaison-plus-que-parfait',
        title: 'Le plus-que-parfait',
        rule: 'Le plus-que-parfait exprime une action passée qui s\'est produite avant une autre action passée. Formation: auxiliaire à l\'imparfait + participe passé.',
        examples: [
          {
            id: 'pqp-ex1',
            sentence: 'J\'avais déjà mangé quand tu es arrivé.',
            imageUrl: '/assets/images/Ma boîte à outils_v1/Diapositive10.PNG',
            imageAlt: 'Assiette vide',
            replacements: [
              {
                original: 'avais',
                replacement: 'ai',
                hint: '✅ Remplacement possible — c\'est le passé composé!',
                grammarType: 'verbe'
              }
            ]
          },
          {
            id: 'pqp-ex2',
            sentence: 'Elle était partie avant le début du film.',
            imageUrl: '/assets/images/Ma boîte à outils_v1/Diapositive11.PNG',
            imageAlt: 'Cinéma'
          }
        ],
        practice: [
          {
            id: 'pqp-q1',
            type: 'fill-blank',
            question: 'Complète: « Il _____ (finir) ses devoirs avant le souper. »',
            correctAnswer: 'avait fini',
            explanation: 'Plus-que-parfait = "avait" + participe passé "fini".'
          }
        ]
      },
      {
        id: 'conjugaison-futur-simple',
        title: 'Le futur simple',
        rule: 'Le futur simple exprime une action qui aura lieu dans le futur. Formation: infinitif + terminaisons -ai, -as, -a, -ons, -ez, -ont. Attention aux verbes irréguliers!',
        examples: [
          {
            id: 'futur-ex1',
            sentence: 'Demain, je mangerai des crêpes au déjeuner.',
            imageUrl: '/assets/images/Ma boîte à outils_v1/Diapositive12.PNG',
            imageAlt: 'Crêpes'
          },
          {
            id: 'futur-ex2',
            sentence: 'Tu seras content quand tu verras ton cadeau.',
            imageUrl: '/assets/images/Ma boîte à outils_v1/Diapositive13.PNG',
            imageAlt: 'Cadeau emballé'
          },
          {
            id: 'futur-ex3',
            sentence: 'L\'été prochain, nous irons à la plage.',
            imageUrl: '/assets/images/Ma boîte à outils_v1/Diapositive14.PNG',
            imageAlt: 'Plage avec parasol'
          }
        ],
        practice: [
          {
            id: 'futur-q1',
            type: 'mcq',
            question: 'Quel est le futur de "aller" avec "je"?',
            options: ['j\'allerai', 'j\'irai', 'je vais aller', 'j\'irais'],
            correctAnswer: 'j\'irai',
            explanation: '"Aller" est irrégulier au futur: j\'irai, tu iras...'
          }
        ]
      },
      {
        id: 'conjugaison-conditionnel',
        title: 'Le conditionnel présent',
        rule: 'Le conditionnel présent exprime une action possible, un souhait ou une demande polie. Formation: radical du futur + terminaisons de l\'imparfait.',
        examples: [
          {
            id: 'cond-ex1',
            sentence: 'Je voudrais un verre d\'eau, s\'il te plaît.',
            imageUrl: '/assets/images/Ma boîte à outils_v1/Diapositive15.PNG',
            imageAlt: 'Verre d\'eau'
          },
          {
            id: 'cond-ex2',
            sentence: 'Si j\'avais un chien, je le promènerais chaque jour.',
            imageUrl: '/assets/images/Ma boîte à outils_v1/Diapositive16.PNG',
            imageAlt: 'Enfant promenant un chien'
          }
        ],
        practice: [
          {
            id: 'cond-q1',
            type: 'fill-blank',
            question: 'Complète: « Tu _____ (pouvoir) m\'aider? »',
            correctAnswer: 'pourrais',
            explanation: 'Conditionnel de "pouvoir": je pourrais, tu pourrais...'
          }
        ]
      }
    ]
  },
  {
    id: 'homophones',
    name: 'Homophones',
    color: '#A855F7',
    flashcards: [
      {
        id: 'homo-a-a',
        title: 'a / à',
        titleParts: [
          { text: 'a', grammarType: 'verbe' },
          { text: ' / ' },
          { text: 'à', grammarType: 'preposition' }
        ],
        rule: '« a » est le verbe avoir au présent (3e personne). On peut le remplacer par « avait ». « à » est une préposition, elle ne change jamais.',
        examples: [
          {
            id: 'a-ex1',
            sentence: 'Il a un nouveau vélo.',
            imageUrl: '/assets/images/homophones/Presentation3/Diapositive1.PNG',
            imageAlt: 'Vélo',
            replacements: [
              {
                original: 'a',
                replacement: 'avait',
                hint: '✅ Remplacement possible — bon indice: c\'est le verbe avoir!',
                grammarType: 'verbe'
              }
            ]
          },
          {
            id: 'a-ex2',
            sentence: 'Elle va à l\'école en autobus.',
            imageUrl: '/assets/images/homophones/Presentation3/Diapositive2.PNG',
            imageAlt: 'Autobus scolaire',
            replacements: [
              {
                original: 'à',
                replacement: 'avait',
                hint: '❌ Impossible — « à » est une préposition!',
                grammarType: 'preposition'
              }
            ]
          }
        ],
        practice: [
          {
            id: 'a-q1',
            type: 'mcq',
            question: 'Choisis: « Mon ami ___ des bonbons. »',
            options: ['a', 'à'],
            correctAnswer: 'a',
            explanation: 'On peut dire "avait des bonbons", donc c\'est "a" (verbe avoir).'
          }
        ]
      },
      {
        id: 'homo-ou-ou',
        title: 'ou / où',
        titleParts: [
          { text: 'ou', grammarType: 'conjonction' },
          { text: ' / ' },
          { text: 'où', grammarType: 'pronom' }
        ],
        rule: '« ou » est une conjonction (choix). On peut le remplacer par « ou bien ». « où » indique un lieu ou un moment, il a un accent.',
        examples: [
          {
            id: 'ou-ex1',
            sentence: 'Tu préfères le chocolat ou la vanille?',
            imageUrl: '/assets/images/homophones/Presentation3/Diapositive3.PNG',
            imageAlt: 'Glaces chocolat et vanille',
            replacements: [
              {
                original: 'ou',
                replacement: 'ou bien',
                hint: '✅ Remplacement possible — c\'est la conjonction!',
                grammarType: 'conjonction'
              }
            ]
          },
          {
            id: 'ou-ex2',
            sentence: 'Où vas-tu pendant les vacances?',
            imageUrl: '/assets/images/homophones/Presentation3/Diapositive4.PNG',
            imageAlt: 'Valise de voyage',
            replacements: [
              {
                original: 'Où',
                replacement: 'dans quel endroit',
                hint: '✅ C\'est possible — « où » indique un lieu!',
                grammarType: 'pronom'
              }
            ]
          }
        ],
        practice: [
          {
            id: 'ou-q1',
            type: 'mcq',
            question: 'Choisis: « ___ est mon livre? »',
            options: ['Ou', 'Où'],
            correctAnswer: 'Où',
            explanation: 'On demande un lieu, donc c\'est "Où" avec accent.'
          }
        ]
      },
      {
        id: 'homo-et-est-es',
        title: 'et / est / es',
        titleParts: [
          { text: 'et', grammarType: 'conjonction' },
          { text: ' / ' },
          { text: 'est', grammarType: 'verbe' },
          { text: ' / ' },
          { text: 'es', grammarType: 'verbe' }
        ],
        rule: '« et » est une conjonction (addition). « est » et « es » sont le verbe être au présent. On peut les remplacer par « était » et « étais ».',
        examples: [
          {
            id: 'et-ex1',
            sentence: 'J\'aime les pommes et les oranges.',
            imageUrl: '/assets/images/homophones/Presentation3/Diapositive5.PNG',
            imageAlt: 'Pommes et oranges',
            replacements: [
              {
                original: 'et',
                replacement: 'était',
                hint: '❌ Impossible — « et » est une conjonction!',
                grammarType: 'conjonction'
              }
            ]
          },
          {
            id: 'et-ex2',
            sentence: 'Tu es mon meilleur ami.',
            imageUrl: '/assets/images/homophones/Presentation3/Diapositive6.PNG',
            imageAlt: 'Deux amis',
            replacements: [
              {
                original: 'es',
                replacement: 'étais',
                hint: '✅ Remplacement possible — c\'est le verbe être!',
                grammarType: 'verbe'
              }
            ]
          },
          {
            id: 'et-ex3',
            sentence: 'Le ciel est bleu aujourd\'hui.',
            imageUrl: '/assets/images/homophones/Presentation3/Diapositive7.PNG',
            imageAlt: 'Ciel bleu',
            replacements: [
              {
                original: 'est',
                replacement: 'était',
                hint: '✅ Remplacement possible — c\'est le verbe être!',
                grammarType: 'verbe'
              }
            ]
          }
        ],
        practice: [
          {
            id: 'et-q1',
            type: 'mcq',
            question: 'Choisis: « Il ___ gentil ___ intelligent. »',
            options: ['est, et', 'et, est', 'es, et', 'est, es'],
            correctAnswer: 'est, et',
            explanation: '"est" = verbe être (il était). "et" = conjonction (addition).'
          }
        ]
      },
      {
        id: 'homo-son-sont',
        title: 'son / sont',
        titleParts: [
          { text: 'son', grammarType: 'determinant' },
          { text: ' / ' },
          { text: 'sont', grammarType: 'verbe' }
        ],
        rule: '« son » est un déterminant possessif (comme « mon », « ton »). « sont » est le verbe être au présent (3e personne du pluriel). On peut le remplacer par « étaient ».',
        examples: [
          {
            id: 'son-ex1',
            sentence: 'Il cherche son crayon bleu.',
            imageUrl: '/assets/images/homophones/Presentation3/Diapositive8.PNG',
            imageAlt: 'Crayon bleu',
            replacements: [
              {
                original: 'son',
                replacement: 'mon',
                hint: '✅ Remplacement possible — c\'est un déterminant!',
                grammarType: 'determinant'
              }
            ]
          },
          {
            id: 'son-ex2',
            sentence: 'Mes amis sont à la bibliothèque.',
            imageUrl: '/assets/images/homophones/Presentation3/Diapositive9.PNG',
            imageAlt: 'Bibliothèque',
            replacements: [
              {
                original: 'sont',
                replacement: 'étaient',
                hint: '✅ Remplacement possible — c\'est le verbe être!',
                grammarType: 'verbe'
              }
            ]
          }
        ],
        practice: [
          {
            id: 'son-q1',
            type: 'mcq',
            question: 'Choisis: « Les enfants ___ contents. »',
            options: ['son', 'sont'],
            correctAnswer: 'sont',
            explanation: 'On peut dire "étaient contents", donc c\'est "sont" (verbe être).'
          }
        ]
      },
      {
        id: 'homo-ce-se',
        title: 'ce / se',
        titleParts: [
          { text: 'ce', grammarType: 'determinant' },
          { text: ' / ' },
          { text: 'se', grammarType: 'pronom' }
        ],
        rule: '« ce » est un déterminant démonstratif (comme « le », « cette »). « se » est un pronom réfléchi, utilisé avec les verbes pronominaux.',
        examples: [
          {
            id: 'ce-ex1',
            sentence: 'Ce livre est très intéressant.',
            replacements: [
              {
                original: 'Ce',
                replacement: 'Le',
                hint: '✅ Remplacement possible — c\'est un déterminant!',
                grammarType: 'determinant'
              }
            ]
          },
          {
            id: 'ce-ex2',
            sentence: 'Elle se lève tôt chaque matin.',
            replacements: [
              {
                original: 'se',
                replacement: 'me',
                hint: '✅ Remplacement possible — c\'est un pronom!',
                grammarType: 'pronom'
              }
            ]
          }
        ],
        practice: [
          {
            id: 'ce-q1',
            type: 'mcq',
            question: 'Choisis: « ___ chat ___ promène. »',
            options: ['Ce, se', 'Se, ce', 'Ce, ce', 'Se, se'],
            correctAnswer: 'Ce, se',
            explanation: '"Ce" = déterminant. "se" = pronom avec le verbe "se promener".'
          }
        ]
      },
      {
        id: 'homo-ca-sa',
        title: 'ça / sa',
        titleParts: [
          { text: 'ça', grammarType: 'pronom' },
          { text: ' / ' },
          { text: 'sa', grammarType: 'determinant' }
        ],
        rule: '« ça » est un pronom démonstratif (abréviation de « cela »). « sa » est un déterminant possessif (féminin de « son »).',
        examples: [
          {
            id: 'ca-ex1',
            sentence: 'Ça me fait plaisir de te voir!',
            replacements: [
              {
                original: 'Ça',
                replacement: 'Cela',
                hint: '✅ Remplacement possible — c\'est un pronom!',
                grammarType: 'pronom'
              }
            ]
          },
          {
            id: 'ca-ex2',
            sentence: 'Elle adore sa nouvelle bicyclette.',
            replacements: [
              {
                original: 'sa',
                replacement: 'ma',
                hint: '✅ Remplacement possible — c\'est un déterminant!',
                grammarType: 'determinant'
              }
            ]
          }
        ],
        practice: [
          {
            id: 'ca-q1',
            type: 'mcq',
            question: 'Choisis: « ___ sœur adore ___ ! »',
            options: ['Sa, ça', 'Ça, sa', 'Sa, sa', 'Ça, ça'],
            correctAnswer: 'Sa, ça',
            explanation: '"Sa" = déterminant possessif. "ça" = pronom (cela).'
          }
        ]
      },
      {
        id: 'homo-la-la-la',
        title: 'la / là / l\'a',
        titleParts: [
          { text: 'la', grammarType: 'determinant' },
          { text: ' / ' },
          { text: 'là', grammarType: 'adverbe' },
          { text: ' / ' },
          { text: 'l\'a', grammarType: 'verbe' }
        ],
        rule: '« la » est un déterminant ou pronom. « là » indique un lieu (a un accent). « l\'a » = le/la + a (verbe avoir), on peut dire « l\'avait ».',
        examples: [
          {
            id: 'la-ex1',
            sentence: 'Je vois la lune dans le ciel.',
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
          },
          {
            id: 'la-ex3',
            sentence: 'Marie l\'a vu hier au parc.',
            replacements: [
              {
                original: 'l\'a',
                replacement: 'l\'avait',
                hint: '✅ Remplacement possible — c\'est "le/la" + verbe avoir!',
                grammarType: 'verbe'
              }
            ]
          }
        ],
        practice: [
          {
            id: 'la-q1',
            type: 'mcq',
            question: 'Choisis: « Il ___ mange ___ . »',
            options: ['la, la', 'là, là', 'l\'a, là', 'la, l\'a'],
            correctAnswer: 'la, là',
            explanation: '"la" = pronom. "là" = adverbe de lieu.'
          }
        ]
      },
      {
        id: 'homo-ces-ses-cest',
        title: 'ces / ses / c\'est / s\'est / sais / sait',
        titleParts: [
          { text: 'ces', grammarType: 'determinant' },
          { text: ' / ' },
          { text: 'ses', grammarType: 'determinant' },
          { text: ' / ' },
          { text: 'c\'est', grammarType: 'pronom' },
          { text: ' / ' },
          { text: 's\'est', grammarType: 'verbe' },
          { text: ' / ' },
          { text: 'sais', grammarType: 'verbe' },
          { text: ' / ' },
          { text: 'sait', grammarType: 'verbe' }
        ],
        rule: '« ces » et « ses » sont des déterminants (pluriel de « ce » et « son »). « c\'est » = cela est. « s\'est » = se + est (verbe pronominal). « sais/sait » = verbe savoir.',
        examples: [
          {
            id: 'ces-ex1',
            sentence: 'Ces fleurs sont magnifiques.',
            replacements: [
              {
                original: 'Ces',
                replacement: 'Les',
                hint: '✅ Remplacement possible — c\'est un déterminant démonstratif!',
                grammarType: 'determinant'
              }
            ]
          },
          {
            id: 'ces-ex2',
            sentence: 'Elle range ses livres dans son sac.',
            replacements: [
              {
                original: 'ses',
                replacement: 'mes',
                hint: '✅ Remplacement possible — c\'est un déterminant possessif!',
                grammarType: 'determinant'
              }
            ]
          },
          {
            id: 'ces-ex3',
            sentence: 'C\'est mon meilleur ami.',
            replacements: [
              {
                original: 'C\'est',
                replacement: 'Cela est',
                hint: '✅ Remplacement possible — "c\'est" = cela est!',
                grammarType: 'pronom'
              }
            ]
          },
          {
            id: 'ces-ex4',
            sentence: 'Il s\'est blessé en jouant au soccer.',
            replacements: [
              {
                original: 's\'est',
                replacement: 'se + était',
                hint: '✅ "s\'est" = se + verbe être au passé composé!',
                grammarType: 'verbe'
              }
            ]
          },
          {
            id: 'ces-ex5',
            sentence: 'Je sais la réponse à cette question.',
            replacements: [
              {
                original: 'sais',
                replacement: 'savais',
                hint: '✅ Remplacement possible — c\'est le verbe savoir!',
                grammarType: 'verbe'
              }
            ]
          }
        ],
        practice: [
          {
            id: 'ces-q1',
            type: 'drag-drop',
            question: 'Place les mots au bon endroit:',
            options: ['ces', 'ses', 'c\'est', 's\'est', 'sais', 'sait'],
            correctAnswer: ['ces', 'ses', 'c\'est'],
            explanation: '"Ces" livres, "ses" amis, "c\'est" super.'
          }
        ]
      }
    ]
  },
  {
    id: 'orthographe',
    name: 'Orthographe',
    color: '#10B981',
    flashcards: [
      {
        id: 'ortho-placeholder',
        title: 'Orthographe d\'usage',
        rule: 'Cette section sera développée avec plus de contenus sur l\'orthographe.',
        examples: [],
        practice: []
      }
    ]
  },
  {
    id: 'grammaire',
    name: 'Grammaire',
    color: '#F97316',
    flashcards: [
      {
        id: 'gram-placeholder',
        title: 'Classes de mots',
        rule: 'Cette section sera développée avec plus de contenus sur la grammaire.',
        examples: [],
        practice: []
      }
    ]
  },
  {
    id: 'accords',
    name: 'Accords',
    color: '#EC4899',
    flashcards: [
      {
        id: 'acc-placeholder',
        title: 'Accords',
        rule: 'Cette section sera développée avec plus de contenus sur les accords.',
        examples: [],
        practice: []
      }
    ]
  },
  {
    id: 'ponctuation',
    name: 'Ponctuation',
    color: '#14B8A6',
    flashcards: [
      {
        id: 'ponc-placeholder',
        title: 'Ponctuation',
        rule: 'Cette section sera développée avec plus de contenus sur la ponctuation.',
        examples: [],
        practice: []
      }
    ]
  },
  {
    id: 'vocabulaire',
    name: 'Vocabulaire',
    color: '#6366F1',
    flashcards: [
      {
        id: 'vocab-placeholder',
        title: 'Vocabulaire',
        rule: 'Cette section sera développée avec plus de contenus sur le vocabulaire.',
        examples: [],
        practice: []
      }
    ]
  },
  {
    id: 'phrases',
    name: 'Types de phrases',
    color: '#EF4444',
    flashcards: [
      {
        id: 'phrases-placeholder',
        title: 'Types de phrases',
        rule: 'Cette section sera développée avec plus de contenus sur les types de phrases.',
        examples: [],
        practice: []
      }
    ]
  }
];
