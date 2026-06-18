/* ═══════════════════════════════════════════════════
   Language Widget — Reusable JS v2
   No dependencies. All functions scoped to lw_*.
   APIs: MyMemory (translate), Datamuse (thesaurus),
         LanguageTool (grammar), Free Dictionary (defs),
         Web Speech (TTS)
   ═══════════════════════════════════════════════════ */
(function() {
  'use strict';

  var API_TRANSLATE = 'https://api.mymemory.translated.net/get';
  var API_SYNONYMS  = 'https://api.datamuse.com/words';
  var API_GRAMMAR   = 'https://api.languagetool.org/v2/check';
  var API_DEFINE    = 'https://api.dictionaryapi.dev/api/v2/entries/en';

  var vocabList = [];
  var translateTimeout = null;
  var currentThesaurusWord = null;
  var grammarPickyMode = false;

  // ── MICROPHONE / SPEECH RECOGNITION ──
  var micDevices = [];
  var micSelectedDeviceId = '';
  var recognition = null;
  var isRecording = false;
  var micPulseInterval = null;

  // ── LOCAL FALLBACK THESAURUS (350+ words) ──
  // Format: word: [ipa, freq(1-5), reg(f/i/n), [syn], [ant], [rel]]
  var LOCAL_THESAURUS = {
    "happy":["ˈhæpi",5,"n",["joyful","cheerful","content","pleased","delighted","glad","elated","blissful","ecstatic","thrilled","jubilant","euphoric","overjoyed","merry","upbeat"],["sad","unhappy","miserable","sorrowful","depressed"],["smile","laugh","celebrate","fortunate"]],
    "sad":["sæd",5,"n",["unhappy","sorrowful","dejected","melancholy","gloomy","miserable","downcast","despondent","blue","forlorn","woeful","tragic","heartbroken","crestfallen"],["happy","joyful","cheerful","content"],["cry","loss","grief"]],
    "big":["bɪɡ",5,"n",["large","huge","enormous","massive","vast","immense","gigantic","colossal","substantial","towering","mammoth","monumental","prodigious","gargantuan"],["small","tiny","little","minute","miniature"],["size","scale","expanse"]],
    "small":["smɔːl",5,"n",["tiny","little","miniature","minute","compact","petite","diminutive","slight","modest","microscopic","minuscule","wee","puny"],["big","large","huge","enormous","massive"],["detail","precision","subtle"]],
    "good":["ɡʊd",5,"n",["excellent","great","fine","superb","wonderful","outstanding","splendid","admirable","commendable","superior","exceptional","marvelous","sterling","first-rate"],["bad","poor","terrible","awful","inferior"],["quality","virtue","benefit"]],
    "bad":["bæd",5,"n",["terrible","awful","poor","dreadful","atrocious","horrible","dismal","inferior","substandard","deficient","deplorable","abysmal","appalling","dire"],["good","excellent","great","superb"],["harmful","wrong","evil"]],
    "fast":["fɑːst",5,"n",["quick","rapid","swift","speedy","hasty","brisk","fleet","expeditious","nimble","prompt","accelerated","agile","whirlwind"],["slow","sluggish","leisurely","plodding"],["speed","velocity","rush"]],
    "slow":["sləʊ",5,"n",["sluggish","leisurely","unhurried","gradual","plodding","languid","dawdling","creeping","measured","steady","laggard","deliberate"],["fast","quick","rapid","swift"],["patience","delay","pace"]],
    "beautiful":["ˈbjuːtɪfəl",5,"n",["gorgeous","stunning","lovely","attractive","elegant","exquisite","radiant","magnificent","splendid","alluring","ravishing","resplendent","statuesque","bewitching","ethereal"],["ugly","unattractive","hideous","grotesque"],["aesthetic","grace","charm"]],
    "ugly":["ˈʌɡli",4,"n",["unattractive","hideous","unsightly","grotesque","repulsive","homely","plain","ghastly","monstrous","dreadful","revolting","horrid","abhorrent"],["beautiful","gorgeous","stunning","lovely"],["deformity","disgust","blemish"]],
    "smart":["smɑːt",5,"n",["intelligent","clever","brilliant","sharp","astute","wise","knowledgeable","gifted","perceptive","shrewd","canny","erudite","quick-witted"],["stupid","dull","foolish","unintelligent"],["brain","wit","logic"]],
    "stupid":["ˈstjuːpɪd",5,"i",["foolish","dull","dense","dim","idiotic","moronic","brainless","mindless","senseless","asinine","fatuous","ludicrous","absurd"],["smart","intelligent","clever","brilliant"],["ignorance","folly","absurdity"]],
    "strong":["strɒŋ",5,"n",["powerful","mighty","robust","sturdy","tough","resilient","potent","vigorous","forceful","hardy","stalwart","formidable","indomitable","iron"],["weak","feeble","frail","fragile"],["power","strength","force"]],
    "weak":["wiːk",5,"n",["feeble","frail","fragile","delicate","infirm","debilitated","puny","powerless","vulnerable","flimsy","decrepit","enfeebled","impotent"],["strong","powerful","mighty","robust"],["fatigue","vulnerability","frailty"]],
    "important":["ɪmˈpɔːtənt",5,"n",["significant","crucial","vital","essential","critical","key","paramount","fundamental","pivotal","consequential","indispensable","weighty","momentous"],["unimportant","trivial","insignificant","minor"],["priority","matter","impact"]],
    "easy":["ˈiːzi",5,"n",["simple","straightforward","effortless","uncomplicated","basic","elementary","painless","facile","smooth","manageable","clear","undemanding"],["difficult","hard","challenging","tough"],["simplicity","convenience","ease"]],
    "difficult":["ˈdɪfɪkəlt",5,"n",["hard","challenging","tough","arduous","demanding","strenuous","formidable","complex","complicated","tricky","gruelling","exacting","onerous"],["easy","simple","straightforward","effortless"],["challenge","struggle","problem"]],
    "old":["əʊld",5,"n",["ancient","aged","elderly","vintage","antique","mature","senior","time-honoured","longstanding","worn","archaic","venerable","bygone","prehistoric"],["new","young","modern","fresh"],["age","history","past"]],
    "new":["njuː",5,"n",["fresh","modern","recent","novel","latest","current","contemporary","brand-new","innovative","cutting-edge","unprecedented","groundbreaking"],["old","ancient","aged","vintage"],["innovation","discovery","novelty"]],
    "rich":["rɪtʃ",5,"n",["wealthy","affluent","prosperous","opulent","well-off","loaded","moneyed","flush","privileged","well-to-do","lavish"],["poor","impoverished","destitute","needy"],["wealth","money","luxury"]],
    "poor":["pɔː",5,"n",["impoverished","needy","destitute","underprivileged","penniless","indigent","disadvantaged","bankrupt","hard-up","impecunious","penurious"],["rich","wealthy","affluent","prosperous"],["poverty","hardship","debt"]],
    "hot":["hɒt",5,"n",["scorching","boiling","blistering","sweltering","sizzling","burning","blazing","torrid","sultry","fiery","searing","heated"],["cold","freezing","frigid","icy"],["heat","fire","warmth"]],
    "cold":["kəʊld",5,"n",["freezing","frigid","icy","chilly","frosty","bitter","glacial","arctic","polar","brisk","bracing","wintry","nippy"],["hot","warm","scorching"],["winter","ice","snow"]],
    "dark":["dɑːk",5,"n",["dim","shadowy","murky","gloomy","somber","pitch-black","unlit","dusky","tenebrous","inky","obsidian","stygian","crepuscular"],["light","bright","luminous","radiant"],["night","shadow","mystery"]],
    "light":["laɪt",5,"n",["bright","luminous","radiant","brilliant","glowing","shining","illuminated","incandescent","lustrous","resplendent","beaming","effulgent"],["dark","dim","shadowy","murky"],["sun","day","brightness"]],
    "clean":["kliːn",5,"n",["spotless","immaculate","pristine","tidy","neat","sanitary","hygienic","unsoiled","unblemished","sterile","pure","fresh","untainted"],["dirty","filthy","soiled","grimy"],["hygiene","wash","pure"]],
    "dirty":["ˈdɜːti",5,"n",["filthy","soiled","grimy","polluted","contaminated","squalid","muddy","foul","nasty","unclean","sordid","fetid","smutty"],["clean","spotless","immaculate","pristine"],["dirt","mess","filth"]],
    "loud":["laʊd",5,"n",["noisy","boisterous","thunderous","deafening","blaring","resounding","earsplitting","piercing","clamorous","tumultuous","uproarious","stentorian"],["quiet","soft","silent","hushed"],["noise","sound","volume"]],
    "quiet":["ˈkwaɪət",5,"n",["silent","hushed","still","peaceful","calm","serene","tranquil","placid","muted","inaudible","noiseless","soundless","undisturbed"],["loud","noisy","boisterous","thunderous"],["silence","peace","calm"]],
    "brave":["breɪv",5,"n",["courageous","fearless","valiant","bold","heroic","daring","intrepid","gallant","audacious","undaunted","resolute","plucky","lionhearted","stalwart"],["cowardly","timid","fearful","spineless"],["courage","hero","warrior"]],
    "afraid":["əˈfreɪd",5,"n",["frightened","scared","fearful","terrified","alarmed","anxious","apprehensive","petrified","panicked","trembling","timid","unnerved","spooked"],["brave","courageous","fearless","bold"],["fear","terror","panic"]],
    "kind":["kaɪnd",5,"n",["compassionate","generous","benevolent","caring","gentle","warm-hearted","thoughtful","considerate","gracious","sympathetic","tender","humane","charitable"],["cruel","unkind","mean","harsh"],["kindness","compassion","care"]],
    "cruel":["ˈkruːəl",5,"n",["harsh","brutal","ruthless","merciless","heartless","callous","sadistic","vicious","inhumane","barbaric","pitiless","tyrannical","savage","malevolent"],["kind","compassionate","gentle","benevolent"],["cruelty","suffering","abuse"]],
    "honest":["ˈɒnɪst",5,"n",["truthful","sincere","candid","frank","genuine","trustworthy","upright","forthright","transparent","scrupulous","honorable","principled","veracious"],["dishonest","deceitful","lying","fraudulent"],["truth","integrity","trust"]],
    "polite":["pəˈlaɪt",5,"n",["courteous","respectful","civil","gracious","well-mannered","diplomatic","tactful","considerate","refined","genteel","urbane","suave","civilized"],["rude","impolite","disrespectful","vulgar"],["manners","courtesy","respect"]],
    "rude":["ruːd",5,"n",["impolite","disrespectful","discourteous","vulgar","uncouth","insulting","offensive","boorish","crass","brash","impudent","insolent","contemptuous"],["polite","courteous","respectful","civil"],["insult","offence","disrespect"]],
    "strange":["streɪndʒ",5,"n",["odd","peculiar","weird","bizarre","unusual","curious","eccentric","abnormal","atypical","extraordinary","uncanny","unconventional","quirky","anomalous"],["normal","ordinary","usual","common"],["weird","mystery","oddity"]],
    "normal":["ˈnɔːməl",5,"n",["ordinary","usual","typical","standard","common","regular","conventional","routine","customary","expected","unremarkable","mundane","everyday","mainstream"],["strange","odd","unusual","abnormal"],["standard","average","regular"]],
    "safe":["seɪf",5,"n",["secure","protected","harmless","risk-free","sheltered","guarded","unharmed","intact","invulnerable","impregnable","sound","unassailable"],["dangerous","risky","hazardous","unsafe"],["security","protection","shelter"]],
    "dangerous":["ˈdeɪndʒərəs",5,"n",["hazardous","risky","perilous","treacherous","unsafe","threatening","harmful","deadly","lethal","menacing","precarious","fraught","dire","life-threatening"],["safe","secure","harmless","protected"],["danger","risk","threat"]],
    "true":["truː",5,"n",["accurate","correct","factual","genuine","authentic","veracious","honest","real","valid","legitimate","bona fide","veritable","truthful"],["false","untrue","incorrect","wrong"],["truth","fact","reality"]],
    "false":["fɔːls",5,"n",["untrue","incorrect","wrong","fictitious","fabricated","fallacious","erroneous","deceptive","misleading","counterfeit","bogus","spurious","unfounded"],["true","accurate","correct","genuine"],["lie","deception","error"]],
    "simple":["ˈsɪmpəl",5,"n",["easy","straightforward","basic","uncomplicated","elementary","clear","plain","unadorned","modest","minimalist","austere","no-frills","manageable"],["complex","complicated","intricate","elaborate"],["simplicity","ease","basic"]],
    "complex":["kəmˈpleks",5,"n",["complicated","intricate","elaborate","sophisticated","convoluted","multifaceted","involved","tangled","labyrinthine","byzantine","knotty","arcane"],["simple","straightforward","basic","uncomplicated"],["complexity","intricacy","system"]],
    "clear":["klɪə",5,"n",["transparent","obvious","evident","apparent","plain","unmistakable","lucid","explicit","unambiguous","manifest","crystal-clear","pellucid","conspicuous"],["unclear","vague","ambiguous","obscure"],["clarity","transparency","obvious"]],
    "wrong":["rɒŋ",5,"n",["incorrect","mistaken","erroneous","false","inaccurate","flawed","faulty","improper","inappropriate","unsuitable","unjust","immoral","unethical","illicit"],["right","correct","accurate","proper"],["error","mistake","fault"]],
    "right":["raɪt",5,"n",["correct","accurate","proper","appropriate","suitable","just","fair","legitimate","lawful","ethical","moral","fitting","apt","true"],["wrong","incorrect","mistaken","improper"],["correct","justice","fairness"]],
    "possible":["ˈpɒsɪbəl",5,"n",["feasible","achievable","attainable","viable","realistic","practicable","conceivable","plausible","potential","imaginable","credible","workable","tenable"],["impossible","unachievable","unfeasible","unattainable"],["possibility","potential","chance"]],
    "impossible":["ɪmˈpɒsɪbəl",5,"n",["unachievable","unattainable","unfeasible","inconceivable","impracticable","unrealizable","hopeless","futile","insurmountable","unworkable","infeasible"],["possible","feasible","achievable","attainable"],["impossibility","barrier","obstacle"]],
    "necessary":["ˈnesəsəri",5,"n",["essential","required","needed","vital","indispensable","imperative","mandatory","obligatory","compulsory","requisite","prerequisite","fundamental","unavoidable"],["unnecessary","optional","unneeded","superfluous"],["need","requirement","essential"]],
    "funny":["ˈfʌni",5,"n",["humorous","amusing","comical","hilarious","witty","entertaining","droll","laughable","hysterical","jovial","jocular"],["serious","solemn","grave","somber"],["humor","laugh","joke"]],
    "serious":["ˈsɪəriəs",5,"n",["grave","solemn","earnest","somber","stern","severe","critical","urgent","weighty","important","momentous","grim","sober","intense"],["funny","humorous","amusing","trivial"],["gravity","importance","severity"]],
    "busy":["ˈbɪzi",5,"n",["occupied","engaged","hectic","bustling","overloaded","swamped","overwhelmed","tied up","on the go","hard-pressed","industrious","diligent","frantic"],["idle","free","unoccupied","available"],["work","activity","schedule"]],
    "free":["friː",5,"n",["complimentary","gratis","unrestricted","unbound","liberated","independent","autonomous","unfettered","unconstrained","sovereign","emancipated","spare"],["restricted","bound","confined","imprisoned"],["freedom","liberty","independence"]],
    "full":["fʊl",5,"n",["complete","entire","whole","packed","brimming","overflowing","saturated","replete","crammed","stuffed","teeming","chock-full","maxed"],["empty","vacant","bare","depleted"],["complete","abundance","plenty"]],
    "empty":["ˈempti",5,"n",["vacant","void","bare","hollow","unoccupied","desolate","barren","blank","deserted","unfilled","depleted","forsaken"],["full","complete","packed","brimming"],["void","absence","nothing"]],
    "short":["ʃɔːt",5,"n",["brief","concise","compact","succinct","abbreviated","fleeting","momentary","transient","cursory","truncated","petite","diminutive","limited"],["long","tall","extended","lengthy"],["length","height","brief"]],
    "long":["lɒŋ",5,"n",["extended","lengthy","prolonged","endless","sustained","protracted","interminable","elongated","stretched","extensive","enduring","persistent","long-lasting"],["short","brief","concise","fleeting"],["length","duration","distance"]],
    "hard":["hɑːd",5,"n",["difficult","tough","challenging","demanding","strenuous","arduous","rigorous","gruelling","formidable","laborious","exacting","punishing","intense"],["easy","simple","soft","effortless"],["difficulty","effort","challenge"]],
    "soft":["sɒft",5,"n",["smooth","gentle","tender","delicate","supple","plush","velvety","silky","cushioned","yielding","malleable","downy","fluffy"],["hard","rough","harsh","rigid"],["gentle","smooth","tender"]],
    "thick":["θɪk",5,"n",["dense","heavy","bulky","broad","wide","substantial","stout","solid","concentrated","viscous","impenetrable","opaque","sturdy","hefty"],["thin","narrow","slim","slender"],["width","density","bulk"]],
    "thin":["θɪn",5,"n",["slim","slender","narrow","fine","lean","slight","skinny","gaunt","lanky","willowy","wispy","delicate","sheer","attenuated"],["thick","wide","broad","heavy"],["narrow","slim","slender"]],
    "wide":["waɪd",5,"n",["broad","expansive","extensive","vast","spacious","ample","sweeping","panoramic","far-reaching","comprehensive","roomy","capacious"],["narrow","thin","slender","tight"],["width","breadth","scope"]],
    "narrow":["ˈnærəʊ",5,"n",["thin","slender","tight","confined","restricted","limited","cramped","constricted","slight","fine","attenuated","strait"],["wide","broad","expansive","spacious"],["width","restriction","limit"]],
    "deep":["diːp",5,"n",["profound","bottomless","vast","immense","fathomless","unfathomable","abyssal","cavernous","yawning","intense","penetrating","thorough","recondite"],["shallow","superficial","surface","trivial"],["depth","profound","intensity"]],
    "shallow":["ˈʃæləʊ",4,"n",["superficial","surface","skin-deep","trivial","slight","frivolous","insignificant","one-dimensional","facile","unprofound","cursory"],["deep","profound","thorough","intense"],["depth","superficial","surface"]],
    "sharp":["ʃɑːp",5,"n",["keen","acute","pointed","cutting","razor-sharp","incisive","penetrating","astute","clever","quick-witted","piercing","barbed","caustic","acerbic"],["dull","blunt","obtuse","rounded"],["edge","point","blade"]],
    "dull":["dʌl",4,"n",["boring","tedious","monotonous","uninteresting","bland","insipid","lackluster","vapid","dreary","humdrum","mundane","tiresome","pedestrian"],["sharp","interesting","exciting","brilliant"],["boredom","tedium","flat"]],
    "bright":["braɪt",5,"n",["brilliant","radiant","luminous","vivid","dazzling","gleaming","sparkling","glowing","incandescent","resplendent","lustrous","effulgent","coruscating"],["dark","dim","dull","gloomy"],["light","shine","brilliance"]],
    "wet":["wet",5,"n",["damp","moist","soaked","saturated","drenched","soggy","waterlogged","dripping","soaking","humid","clammy","rainy"],["dry","arid","parched","dehydrated"],["water","rain","moisture"]],
    "dry":["draɪ",5,"n",["arid","parched","dehydrated","desiccated","bone-dry","waterless","barren","scorched","withered","drought-stricken","thirsty","rainless"],["wet","damp","moist","humid"],["arid","drought","desert"]],
    "tall":["tɔːl",5,"n",["towering","lofty","elevated","soaring","statuesque","lanky","leggy","giant","imposing","high-reaching","sky-scraping","colossal"],["short","small","tiny","petite"],["height","tower","giant"]],
    "young":["jʌŋ",5,"n",["youthful","juvenile","adolescent","teenage","immature","junior","fledgling","budding","inexperienced","fresh","nascent","emerging","burgeoning"],["old","aged","elderly","mature"],["youth","child","teenager"]],
    "calm":["kɑːm",5,"n",["peaceful","serene","tranquil","placid","composed","relaxed","unruffled","collected","poised","imperturbable","unflappable","sedate","still"],["agitated","anxious","nervous","turbulent"],["peace","serenity","composure"]],
    "angry":["ˈæŋɡri",5,"n",["furious","enraged","irate","livid","incensed","infuriated","wrathful","outraged","indignant","seething","apoplectic","hostile"],["calm","pleased","happy","content"],["anger","rage","fury"]],
    "proud":["praʊd",5,"n",["pleased","gratified","honored","dignified","self-respecting","satisfied","triumphant","elated","self-assured","noble","distinguished","eminent"],["ashamed","humble","embarrassed","humiliated"],["pride","achievement","honor"]],
    "surprised":["səˈpraɪzd",5,"n",["astonished","amazed","astounded","shocked","stunned","startled","taken aback","flabbergasted","dumbfounded","bewildered","thunderstruck","speechless"],["unsurprised","expecting","prepared"],["surprise","shock","amazement"]],
    "confused":["kənˈfjuːzd",5,"n",["bewildered","perplexed","puzzled","baffled","mystified","disoriented","muddled","befuddled","flustered","nonplussed","disconcerted","flummoxed"],["clear","certain","sure","confident"],["confusion","puzzle","mystery"]],
    "excited":["ɪkˈsaɪtɪd",5,"n",["thrilled","enthusiastic","eager","exhilarated","animated","elated","overjoyed","ecstatic","electrified","pumped","passionate","zealous","fervent"],["bored","uninterested","apathetic"],["excitement","enthusiasm","thrill"]],
    "tired":["ˈtaɪəd",5,"n",["exhausted","fatigued","weary","drained","spent","worn out","sleepy","drowsy","lethargic","knackered","burned out","depleted","prostrate"],["energetic","rested","refreshed","alert"],["fatigue","exhaustion","sleep"]],
    "hungry":["ˈhʌŋɡri",5,"n",["starving","famished","ravenous","peckish","craving","empty","voracious","insatiable","sharp-set","hollow","yearning"],["full","satiated","satisfied","stuffed"],["hunger","food","appetite"]],
    "sick":["sɪk",5,"n",["ill","unwell","ailing","nauseous","queasy","indisposed","infirm","bedridden","afflicted","diseased","unhealthy","poorly","wretched"],["healthy","well","fit","robust"],["illness","disease","fever"]],
    "healthy":["ˈhelθi",5,"n",["fit","well","robust","strong","hale","vigorous","thriving","flourishing","wholesome","hardy","hearty","sound","blooming"],["sick","ill","unwell","unhealthy"],["health","fitness","wellness"]],
    "alive":["əˈlaɪv",5,"n",["living","breathing","animate","vibrant","active","vital","existing","extant","surviving","thriving","flourishing","dynamic","spirited"],["dead","deceased","lifeless","inanimate"],["life","living","breath"]],
    "dead":["ded",5,"n",["deceased","lifeless","expired","gone","departed","late","defunct","extinct","inanimate","still","motionless","cold","fallen","martyred"],["alive","living","breathing","animate"],["death","funeral","mortality"]],
    "expensive":["ɪkˈspensɪv",5,"n",["costly","pricey","dear","high-priced","exorbitant","extortionate","steep","overpriced","premium","luxurious","lavish","prohibitive","unaffordable"],["cheap","inexpensive","affordable","economical"],["cost","price","luxury"]],
    "cheap":["tʃiːp",5,"n",["inexpensive","affordable","economical","budget","low-cost","bargain","cut-price","discounted","reasonable","modest","shoddy","tawdry"],["expensive","costly","pricey","premium"],["price","bargain","budget"]],
    "famous":["ˈfeɪməs",5,"n",["renowned","celebrated","well-known","prominent","distinguished","illustrious","eminent","notable","legendary","iconic","acclaimed","prestigious","star"],["unknown","obscure","unfamous","anonymous"],["fame","celebrity","reputation"]],
    "popular":["ˈpɒpjʊlə",5,"n",["well-liked","fashionable","trendy","in demand","sought-after","mainstream","beloved","favored","preferred","common","widespread","accepted"],["unpopular","unfashionable","out of favor","rejected"],["popularity","trend","fashion"]],
    "powerful":["ˈpaʊəfəl",5,"n",["mighty","potent","formidable","influential","dominant","commanding","authoritative","compelling","forceful","robust","vigorous","dynamic","overwhelming"],["weak","powerless","feeble","impotent"],["power","strength","influence"]],
    "gentle":["ˈdʒentl",5,"n",["soft","tender","mild","delicate","calm","soothing","meek","docile","placid","serene","tranquil","benign","kind","subtle"],["harsh","rough","violent","aggressive"],["gentle","soft","tender"]],
    "violent":["ˈvaɪələnt",5,"n",["brutal","aggressive","fierce","savage","vicious","ferocious","turbulent","destructive","ruthless","barbaric","vehement","tumultuous","tempestuous"],["gentle","peaceful","calm","nonviolent"],["violence","aggression","brutal"]],
    "silent":["ˈsaɪlənt",5,"n",["quiet","still","noiseless","soundless","hushed","mute","speechless","voiceless","inaudible","taciturn","reticent","unspoken","wordless","mum"],["loud","noisy","vocal","talkative"],["silence","quiet","still"]],
    "sweet":["swiːt",5,"n",["sugary","honeyed","syrupy","saccharine","cloying","sugared","candied","dulcet","pleasant","charming","endearing","adorable","delightful","amiable"],["sour","bitter","tart","acidic"],["sugar","candy","taste"]],
    "bitter":["ˈbɪtə",5,"n",["acerbic","tart","sharp","sour","astringent","caustic","harsh","acrid","pungent","vinegarish","resentful","embittered","rancorous","venomous","hostile"],["sweet","mild","pleasant","gentle"],["bitterness","resentment","anger"]],
    "fresh":["freʃ",5,"n",["new","recent","novel","original","clean","pure","crisp","invigorating","refreshing","vibrant","bright","unspoiled","pristine","untouched"],["stale","old","rotten","spoiled"],["fresh","new","clean"]],
    "stale":["steɪl",4,"n",["old","stagnant","musty","moldy","fusty","flat","insipid","hackneyed","trite","unoriginal","stereotyped","worn out","banal","corny"],["fresh","new","original","innovant"],["stale","old","stagnant"]],
    "rough":["rʌf",5,"n",["coarse","uneven","bumpy","jagged","rugged","crude","unrefined","harsh","abrasive","scratchy","textured","irregular","ragged","turbulent"],["smooth","even","polished","soft"],["rough","coarse","bumpy"]],
    "straight":["streɪt",5,"n",["direct","linear","unbending","unswerving","undeviating","even","level","horizontal","vertical","upright","erect","aligned","unbowed"],["curved","bent","crooked","twisted"],["straight","direct","line"]],
    "huge":["hjuːdʒ",5,"n",["enormous","massive","immense","gigantic","colossal","vast","towering","mammoth","monumental","prodigious","gargantuan","titanic","elephantine","humongous"],["tiny","small","minute","minuscule"],["size","enormous","massive"]],
    "tiny":["ˈtaɪni",5,"n",["minute","minuscule","microscopic","diminutive","miniature","small","little","wee","puny","Lilliputian","infinitesimal","negligible","slight","petite"],["huge","enormous","massive","gigantic"],["small","minute","micro"]],
    "vast":["vɑːst",5,"n",["enormous","immense","huge","massive","extensive","expansive","boundless","limitless","infinite","sweeping","far-reaching","wide","spacious","colossal"],["tiny","small","limited","narrow"],["vast","expanse","scope"]],
    "wild":["waɪld",5,"n",["untamed","feral","unruly","uncontrolled","fierce","savage","ferocious","turbulent","tempestuous","rampant","unbridled","reckless","chaotic","tumultuous"],["tame","domesticated","controlled","calm"],["wild","nature","untamed"]],
    "tame":["teɪm",4,"n",["domesticated","docile","subdued","gentle","mild","unassertive","uninteresting","dull","bland","insipid","boring","unexciting","meek","compliant"],["wild","feral","untamed","fierce"],["tame","domestic","docile"]],
    "pale":["peɪl",4,"n",["pallid","wan","ashen","colorless","white","blanched","faded","light","pastel","insipid","weak","feeble","sallow","etiolated"],["dark","colorful","vivid","bright"],["pale","white","faint"]],
    "colorful":["ˈkʌləfəl",4,"n",["vivid","bright","vibrant","rich","varied","multicolored","kaleidoscopic","prismatic","chromatic","flamboyant","exotic","picturesque","lively"],["pale","colorless","dull","drab"],["color","bright","vivid"]],
    "elegant":["ˈelɪɡənt",5,"f",["graceful","refined","sophisticated","stylish","chic","tasteful","exquisite","polished","suave","debonair","urbane","classy","dignified","aesthetic"],["inelegant","clumsy","awkward","crude"],["elegance","grace","style"]],
    "awkward":["ˈɔːkwəd",5,"n",["clumsy","ungainly","inelegant","graceless","uncomfortable","embarrassing","unwieldy","cumbersome","maladroit","inept","bumbling","cack-handed","tactless"],["elegant","graceful","comfortable","smooth"],["awkward","clumsy","embarrass"]],
    "clumsy":["ˈklʌmzi",4,"n",["awkward","ungainly","inelegant","graceless","unwieldy","bumbling","cack-handed","maladroit","inept","heavy-handed","ham-fisted","unskillful","blundering","gauche"],["graceful","elegant","adept","skillful"],["clumsy","awkward","bumble"]],
    "graceful":["ˈɡreɪsfəl",5,"f",["elegant","poised","fluid","supple","nimble","agile","lithe","lissome","willowy","dexterous","coordinated","refined","aesthetic","beautiful"],["clumsy","awkward","graceless","inelegant"],["grace","elegant","poise"]],
    "nervous":["ˈnɜːvəs",5,"n",["anxious","apprehensive","worried","tense","edgy","jittery","jumpy","restless","uneasy","agitated","fidgety","on edge","uptight","neurotic"],["calm","relaxed","confident","composed"],["nerves","anxiety","worry"]],
    "confident":["ˈkɒnfɪdənt",5,"n",["self-assured","certain","sure","positive","bold","assertive","poised","self-reliant","fearless","optimistic","secure","composed","undaunted","resolute"],["insecure","uncertain","doubtful","anxious"],["confidence","assure","certain"]],
    "shy":["ʃaɪ",5,"n",["timid","bashful","reserved","introverted","retiring","diffident","coy","demure","self-conscious","withdrawn","reticent","taciturn","unassertive","backward"],["confident","outgoing","bold","assertive"],["shy","timid","introvert"]],
    "lazy":["ˈleɪzi",5,"i",["idle","slothful","indolent","lethargic","sluggish","listless","languid","apathetic","shiftless","work-shy","unmotivated","lackadaisical","loafing","vegetating"],["hardworking","industrious","diligent","active"],["lazy","idle","sloth"]],
    "hardworking":["ˌhɑːdˈwɜːkɪŋ",5,"n",["industrious","diligent","assiduous","conscientious","dedicated","committed","tireless","indefatigable","sedulous","persevering","tenacious","zealous","productive"],["lazy","idle","slothful","indolent"],["work","diligent","effort"]],
    "patient":["ˈpeɪʃənt",5,"n",["tolerant","enduring","long-suffering","stoic","calm","composed","uncomplaining","forbearing","resigned","philosophical","understanding","persevering","unflappable"],["impatient","intolerant","restless","hasty"],["patience","tolerance","endure"]],
    "generous":["ˈdʒenərəs",5,"n",["giving","charitable","magnanimous","liberal","bountiful","munificent","lavish","openhanded","benevolent","philanthropic","unselfish","big-hearted","princely"],["stingy","selfish","miserly","greedy"],["generous","give","charity"]],
    "selfish":["ˈselfɪʃ",5,"n",["self-centered","egotistical","self-serving","greedy","possessive","covetous","acquisitive","mercenary","narcissistic","egoistic","self-absorbed","avaricious","rapacious"],["generous","selfless","altruistic","giving"],["selfish","ego","greed"]],
    "loyal":["ˈlɔɪəl",5,"n",["faithful","devoted","dedicated","committed","true","trustworthy","steadfast","unwavering","constant","reliable","dependable","staunch","resolute","true-blue"],["disloyal","unfaithful","treacherous","fickle"],["loyalty","faithful","devoted"]],
    "wise":["waɪz",5,"f",["sage","learned","knowledgeable","erudite","perceptive","insightful","astute","judicious","prudent","sagacious","enlightened","philosophical","sensible"],["foolish","unwise","stupid","ignorant"],["wisdom","knowledge","sage"]],
    "foolish":["ˈfuːlɪʃ",5,"n",["stupid","silly","absurd","ridiculous","senseless","unwise","imprudent","reckless","short-sighted","ill-advised","asinine","fatuous","ludicrous","preposterous"],["wise","sensible","prudent","intelligent"],["foolish","stupid","absurd"]],
    "curious":["ˈkjʊəriəs",5,"n",["inquisitive","interested","intrigued","nosy","prying","eager","questioning","probing","investigative","inquiring","analytical","exploratory","snooping"],["indifferent","uninterested","apathetic"],["curiosity","wonder","question"]],
    "boring":["ˈbɔːrɪŋ",5,"i",["dull","tedious","monotonous","uninteresting","bland","insipid","vapid","dreary","humdrum","mundane","tiresome","wearisome","uninspired","pedestrian"],["interesting","exciting","engaging","fascinating"],["boredom","dull","tedium"]],
    "interesting":["ˈɪntrəstɪŋ",5,"n",["fascinating","engaging","compelling","intriguing","captivating","absorbing","riveting","gripping","enthralling","spellbinding","thought-provoking","stimulating","engrossing","provocative"],["boring","dull","tedious","uninteresting"],["interest","fascinate","engage"]],
    "comfortable":["ˈkʌmftəbəl",5,"n",["cozy","snug","relaxed","at ease","content","pleasant","agreeable","homely","restful","luxurious","plush","wel-appointed","hospitable","welcoming"],["uncomfortable","awkward","uneasy","painful"],["comfort","ease","relax"]],
    "familiar":["fəˈmɪliə",5,"n",["well-known","recognized","common","customary","accustomed","routine","established","conventional","traditional","popular","household","everyday","known"],["unfamiliar","unknown","strange","exotic"],["familiar","known","recognize"]],
    "foreign":["ˈfɒrɪn",5,"n",["alien","exotic","unfamiliar","strange","overseas","international","imported","non-native","extraneous","external","faraway","distant","unheard of"],["native","domestic","local","indigenous"],["foreign","abroad","overseas"]],
    "local":["ˈləʊkəl",5,"n",["regional","neighbourhood","community","nearby","provincial","district","municipal","parochial","homegrown","native","indigenous","nearby","close"],["foreign","international","global","distant"],["local","community","nearby"]],
    "public":["ˈpʌblɪk",5,"n",["open","accessible","communal","shared","collective","general","universal","common","popular","social","civic","unrestricted","overt"],["private","personal","exclusive","restricted"],["public","open","community"]],
    "private":["ˈpraɪvɪt",5,"n",["personal","confidential","secret","exclusive","restricted","individual","intimate","hidden","classified","privy","secluded","solitary","closed","hush-hush"],["public","open","shared","communal"],["private","personal","secret"]],
    "modern":["ˈmɒdən",5,"n",["contemporary","current","present-day","up-to-date","cutting-edge","state-of-the-art","advanced","innovative","progressive","avant-garde","futuristic","pioneering"],["old","ancient","outdated","archaic"],["modern","technology","innovation"]],
    "ancient":["ˈeɪnʃənt",5,"n",["old","antique","prehistoric","archaic","primeval","primordial","age-old","time-honoured","venerable","antediluvian","bygone","medieval","hoary"],["modern","new","contemporary","recent"],["history","antiquity","ruins"]],
    "rapid":["ˈræpɪd",4,"f",["fast","quick","swift","speedy","brisk","expeditious","prompt","accelerated","hasty","fleet","whirlwind","breakneck","blistering","meteoric"],["slow","gradual","leisurely","plodding"],["speed","fast","quick"]],
    "gradual":["ˈɡrædʒʊəl",4,"n",["slow","steady","progressive","incremental","step-by-step","measured","unhurried","continuous","phased","piecemeal","systematic","methodical","evolutionary"],["rapid","sudden","abrupt","immediate"],["gradual","slow","progressive"]],
    "sudden":["ˈsʌdən",5,"n",["abrupt","unexpected","unforeseen","surprising","unanticipated","impulsive","hasty","swift","rapid","instantaneous","precipitate","unpremeditated","surprise"],["gradual","expected","foreseen","planned"],["sudden","abrupt","surprise"]],
    "permanent":["ˈpɜːmənənt",5,"f",["lasting","enduring","everlasting","perpetual","indelible","irreversible","abiding","long-term","long-lasting","undying","immortal","immutable","changeless"],["temporary","brief","fleeting","transient"],["permanent","lasting","endure"]],
    "temporary":["ˈtempərəri",5,"n",["brief","fleeting","transient","short-lived","ephemeral","momentary","provisional","interim","acting","stopgap","makeshift","short-term","transitory","passing"],["permanent","lasting","enduring","eternal"],["temporary","brief","transient"]],
    "extraordinary":["ɪkˈstrɔːdənəri",5,"f",["remarkable","exceptional","outstanding","amazing","incredible","phenomenal","astonishing","astounding","stunning","awe-inspiring","unprecedented","miraculous","prodigious","wondrous"],["ordinary","normal","common","unremarkable"],["extraordinary","remarkable","exceptional"]],
    "ordinary":["ˈɔːdənəri",5,"n",["normal","common","usual","typical","average","standard","regular","everyday","mundane","unremarkable","conventional","routine","plain","unexceptional"],["extraordinary","remarkable","exceptional","unusual"],["ordinary","normal","common"]],
    "perfect":["ˈpɜːfɪkt",5,"n",["flawless","impeccable","faultless","ideal","unblemished","immaculate","pristine","exemplary","unerring","unmatched","consummate","supreme","ultimate","irreproachable"],["imperfect","flawed","faulty","defective"],["perfect","flawless","ideal"]],
    "broken":["ˈbrəʊkən",5,"n",["damaged","shattered","smashed","fractured","cracked","split","fragmented","destroyed","wrecked","demolished","ruined","dilapidated","dysfunctional","kaput"],["whole","intact","unbroken","functional"],["broken","damage","shatter"]],
    "flexible":["ˈfleksɪbəl",5,"n",["adaptable","versatile","pliable","supple","elastic","resilient","adjustable","malleable","bendable","limber","lithe","pliant","yielding","accommodating"],["rigid","inflexible","stiff","unyielding"],["flexible","adapt","versatile"]],
    "rigid":["ˈrɪdʒɪd",4,"f",["stiff","inflexible","unyielding","fixed","immovable","strict","stringent","rigorous","austere","severe","uncompromising","ironclad","unbending","ossified"],["flexible","adaptable","versatile","pliable"],["rigid","stiff","inflexible"]],
    "genuine":["ˈdʒenjuɪn",5,"n",["authentic","real","true","sincere","honest","legitimate","bona fide","veritable","original","natural","heartfelt","unfeigned","candid","truthful"],["fake","false","counterfeit","artificial"],["genuine","authentic","real"]],
    "fake":["feɪk",5,"i",["false","counterfeit","artificial","phony","bogus","forged","fraudulent","sham","mock","imitation","synthetic","fictitious","spurious","pseudo"],["genuine","real","authentic","true"],["fake","fraud","counterfeit"]],
    "obvious":["ˈɒbviəs",5,"n",["clear","evident","apparent","plain","manifest","unmistakable","conspicuous","patent","transparent","self-evident","glaring","palpable","unequivocal","noticeable"],["unclear","obscure","hidden","subtle"],["obvious","clear","evident"]],
    "subtle":["ˈsʌtəl",4,"f",["slight","delicate","understated","nuanced","faint","muted","imperceptible","elusive","indirect","suggestive","refined","sophisticated","tenuous","fine","oblique"],["obvious","blatant","conspicuous","overt"],["subtle","nuance","delicate"]],
    "enormous":["ɪˈnɔːməs",5,"n",["huge","massive","immense","gigantic","colossal","vast","towering","mammoth","monumental","prodigious","gargantuan","titanic","elephantine","humongous"],["tiny","small","minute","minuscule"],["enormous","huge","massive"]],
    "delicate":["ˈdelɪkət",4,"f",["fragile","fine","subtle","sensitive","dainty","exquisite","intricate","elegant","tender","frail","gentle","refined","understated","gossamer","filigree"],["robust","strong","coarse","crude"],["delicate","fragile","fine"]],
    "robust":["rəʊˈbʌst",4,"f",["strong","sturdy","tough","resilient","vigorous","hardy","durable","rugged","sturdy","powerful","stout","muscular","hearty","stalwart"],["delicate","fragile","weak","frail"],["robust","strong","sturdy"]],
    "swift":["swɪft",4,"f",["fast","quick","rapid","speedy","brisk","fleet","prompt","expeditious","nimble","agile","accelerated","whirlwind","breakneck","blistering","meteoric"],["slow","sluggish","leisurely","plodding"],["swift","fast","quick"]],
    "keen":["kiːn",4,"f",["eager","enthusiastic","avid","fervent","passionate","ardent","zealous","earnest","dedicated","committed","wholehearted","impassioned","intense"],["apathetic","indifferent","uninterested","lukewarm"],["keen","eager","enthusiastic"]],
    "bold":["bəʊld",5,"n",["brave","daring","courageous","fearless","audacious","adventurous","gutsy","valiant","intrepid","reckless","rash","venturesome","plucky","spirited"],["timid","cautious","shy","fearful"],["bold","brave","daring"]],
    "fierce":["fɪəs",5,"n",["savage","ferocious","brutal","vicious","intense","aggressive","violent","wild","untamed","ruthless","merciless","relentless","fervent","vehement"],["gentle","mild","calm","tame"],["fierce","savage","ferocious"]],
    "mild":["maɪld",4,"n",["gentle","soft","mellow","moderate","light","subtle","muted","temperate","calm","soothing","bland","unassuming","placid","tranquil"],["fierce","intense","strong","harsh"],["mild","gentle","soft"]],
    "extreme":["ɪkˈstriːm",5,"n",["intense","severe","radical","drastic","utmost","maximum","extraordinary","exceptional","ultra","fanatical","excessive","unreasonable","draconian","rigorous"],["mild","moderate","reasonable","temperate"],["extreme","intense","severe"]],
    "moderate":["ˈmɒdərət",4,"f",["reasonable","average","temperate","mild","medium","modest","restrained","controlled","balanced","measured","sensible","prudent","fair"],["extreme","excessive","radical","intense"],["moderate","reasonable","balanced"]],
    "abundant":["əˈbʌndənt",4,"f",["plentiful","copious","ample","profuse","bountiful","lavish","rich","teeming","overflowing","prolific","luxuriant","bounteous","exuberant"],["scarce","rare","sparse","limited"],["abundant","plentiful","copious"]],
    "scarce":["skeəs",4,"f",["rare","sparse","limited","insufficient","deficient","meager","scant","skimpy","thin","few","hard-to-find","precious","inadequate","lacking"],["abundant","plentiful","copious","ample"],["scarce","rare","limited"]],
  };



  // ── INIT ──
  function init() {
    try {
      var saved = localStorage.getItem('lw_vocab');
      if (saved) vocabList = JSON.parse(saved);
    } catch(e) { vocabList = []; }
    renderVocabList();
    setupEnterKey();
    lw_initMic();
  }

  function setupEnterKey() {
    var synInput = document.getElementById('lw-synonym-input');
    if (synInput) synInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') { e.preventDefault(); doSynonyms(); }
    });
    var conInput = document.getElementById('lw-conjugate-input');
    if (conInput) conInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') { e.preventDefault(); doConjugate(); }
    });
  }

  // ── TOGGLE ──
  window.lw_toggle = function() {
    var panel = document.getElementById('lw-panel');
    var toggle = document.getElementById('lw-toggle');
    var isOpen = panel.classList.contains('open');
    if (isOpen) {
      panel.classList.remove('open');
      if (toggle) toggle.classList.remove('active');
    } else {
      panel.classList.add('open');
      if (toggle) toggle.classList.add('active');
    }
  };

  // ── TABS ──
  window.lw_switchTab = function(tab) {
    document.querySelectorAll('.lang-tab').forEach(function(t){ t.classList.remove('active'); });
    document.querySelectorAll('.lang-tab-content').forEach(function(c){ c.classList.remove('active'); });
    var tabBtn = document.querySelector('.lang-tab[data-tab="' + tab + '"]');
    if (tabBtn) tabBtn.classList.add('active');
    var content = document.getElementById('lw-tab-' + tab);
    if (content) content.classList.add('active');
  };

  // ── SWAP LANGUAGES ──
  window.lw_swapLangs = function() {
    var from = document.getElementById('lw-lang-from');
    var to = document.getElementById('lw-lang-to');
    if (!from || !to) return;
    var tmp = from.value;
    from.value = to.value;
    to.value = tmp;
  };

  // ── TRANSLATE ──
  window.lw_doTranslate = function() {
    var text = document.getElementById('lw-lang-input').value.trim();
    if (!text) return;
    var from = document.getElementById('lw-lang-from').value;
    var to = document.getElementById('lw-lang-to').value;
    var results = document.getElementById('lw-translate-results');
    results.innerHTML = '<div class="lang-loading"><div class="spinner"></div>Translating...</div>';

    var url = API_TRANSLATE + '?q=' + encodeURIComponent(text) + '&langpair=' + from + '|' + to;

    fetch(url)
      .then(function(r) {
        if (r.status === 429) throw new Error('Rate limit exceeded. Wait a moment and try again.');
        return r.json();
      })
      .then(function(data) {
        if (data.responseStatus && data.responseStatus !== 200) {
          if (data.responseStatus === 429) throw new Error('Rate limit exceeded.');
          throw new Error('Translation failed.');
        }
        var tr = (data.responseData && data.responseData.translatedText) ? data.responseData.translatedText : '';
        if (!tr) throw new Error('No translation returned.');

        var matches = data.matches || [];
        var matchScore = data.responseData.match || 0;

        var escTr = escapeHtml(tr);
        var escText = escapeHtml(text);
        var html = '<div class="lang-result">' +
          '<div class="lang-result-label">Translation (' + from + ' \u2192 ' + to + ')</div>' +
          '<div class="lang-result-text">' + escTr + '</div>' +
          '<div class="lang-result-actions">' +
            '<button class="lang-action-btn" onclick="lw_speak(\'' + to + '\',\'' + escTr.replace(/'/g, "\\'") + '\')">\uD83D\uDD0A Speak</button>' +
            '<button class="lang-action-btn" onclick="lw_saveVocab(\'' + escText.replace(/'/g, "\\'") + '\',\'' + escTr.replace(/'/g, "\\'") + '\',\'' + from + '\',\'' + to + '\')">\uD83D\uDCBE Save</button>' +
          '</div>';

        if (matches.length > 0) {
          var goodMatches = matches.filter(function(m){ return m.quality >= 50; }).slice(0, 3);
          if (goodMatches.length > 0) {
            html += '<div class="context-section"><div class="context-title">Examples</div>';
            goodMatches.forEach(function(m) {
              html += '<div class="context-example">' +
                '<div class="source">' + escapeHtml(m.segment || '') + '</div>' +
                '<div class="target">' + escapeHtml(m.translation || '') + '</div>' +
                '</div>';
            });
            html += '</div>';
          }
        }

        html += '</div>';
        results.innerHTML = html;
      })
      .catch(function(e) {
        results.innerHTML = '<div class="lang-result"><div class="lang-result-text" style="color:var(--lw-rose)">' + (e.message || 'Translation failed.') + '</div></div>';
      });
  };

  // ═══════════════════════════════════════════════════
  // ── MICROPHONE / SPEECH-TO-TEXT ──
  // ═══════════════════════════════════════════════════
  function lw_getSpeechRecognition() {
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
  }

  function lw_initMic() {
    // Check if browser supports speech recognition
    var SpeechRecognition = lw_getSpeechRecognition();
    if (!SpeechRecognition) {
      var micBtn = document.getElementById('lw-mic-btn');
      if (micBtn) {
        micBtn.style.display = 'none';
      }
      return;
    }

    // Enumerate microphone devices
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices().then(function(devices) {
        micDevices = devices.filter(function(d) { return d.kind === 'audioinput'; });
        var select = document.getElementById('lw-mic-select');
        if (!select) return;
        // Keep default option, add detected mics
        var currentVal = select.value;
        // Remove old device options (keep first "Default" option)
        while (select.options.length > 1) { select.remove(1); }
        micDevices.forEach(function(d, i) {
          var label = d.label || ('Microphone ' + (i + 1));
          var opt = document.createElement('option');
          opt.value = d.deviceId;
          opt.textContent = label;
          select.appendChild(opt);
        });
        select.value = currentVal;

        // If only one mic besides default, auto-select it
        if (micDevices.length === 1) {
          select.value = micDevices[0].deviceId;
          micSelectedDeviceId = micDevices[0].deviceId;
        }
      }).catch(function() {
        // Permission not granted yet, will enumerate on first use
      });

      // Listen for device changes
      navigator.mediaDevices.addEventListener('devicechange', function() {
        lw_initMic();
      });
    }

    // Setup mic button events (hold-to-record)
    var micBtn = document.getElementById('lw-mic-btn');
    if (micBtn) {
      // Mouse events
      micBtn.addEventListener('mousedown', function(e) {
        e.preventDefault();
        lw_startRecording();
      });
      micBtn.addEventListener('mouseup', function(e) {
        e.preventDefault();
        lw_stopRecording();
      });
      micBtn.addEventListener('mouseleave', function() {
        if (isRecording) lw_stopRecording();
      });
      // Touch events
      micBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        lw_startRecording();
      });
      micBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        lw_stopRecording();
      });
    }

    // Mic device selector change
    var micSelect = document.getElementById('lw-mic-select');
    if (micSelect) {
      micSelect.addEventListener('change', function() {
        micSelectedDeviceId = this.value;
      });
    }
  }

  window.lw_toggleRecording = function() {
    // This is called by onclick as a fallback; primary control is via mousedown/up
    if (isRecording) {
      lw_stopRecording();
    } else {
      lw_startRecording();
    }
  };

  function lw_startRecording() {
    if (isRecording) return;
    var SpeechRecognition = lw_getSpeechRecognition();
    if (!SpeechRecognition) {
      lw_showToast('Speech recognition not supported in this browser');
      return;
    }

    // Request mic permission + set selected device
    var constraints = { audio: true };
    if (micSelectedDeviceId) {
      constraints.audio = { deviceId: { exact: micSelectedDeviceId } };
    }

    navigator.mediaDevices.getUserMedia(constraints).then(function() {
      // Permission granted, start recognition
      _startSpeechRecognition(SpeechRecognition);
    }).catch(function(err) {
      lw_showToast('Microphone access denied. Check browser permissions.');
    });
  }

  function _startSpeechRecognition(SpeechRecognition) {
    if (recognition) {
      try { recognition.abort(); } catch(e) {}
    }

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    // Set language from source lang selector
    var langSelect = document.getElementById('lw-lang-from');
    var langMap = {
      en:'en-US', de:'de-DE', es:'es-ES', fr:'fr-FR', it:'it-IT',
      pt:'pt-PT', ru:'ru-RU', ja:'ja-JP', ko:'ko-KR', zh:'zh-CN',
      ar:'ar-SA', hi:'hi-IN', nl:'nl-NL', pl:'pl-PL', tr:'tr-TR',
      sv:'sv-SE', da:'da-DK', fi:'fi-FI', el:'el-GR', cs:'cs-CZ',
      ro:'ro-RO', hu:'hu-HU', bg:'bg-BG', sk:'sk-SK', sl:'sl-SI',
      uk:'uk-UA', sr:'sr-RS', id:'id-ID', vi:'vi-VN', th:'th-TH',
      fa:'fa-IR', he:'he-IL'
    };
    recognition.lang = langMap[langSelect ? langSelect.value : 'en'] || 'en-US';

    var textarea = document.getElementById('lw-lang-input');
    var micBtn = document.getElementById('lw-mic-btn');
    var micLabel = micBtn ? micBtn.querySelector('.mic-label') : null;
    var baseText = textarea ? textarea.value : '';
    if (baseText && !baseText.endsWith(' ')) baseText += ' ';

    isRecording = true;
    if (micBtn) micBtn.classList.add('recording');
    if (micLabel) micLabel.textContent = 'Listening...';

    // Pulse animation on the mic button
    var pulseState = 0;
    micPulseInterval = setInterval(function() {
      pulseState = (pulseState + 1) % 3;
      if (micBtn) {
        micBtn.style.boxShadow = '0 0 ' + (8 + pulseState * 6) + 'px rgba(251,113,133,' + (0.3 + pulseState * 0.2) + ')';
      }
    }, 400);

    recognition.onresult = function(event) {
      var interim = '';
      var final = '';
      for (var i = event.resultIndex; i < event.results.length; i++) {
        var transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript + ' ';
        } else {
          interim += transcript;
        }
      }
      if (textarea) {
        textarea.value = baseText + final + interim;
      }
    };

    recognition.onerror = function(event) {
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      if (event.error === 'not-allowed') {
        lw_showToast('Microphone access denied');
      }
      lw_stopRecording();
    };

    recognition.onend = function() {
      // If we're still supposed to be recording, restart (Chrome limitation)
      if (isRecording) {
        try { recognition.start(); } catch(e) { lw_stopRecording(); }
      }
    };

    try {
      recognition.start();
    } catch(e) {
      lw_stopRecording();
    }
  }

  function lw_stopRecording() {
    if (!isRecording) return;
    isRecording = false;

    if (micPulseInterval) {
      clearInterval(micPulseInterval);
      micPulseInterval = null;
    }

    if (recognition) {
      try { recognition.stop(); } catch(e) {}
      recognition = null;
    }

    var micBtn = document.getElementById('lw-mic-btn');
    var micLabel = micBtn ? micBtn.querySelector('.mic-label') : null;
    if (micBtn) {
      micBtn.classList.remove('recording');
      micBtn.style.boxShadow = '';
    }
    if (micLabel) micLabel.textContent = 'Hold to speak';

    // Auto-translate after a short delay
    var textarea = document.getElementById('lw-lang-input');
    if (textarea && textarea.value.trim().length > 2) {
      clearTimeout(translateTimeout);
      translateTimeout = setTimeout(function() {
        lw_doTranslate();
      }, 600);
    }
  }
  // ═══════════════════════════════════════════════════
  // ═══════════════════════════════════════════════════
  // ── ENHANCED THESAURUS ──
  // ═══════════════════════════════════════════════════
  window.lw_doSynonyms = function(word) {
    if (!word) {
      word = document.getElementById('lw-synonym-input').value.trim().toLowerCase();
    }
    if (!word) return;
    currentThesaurusWord = word;

    // Update input if called from click
    var input = document.getElementById('lw-synonym-input');
    if (input) input.value = word;

    var results = document.getElementById('lw-synonym-results');
    results.innerHTML = '<div class="lang-loading"><div class="spinner"></div>Searching thesaurus...</div>';

    // Build breadcrumb with history, IPA, frequency, register
    if (!window.lw_thesaurusHistory) window.lw_thesaurusHistory = [];
    if (window.lw_thesaurusHistory.indexOf(word) === -1) {
      window.lw_thesaurusHistory.push(word);
      if (window.lw_thesaurusHistory.length > 20) window.lw_thesaurusHistory.shift();
    }
    var historyLinks = '';
    if (window.lw_thesaurusHistory.length > 1) {
      historyLinks = '<span class="thes-history">';
      window.lw_thesaurusHistory.slice(-5).forEach(function(hw) {
        var hwEsc = escapeHtml(hw).replace(/'/g, "\\'");
        historyLinks += '<span class="thes-hist-link" onclick="lw_doSynonyms(\'' + hwEsc + '\')">' + escapeHtml(hw) + '</span>';
      });
      historyLinks += '</span>';
    }

    // Local data: [ipa, freq, reg, [syn], [ant], [rel]]
    var localIpa = localData ? localData[0] : '';
    var localFreq = localData ? localData[1] : 0;
    var localReg = localData ? localData[2] : '';
    var freqDots = '';
    for (var d = 0; d < 5; d++) freqDots += '<span class="freq-dot' + (d < localFreq ? ' freq-dot-on' : '') + '"></span>';
    var regLabel = localReg === 'f' ? 'formal' : (localReg === 'i' ? 'informal' : '');
    var regBadge = regLabel ? '<span class="thes-reg-badge thes-reg-' + localReg + '">' + regLabel + '</span>' : '';

    var breadcrumb = '<div class="thes-breadcrumb">' +
      '<span class="thes-current-word">' + escapeHtml(word) + '</span>' +
      (localIpa ? '<span class="thes-ipa">' + escapeHtml(localIpa) + '</span>' : '') +
      regBadge +
      '<span class="thes-freq">' + freqDots + '</span>' +
      '<button class="pronounce-btn" onclick="lw_speak(\'en\',\'' + escapeHtml(word).replace(/'/g, "\\'") + '\')" title="Listen">&#x1F50A;</button>' +
      '</div>' +
      (historyLinks ? '<div class="thes-history-wrap">History: ' + historyLinks + '</div>' : '');

    // Check local thesaurus first — compact format: [ipa, freq, reg, [syn], [ant], [rel]]
    var localData = LOCAL_THESAURUS[word];

    // Fetch from Datamuse: multiple query types in parallel
    var queries = [
      fetch(API_SYNONYMS + '?rel_syn=' + encodeURIComponent(word) + '&max=20').then(function(r){ return r.json(); }),
      fetch(API_SYNONYMS + '?rel_ant=' + encodeURIComponent(word) + '&max=10').then(function(r){ return r.json(); }),
      fetch(API_SYNONYMS + '?rel_trg=' + encodeURIComponent(word) + '&max=10').then(function(r){ return r.json(); }),
      fetch(API_SYNONYMS + '?rel_spc=' + encodeURIComponent(word) + '&max=8').then(function(r){ return r.json(); }),
      fetch(API_SYNONYMS + '?rel_gen=' + encodeURIComponent(word) + '&max=8').then(function(r){ return r.json(); }),
      fetch(API_DEFINE + '/' + encodeURIComponent(word)).then(function(r){ return r.json(); }).catch(function(){ return null; })
    ];

    Promise.all(queries).then(function(allData) {
      var synonyms     = allData[0] || [];
      var antonyms     = allData[1] || [];
      var triggers     = allData[2] || [];  // words statistically associated
      var specific     = allData[3] || [];  // more specific (hyponyms)
      var generic      = allData[4] || [];  // more general (hypernyms)
      var definitions  = allData[5] && !allData[5].title ? allData[5] : null;

      // Merge local + API synonyms, deduplicate
      var allSyns = [];
      var seen = {};

      // Add local synonyms first (high quality) — compact format: [ipa, freq, reg, [syn], [ant], [rel]]
      if (localData) {
        localData[3].forEach(function(s) {
          if (!seen[s]) { seen[s] = true; allSyns.push({word: s, score: 9999, source: 'local'}); }
        });
        // Add local antonyms to seen
        if (localData[4]) {
          localData[4].forEach(function(a) {
            if (!seen[a]) { seen[a] = true; }
          });
        }
      }

      // Add API synonyms
      synonyms.forEach(function(item) {
        if (!seen[item.word]) {
          seen[item.word] = true;
          allSyns.push(item);
        }
      });

      // Build HTML
      var html = breadcrumb;

      // Definitions section
      if (definitions && definitions.length > 0) {
        html += '<div class="thes-definitions">';
        definitions.forEach(function(entry) {
          if (entry.meanings) {
            entry.meanings.forEach(function(meaning) {
              var defs = meaning.definitions.slice(0, 2);
              defs.forEach(function(d, i) {
                html += '<div class="thes-def">' +
                  '<span class="thes-def-part">' + escapeHtml(meaning.partOfSpeech || '') + '</span>' +
                  '<span class="thes-def-text">' + escapeHtml(d.definition || '') + '</span>' +
                  (d.example ? '<span class="thes-def-example">"' + escapeHtml(d.example) + '"</span>' : '') +
                  '</div>';
              });
            });
          }
        });
        html += '</div>';
      }

      // Synonyms section
      if (allSyns.length > 0) {
        html += '<div class="thes-group">' +
          '<div class="thes-group-title"><span class="thes-dot thes-dot-syn"></span>Synonyms</div>' +
          '<div class="thes-chips">';
        allSyns.forEach(function(item) {
          var score = item.score || 0;
          var cls = score > 5000 ? 'chip-exact' : (score > 1000 ? 'chip-common' : '');
          var w = escapeHtml(item.word).replace(/'/g, "\\'");
          html += '<span class="thes-chip ' + cls + '" onclick="lw_doSynonyms(\'' + w + '\')" title="Click to explore \'' + escapeHtml(item.word) + '\'">' + escapeHtml(item.word) + '</span>';
        });
        html += '</div></div>';
      }

      // Antonyms section
      var allAnts = [];
      var antSeen = {};
      if (localData && localData[4]) {
        localData[4].forEach(function(a) {
          if (!antSeen[a]) { antSeen[a] = true; allAnts.push({word: a, score: 9999}); }
        });
      }
      antonyms.forEach(function(item) {
        if (!antSeen[item.word]) {
          antSeen[item.word] = true;
          allAnts.push(item);
        }
      });
      if (allAnts.length > 0) {
        html += '<div class="thes-group">' +
          '<div class="thes-group-title"><span class="thes-dot thes-dot-ant"></span>Antonyms</div>' +
          '<div class="thes-chips">';
        allAnts.forEach(function(item) {
          var w = escapeHtml(item.word).replace(/'/g, "\\'");
          html += '<span class="thes-chip chip-ant" onclick="lw_doSynonyms(\'' + w + '\')" title="Click to explore \'' + escapeHtml(item.word) + '\'">' + escapeHtml(item.word) + '</span>';
        });
        html += '</div></div>';
      }

      // Related / Trigger words
      if (triggers.length > 0) {
        html += '<div class="thes-group">' +
          '<div class="thes-group-title"><span class="thes-dot thes-dot-rel"></span>Related Words</div>' +
          '<div class="thes-chips">';
        triggers.forEach(function(item) {
          var w = escapeHtml(item.word).replace(/'/g, "\\'");
          html += '<span class="thes-chip chip-rel" onclick="lw_doSynonyms(\'' + w + '\')" title="Click to explore \'' + escapeHtml(item.word) + '\'">' + escapeHtml(item.word) + '</span>';
        });
        html += '</div></div>';
      }

      // More specific (hyponyms)
      if (specific.length > 0) {
        html += '<div class="thes-group">' +
          '<div class="thes-group-title"><span class="thes-dot thes-dot-spc"></span>More Specific</div>' +
          '<div class="thes-chips">';
          specific.forEach(function(item) {
            var w = escapeHtml(item.word).replace(/'/g, "\\'");
            html += '<span class="thes-chip chip-spc" onclick="lw_doSynonyms(\'' + w + '\')">' + escapeHtml(item.word) + '</span>';
          });
        html += '</div></div>';
      }

      // More general (hypernyms)
      if (generic.length > 0) {
        html += '<div class="thes-group">' +
          '<div class="thes-group-title"><span class="thes-dot thes-dot-gen"></span>More General</div>' +
          '<div class="thes-chips">';
          generic.forEach(function(item) {
            var w = escapeHtml(item.word).replace(/'/g, "\\'");
            html += '<span class="thes-chip chip-gen" onclick="lw_doSynonyms(\'' + w + '\')">' + escapeHtml(item.word) + '</span>';
          });
        html += '</div></div>';
      }

      if (allSyns.length === 0 && allAnts.length === 0 && triggers.length === 0 && specific.length === 0 && generic.length === 0) {
        html += '<div class="lang-result"><div class="lang-result-text" style="color:var(--lw-text-dim)">No thesaurus data found for "' + escapeHtml(word) + '". Try a different word.</div></div>';
      }

      results.innerHTML = html;

    }).catch(function() {
      // Fallback: try local only
      if (localData) {
        lw_doSynonyms(word);
      } else {
        results.innerHTML = breadcrumb + '<div class="lang-result"><div class="lang-result-text" style="color:var(--lw-rose)">Thesaurus request failed. Check your connection.</div></div>';
      }
    });
  };

  // ── CONJUGATE ──
  window.lw_doConjugate = function() {
    var verb = document.getElementById('lw-conjugate-input').value.trim().toLowerCase();
    if (!verb) return;
    var results = document.getElementById('lw-conjugate-results');
    results.innerHTML = '<div class="lang-loading"><div class="spinner"></div>Conjugating...</div>';

    fetch(API_SYNONYMS + '?rel_bga=' + encodeURIComponent(verb) + '&max=3')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var base = verb;
        if (data && data.length > 0) {
          base = data[0].word;
        }

        var forms = [
          {tense: 'Infinitive', form: base},
          {tense: 'Present (I/you/we/they)', form: base},
          {tense: 'Present (he/she/it)', form: conjugate3rd(base)},
          {tense: 'Past Simple', form: conjugatePast(base)},
          {tense: 'Present Participle', form: conjugateParticiple(base)},
          {tense: 'Past Participle', form: conjugatePast(base)}
        ];

        var html = '<table class="conj-table"><thead><tr><th>Tense</th><th>Form</th></tr></thead><tbody>';
        forms.forEach(function(f) {
          html += '<tr><td class="conj-tense">' + f.tense + '</td><td>' + f.form + '</td></tr>';
        });
        html += '</tbody></table>';
        results.innerHTML = html;
      })
      .catch(function() {
        results.innerHTML = '<div class="lang-result"><div class="lang-result-text" style="color:var(--lw-rose)">Conjugation failed.</div></div>';
      });
  };

  function conjugate3rd(v) {
    if (v.endsWith('s') || v.endsWith('sh') || v.endsWith('ch') || v.endsWith('x') || v.endsWith('z') || v.endsWith('o')) return v + 'es';
    if (v.endsWith('y') && !'aeiou'.includes(v.charAt(v.length-2))) return v.slice(0,-1) + 'ies';
    return v + 's';
  }
  function conjugatePast(v) {
    if (v.endsWith('e')) return v + 'd';
    if (v.endsWith('y') && !'aeiou'.includes(v.charAt(v.length-2))) return v.slice(0,-1) + 'ied';
    if (v.length <= 4 && !'aeiou'.includes(v.charAt(v.length-2)) && 'aeiou'.includes(v.charAt(v.length-3))) {
      return v + v.charAt(v.length-1) + 'ed';
    }
    return v + 'ed';
  }
  function conjugateParticiple(v) {
    if (v.endsWith('e')) return v.slice(0,-1) + 'ing';
    if (v.length <= 4 && !'aeiou'.includes(v.charAt(v.length-2)) && 'aeiou'.includes(v.charAt(v.length-3))) {
      return v + v.charAt(v.length-1) + 'ing';
    }
    return v + 'ing';
  }

  // ═══════════════════════════════════════════════════
  // ── ENHANCED GRAMMAR CHECKER ──
  // ═══════════════════════════════════════════════════
  window.lw_doGrammarCheck = function() {
    var text = document.getElementById('lw-grammar-input').value.trim();
    if (!text) return;
    var results = document.getElementById('lw-grammar-results');
    results.innerHTML = '<div class="lang-loading"><div class="spinner"></div>Checking grammar...</div>';

    // Detect language from grammar lang selector or default to en-US
    var langSelect = document.getElementById('lw-grammar-lang');
    var lang = langSelect ? langSelect.value : 'en-US';

    var body = 'text=' + encodeURIComponent(text) +
      '&language=' + encodeURIComponent(lang) +
      '&enabledOnly=false' +
      (grammarPickyMode ? '&level=picky' : '');

    fetch(API_GRAMMAR, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: body
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var matches = data.matches || [];

      if (matches.length === 0) {
        results.innerHTML = '<div class="grammar-clean">\u2705 No issues found! Your text looks great.</div>';
        return;
      }

      // Categorize errors
      var errors = [];
      var warnings = [];
      var styleIssues = [];

      matches.forEach(function(m) {
        var rule = m.rule || {};
        var category = rule.category || {};
        var typeName = (category.name || '').toLowerCase();
        var issueType = rule.issueType || '';

        var item = {
          offset: m.offset || 0,
          length: m.length || 0,
          message: m.message || '',
          shortMessage: m.shortMessage || '',
          replacements: (m.replacements || []).slice(0, 4).map(function(r){ return r.value || ''; }).filter(function(v){ return v.length > 0; }),
          ruleId: rule.id || '',
          categoryName: category.name || '',
          issueType: issueType
        };

        if (issueType === 'style' || issueType === 'locale-violation' || typeName.includes('style') || typeName.includes('redundancy')) {
          styleIssues.push(item);
        } else if (typeName.includes('grammar') || typeName.includes('verb') || typeName.includes('agreement') || typeName.includes('punctuation') || typeName.includes('capitalization') || typeName.includes('spelling')) {
          errors.push(item);
        } else {
          warnings.push(item);
        }
      });

      // Build summary bar
      var totalIssues = errors.length + warnings.length + styleIssues.length;
      var html = '<div class="grammar-summary">' +
        '<div class="grammar-summary-count">' +
          (errors.length > 0 ? '<span class="grammar-count-err">' + errors.length + ' error' + (errors.length > 1 ? 's' : '') + '</span>' : '') +
          (warnings.length > 0 ? '<span class="grammar-count-warn">' + warnings.length + ' warning' + (warnings.length > 1 ? 's' : '') + '</span>' : '') +
          (styleIssues.length > 0 ? '<span class="grammar-count-style">' + styleIssues.length + ' style</span>' : '') +
        '</div>' +
        '<label class="grammar-picky-toggle">' +
          '<input type="checkbox" id="lw-picky-mode" ' + (grammarPickyMode ? 'checked' : '') + ' onchange="lw_togglePickyMode()">' +
          'Picky mode' +
        '</label>' +
        '</div>';

      // Highlighted text preview
      html += '<div class="grammar-highlighted-text">' + buildHighlightedText(text, errors, warnings, styleIssues) + '</div>';

      // Errors section
      if (errors.length > 0) {
        html += '<div class="grammar-section"><div class="grammar-section-title grammar-section-err">\u2717 Errors</div>';
        errors.forEach(function(item) {
          html += buildErrorCard(text, item);
        });
        html += '</div>';
      }

      // Warnings section
      if (warnings.length > 0) {
        html += '<div class="grammar-section"><div class="grammar-section-title grammar-section-warn">\u26A0 Warnings</div>';
        warnings.forEach(function(item) {
          html += buildErrorCard(text, item);
        });
        html += '</div>';
      }

      // Style issues section
      if (styleIssues.length > 0) {
        html += '<div class="grammar-section"><div class="grammar-section-title grammar-section-style">\u2728 Style Suggestions</div>';
        styleIssues.forEach(function(item) {
          html += buildErrorCard(text, item);
        });
        html += '</div>';
      }

      results.innerHTML = html;
    })
    .catch(function() {
      // API failed — run local grammar checker as fallback
      var localResults = lw_localGrammarCheck(text, lang);
      if (localResults.length > 0) {
        var html = '<div class="grammar-summary"><div class="grammar-summary-count"><span class="grammar-count-warn">' + localResults.length + ' issue' + (localResults.length > 1 ? 's' : '') + '</span></div><span class="grammar-local-note">Offline mode</span></div>';
        html += '<div class="grammar-highlighted-text">' + buildHighlightedText(text, localResults, [], []) + '</div>';
        html += '<div class="grammar-section"><div class="grammar-section-title grammar-section-err">Issues found</div>';
        localResults.forEach(function(item) {
          html += buildErrorCard(text, item);
        });
        html += '</div>';
        results.innerHTML = html;
      } else {
        results.innerHTML = '<div class="grammar-clean">No obvious issues detected (offline mode). Connect to the internet for a full check.</div>';
      }
    });
  };

  // ── LOCAL GRAMMAR CHECKER (offline fallback) ──
  // Common English error patterns
  var LOCAL_GRAMMAR_RULES = [
    { pattern: /\b(i)\b(?![.''])/g, replacement: 'I', message: 'The pronoun "I" should always be capitalized.', explanation: 'In English, the first-person singular pronoun "I" is always capitalized, regardless of its position in a sentence.' },
    { pattern: /\b(there|their|they're)\b/gi, replacement: null, message: 'Check: there / their / they\'re', explanation: '"There" indicates a place. "Their" shows possession. "They\'re" is a contraction of "they are".' },
    { pattern: /\b(your|you're)\b/gi, replacement: null, message: 'Check: your / you\'re', explanation: '"Your" shows possession. "You\'re" is a contraction of "you are".' },
    { pattern: /\b(its|it's)\b/gi, replacement: null, message: 'Check: its / it\'s', explanation: '"Its" shows possession. "It\'s" is a contraction of "it is" or "it has".' },
    { pattern: /\b(could|would|should) of\b/gi, replacement: '$1 have', message: 'Use "have" instead of "of" after modal verbs.', explanation: 'The correct form is "could have", "would have", "should have" — not "could of", etc. This is a very common error.' },
    { pattern: /\b(alot)\b/gi, replacement: 'a lot', message: '"A lot" is two words.', explanation: '"Alot" is not a word. The correct form is "a lot" (two words).' },
    { pattern: /\b(irregardless)\b/gi, replacement: 'regardless', message: 'Use "regardless" instead of "irregardless".', explanation: '"Irregardless" is non-standard English. The correct word is "regardless".' },
    { pattern: /\b(supposably)\b/gi, replacement: 'supposedly', message: 'Use "supposedly" (with -ed).', explanation: '"Supposably" is a common misspelling. The correct form is "supposedly".' },
    { pattern: /\b(definately|definatly)\b/gi, replacement: 'definitely', message: 'The correct spelling is "definitely".', explanation: 'A very common misspelling. Remember: "definitely" contains "finite".' },
    { pattern: /\b(recieve|recieved)\b/gi, replacement: function(m){return m.replace(/ie/,'ei');}, message: '"Receive" follows the "i before e except after c" rule.', explanation: 'The correct spelling is "receive" — "i before e except after c".' },
    { pattern: /\b(occured|occuring)\b/gi, replacement: function(m){return m.slice(0,-1)+'r';}, message: '"Occurred" and "occurring" have double r.', explanation: 'The correct forms are "occurred" and "occurring" with a double r.' },
    { pattern: /\b(then)\b(?=\s+(?:I|you|he|she|it|we|they)\s+(?:will|would|can|could|should|might|may))/gi, replacement: null, message: 'Did you mean "than" (comparison) instead of "then" (time)?', explanation: '"Then" refers to time or sequence. "Than" is used for comparisons. E.g., "bigger than" not "bigger then".' },
    { pattern: /\b(affect)\b(?=\s+(?:of|on)\b)/gi, replacement: null, message: 'Did you mean "effect" (noun) instead of "affect" (verb)?', explanation: '"Affect" is usually a verb. "Effect" is usually a noun. E.g., "the effect of" not "the affect of".' },
    { pattern: /\.\s*\.\s*\./g, replacement: '...', message: 'Use a proper ellipsis (...) instead of three periods.', explanation: 'Either use the ellipsis character (...) or three spaced dots (. . .).' },
    { pattern: /([.!?])\1{2,}/g, replacement: '$1', message: 'Avoid multiple punctuation marks.', explanation: 'In formal writing, use a single punctuation mark (! ? .), not multiple (!!! ???).' },
    { pattern: /\s+,/g, replacement: ',', message: 'No space before a comma.', explanation: 'Commas should be placed directly after the word, with no space before them.' },
    { pattern: /,(?=[^\s])/g, replacement: ', ', message: 'Add a space after the comma.', explanation: 'In English, a space should follow a comma.' },
  ];

  function lw_localGrammarCheck(text, lang) {
    var issues = [];
    if (!text || text.trim().length === 0) return issues;
    // Only run local checker for English
    if (lang && !lang.startsWith('en')) return issues;

    LOCAL_GRAMMAR_RULES.forEach(function(rule) {
      var match;
      var regex = new RegExp(rule.pattern.source, rule.pattern.flags);
      while ((match = regex.exec(text)) !== null) {
        // Skip if the replacement matches (i.e., it's the correct form)
        if (rule.replacement && typeof rule.replacement === 'string') {
          var replaced = match[0].replace(rule.pattern, rule.replacement);
          if (replaced.toLowerCase() === match[0].lower()) return;
        }
        var replacement = null;
        if (typeof rule.replacement === 'string') {
          replacement = match[0].replace(new RegExp(rule.pattern.source, rule.pattern.flags.replace('g','')), rule.replacement);
        }
        issues.push({
          offset: match.index,
          length: match[0].length,
          message: rule.message,
          shortMessage: 'Common error',
          explanation: rule.explanation,
          replacements: replacement ? [replacement] : [],
          ruleId: 'LOCAL_RULE',
          categoryName: 'Grammar',
          issueType: 'grammar',
          local: true
        });
      }
    });
    return issues;
  }

  function buildHighlightedText(text, errors, warnings, styleIssues) {
    var allIssues = [];
    errors.forEach(function(e){ allIssues.push({offset: e.offset, length: e.length, cls: 'hl-err'}); });
    warnings.forEach(function(w){ allIssues.push({offset: w.offset, length: w.length, cls: 'hl-warn'}); });
    styleIssues.forEach(function(s){ allIssues.push({offset: s.offset, length: s.length, cls: 'hl-style'}); });

    // Sort by offset
    allIssues.sort(function(a, b){ return a.offset - b.offset; });

    // Remove overlaps
    var filtered = [];
    var lastEnd = 0;
    allIssues.forEach(function(issue) {
      if (issue.offset >= lastEnd) {
        filtered.push(issue);
        lastEnd = issue.offset + issue.length;
      }
    });

    var result = '';
    var pos = 0;
    filtered.forEach(function(issue) {
      if (issue.offset > pos) {
        result += escapeHtml(text.substring(pos, issue.offset));
      }
      result += '<span class="grammar-hl ' + issue.cls + '">' + escapeHtml(text.substring(issue.offset, issue.offset + issue.length)) + '</span>';
      pos = issue.offset + issue.length;
    });
    if (pos < text.length) {
      result += escapeHtml(text.substring(pos));
    }
    return result;
  }

  function buildErrorCard(text, item) {
    var errorText = text.substring(item.offset, item.offset + item.length);
    var html = '<div class="grammar-error-card">' +
      '<div class="grammar-error-header">' +
        '<span class="grammar-error-text">' + escapeHtml(errorText) + '</span>' +
        (item.shortMessage ? '<span class="grammar-error-short">' + escapeHtml(item.shortMessage) + '</span>' : '') +
      '</div>' +
      '<div class="grammar-error-message">' + escapeHtml(item.message) + '</div>';

    if (item.replacements.length > 0) {
      html += '<div class="grammar-corrections">';
      item.replacements.forEach(function(r) {
        var rEsc = escapeHtml(r).replace(/'/g, "\\'");
        html += '<span class="grammar-corr-chip" onclick="lw_applyCorrection(\'' + rEsc + '\', ' + item.offset + ', ' + item.length + ')" title="Click to apply this correction">' + escapeHtml(r) + '</span>';
      });
      html += '</div>';
    }

    if (item.explanation) {
      html += '<div class="grammar-error-explanation"><span class="grammar-explain-icon">?</span>' + escapeHtml(item.explanation) + '</div>';
    }

    if (item.categoryName) {
      html += '<div class="grammar-error-category">' + escapeHtml(item.categoryName) + '</div>';
    }

    html += '</div>';
    return html;
  }

  // Apply a correction to the grammar input
  window.lw_applyCorrection = function(replacement, offset, length) {
    var input = document.getElementById('lw-grammar-input');
    if (!input) return;
    var val = input.value;
    var before = val.substring(0, offset);
    var after = val.substring(offset + length);
    input.value = before + replacement + after;
    // Re-run the grammar check
    lw_doGrammarCheck();
  };

  window.lw_togglePickyMode = function() {
    grammarPickyMode = !grammarPickyMode;
    var text = document.getElementById('lw-grammar-input').value.trim();
    if (text) {
      lw_doGrammarCheck();
    }
  };

  // ── VOCAB ──
  window.lw_saveVocab = function(src, tgt, from, to) {
    vocabList.unshift({source: src, target: tgt, from: from, to: to, time: new Date().toLocaleDateString()});
    if (vocabList.length > 200) vocabList = vocabList.slice(0, 200);
    try { localStorage.setItem('lw_vocab', JSON.stringify(vocabList)); } catch(e) {}
    renderVocabList();
    lw_showToast('Word saved!');
  };

  function renderVocabList() {
    var c = document.getElementById('lw-vocab-list');
    if (!c) return;
    if (vocabList.length === 0) {
      c.innerHTML = '<div class="vocab-empty">Your saved words will appear here</div>';
      return;
    }
    var html = '';
    vocabList.forEach(function(v, i) {
      html += '<div class="vocab-item">' +
        '<div><span class="vocab-word">' + escapeHtml(v.source) + '</span>' +
        '<span class="vocab-lang">' + v.from + '</span></div>' +
        '<div class="vocab-translation">' + escapeHtml(v.target) + '</div>' +
        '<button class="vocab-delete" onclick="lw_deleteVocab(' + i + ')">\u2715</button>' +
        '</div>';
    });
    c.innerHTML = html;
  }

  window.lw_deleteVocab = function(idx) {
    vocabList.splice(idx, 1);
    try { localStorage.setItem('lw_vocab', JSON.stringify(vocabList)); } catch(e) {}
    renderVocabList();
  };

  window.lw_filterVocab = function() {
    var q = document.getElementById('lw-vocab-search').value.toLowerCase();
    var items = document.querySelectorAll('#lw-vocab-list .vocab-item');
    items.forEach(function(item) {
      item.style.display = item.textContent.toLowerCase().includes(q) ? 'flex' : 'none';
    });
  };

  // ── TTS ──
  window.lw_speak = function(lang, text) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    var langMap = {en:'en-US',de:'de-DE',es:'es-ES',fr:'fr-FR',it:'it-IT',pt:'pt-PT',ru:'ru-RU',ja:'ja-JP',ko:'ko-KR',zh:'zh-CN',ar:'ar-SA',hi:'hi-IN',nl:'nl-NL',pl:'pl-PL',tr:'tr-TR',sv:'sv-SE',da:'da-DK',fi:'fi-FI',el:'el-GR',cs:'cs-CZ',ro:'ro-RO',hu:'hu-HU',bg:'bg-BG',sk:'sk-SK',sl:'sl-SI',lv:'lv-LV',lt:'lt-LT',et:'et-EE',uk:'uk-UA',sr:'sr-RS',id:'id-ID',ms:'ms-MY',tl:'tl-PH',vi:'vi-VN',th:'th-TH',fa:'fa-IR',he:'he-IL',ur:'ur-PK',bn:'bn-BD'};
    u.lang = langMap[lang] || 'en-US';
    u.rate = 0.85;
    speechSynthesis.speak(u);
  };

  // ── UTILS ──
  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  window.lw_showToast = function(msg) {
    var existing = document.querySelector('.lang-toast');
    if (existing) existing.remove();
    var div = document.createElement('div');
    div.className = 'lang-toast';
    div.textContent = msg;
    document.body.appendChild(div);
    setTimeout(function() {
      div.style.opacity = '0';
      div.style.transition = 'opacity .3s';
      setTimeout(function() { div.remove(); }, 300);
    }, 2000);
  };

  // ── AUTO-INIT ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
