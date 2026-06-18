/**
 * VocabForge — Grammar Exercises Database
 * 200 exercises across A1–C1 levels, 24 topics.
 * Each: { id, level, topic, type, sentence, answer, options, explanation }
 */

;(function() {
  "use strict";

  var E = [];

  function add(ex) { E.push(ex); }

  // ====== PRESENT SIMPLE (10) ======
  add({ id: "ps-1",  level: "A1", topic: "present-simple", type: "fill-blank",
    sentence: "She ___ (go) to school every day.", answer: "goes", options: [],
    explanation: "Third-person singular in present simple takes -s/-es. 'She' + 'goes'." });
  add({ id: "ps-2",  level: "A1", topic: "present-simple", type: "fill-blank",
    sentence: "They ___ (play) football on Saturdays.", answer: "play", options: [],
    explanation: "'They' is plural, so use the base form 'play' without -s." });
  add({ id: "ps-3",  level: "A1", topic: "present-simple", type: "multiple-choice",
    sentence: "He ___ coffee every morning.",
    answer: "drinks", options: ["drink", "drinks", "drinking", "is drink"],
    explanation: "Third-person singular requires -s: 'drinks'." });
  add({ id: "ps-4",  level: "A1", topic: "present-simple", type: "error-correction",
    sentence: "She don't like spinach.", answer: "She doesn't like spinach.", options: [],
    explanation: "With third-person singular (she/he/it), use 'doesn't' not 'don't'." });
  add({ id: "ps-5",  level: "A1", topic: "present-simple", type: "fill-blank",
    sentence: "The sun ___ (rise) in the east.", answer: "rises", options: [],
    explanation: "Third-person singular: rise → ris-es." });
  add({ id: "ps-6",  level: "A2", topic: "present-simple", type: "multiple-choice",
    sentence: "My parents ___ in a small village.",
    answer: "live", options: ["lives", "live", "living", "is living"],
    explanation: "'Parents' is plural, so use the base form 'live'." });
  add({ id: "ps-7",  level: "A2", topic: "present-simple", type: "fill-blank",
    sentence: "He always ___ (brush) his teeth before bed.", answer: "brushes", options: [],
    explanation: "Add -es after -sh endings: brush → brushes." });
  add({ id: "ps-8",  level: "A2", topic: "present-simple", type: "error-correction",
    sentence: "Does she goes to the gym?", answer: "Does she go to the gym?", options: [],
    explanation: "After 'does', use the base form 'go', not 'goes'." });
  add({ id: "ps-9",  level: "A1", topic: "present-simple", type: "fill-blank",
    sentence: "Water ___ (boil) at 100 degrees Celsius.", answer: "boils", options: [],
    explanation: "General truth, third-person singular: boil → boils." });
  add({ id: "ps-10", level: "B1", topic: "present-simple", type: "multiple-choice",
    sentence: "The train ___ at 8:15 tomorrow.",
    answer: "leaves", options: ["is leaving", "leaves", "will leave", "leave"],
    explanation: "For scheduled timetables, use present simple: 'leaves'." });

  // ====== PAST SIMPLE (10) ======
  add({ id: "pa-1",  level: "A1", topic: "past-simple", type: "fill-blank",
    sentence: "Yesterday I ___ (walk) to the park.", answer: "walked", options: [],
    explanation: "Regular past simple: walk + -ed = walked." });
  add({ id: "pa-2",  level: "A2", topic: "past-simple", type: "fill-blank",
    sentence: "She ___ (buy) a new dress last weekend.", answer: "bought", options: [],
    explanation: "Irregular verb: buy → bought." });
  add({ id: "pa-3",  level: "A2", topic: "past-simple", type: "multiple-choice",
    sentence: "We ___ dinner at a restaurant last night.",
    answer: "ate", options: ["eat", "ate", "eaten", "are eating"],
    explanation: "Irregular past simple: eat → ate." });
  add({ id: "pa-4",  level: "A2", topic: "past-simple", type: "error-correction",
    sentence: "He didn't went to school.", answer: "He didn't go to school.", options: [],
    explanation: "After 'didn't', use the base form: 'go', not 'went'." });
  add({ id: "pa-5",  level: "A1", topic: "past-simple", type: "fill-blank",
    sentence: "They ___ (have) a great time at the party.", answer: "had", options: [],
    explanation: "Irregular: have → had in past simple." });
  add({ id: "pa-6",  level: "A2", topic: "past-simple", type: "multiple-choice",
    sentence: "I ___ about the test yesterday.",
    answer: "forgot", options: ["forget", "forgot", "forgotten", "forgetting"],
    explanation: "Irregular past simple: forget → forgot." });
  add({ id: "pa-7",  level: "B1", topic: "past-simple", type: "fill-blank",
    sentence: "The company ___ (launch) a new product last quarter.", answer: "launched", options: [],
    explanation: "Regular past: launch + -ed = launched." });
  add({ id: "pa-8",  level: "B1", topic: "past-simple", type: "error-correction",
    sentence: "Did she saw the accident?", answer: "Did she see the accident?", options: [],
    explanation: "After 'did', use the base form 'see', not 'saw'." });
  add({ id: "pa-9",  level: "A2", topic: "past-simple", type: "fill-blank",
    sentence: "He ___ (write) a letter to his friend.", answer: "wrote", options: [],
    explanation: "Irregular: write → wrote." });
  add({ id: "pa-10", level: "B1", topic: "past-simple", type: "multiple-choice",
    sentence: "The children ___ the window while playing.",
    answer: "broke", options: ["break", "broke", "broken", "breaking"],
    explanation: "Irregular past: break → broke." });

  // ====== PRESENT PERFECT (10) ======
  add({ id: "pp-1",  level: "A2", topic: "present-perfect", type: "fill-blank",
    sentence: "I ___ (finish) my homework already.", answer: "have finished", options: [],
    explanation: "Present perfect: have/has + past participle. 'I' + 'have finished'." });
  add({ id: "pp-2",  level: "A2", topic: "present-perfect", type: "fill-blank",
    sentence: "She ___ (visit) Paris three times.", answer: "has visited", options: [],
    explanation: "'She' → 'has' + past participle 'visited'." });
  add({ id: "pp-3",  level: "B1", topic: "present-perfect", type: "multiple-choice",
    sentence: "They ___ never ___ to Japan.",
    answer: "have / been", options: ["have / went", "has / been", "have / gone", "has / was"],
    explanation: "'They have never been to Japan.' Present perfect with 'been' (visited and returned)." });
  add({ id: "pp-4",  level: "B1", topic: "present-perfect", type: "error-correction",
    sentence: "I have saw that movie before.", answer: "I have seen that movie before.", options: [],
    explanation: "Past participle of 'see' is 'seen', not 'saw'." });
  add({ id: "pp-5",  level: "A2", topic: "present-perfect", type: "fill-blank",
    sentence: "We ___ (know) each other for ten years.", answer: "have known", options: [],
    explanation: "Present perfect with 'for': have known." });
  add({ id: "pp-6",  level: "B1", topic: "present-perfect", type: "multiple-choice",
    sentence: "He ___ just ___ his lunch.",
    answer: "has / finished", options: ["have / finished", "has / finish", "had / finished", "is / finishing"],
    explanation: "'He has just finished.' Just + present perfect for very recent actions." });
  add({ id: "pp-7",  level: "B1", topic: "present-perfect", type: "fill-blank",
    sentence: "___ you ever ___ (try) sushi?", answer: "Have / tried", options: [],
    explanation: "Present perfect question: Have you ever tried sushi?" });
  add({ id: "pp-8",  level: "B2", topic: "present-perfect", type: "error-correction",
    sentence: "She has went to the store already.", answer: "She has gone to the store already.", options: [],
    explanation: "Past participle of 'go' is 'gone', not 'went'." });
  add({ id: "pp-9",  level: "B1", topic: "present-perfect", type: "fill-blank",
    sentence: "I ___ (read) this book twice.", answer: "have read", options: [],
    explanation: "Present perfect: have + read (past participle; pronounced 'red')." });
  add({ id: "pp-10", level: "B2", topic: "present-perfect", type: "multiple-choice",
    sentence: "We ___ here since 2015.",
    answer: "have lived", options: ["lived", "have lived", "are living", "live"],
    explanation: "'Since 2015' requires present perfect: 'have lived'." });

  // ====== FUTURE GOING TO (10) ======
  add({ id: "fg-1",  level: "A2", topic: "future-going-to", type: "fill-blank",
    sentence: "Look at those clouds! It ___ (rain).", answer: "is going to rain", options: [],
    explanation: "'Going to' for predictions based on present evidence." });
  add({ id: "fg-2",  level: "A2", topic: "future-going-to", type: "multiple-choice",
    sentence: "They ___ a new house next month.",
    answer: "are going to buy", options: ["are going to buy", "will buy", "buy", "buys"],
    explanation: "Planned intention: 'going to + verb'." });
  add({ id: "fg-3",  level: "A2", topic: "future-going-to", type: "fill-blank",
    sentence: "We ___ (have) a barbecue this weekend.", answer: "are going to have", options: [],
    explanation: "Present plan: am/is/are + going to + base." });
  add({ id: "fg-4",  level: "B1", topic: "future-going-to", type: "error-correction",
    sentence: "She going to study medicine.", answer: "She is going to study medicine.", options: [],
    explanation: "Don't forget 'is/am/are' before 'going to'." });
  add({ id: "fg-5",  level: "A2", topic: "future-going-to", type: "fill-blank",
    sentence: "I ___ (learn) to drive next summer.", answer: "am going to learn", options: [],
    explanation: "I + am going to + base form." });
  add({ id: "fg-6",  level: "B1", topic: "future-going-to", type: "multiple-choice",
    sentence: "He ___ his friend at the airport tonight.",
    answer: "is going to meet", options: ["meets", "is going to meet", "is meeting", "will meeting"],
    explanation: "Planned event: 'is going to meet'." });
  add({ id: "fg-7",  level: "A2", topic: "future-going-to", type: "fill-blank",
    sentence: "___ you ___ (come) to the party?", answer: "Are / going to come", options: [],
    explanation: "Question form: Are you going to come?" });
  add({ id: "fg-8",  level: "B1", topic: "future-going-to", type: "error-correction",
    sentence: "They are go to visit the museum.", answer: "They are going to visit the museum.", options: [],
    explanation: "Use 'going to' not 'go to' after 'are'." });
  add({ id: "fg-9",  level: "A2", topic: "future-going-to", type: "fill-blank",
    sentence: "The baby ___ (walk) soon — she's already standing.", answer: "is going to walk", options: [],
    explanation: "Prediction based on evidence: going to + walk." });
  add({ id: "fg-10", level: "B1", topic: "future-going-to", type: "multiple-choice",
    sentence: "I think our team ___ the championship.",
    answer: "is going to win", options: ["wins", "is going to win", "will to win", "winning"],
    explanation: "Prediction with 'I think': is going to win." });

  // ====== FUTURE WILL (10) ======
  add({ id: "fw-1",  level: "A1", topic: "future-will", type: "fill-blank",
    sentence: "I think it ___ (snow) tomorrow.", answer: "will snow", options: [],
    explanation: "Prediction/opinion with 'will': will + base form." });
  add({ id: "fw-2",  level: "A2", topic: "future-will", type: "multiple-choice",
    sentence: "Don't worry. I ___ help you with that.",
    answer: "will", options: ["am going to", "will", "am", "do"],
    explanation: "Spontaneous offer: 'I will help you.' / 'I'll help you.'" });
  add({ id: "fw-3",  level: "A2", topic: "future-will", type: "fill-blank",
    sentence: "She ___ (call) you as soon as she arrives.", answer: "will call", options: [],
    explanation: "Future promise/decision: will + base." });
  add({ id: "fw-4",  level: "B1", topic: "future-will", type: "error-correction",
    sentence: "I will to travel next year.", answer: "I will travel next year.", options: [],
    explanation: "'Will' is followed by the base verb without 'to'." });
  add({ id: "fw-5",  level: "A2", topic: "future-will", type: "fill-blank",
    sentence: "They ___ (probably / arrive) late.", answer: "will probably arrive", options: [],
    explanation: "'Will' + adverb + base form." });
  add({ id: "fw-6",  level: "B1", topic: "future-will", type: "multiple-choice",
    sentence: "This time next week, I ___ on a beach.",
    answer: "will be lying", options: ["will lie", "will be lying", "am lying", "lie"],
    explanation: "Future continuous for an action in progress at a future time." });
  add({ id: "fw-7",  level: "A2", topic: "future-will", type: "fill-blank",
    sentence: "___ you ___ (pass) me the salt, please?", answer: "Will / pass", options: [],
    explanation: "Polite request: Will you + base?" });
  add({ id: "fw-8",  level: "B1", topic: "future-will", type: "error-correction",
    sentence: "She wills come to the meeting.", answer: "She will come to the meeting.", options: [],
    explanation: "'Will' does not take -s in the third person." });
  add({ id: "fw-9",  level: "A2", topic: "future-will", type: "fill-blank",
    sentence: "I promise I ___ (not / tell) anyone.", answer: "will not tell", options: [],
    explanation: "Promise: will not (won't) + base." });
  add({ id: "fw-10", level: "B2", topic: "future-will", type: "multiple-choice",
    sentence: "By 2030, electric cars ___ the norm.",
    answer: "will have become", options: ["become", "will become", "will have become", "became"],
    explanation: "Future perfect: will have + past participle for completion before a future time." });

  // ====== PRESENT CONTINUOUS (10) ======
  add({ id: "pc-1",  level: "A1", topic: "present-continuous", type: "fill-blank",
    sentence: "She ___ (read) a book right now.", answer: "is reading", options: [],
    explanation: "Present continuous: am/is/are + verb-ing." });
  add({ id: "pc-2",  level: "A1", topic: "present-continuous", type: "multiple-choice",
    sentence: "Look! The children ___ in the garden.",
    answer: "are playing", options: ["play", "are playing", "plays", "is playing"],
    explanation: "'Children' (plural) + are playing." });
  add({ id: "pc-3",  level: "A2", topic: "present-continuous", type: "fill-blank",
    sentence: "We ___ (study) for our exams this week.", answer: "are studying", options: [],
    explanation: "Temporary situation: are + studying." });
  add({ id: "pc-4",  level: "A2", topic: "present-continuous", type: "error-correction",
    sentence: "He is run fast right now.", answer: "He is running fast right now.", options: [],
    explanation: "Present continuous requires verb + -ing: running." });
  add({ id: "pc-5",  level: "A1", topic: "present-continuous", type: "fill-blank",
    sentence: "I ___ (not / watch) TV at the moment.", answer: "am not watching", options: [],
    explanation: "Negative present continuous: am not + watching." });
  add({ id: "pc-6",  level: "B1", topic: "present-continuous", type: "multiple-choice",
    sentence: "She ___ to work while her car is being repaired.",
    answer: "is cycling", options: ["cycles", "is cycling", "cycled", "has cycled"],
    explanation: "Temporary arrangement: is cycling." });
  add({ id: "pc-7",  level: "A2", topic: "present-continuous", type: "fill-blank",
    sentence: "___ they ___ (wait) for the bus?", answer: "Are / waiting", options: [],
    explanation: "Question: Are they waiting?" });
  add({ id: "pc-8",  level: "B1", topic: "present-continuous", type: "error-correction",
    sentence: "I am understanding the lesson now.", answer: "I understand the lesson now.", options: [],
    explanation: "'Understand' is a stative verb — use present simple, not continuous." });
  add({ id: "pc-9",  level: "A2", topic: "present-continuous", type: "fill-blank",
    sentence: "The world ___ (change) rapidly.", answer: "is changing", options: [],
    explanation: "Changing situation: is + changing." });
  add({ id: "pc-10", level: "B1", topic: "present-continuous", type: "multiple-choice",
    sentence: "He ___ his uncle this weekend.",
    answer: "is visiting", options: ["visits", "is visiting", "visit", "visited"],
    explanation: "Fixed arrangement: is visiting." });

  // ====== PAST CONTINUOUS (10) ======
  add({ id: "pac-1", level: "A2", topic: "past-continuous", type: "fill-blank",
    sentence: "I ___ (cook) dinner when the phone rang.", answer: "was cooking", options: [],
    explanation: "Past continuous for interrupted action: was + cooking." });
  add({ id: "pac-2", level: "A2", topic: "past-continuous", type: "multiple-choice",
    sentence: "They ___ TV at 9 PM last night.",
    answer: "were watching", options: ["watched", "were watching", "are watching", "watch"],
    explanation: "Action in progress at a past time: were watching." });
  add({ id: "pac-3", level: "B1", topic: "past-continuous", type: "fill-blank",
    sentence: "While she ___ (sleep), someone knocked on the door.", answer: "was sleeping", options: [],
    explanation: "Two simultaneous past actions: was sleeping (background)." });
  add({ id: "pac-4", level: "B1", topic: "past-continuous", type: "error-correction",
    sentence: "He were walking home when it started to rain.", answer: "He was walking home when it started to rain.", options: [],
    explanation: "'He' takes 'was', not 'were'." });
  add({ id: "pac-5", level: "A2", topic: "past-continuous", type: "fill-blank",
    sentence: "We ___ (not / listen) to the teacher.", answer: "were not listening", options: [],
    explanation: "Negative: were not (weren't) + listening." });
  add({ id: "pac-6", level: "B1", topic: "past-continuous", type: "multiple-choice",
    sentence: "The sun ___ when we left the house.",
    answer: "was shining", options: ["shone", "was shining", "shines", "is shining"],
    explanation: "Background action in the past: was shining." });
  add({ id: "pac-7", level: "A2", topic: "past-continuous", type: "fill-blank",
    sentence: "___ you ___ (work) at 6 PM yesterday?", answer: "Were / working", options: [],
    explanation: "Question: Were you working?" });
  add({ id: "pac-8", level: "B1", topic: "past-continuous", type: "error-correction",
    sentence: "I was read when she called.", answer: "I was reading when she called.", options: [],
    explanation: "Past continuous requires verb + -ing: reading." });
  add({ id: "pac-9", level: "B1", topic: "past-continuous", type: "fill-blank",
    sentence: "The children ___ (play) outside all afternoon.", answer: "were playing", options: [],
    explanation: "Duration in the past: were playing." });
  add({ id: "pac-10", level: "B2", topic: "past-continuous", type: "multiple-choice",
    sentence: "She ___ along the beach when she found a shell.",
    answer: "was walking", options: ["walked", "was walking", "walks", "is walking"],
    explanation: "Background action interrupted by a discovery: was walking." });

  // ====== PRESENT PERFECT CONTINUOUS (10) ======
  add({ id: "ppc-1", level: "B1", topic: "present-perfect-continuous", type: "fill-blank",
    sentence: "I ___ (wait) for over an hour.", answer: "have been waiting", options: [],
    explanation: "Present perfect continuous: have been + waiting (duration)." });
  add({ id: "ppc-2", level: "B1", topic: "present-perfect-continuous", type: "multiple-choice",
    sentence: "She ___ all morning and she's exhausted.",
    answer: "has been studying", options: ["has studied", "has been studying", "studied", "is studying"],
    explanation: "Emphasizes duration: has been studying." });
  add({ id: "ppc-3", level: "B1", topic: "present-perfect-continuous", type: "fill-blank",
    sentence: "How long ___ you ___ (learn) English?", answer: "have / been learning", options: [],
    explanation: "How long + have + been + learning." });
  add({ id: "ppc-4", level: "B2", topic: "present-perfect-continuous", type: "error-correction",
    sentence: "He has been work here since June.", answer: "He has been working here since June.", options: [],
    explanation: "Present perfect continuous requires verb + -ing: working." });
  add({ id: "ppc-5", level: "B1", topic: "present-perfect-continuous", type: "fill-blank",
    sentence: "They ___ (live) in this city for five years.", answer: "have been living", options: [],
    explanation: "Duration with 'for': have been living." });
  add({ id: "ppc-6", level: "B2", topic: "present-perfect-continuous", type: "multiple-choice",
    sentence: "My eyes are red because I ___ all day.",
    answer: "have been reading", options: ["read", "have been reading", "have read", "am reading"],
    explanation: "Present result of a continuous past action: have been reading." });
  add({ id: "ppc-7", level: "B1", topic: "present-perfect-continuous", type: "fill-blank",
    sentence: "We ___ (not / feel) well lately.", answer: "have not been feeling", options: [],
    explanation: "Negative: have not been feeling." });
  add({ id: "ppc-8", level: "B2", topic: "present-perfect-continuous", type: "error-correction",
    sentence: "She have been practicing for hours.", answer: "She has been practicing for hours.", options: [],
    explanation: "'She' takes 'has', not 'have'." });
  add({ id: "ppc-9", level: "B1", topic: "present-perfect-continuous", type: "fill-blank",
    sentence: "It ___ (rain) all day.", answer: "has been raining", options: [],
    explanation: "Ongoing weather: has been raining." });
  add({ id: "ppc-10", level: "B2", topic: "present-perfect-continuous", type: "multiple-choice",
    sentence: "He ___ guitar since he was twelve.",
    answer: "has been playing", options: ["plays", "has been playing", "has played", "is playing"],
    explanation: "'Since' + present perfect continuous for ongoing activity." });

  // ====== COMPARATIVES (10) ======
  add({ id: "co-1",  level: "A2", topic: "comparatives", type: "fill-blank",
    sentence: "My house is ___ (big) than yours.", answer: "bigger", options: [],
    explanation: "One-syllable adjective: double the consonant + -er → bigger." });
  add({ id: "co-2",  level: "A2", topic: "comparatives", type: "multiple-choice",
    sentence: "This book is ___ than the last one.",
    answer: "more interesting", options: ["interestinger", "more interesting", "most interesting", "interestinger"],
    explanation: "Long adjectives (3+ syllables): more + adjective." });
  add({ id: "co-3",  level: "A2", topic: "comparatives", type: "fill-blank",
    sentence: "She is ___ (tall) her brother.", answer: "taller than", options: [],
    explanation: "Comparative + than: taller than." });
  add({ id: "co-4",  level: "B1", topic: "comparatives", type: "error-correction",
    sentence: "He is more taller than his father.", answer: "He is taller than his father.", options: [],
    explanation: "Don't use 'more' with -er comparatives. Use one or the other." });
  add({ id: "co-5",  level: "A2", topic: "comparatives", type: "fill-blank",
    sentence: "This test is ___ (easy) the last one.", answer: "easier than", options: [],
    explanation: "Two-syllable adjective ending in -y: easier than." });
  add({ id: "co-6",  level: "B1", topic: "comparatives", type: "multiple-choice",
    sentence: "Today is ___ than yesterday.",
    answer: "much colder", options: ["more cold", "much colder", "coldest", "most cold"],
    explanation: "'Much' intensifies comparatives: much colder." });
  add({ id: "co-7",  level: "A2", topic: "comparatives", type: "fill-blank",
    sentence: "Cars are ___ (expensive) bicycles.", answer: "more expensive than", options: [],
    explanation: "Long adjective: more expensive than." });
  add({ id: "co-8",  level: "B1", topic: "comparatives", type: "error-correction",
    sentence: "She is the more intelligent student in class.", answer: "She is the most intelligent student in class.", options: [],
    explanation: "Superlative (not comparative) for 'in class' comparison: most intelligent." });
  add({ id: "co-9",  level: "B1", topic: "comparatives", type: "fill-blank",
    sentence: "This is ___ (bad) restaurant I've ever been to.", answer: "the worst", options: [],
    explanation: "Superlative of 'bad' is 'worst'." });
  add({ id: "co-10", level: "B1", topic: "comparatives", type: "multiple-choice",
    sentence: "The movie was ___ than I expected.",
    answer: "far better", options: ["far better", "more better", "far good", "more good"],
    explanation: "'Far' + comparative: far better. 'Better' is already comparative." });

  // ====== SUPERLATIVES (10) ======
  add({ id: "su-1",  level: "A2", topic: "superlatives", type: "fill-blank",
    sentence: "Mount Everest is ___ (high) mountain in the world.", answer: "the highest", options: [],
    explanation: "Superlative: the + highest (one-syllable: -est)." });
  add({ id: "su-2",  level: "A2", topic: "superlatives", type: "multiple-choice",
    sentence: "She is ___ student in the class.",
    answer: "the smartest", options: ["smarter", "the smartest", "most smart", "more smart"],
    explanation: "Superlative: the + smartest." });
  add({ id: "su-3",  level: "A2", topic: "superlatives", type: "fill-blank",
    sentence: "This is ___ (good) cake I've ever tasted.", answer: "the best", options: [],
    explanation: "Irregular superlative: good → the best." });
  add({ id: "su-4",  level: "B1", topic: "superlatives", type: "error-correction",
    sentence: "He is the most tallest player on the team.", answer: "He is the tallest player on the team.", options: [],
    explanation: "Don't use 'most' with -est. Use one or the other." });
  add({ id: "su-5",  level: "A2", topic: "superlatives", type: "fill-blank",
    sentence: "That was ___ (bad) day of my life.", answer: "the worst", options: [],
    explanation: "Irregular: bad → the worst." });
  add({ id: "su-6",  level: "B1", topic: "superlatives", type: "multiple-choice",
    sentence: "This is ___ building in the city.",
    answer: "the most modern", options: ["modernest", "the most modern", "the modernest", "most modern"],
    explanation: "Long adjective: the most modern." });
  add({ id: "su-7",  level: "A2", topic: "superlatives", type: "fill-blank",
    sentence: "She is ___ (beautiful) woman I know.", answer: "the most beautiful", options: [],
    explanation: "Three-syllable adjective: the most beautiful." });
  add({ id: "su-8",  level: "B1", topic: "superlatives", type: "error-correction",
    sentence: "It was the more exciting game of the season.", answer: "It was the most exciting game of the season.", options: [],
    explanation: "Superlative (not comparative) for 'of the season': most exciting." });
  add({ id: "su-9",  level: "B1", topic: "superlatives", type: "fill-blank",
    sentence: "January is ___ (cold) month here.", answer: "the coldest", options: [],
    explanation: "One-syllable: the coldest." });
  add({ id: "su-10", level: "B1", topic: "superlatives", type: "multiple-choice",
    sentence: "That was ___ meal I've ever had.",
    answer: "the most delicious", options: ["deliciousest", "the most delicious", "the deliciousest", "most delicious"],
    explanation: "Four-syllable adjective: the most delicious." });

  // ====== MODALS: CAN (10) ======
  add({ id: "mc-1",  level: "A1", topic: "modals-can", type: "fill-blank",
    sentence: "She ___ (can) speak three languages.", answer: "can", options: [],
    explanation: "'Can' is a modal verb — it doesn't take -s for third person." });
  add({ id: "mc-2",  level: "A1", topic: "modals-can", type: "multiple-choice",
    sentence: "___ you help me with this bag?",
    answer: "Can", options: ["Do", "Are", "Can", "Will"],
    explanation: "Request with 'Can you...?'" });
  add({ id: "mc-3",  level: "A2", topic: "modals-can", type: "fill-blank",
    sentence: "I ___ (not / can) swim when I was young.", answer: "could not", options: [],
    explanation: "Past of 'can' is 'could'. Negative: could not / couldn't." });
  add({ id: "mc-4",  level: "A2", topic: "modals-can", type: "error-correction",
    sentence: "She cans play the piano.", answer: "She can play the piano.", options: [],
    explanation: "Modal 'can' never takes -s: 'can play', not 'cans play'." });
  add({ id: "mc-5",  level: "A1", topic: "modals-can", type: "fill-blank",
    sentence: "___ I borrow your pen?", answer: "Can", options: [],
    explanation: "Asking permission: Can I...?" });
  add({ id: "mc-6",  level: "B1", topic: "modals-can", type: "multiple-choice",
    sentence: "You ___ see the mountains from here on a clear day.",
    answer: "can", options: ["can", "must", "should", "have to"],
    explanation: "Ability/possibility: can." });
  add({ id: "mc-7",  level: "A2", topic: "modals-can", type: "fill-blank",
    sentence: "They ___ (not / can) find the hotel.", answer: "could not", options: [],
    explanation: "Past inability: could not / couldn't." });
  add({ id: "mc-8",  level: "B1", topic: "modals-can", type: "error-correction",
    sentence: "He can to drive a truck.", answer: "He can drive a truck.", options: [],
    explanation: "'Can' is followed by the base verb without 'to'." });
  add({ id: "mc-9",  level: "A2", topic: "modals-can", type: "fill-blank",
    sentence: "We ___ (can / not) hear you. Speak louder!", answer: "cannot", options: [],
    explanation: "Present inability: cannot / can't." });
  add({ id: "mc-10", level: "B1", topic: "modals-can", type: "multiple-choice",
    sentence: "That ___ be true — it's impossible!",
    answer: "can't", options: ["can't", "mustn't", "shouldn't", "doesn't"],
    explanation: "Impossibility: can't." });

  // ====== MODALS: MUST (10) ======
  add({ id: "mm-1",  level: "A2", topic: "modals-must", type: "fill-blank",
    sentence: "You ___ (must) wear a seatbelt in the car.", answer: "must", options: [],
    explanation: "Obligation: must + base verb." });
  add({ id: "mm-2",  level: "A2", topic: "modals-must", type: "multiple-choice",
    sentence: "Students ___ arrive on time for the exam.",
    answer: "must", options: ["must", "can", "might", "would"],
    explanation: "Strong obligation: must." });
  add({ id: "mm-3",  level: "B1", topic: "modals-must", type: "fill-blank",
    sentence: "You ___ (not / must) park here. It's forbidden.", answer: "must not", options: [],
    explanation: "Prohibition: must not / mustn't." });
  add({ id: "mm-4",  level: "B1", topic: "modals-must", type: "error-correction",
    sentence: "You must to finish your homework.", answer: "You must finish your homework.", options: [],
    explanation: "'Must' + base verb, no 'to'." });
  add({ id: "mm-5",  level: "A2", topic: "modals-must", type: "fill-blank",
    sentence: "She ___ (must) be at home. The lights are on.", answer: "must", options: [],
    explanation: "Logical deduction: must (I'm sure this is true)." });
  add({ id: "mm-6",  level: "B1", topic: "modals-must", type: "multiple-choice",
    sentence: "You ___ have seen him — he's been on holiday.",
    answer: "can't", options: ["must", "can't", "should", "might"],
    explanation: "Negative deduction: can't have (it's impossible)." });
  add({ id: "mm-7",  level: "B1", topic: "modals-must", type: "fill-blank",
    sentence: "You ___ (not / must) tell anyone. It's a secret.", answer: "must not", options: [],
    explanation: "Prohibition: must not tell." });
  add({ id: "mm-8",  level: "B2", topic: "modals-must", type: "error-correction",
    sentence: "He must studies harder to pass.", answer: "He must study harder to pass.", options: [],
    explanation: "After 'must', use the base form 'study', not 'studies'." });
  add({ id: "mm-9",  level: "B1", topic: "modals-must", type: "fill-blank",
    sentence: "You ___ (must / not) eat so much sugar. It's bad for you.", answer: "must not", options: [],
    explanation: "Strong advice against: must not." });
  add({ id: "mm-10", level: "B2", topic: "modals-must", type: "multiple-choice",
    sentence: "She ___ have left already — her car is gone.",
    answer: "must", options: ["must", "can", "should", "might"],
    explanation: "Logical deduction about the past: must have." });

  // ====== MODALS: SHOULD (10) ======
  add({ id: "ms-1",  level: "A2", topic: "modals-should", type: "fill-blank",
    sentence: "You ___ (should) see a doctor if you feel ill.", answer: "should", options: [],
    explanation: "Advice: should + base verb." });
  add({ id: "ms-2",  level: "A2", topic: "modals-should", type: "multiple-choice",
    sentence: "I think you ___ apologize to her.",
    answer: "should", options: ["should", "must", "can", "will"],
    explanation: "Advice/opinion: should." });
  add({ id: "ms-3",  level: "B1", topic: "modals-should", type: "fill-blank",
    sentence: "You ___ (not / should) eat so fast.", answer: "should not", options: [],
    explanation: "Negative advice: should not / shouldn't." });
  add({ id: "ms-4",  level: "B1", topic: "modals-should", type: "error-correction",
    sentence: "She should to rest more.", answer: "She should rest more.", options: [],
    explanation: "'Should' + base verb, no 'to'." });
  add({ id: "ms-5",  level: "A2", topic: "modals-should", type: "fill-blank",
    sentence: "___ I open the window?", answer: "Should", options: [],
    explanation: "Asking for advice: Should I...?" });
  add({ id: "ms-6",  level: "B1", topic: "modals-should", type: "multiple-choice",
    sentence: "They ___ have asked before taking the car.",
    answer: "should", options: ["should", "must", "can", "will"],
    explanation: "Past regret/criticism: should have + past participle." });
  add({ id: "ms-7",  level: "B1", topic: "modals-should", type: "fill-blank",
    sentence: "You ___ (should / not) worry so much.", answer: "should not", options: [],
    explanation: "Advice against: should not worry." });
  add({ id: "ms-8",  level: "B2", topic: "modals-should", type: "error-correction",
    sentence: "He should has told the truth.", answer: "He should have told the truth.", options: [],
    explanation: "Should have + past participle (not 'has')." });
  add({ id: "ms-9",  level: "B1", topic: "modals-should", type: "fill-blank",
    sentence: "We ___ (should) leave early to avoid traffic.", answer: "should", options: [],
    explanation: "Recommendation: should leave." });
  add({ id: "ms-10", level: "B2", topic: "modals-should", type: "multiple-choice",
    sentence: "You ___ me you were leaving!",
    answer: "should have told", options: ["should tell", "should have told", "must tell", "told"],
    explanation: "Past criticism: should have told." });

  // ====== CONDITIONALS: ZERO (10) ======
  add({ id: "cz-1",  level: "A2", topic: "conditionals-zero", type: "fill-blank",
    sentence: "If you ___ (heat) water to 100°C, it ___ (boil).", answer: "heat / boils", options: [],
    explanation: "Zero conditional: if + present simple, present simple (general truths)." });
  add({ id: "cz-2",  level: "A2", topic: "conditionals-zero", type: "multiple-choice",
    sentence: "If you mix red and blue, you ___ purple.",
    answer: "get", options: ["will get", "get", "got", "would get"],
    explanation: "Zero conditional: present simple in both clauses." });
  add({ id: "cz-3",  level: "B1", topic: "conditionals-zero", type: "fill-blank",
    sentence: "If it ___ (rain), the ground ___ (get) wet.", answer: "rains / gets", options: [],
    explanation: "Zero conditional for natural consequences." });
  add({ id: "cz-4",  level: "B1", topic: "conditionals-zero", type: "error-correction",
    sentence: "If you will heat ice, it melts.", answer: "If you heat ice, it melts.", options: [],
    explanation: "Zero conditional uses present simple, not 'will'." });
  add({ id: "cz-5",  level: "A2", topic: "conditionals-zero", type: "fill-blank",
    sentence: "Plants ___ (die) if they ___ (not / get) water.", answer: "die / do not get", options: [],
    explanation: "Zero conditional: present simple in both clauses." });
  add({ id: "cz-6",  level: "B1", topic: "conditionals-zero", type: "multiple-choice",
    sentence: "If you don't eat, you ___ hungry.",
    answer: "get", options: ["will get", "got", "get", "would get"],
    explanation: "Zero conditional: present simple result." });
  add({ id: "cz-7",  level: "A2", topic: "conditionals-zero", type: "fill-blank",
    sentence: "If you ___ (press) this button, the door ___ (open).", answer: "press / opens", options: [],
    explanation: "Zero conditional for instructions/mechanisms." });
  add({ id: "cz-8",  level: "B1", topic: "conditionals-zero", type: "error-correction",
    sentence: "If I will feel tired, I go to bed early.", answer: "If I feel tired, I go to bed early.", options: [],
    explanation: "No 'will' in the if-clause of zero conditional." });
  add({ id: "cz-9",  level: "B1", topic: "conditionals-zero", type: "fill-blank",
    sentence: "If you ___ (not / water) plants, they ___ (die).", answer: "do not water / die", options: [],
    explanation: "Zero conditional: present simple throughout." });
  add({ id: "cz-10", level: "B1", topic: "conditionals-zero", type: "multiple-choice",
    sentence: "If you drop glass, it ___ .",
    answer: "breaks", options: ["will break", "broke", "breaks", "would break"],
    explanation: "Zero conditional: present simple for what always happens." });

  // ====== CONDITIONALS: FIRST (10) ======
  add({ id: "cf-1",  level: "A2", topic: "conditionals-first", type: "fill-blank",
    sentence: "If it ___ (rain) tomorrow, we ___ (stay) home.", answer: "rains / will stay", options: [],
    explanation: "First conditional: if + present simple, will + base." });
  add({ id: "cf-2",  level: "A2", topic: "conditionals-first", type: "multiple-choice",
    sentence: "If you study hard, you ___ the exam.",
    answer: "will pass", options: ["pass", "will pass", "passed", "would pass"],
    explanation: "First conditional: will + base for likely future result." });
  add({ id: "cf-3",  level: "B1", topic: "conditionals-first", type: "fill-blank",
    sentence: "If she ___ (come) early, we ___ (have) time to talk.", answer: "comes / will have", options: [],
    explanation: "First conditional: if + present, will + base." });
  add({ id: "cf-4",  level: "B1", topic: "conditionals-first", type: "error-correction",
    sentence: "If I will see him, I will tell him.", answer: "If I see him, I will tell him.", options: [],
    explanation: "No 'will' in the if-clause of first conditional." });
  add({ id: "cf-5",  level: "A2", topic: "conditionals-first", type: "fill-blank",
    sentence: "If they ___ (not / hurry), they ___ (miss) the bus.", answer: "do not hurry / will miss", options: [],
    explanation: "First conditional: if + present negative, will + base." });
  add({ id: "cf-6",  level: "B1", topic: "conditionals-first", type: "multiple-choice",
    sentence: "Unless you run, you ___ the train.",
    answer: "will miss", options: ["miss", "will miss", "missed", "would miss"],
    explanation: "'Unless' = if not. First conditional: will miss." });
  add({ id: "cf-7",  level: "A2", topic: "conditionals-first", type: "fill-blank",
    sentence: "If he ___ (ask), I ___ (help) him.", answer: "asks / will help", options: [],
    explanation: "First conditional: if + present, will + base." });
  add({ id: "cf-8",  level: "B1", topic: "conditionals-first", type: "error-correction",
    sentence: "If she will call, I answer the phone.", answer: "If she calls, I will answer the phone.", options: [],
    explanation: "First conditional: if + present, will + base (not 'will' in if-clause)." });
  add({ id: "cf-9",  level: "B1", topic: "conditionals-first", type: "fill-blank",
    sentence: "If we ___ (leave) now, we ___ (arrive) on time.", answer: "leave / will arrive", options: [],
    explanation: "First conditional for a real future possibility." });
  add({ id: "cf-10", level: "B1", topic: "conditionals-first", type: "multiple-choice",
    sentence: "If the weather is nice, we ___ a picnic.",
    answer: "will have", options: ["have", "will have", "had", "would have"],
    explanation: "First conditional: will have." });

  // ====== CONDITIONALS: SECOND (10) ======
  add({ id: "cs-1",  level: "B1", topic: "conditionals-second", type: "fill-blank",
    sentence: "If I ___ (have) more money, I ___ (travel) the world.", answer: "had / would travel", options: [],
    explanation: "Second conditional: if + past simple, would + base." });
  add({ id: "cs-2",  level: "B1", topic: "conditionals-second", type: "multiple-choice",
    sentence: "If I ___ rich, I would travel.",
    answer: "were", options: ["was", "were", "am", "be"],
    explanation: "Second conditional: 'were' is standard for all persons (subjunctive)." });
  add({ id: "cs-3",  level: "B1", topic: "conditionals-second", type: "fill-blank",
    sentence: "If she ___ (know) the answer, she ___ (tell) us.", answer: "knew / would tell", options: [],
    explanation: "Second conditional: if + past, would + base." });
  add({ id: "cs-4",  level: "B2", topic: "conditionals-second", type: "error-correction",
    sentence: "If I would have time, I would help you.", answer: "If I had time, I would help you.", options: [],
    explanation: "Second conditional uses past simple (not 'would') in the if-clause." });
  add({ id: "cs-5",  level: "B1", topic: "conditionals-second", type: "fill-blank",
    sentence: "If they ___ (live) closer, we ___ (visit) them more often.", answer: "lived / would visit", options: [],
    explanation: "Second conditional: if + past simple, would + base." });
  add({ id: "cs-6",  level: "B2", topic: "conditionals-second", type: "multiple-choice",
    sentence: "If he ___ more careful, he wouldn't make so many mistakes.",
    answer: "were", options: ["was", "were", "is", "be"],
    explanation: "Second conditional: 'were' for all persons." });
  add({ id: "cs-7",  level: "B1", topic: "conditionals-second", type: "fill-blank",
    sentence: "If I ___ (be) you, I ___ (accept) the offer.", answer: "were / would accept", options: [],
    explanation: "Second conditional advice: If I were you, I would..." });
  add({ id: "cs-8",  level: "B2", topic: "conditionals-second", type: "error-correction",
    sentence: "If she would study harder, she would pass.", answer: "If she studied harder, she would pass.", options: [],
    explanation: "Second conditional: past simple in if-clause, not 'would'." });
  add({ id: "cs-9",  level: "B1", topic: "conditionals-second", type: "fill-blank",
    sentence: "If we ___ (not / be) so busy, we ___ (go) out.", answer: "were not / would go", options: [],
    explanation: "Second conditional: if + past negative, would + base." });
  add({ id: "cs-10", level: "B2", topic: "conditionals-second", type: "multiple-choice",
    sentence: "What ___ you ___ if you won the lottery?",
    answer: "would / do", options: ["will / do", "would / do", "do / do", "did / do"],
    explanation: "Second conditional question: would + base." });

  // ====== PASSIVE: PRESENT (10) ======
  add({ id: "pv-1",  level: "B1", topic: "passive-present", type: "fill-blank",
    sentence: "English ___ (speak) in many countries.", answer: "is spoken", options: [],
    explanation: "Present passive: is/am/are + past participle." });
  add({ id: "pv-2",  level: "B1", topic: "passive-present", type: "multiple-choice",
    sentence: "This car ___ in Germany.",
    answer: "is made", options: ["makes", "is made", "made", "is making"],
    explanation: "Present passive: is + made." });
  add({ id: "pv-3",  level: "B1", topic: "passive-present", type: "fill-blank",
    sentence: "The letters ___ (deliver) every morning.", answer: "are delivered", options: [],
    explanation: "Present passive: are + delivered." });
  add({ id: "pv-4",  level: "B2", topic: "passive-present", type: "error-correction",
    sentence: "The cake is bake every morning.", answer: "The cake is baked every morning.", options: [],
    explanation: "Passive requires past participle: baked, not bake." });
  add({ id: "pv-5",  level: "B1", topic: "passive-present", type: "fill-blank",
    sentence: "Rice ___ (grow) in Asia.", answer: "is grown", options: [],
    explanation: "Present passive: is + grown." });
  add({ id: "pv-6",  level: "B2", topic: "passive-present", type: "multiple-choice",
    sentence: "The office ___ every evening.",
    answer: "is cleaned", options: ["cleans", "is cleaned", "cleaned", "is cleaning"],
    explanation: "Present passive: is cleaned." });
  add({ id: "pv-7",  level: "B1", topic: "passive-present", type: "fill-blank",
    sentence: "Thousands of books ___ (sell) every day.", answer: "are sold", options: [],
    explanation: "Present passive: are + sold." });
  add({ id: "pv-8",  level: "B2", topic: "passive-present", type: "error-correction",
    sentence: "The windows is washed weekly.", answer: "The windows are washed weekly.", options: [],
    explanation: "'Windows' (plural) takes 'are', not 'is'." });
  add({ id: "pv-9",  level: "B1", topic: "passive-present", type: "fill-blank",
    sentence: "This song ___ (love) by millions.", answer: "is loved", options: [],
    explanation: "Present passive: is + loved." });
  add({ id: "pv-10", level: "B2", topic: "passive-present", type: "multiple-choice",
    sentence: "The report ___ by the manager every Friday.",
    answer: "is reviewed", options: ["reviews", "is reviewed", "reviewed", "reviewing"],
    explanation: "Present passive: is reviewed." });

  // ====== PASSIVE: PAST (10) ======
  add({ id: "pv-11", level: "B1", topic: "passive-past", type: "fill-blank",
    sentence: "The bridge ___ (build) in 1920.", answer: "was built", options: [],
    explanation: "Past passive: was/were + past participle." });
  add({ id: "pv-12", level: "B1", topic: "passive-past", type: "multiple-choice",
    sentence: "The Mona Lisa ___ by Leonardo da Vinci.",
    answer: "was painted", options: ["painted", "was painted", "is painted", "paints"],
    explanation: "Past passive: was + painted." });
  add({ id: "pv-13", level: "B1", topic: "passive-past", type: "fill-blank",
    sentence: "The thieves ___ (catch) by the police.", answer: "were caught", options: [],
    explanation: "Past passive: were + caught." });
  add({ id: "pv-14", level: "B2", topic: "passive-past", type: "error-correction",
    sentence: "The letter was send yesterday.", answer: "The letter was sent yesterday.", options: [],
    explanation: "Past participle of 'send' is 'sent', not 'send'." });
  add({ id: "pv-15", level: "B1", topic: "passive-past", type: "fill-blank",
    sentence: "The building ___ (destroy) in the fire.", answer: "was destroyed", options: [],
    explanation: "Past passive: was + destroyed." });
  add({ id: "pv-16", level: "B2", topic: "passive-past", type: "multiple-choice",
    sentence: "The guests ___ to the party at 7 PM.",
    answer: "were invited", options: ["invited", "were invited", "was invited", "invite"],
    explanation: "Past passive (plural): were invited." });
  add({ id: "pv-17", level: "B1", topic: "passive-past", type: "fill-blank",
    sentence: "The window ___ (break) during the storm.", answer: "was broken", options: [],
    explanation: "Past passive: was + broken." });
  add({ id: "pv-18", level: "B2", topic: "passive-past", type: "error-correction",
    sentence: "The children was given new toys.", answer: "The children were given new toys.", options: [],
    explanation: "'Children' (plural) takes 'were', not 'was'." });
  add({ id: "pv-19", level: "B1", topic: "passive-past", type: "fill-blank",
    sentence: "The phone ___ (invent) in 1876.", answer: "was invented", options: [],
    explanation: "Past passive: was + invented." });
  add({ id: "pv-20", level: "B2", topic: "passive-past", type: "multiple-choice",
    sentence: "The documents ___ before the meeting.",
    answer: "were prepared", options: ["prepared", "were prepared", "was prepared", "prepare"],
    explanation: "Past passive (plural): were prepared." });

  // ====== REPORTED SPEECH (10) ======
  add({ id: "rs-1",  level: "B1", topic: "reported-speech", type: "fill-blank",
    sentence: "She said, 'I am tired.' → She said she ___ tired.", answer: "was", options: [],
    explanation: "Reported speech: present → past. 'am' → 'was'." });
  add({ id: "rs-2",  level: "B1", topic: "reported-speech", type: "multiple-choice",
    sentence: "He said, 'I will come.' → He said he ___ come.",
    answer: "would", options: ["will", "would", "can", "could"],
    explanation: "'Will' becomes 'would' in reported speech." });
  add({ id: "rs-3",  level: "B1", topic: "reported-speech", type: "fill-blank",
    sentence: "They said, 'We have finished.' → They said they ___ finished.", answer: "had", options: [],
    explanation: "Present perfect → past perfect in reported speech." });
  add({ id: "rs-4",  level: "B2", topic: "reported-speech", type: "error-correction",
    sentence: "She said that she is happy.", answer: "She said that she was happy.", options: [],
    explanation: "Backshift: present → past in reported speech." });
  add({ id: "rs-5",  level: "B1", topic: "reported-speech", type: "fill-blank",
    sentence: "He said, 'I can swim.' → He said he ___ swim.", answer: "could", options: [],
    explanation: "'Can' becomes 'could' in reported speech." });
  add({ id: "rs-6",  level: "B2", topic: "reported-speech", type: "multiple-choice",
    sentence: "She asked me where I ___ .",
    answer: "lived", options: ["live", "lived", "living", "lives"],
    explanation: "Backshift in reported questions: live → lived." });
  add({ id: "rs-7",  level: "B1", topic: "reported-speech", type: "fill-blank",
    sentence: "He said, 'I went to the store.' → He said he ___ to the store.", answer: "had gone", options: [],
    explanation: "Past simple → past perfect in reported speech." });
  add({ id: "rs-8",  level: "B2", topic: "reported-speech", type: "error-correction",
    sentence: "He told that he was busy.", answer: "He said that he was busy.", options: [],
    explanation: "Use 'say that' not 'tell that'. 'Tell' needs an object: 'told me that'." });
  add({ id: "rs-9",  level: "B1", topic: "reported-speech", type: "fill-blank",
    sentence: "She said, 'I may come.' → She said she ___ come.", answer: "might", options: [],
    explanation: "'May' becomes 'might' in reported speech." });
  add({ id: "rs-10", level: "B2", topic: "reported-speech", type: "multiple-choice",
    sentence: "The teacher asked us ___ our homework.",
    answer: "to bring", options: ["bring", "to bring", "bringing", "brought"],
    explanation: "Reported request: asked + object + to + base." });

  // ====== RELATIVE CLAUSES (10) ======
  add({ id: "rc-1",  level: "A2", topic: "relative-clauses", type: "fill-blank",
    sentence: "The woman ___ lives next door is a doctor.", answer: "who", options: [],
    explanation: "'Who' is the subject relative pronoun for people." });
  add({ id: "rc-2",  level: "A2", topic: "relative-clauses", type: "multiple-choice",
    sentence: "The book ___ I bought was expensive.",
    answer: "that", options: ["who", "that", "where", "when"],
    explanation: "'That' (or 'which') for things as the object of the relative clause." });
  add({ id: "rc-3",  level: "B1", topic: "relative-clauses", type: "fill-blank",
    sentence: "This is the house ___ I grew up.", answer: "where", options: [],
    explanation: "'Where' is the relative adverb for places." });
  add({ id: "rc-4",  level: "B1", topic: "relative-clauses", type: "error-correction",
    sentence: "The man which called you is my uncle.", answer: "The man who called you is my uncle.", options: [],
    explanation: "Use 'who' for people, not 'which'." });
  add({ id: "rc-5",  level: "A2", topic: "relative-clauses", type: "fill-blank",
    sentence: "The movie ___ we watched was great.", answer: "that", options: [],
    explanation: "'That' (or 'which') for things." });
  add({ id: "rc-6",  level: "B1", topic: "relative-clauses", type: "multiple-choice",
    sentence: "The day ___ we met was unforgettable.",
    answer: "when", options: ["which", "when", "where", "who"],
    explanation: "'When' is the relative adverb for time." });
  add({ id: "rc-7",  level: "B1", topic: "relative-clauses", type: "fill-blank",
    sentence: "The car ___ is parked outside is mine.", answer: "that", options: [],
    explanation: "'That' (or 'which') for things as subject." });
  add({ id: "rc-8",  level: "B2", topic: "relative-clauses", type: "error-correction",
    sentence: "She is the teacher which taught me math.", answer: "She is the teacher who taught me math.", options: [],
    explanation: "Use 'who' for people, not 'which'." });
  add({ id: "rc-9",  level: "B1", topic: "relative-clauses", type: "fill-blank",
    sentence: "I have a friend ___ father is a pilot.", answer: "whose", options: [],
    explanation: "'Whose' shows possession in relative clauses." });
  add({ id: "rc-10", level: "B2", topic: "relative-clauses", type: "multiple-choice",
    sentence: "The reason ___ he left is unknown.",
    answer: "why", options: ["why", "which", "that", "when"],
    explanation: "'Why' is the relative adverb for reason." });

  // ====== COUNTABLE / UNCOUNTABLE (10) ======
  add({ id: "cu-1",  level: "A2", topic: "countable-uncountable", type: "fill-blank",
    sentence: "There are ___ (much / many) books on the shelf.", answer: "many", options: [],
    explanation: "'Many' with countable nouns (books)." });
  add({ id: "cu-2",  level: "A2", topic: "countable-uncountable", type: "multiple-choice",
    sentence: "I need ___ advice about my career.",
    answer: "some", options: ["many", "some", "a", "an"],
    explanation: "'Advice' is uncountable. Use 'some', not 'many' or 'a/an'." });
  add({ id: "cu-3",  level: "A2", topic: "countable-uncountable", type: "fill-blank",
    sentence: "There isn't ___ (much / many) milk left.", answer: "much", options: [],
    explanation: "'Much' with uncountable nouns (milk)." });
  add({ id: "cu-4",  level: "B1", topic: "countable-uncountable", type: "error-correction",
    sentence: "She gave me some good advices.", answer: "She gave me some good advice.", options: [],
    explanation: "'Advice' is uncountable — no plural form." });
  add({ id: "cu-5",  level: "A2", topic: "countable-uncountable", type: "fill-blank",
    sentence: "How ___ (much / many) sugar do you need?", answer: "much", options: [],
    explanation: "'Sugar' is uncountable → 'much'." });
  add({ id: "cu-6",  level: "B1", topic: "countable-uncountable", type: "multiple-choice",
    sentence: "There is ___ furniture in this room.",
    answer: "too much", options: ["too many", "too much", "a few", "several"],
    explanation: "'Furniture' is uncountable → 'too much'." });
  add({ id: "cu-7",  level: "A2", topic: "countable-uncountable", type: "fill-blank",
    sentence: "I have ___ (a few / a little) friends in this city.", answer: "a few", options: [],
    explanation: "'Friends' is countable → 'a few'." });
  add({ id: "cu-8",  level: "B1", topic: "countable-uncountable", type: "error-correction",
    sentence: "I have many homework tonight.", answer: "I have much homework tonight.", options: [],
    explanation: "'Homework' is uncountable → 'much', not 'many'." });
  add({ id: "cu-9",  level: "B1", topic: "countable-uncountable", type: "fill-blank",
    sentence: "There are ___ (few / little) people at the beach today.", answer: "few", options: [],
    explanation: "'People' is countable → 'few'." });
  add({ id: "cu-10", level: "B1", topic: "countable-uncountable", type: "multiple-choice",
    sentence: "Could you give me ___ information about the course?",
    answer: "some", options: ["many", "some", "a", "few"],
    explanation: "'Information' is uncountable → 'some'." });

  // ====== ARTICLES (10) ======
  add({ id: "ar-1",  level: "A1", topic: "articles", type: "fill-blank",
    sentence: "I saw ___ elephant at the zoo.", answer: "an", options: [],
    explanation: "Use 'an' before vowel sounds: an elephant." });
  add({ id: "ar-2",  level: "A1", topic: "articles", type: "multiple-choice",
    sentence: "She is ___ honest person.",
    answer: "an", options: ["a", "an", "the", "—"],
    explanation: "'Honest' starts with a silent 'h' (vowel sound) → 'an'." });
  add({ id: "ar-3",  level: "A2", topic: "articles", type: "fill-blank",
    sentence: "___ sun rises in the east.", answer: "The", options: [],
    explanation: "Use 'the' for unique things: the sun." });
  add({ id: "ar-4",  level: "B1", topic: "articles", type: "error-correction",
    sentence: "I need a advice.", answer: "I need advice.", options: [],
    explanation: "'Advice' is uncountable — no article needed (or use 'some')." });
  add({ id: "ar-5",  level: "A1", topic: "articles", type: "fill-blank",
    sentence: "He is ___ teacher.", answer: "a", options: [],
    explanation: "Use 'a' before consonant sounds: a teacher." });
  add({ id: "ar-6",  level: "B1", topic: "articles", type: "multiple-choice",
    sentence: "We visited ___ Eiffel Tower in Paris.",
    answer: "the", options: ["a", "an", "the", "—"],
    explanation: "Use 'the' for famous landmarks: the Eiffel Tower." });
  add({ id: "ar-7",  level: "A2", topic: "articles", type: "fill-blank",
    sentence: "She plays ___ piano beautifully.", answer: "the", options: [],
    explanation: "Use 'the' with musical instruments: play the piano." });
  add({ id: "ar-8",  level: "B1", topic: "articles", type: "error-correction",
    sentence: "I go to the school every day.", answer: "I go to school every day.", options: [],
    explanation: "No article for general activities: go to school (as a student)." });
  add({ id: "ar-9",  level: "B1", topic: "articles", type: "fill-blank",
    sentence: "___ Mount Everest is the highest mountain.", answer: "—", options: [],
    explanation: "No article before most proper nouns (mountain names)." });
  add({ id: "ar-10", level: "B1", topic: "articles", type: "multiple-choice",
    sentence: "He's studying to become ___ engineer.",
    answer: "an", options: ["a", "an", "the", "—"],
    explanation: "'Engineer' starts with a vowel sound → 'an'." });

  // ====== PREPOSITIONS: TIME (10) ======
  add({ id: "pt-1",  level: "A1", topic: "prepositions-time", type: "fill-blank",
    sentence: "The meeting is ___ Monday.", answer: "on", options: [],
    explanation: "'On' for specific days: on Monday." });
  add({ id: "pt-2",  level: "A1", topic: "prepositions-time", type: "multiple-choice",
    sentence: "I was born ___ 1995.",
    answer: "in", options: ["on", "in", "at", "during"],
    explanation: "'In' for years: in 1995." });
  add({ id: "pt-3",  level: "A2", topic: "prepositions-time", type: "fill-blank",
    sentence: "The class starts ___ 9 o'clock.", answer: "at", options: [],
    explanation: "'At' for specific times: at 9 o'clock." });
  add({ id: "pt-4",  level: "B1", topic: "prepositions-time", type: "error-correction",
    sentence: "I'll see you in Monday morning.", answer: "I'll see you on Monday morning.", options: [],
    explanation: "'On' for specific day + part of day: on Monday morning." });
  add({ id: "pt-5",  level: "A2", topic: "prepositions-time", type: "fill-blank",
    sentence: "We usually go on holiday ___ summer.", answer: "in", options: [],
    explanation: "'In' for seasons: in summer." });
  add({ id: "pt-6",  level: "B1", topic: "prepositions-time", type: "multiple-choice",
    sentence: "The project must be finished ___ Friday.",
    answer: "by", options: ["on", "in", "by", "at"],
    explanation: "'By' means no later than: by Friday." });
  add({ id: "pt-7",  level: "A2", topic: "prepositions-time", type: "fill-blank",
    sentence: "I haven't seen her ___ last year.", answer: "since", options: [],
    explanation: "'Since' with a specific point in time: since last year." });
  add({ id: "pt-8",  level: "B1", topic: "prepositions-time", type: "error-correction",
    sentence: "She has lived here since three years.", answer: "She has lived here for three years.", options: [],
    explanation: "'For' with a duration; 'since' with a starting point." });
  add({ id: "pt-9",  level: "A2", topic: "prepositions-time", type: "fill-blank",
    sentence: "The store is open ___ 8 AM ___ 10 PM.", answer: "from / to", options: [],
    explanation: "'From...to' for time ranges." });
  add({ id: "pt-10", level: "B1", topic: "prepositions-time", type: "multiple-choice",
    sentence: "We waited ___ an hour.",
    answer: "for", options: ["for", "since", "during", "in"],
    explanation: "'For' with a duration of time: for an hour." });

  // ====== PREPOSITIONS: PLACE (10) ======
  add({ id: "pl-1",  level: "A1", topic: "prepositions-place", type: "fill-blank",
    sentence: "The book is ___ the table.", answer: "on", options: [],
    explanation: "'On' for surfaces: on the table." });
  add({ id: "pl-2",  level: "A1", topic: "prepositions-place", type: "multiple-choice",
    sentence: "She is waiting ___ the bus stop.",
    answer: "at", options: ["in", "on", "at", "by"],
    explanation: "'At' for specific points/locations: at the bus stop." });
  add({ id: "pl-3",  level: "A2", topic: "prepositions-place", type: "fill-blank",
    sentence: "The cat is hiding ___ the sofa.", answer: "behind", options: [],
    explanation: "'Behind' for something at the back of." });
  add({ id: "pl-4",  level: "B1", topic: "prepositions-place", type: "error-correction",
    sentence: "I arrived to the airport at noon.", answer: "I arrived at the airport at noon.", options: [],
    explanation: "'Arrive at' for specific places (arrive in for cities/countries)." });
  add({ id: "pl-5",  level: "A2", topic: "prepositions-place", type: "fill-blank",
    sentence: "The bank is ___ the post office.", answer: "next to", options: [],
    explanation: "'Next to' for things beside each other." });
  add({ id: "pl-6",  level: "B1", topic: "prepositions-place", type: "multiple-choice",
    sentence: "There's a bridge ___ the river.",
    answer: "over", options: ["over", "above", "on", "in"],
    explanation: "'Over' for something spanning across: a bridge over the river." });
  add({ id: "pl-7",  level: "A2", topic: "prepositions-place", type: "fill-blank",
    sentence: "The picture is hanging ___ the wall.", answer: "on", options: [],
    explanation: "'On' for things attached to a vertical surface." });
  add({ id: "pl-8",  level: "B1", topic: "prepositions-place", type: "error-correction",
    sentence: "She is good in math.", answer: "She is good at math.", options: [],
    explanation: "'Good at' is the correct collocation." });
  add({ id: "pl-9",  level: "A2", topic: "prepositions-place", type: "fill-blank",
    sentence: "The restaurant is ___ the corner of the street.", answer: "on", options: [],
    explanation: "'On the corner' for street corners." });
  add({ id: "pl-10", level: "B1", topic: "prepositions-place", type: "multiple-choice",
    sentence: "He lives ___ the third floor.",
    answer: "on", options: ["in", "on", "at", "by"],
    explanation: "'On' for floors of a building: on the third floor." });

  // Export
  if (typeof window !== "undefined") window.GRAMMAR_EXERCISES = E;
  if (typeof module !== "undefined" && module.exports) module.exports = { GRAMMAR_EXERCISES: E };

})();
