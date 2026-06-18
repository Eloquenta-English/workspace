/**
 * VocabForge — Vocabulary Data
 * 100 A1-level words across 10 topics, 10 words per topic
 */
(function(){
  'use strict';
  var W = [];

  // Pixabay images by topic: [front, back] — free, no key needed
  // Each topic has 2 images: card front background + card back header
  var IMAGES = {
    people: [
      'https://cdn.pixabay.com/photo/2016/03/27/19/24/portrait-1283886_640.jpg',
      'https://cdn.pixabay.com/photo/2015/06/09/16/12/people-803587_640.jpg'
    ],
    food: [
      'https://cdn.pixabay.com/photo/2017/05/23/15/19/vegetables-2337475_640.jpg',
      'https://cdn.pixabay.com/photo/2015/12/09/14/51/fruit-1084359_640.jpg'
    ],
    home: [
      'https://cdn.pixabay.com/photo/2016/12/13/05/15/kitchen-1903729_640.jpg',
      'https://cdn.pixabay.com/photo/2017/09/04/21/34/living-room-2715507_640.jpg'
    ],
    time: [
      'https://cdn.pixabay.com/photo/2015/06/17/15/24/clock-819109_640.jpg',
      'https://cdn.pixabay.com/photo/2016/11/08/05/28/leaves-1802411_640.jpg'
    ],
    nature: [
      'https://cdn.pixabay.com/photo/2015/12/01/20/25/tree-1072824_640.jpg',
      'https://cdn.pixabay.com/photo/2016/05/18/18/04/forest-1401858_640.jpg'
    ],
    animals: [
      'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_640.jpg',
      'https://cdn.pixabay.com/photo/2014/04/10/19/05/owl-321218_640.jpg'
    ],
    travel: [
      'https://cdn.pixabay.com/photo/2015/09/21/12/21/airplane-952226_640.jpg',
      'https://cdn.pixabay.com/photo/2015/10/20/14/41/passport-953394_640.jpg'
    ],
    education: [
      'https://cdn.pixabay.com/photo/2015/09/09/16/12/book-921316_640.jpg',
      'https://cdn.pixabay.com/photo/2014/05/05/23/16/library-339434_640.jpg'
    ],
    work: [
      'https://cdn.pixabay.com/photo/2017/01/06/19/15/work-1958677_640.jpg',
      'https://cdn.pixabay.com/photo/2015/11/26/16/16/start-up-1064428_640.jpg'
    ],
    body: [
      'https://cdn.pixabay.com/photo/2014/07/10/21/17/yoga-404512_640.jpg',
      'https://cdn.pixabay.com/photo/2017/04/20/06/41/healthy-2245129_640.jpg'
    ]
  };

  function add(id, word, level, pos, def, ex, phon, topic){
    var imgs = IMAGES[topic] || ['',''];
    W.push({id:id, word:word, level:level, pos:pos, definition:def, example:ex, phonetic:phon, topic:topic, imgFront: imgs[0], imgBack: imgs[1]});
  }

  // ═══ A1: PEOPLE ═══
  add('a1_001','family','A1','noun','a group of related people','My family lives in London.','/ˈfæməli/','people');
  add('a1_002','mother','A1','noun','a female parent','My mother is a teacher.','/ˈmʌðər/','people');
  add('a1_003','father','A1','noun','a male parent','My father works in an office.','/ˈfɑːðər/','people');
  add('a1_004','child','A1','noun','a young child','The child is playing in the park.','/tʃaɪld/','people');
  add('a1_005','friend','A1','noun','a person you know well','My best friend lives nearby.','/frɛnd/','people');
  add('a1_006','student','A1','noun','a person who studies','She is a student at university.','/ˈstjuːdənt/','people');
  add('a1_007','teacher','A1','noun','a person who teaches','The teacher gave us homework.','/ˈtiːtʃər/','people');
  add('a1_008','doctor','A1','noun','a medical professional','The doctor checked my temperature.','/ˈdɒktər/','people');
  add('a1_009','neighbor','A1','noun','a person living next door','Our neighbor has a new car.','/ˈneɪbər/','people');
  add('a1_010','baby','A1','noun','a very young child','The baby is sleeping.','/ˈbeɪbi/','people');

  // ═══ A1: FOOD ═══
  add('a1_011','water','A1','noun','a clear liquid for drink','Can I have a glass of water?','/ˈwɔːtər/','food');
  add('a1_012','bread','A1','noun','a basic food made from flour','I had bread for breakfast.','/brɛd/','food');
  add('a1_013','milk','A1','noun','a white liquid from cows','I drink milk every morning.','/mɪlk/','food');
  add('a1_014','apple','A1','noun','a round red or green fruit','She ate an apple for lunch.','/ˈæpəl/','food');
  add('a1_015','rice','A1','noun','white or brown grains for cook','We eat rice with vegetables.','/raɪs/','food');
  add('a1_016','chicken','A1','noun','a farm bird, or its meat','We had chicken for dinner.','/ˈtʃɪkɪn/','food');
  add('a1_017','fish','A1','noun','an animal that lives in water','I like to eat fish on Fridays.','/fɪʃ/','food');
  add('a1_018','egg','A1','noun','an oval laid by birds','I had an egg for breakfast.','/ɛɡ/','food');
  add('a1_019','cheese','A1','noun','a yellow or white dairy food','Would you like some cheese?','/tʃiːz/','food');
  add('a1_020','fruit','A1','noun','sweet food from plants','Fruit is good for your health.','/fruːt/','food');

  // ═══ A1: HOME ═══
  add('a1_021','house','A1','noun','a building for living in','They live in a big house.','/haʊs/','home');
  add('a1_022','room','A1','noun','a part of a building','This room is very bright.','/ruːm/','home');
  add('a1_023','door','A1','noun','an entrance to a room','Please close the door.','/dɔːr/','home');
  add('a1_024','window','A1','noun','an opening in a wall for light','Open the window, please.','/ˈwɪndoʊ/','home');
  add('a1_025','table','A1','noun','a piece of furniture with a flat top','Put the books on the table.','/ˈteɪbəl/','home');
  add('a1_026','chair','A1','noun','a seat with a back','Please sit on the chair.','/tʃɛr/','home');
  add('a1_027','bed','A1','noun','a piece of furniture for sleeping','I go to bed at ten in the evening.','/bɛd/','home');
  add('a1_028','kitchen','A1','noun','a room for cooking','Mother is in the kitchen.','/ˈkɪtʃɪn/','home');
  add('a1_029','garden','A1','noun','an area of land with flowers','We grow vegetables in the garden.','/ˈɡɑːrdən/','home');
  add('a1_030','bathroom','A1','noun','a room with a bath or shower','The bathroom is upstairs.','/ˈbæθruːm/','home');

  // ═══ A1: TIME ═══
  add('a1_031','time','A1','noun','the passing of hours and minutes','What time is it?','/taɪm/','time');
  add('a1_032','day','A1','noun','a period of 24 hours','There are seven days in a week.','/deɪ/','time');
  add('a1_033','night','A1','noun','the dark part of the day','Good night! Sleep well.','/naɪt/','time');
  add('a1_034','year','A1','noun','a period of 365 days','I have lived here for one year.','/jɪr/','time');
  add('a1_035','morning','A1','noun','the early part of the day','I wake up early in the morning.','/ˈmɔːrnɪŋ/','time');
  add('a1_036','afternoon','A1','noun','the time after noon','We have lunch in the afternoon.','/ˌæftərˈnuːn/','time');
  add('a1_037','evening','A1','noun','the late part of the day','I watch TV in the evening.','/ˈiːvnɪŋ/','time');
  add('a1_038','week','A1','noun','a period of seven days','I play football every week.','/wiːk/','time');
  add('a1_039','month','A1','noun','a period of about 30 days','There are twelve months in a year.','/mʌnθ/','time');
  add('a1_040','hour','A1','noun','a period of 60 minutes','The journey takes one hour.','/ˈaʊər/','time');

  // ═══ A1: NATURE ═══
  add('a1_041','sun','A1','noun','the star that gives us light','The sun rises in the east.','/sʌn/','nature');
  add('a1_042','moon','A1','noun','the object that shines at night','The moon is very bright tonight.','/muːn/','nature');
  add('a1_043','rain','A1','noun','water falling from clouds','Take an umbrella, it will rain.','/reɪn/','nature');
  add('a1_044','snow','A1','noun','white ice that falls from clouds','Children love playing in the snow.','/snoʊ/','nature');
  add('a1_045','tree','A1','noun','a tall plant with a trunk','There is a big tree in the garden.','/triː/','nature');
  add('a1_046','flower','A1','noun','the colorful part of a plant','She gave me a beautiful flower.','/ˈflaʊər/','nature');
  add('a1_047','river','A1','noun','a large natural flow of water','The river flows through the city.','/ˈrɪvər/','nature');
  add('a1_048','mountain','A1','noun','a very high hill','They climbed the mountain.','/ˈmaʊntɪn/','nature');
  add('a1_049','sea','A1','noun','a large area of salt water','We swam in the sea.','/siː/','nature');
  add('a1_050','sky','A1','noun','the space above the earth','Look at the stars in the sky.','/skaɪ/','nature');

  // ═══ A1: ANIMALS ═══
  add('a1_051','dog','A1','noun','a common pet animal','Our dog loves to play fetch.','/dɒɡ/','animals');
  add('a1_052','cat','A1','noun','a small furry pet animal','The cat is sleeping on the sofa.','/kæt/','animals');
  add('a1_053','bird','A1','noun','a creature that flies','A bird is singing outside.','/bɜːrd/','animals');
  add('a1_054','horse','A1','noun','a large animal you can ride','She rides her horse every day.','/hɔːrs/','animals');
  add('a1_055','fish_n','A1','noun','an animal that lives in water','We saw many fish at the aquarium.','/fɪʃ/','animals');
  add('a1_056','cow','A1','noun','a farm animal that gives milk','The cow is in the field.','/kaʊ/','animals');
  add('a1_057','sheep','A1','noun','a farm animal with wool','There are many sheep on the farm.','/ʃiːp/','animals');
  add('a1_058','chicken_animal','A1','noun','a farm bird','The chicken laid an egg.','/ˈtʃɪkɪn/','animals');
  add('a1_059','rabbit','A1','noun','a small animal with long ears','The rabbit is eating carrots.','/ˈræbɪt/','animals');
  add('a1_060','duck','A1','noun','a bird that swims','The ducks are in the pond.','/dʌk/','animals');

  // ═══ A1: TRAVEL ═══
  add('a1_061','car','A1','noun','a vehicle with four wheels','My father drives a red car.','/kɑːr/','travel');
  add('a1_062','bus','A1','noun','a large vehicle for passengers','I take the bus to school.','/bʌs/','travel');
  add('a1_063','train','A1','noun','a vehicle that runs on rails','The train arrives at 3 o'clock.','/treɪn/','travel');
  add('a1_064','plane','A1','noun','a vehicle that flies','We traveled by plane to Spain.','/pleɪn/','travel');
  add('a1_065','bike','A1','noun','a two-wheeled vehicle','I ride my bike to work.','/baɪk/','travel');
  add('a1_066','street','A1','noun','a road in a town or city','Our school is on this street.','/striːt/','travel');
  add('a1_067','road','A1','noun','a path for vehicles','Be careful when crossing the road.','/roʊd/','travel');
  add('a1_068','city','A1','noun','a large town','Paris is a beautiful city.','/ˈsɪti/','travel');
  add('a1_069','country','A1','noun','a nation with its own government','France is a beautiful country.','/ˈkʌntri/','travel');
  add('a1_070','map','A1','noun','a drawing of a place','Look at the map to find the way.','/mæp/','travel');

  // ═══ A1: EDUCATION ═══
  add('a1_071','school','A1','noun','a place where children learn','I walk to school every day.','/skuːl/','education');
  add('a1_072','book','A1','noun','pages with writing bound together','I am reading an interesting book.','/bʊk/','education');
  add('a1_073','pen','A1','noun','a tool for writing with ink','Can I borrow a pen?','/pɛn/','education');
  add('a1_074','letter','A1','noun','a written message','I wrote a letter to my friend.','/ˈlɛtər/','education');
  add('a1_075','lesson','A1','noun','a period of learning','The English lesson starts at nine.','/ˈlɛsən/','education');
  add('a1_076','word','A1','noun','a unit of language','How do you spell this word?','/wɜːrd/','education');
  add('a1_077','question','A1','noun','a sentence asking for information','Can I ask you a question?','/ˈkwɛstʃən/','education');
  add('a1_078','answer','A1','noun','a reply to a question','What is the answer to question five?','/ˈænsər/','education');
  add('a1_079','test','A1','noun','an examination of knowledge','We have a test on Friday.','/tɛst/','education');
  add('a1_080','homework','A1','noun','school work done at home','I do my homework after dinner.','/ˈhoʊmwɜːrk/','education');

  // ═══ A1: WORK ═══
  add('a1_081','job','A1','noun','regular work that you are paid for','She has a new job at a bank.','/dʒɒb/','work');
  add('a1_082','office','A1','noun','a room for professional work','My office is on the second floor.','/ˈɒfɪs/','work');
  add('a1_083','money','A1','noun','coins and banknotes','Do you have enough money?','/ˈmʌni/','work');
  add('a1_084','shop','A1','noun','a place where you buy things','I buy bread at the local shop.','/ʃɒp/','work');
  add('a1_085','bank','A1','noun','a place to keep money safely','I need to go to the bank.','/bæŋk/','work');
  add('a1_086','hospital','A1','noun','a place for sick people','She works at the hospital.','/ˈhɒspɪtəl/','work');
  add('a1_087','restaurant','A1','noun','a place where you eat meals','Let us meet at the restaurant.','/ˈrɛstərɒnt/','work');
  add('a1_088','market','A1','noun','a place to buy things outdoors','We buy fruit at the market.','/ˈmɑːrkɪt/','work');
  add('a1_089','police','A1','noun','the organization that protects people','Call the police!','/pəˈliːs/','work');
  add('a1_090','firefighter','A1','noun','a person who puts out fires','The firefighter rescued the cat.','/ˈfaɪərfaɪtər/','work');

  // ═══ A1: BODY ═══
  add('a1_091','head','A1','noun','the top part of your body','He has a headache.','/hɛd/','body');
  add('a1_092','hand','A1','noun','the end part of your arm','Raise your hand if you know.','/hænd/','body');
  add('a1_093','eye','A1','noun','the organ you see with','She has blue eyes.','/aɪ/','body');
  add('a1_094','ear','A1','noun','the organ you hear with','I have an earache.','/ɪr/','body');
  add('a1_095','mouth','A1','noun','the part of the face for eating','Open your mouth, please.','/maʊθ/','body');
  add('a1_096','nose','A1','noun','the part of the face for smell','His nose is cold.','/noʊz/','body');
  add('a1_097','leg','A1','noun','a limb you stand and walk on','She broke her leg.','/lɛɡ/','body');
  add('a1_098','foot','A1','noun','the bottom part of your leg','My foot hurts.','/fʊt/','body');
  add('a1_099','heart','A1','noun','the organ that pumps blood','His heart is very strong.','/hɑːrt/','body');
  add('a1_100','face','A1','noun','the front of the head','She has a beautiful face.','/feɪs/','body');

  if(typeof window !== 'undefined') { window.VOCAB_WORDS = W; window.VFImages = IMAGES; }
  if(typeof module !== 'undefined' && module.exports) module.exports = { VOCAB_WORDS: W };
})();
