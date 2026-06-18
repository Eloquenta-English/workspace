# lesson_data.py
# WTE Speaking Lessons — All original content
# 7 categories, 5 lessons per category, 15 questions per lesson

CATEGORIES = {
    "technology": {
        "title": "Technology & Innovation",
        "description": "Explore how technology shapes our daily lives, work, and future",
        "image": "technology.jpg"
    },
    "travel": {
        "title": "Travel & Adventure",
        "description": "Discover the world through stories, dreams, and real experiences",
        "image": "travel.jpg"
    },
    "food": {
        "title": "Food & Culture",
        "description": "Taste the world through conversations about food, cooking, and identity",
        "image": "food.jpg"
    },
    "work": {
        "title": "Work & Career",
        "description": "Talk about jobs, ambitions, and the changing world of work",
        "image": "work.jpg"
    },
    "environment": {
        "title": "Environment & Nature",
        "description": "Discuss our planet, climate, and how we can make a difference",
        "image": "environment.jpg"
    },
    "culture": {
        "title": "Culture & Society",
        "description": "Explore traditions, art, identity, and what makes us who we are",
        "image": "culture.jpg"
    },
    "health": {
        "title": "Health & Lifestyle",
        "description": "Conversations about wellbeing, habits, and living your best life",
        "image": "health.jpg"
    }
}

LESSONS = {
    "technology": [
        {
            "title": "AI in Everyday Life",
            "image_keywords": "artificial intelligence,robot,future",
            "questions": [
                {
                    "main": "If an **algorithm** could predict your next purchase, would you find it helpful or **creepy**?",
                    "subs": ["What personal data are you willing to share for convenience?", "Should companies be required to explain how their AI makes decisions?"],
                    "vocab": {"algorithm": "A set of rules a computer follows to solve a problem", "creepy": "Strange and frightening in a way that makes you uncomfortable"}
                },
                {
                    "main": "Some people say AI will **eliminate** millions of jobs. Do you think this is **inevitable**, or can we adapt?",
                    "subs": ["What jobs do you think are safest from AI replacement?", "Should governments pay everyone a basic income if robots take most jobs?"],
                    "vocab": {"eliminate": "To completely remove or get rid of something", "inevitable": "Certain to happen; impossible to avoid"}
                },
                {
                    "main": "Would you trust an AI **diagnosis** more than a human doctor's **opinion**?",
                    "subs": ["What are the risks of relying on machines for health decisions?", "Could AI ever truly understand human pain and suffering?"],
                    "vocab": {"diagnosis": "A doctor's opinion about what illness someone has", "opinion": "A personal belief or judgment about something"}
                },
                {
                    "main": "If you could have a **personalized** AI assistant that knows everything about you, would you want one?",
                    "subs": ["Where should we draw the line between helpful and **invasive**?", "How much of your life are you already **outsourcing** to technology?"],
                    "vocab": {"personalized": "Designed specifically for one person", "invasive": "Uncomfortably entering someone's private life", "outsourcing": "Paying someone or something else to do a task for you"}
                },
                {
                    "main": "Do you think AI **art** is real art, or is it just **sophisticated** copying?",
                    "subs": ["Should AI-generated creations be protected by **copyright**?", "Can a machine ever truly be **creative**, or does it just remix what humans made?"],
                    "vocab": {"sophisticated": "Highly developed and complex", "copyright": "Legal protection that gives creators control over their work", "creative": "Having the ability to make new and original things"}
                },
                {
                    "main": "If an AI could write a **compelling** novel that made people cry, does it matter that no human wrote it?",
                    "subs": ["What makes a story **authentic** — the craft or the human experience behind it?", "Would you read a book knowing it was entirely written by a machine?"],
                    "vocab": {"compelling": "Very interesting and exciting; hard to ignore", "authentic": "Real and genuine; not fake or copied"}
                },
                {
                    "main": "Should AI systems be required to have **transparency** about how they reach their decisions?",
                    "subs": ["Do you think most people actually want to know how algorithms work?", "Could **transparency** requirements actually slow down innovation?"],
                    "vocab": {"transparency": "The quality of being open, honest, and easy to understand"}
                },
                {
                    "main": "If a self-driving car had to choose between hitting a pedestrian or **sacrificing** its passenger, how should it decide?",
                    "subs": ["Who should program these **ethical** choices — engineers, philosophers, or the public?", "Would you buy a car that might choose to save a stranger over you?"],
                    "vocab": {"sacrificing": "Giving up something important to save something else", "ethical": "Relating to what is morally right and wrong"}
                },
                {
                    "main": "Do you think AI will eventually develop **consciousness**, or is that **fundamentally** impossible?",
                    "subs": ["How would we even know if a machine became truly **sentient**?", "If AI became conscious, should it have legal rights?"],
                    "vocab": {"consciousness": "Awareness of your own existence and surroundings", "fundamentally": "In a basic and important way", "sentient": "Able to feel and experience sensations"}
                },
                {
                    "main": "If you could ask an AI any question and get a **definitive** answer, what would you ask?",
                    "subs": ["Would knowing certain answers make life more or less meaningful?", "Are there questions humans should never be able to answer?"],
                    "vocab": {"definitive": "Final and complete; not able to be changed"}
                },
                {
                    "main": "Should there be a **universal** limit on how intelligent AI can become, even if we have the technology to go further?",
                    "subs": ["Who should control the **development** of super-intelligent AI?", "Is it **arrogant** to think we can control something smarter than us?"],
                    "vocab": {"universal": "Relating to or affecting everyone in the world", "development": "The process of growing or changing", "arrogant": "Having an exaggerated sense of one's own importance"}
                },
                {
                    "main": "If AI could perfectly **simulate** a conversation with a deceased loved one, should it be allowed?",
                    "subs": ["Would this help people **grieve** or prevent them from moving on?", "What are the psychological risks of talking to a simulation of someone who has died?"],
                    "vocab": {"simulate": "To create a computer model that imitates the real thing", "grieve": "To feel great sadness, especially because someone has died"}
                },
                {
                    "main": "Do you think AI will make human **creativity** more valuable or completely **redundant**?",
                    "subs": ["What can humans do that AI will never be able to replicate?", "Should we be **optimistic** or **alarmed** about the future of human creativity?"],
                    "vocab": {"creativity": "The ability to make new and original things", "redundant": "No longer needed or useful", "optimistic": "Hopeful and confident about the future", "alarmed": "Feeling worried or frightened"}
                },
                {
                    "main": "If an AI system **manipulated** your social media feed to make you happier, would that be acceptable?",
                    "subs": ["Is it **ethical** to alter someone's reality without their knowledge?", "Where is the line between **curation** and **manipulation**?"],
                    "vocab": {"manipulated": "Controlled or influenced someone in a clever or dishonest way", "ethical": "Relating to what is morally right and wrong", "curation": "The process of selecting and organizing content"}
                },
                {
                    "main": "Should AI researchers be **legally liable** for the consequences of their creations?",
                    "subs": ["If an AI causes harm, who is **responsible** — the creator, the user, or the AI itself?", "Could **liability** concerns prevent important AI breakthroughs?"],
                    "vocab": {"legally liable": "Officially responsible according to the law", "responsible": "Having a duty to deal with someone or something"}
                }
            ]
        },
        {
            "title": "Social Media & Mental Life",
            "image_keywords": "social media,phone,screen",
            "questions": [
                {
                    "main": "Do you think social media has made us more **connected** or more **isolated**?",
                    "subs": ["How many of your online friendships would survive without social media?", "Has social media changed the way you see yourself?"],
                    "vocab": {"connected": "Having contact or communication with other people", "isolated": "Separated from other people; alone"}
                },
                {
                    "main": "If you had to **permanently** delete all your social media accounts, how would your life change?",
                    "subs": ["What would you lose that you genuinely **value**?", "What would you gain?"],
                    "vocab": {"permanently": "Forever; not temporarily", "value": "To consider something important and worthwhile"}
                },
                {
                    "main": "Is the culture of **validation** through likes and comments **reshaping** how we see our own worth?",
                    "subs": ["Do you ever feel anxious when a post doesn't get enough likes?", "Should platforms be legally required to hide like counts?"],
                    "vocab": {"validation": "Approval or confirmation that something is good or worthwhile", "reshaping": "Changing the form or structure of something"}
                },
                {
                    "main": "Should there be a minimum age for social media, and how should it be **enforced**?",
                    "subs": ["Was social media good or bad for your own **adolescence**?", "Who should decide — parents, governments, or the companies themselves?"],
                    "vocab": {"enforced": "Made sure that a rule or law is obeyed", "adolescence": "The period of life between childhood and adulthood"}
                },
                {
                    "main": "Do you think **influencers** are **responsible** for the content they promote to young people?",
                    "subs": ["Where does personal freedom end and social responsibility begin?", "Should influencers need a license to promote products?"],
                    "vocab": {"influencers": "People who affect the opinions or buying habits of others online", "responsible": "Having a duty to deal with something or take care of someone"}
                },
                {
                    "main": "Has social media made it easier or harder to have **genuine** conversations about important issues?",
                    "subs": ["Do you think online debates bring people together or push them apart?", "Is your **outrage** on social media always **justified**?"],
                    "vocab": {"genuine": "True and real; not fake", "outrage": "A strong feeling of anger or shock", "justified": "Having a good reason for something"}
                },
                {
                    "main": "Do you think social media has **fundamentally** changed the way humans form relationships?",
                    "subs": ["Has a social media connection ever turned into a real-life friendship?", "Is online intimacy as meaningful as face-to-face intimacy?"],
                    "vocab": {"fundamentally": "In a basic and important way"}
                },
                {
                    "main": "If social media didn't exist, how would you find people who share your interests?",
                    "subs": ["Would you be more or less **selective** about your friendships?", "Is it easier now to find your 'tribe' than it was 30 years ago?"],
                    "vocab": {"selective": "Careful about choosing only the best or most suitable"}
                },
                {
                    "main": "Should governments have the power to shut down social media platforms during times of **crisis**?",
                    "subs": ["Who decides what constitutes a **crisis**?", "Has social media ever helped you during a difficult time?"],
                    "vocab": {"crisis": "A time of great danger, difficulty, or uncertainty"}
                },
                {
                    "main": "Do you think the **addictive** design of social media is **intentional** and **deliberate**?",
                    "subs": ["What feature of social media do you find hardest to resist?", "Should there be laws against deliberately **engineered** addiction?"],
                    "vocab": {"addictive": "Causing a strong habit that is hard to stop", "intentional": "Planned and done on purpose", "deliberate": "Done consciously and intentionally"}
                },
                {
                    "main": "If you could go back to the moment before you joined your first social media platform, would you still sign up?",
                    "subs": ["What's the best thing social media has given you?", "What's the worst thing it has taken away?"],
                    "vocab": {}
                },
                {
                    "main": "Is **cancel culture** on social media a form of **accountability** or a dangerous **mob mentality**?",
                    "subs": ["Have you ever stopped supporting someone because of something they posted online?", "Should people be allowed to grow and change, or are online mistakes permanent?"],
                    "vocab": {"accountability": "The responsibility of being the reason for your own actions", "mob mentality": "When a group of people act together in an uncontrolled way"}
                },
                {
                    "main": "Do you think **artificial** social media personas are creating a generation that lies about who they really are?",
                    "subs": ["How much of your own social media presence is **genuine**?", "Is it unhealthy to have different versions of yourself online and offline?"],
                    "vocab": {"artificial": "Not real or natural; made by people", "genuine": "Truly what something is said to be; authentic"}
                },
                {
                    "main": "If a social media company offered you a million dollars to quit all platforms forever, would you take it?",
                    "subs": ["What does your answer reveal about your relationship with technology?", "Could you earn the same money without social media?"],
                    "vocab": {}
                },
                {
                    "main": "Will future generations look back at our social media use the way we look back at smoking — as a **dangerous** addiction we didn't understand?",
                    "subs": ["What digital habits do you hope your children won't adopt?", "Is society becoming more or less **aware** of social media's dangers?"],
                    "vocab": {"dangerous": "Able or likely to cause harm", "aware": "Having knowledge or understanding of a situation"}
                }
            ]
        },
        {
            "title": "The Future of Work",
            "image_keywords": "future workplace,office,technology",
            "questions": [
                {
                    "main": "Would you prefer a high-paying job you **despise** or a low-paying job you absolutely love?",
                    "subs": ["How much does money really contribute to your overall **wellbeing**?", "At what salary would you tolerate a job you hate?"],
                    "vocab": {"despise": "To hate something very much", "wellbeing": "The state of feeling healthy, happy, and comfortable"}
                },
                {
                    "main": "Do you think the 40-hour work week is **obsolete**, or do we still need that structure?",
                    "subs": ["Should companies be **mandating** a maximum number of hours?", "Would you be more productive working 4 days instead of 5?"],
                    "vocab": {"obsolete": "No longer useful; out of date", "mandating": "Officially requiring something by law or rule"}
                },
                {
                    "main": "If robots could do 80% of your job, should you still get paid the same?",
                    "subs": ["What would people do with all that extra free time?", "Should companies **redistribute** the profits from automation to workers?"],
                    "vocab": {"redistribute": "To share something out among people in a different way"}
                },
                {
                    "main": "Is **job security** more important than **fulfillment** in your career?",
                    "subs": ["Have you ever quit a stable job to follow a **passion**?", "How do you balance financial security against doing meaningful work?"],
                    "vocab": {"job security": "The state of having a steady position that is unlikely to disappear", "fulfillment": "The feeling of being happy and satisfied because you are doing useful or important work", "passion": "A very strong interest in or love for something"}
                },
                {
                    "main": "Should companies be allowed to **monitor** their employees through technology?",
                    "subs": ["Where is the line between **productivity** tracking and **surveillance**?", "Would you accept a job that tracked your every keystroke if the pay was excellent?"],
                    "vocab": {"monitor": "To watch and check something carefully over a period of time", "productivity": "The rate at which someone works or how much they produce", "surveillance": "Close observation of a person or group, especially one suspected of wrongdoing"}
                },
                {
                    "main": "If you could work from anywhere in the world, would you choose a beach, a mountain, or a bustling city?",
                    "subs": ["How does your physical environment affect your **creativity** and focus?", "Do you think you'd miss the energy of a busy workplace?"],
                    "vocab": {"bustling": "Full of busy activity"}
                },
                {
                    "main": "Do you think **universal basic income** — where everyone gets paid by the government — is a realistic solution to automation?",
                    "subs": ["Would people still choose to work if they received money for nothing?", "Could universal basic income make society more **equal** or more **dependent**?"],
                    "vocab": {"universal basic income": "Money paid by the government to every person regardless of whether they work or not", "equal": "The same in status, rights, or opportunities", "dependent": "Needing someone or something for support"}
                },
                {
                    "main": "Should companies require employees to be available after hours, or is that a violation of personal **boundaries**?",
                    "subs": ["How do you **switch off** from work at the end of the day?", "Do you think younger generations have better work-life boundaries than older ones?"],
                    "vocab": {"boundaries": "Limits that define acceptable behavior or separate different areas"}
                },
                {
                    "main": "If you knew your job would be **automated** within five years, what would you do differently today?",
                    "subs": ["What skills can you develop that robots cannot replicate?", "How do you prepare for a future that is **uncertain**?"],
                    "vocab": {"automated": "Done by machines instead of people", "uncertain": "Not able to be known or declared in advance"}
                },
                {
                    "main": "Is **competition** between colleagues healthy for a workplace, or does it **destroy** teamwork?",
                    "subs": ["Have you ever had a toxic rivalry at work?", "What's the difference between healthy competition and **sabotaging** others?"],
                    "vocab": {"competition": "A situation where people try to win or be the best", "destroy": "To damage something so badly that it no longer exists", "sabotaging": "Deliberately destroying or damaging something"}
                },
                {
                    "main": "Would you rather work for a large corporation with **stability** or a small startup with **creative freedom**?",
                    "subs": ["What attracts you more — financial security or the chance to make a real impact?", "Do you think size of company affects happiness at work?"],
                    "vocab": {"stability": "The quality of not changing likely to fall or move", "creative freedom": "The ability to use your imagination and ideas at work"}
                },
                {
                    "main": "If every job paid the same salary, what work would you choose to do?",
                    "subs": ["What does this tell you about what truly **motivates** you?", "Would society function better if all jobs were valued equally?"],
                    "vocab": {"motivates": "Gives someone a reason or enthusiasm to do something"}
                },
                {
                    "main": "Do you think **loyalty** to a single company is still valuable, or should people change jobs every few years?",
                    "subs": ["How long have you stayed in your longest job?", "Is it better to be a specialist in one field or a generalist with many skills?"],
                    "vocab": {"loyalty": "The quality of being faithful and supportive"}
                },
                {
                    "main": "If you could create the perfect job description for yourself, what three things would be at the top?",
                    "subs": ["Does your current job match what you actually want?", "What's the most important thing a job can give you — money, meaning, or freedom?"],
                    "vocab": {}
                },
                {
                    "main": "Will humans ever completely **reject** technology in the workplace and return to traditional ways of working?",
                    "subs": ["Is there a part of your work that you think should never be **digitalized**?", "What have we lost by relying so heavily on technology at work?"],
                    "vocab": {"reject": "To refuse to accept something", "digitalized": "Converted from physical to digital form"}
                }
            ]
        },
        {
            "title": "Privacy in a Digital World",
            "image_keywords": "privacy,digital,surveillance",
            "questions": [
                {
                    "main": "Do you believe you have a **fundamental** right to online privacy, even if it makes law enforcement harder?",
                    "subs": ["Would you give up some privacy if it guaranteed your safety?", "Has a lack of privacy ever **impacted** your behaviour online?"],
                    "vocab": {"fundamental": "Relating to the most basic and important part of something", "impacted": "Had an effect on something"}
                },
                {
                    "main": "If a company offered you a free service in exchange for all your personal data, would you accept?",
                    "subs": ["Do you actually read **privacy policies**, or do you just click agree?", "Should there be a **monetary** value assigned to personal data?"],
                    "vocab": {"privacy policies": "Documents explaining how a company collects and uses your data", "monetary": "Relating to money"}
                },
                {
                    "main": "Is it **ethical** for companies to use your data to **manipulate** what you buy or how you vote?",
                    "subs": ["How much of your online behaviour do you think is genuinely your own choice?", "Should there be an independent body that **regulates** data collection?"],
                    "vocab": {"ethical": "Relating to what is morally right and wrong", "manipulate": "To control or influence someone in a clever or dishonest way", "regulates": "To control something by rules or laws"}
                },
                {
                    "main": "Would you want to live in a city with cameras on every corner if it reduced crime to almost zero?",
                    "subs": ["Is safety worth more than **anonymity**?", "Could such a system be **abused** by those in power?"],
                    "vocab": {"anonymity": "The state of not being identified by name", "abused": "Used in a harmful or wrong way"}
                },
                {
                    "main": "Do you think future generations will look back at our lack of digital privacy with **horror** or **understanding**?",
                    "subs": ["Are we already too far gone to **reclaim** our digital privacy?", "What would a truly private internet look like?"],
                    "vocab": {"horror": "An extremely strong feeling of fear, shock, or disgust", "understanding": "Sympathetic awareness or tolerance", "reclaim": "To get something back that was lost or taken away"}
                },
                {
                    "main": "Is it **naive** to believe that anything you do online is truly private?",
                    "subs": ["Have you ever been surprised by an ad that seemed to know too much about you?", "What's the most personal thing you've ever shared online?"],
                    "vocab": {"naive": "Showing a lack of experience or understanding"}
                },
                {
                    "main": "Should parents have the right to share their children's photos and information online without the child's **consent**?",
                    "subs": ["Do you think children should have the right to **delete** their digital footprint when they turn 18?", "How do you feel about the fact that your parents may have posted about you before you could speak?"],
                    "vocab": {"consent": "Permission or agreement", "delete": "Remove something completely", "digital footprint": "The information about you that exists on the internet"}
                },
                {
                    "main": "If a **hacker** stole your entire digital identity, what would be the most difficult thing to recover?",
                    "subs": ["How much of your life depends on your digital identity?", "What steps do you take to protect your online accounts?"],
                    "vocab": {"hacker": "A person who secretly uses or changes information in other people's computer systems"}
                },
                {
                    "main": "Do you think **passwords** will become obsolete, replaced by fingerprint or face recognition?",
                    "subs": ["Is biometric data more or less secure than a password?", "What happens if your biometric data is stolen — can you change your face?"],
                    "vocab": {"passwords": "Secret words or combinations used to access accounts", "obsolete": "No longer used or useful", "biometric": "Using unique physical characteristics like fingerprints to identify someone"}
                },
                {
                    "main": "Should there be a **statute of limitations** on your online past, meaning old posts can't be used against you after a certain time?",
                    "subs": ["Have you ever Googled someone before meeting them?", "Should employers be allowed to look at your social media from ten years ago?"],
                    "vocab": {"statute of limitations": "A law that sets a maximum time after an event within which legal action can be taken"}
                },
                {
                    "main": "If you could see every piece of data a single company has about you, would you want to know?",
                    "subs": ["Which company do you think knows the most about you?", "Would seeing this data change your behavior?"],
                    "vocab": {}
                },
                {
                    "main": "Is the convenience of **smart home** devices worth the amount of personal data they collect?",
                    "subs": ["Do you have any smart devices in your home? Do you trust them?", "Should smart device companies be required to let users see all collected data?"],
                    "vocab": {"smart home": "Home devices connected to the internet that can be controlled remotely"}
                },
                {
                    "main": "Do you think **encryption** — making messages unreadable to anyone except the sender and receiver — should be a legal right?",
                    "subs": ["Should governments have a **backdoor** to encrypted messages for security reasons?", "What are the risks if only criminals can communicate privately?"],
                    "vocab": {"encryption": "The process of converting information into a secret code", "backdoor": "A secret way of getting into a computer system"}
                },
                {
                    "main": "If you had to choose between giving up your smartphone or giving up your car, which would you choose?",
                    "subs": ["How has your smartphone changed the way you navigate daily life?", "Could you function in modern society without a smartphone?"],
                    "vocab": {}
                },
                {
                    "main": "Will privacy become a **luxury** that only wealthy people can afford in the future?",
                    "subs": ["Are you willing to pay for services that don't collect your data?", "Should privacy be a basic right or a premium feature?"],
                    "vocab": {"luxury": "Something expensive that is not essential but gives pleasure"}
                }
            ]
        },
        {
            "title": "Smart Homes & IoT",
            "image_keywords": "smart home,iot,connected devices",
            "questions": [
                {
                    "main": "If your home could **anticipate** your every need — adjusting temperature, ordering food, playing music — would you want that level of **automation**?",
                    "subs": ["What's the most **mundane** task you'd love a smart home to handle for you?", "At what point does a helpful home become a **surveilling** home?"],
                    "vocab": {"anticipate": "To expect something and take action before it happens", "automation": "The use of machines to do work without human control", "mundane": "Boring and ordinary", "surveilling": "Watching someone carefully and secretly"}
                },
                {
                    "main": "Do you think **Internet of Things** devices make us lazier or more efficient?",
                    "subs": ["What smart device has genuinely improved your daily life?", "Have you ever felt **frustrated** when a smart device didn't work as expected?"],
                    "vocab": {"Internet of Things": "Everyday objects connected to the internet that can send and receive data"}
                },
                {
                    "main": "If a smart home system could detect when you're **stressed** and adjust the environment to calm you down, would you find that helpful or **intrusive**?",
                    "subs": ["How much control are you willing to give to an automated system?", "Should your home have the right to make decisions about your wellbeing?"],
                    "vocab": {"intrusive": "Causing disruption or annoyance by being unwelcome"}
                },
                {
                    "main": "Should smart home data — when you wake up, what you eat, how much you sleep — be protected by **law**?",
                    "subs": ["Who owns the data your smart devices collect — you or the manufacturer?", "Could insurance companies use smart home data to adjust your premiums?"],
                    "vocab": {"law": "A rule made by a government that people must follow", "premiums": "The amount you pay for insurance regularly"}
                },
                {
                    "main": "If your smart home was **hacked**, what would be the most **disturbing** thing a stranger could control?",
                    "subs": ["How much do you worry about the security of your connected devices?", "Should there be **mandatory** security standards for smart home products?"],
                    "vocab": {"hacked": "Gained unauthorized access to a computer system", "disturbing": "Worrying or upsetting", "mandatory": "Required by law or rules"}
                },
                {
                    "main": "Do you think smart homes will eventually be able to **predict** health problems before you even feel symptoms?",
                    "subs": ["Would you want your home to alert you to a potential health issue?", "How would early detection change your relationship with your doctor?"],
                    "vocab": {"predict": "To say that something will happen before it occurs", "symptoms": "Physical signs of an illness"}
                },
                {
                    "main": "Is the idea of a **fully automated** home exciting or **unsettling** to you?",
                    "subs": ["What part of your daily routine would you never want to automate?", "Do you think automation takes away the satisfaction of doing things yourself?"],
                    "vocab": {"unsettling": "Causing worry or anxiety"}
                },
                {
                    "main": "If your smart speaker **accidentally** recorded a private conversation and sent it to a random contact, how would you feel?",
                    "subs": ["Do you trust voice assistants to only listen when you activate them?", "Should companies be **fined** for smart device privacy breaches?"],
                    "vocab": {"accidentally": "By chance or mistake", "fined": "Made to pay money as punishment", "breaches": "Acts of breaking or failing to observe a law or agreement"}
                },
                {
                    "main": "Should children grow up in smart homes, or does too much automation **stunt** their development?",
                    "subs": ["What life skills might children miss if everything is automated for them?", "Is there value in learning to do things the hard way?"],
                    "vocab": {"stunt": "To prevent something from growing or developing properly"}
                },
                {
                    "main": "If you could design a smart home from scratch, what would be the one **essential** feature?",
                    "subs": ["Would you prioritize convenience, security, energy efficiency, or entertainment?", "How much would you spend on a truly smart home?"],
                    "vocab": {"essential": "Absolutely necessary"}
                },
                {
                    "main": "Do you think smart homes will make neighborhoods more **equal** or increase the **gap** between rich and poor?",
                    "subs": ["Could smart home technology ever be affordable for everyone?", "What happens to people who can't keep up with technological change?"],
                    "vocab": {"gap": "A large difference between two things"}
                },
                {
                    "main": "If your smart home system could **communicate** with your neighbors' systems to optimize the whole street's energy use, would you participate?",
                    "subs": ["How much **communal** decision-making are you comfortable with?", "Could shared smart systems create conflicts between neighbors?"],
                    "vocab": {"communal": "Shared by all members of a community"}
                },
                {
                    "main": "Is there something **dehumanizing** about living in a home that thinks for you?",
                    "subs": ["What makes a house feel like a home — the technology or the people inside?", "Could too much comfort actually make us less **resilient**?"],
                    "vocab": {"dehumanizing": "Taking away human qualities like independence and creativity", "resilient": "Able to recover quickly from difficult situations"}
                },
                {
                    "main": "If a smart home could **detect** that you were becoming **depressed** and suggest activities to help, would you welcome that?",
                    "subs": ["Is mental health something technology should be involved in?", "Could a machine ever truly understand human emotions?"],
                    "vocab": {"detect": "To discover or notice something", "depressed": "Very unhappy and without hope"}
                },
                {
                    "main": "Will smart homes eventually become so **sophisticated** that we forget how to live without them?",
                    "subs": ["What's the most basic life skill you think people might lose to automation?", "Is technological **dependency** something we should be concerned about?"],
                    "vocab": {"sophisticated": "Highly developed and complex", "dependency": "The state of needing something or someone for support"}
                }
            ]
        }
    ],
    "travel": [
        {
            "title": "Dream Destinations",
            "image_keywords": "dream travel,landscape,adventure",
            "questions": [
                {
                    "main": "If you could teleport to any place on Earth right now, where would you go and why?",
                    "subs": ["Is there a destination you have been **dreaming** about since childhood?", "Would you rather visit one place deeply or ten places quickly?"],
                    "vocab": {"teleport": "To instantly move from one place to another without traveling", "dreaming": "Thinking about something you really want, often while sleeping or daydreaming"}
                },
                {
                    "main": "What makes a place truly **unforgettable** — the sights, the people, or something else entirely?",
                    "subs": ["Tell me about a place that **surprised** you in a way you didn't expect.", "Can a beautiful place be ruined by bad company?"],
                    "vocab": {"unforgettable": "Impossible to forget; very memorable", "surprised": "Caused to feel wonder or shock because something was unexpected"}
                },
                {
                    "main": "Is it better to plan every detail of a trip or to **wander** without an **itinerary**?",
                    "subs": ["What's the best **spontaneous** decision you've made while traveling?", "Do you think over-planning kills the sense of **adventure**?"],
                    "vocab": {"wander": "To walk around without a fixed route or purpose", "itinerary": "A planned route or schedule for a journey", "spontaneous": "Done without planning, on impulse", "adventure": "An exciting or unusual experience"}
                },
                {
                    "main": "Would you rather visit a famous **landmark** or a hidden **gem** that no one talks about?",
                    "subs": ["Have you ever been disappointed by a famous tourist attraction?", "How do you find those hidden places that don't appear in guidebooks?"],
                    "vocab": {"landmark": "A well-known or easily recognizable building or place", "gem": "Something special and valuable that not many people know about"}
                },
                {
                    "main": "If you had to live in another country for a year, which would you choose and what would you **miss** most about home?",
                    "subs": ["What does home really mean to you — a place, people, or a feeling?", "Could you ever feel at home in a foreign country?"],
                    "vocab": {"miss": "To feel sad because someone or something is not present"}
                },
                {
                    "main": "Is there a place you've never visited that feels strangely **familiar** to you?",
                    "subs": ["Do you believe in past lives or **déjà vu** connected to places?", "Have you ever felt an instant connection to a place you've never been?"],
                    "vocab": {"familiar": "Well known from being seen or experienced before", "déjà vu": "The feeling that you have experienced something before, even though you haven't"}
                },
                {
                    "main": "If you could take a one-month trip with unlimited budget but had to go alone, would you do it?",
                    "subs": ["What would you do differently with unlimited money?", "Is solo travel more **liberating** or more **intimidating**?"],
                    "vocab": {"liberating": "Making you feel free from limits or restrictions", "intimidating": "Frightening or threatening, especially because something seems difficult"}
                },
                {
                    "main": "What's the most **overrated** tourist destination you've ever visited?",
                    "subs": ["Why do you think it gets so much hype?", "What would you recommend instead?"],
                    "vocab": {"overrated": "Regarded as better than it really is"}
                },
                {
                    "main": "If you could only visit one country for the rest of your life, which would it be?",
                    "subs": ["What does that country offer that nowhere else does?", "Would you get bored, or would you keep discovering new things?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **virtual reality** will ever replace the experience of actually traveling?",
                    "subs": ["What would be lost if we could visit anywhere through a headset?", "Is seeing a place through a screen better than not seeing it at all?"],
                    "vocab": {"virtual reality": "A computer-generated simulation of a real environment"}
                },
                {
                    "main": "What's the most **breathtaking** natural wonder you've ever seen?",
                    "subs": ["How did it make you feel in that moment?", "Is there a natural place that changed how you see the world?"],
                    "vocab": {"breathtaking": "Astonishing or awe-inspiring in quality"}
                },
                {
                    "main": "If you could time-travel to visit any historical place in its prime, where would you go?",
                    "subs": ["What era of history fascinates you the most?", "Would you want to stay there or just visit?"],
                    "vocab": {}
                },
                {
                    "main": "Is **tourism** helping or hurting the world's most beautiful places?",
                    "subs": ["Have you ever contributed to **overtourism** without realizing it?", "What's the most responsible way to travel?"],
                    "vocab": {"tourism": "The business of providing services for tourists", "overtourism": "When too many tourists visit a destination, causing problems"}
                },
                {
                    "main": "What's a place that completely **exceeded** your expectations?",
                    "subs": ["What did you expect, and what did you actually find?", "Has a place ever surprised you in a negative way?"],
                    "vocab": {"exceeded": "Was much better than expected"}
                },
                {
                    "main": "If you could build your dream home anywhere on Earth, where would you put it?",
                    "subs": ["What natural feature would you want outside your window?", "Would you choose isolation or being near a community?"],
                    "vocab": {}
                }
            ]
        },
        {
            "title": "Culture Shock Stories",
            "image_keywords": "culture shock,foreign,street",
            "questions": [
                {
                    "main": "What's the biggest **culture shock** you've ever experienced, either abroad or at home?",
                    "subs": ["Did it change the way you see your own culture?", "What's something from another culture you wish existed in your own country?"],
                    "vocab": {"culture shock": "The feeling of confusion or anxiety when experiencing an unfamiliar culture"}
                },
                {
                    "main": "Is it **offensive** to laugh at cultural differences, or is humor the best way to **bridge** the gap?",
                    "subs": ["Have you ever accidentally **insulted** someone from another culture?", "What's the difference between **appreciating** and **appropriating** another culture?"],
                    "vocab": {"offensive": "Causing someone to feel upset, annoyed, or insulted", "bridge": "To connect two things or reduce the distance between them", "insulted": "Said or did something rude or disrespectful to someone", "appreciating": "Recognizing the value or quality of something", "appropriating": "Taking something from another culture in a disrespectful way"}
                },
                {
                    "main": "Should tourists be expected to learn basic phrases in the local language, or is English enough?",
                    "subs": ["How does it feel when foreigners make an effort to speak your language?", "What's the most useful phrase you've ever learned while traveling?"],
                    "vocab": {}
                },
                {
                    "main": "Have you ever felt like a **foreigner** in your own country?",
                    "subs": ["What makes someone belong to a place?", "Is it possible to fully **integrate** into a new culture, or will you always be an outsider?"],
                    "vocab": {"foreigner": "A person in a country that is not their own", "integrate": "To become part of a group or society and feel accepted"}
                },
                {
                    "main": "What's a custom from your culture that might seem **bizarre** to outsiders?",
                    "subs": ["How do you explain your traditions to people who find them strange?", "Should we **preserve** unusual traditions even if they no longer serve a practical purpose?"],
                    "vocab": {"bizarre": "Very strange and unusual", "preserve": "To keep something in its original state or in good condition"}
                },
                {
                    "main": "If you moved to a country where you didn't speak the language, how would you **survive** the first month?",
                    "subs": ["What's the most creative way you've seen someone communicate without words?", "How long does it take to feel comfortable in a completely foreign environment?"],
                    "vocab": {"survive": "To continue to live or exist, especially in difficult conditions"}
                },
                {
                    "main": "Is there a food from another culture that you found **revolting** at first but now love?",
                    "subs": ["What changed your mind?", "Is there a food from your culture that foreigners find disgusting?"],
                    "vocab": {"revolting": "Extremely unpleasant; disgusting"}
                },
                {
                    "main": "Do you think **stereotypes** about cultures are always harmful, or can some be based on truth?",
                    "subs": ["What stereotype about your culture annoys you the most?", "Have you ever met someone who completely **defied** a cultural stereotype?"],
                    "vocab": {"stereotypes": "Fixed ideas about what a particular type of person or thing is like", "defied": "To refuse to obey or resist something powerfully"}
                },
                {
                    "main": "What's the most **embarrassing** cultural mistake you've made?",
                    "subs": ["How did the other people react?", "What did you learn from the experience?"],
                    "vocab": {"embarrassing": "Causing you to feel ashamed, foolish, or awkward"}
                },
                {
                    "main": "If you could adopt one cultural practice from anywhere in the world, what would it be?",
                    "subs": ["How would it fit into your daily life?", "What does this say about what you value?"],
                    "vocab": {}
                },
                {
                    "main": "Is it **possible** to truly understand a culture without living in it for years?",
                    "subs": ["What's the best way to learn about a culture without being **superficial**?", "Can books and films give you real cultural understanding?"],
                    "vocab": {"possible": "Able to be done or achieved", "superficial": "Not having or showing any depth of understanding"}
                },
                {
                    "main": "Have you ever been **judged** because of your cultural background?",
                    "subs": ["How did it make you feel?", "How did you respond to the situation?"],
                    "vocab": {"judged": "Formed an opinion about someone, often in an unfair way"}
                },
                {
                    "main": "What's the biggest **misconception** people have about your culture?",
                    "subs": ["Where do you think this misconception comes from?", "How do you try to correct it?"],
                    "vocab": {"misconception": "A belief that is not based on correct information"}
                },
                {
                    "main": "If you had to explain your culture's most important value to an alien, what would you say?",
                    "subs": ["Why is this value so central to your way of life?", "Is this value universal, or unique to your culture?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think the world is becoming more **culturally similar**, or are differences becoming more **pronounced**?",
                    "subs": ["Is globalization a threat to cultural diversity?", "What cultural difference do you hope never disappears?"],
                    "vocab": {"culturally similar": "Having the same or very similar customs and beliefs", "pronounced": "Very noticeable or marked"}
                }
            ]
        },
        {
            "title": "Travel Mishaps & Lessons",
            "image_keywords": "travel problems,lost,airport",
            "questions": [
                {
                    "main": "What's the worst travel **disaster** you've ever experienced?",
                    "subs": ["Did it make you want to stop traveling, or did it become a great story?", "What's the most important lesson a travel mishap taught you?"],
                    "vocab": {"disaster": "A sudden event causing great damage or suffering"}
                },
                {
                    "main": "Have you ever gotten completely lost in a foreign place? How did you find your way back?",
                    "subs": ["Do you think getting lost is the best way to discover a new city?", "How has GPS changed the way we experience travel?"],
                    "vocab": {}
                },
                {
                    "main": "If your luggage was lost and you could only keep three items from it, which would you choose?",
                    "subs": ["What does this tell you about what you truly **value**?", "How **attached** are you to your physical possessions?"],
                    "vocab": {"value": "To consider something important and worthwhile", "attached": "Having a strong emotional connection to something"}
                },
                {
                    "main": "Is it better to have a detailed **contingency** plan or to **embrace** the chaos?",
                    "subs": ["What's the most **unpredictable** thing that happened to you on a trip?", "Do you think bad travel experiences make better stories than good ones?"],
                    "vocab": {"contingency": "A plan for what to do if something unexpected happens", "embrace": "To accept something enthusiastically", "unpredictable": "Not able to be known or declared in advance"}
                },
                {
                    "main": "Would you rather have a **luxurious** trip once or three **budget** trips to different places?",
                    "subs": ["Does spending more money on travel actually make it more meaningful?", "What's the cheapest trip you've ever taken, and was it memorable?"],
                    "vocab": {"luxurious": "Very comfortable and expensive", "budget": "Low-cost; designed to save money"}
                },
                {
                    "main": "What's the most **ridiculous** problem you've caused for yourself while traveling?",
                    "subs": ["How did you solve it?", "Would you laugh about it now or are you still embarrassed?"],
                    "vocab": {"ridiculous": "Deserving to be laughed at; silly or unreasonable"}
                },
                {
                    "main": "If your flight was delayed for 12 hours, how would you **cope**?",
                    "subs": ["What's the longest delay you've ever experienced?", "Do you think airlines should compensate passengers more fairly?"],
                    "vocab": {"cope": "To deal successfully with a difficult situation"}
                },
                {
                    "main": "Have you ever been **scammed** while traveling? What happened?",
                    "subs": ["How did you realize you were being **deceived**?", "What warning signs do you look for now?"],
                    "vocab": {"scammed": "Cheated out of money or property", "deceived": "Made to believe something that is not true"}
                },
                {
                    "main": "Is there a travel mistake you keep making no matter how many times you learn the lesson?",
                    "subs": ["What's your most **recurring** travel problem?", "Why do you think you keep repeating it?"],
                    "vocab": {"recurring": "Happening again and again"}
                },
                {
                    "main": "If you could go back and give your younger self one piece of travel advice, what would it be?",
                    "subs": ["What do you wish you had known before your first big trip?", "What's the best travel advice anyone has ever given you?"],
                    "vocab": {}
                },
                {
                    "main": "What's the most **generous** thing a stranger has done for you while traveling?",
                    "subs": ["How did it affect your view of human nature?", "Have you ever paid that kindness forward?"],
                    "vocab": {"generous": "Willing to give more money, help, or time than is expected"}
                },
                {
                    "main": "Have you ever missed a flight, train, or bus that **ruined** your entire itinerary?",
                    "subs": ["How did you recover from the situation?", "Did the detour end up being better than the original plan?"],
                    "vocab": {"ruined": "Spoiled or destroyed something", "itinerary": "A planned route or schedule for a journey", "detour": "A longer route taken to avoid something or to visit somewhere"}
                },
                {
                    "main": "What's the most **uncomfortable** travel experience you've endured?",
                    "subs": ["Was it worth it in the end?", "What's your threshold for discomfort when traveling?"],
                    "vocab": {"uncomfortable": "Causing a feeling of slight pain or physical discomfort", "endured": "Suffered something difficult or unpleasant with patience"}
                },
                {
                    "main": "If you could **teleport** home from your last trip, would you have?",
                    "subs": ["What made you want to leave?", "What kept you there?"],
                    "vocab": {"teleport": "To instantly move from one place to another without traveling"}
                },
                {
                    "main": "Do you think travel **brochures** and Instagram posts give a realistic picture of destinations?",
                    "subs": ["Have you ever felt **deceived** by travel marketing?", "What's the most honest travel review you've ever read?"],
                    "vocab": {"brochures": "Booklets with pictures and information about a place", "deceived": "Made to believe something that is not true"}
                }
            ]
        },
        {
            "title": "Solo Travel",
            "image_keywords": "solo traveler,backpack,alone",
            "questions": [
                {
                    "main": "What **compels** some people to travel alone, and does it appeal to you?",
                    "subs": ["Is solo travel **liberating** or **lonely**?", "What's the biggest fear people have about traveling alone?"],
                    "vocab": {"compels": "Forces or strongly encourages someone to do something", "liberating": "Making you feel free from limits or restrictions", "lonely": "Sad because you have no friends or company"}
                },
                {
                    "main": "If you traveled alone to a country where you don't speak the language, how would you **cope**?",
                    "subs": ["What strategies do you use to communicate without words?", "Has a language barrier ever led to a **hilarious** misunderstanding?"],
                    "vocab": {"cope": "To deal successfully with a difficult situation", "hilarious": "Extremely funny"}
                },
                {
                    "main": "Do you think solo travelers have **deeper** experiences than those who travel in groups?",
                    "subs": ["What do you lose when you travel alone?", "Is there a destination you would never visit solo?"],
                    "vocab": {"deeper": "More intense, meaningful, or profound"}
                },
                {
                    "main": "Should parents be **concerned** about their adult children traveling alone to unfamiliar places?",
                    "subs": ["At what age did you first travel independently?", "How do you balance **safety** with the desire for adventure?"],
                    "vocab": {"concerned": "Worried or anxious about something", "safety": "The condition of being protected from danger or harm"}
                },
                {
                    "main": "If you could take one person — living or dead — on a solo-style trip with you, who would it be?",
                    "subs": ["What would you want to show them?", "Would their presence change the experience, or would it still feel like a solo journey?"],
                    "vocab": {}
                },
                {
                    "main": "What's the loneliest you've ever felt while traveling?",
                    "subs": ["How did you deal with that feeling?", "Did the loneliness eventually turn into something positive?"],
                    "vocab": {}
                },
                {
                    "main": "Is it harder to meet people when you travel alone, or do strangers **approach** you more easily?",
                    "subs": ["What's the best friendship you've made while traveling solo?", "Do you think solo travelers are more **approachable** than groups?"],
                    "vocab": {"approach": "To come near or nearer to someone", "approachable": "Friendly and easy to talk to"}
                },
                {
                    "main": "If you had to choose between a luxury solo trip and a budget trip with friends, which would you pick?",
                    "subs": ["What matters more — the experience or the company?", "Can you have a meaningful travel experience without spending much money?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think solo travel builds **character** in ways that group travel cannot?",
                    "subs": ["What personal quality has solo travel strengthened in you?", "Is there a type of person who should never travel alone?"],
                    "vocab": {"character": "The mental and moral qualities that make someone different from others"}
                },
                {
                    "main": "What's the most **spontaneous** thing you've done while traveling alone?",
                    "subs": ["Do you think you'd have done it if you were with someone else?", "How does traveling alone change your decision-making?"],
                    "vocab": {"spontaneous": "Done without planning, on impulse"}
                },
                {
                    "main": "If a friend told you they were planning their first solo trip, what advice would you give them?",
                    "subs": ["What should they absolutely pack?", "What's the one mistake they should avoid?"],
                    "vocab": {}
                },
                {
                    "main": "Is there a **stigma** attached to traveling alone, especially for women?",
                    "subs": ["Have you ever felt judged for traveling solo?", "How do you respond to people who think solo travel is strange?"],
                    "vocab": {"stigma": "A strong feeling of disapproval in society about something"}
                },
                {
                    "main": "Do you think technology has made solo travel easier or harder?",
                    "subs": ["Has your phone ever saved you in a difficult situation abroad?", "Do you think being constantly connected takes away from the solo experience?"],
                    "vocab": {}
                },
                {
                    "main": "What's the most **profound** moment you've had while traveling alone?",
                    "subs": ["Why do you think it happened when you were by yourself?", "Has solo travel changed how you see yourself?"],
                    "vocab": {"profound": "Very great or intense; having a strong effect"}
                },
                {
                    "main": "If the world was completely safe and free, where would you travel alone first?",
                    "subs": ["What's stopping you from going there now?", "Is fear of the unknown the biggest barrier to travel?"],
                    "vocab": {}
                }
            ]
        },
        {
            "title": "Sustainable Tourism",
            "image_keywords": "sustainable tourism,eco travel,green",
            "questions": [
                {
                    "main": "Do you think **sustainable tourism** is something most travelers genuinely care about, or is it just **trendy** to say so?",
                    "subs": ["Have you ever changed a travel plan for environmental reasons?", "What's the most **eco-friendly** trip you've ever taken?"],
                    "vocab": {"sustainable tourism": "Travel that minimizes negative impact on the environment and local communities", "trendy": "Very fashionable or popular at a particular time", "eco-friendly": "Not harmful to the environment"}
                },
                {
                    "main": "Should popular tourist destinations **limit** the number of visitors they allow each year?",
                    "subs": ["Would you pay more for a ticket to a restricted destination?", "Is it fair to limit access to natural wonders that belong to everyone?"],
                    "vocab": {"limit": "To stop something from increasing beyond a certain amount"}
                },
                {
                    "main": "If you discovered a beautiful, untouched place, would you share it online or keep it a secret?",
                    "subs": ["Have you ever contributed to a place becoming **overcrowded** by sharing it?", "Is it **irresponsible** to promote hidden destinations on social media?"],
                    "vocab": {"untouched": "Not changed or damaged by people", "overcrowded": "Filled with too many people", "irresponsible": "Not showing a sense of responsibility"}
                },
                {
                    "main": "Do you think **carbon offsetting** — paying to compensate for your flight emissions — actually works?",
                    "subs": ["Have you ever paid to offset your travel carbon footprint?", "Is carbon offsetting just a way for travelers to ease their **guilt**?"],
                    "vocab": {"carbon offsetting": "Paying for activities that reduce carbon dioxide to compensate for the emissions you create", "guilt": "A feeling of having done something wrong"}
                },
                {
                    "main": "Should tourists be required to follow a **code of conduct** when visiting sensitive cultural or natural sites?",
                    "subs": ["What rules would you include in a tourist code of conduct?", "Who should **enforce** these rules — locals, governments, or tour operators?"],
                    "vocab": {"code of conduct": "A set of rules about how people should behave", "enforce": "To make sure a rule or law is obeyed"}
                },
                {
                    "main": "Is **voluntourism** — volunteering while traveling — a genuine help or does it sometimes do more harm than good?",
                    "subs": ["Have you ever volunteered abroad? What was the experience like?", "Should volunteers need qualifications before working in vulnerable communities?"],
                    "vocab": {"voluntourism": "Volunteering while traveling, often in developing countries"}
                },
                {
                    "main": "If you could only travel by train for the rest of your life, would you accept that limitation?",
                    "subs": ["What would you miss most about flying?", "Do you think train travel gives you a deeper connection to the places you pass through?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **cruise ships** should be banned from environmentally sensitive areas?",
                    "subs": ["Have you ever been on a cruise? What was your experience?", "Is the cruise industry compatible with sustainable tourism?"],
                    "vocab": {"cruise ships": "Large ships that take people on holiday voyages", "compatible": "Able to exist together without problems"}
                },
                {
                    "main": "What's the most **responsible** travel decision you've ever made?",
                    "subs": ["How did it affect your experience?", "Did it cost more or less than the irresponsible alternative?"],
                    "vocab": {"responsible": "Having a duty to deal with something in a proper way"}
                },
                {
                    "main": "Should local communities have the **veto power** to reject tourism development in their area?",
                    "subs": ["Can tourism ever be truly welcomed by a community, or does it always change the local culture?", "What's the best example of community-led tourism you've heard of?"],
                    "vocab": {"veto power": "The right to reject a decision or proposal"}
                },
                {
                    "main": "If tourism to your country was banned for one year to let the environment recover, would you support it?",
                    "subs": ["What would your country lose without tourism revenue?", "What would it gain?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **animal tourism** — visiting sanctuaries, swimming with dolphins, riding elephants — should be more strictly **regulated**?",
                    "subs": ["Have you ever participated in animal tourism that you later felt **uncomfortable** about?", "How can tourists tell if an animal attraction is ethical?"],
                    "vocab": {"regulated": "Controlled by rules or laws", "uncomfortable": "Causing a feeling of slight pain or embarrassment"}
                },
                {
                    "main": "Is it possible to travel **extremely** cheaply and still be a responsible tourist?",
                    "subs": ["What's the most budget-friendly sustainable travel tip you know?", "Does being eco-friendly always cost more?"],
                    "vocab": {}
                },
                {
                    "main": "If you were the **minister of tourism** for your country, what's the first policy you would implement?",
                    "subs": ["Would you prioritize economic growth or environmental protection?", "How would you attract the 'right kind' of tourist?"],
                    "vocab": {"minister of tourism": "The government official responsible for tourism policy"}
                },
                {
                    "main": "Will future generations judge us for the environmental damage caused by modern tourism?",
                    "subs": ["What travel habits do you think will be seen as unacceptable in 50 years?", "What should we change now to be more responsible?"],
                    "vocab": {}
                }
            ]
        }
    ],
    "food": [
        {
            "title": "Food Around the World",
            "image_keywords": "world food,cuisine,market",
            "questions": [
                {
                    "main": "What food from another culture has completely **transformed** the way you eat?",
                    "subs": ["Is there a dish you thought would be **disgusting** but turned out to be delicious?", "How does food connect us to other cultures?"],
                    "vocab": {"transformed": "Changed completely in form, appearance, or character", "disgusting": "Extremely unpleasant or offensive"}
                },
                {
                    "main": "If you could only eat the food of one country for the rest of your life, which would you choose?",
                    "subs": ["What dish would you miss most from your own country's **cuisine**?", "How does a country's food reflect its personality?"],
                    "vocab": {"cuisine": "A style or method of cooking, especially associated with a particular country"}
                },
                {
                    "main": "What's the most **exotic** thing you've ever eaten, and would you eat it again?",
                    "subs": ["Is there a food you loved abroad that you can't find at home?", "Should we be more **adventurous** with what we eat, or stick to what we know?"],
                    "vocab": {"exotic": "Unusual and exciting, often from a distant country", "adventurous": "Willing to take risks and try new experiences"}
                },
                {
                    "main": "Do you think **street food** or **fine dining** gives you a more **authentic** taste of a culture?",
                    "subs": ["What's the best meal you've ever had, and where was it?", "Does presentation matter as much as taste when it comes to enjoying food?"],
                    "vocab": {"authentic": "True to its origins; genuine and real"}
                },
                {
                    "main": "If a food from your culture was voted the world's best, would you feel **proud** or **skeptical**?",
                    "subs": ["How much of food appreciation is cultural versus **universal**?", "Should there be an international ranking of cuisines, or is that **biased**?"],
                    "vocab": {"proud": "Feeling deep pleasure from achievements or qualities", "skeptical": "Having doubts about something; not easily convinced", "universal": "Relating to or affecting everyone in the world", "biased": "Unfairly preferring one person or group over another"}
                },
                {
                    "main": "Is there a dish that instantly **transports** you back to a specific moment in your life?",
                    "subs": ["What memory does it connect to?", "Have you ever tried to recreate it and failed?"],
                    "vocab": {"transports": "To cause someone to feel that they are in a different place or time"}
                },
                {
                    "main": "If you could have dinner with any chef in the world, who would it be and what would you ask them?",
                    "subs": ["What cooking skill would you most want to learn from them?", "Is there a chef whose story **inspires** you?"],
                    "vocab": {"inspires": "Encourages someone to do or feel something, especially something creative"}
                },
                {
                    "main": "Do you think **food allergies** and dietary restrictions are taken seriously enough in restaurants?",
                    "subs": ["Have you ever had a bad experience dining out because of a dietary need?", "Should restaurants be required to list all **ingredients** clearly?"],
                    "vocab": {"ingredients": "The foods or substances that are combined to make a particular dish"}
                },
                {
                    "main": "What's a food combination that sounds **horrible** but is actually delicious?",
                    "subs": ["How did you discover this combination?", "What does this say about not judging food by its appearance?"],
                    "vocab": {"horrible": "Very unpleasant or bad"}
                },
                {
                    "main": "If you could **eradicate** one food from existence, which would it be and why?",
                    "subs": ["Is there a food you think is overrated by everyone else?", "What food do you think the world would be better without?"],
                    "vocab": {"eradicate": "To destroy or get rid of something completely", "overrated": "Regarded as better than it really is"}
                },
                {
                    "main": "Do you think **supermarkets** are making us lose touch with where our food comes from?",
                    "subs": ["Do you know how the food you eat daily is produced?", "Should children visit farms as part of their education?"],
                    "vocab": {"supermarkets": "Large shops selling food and household goods"}
                },
                {
                    "main": "What's the most **elaborate** meal you've ever prepared for someone?",
                    "subs": ["How did they react?", "Was the effort worth it?"],
                    "vocab": {"elaborate": "Very complicated and detailed"}
                },
                {
                    "main": "If food could talk, what do you think your last meal would say to you?",
                    "subs": ["Is there a food you feel **guilty** about eating?", "What food do you think loves you back?"],
                    "vocab": {"guilty": "Feeling bad because you have done something wrong"}
                },
                {
                    "main": "Should **insects** become a mainstream food source to help feed the growing world population?",
                    "subs": ["Would you eat a cricket burger if it was proven to be nutritious?", "What's the most unusual protein source you've ever tried?"],
                    "vocab": {"insects": "Small creatures such as ants, flies, and butterflies", "mainstream": "The ideas, attitudes, or activities that are shared by most people", "nutritious": "Containing substances necessary for health and growth"}
                },
                {
                    "main": "If you opened a restaurant, what would be your **signature** dish?",
                    "subs": ["What would you name your restaurant?", "What atmosphere would you create for your diners?"],
                    "vocab": {"signature": "A dish that a particular restaurant or chef is especially known for"}
                }
            ]
        },
        {
            "title": "Cooking as Art",
            "image_keywords": "cooking,chef,kitchen",
            "questions": [
                {
                    "main": "Do you consider cooking a **creative** outlet, a **chore**, or a bit of both?",
                    "subs": ["What's the most elaborate dish you've ever attempted?", "Does cooking for others show love better than words can?"],
                    "vocab": {"creative": "Involving the use of imagination to create something", "chore": "A routine task, especially a household one; a boring job"}
                },
                {
                    "main": "If you were a **celebrity chef**, what is the one dish you'd be famous for?",
                    "subs": ["Would you focus on **traditional** recipes or **experimental** fusion?", "How do cooking shows influence what people cook at home?"],
                    "vocab": {"celebrity chef": "A famous professional cook who appears on TV", "traditional": "Following customs and beliefs that have existed for a long time", "experimental": "Trying new ideas or methods that have not been tested before"}
                },
                {
                    "main": "Should cooking be a basic skill everyone learns in school, like reading and maths?",
                    "subs": ["How has not knowing how to cook affected people's health?", "What's the first thing you ever cooked, and was it any good?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **food photography** on social media has made us appreciate food more or just made us **obsessed** with how it looks?",
                    "subs": ["Have you ever made a dish look better than it tasted for a photo?", "Is it shallow to judge food by its appearance?"],
                    "vocab": {"obsessed": "Thinking about something constantly or frequently"}
                },
                {
                    "main": "If you could master any cooking technique perfectly — **sous vide**, sushi-making, bread baking — which would you choose?",
                    "subs": ["What cooking skill do you most wish you had?", "Is there a family recipe that has been passed down to you?"],
                    "vocab": {}
                },
                {
                    "main": "Is there a **scientific** reason why home-cooked food tastes better, or is it just **nostalgia**?",
                    "subs": ["What's the science behind your favorite cooking method?", "Does knowing the science behind cooking make it more or less enjoyable?"],
                    "vocab": {"scientific": "Based on or relating to science", "nostalgia": "A feeling of pleasure and slight sadness at the same time as you think about things that happened in the past"}
                },
                {
                    "main": "Should **molecular gastronomy** — cooking with science lab equipment — be considered real cooking?",
                    "subs": ["Have you ever tried molecular gastronomy?", "Is there a limit to how far we should take food innovation?"],
                    "vocab": {"molecular gastronomy": "A style of cooking that uses scientific techniques to create unusual dishes"}
                },
                {
                    "main": "If you could only use five **ingredients** for the rest of your cooking life, which would you choose?",
                    "subs": ["What could you create with just those five?", "What ingredient could you simply not live without?"],
                    "vocab": {"ingredients": "The foods or substances that are combined to make a particular dish"}
                },
                {
                    "main": "Do you think **family recipes** should be **preserved** exactly as they are, or should each generation add their own twist?",
                    "subs": ["Is there a recipe in your family that has been passed down?", "What would you change about your grandmother's cooking?"],
                    "vocab": {"preserved": "Kept in its original state", "twist": "An unexpected change or development"}
                },
                {
                    "main": "What's the most **disastrous** cooking experiment you've ever attempted?",
                    "subs": ["What went wrong?", "Did you learn anything useful from the failure?"],
                    "vocab": {"disastrous": "Very bad; causing great damage or suffering"}
                },
                {
                    "main": "If you could cook a meal using only ingredients from your garden, what would you make?",
                    "subs": ["Do you grow any of your own food?", "How different would your diet be if you could only eat what you grew?"],
                    "vocab": {}
                },
                {
                    "main": "Is **baking** more of a science and **cooking** more of an art?",
                    "subs": ["Which do you find more satisfying — following a recipe exactly or improvising?", "Have you ever had a baking disaster that taught you an important lesson?"],
                    "vocab": {"improvising": "Creating something without preparation"}
                },
                {
                    "main": "Should restaurants be **honest** about using frozen or pre-made ingredients, or is the illusion part of the experience?",
                    "subs": ["Does it matter how a dish is made if it tastes good?", "Have you ever been disappointed to learn how a restaurant actually prepares its food?"],
                    "vocab": {"illusion": "An appearance that is not real"}
                },
                {
                    "main": "If you could **patent** a recipe and earn money every time someone made it, what recipe would you choose?",
                    "subs": ["Should recipes be **intellectual property**?", "What's the most valuable recipe in the world?"],
                    "vocab": {"patent": "To obtain the official legal right to make or sell an invention", "intellectual property": "Something unique that someone has created that can be protected by law"}
                },
                {
                    "main": "Will **3D food printing** ever replace traditional cooking in homes and restaurants?",
                    "subs": ["Would you eat a meal that was printed rather than cooked?", "What would be lost if machines took over all cooking?"],
                    "vocab": {}
                }
            ]
        },
        {
            "title": "Restaurant Culture",
            "image_keywords": "restaurant,dining,service",
            "questions": [
                {
                    "main": "What makes a restaurant experience truly **memorable** — the food, the atmosphere, or the service?",
                    "subs": ["Tell me about the best dining experience you've ever had.", "Have you ever had a meal that was terrible but a night you'll never forget?"],
                    "vocab": {"memorable": "Worth remembering; special and unforgettable"}
                },
                {
                    "main": "Do you think **tipping** is a fair system or an **outdated** practice that should be **abolished**?",
                    "subs": ["How does tipping culture in your country compare to others?", "Would you rather pay higher menu prices and no tip, or lower prices and tip?"],
                    "vocab": {"outdated": "No longer modern or useful", "abolished": "Officially ended or stopped"}
                },
                {
                    "main": "Is it **rude** to send food back at a restaurant, or should diners always speak up?",
                    "subs": ["What's the worst service you've ever received at a restaurant?", "How do cultural expectations around hospitality differ from country to country?"],
                    "vocab": {"rude": "Offensively impolite or ill-mannered"}
                },
                {
                    "main": "Would you eat at a restaurant where robots did all the cooking and serving?",
                    "subs": ["What would be lost if human **hospitality** was replaced by automation?", "Is there something about a human chef's personality that adds to a meal?"],
                    "vocab": {"hospitality": "Friendly and generous reception and entertainment of guests"}
                },
                {
                    "main": "Should restaurants be required to show the **calorie** count of every dish on the menu?",
                    "subs": ["Does nutritional information change what you order?", "Is it the restaurant's responsibility to help people eat healthily?"],
                    "vocab": {"calorie": "A unit of energy used to measure the amount of energy food provides"}
                },
                {
                    "main": "What's the most **overpriced** restaurant you've ever been to?",
                    "subs": ["Was the experience worth the money?", "What makes a restaurant worth a high price?"],
                    "vocab": {"overpriced": "Too expensive for what you get"}
                },
                {
                    "main": "If you could open any type of restaurant, what would it be and what would make it **unique**?",
                    "subs": ["What would your restaurant's atmosphere be like?", "Would you focus on local ingredients or international flavors?"],
                    "vocab": {"unique": "Being the only one of its kind; unlike anything else"}
                },
                {
                    "main": "Do you think **food critics** still matter in the age of online reviews?",
                    "subs": ["Have you ever chosen a restaurant based on a critic's review?", "Is a professional critic's opinion more valuable than hundreds of online reviews?"],
                    "vocab": {"food critics": "People who professionally evaluate and write about restaurants"}
                },
                {
                    "main": "Should restaurants be allowed to **charge** for bread, water, or other things that used to be free?",
                    "subs": ["Have you ever been surprised by a hidden charge on a restaurant bill?", "What's the most ridiculous thing you've been charged for at a restaurant?"],
                    "vocab": {}
                },
                {
                    "main": "Is there a restaurant in your city that you think deserves a **Michelin star** but doesn't have one?",
                    "subs": ["What makes their food so special?", "Do you think Michelin stars are a fair measure of quality?"],
                    "vocab": {"Michelin star": "A prestigious award given to restaurants for excellent cooking"}
                },
                {
                    "main": "If you could only eat at one restaurant for a year, which would you choose?",
                    "subs": ["What's the most times you've been to the same restaurant?", "Is there a restaurant that feels like a second home?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **fast food** restaurants should be required to meet higher health standards?",
                    "subs": ["Is fast food a personal choice or a public health issue?", "Should fast food advertising be restricted?"],
                    "vocab": {}
                },
                {
                    "main": "What's the strangest or most **unusual** restaurant you've ever visited?",
                    "subs": ["Would you go back?", "What made it so memorable?"],
                    "vocab": {"unusual": "Not common or ordinary"}
                },
                {
                    "main": "If you were a restaurant owner and a famous food critic gave you a terrible review, how would you respond?",
                    "subs": ["Should restaurant owners be able to respond publicly to bad reviews?", "Has a bad review ever stopped you from trying a restaurant?"],
                    "vocab": {}
                },
                {
                    "main": "Will **ghost restaurants** — kitchens that only deliver, with no dining room — replace traditional restaurants?",
                    "subs": ["Do you order food delivery often?", "What do you think is lost when there's no physical restaurant to visit?"],
                    "vocab": {"ghost restaurants": "Restaurants that exist only for delivery, with no physical dining space"}
                }
            ]
        },
        {
            "title": "Food & Identity",
            "image_keywords": "food identity,family,culture",
            "questions": [
                {
                    "main": "How much of your **identity** is tied to the food you grew up eating?",
                    "subs": ["If you moved abroad permanently, what food from home would you crave most?", "Do you think food preferences are shaped more by culture or by personal choice?"],
                    "vocab": {"identity": "Who a person is, or the qualities that make someone different from others"}
                },
                {
                    "main": "Is there a food that instantly makes you feel like a child again when you smell or taste it?",
                    "subs": ["Why do you think childhood foods have such **powerful** emotional connections?", "Do you cook any of your childhood favorites for yourself now?"],
                    "vocab": {"powerful": "Having great power, strength, or influence"}
                },
                {
                    "main": "Has becoming **vegetarian**, **vegan**, or changing your diet ever changed your social life?",
                    "subs": ["How do you handle social pressure when your diet is different from everyone around you?", "Do you think plant-based eating will eventually become the **norm**?"],
                    "vocab": {"norm": "The usual or normal situation, way of doing something, etc."}
                },
                {
                    "main": "If you could sit down for a meal with any person from history, who would it be and what would you cook for them?",
                    "subs": ["What would you want to ask them?", "Does sharing a meal create a special kind of connection?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think food can be a form of **resistance** or **protest**?",
                    "subs": ["Have you ever chosen what to eat based on **ethical** grounds rather than taste?", "Should consumers hold food companies **accountable** for their practices?"],
                    "vocab": {"resistance": "The act of fighting against something or refusing to accept it", "ethical": "Relating to moral principles and what is right or wrong", "accountable": "Responsible for your actions and willing to explain them"}
                },
                {
                    "main": "What food from your culture would you want to introduce to the world?",
                    "subs": ["Why is this dish so special to you?", "How do you explain it to people who have never tried it?"],
                    "vocab": {}
                },
                {
                    "main": "Is there a food tradition in your family that you want to **pass on** to the next generation?",
                    "subs": ["How do you ensure the tradition doesn't get lost?", "What food tradition would you want to start in your own family?"],
                    "vocab": {"pass on": "To give or teach something to someone younger"}
                },
                {
                    "main": "Do you think **fusion food** — combining cuisines from different cultures — is exciting or does it **dilute** authentic cooking?",
                    "subs": ["What's the best fusion dish you've ever tried?", "Is there a cuisine you think should never be fused with another?"],
                    "vocab": {"fusion food": "A style of cooking that combines ingredients or techniques from different countries", "dilute": "To make something weaker or less effective"}
                },
                {
                    "main": "If your country's national dish was banned for health reasons, how would people react?",
                    "subs": ["Is any food worth the health risks?", "Should governments have the power to ban unhealthy foods?"],
                    "vocab": {}
                },
                {
                    "main": "What's a food you associate with **celebration** in your culture?",
                    "subs": ["What makes this food special for celebrations?", "Is there a celebratory food from another culture you love?"],
                    "vocab": {"celebration": "A special event that people enjoy on an important day"}
                },
                {
                    "main": "Do you think **comfort food** is the same across all cultures, or is it completely personal?",
                    "subs": ["What's your ultimate comfort food and why?", "Is comfort food always unhealthy, or can it be nutritious?"],
                    "vocab": {"comfort food": "Food that makes you feel happy and satisfied, often linked to childhood memories"}
                },
                {
                    "main": "If you had to describe your personality through a dish, what would it be?",
                    "subs": ["What ingredients would represent different parts of who you are?", "Is there a dish that perfectly captures your culture's personality?"],
                    "vocab": {}
                },
                {
                    "main": "Should **traditional** recipes be **adapted** for modern tastes, or preserved exactly as they were made generations ago?",
                    "subs": ["Is there a traditional dish you think has been ruined by modernization?", "What's lost when we change a recipe to suit current trends?"],
                    "vocab": {"adapted": "Changed to suit new conditions", "preserved": "Kept in its original state"}
                },
                {
                    "main": "What's the most **generous** act of cooking you've ever witnessed or received?",
                    "subs": ["How did it make you feel?", "Have you ever cooked a meal as an act of kindness for a stranger?"],
                    "vocab": {"generous": "Willing to give more money, help, or time than is expected"}
                },
                {
                    "main": "If food could tell the story of your life, what would the menu look like?",
                    "subs": ["What dish would represent your childhood?", "What dish would represent who you are today?"],
                    "vocab": {}
                }
            ]
        },
        {
            "title": "Street Food Adventures",
            "image_keywords": "street food,market,food stall",
            "questions": [
                {
                    "main": "What's the best street food you've ever eaten, and where did you find it?",
                    "subs": ["What made it so special — the taste, the atmosphere, or the experience?", "Would you travel back to that place just to eat it again?"],
                    "vocab": {}
                },
                {
                    "main": "Is street food **riskier** than restaurant food, or is that just a **prejudice**?",
                    "subs": ["Have you ever gotten sick from street food?", "What do you look for to judge if a street food stall is safe?"],
                    "vocab": {"riskier": "More likely to involve danger or harm", "prejudice": "An unfair opinion or feeling about something without enough knowledge"}
                },
                {
                    "main": "If you could only eat street food for a month, which country would you choose?",
                    "subs": ["What street food would you eat every day?", "Is there a street food you think is better than any restaurant dish?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think street food is the most **honest** form of cooking?",
                    "subs": ["Why do you think some of the best food comes from simple stalls?", "Is there a street food vendor who has become a local legend?"],
                    "vocab": {"honest": "Not fake; genuine and real"}
                },
                {
                    "main": "What's the most **unusual** street food you've ever seen or tried?",
                    "subs": ["Would you try it again?", "Is there a street food that sounds terrible but is actually amazing?"],
                    "vocab": {"unusual": "Not common or ordinary"}
                },
                {
                    "main": "Should cities **regulate** street food vendors more strictly, or should they be left alone to **thrive**?",
                    "subs": ["Have you ever seen street food vendors forced out by regulations?", "What's the best street food city you've ever visited?"],
                    "vocab": {"regulate": "To control something by rules or laws", "thrive": "To grow or develop well"}
                },
                {
                    "main": "If you ran a street food stall, what would you sell?",
                    "subs": ["What would make your stall stand out from the competition?", "Would you serve traditional food or something completely new?"],
                    "vocab": {}
                },
                {
                    "main": "Is there a street food that you think should be **banned** for health or ethical reasons?",
                    "subs": ["Should tourists be warned about certain street foods?", "Where is the line between adventurous eating and taking unnecessary risks?"],
                    "vocab": {"banned": "Officially or legally prohibited"}
                },
                {
                    "main": "Do you think **food trucks** are the modern evolution of street food?",
                    "subs": ["What's the difference between a food truck and a traditional street stall?", "Have you ever discovered a food truck that became your favorite restaurant?"],
                    "vocab": {}
                },
                {
                    "main": "What's the most **memorable** food market you've ever visited?",
                    "subs": ["What made it special — the variety, the atmosphere, or the people?", "Do you prefer organized food markets or random street stalls?"],
                    "vocab": {"memorable": "Worth remembering; special and unforgettable"}
                },
                {
                    "main": "If you could create a new street food dish that combined flavors from three different countries, what would it be?",
                    "subs": ["Which three cuisines would you combine?", "What would you name your creation?"],
                    "vocab": {}
                },
                {
                    "main": "Is street food **undervalued** compared to restaurant food?",
                    "subs": ["Should street food chefs receive the same recognition as restaurant chefs?", "What's the most expensive street food you've ever bought?"],
                    "vocab": {"undervalued": "Not appreciated or valued as much as it should be"}
                },
                {
                    "main": "Have you ever had a **life-changing** meal from a street vendor?",
                    "subs": ["What made it so profound?", "Can a simple meal from a stall really change how you see food?"],
                    "vocab": {"profound": "Very great or intense; having a strong effect"}
                },
                {
                    "main": "If street food from your country became famous worldwide, how would you feel?",
                    "subs": ["Is there a street food from your culture that deserves more international recognition?", "What would you want foreigners to try first?"],
                    "vocab": {}
                },
                {
                    "main": "Will **delivery apps** eventually kill the street food culture, or will they help it grow?",
                    "subs": ["Do you order street food through apps?", "What's lost when you order street food for delivery instead of eating it at the stall?"],
                    "vocab": {}
                }
            ]
        }
    ],
    "work": [
        {
            "title": "Remote Work Revolution",
            "image_keywords": "remote work,home office,laptop",
            "questions": [
                {
                    "main": "Has working from home made you more **productive** or more **distracted**?",
                    "subs": ["What's the biggest **advantage** of not having to commute?", "Do you miss the social **interaction** of an office environment?"],
                    "vocab": {"productive": "Doing or achieving a lot; working hard and well", "distracted": "Unable to concentrate because something is taking your attention", "advantage": "A condition that gives a greater chance of success", "interaction": "Communication or direct involvement with someone or something"}
                },
                {
                    "main": "Should companies let employees work from anywhere in the world, or does that create **inequality**?",
                    "subs": ["Would you move to a cheaper country if you could keep your current salary?", "How does remote work affect **team cohesion** and company culture?"],
                    "vocab": {"inequality": "A situation in which people are not equal, especially in rights or opportunities", "team cohesion": "The degree to which team members work well together and feel united"}
                },
                {
                    "main": "Is the traditional 9-to-5 workday **obsolete**, or does it still serve a purpose?",
                    "subs": ["What would your ideal work schedule look like?", "Should people be paid the same if they work different hours?"],
                    "vocab": {"obsolete": "No longer produced or used; out of date"}
                },
                {
                    "main": "Do you think remote work has made it harder to **separate** your personal life from your professional life?",
                    "subs": ["Do you check emails after hours? Should that be **discouraged**?", "How do you create **boundaries** when your office is your bedroom?"],
                    "vocab": {"separate": "To divide things into different parts or groups", "discouraged": "Persuaded or tried to persuade someone not to do something", "boundaries": "Limits that define acceptable behavior or separate different areas"}
                },
                {
                    "main": "If you could design the perfect office, what would it look like and what **features** would it have?",
                    "subs": ["Would you include quiet zones, social areas, or outdoor spaces?", "How important is the physical environment to your **creativity**?"],
                    "vocab": {"features": "Important or noticeable parts of something", "creativity": "The ability to make new things or think of new ideas"}
                },
                {
                    "main": "If you could work from anywhere in the world, would you choose a beach, a mountain, or a bustling city?",
                    "subs": ["How does your physical environment affect your focus?", "Do you think you'd miss the energy of a busy workplace?"],
                    "vocab": {"bustling": "Full of busy activity"}
                },
                {
                    "main": "Do you think **universal basic income** is a realistic solution to automation?",
                    "subs": ["Would people still choose to work if they received money for nothing?", "Could universal basic income make society more equal or more dependent?"],
                    "vocab": {"universal basic income": "Money paid by the government to every person regardless of whether they work or not"}
                },
                {
                    "main": "Should employees be required to be available after hours, or is that a violation of personal boundaries?",
                    "subs": ["How do you switch off from work at the end of the day?", "Do you think younger generations have better work-life boundaries?"],
                    "vocab": {"boundaries": "Limits that define acceptable behavior or separate different areas"}
                },
                {
                    "main": "If you knew your job would be automated within five years, what would you do differently today?",
                    "subs": ["What skills can you develop that robots cannot replicate?", "How do you prepare for a future that is uncertain?"],
                    "vocab": {"automated": "Done by machines instead of people", "uncertain": "Not able to be known or declared in advance"}
                },
                {
                    "main": "Is competition between colleagues healthy for a workplace, or does it destroy teamwork?",
                    "subs": ["Have you ever had a toxic rivalry at work?", "What's the difference between healthy competition and sabotaging others?"],
                    "vocab": {"competition": "A situation where people try to win or be the best", "destroy": "To damage something so badly that it no longer exists", "sabotaging": "Deliberately destroying or damaging something"}
                },
                {
                    "main": "Would you rather work for a large corporation with stability or a small startup with creative freedom?",
                    "subs": ["What attracts you more — financial security or the chance to make a real impact?", "Do you think size of company affects happiness at work?"],
                    "vocab": {"stability": "The quality of not changing likely to fall or move", "creative freedom": "The ability to use your imagination and ideas at work"}
                },
                {
                    "main": "If every job paid the same salary, what work would you choose to do?",
                    "subs": ["What does this tell you about what truly motivates you?", "Would society function better if all jobs were valued equally?"],
                    "vocab": {"motivates": "Gives someone a reason or enthusiasm to do something"}
                },
                {
                    "main": "Do you think loyalty to a single company is still valuable, or should people change jobs every few years?",
                    "subs": ["How long have you stayed in your longest job?", "Is it better to be a specialist in one field or a generalist?"],
                    "vocab": {"loyalty": "The quality of being faithful and supportive"}
                },
                {
                    "main": "If you could create the perfect job description for yourself, what three things would be at the top?",
                    "subs": ["Does your current job match what you actually want?", "What's the most important thing a job can give you?"],
                    "vocab": {}
                },
                {
                    "main": "Will humans ever completely reject technology in the workplace and return to traditional ways of working?",
                    "subs": ["Is there a part of your work that you think should never be digitalized?", "What have we lost by relying so heavily on technology at work?"],
                    "vocab": {"reject": "To refuse to accept something", "digitalized": "Converted from physical to digital form"}
                }
            ]
        },
        {
            "title": "Dream Jobs vs Reality",
            "image_keywords": "dream job,career,ambition",
            "questions": [
                {
                    "main": "What did you want to be when you were ten, and how different is your life now?",
                    "subs": ["Do you think children's dream jobs are influenced too much by TV and social media?", "Is there a childhood dream you still secretly wish you had pursued?"],
                    "vocab": {"influenced": "Having your behavior or opinions affected by someone or something"}
                },
                {
                    "main": "If money were no object, what career would you choose today?",
                    "subs": ["What fulfillment do you get from your current work that money can't buy?", "Is it ever too late to completely change careers?"],
                    "vocab": {"object": "A consideration or concern", "fulfillment": "Happiness and satisfaction from doing something meaningful"}
                },
                {
                    "main": "Do you think passion for your work is overrated, or is it the most important thing?",
                    "subs": ["Can you learn to love a job you initially hated?", "What's more important — enjoying your work or enjoying your life outside of work?"],
                    "vocab": {"passion": "Very strong feelings of enthusiasm or excitement for something"}
                },
                {
                    "main": "What job do you think sounds amazing but would actually be miserable in reality?",
                    "subs": ["Have you ever romanticized a career only to discover the harsh truth?", "What's the biggest misconception people have about your job?"],
                    "vocab": {"miserable": "Very unhappy or uncomfortable", "harsh": "Unpleasant, unkind, or difficult to accept", "misconception": "A belief that is not based on correct information"}
                },
                {
                    "main": "If you could spend one day shadowing any professional — an astronaut, a surgeon, a musician — who would you choose?",
                    "subs": ["What do you think would surprise you most about their daily routine?", "Has a brief experience ever changed your career direction?"],
                    "vocab": {"surprise": "To cause someone to feel wonder or shock because something was unexpected"}
                },
                {
                    "main": "What childhood dream job do you think is actually the most disappointing in reality?",
                    "subs": ["What makes it less glamorous than it looks from the outside?", "Is there a dream job that actually lives up to the hype?"],
                    "vocab": {"glamorous": "Exciting and attractive", "lives up to the hype": "Is as good as people say it is"}
                },
                {
                    "main": "If you could job-swap with anyone for a month, who would it be?",
                    "subs": ["What do you think you'd learn from their daily experience?", "What would they think of your job?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **follow your passion** is good career advice or **irresponsible** advice?",
                    "subs": ["What should people follow instead of passion?", "Is it a privilege to be able to follow your passion?"],
                    "vocab": {"irresponsible": "Not showing a sense of responsibility"}
                },
                {
                    "main": "What's the most **fulfilling** work you've ever done, even if it wasn't paid?",
                    "subs": ["What made it so meaningful?", "Should all work have an element of purpose, or is a paycheck enough?"],
                    "vocab": {"fulfilling": "Making you feel happy and satisfied"}
                },
                {
                    "main": "If you could go back to age 18 and choose your career path again, what would you change?",
                    "subs": ["What would you do differently?", "Is where you are now better or worse than what you planned?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think people are **inherently** lazy and only work because they have to, or do most people genuinely want to contribute?",
                    "subs": ["What motivates the hardest workers you know?", "Would you still work if you won the lottery?"],
                    "vocab": {"inherently": "In a basic and natural way"}
                },
                {
                    "main": "What's a job that doesn't exist yet but you think will be common in 20 years?",
                    "subs": ["What skills would you need for this future job?", "What job do you think will disappear completely?"],
                    "vocab": {}
                },
                {
                    "main": "If you could master any professional skill overnight, what would it be?",
                    "subs": ["How would it change your career?", "What skill do you think is most undervalued in the workplace?"],
                    "vocab": {}
                },
                {
                    "main": "Is there a job you think should be paid much more than it currently is?",
                    "subs": ["What job do you think is overpaid?", "How should society decide what different jobs are worth?"],
                    "vocab": {}
                },
                {
                    "main": "What's the best piece of career advice you've ever received?",
                    "subs": ["Has it proven to be true in your experience?", "What advice would you give to someone starting their career today?"],
                    "vocab": {}
                }
            ]
        },
        {
            "title": "Work-Life Balance",
            "image_keywords": "work life balance,stress,relaxation",
            "questions": [
                {
                    "main": "Is work-life balance a myth, or have you managed to achieve it?",
                    "subs": ["What does balance actually look like in practice?", "Do you think some careers make balance impossible by nature?"],
                    "vocab": {"myth": "An idea that many people believe but that is not true", "impossible": "Not able to happen or be achieved"}
                },
                {
                    "main": "Should employers be responsible for their employees' mental health, or is that a personal matter?",
                    "subs": ["Would you take a lower salary for a job that genuinely cared about your wellbeing?", "How do you cope with work-related stress?"],
                    "vocab": {"responsible": "Having a duty to deal with something or take care of someone", "cope": "To deal successfully with a difficult situation"}
                },
                {
                    "main": "Do you think hustle culture — the idea that you should always be working — is toxic or motivating?",
                    "subs": ["Where is the line between ambition and burnout?", "Should society value rest as much as productivity?"],
                    "vocab": {"toxic": "Very harmful, unpleasant, or negative", "motivating": "Giving you a reason or enthusiasm to do something", "ambition": "A strong desire to achieve something", "burnout": "Physical or mental exhaustion, especially caused by overwork"}
                },
                {
                    "main": "If you could take a one-year sabbatical with full pay, what would you do with the time?",
                    "subs": ["Would you travel, learn something new, or simply rest?", "Do you think people would return from a sabbatical more engaged or less committed?"],
                    "vocab": {"sabbatical": "A period of paid leave, usually for rest or study", "engaged": "Busy, involved, and interested in something"}
                },
                {
                    "main": "Is it possible to be truly successful in your career without sacrificing your personal relationships?",
                    "subs": ["What have you had to give up to get where you are?", "If you could go back, would you make different choices?"],
                    "vocab": {"successful": "Accomplishing an aim or purpose", "sacrificing": "Giving up something important to get or do something else"}
                },
                {
                    "main": "Do you think your culture values work too much or too little?",
                    "subs": ["How does your country's attitude toward work compare to others?", "What would a healthier relationship with work look like?"],
                    "vocab": {}
                },
                {
                    "main": "If you could reduce your working hours by 20% but also reduce your salary by 20%, would you do it?",
                    "subs": ["What would you do with the extra time?", "Is time or money more valuable to you?"],
                    "vocab": {}
                },
                {
                    "main": "Should there be a legal maximum number of hours people can work per week?",
                    "subs": ["How would this affect the economy?", "Would people use the extra time productively or waste it?"],
                    "vocab": {}
                },
                {
                    "main": "What's the most stressful job you can imagine doing?",
                    "subs": ["Why would it be so stressful?", "What would make someone choose that career?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **productivity culture** — tracking every minute and optimizing everything — actually makes us happier?",
                    "subs": ["Have you ever felt guilty for doing nothing?", "Is rest productive in its own way?"],
                    "vocab": {"productivity culture": "A social attitude that values getting things done efficiently above all else"}
                },
                {
                    "main": "If you retired tomorrow, what would you miss most about working?",
                    "subs": ["What would you definitely not miss?", "Is your identity tied to your job?"],
                    "vocab": {"retired": "Having stopped working, usually because of age"}
                },
                {
                    "main": "Should companies be allowed to contact employees during vacation?",
                    "subs": ["Have you ever had your vacation interrupted by work?", "Is a true vacation possible in the digital age?"],
                    "vocab": {"interrupted": "Stopped something from continuing"}
                },
                {
                    "main": "What does **success** mean to you — is it about money, impact, freedom, or something else entirely?",
                    "subs": ["Has your definition of success changed over time?", "Do you think you'll ever feel successful enough?"],
                    "vocab": {}
                },
                {
                    "main": "If you could design the perfect workday from scratch, what would it look like from morning to evening?",
                    "subs": ["How many hours would you work?", "What would you do during your breaks?"],
                    "vocab": {}
                },
                {
                    "main": "Will future generations have better work-life balance than we do, or will technology make it even harder to disconnect?",
                    "subs": ["What changes do you think are most needed?", "What's one thing you could do today to improve your own balance?"],
                    "vocab": {}
                }
            ]
        },
        {
            "title": "Entrepreneurship",
            "image_keywords": "entrepreneur,startup,business",
            "questions": [
                {
                    "main": "What's a business idea you've always had but never had the courage to pursue?",
                    "subs": ["What's holding you back — fear of failure, lack of money, or something else?", "Do you think most successful entrepreneurs are risk-takers or just lucky?"],
                    "vocab": {"courage": "The ability to do something that frightens you", "risk-takers": "People who are willing to do something dangerous or uncertain"}
                },
                {
                    "main": "If your startup failed spectacularly but you learned everything you know from it, would it be worth it?",
                    "subs": ["How do you deal with the stigma of failure in your culture?", "What's the difference between a smart failure and a stupid one?"],
                    "vocab": {"spectacularly": "In a very impressive or dramatic way", "stigma": "A strong feeling of disapproval in society about something"}
                },
                {
                    "main": "Do you think everyone should have basic entrepreneurship education in school?",
                    "subs": ["What's the most important skill an entrepreneur needs?", "Is entrepreneurship something you can learn, or is it an innate trait?"],
                    "vocab": {"entrepreneurship": "The activity of starting and running a business", "innate": "Something you are born with; natural"}
                },
                {
                    "main": "Would you rather build a small business that makes you happy or a big company that makes you rich?",
                    "subs": ["Can a business be both profitable and ethical?", "What would you never compromise on, even for financial success?"],
                    "vocab": {"profitable": "Making or likely to make money", "ethical": "Morally correct or acceptable"}
                },
                {
                    "main": "If you could get one hour of advice from any business leader in history, who would it be and what would you ask?",
                    "subs": ["What's the best piece of business advice you've ever received?", "Is there a business leader whose story inspires you?"],
                    "vocab": {"inspires": "Encourages someone to do or feel something, especially something creative"}
                },
                {
                    "main": "What's the most **original** business idea you've ever heard?",
                    "subs": ["Why do you think it hasn't been successful yet?", "Is originality more important than execution?"],
                    "vocab": {"original": "Not the same as anything else; new and different", "execution": "The act of carrying out a plan"}
                },
                {
                    "main": "Do you think **side hustles** — having a second job or business alongside your main job — are a smart move or a recipe for burnout?",
                    "subs": ["Do you have a side hustle? Is it worth the extra effort?", "Should people focus on one thing or diversify their income?"],
                    "vocab": {"side hustles": "Small businesses or jobs people do in addition to their main job", "diversify": "To make something more varied"}
                },
                {
                    "main": "If you could start any business with zero competition, what would it be?",
                    "subs": ["Why do you think no one has done this yet?", "Would zero competition make it easier or harder?"],
                    "vocab": {}
                },
                {
                    "main": "Is it **ethical** to start a business that makes money from people's addictions — gambling, junk food, social media?",
                    "subs": ["Where is the line between serving demand and exploiting weakness?", "Should certain businesses be banned even if people want them?"],
                    "vocab": {"ethical": "Morally correct or acceptable", "exploiting": "Using someone or something unfairly for your own advantage"}
                },
                {
                    "main": "Should entrepreneurs who fail multiple times before succeeding be given more support than first-time business owners?",
                    "subs": ["How many failures should society tolerate before giving up on someone?", "Is failure the best teacher in business?"],
                    "vocab": {"tolerate": "To accept something unpleasant or disagreeable"}
                },
                {
                    "main": "If you had to build a business using only skills you currently have, what would you create?",
                    "subs": ["What skills would you need to learn to build your dream business?", "Is it better to start a business you're passionate about or one that fills a market gap?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **crypto** and **blockchain** are the future of business or a passing trend?",
                    "subs": ["Have you ever invested in cryptocurrency?", "Can you think of a real-world use for blockchain that actually helps ordinary people?"],
                    "vocab": {"crypto": "Short for cryptocurrency, a type of digital money", "blockchain": "A system for recording information that makes it difficult to change or cheat"}
                },
                {
                    "main": "What's the biggest mistake new entrepreneurs make?",
                    "subs": ["How could they avoid it?", "Is there a mistake that's actually worth making?"],
                    "vocab": {}
                },
                {
                    "main": "If you could regulate one thing about how businesses operate, what would it be?",
                    "subs": ["Would businesses become better or worse with more regulation?", "What's the right balance between freedom and rules?"],
                    "vocab": {"regulate": "To control something by rules or laws"}
                },
                {
                    "main": "Will **artificial intelligence** make entrepreneurship easier or harder for ordinary people?",
                    "subs": ["Could AI replace the need for human creativity in business?", "What business skills will always be uniquely human?"],
                    "vocab": {}
                }
            ]
        },
        {
            "title": "The Gig Economy",
            "image_keywords": "gig economy,freelance,independent",
            "questions": [
                {
                    "main": "Do you think the **gig economy** — working short-term jobs through apps — is empowering workers or **exploiting** them?",
                    "subs": ["Have you ever done gig work? What was your experience?", "Should gig workers have the same rights as full-time employees?"],
                    "vocab": {"gig economy": "A labor market with short-term, flexible jobs, often through apps or websites", "exploiting": "Using someone or something unfairly for your own advantage"}
                },
                {
                    "main": "Would you rather have a stable 9-to-5 job or be a **freelancer** with complete freedom but no guaranteed income?",
                    "subs": ["What's the biggest advantage of freelancing?", "What's the biggest disadvantage?"],
                    "vocab": {"freelancer": "A person who works for different companies rather than being employed by one"}
                },
                {
                    "main": "If you could build a career entirely from gig work in different fields, what jobs would you combine?",
                    "subs": ["How would you ensure a stable income?", "Is a portfolio career more fulfilling than specializing in one thing?"],
                    "vocab": {"portfolio career": "A career made up of multiple different jobs or roles"}
                },
                {
                    "main": "Should the government create a **safety net** specifically for gig workers who lose their income?",
                    "subs": ["How would this funded?", "Would a safety net make people more or less willing to take risks?"],
                    "vocab": {"safety net": "A system of support from the government for people who are in difficulty"}
                },
                {
                    "main": "Do you think **Uber**, **Deliveroo**, and similar apps are good for the economy or do they just **undercut** traditional jobs?",
                    "subs": ["Have you ever used these services? Do you think about the workers behind them?", "Should these companies be classified as employers?"],
                    "vocab": {"undercut": "To sell goods or services at a lower price than a competitor"}
                },
                {
                    "main": "Is it possible to build a **sustainable** long-term career through gig work alone?",
                    "subs": ["What skills do you need to succeed as a freelancer?", "At what point should a freelancer consider starting a proper business?"],
                    "vocab": {"sustainable": "Able to continue over a long period without causing problems"}
                },
                {
                    "main": "If you could create a new gig-economy app, what service would it provide?",
                    "subs": ["Why doesn't this service exist yet?", "How would you ensure fair pay for workers?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think the gig economy makes people more **independent** or more **vulnerable**?",
                    "subs": ["How do you think gig work affects mental health?", "Is financial uncertainty the price of freedom?"],
                    "vocab": {"independent": "Free from outside control", "vulnerable": "Easily harmed or affected by something"}
                },
                {
                    "main": "Should gig workers form **unions** to negotiate better pay and conditions?",
                    "subs": ["Has union membership changed over the years in your country?", "Would a gig workers' union be effective, or is the nature of gig work too individualistic?"],
                    "vocab": {"unions": "Organizations formed by workers to protect their rights", "individualistic": "Valuing independence and personal goals more than group goals"}
                },
                {
                    "main": "What's the most unusual gig job you've ever heard of?",
                    "subs": ["Would you ever do it for the right price?", "What does the existence of unusual gig jobs say about our economy?"],
                    "vocab": {}
                },
                {
                    "main": "If the gig economy completely replaced traditional employment, would society be better or worse off?",
                    "subs": ["What would change about how people plan their lives?", "How would this affect things like mortgages, retirement, and healthcare?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think the gig economy will continue to grow, or will it **hit a ceiling**?",
                    "subs": ["What might cause people to return to traditional employment?", "Is there a limit to how many industries can be gig-based?"],
                    "vocab": {"hit a ceiling": "To reach a point where no more progress can be made"}
                },
                {
                    "main": "Would you trust a gig worker to do important work — like filing your taxes or renovating your house — or do you prefer established companies?",
                    "subs": ["How do you evaluate the quality of a gig worker?", "What makes you trust someone you've never worked with before?"],
                    "vocab": {}
                },
                {
                    "main": "If you could guarantee one thing for all gig workers worldwide, what would it be?",
                    "subs": ["Why is this the most important thing?", "How would you implement it?"],
                    "vocab": {}
                },
                {
                    "main": "Has the gig economy changed the meaning of having a career?",
                    "subs": ["Is a career still a meaningful concept, or is it now just a series of jobs?", "What advice would you give someone entering the workforce today?"],
                    "vocab": {}
                }
            ]
        }
    ],
    "environment": [
        {
            "title": "Climate Action",
            "image_keywords": "climate change,earth,warming",
            "questions": [
                {
                    "main": "Do you feel optimistic or pessimistic about the future of our planet?",
                    "subs": ["What gives you hope — or takes it away — when you think about climate change?", "Do you think one person's actions can truly make a difference, or is this a systemic problem?"],
                    "vocab": {"optimistic": "Hopeful and confident about the future", "pessimistic": "Tending to see the worst aspect of things", "difference": "A change that helps or matters", "systemic": "Relating to a whole system rather than just parts"}
                },
                {
                    "main": "Should wealthier nations pay more to fight climate change, even if poorer nations produce significant emissions today?",
                    "subs": ["Is climate action a collective responsibility or should it be proportional to each country's contribution?", "How do we balance economic growth with environmental protection?"],
                    "vocab": {"wealthier": "Having more money and resources", "emissions": "Gases released into the air, especially from burning fuel", "collective": "Done by every member of a group together", "proportional": "Increasing or decreasing in size or amount according to something else", "environmental": "Relating to the natural world and the impact of human activity on it"}
                },
                {
                    "main": "If scientists could reverse climate change with one drastic measure that would disrupt the global economy, should we do it?",
                    "subs": ["How much economic disruption would you accept to save the planet?", "Who should decide — scientists, governments, or the people through voting?"],
                    "vocab": {"reverse": "To change something so that it is the opposite of what it was", "drastic": "Extreme and sudden in action or effect", "disruption": "The action of preventing something from continuing easily"}
                },
                {
                    "main": "Do you think it's hypocritical for celebrities to publicly support climate action while flying on private jets?",
                    "subs": ["Should public figures be held to a higher standard?", "Does their advocacy still have value even if their personal behavior isn't perfect?"],
                    "vocab": {"hypocritical": "Behaving in a way that suggests you have higher standards than you actually do", "standard": "A level of quality that is considered acceptable", "advocacy": "Public support for a cause or policy"}
                },
                {
                    "main": "What single change in your daily life has had the biggest positive impact on the environment?",
                    "subs": ["Is there an environmental sacrifice you've made that was surprisingly easy?", "What's one change you know you should make but haven't yet?"],
                    "vocab": {"impact": "A strong effect or influence"}
                },
                {
                    "main": "If you could implement one environmental policy globally, what would it be?",
                    "subs": ["Why would this be the most effective?", "What would be the biggest obstacle to implementing it?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **climate anxiety** — worrying about the future of the planet — is a legitimate mental health concern?",
                    "subs": ["Have you ever felt overwhelmed by environmental problems?", "How do you stay hopeful when the news about the environment is so negative?"],
                    "vocab": {"climate anxiety": "Worry or fear about the effects of climate change", "legitimate": "Reasonable and acceptable"}
                },
                {
                    "main": "Should **fossil fuel** companies be held legally responsible for climate damage?",
                    "subs": ["How would this affect the global economy?", "Should these companies be forced to pay for the damage they have caused?"],
                    "vocab": {"fossil fuel": "Fuels like coal, oil, and gas that are burned for energy"}
                },
                {
                    "main": "If your country's main industry was causing severe environmental damage, should it be shut down even if it would cause massive unemployment?",
                    "subs": ["How do you balance economic survival with environmental protection?", "What would happen to the workers who lost their jobs?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **nuclear energy** is a necessary part of fighting climate change, or are the risks too great?",
                    "subs": ["What's the biggest concern about nuclear power?", "Is there a perfect energy source, or do we always have to make trade-offs?"],
                    "vocab": {"nuclear energy": "Energy produced by splitting atoms", "trade-offs": "Situations where you accept something bad in order to get something good"}
                },
                {
                    "main": "If you could see the Earth from space, do it change how you feel about environmental issues?",
                    "subs": ["Why do some astronauts report a profound shift in perspective after seeing Earth from space?", "Do we need to see the problem to believe it?"],
                    "vocab": {"profound": "Very great or intense; having a strong effect"}
                },
                {
                    "main": "Should **environmental education** be a mandatory subject in every school worldwide?",
                    "subs": ["At what age should children start learning about climate change?", "How do you teach children about environmental problems without scaring them?"],
                    "vocab": {"mandatory": "Required by law or rules"}
                },
                {
                    "main": "Is it too late to **reverse** the damage we've done to the environment, or can we still make a meaningful difference?",
                    "subs": ["What gives you the most hope?", "What would it take for humanity to truly change its behavior?"],
                    "vocab": {"reverse": "To change something so that it is the opposite of what it was"}
                },
                {
                    "main": "If you were in charge of a billion-dollar environmental fund, where would you spend the money?",
                    "subs": ["Would you focus on prevention, cleanup, or innovation?", "Which environmental problem deserves the most urgent attention?"],
                    "vocab": {}
                },
                {
                    "main": "Will future generations judge us harshly for our environmental choices?",
                    "subs": ["What do you think they will say about us?", "What would you want to say to them if you could explain our choices?"],
                    "vocab": {}
                }
            ]
        },
        {
            "title": "Living Sustainably",
            "image_keywords": "sustainable,green,eco",
            "questions": [
                {
                    "main": "Is sustainable living a privilege that only affluent people can afford?",
                    "subs": ["How can we make eco-friendly choices accessible to everyone?", "Do you think expensive eco-products are genuine solutions or just marketing?"],
                    "vocab": {"sustainable": "Causing little or no damage to the environment", "affluent": "Having a great deal of money; wealthy", "accessible": "Easy to obtain, use, or understand", "genuine": "Truly what something is said to be; authentic", "marketing": "Promoting and selling products or services"}
                },
                {
                    "main": "Would you give up meat entirely if you knew it would significantly reduce your carbon footprint?",
                    "subs": ["Is your diet something you're willing to change for the planet?", "Should governments subsidize plant-based foods to make them cheaper than meat?"],
                    "vocab": {"carbon footprint": "The amount of carbon dioxide released into the atmosphere by your activities", "subsidize": "To pay part of the cost of something to make it cheaper"}
                },
                {
                    "main": "Is fast fashion the most environmental damage one person can cause through consumer choices?",
                    "subs": ["How often do you buy new clothes, and do you think about where they come from?", "Should clothing labels be required to show their environmental impact?"],
                    "vocab": {"fast fashion": "Cheap, trendy clothing produced rapidly to meet current trends", "environmental": "Relating to the natural world"}
                },
                {
                    "main": "Do you think minimalism — owning fewer things — is a realistic solution or an idealistic dream?",
                    "subs": ["What's the hardest thing you've ever given up for environmental reasons?", "Is our consumer culture fundamentally incompatible with sustainability?"],
                    "vocab": {"minimalism": "A style or technique that uses the fewest and simplest elements", "idealistic": "Unrealistically aiming for perfection", "incompatible": "So opposed in character that they cannot exist together"}
                },
                {
                    "main": "If you could implement one environmental law in your country tomorrow, what would it be?",
                    "subs": ["Would people support it if it increased their cost of living?", "How do we convince people to act in the collective interest when it requires personal sacrifice?"],
                    "vocab": {"environmental": "Relating to the natural world and the effect of human activity on it", "collective": "Done by every member of a group working together"}
                },
                {
                    "main": "Is it possible to live a completely zero-waste life in the modern world?",
                    "subs": ["What would you have to give up?", "Is zero waste a realistic goal or an impossible standard?"],
                    "vocab": {"zero-waste": "Producing no rubbish or waste at all"}
                },
                {
                    "main": "Should **plastic packaging** be banned entirely, even if it makes food more expensive to preserve?",
                    "subs": ["What would replace plastic packaging?", "Is the convenience of plastic worth the environmental cost?"],
                    "vocab": {"banned": "Officially or legally prohibited"}
                },
                {
                    "main": "Do you think **eco-guilt** — feeling bad about your environmental impact — actually helps the planet or just makes people feel bad?",
                    "subs": ["Have you ever changed your behavior because of eco-guilt?", "Is guilt a good motivator for long-term change?"],
                    "vocab": {"eco-guilt": "Feeling bad about the harm you cause to the environment"}
                },
                {
                    "main": "If your neighbor was doing something environmentally harmful, would you say something or mind your own business?",
                    "subs": ["How do you approach someone about their environmental choices without being preachy?", "Is it your responsibility to educate others about sustainability?"],
                    "vocab": {"preachy": "Trying to give too much advice about how people should behave"}
                },
                {
                    "main": "Should **sustainable** products be taxed less than environmentally harmful ones?",
                    "subs": ["Would this change what people buy?", "Is it fair to make eco-friendly options cheaper through tax policy?"],
                    "vocab": {"sustainable": "Causing little or no damage to the environment"}
                },
                {
                    "main": "What's the most effective thing ordinary people can do for the environment that doesn't require any money?",
                    "subs": ["Why don't more people do this?", "Is individual action enough, or do we need systemic change?"],
                    "vocab": {}
                },
                {
                    "main": "If you could only keep three possessions and had to sustainably source everything else, which three would you keep?",
                    "subs": ["What does this tell you about what you truly need versus what you want?", "How much of your life is cluttered with unnecessary things?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **eco-tourism** actually helps the environment or is it just a way for people to feel good about traveling?",
                    "subs": ["Have you ever been on an eco-tourism trip?", "Can tourism ever be truly sustainable?"],
                    "vocab": {"eco-tourism": "Tourism that is designed to minimize environmental impact"}
                },
                {
                    "main": "Should companies be required to prove their products are sustainable before making environmental claims?",
                    "subs": ["How would this be enforced?", "Is greenwashing a serious problem in your country?"],
                    "vocab": {"greenwashing": "Making people believe a company is doing more to help the environment than it really is"}
                },
                {
                    "main": "If the world ran out of clean water in 50 years, whose fault would it be?",
                    "subs": ["What should we be doing now to prevent this?", "Is water scarcity already a problem in your region?"],
                    "vocab": {"scarcity": "A situation where there is not enough of something"}
                }
            ]
        },
        {
            "title": "Wildlife Conservation",
            "image_keywords": "wildlife,animals,nature conservation",
            "questions": [
                {
                    "main": "Should we spend enormous amounts of money saving endangered species when millions of humans are suffering?",
                    "subs": ["What gives a species the right to be preserved?", "Do you think biodiversity has intrinsic value, or is it only valuable to humans?"],
                    "vocab": {"enormous": "Very large in size or degree", "endangered": "Seriously at risk of extinction", "preserved": "Kept safe from harm or change", "intrinsic": "Belonging naturally; essential"}
                },
                {
                    "main": "Is keeping animals in zoos cruel or essential for conservation and education?",
                    "subs": ["Have you ever had an experience at a zoo that changed how you feel about animal captivity?", "What's the ethical way to balance human curiosity with animal welfare?"],
                    "vocab": {"cruel": "Causing pain or suffering deliberately", "conservation": "Protecting animals, plants, and natural resources"}
                },
                {
                    "main": "If you could save one animal species from extinction, which would you choose and why?",
                    "subs": ["Do you think some species are more worthy of saving than others?", "How does losing one species cascade through an entire ecosystem?"],
                    "vocab": {"worthy": "Deserving of respect or attention", "cascade": "A sudden, dramatic series of events caused by one initial event"}
                },
                {
                    "main": "Is urbanization the biggest threat to wildlife, or does climate change pose a greater risk?",
                    "subs": ["How do you feel about humans encroaching on natural habitats?", "Should cities be required to include wildlife corridors in their planning?"],
                    "vocab": {"urbanization": "The process of making an area more urban with buildings and infrastructure", "pose": "To present a threat or problem", "encroaching": "Gradually moving into or taking over someone else's space", "corridors": "Strips of natural habitat connecting separated wildlife areas"}
                },
                {
                    "main": "Would you visit a wildlife sanctuary if there was a small chance you could be harmed by an animal?",
                    "subs": ["Is encountering wildlife in its natural habitat worth the risk?", "How can tourism both help and harm conservation efforts?"],
                    "vocab": {"sanctuary": "A place where injured or rescued animals are cared for", "harm": "To damage or injure something"}
                },
                {
                    "main": "Should it be illegal to keep exotic animals as pets?",
                    "subs": ["What makes an animal exotic?", "Is it cruel to keep any animal in a home, or are some species more suited to domestication?"],
                    "vocab": {"exotic": "Originating from a foreign country; unusual", "domestication": "The process of taming animals to live with humans"}
                },
                {
                    "main": "If an animal species went extinct because of human activity, who should be held responsible?",
                    "subs": ["Can a species extinction be considered a crime?", "Should there be an international court for environmental destruction?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **animal testing** for medical research is justified if it could save human lives?",
                    "subs": ["Where is the line between necessary research and unnecessary cruelty?", "Are there alternatives to animal testing that should be used instead?"],
                    "vocab": {"animal testing": "Using animals in scientific experiments to test products or medicines", "justified": "Having a good reason for something"}
                },
                {
                    "main": "If you could communicate with one animal species, which would you choose and what would you ask them?",
                    "subs": ["What do you think they would say about humans?", "Would knowing their perspective change how we treat them?"],
                    "vocab": {}
                },
                {
                    "main": "Should **poaching** — illegally hunting animals — be punished as seriously as crimes against humans?",
                    "subs": ["What drives people to poach animals?", "Would harsher punishments actually reduce poaching?"],
                    "vocab": {"poaching": "Illegally hunting or catching wild animals"}
                },
                {
                    "main": "Is there a wild animal you are genuinely afraid of?",
                    "subs": ["Is this fear rational or based on what you've seen in movies?", "Should we try to overcome our fear of wild animals, or is it a healthy survival instinct?"],
                    "vocab": {"rational": "Based on reason rather than emotion"}
                },
                {
                    "main": "If you discovered a new species, what would you name it?",
                    "subs": ["Should species be named after the discoverer, the location, or something descriptive?", "What's the most interesting species name you've ever heard?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **rewilding** — returning land to its natural state — should be a priority for governments?",
                    "subs": ["What would your country look like if large areas were rewilded?", "Is rewilding realistic in a world with a growing population?"],
                    "vocab": {"rewilding": "Returning land to its natural, wild state"}
                },
                {
                    "main": "If humans went extinct, what animal do you think would dominate the Earth?",
                    "subs": ["What makes this species so adaptable?", "Is intelligence the most important trait for survival, or is it something else?"],
                    "vocab": {"dominate": "To have control or power over something", "adaptable": "Able to adjust to new conditions"}
                },
                {
                    "main": "Should we use technology to bring back extinct animals, like the woolly mammoth?",
                    "subs": ["Is this playing God, or is it fixing a mistake humans caused?", "What are the risks of reintroducing species that have been gone for thousands of years?"],
                    "vocab": {}
                }
            ]
        },
        {
            "title": "Water & Resources",
            "image_keywords": "water,ocean,resources",
            "questions": [
                {
                    "main": "Do you think water will be the most valuable resource of the 21st century, replacing oil?",
                    "subs": ["Have you ever experienced a serious water shortage?", "Should water be treated as a human right or as a commodity that people pay for?"],
                    "vocab": {"valuable": "Worth a lot of money; extremely useful or important", "human right": "A right believed to belong to every person", "commodity": "A product or service that can be bought and sold"}
                },
                {
                    "main": "Is desalination — removing salt from seawater — the solution to the global water crisis?",
                    "subs": ["What are the environmental consequences of building large desalination plants?", "Should governments invest more in water-saving technology?"],
                    "vocab": {"desalination": "The process of removing salt from seawater to make it drinkable", "consequences": "Results or effects of an action", "invest": "To put money into something to make a profit or achieve a result"}
                },
                {
                    "main": "How much water do you waste daily without realizing it?",
                    "subs": ["Would you change your habits if you could see your exact daily water consumption?", "Should heavy water users be charged significantly more?"],
                    "vocab": {"realizing": "Becoming fully aware of something", "consumption": "The amount of something that is used up"}
                },
                {
                    "main": "Is ocean pollution a problem we've already lost, or can still be reversed?",
                    "subs": ["What happens to the plastic you throw in the recycling bin — does it always get recycled?", "Should single-use plastics be banned completely?"],
                    "vocab": {"reversed": "Changed to the opposite direction or position", "banned": "Officially or legally prohibited"}
                },
                {
                    "main": "If your local river or beach was heavily polluted, would you volunteer to help clean it up?",
                    "subs": ["What personal actions do you take to reduce your impact on water sources?", "Do you think individuals or corporations bear more responsibility for water pollution?"],
                    "vocab": {"volunteer": "To offer to do something without being forced or paid", "corporations": "Large business companies"}
                },
                {
                    "main": "Should **bottled water** be banned to reduce plastic waste?",
                    "subs": ["Is tap water in your area safe to drink?", "What would replace bottled water if it were banned?"],
                    "vocab": {"bottled water": "Water sold in plastic bottles", "tap water": "Water that comes from a tap in your home"}
                },
                {
                    "main": "If you could see all the plastic in the ocean from above, would it change your daily habits?",
                    "subs": ["How much single-use plastic do you use in a typical week?", "What's the hardest plastic habit to give up?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **water wars** — conflicts over access to water — will become more common in the future?",
                    "subs": ["Has water scarcity already caused conflicts in any part of the world?", "How should shared water resources between countries be managed?"],
                    "vocab": {"water wars": "Conflicts between groups or countries over access to water"}
                },
                {
                    "main": "Should farmers who grow thirsty crops in dry areas be forced to switch to more water-efficient agriculture?",
                    "subs": ["How do we balance food production with water conservation?", "Should the price of water for agriculture reflect its true scarcity?"],
                    "vocab": {"thirsty crops": "Crops that need a lot of water to grow", "scarcity": "A situation where there is not enough of something"}
                },
                {
                    "main": "If you had to reduce your water usage by 50%, what would you cut first?",
                    "subs": ["What water-saving tips have you actually implemented?", "Is it possible to live comfortably on half the water you currently use?"],
                    "vocab": {}
                },
                {
                    "main": "Should companies that pollute water sources be forced to clean up their mess at their own expense?",
                    "subs": ["How would this be enforced across international borders?", "Should the executives of polluting companies face personal consequences?"],
                    "vocab": {"executives": "The senior managers of a company"}
                },
                {
                    "main": "Do you think **rainwater harvesting** — collecting rain for later use — should be mandatory for all new buildings?",
                    "subs": ["Is this practical in all climates?", "What's the most creative water-saving solution you've ever heard of?"],
                    "vocab": {"rainwater harvesting": "Collecting and storing rainwater for later use", "mandatory": "Required by law or rules"}
                },
                {
                    "main": "If the ocean rose by one meter and flooded your city, where would you go?",
                    "subs": ["Is your home at risk from rising sea levels?", "Should people who live in flood-prone areas be required to move?"],
                    "vocab": {}
                },
                {
                    "main": "What's the most **precious** resource in your daily life that you take for granted?",
                    "subs": ["What would happen if it suddenly disappeared?", "How can we make people appreciate resources before they run out?"],
                    "vocab": {"precious": "Of great value; not to be wasted"}
                },
                {
                    "main": "Will technology save us from environmental problems, or has technology caused more problems than it has solved?",
                    "subs": ["What environmental technology excites you most?", "Is there a limit to what technology can fix?"],
                    "vocab": {}
                }
            ]
        },
        {
            "title": "Green Technology",
            "image_keywords": "green technology,solar,renewable",
            "questions": [
                {
                    "main": "If solar panels were free, would you install them on your home even if they looked unattractive?",
                    "subs": ["How important is it for green technology to be aesthetically pleasing?", "Should governments make solar panels mandatory on all new buildings?"],
                    "vocab": {"solar panels": "Devices that change sunlight into electricity", "aesthetically": "Relating to beauty or the appreciation of beauty", "mandatory": "Required by law or rules"}
                },
                {
                    "main": "Do you think electric vehicles will completely replace petrol cars within your lifetime?",
                    "subs": ["What's stopping more people from switching to electric?", "Should petrol cars be banned by a certain date?"],
                    "vocab": {"electric vehicles": "Cars powered by electricity instead of petrol or diesel"}
                },
                {
                    "main": "If a green technology could reduce emissions but required rare minerals that are mined in environmentally destructive ways, should we still use it?",
                    "subs": ["Is any solution perfect, or do we always have to make trade-offs?", "How do we weigh the environmental costs of producing green technology against its benefits?"],
                    "vocab": {"emissions": "Gases released into the air, especially from burning fuel", "trade-offs": "Situations where you accept something bad to get something good"}
                },
                {
                    "main": "Should space exploration be funded when we have so many environmental problems on Earth?",
                    "subs": ["What technologies developed for space exploration have helped the environment?", "Is investing in space a distraction from Earth's problems or a long-term survival strategy?"],
                    "vocab": {"space exploration": "The investigation of outer space using technology and spacecraft"}
                },
                {
                    "main": "If you could invent one green technology, what problem would it solve?",
                    "subs": ["How would it work?", "Why hasn't this been invented yet?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think vertical farms could solve the world's food problems?",
                    "subs": ["What are the benefits and drawbacks of vertical farming?", "Would you eat food grown in a factory instead of a field?"],
                    "vocab": {"vertical farms": "Farms that grow crops in vertically stacked layers inside buildings"}
                },
                {
                    "main": "Should every new building be required to generate some of its own energy?",
                    "subs": ["What renewable energy source works best for buildings?", "How much extra cost would you accept for a self-sufficient building?"],
                    "vocab": {"self-sufficient": "Able to provide for your own needs without help from others"}
                },
                {
                    "main": "If nuclear fusion became practical tomorrow, would it solve all our energy problems?",
                    "subs": ["Why has nuclear fusion been '30 years away' for the last 50 years?", "What would a world with unlimited clean energy look like?"],
                    "vocab": {"nuclear fusion": "A process that creates energy by combining atoms, like the sun does"}
                },
                {
                    "main": "Is carbon capture a real solution or just a way for polluters to avoid changing their behavior?",
                    "subs": ["Should carbon capture be funded by the companies that pollute the most?", "Can technology alone save us, or do we need to change our lifestyles?"],
                    "vocab": {"carbon capture": "Technology that removes carbon dioxide from the atmosphere"}
                },
                {
                    "main": "If your city was redesigned from scratch with only green technology, what would it look like?",
                    "subs": ["What would be different about daily life?", "Would you want to live in a completely green city?"],
                    "vocab": {}
                },
                {
                    "main": "Should patents on green technology be shared freely so all countries can benefit?",
                    "subs": ["Is it fair for one company to own the rights to technology that could save the planet?", "How do we balance innovation incentives with the urgency of the climate crisis?"],
                    "vocab": {"patents": "Official rights to make or sell an invention for a set period of time"}
                },
                {
                    "main": "If you had to choose between a high-tech green future and a simpler, lower-tech natural lifestyle, which would you choose?",
                    "subs": ["What would you miss most about modern life?", "Is it possible to have both technology and a connection to nature?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think artificial photosynthesis could replace fossil fuels?",
                    "subs": ["What natural process would you most like scientists to copy?", "How does nature inspire technological innovation?"],
                    "vocab": {"artificial photosynthesis": "Technology that mimics how plants turn sunlight into energy"}
                },
                {
                    "main": "If every person in the world had to reduce their energy consumption by 50%, how would you do it?",
                    "subs": ["What would you miss most?", "Is it possible to live well while using much less energy?"],
                    "vocab": {}
                },
                {
                    "main": "Will green technology make the world more equal or will only wealthy people and countries be able to afford it?",
                    "subs": ["How can we ensure green technology reaches everyone?", "Is environmental justice possible without economic justice?"],
                    "vocab": {}
                }
            ]
        }
    ],
    "culture": [
        {
            "title": "Cultural Identity",
            "image_keywords": "cultural identity,flags,tradition",
            "questions": [
                {
                    "main": "How would you describe your cultural identity to someone from the other side of the world?",
                    "subs": ["What aspects of your culture are you most proud of?", "Is there anything about your culture you wish you could change?"],
                    "vocab": {"aspects": "Particular parts or features of something"}
                },
                {
                    "main": "Do you think globalization is eroding cultural diversity, or is it creating new forms of culture?",
                    "subs": ["What cultural tradition from your country do you think should be protected?", "Is cultural exchange always positive, or can it sometimes be harmful?"],
                    "vocab": {"globalization": "The process by which businesses develop international influence", "eroding": "Gradually destroying or being destroyed", "cultural exchange": "When different cultures share and learn from each other"}
                },
                {
                    "main": "If you were born in a completely different culture, what do you think would be different about your personality?",
                    "subs": ["How much of who you are is shaped by your culture versus your individual choices?", "What cultural value from another society would you want to adopt?"],
                    "vocab": {}
                },
                {
                    "main": "Is it possible to truly appreciate another culture without fully understanding it?",
                    "subs": ["Have you ever felt like an outsider trying to understand a different culture?", "What's the most important thing to remember when engaging with an unfamiliar culture?"],
                    "vocab": {"appreciate": "To recognize the value or quality of something"}
                },
                {
                    "main": "Should schools teach children about world cultures, or should education focus only on their own national heritage?",
                    "subs": ["How did your school shape your understanding of other cultures?", "At what age should children start learning about global diversity?"],
                    "vocab": {}
                },
                {
                    "main": "If you had to explain your culture to a visitor in just three minutes, what would you say?",
                    "subs": ["What would you show them first?", "What question about your culture do foreigners always get wrong?"],
                    "vocab": {}
                },
                {
                    "main": "Is there a cultural stereotype about your country that actually contains some truth?",
                    "subs": ["How do you feel when people repeat this stereotype?", "Should we fight stereotypes or accept that some are based on reality?"],
                    "vocab": {"stereotype": "A fixed idea about what a particular type of person or thing is like"}
                },
                {
                    "main": "Do you think multiculturalism makes a society stronger or more divided?",
                    "subs": ["What's the best example of multiculturalism working well?", "Can different cultures truly integrate, or do they always remain separate?"],
                    "vocab": {"multiculturalism": "The presence of several distinct cultures within a society"}
                },
                {
                    "main": "If you could add one new holiday to your country's calendar, what would it celebrate?",
                    "subs": ["What values do you think society should commemorate?", "Are there any existing holidays you think should be abolished?"],
                    "vocab": {"commemorate": "To remember and show respect for an important event", "abolished": "Officially ended or stopped"}
                },
                {
                    "main": "Have you ever experienced a moment where you felt deeply connected to your culture?",
                    "subs": ["What triggered that feeling?", "Can you feel connected to your culture when you are far from home?"],
                    "vocab": {"triggered": "Caused something to happen"}
                },
                {
                    "main": "Is cultural heritage worth preserving at any cost?",
                    "subs": ["What cultural heritage in your country is most at risk?", "Should money be spent on preserving culture or on addressing current problems?"],
                    "vocab": {"cultural heritage": "Traditions, buildings, and objects from the past that are important to a culture"}
                },
                {
                    "main": "If your culture had a theme song, what would it be and why?",
                    "subs": ["Does your culture have an unofficial anthem?", "Can music capture the spirit of a culture better than words?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think the internet is creating a single global culture or helping smaller cultures survive?",
                    "subs": ["Has the internet helped you connect with your own culture more deeply?", "Is there a culture you discovered through the internet?"],
                    "vocab": {}
                },
                {
                    "main": "What's the most misunderstood aspect of your culture?",
                    "subs": ["How do you explain it to people who have never experienced it?", "Has this misunderstanding ever caused a problem for you?"],
                    "vocab": {"misunderstood": "Not understood correctly"}
                },
                {
                    "main": "If you could live in another culture for one year, which would you choose and why?",
                    "subs": ["What do you think you would struggle with most?", "What do you think you would learn about yourself?"],
                    "vocab": {}
                }
            ]
        },
        {
            "title": "Art & Expression",
            "image_keywords": "art,painting,museum,creative",
            "questions": [
                {
                    "main": "What piece of art has changed the way you see the world?",
                    "subs": ["Can art truly transform society, or does it just reflect what's already there?", "Is there a work of art you didn't understand at first but grew to love?"],
                    "vocab": {"transform": "To change something completely in form, appearance, or character"}
                },
                {
                    "main": "Is graffiti an act of artistic expression or an act of vandalism?",
                    "subs": ["Should cities provide legal spaces for street art?", "What makes something art and not just decoration?"],
                    "vocab": {"graffiti": "Writings or drawings on walls in public places, often without permission", "vandalism": "The crime of deliberately damaging property", "decoration": "Making something look more attractive by adding extra items"}
                },
                {
                    "main": "Do you think art should always have a message, or is beauty enough on its own?",
                    "subs": ["Should governments fund the arts with public money, or should art support itself?", "Can something be great art if nobody understands it?"],
                    "vocab": {"message": "A point or idea that an artist tries to communicate", "fund": "To provide money for something"}
                },
                {
                    "main": "If you were a famous artist, what medium would you work in and what would your art be about?",
                    "subs": ["Do you think famous artists have a responsibility to address social issues?", "Has social media democratized art or devalued it?"],
                    "vocab": {"responsibility": "A duty to deal with something or take care of someone", "democratized": "Made something available to everyone", "devalued": "Reduced the value or importance of something"}
                },
                {
                    "main": "Is there a museum or gallery you would visit every week for the rest of your life if you could?",
                    "subs": ["What's the most profound art experience you've ever had?", "Do you think virtual museum tours can ever replace the real experience?"],
                    "vocab": {"profound": "Very great or intense; having a strong effect"}
                },
                {
                    "main": "Should street performers be required to have a license, or should public spaces be free for anyone to perform?",
                    "subs": ["Have you ever been moved by a street performance?", "What's the difference between a busker and someone just making noise?"],
                    "vocab": {"street performers": "People who entertain in public places, often for tips", "busker": "A person who entertains people in public places for money"}
                },
                {
                    "main": "If you could own any painting in the world, which would you choose?",
                    "subs": ["Would you hang it in your home or donate it to a museum?", "Is art more enjoyable when you own it or when everyone can see it?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think AI-generated art should be eligible for art prizes and competitions?",
                    "subs": ["What makes art meaningful — the process or the result?", "Can a machine have artistic intention?"],
                    "vocab": {"eligible": "Meeting the requirements to participate"}
                },
                {
                    "main": "Is there a form of art that you think is undervalued in your culture?",
                    "subs": ["Why do you think it doesn't get more attention?", "How would you promote it?"],
                    "vocab": {"undervalued": "Not appreciated as much as it should be"}
                },
                {
                    "main": "If you could bring back one artist from the dead to create one more work, who would it be?",
                    "subs": ["What question would you want to ask them about their creative process?", "How has their work influenced you personally?"],
                    "vocab": {}
                },
                {
                    "main": "Should art education be a core subject in schools, just like maths and science?",
                    "subs": ["Has art education helped you think more creatively?", "Is it possible to teach someone to be artistic, or is it a natural talent?"],
                    "vocab": {}
                },
                {
                    "main": "What's the most controversial piece of art you've ever seen?",
                    "subs": ["Should artists be allowed to create whatever they want, even if it offends people?", "Where is the line between artistic expression and causing harm?"],
                    "vocab": {"controversial": "Causing public disagreement or debate", "offends": "Makes someone feel upset, insulted, or annoyed"}
                },
                {
                    "main": "If music was the only art form left in the world, would that be enough?",
                    "subs": ["Which art form do you think is most essential to human culture?", "Is there an art form you think the world doesn't need?"],
                    "vocab": {}
                },
                {
                    "main": "Has a book ever changed your mind about something important?",
                    "subs": ["What book has had the biggest impact on your life?", "Do you think reading fiction makes people more empathetic?"],
                    "vocab": {"empathetic": "Able to understand and share the feelings of another person"}
                },
                {
                    "main": "If you could experience one day in the life of any artist in history, who would you choose?",
                    "subs": ["What do you think would surprise you most about their daily routine?", "What would you want to learn from them?"],
                    "vocab": {}
                }
            ]
        },
        {
            "title": "Music Across Cultures",
            "image_keywords": "music,concert,cultural music",
            "questions": [
                {
                    "main": "Can music transcend language barriers in ways that words cannot?",
                    "subs": ["Have you ever been moved by a song in a language you don't understand?", "What music from another culture has surprised or delighted you?"],
                    "vocab": {"transcend": "To go beyond the usual limits of something", "delighted": "Feeling or showing great pleasure"}
                },
                {
                    "main": "Is there a music genre you dismissed for years before finally appreciating it?",
                    "subs": ["How do your music tastes reflect your cultural background?", "Should we be more adventurous with the music we listen to?"],
                    "vocab": {"appreciating": "Recognizing the value or quality of something"}
                },
                {
                    "main": "Do you think streaming has helped or hurt musicians?",
                    "subs": ["Should artists be paid more for streams, even if music becomes more expensive?", "Has easy access to all music ever made made us appreciate individual songs less?"],
                    "vocab": {"streaming": "Playing music directly from the internet without downloading"}
                },
                {
                    "main": "If you could attend any concert in history, which would you choose?",
                    "subs": ["What's the best live music experience you've ever had?", "Is there a musical performance that changed your life?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think music can bring opposing groups of people together?",
                    "subs": ["Has a song ever made you see an issue from another person's perspective?", "Can music travel across borders more easily than other art forms?"],
                    "vocab": {"opposing": "Very different from and in opposition to each other", "perspective": "A particular way of viewing things"}
                },
                {
                    "main": "If you could play any instrument perfectly, which would you choose?",
                    "subs": ["What instrument do you think has the most beautiful sound?", "Is there an instrument you associate with your culture?"],
                    "vocab": {}
                },
                {
                    "main": "Is there a song that instantly transports you back to a specific moment in your life?",
                    "subs": ["What memory does it connect to?", "Why do certain songs become so powerfully linked to our memories?"],
                    "vocab": {"transports": "To cause someone to feel they are in a different place or time"}
                },
                {
                    "main": "Do you think music lyrics should be held to the same standards of social responsibility as other media?",
                    "subs": ["Has a song lyric ever offended you?", "Can music normalize harmful behavior, or is it just entertainment?"],
                    "vocab": {"lyrics": "The words of a song", "normalize": "To make something seem normal or acceptable"}
                },
                {
                    "main": "Should music education be free and available to every child, regardless of their family's income?",
                    "subs": ["Has learning music benefited you in ways beyond just playing an instrument?", "Is music education as important as maths or science?"],
                    "vocab": {}
                },
                {
                    "main": "If you could form a supergroup — any musicians living or dead — who would be in it?",
                    "subs": ["What would your first song be about?", "What makes certain musicians work so well together?"],
                    "vocab": {"supergroup": "A band formed by members who were already famous from other bands"}
                },
                {
                    "main": "What's the most emotional piece of music you've ever heard?",
                    "subs": ["Why did it affect you so deeply?", "Can instrumental music be more emotional than music with words?"],
                    "vocab": {"emotional": "Showing strong feelings", "instrumental": "Music played only by instruments without singing"}
                },
                {
                    "main": "Do you think national anthems unite or divide people?",
                    "subs": ["Does your national anthem make you feel proud, indifferent, or something else?", "Should national anthems be updated to reflect modern values?"],
                    "vocab": {"anthems": "Official songs that represent a country", "indifferent": "Having no particular interest or sympathy"}
                },
                {
                    "main": "If you could only listen to music from one decade for the rest of your life, which would you choose?",
                    "subs": ["What decade had the best music in your opinion?", "Is modern music better or worse than music from the past?"],
                    "vocab": {}
                },
                {
                    "main": "Has music ever helped you through a difficult time in your life?",
                    "subs": ["What song got you through?", "Can music be a form of therapy?"],
                    "vocab": {"therapy": "Treatment intended to relieve or heal a disorder"}
                },
                {
                    "main": "Will AI-composed music ever be as emotionally powerful as music written by humans?",
                    "subs": ["What makes music emotionally powerful — the melody, the lyrics, or the human story behind it?", "Could you tell the difference between AI and human-composed music?"],
                    "vocab": {"melody": "A sequence of musical notes that sounds pleasant"}
                }
            ]
        },
        {
            "title": "Festivals & Traditions",
            "image_keywords": "festival,celebration,culture",
            "questions": [
                {
                    "main": "What festival or tradition from your culture would you want the whole world to experience?",
                    "subs": ["What makes this tradition so special to you?", "Has the commercialization of your favourite festival taken away from its original meaning?"],
                    "vocab": {"special": "Different from what is usual; better or greater than usual", "commercialization": "Managing something mainly for financial profit"}
                },
                {
                    "main": "Do you think traditional festivals are losing their meaning as the world becomes more secular and modern?",
                    "subs": ["Should we preserve traditional celebrations even if their original significance is forgotten?", "What new traditions do you think will emerge in the next 50 years?"],
                    "vocab": {"traditional": "Following customs and beliefs that have existed for a long time", "secular": "Not connected with religious or spiritual matters", "preserve": "To keep something in its original state"}
                },
                {
                    "main": "If you could create a new national holiday for your country, what would it celebrate?",
                    "subs": ["What values do you think society should commemorate?", "Are there any existing holidays you think should be abolished?"],
                    "vocab": {"commemorate": "To remember and show respect for an important event or person", "abolished": "Officially ended or stopped"}
                },
                {
                    "main": "Have you ever participated in a foreign festival that felt profoundly different from anything you knew?",
                    "subs": ["What did that experience teach you about the culture?", "Is there a festival from another country you would love to attend?"],
                    "vocab": {"profoundly": "To a very great or intense degree"}
                },
                {
                    "main": "Is it respectful to adopt elements of another culture's celebrations into your own life?",
                    "subs": ["Where is the line between appreciation and appropriation?", "How do you feel when people from other cultures celebrate your traditions?"],
                    "vocab": {"appreciation": "Recognizing the value or quality of something", "appropriation": "Taking something from another culture, especially in a disrespectful way"}
                },
                {
                    "main": "What's the most over-the-top celebration you've ever witnessed?",
                    "subs": ["What made it so extreme?", "Is there such a thing as too much celebration?"],
                    "vocab": {"over-the-top": "Excessive or exaggerated"}
                },
                {
                    "main": "If you had to explain your culture's New Year traditions to an alien, how would you describe them?",
                    "subs": ["What would be the most difficult tradition to explain?", "What does your New Year tradition reveal about your culture's values?"],
                    "vocab": {}
                },
                {
                    "main": "Should religious festivals be celebrated in public schools, or should schools be completely secular?",
                    "subs": ["How do you balance respecting different religious traditions in a diverse classroom?", "Has a religious festival from another culture ever inspired you?"],
                    "vocab": {"secular": "Not connected with religious matters"}
                },
                {
                    "main": "Is there a tradition you used to hate as a child but now appreciate as an adult?",
                    "subs": ["What changed your perspective?", "Do you think children should be forced to participate in traditions they don't enjoy?"],
                    "vocab": {"perspective": "A particular way of considering something"}
                },
                {
                    "main": "What festival food is absolutely essential to the celebration?",
                    "subs": ["Is there a dish that is only made for special occasions?", "Has a festival food ever disappointed you?"],
                    "vocab": {}
                },
                {
                    "main": "If you could bring back one ancient festival from history, which would you choose?",
                    "subs": ["What would modern people think of it?", "Is there an ancient tradition that should never be revived?"],
                    "vocab": {"revived": "Brought back to life or use again"}
                },
                {
                    "main": "Do you think Black Friday and Cyber Monday have become pseudo-festivals of consumerism?",
                    "subs": ["Do you participate in these shopping events?", "Is there something wrong with turning shopping into a celebration?"],
                    "vocab": {"pseudo-festivals": "Events that resemble festivals but are primarily commercial", "consumerism": "The belief that buying goods is good for the economy and society"}
                },
                {
                    "main": "What tradition from your culture do you think will disappear within 50 years?",
                    "subs": ["Should we try to save it, or let it go naturally?", "What tradition do you hope will never disappear?"],
                    "vocab": {}
                },
                {
                    "main": "If you had to create a completely new festival that combined elements from three different cultures, what would it be?",
                    "subs": ["Which three cultures would you combine?", "What would people do at your new festival?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think festivals bring out the best or the worst in people?",
                    "subs": ["What's the worst festival experience you've ever had?", "What's the best?"],
                    "vocab": {}
                }
            ]
        },
        {
            "title": "Language & Belonging",
            "image_keywords": "language,communication,identity",
            "questions": [
                {
                    "main": "Is language just a tool for communication, or does it shape the way we think?",
                    "subs": ["Do you feel like a different person when you speak different languages?", "Is something always lost in translation?"],
                    "vocab": {"translation": "The process of changing words from one language to another"}
                },
                {
                    "main": "If you could magically become fluent in any language tomorrow, which would you choose?",
                    "subs": ["What would you do with that language?", "Is there a language you think is beautiful just to listen to?"],
                    "vocab": {"magically": "As if by magic; in an impossible way", "fluent": "Able to speak a language easily and well"}
                },
                {
                    "main": "Do you think a universal language would unite the world or destroy cultural diversity?",
                    "subs": ["Should everyone be required to learn one common language?", "What would be lost if the whole world spoke the same language?"],
                    "vocab": {"universal": "Relating to or affecting everyone in the world"}
                },
                {
                    "main": "Is there a word in your language that doesn't exist in English but should?",
                    "subs": ["What does it mean?", "Do certain emotions only exist in specific languages?"],
                    "vocab": {}
                },
                {
                    "main": "Should dialects and minority languages be protected by law, or is it natural for some languages to die out?",
                    "subs": ["Is there a dialect or minority language in your country that is disappearing?", "What's lost when a language dies?"],
                    "vocab": {"dialects": "Forms of a language spoken in particular regions or by particular groups", "minority languages": "Languages spoken by a small number of people within a country"}
                },
                {
                    "main": "If you moved to a new country and had to learn a new language as an adult, would you be bothered by always having an accent?",
                    "subs": ["How important is it to sound like a native speaker?", "Do you think accents are charming or a barrier to communication?"],
                    "vocab": {"barrier": "Something that prevents progress or movement"}
                },
                {
                    "main": "Do you think emoji and internet slang are enriching language or degrading it?",
                    "subs": ["Has texting changed the way you communicate?", "Is there an emoji that perfectly captures a feeling words can't?"],
                    "vocab": {"degrading": "Treating something as if it is less important or valuable than it is"}
                },
                {
                    "main": "Is it offensive to correct someone's grammar in casual conversation, or should we help each other improve?",
                    "subs": ["Has someone ever corrected your language in a way that annoyed you?", "Is there a grammar mistake you hear constantly that drives you crazy?"],
                    "vocab": {"offensive": "Causing someone to feel upset, annoyed, or insulted"}
                },
                {
                    "main": "If you could understand what animals are saying, which animals would you want to talk to?",
                    "subs": ["What do you think they would say about humans?", "Would talking to animals change how we treat them?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think bilingual or multilingual people have an advantage in life?",
                    "subs": ["Has knowing more than one language changed how you see the world?", "Is it true that you dream in different languages depending on which one you think in?"],
                    "vocab": {"bilingual": "Able to speak two languages fluently", "multilingual": "Able to speak several languages"}
                },
                {
                    "main": "Should profanity — swear words — be used in formal settings, or should it always be avoided?",
                    "subs": ["Do you think some swear words are worse than others?", "Is profanity more acceptable now than it was 50 years ago?"],
                    "vocab": {"profanity": "Swear words or offensive language"}
                },
                {
                    "main": "If your language was chosen as the language of the future, how would you feel?",
                    "subs": ["What makes a language powerful — the number of speakers or the culture behind it?", "Is English's global dominance a good thing or a threat to diversity?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think voice assistants like Siri and Alexa are changing the way we use language?",
                    "subs": ["Has talking to a machine changed how you speak to other people?", "Will we eventually speak to computers more than to humans?"],
                    "vocab": {}
                },
                {
                    "main": "Is there a language you find beautiful even though you don't understand it?",
                    "subs": ["What makes a language sound beautiful?", "Can a language be beautiful and also difficult to learn?"],
                    "vocab": {}
                },
                {
                    "main": "Will real-time translation earpieces make learning foreign languages unnecessary within 20 years?",
                    "subs": ["Is there value in learning a language even if technology can translate everything?", "What would be lost if nobody learned foreign languages anymore?"],
                    "vocab": {"real-time translation": "Instant translation from one language to another using technology"}
                }
            ]
        },
        {
            "title": "Digital Culture & Society",
            "image_keywords": "digital culture,social media,online",
            "questions": [
                {
                    "main": "Do you think cancel culture is a form of accountability or a dangerous mob mentality?",
                    "subs": ["Have you ever stopped supporting someone because of something they posted online?", "Should people be allowed to grow and change, or are online mistakes permanent?"],
                    "vocab": {"accountability": "The responsibility of being the reason for your own actions", "mob mentality": "When a group of people act together in an uncontrolled way"}
                },
                {
                    "main": "Is digital detox a luxury only privileged people can afford?",
                    "subs": ["Have you ever taken a digital detox? What was the experience like?", "Is it possible to fully disconnect in the modern world?"],
                    "vocab": {"digital detox": "A period when a person stops using electronic devices to reduce stress", "privileged": "Having special rights or advantages that others do not have"}
                },
                {
                    "main": "Do you think online friendships are as meaningful as face-to-face friendships?",
                    "subs": ["Have you ever met an online friend in person? How did it go?", "Can you truly know someone you have only ever talked to through a screen?"],
                    "vocab": {}
                },
                {
                    "main": "Should internet access be considered a basic human right?",
                    "subs": ["How would your life change if you lost internet access tomorrow?", "Is the digital divide making inequality worse?"],
                    "vocab": {"internet access": "The ability to connect to the internet", "digital divide": "The gap between those who have access to technology and those who do not"}
                },
                {
                    "main": "Do you think memes are a legitimate form of cultural expression?",
                    "subs": ["What's the best meme you've ever seen?", "Can a meme change how people think about an issue?"],
                    "vocab": {"memes": "Images, videos, or text that are copied and spread online with humorous intent", "legitimate": "Conforming to the law or rules; genuine"}
                },
                {
                    "main": "Is online anonymity a force for good or evil?",
                    "subs": ["Have you ever posted something anonymously?", "Should people be required to use their real names online?"],
                    "vocab": {"anonymity": "The state of not being identified by name"}
                },
                {
                    "main": "Do you think viral trends bring people together or just create pressure to conform?",
                    "subs": ["Have you ever participated in a viral trend you didn't actually enjoy?", "Is there a viral trend that genuinely changed something for the better?"],
                    "vocab": {"viral trends": "Content that spreads rapidly and widely across the internet", "conform": "To behave according to socially acceptable conventions"}
                },
                {
                    "main": "Should screen time for children be legally limited, or is that a parent's decision?",
                    "subs": ["How much screen time did you have as a child compared to children today?", "What is the right balance between digital and physical play?"],
                    "vocab": {"screen time": "The amount of time spent looking at a computer, phone, or television screen"}
                },
                {
                    "main": "Do you think virtual reality will eventually replace physical travel and in-person experiences?",
                    "subs": ["Would you attend a virtual concert instead of a real one?", "What experiences can never be replaced by virtual reality?"],
                    "vocab": {"virtual reality": "A computer-generated simulation of a real environment"}
                },
                {
                    "main": "Is data privacy something you actively think about, or do you accept that everything you do online is tracked?",
                    "subs": ["Have you ever changed your online behavior because of privacy concerns?", "Would you pay for social media if it meant your data wasn't collected?"],
                    "vocab": {"data privacy": "The protection of personal information stored and shared online"}
                },
                {
                    "main": "Do you think artificial intelligence will ever be able to create truly original art?",
                    "subs": ["What makes art uniquely human?", "Would you value AI-created art the same way as human-created art?"],
                    "vocab": {"artificial intelligence": "Computer systems that can perform tasks that normally require human intelligence"}
                },
                {
                    "main": "Should social media companies be held responsible for the mental health effects of their platforms?",
                    "subs": ["Has social media ever negatively affected your mental health?", "Who is responsible for protecting users — the platform or the individual?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think the internet has made people more tolerant or more divided?",
                    "subs": ["Has the internet exposed you to perspectives you would never have encountered otherwise?", "Do online echo chambers make people more extreme in their views?"],
                    "vocab": {"tolerant": "Accepting of feelings, habits, or beliefs that are different from your own", "divided": "Split into groups with opposing opinions", "echo chambers": "Environments where people only encounter opinions that confirm their own"}
                },
                {
                    "main": "If you could delete one app from existence, which would it be and why?",
                    "subs": ["What would you do with the time you currently spend on that app?", "Is there an app you think has made the world worse?"],
                    "vocab": {}
                },
                {
                    "main": "Will future generations look back at our relationship with technology the way we look back at smoking?",
                    "subs": ["What digital habit do you think will be seen as unacceptable in 50 years?", "What should we change now to be more responsible with technology?"],
                    "vocab": {}
                }
            ]
        }
    ],
    "health": [
        {
            "title": "Mental Health Matters",
            "image_keywords": "mental health,wellbeing,mindfulness",
            "questions": [
                {
                    "main": "Do you think society has become more open about mental health, or is there still too much stigma?",
                    "subs": ["How comfortable do you feel discussing your mental health with friends or family?", "Should mental health education be mandatory in schools?"],
                    "vocab": {"open": "Willing to talk honestly about feelings and experiences", "stigma": "A strong feeling of disapproval in society about something", "mandatory": "Required by law or rules; compulsory"}
                },
                {
                    "main": "Is therapy something everyone should try, regardless of whether they have a specific problem?",
                    "subs": ["What barriers prevent people from seeking help for mental health?", "Do you think online therapy is as effective as in-person sessions?"],
                    "vocab": {"therapy": "Treatment intended to relieve or heal a disorder", "barriers": "Obstacles that prevent movement or access"}
                },
                {
                    "main": "Has social media been more harmful or helpful for your mental health?",
                    "subs": ["Do you ever take digital detoxes — periods where you avoid screens?", "Should there be regulations on how social media platforms affect users' mental health?"],
                    "vocab": {"digital detoxes": "Periods when a person stops using electronic devices to reduce stress", "regulations": "Rules made by an authority to control how something is done"}
                },
                {
                    "main": "Is loneliness the epidemic of our generation?",
                    "subs": ["How do you maintain meaningful connections in a busy world?", "Do you think technology helps or hurts our ability to form deep relationships?"],
                    "vocab": {"loneliness": "Sadness because you have no friends or company", "epidemic": "A widespread occurrence of something undesirable"}
                },
                {
                    "main": "If you could design the perfect mental health support system for your community, what would it include?",
                    "subs": ["Should employers be required to provide mental health days?", "What role should friends and family play in supporting someone's mental health?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think people are more stressed today than they were 50 years ago, or do we just talk about it more?",
                    "subs": ["What's the biggest source of stress in your life?", "Is stress always harmful, or can it sometimes be useful?"],
                    "vocab": {}
                },
                {
                    "main": "Should **meditation** and **mindfulness** be taught in schools as standard practice?",
                    "subs": ["Have you ever tried meditation? Did it help?", "Is mindfulness a genuine solution to modern stress or just a trend?"],
                    "vocab": {"meditation": "The practice of focusing your mind to achieve calmness", "mindfulness": "The practice of being aware of the present moment"}
                },
                {
                    "main": "If you could eliminate one mental health challenge from the world, which would you choose?",
                    "subs": ["Why is this the most important one?", "What would the world be like without it?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think there's a difference between being **sad** and being **depressed**?",
                    "subs": ["How do you distinguish between normal sadness and something more serious?", "Should people be more careful about using clinical terms casually?"],
                    "vocab": {"depressed": "Very unhappy and without hope"}
                },
                {
                    "main": "Should employers have access to employees' mental health records?",
                    "subs": ["Could this information be used to help or to discriminate?", "Where is the line between support and invasion of privacy?"],
                    "vocab": {"discriminate": "To treat someone differently and unfairly because of who they are"}
                },
                {
                    "main": "Has a movie, book, or song ever helped you process difficult emotions?",
                    "subs": ["What was it and why did it help?", "Can art be a form of therapy?"],
                    "vocab": {"process": "To deal with difficult feelings or experiences in a healthy way"}
                },
                {
                    "main": "If you could give your younger self one piece of mental health advice, what would it be?",
                    "subs": ["What do you wish you had known earlier?", "What advice would you give to young people today?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **happiness** is a choice, or are some people genetically **predisposed** to being unhappy?",
                    "subs": ["How much of happiness is within our control?", "Is the pursuit of happiness realistic, or should we aim for something else?"],
                    "vocab": {"predisposed": "More likely to have or do something because of your genes or nature"}
                },
                {
                    "main": "Should mental health days be a legal right, just like sick days?",
                    "subs": ["How would employers verify that someone needs a mental health day?", "Would people abuse this right?"],
                    "vocab": {}
                },
                {
                    "main": "Will AI therapists ever be as effective as human therapists?",
                    "subs": ["Could you open up to a machine about your deepest problems?", "What makes therapy work — the technique or the human connection?"],
                    "vocab": {}
                }
            ]
        },
        {
            "title": "Fitness & Lifestyle",
            "image_keywords": "fitness,exercise,gym,healthy",
            "questions": [
                {
                    "main": "Is exercise more important for your physical health or your mental health?",
                    "subs": ["What's the most effective form of exercise for your personality type?", "Do you think fitness culture on social media is motivating or toxic?"],
                    "vocab": {"exercise": "Physical activity done to keep healthy and fit", "motivating": "Giving you a reason or enthusiasm to do something", "toxic": "Very harmful, unpleasant, or negative"}
                },
                {
                    "main": "Would you rather be extremely strong or extremely flexible — and why?",
                    "subs": ["What physical ability do you most wish you had?", "Is there a sport or physical activity you've always wanted to try but never had the courage?"],
                    "vocab": {"flexible": "Able to bend easily without breaking; adaptable"}
                },
                {
                    "main": "Do you think gyms are necessary, or can people get equally good exercise outdoors or at home?",
                    "subs": ["What's the most unusual or interesting place you've ever exercised?", "Should cities invest more in free outdoor fitness equipment?"],
                    "vocab": {}
                },
                {
                    "main": "Is competition in sports healthy, or does it create unnecessary pressure and anxiety?",
                    "subs": ["Do you think children should be encouraged to compete, or should the focus be on enjoyment?", "Has a sports experience ever taught you a valuable life lesson?"],
                    "vocab": {"competition": "A situation where people or groups try to win or be the best"}
                },
                {
                    "main": "If you could master any physical skill — surfing, rock climbing, dancing, martial arts — which would you choose?",
                    "subs": ["What physical challenge have you overcome that you're most proud of?", "How does your physical health affect your confidence in daily life?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **extreme sports** are admirable or irresponsible?",
                    "subs": ["Has an extreme sport ever tempted you to try it?", "Where is the line between pushing your limits and being reckless?"],
                    "vocab": {"extreme sports": "Sports that involve dangerous physical challenges", "reckless": "Not caring about danger or consequences"}
                },
                {
                    "main": "Should **physical education** be given the same importance as academic subjects in schools?",
                    "subs": ["What's the best PE class you ever had?", "Is it possible to make physical education enjoyable for everyone?"],
                    "vocab": {}
                },
                {
                    "main": "If you could compete in any Olympic sport, which would you choose?",
                    "subs": ["What sport do you think is the hardest?", "Is there a sport you think should be added to or removed from the Olympics?"],
                    "vocab": {}
                },
                {
                    "main": "Has a fitness goal ever helped you achieve something unexpected in another area of your life?",
                    "subs": ["What did you learn about yourself through training?", "Can physical discipline improve mental discipline?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **body positivity** — accepting all body types — is compatible with promoting health?",
                    "subs": ["Is it possible to be overweight and healthy?", "Has the body positivity movement helped or hurt people's health?"],
                    "vocab": {"body positivity": "The belief that all people deserve to have a positive body image", "compatible": "Able to exist together without problems"}
                },
                {
                    "main": "If you could only do one form of exercise for the rest of your life, what would it be?",
                    "subs": ["What exercise do you think gives the best results?", "Is there an exercise you love that most people would find boring?"],
                    "vocab": {}
                },
                {
                    "main": "Should professional athletes be paid as much as they are, or is their salary **disproportionate** to their contribution to society?",
                    "subs": ["Should doctors and teachers be paid more than athletes?", "Do athletes have a responsibility to be role models?"],
                    "vocab": {"disproportionate": "Too large or too small compared to something else", "role models": "People whose behavior is admired and copied by others"}
                },
                {
                    "main": "Is there a sport or physical activity from another culture that you think everyone should try?",
                    "subs": ["What makes it unique?", "How does physical culture differ from country to country?"],
                    "vocab": {}
                },
                {
                    "main": "If you were extremely fit for one day but then returned to normal, what would you do?",
                    "subs": ["What physical dream would you finally fulfill?", "Is there a mountain you would climb or a marathon you would run?"],
                    "vocab": {}
                },
                {
                    "main": "Will **virtual reality** fitness ever replace going to the gym or exercising outdoors?",
                    "subs": ["What would you gain and what would you lose exercising in VR?", "Is the social aspect of gyms important to you?"],
                    "vocab": {}
                }
            ]
        },
        {
            "title": "Sleep & Recovery",
            "image_keywords": "sleep,rest,bed,relaxation",
            "questions": [
                {
                    "main": "Do you think sleep is undervalued in modern society?",
                    "subs": ["How many hours of sleep do you need to function at your best?", "Should companies be allowed to contact employees during sleeping hours?"],
                    "vocab": {"undervalued": "Not appreciated or valued as much as it should be"}
                },
                {
                    "main": "Is napping during the day a sign of laziness or a smart recovery strategy?",
                    "subs": ["Do you think schools and workplaces should have nap rooms?", "What's the best nap you've ever had, and where was it?"],
                    "vocab": {"napping": "Sleeping for a short time during the day"}
                },
                {
                    "main": "How much has your phone ruined your sleep, and what have you done about it?",
                    "subs": ["Do you check your phone right before sleeping? Should you stop?", "Is the blue light from screens really that harmful, or is it mostly anecdotal?"],
                    "vocab": {"ruined": "Spoiled or destroyed something", "anecdotal": "Based on personal stories rather than research or facts"}
                },
                {
                    "main": "If you could design the perfect sleeping environment, what would it look like?",
                    "subs": ["What's the strangest place you've ever fallen asleep?", "Do you think people sleep worse now than they did 100 years ago?"],
                    "vocab": {}
                },
                {
                    "main": "Should insomnia and other sleep disorders be taken more seriously by the medical community?",
                    "subs": ["Have you ever had a sleep problem that affected your daily life?", "What's the most unusual remedy for insomnia you've ever heard of?"],
                    "vocab": {"insomnia": "A condition where you find it difficult to sleep"}
                },
                {
                    "main": "Do you think **siestas** — afternoon naps — should be a standard part of the workday in all countries?",
                    "subs": ["Is there a culture you admire for their approach to rest?", "Should schools start later so teenagers can sleep more?"],
                    "vocab": {"siestas": "Afternoon naps or rest periods, common in some countries"}
                },
                {
                    "main": "If you could sleep anywhere in the world tonight — a beach, a mountain hut, a luxury hotel — where would you choose?",
                    "subs": ["What's the most memorable place you've ever slept?", "Is there a place where you sleep better than at home?"],
                    "vocab": {}
                },
                {
                    "main": "Has a dream ever **influenced** a decision you made in real life?",
                    "subs": ["Do you think dreams have meaning, or are they just random brain activity?", "Is there a recurring dream that has stayed with you for years?"],
                    "vocab": {"influenced": "Had an effect on something"}
                },
                {
                    "main": "Should **sleep tracking** devices be used by doctors to diagnose health problems?",
                    "subs": ["Do you track your sleep? Does it help or make you more anxious about sleeping?", "How much sleep data is too much information?"],
                    "vocab": {"diagnose": "To identify an illness by examining the symptoms"}
                },
                {
                    "main": "If you could never drink coffee again or never sleep in on weekends, which would you give up?",
                    "subs": ["How dependent are you on caffeine?", "Is a weekend lie-in essential to your happiness?"],
                    "vocab": {"caffeine": "A stimulant found in coffee and tea that helps you feel more awake"}
                },
                {
                    "main": "Do you think **polyphasic sleep** — sleeping in several short periods instead of one long block — could work for everyone?",
                    "subs": ["Has anyone you know ever tried an unusual sleep schedule?", "Is eight hours of sleep per night a myth?"],
                    "vocab": {"polyphasic sleep": "Sleeping in several short periods during the day instead of one long period at night"}
                },
                {
                    "main": "What's the worst case of sleep deprivation you've ever experienced?",
                    "subs": ["How did it affect your ability to function?", "Did you learn anything important about your body from the experience?"],
                    "vocab": {"sleep deprivation": "Not getting enough sleep", "function": "To work or operate in the correct way"}
                },
                {
                    "main": "If scientists could create a pill that eliminated the need for sleep, would you take it?",
                    "subs": ["What would you do with all the extra time?", "What would be lost if humans stopped sleeping?"],
                    "vocab": {}
                },
                {
                    "main": "Should schools and workplaces adjust their schedules to match people's natural **chronotypes** — whether they are morning or evening people?",
                    "subs": ["Are you a morning person or a night owl?", "Should people be allowed to choose their working hours based on their body clock?"],
                    "vocab": {"chronotypes": "Your body's natural preference for being active at certain times of day"}
                },
                {
                    "main": "If you could sleep for one hundred years and wake up in the future, would you do it?",
                    "subs": ["What year would you want to wake up in?", "What do you think you would miss most about today's world?"],
                    "vocab": {}
                }
            ]
        },
        {
            "title": "Nutrition Myths",
            "image_keywords": "nutrition,food,healthy eating,diet",
            "questions": [
                {
                    "main": "What's the biggest nutrition myth you believed for years before learning the truth?",
                    "subs": ["Has a diet trend ever actually worked for you, or do they all fail eventually?", "Why do you think people are so susceptible to nutrition fads?"],
                    "vocab": {"susceptible": "Easily influenced or harmed by something", "fads": "Intense but short-lived trends"}
                },
                {
                    "main": "Is counting calories a healthy approach to eating, or does it create an unhealthy obsession?",
                    "subs": ["Should restaurants be required to show detailed nutritional information?", "How do you decide what to eat — by taste, health, or convenience?"],
                    "vocab": {"counting calories": "Tracking the energy content of everything you eat", "obsession": "Thinking about something constantly or frequently"}
                },
                {
                    "main": "Do you think supplements are necessary in the modern world, or can you get everything from food?",
                    "subs": ["Have you ever taken a supplement that you felt genuinely made a difference?", "Should the supplement industry be more strictly regulated?"],
                    "vocab": {"supplements": "Products taken to add extra nutrients to your diet", "regulated": "Controlled by rules or laws"}
                },
                {
                    "main": "Is intermittent fasting a revolutionary health strategy or just another passing trend?",
                    "subs": ["Have you ever tried changing the timing of your meals for health reasons?", "Do you think when you eat matters as much as what you eat?"],
                    "vocab": {"intermittent fasting": "An eating pattern that cycles between periods of fasting and eating", "passing": "Temporary; not lasting"}
                },
                {
                    "main": "If you could only eat three foods for the rest of your life, which would you choose?",
                    "subs": ["What does this choice tell you about your relationship with food?", "Is there a food you hated as a child but love now?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **detox diets** and **cleanses** actually remove toxins from your body, or are they a waste of money?",
                    "subs": ["Have you ever tried a detox? What was the result?", "Why do you think detox products are so popular despite lack of scientific evidence?"],
                    "vocab": {"detox diets": "Diets claimed to remove toxins from the body", "toxins": "Poisonous substances", "scientific evidence": "Information gathered through scientific research"}
                },
                {
                    "main": "Should **sugar** be regulated like tobacco because of its health effects?",
                    "subs": ["How much sugar do you consume daily without realizing it?", "Is sugar addiction a real condition or just a lack of willpower?"],
                    "vocab": {"regulated": "Controlled by rules or laws", "willpower": "The ability to control yourself and make yourself do something difficult"}
                },
                {
                    "main": "Is **organic** food actually healthier, or is it just a marketing strategy?",
                    "subs": ["Do you buy organic food? Why or why not?", "Should organic food be more affordable?"],
                    "vocab": {"organic": "Produced without artificial chemicals"}
                },
                {
                    "main": "If a food company paid a nutritionist to say their product was healthy when it wasn't, who should be held responsible?",
                    "subs": ["How do you know if nutrition advice online is trustworthy?", "Should nutritionists be regulated like doctors?"],
                    "vocab": {"nutritionist": "A person who advises on food and nutrition", "trustworthy": "Able to be relied on as honest"}
                },
                {
                    "main": "Do you think **genetically modified** food is safe, or should it be more strictly controlled?",
                    "subs": ["What's the difference between genetically modified food and traditional breeding?", "Should all GM food be clearly labeled?"],
                    "vocab": {"genetically modified": "Food from plants or animals that have been changed using science"}
                },
                {
                    "main": "Is there a traditional food from your culture that is actually incredibly healthy?",
                    "subs": ["Why do you think traditional diets are often healthier than modern ones?", "What traditional food would you recommend to the world?"],
                    "vocab": {}
                },
                {
                    "main": "If you could know the exact nutritional content of everything you ate just by looking at it, would you want that ability?",
                    "subs": ["Would it make you healthier or more anxious?", "Is ignorance sometimes bliss when it comes to food?"],
                    "vocab": {"nutritional content": "The vitamins, minerals, and energy in food", "ignorance": "Not knowing about something", "bliss": "Extreme happiness"}
                },
                {
                    "main": "Should **junk food** advertising be banned, especially when targeted at children?",
                    "subs": ["Is it the parent's responsibility or the company's responsibility to keep children healthy?", "Has advertising ever influenced what you eat?"],
                    "vocab": {"junk food": "Food that is unhealthy but easy and quick to eat"}
                },
                {
                    "main": "If you could eat anything you wanted without any health consequences, what would your diet look like?",
                    "subs": ["What food do you deny yourself because of health concerns?", "Is it worth sacrificing taste for health?"],
                    "vocab": {"consequences": "Results or effects of an action"}
                },
                {
                    "main": "Will **lab-grown meat** — real meat grown in a laboratory — replace traditional farming within your lifetime?",
                    "subs": ["Would you eat lab-grown meat? Why or why not?", "What would be the environmental impact of switching to lab-grown meat?"],
                    "vocab": {"lab-grown meat": "Real meat produced from animal cells in a laboratory"}
                }
            ]
        },
        {
            "title": "Mindfulness & Stress",
            "image_keywords": "mindfulness,stress,meditation,calm",
            "questions": [
                {
                    "main": "Do you think **mindfulness** is a genuine solution to modern stress or just a **buzzword**?",
                    "subs": ["Have you ever practiced mindfulness? Did it help?", "Is it possible to be mindful in a world full of distractions?"],
                    "vocab": {"mindfulness": "The practice of being aware of the present moment", "buzzword": "A word or phrase that becomes very popular for a time", "distractions": "Things that stop you from concentrating"}
                },
                {
                    "main": "If you could eliminate one source of stress from your life forever, what would it be?",
                    "subs": ["How does this stress affect your daily life?", "Is there a healthy way to manage this stress, or does it need to be removed entirely?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **stress** is always harmful, or can it sometimes be a positive force?",
                    "subs": ["When has stress actually helped you perform better?", "Where is the line between healthy pressure and harmful stress?"],
                    "vocab": {}
                },
                {
                    "main": "Should companies be required to provide **stress management** programs for employees?",
                    "subs": ["What stress management technique works best for you?", "Is it the company's responsibility to help employees manage stress, or is that personal?"],
                    "vocab": {"stress management": "Techniques and programs designed to help people deal with stress"}
                },
                {
                    "main": "If you could live one day completely **stress-free**, what would you do?",
                    "subs": ["Is a completely stress-free life even desirable?", "What would you miss about your normal routine?"],
                    "vocab": {"stress-free": "Without any stress or worry", "desirable": "Wanted or wished for because it is attractive"}
                },
                {
                    "main": "Do you think **yoga** and **tai chi** are effective stress relief methods, or are they overrated?",
                    "subs": ["Have you ever tried yoga or tai chi? What was your experience?", "Is there a physical activity that works better for stress relief?"],
                    "vocab": {"overrated": "Regarded as better than it really is"}
                },
                {
                    "main": "Is **nature** the best medicine for stress, or is that just a **cliché**?",
                    "subs": ["Do you feel calmer when you are in nature?", "Should doctors prescribe time in nature as a treatment for stress?"],
                    "vocab": {"cliché": "An idea or phrase that has been used so often it is no longer interesting", "prescribe": "To officially advise the use of a medicine or treatment"}
                },
                {
                    "main": "If you could teach one stress management technique to every person on Earth, what would it be?",
                    "subs": ["Why is this the most effective technique?", "How did you discover it?"],
                    "vocab": {}
                },
                {
                    "main": "Do you think **stress** is more of a problem in modern society than it was in the past, or did previous generations just hide it better?",
                    "subs": ["What did people in the past do to manage stress?", "Is there a historical period you think had less stress than today?"],
                    "vocab": {}
                },
                {
                    "main": "Should **mental health breaks** — short periods during the workday to relax and reset — be mandatory?",
                    "subs": ["How long should a mental health break be?", "Would you actually use these breaks or just keep working?"],
                    "vocab": {"mandatory": "Required by law or rules"}
                },
                {
                    "main": "If you could live in any environment to minimize stress — a quiet village, a busy city, a remote island — where would you choose?",
                    "subs": ["What about that environment would reduce your stress?", "Is your ideal stress-free environment realistic?"],
                    "vocab": {"minimize": "To reduce something to the smallest possible amount"}
                },
                {
                    "main": "Do you think **journaling** — writing down your thoughts and feelings — is an effective way to manage stress?",
                    "subs": ["Have you ever kept a journal? Did it help?", "Is writing about your problems better than talking about them?"],
                    "vocab": {"journaling": "The practice of writing down your thoughts and feelings regularly"}
                },
                {
                    "main": "Is there a **hobby** that completely absorbs your attention and makes you forget about stress?",
                    "subs": ["How did you discover this hobby?", "Should everyone have a stress-relieving hobby?"],
                    "vocab": {"absorbs": "Takes up all of someone's attention"}
                },
                {
                    "main": "If you could give one piece of advice to someone who is constantly stressed, what would it be?",
                    "subs": ["What has helped you the most when you feel overwhelmed?", "Is there a piece of advice you received that changed how you handle stress?"],
                    "vocab": {"overwhelmed": "Feeling unable to cope with too much of something"}
                },
                {
                    "main": "Will future generations be better at managing stress than we are, or will technology create even more stress?",
                    "subs": ["What stress management tools do you think the future will bring?", "Is it possible to eliminate stress entirely, or is it a natural part of being human?"],
                    "vocab": {}
                }
            ]
        }
    ]
}
