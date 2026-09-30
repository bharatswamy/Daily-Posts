import { categories, posts as existingPosts } from "./posts.mjs";

// Additive editorial expansion. Existing content remains in content/posts.mjs;
// this module owns only the 150 articles added in the second publication batch.
const authors = [
  { name: "Maya Desai", role: "Editorial writer" },
  { name: "Arjun Mehta", role: "Contributing editor" },
  { name: "Nisha Kapoor", role: "Research writer" },
  { name: "Rohan Sen", role: "Staff writer" }
];

const imagePool = [
  "photo-1516321318423-f06f85e504b3",
  "photo-1499750310107-5fef28a66643",
  "photo-1451187580459-43490279c0fa",
  "photo-1518770660439-4636190af475",
  "photo-1497366811353-6870744d04b2",
  "photo-1531297484001-80022131f5a1"
];

const groups = {
  technology: [
    ["How Wi-Fi Works: A Friendly Guide to Wireless Connections", "how-wifi-works", "how Wi-Fi works", "how routers, radio channels, devices, and interference work together in an ordinary home network"],
    ["Wi-Fi 6 vs Wi-Fi 7: What the Difference Means at Home", "wifi-6-vs-wifi-7-explained", "Wi-Fi 6 vs Wi-Fi 7", "the practical differences between newer Wi-Fi generations, including compatible devices, congestion, and realistic upgrade questions"],
    ["What Is an Operating System? A Practical Beginner's Explanation", "what-is-an-operating-system", "what is an operating system", "how an operating system coordinates hardware, applications, files, permissions, and the user experience"],
    ["How Smartphone Storage Works and What Uses It", "how-smartphone-storage-works", "how smartphone storage works", "the difference between installed apps, media, temporary files, cloud copies, and the storage number shown on a phone"],
    ["SSD vs HDD for Everyday Use: How to Choose", "ssd-vs-hdd-for-everyday-use", "SSD vs HDD", "the real-world trade-offs between solid-state and hard-disk storage for speed, durability, capacity, and backup"],
    ["How Bluetooth Technology Works Without the Jargon", "how-bluetooth-technology-works", "how Bluetooth works", "how short-range wireless pairing, profiles, power use, and interference shape headphones, keyboards, and other devices"],
    ["What Is IoT and How Does It Work in Daily Life?", "what-is-iot-and-how-does-it-work", "what is IoT", "how connected sensors collect data, communicate with services, and create useful or frustrating smart-device experiences"],
    ["How Screen Refresh Rates Affect Phones and Monitors", "how-screen-refresh-rates-work", "screen refresh rate explained", "what refresh rate changes, what it does not change, and how to judge the feature for reading, work, and games"],
    ["USB-C, USB-A, and Thunderbolt: How Ports and Cables Differ", "usb-c-usb-a-thunderbolt-explained", "USB-C vs USB-A vs Thunderbolt", "why similar-looking ports can have different data, display, charging, and compatibility capabilities"],
    ["How Device Encryption Protects Your Files", "device-encryption-explained", "device encryption explained", "what encryption does on a phone or laptop, what it protects against, and which account and recovery choices still matter"]
  ],
  "ai-chatgpt": [
    ["How Large Language Models Work: A Clear Beginner's Guide", "how-large-language-models-work", "how large language models work", "how training data, tokens, patterns, context, and probability combine to produce language without human-like understanding"],
    ["Prompt Chaining Explained: How to Break Complex AI Work into Steps", "prompt-chaining-for-ai-tasks", "prompt chaining", "how to divide a complex AI task into smaller prompts, review each handoff, and reduce confusing or incomplete output"],
    ["AI Chatbots vs Traditional Search: When Should You Use Each?", "ai-chatbots-vs-traditional-search", "AI chatbots vs search engines", "the different jobs conversational systems and search results perform, including source checking, freshness, and exploration"],
    ["How AI Is Being Used in Education: Benefits and Boundaries", "how-ai-is-used-in-education", "AI in education", "where AI can support explanation, practice, feedback, and accessibility while teachers and learners retain judgment"],
    ["How AI Can Help a Small Business Without Replacing Good Judgment", "ai-for-small-businesses", "AI for small business", "practical low-risk uses for drafting, support, analysis, and operations, plus the checks a small team should keep"],
    ["AI Automation for Everyday Tasks: A Safe Starting Plan", "ai-automation-for-everyday-tasks", "AI automation for everyday tasks", "how to identify repetitive work, choose a human review point, and test an automation before trusting it"],
    ["Common AI Mistakes Users Make and How to Avoid Them", "common-ai-mistakes-to-avoid", "common AI mistakes", "why vague instructions, unchecked facts, sensitive data, and overconfident interpretation create avoidable AI problems"],
    ["How to Verify AI Citations and References Before You Use Them", "how-to-verify-ai-citations", "verify AI citations", "a source-checking workflow for links, quotations, dates, authors, and claims that an AI assistant presents as evidence"],
    ["AI Bias Explained: What It Looks Like in Everyday Outputs", "ai-bias-explained-for-beginners", "AI bias explained", "how data, wording, defaults, and evaluation choices can shape an AI output and what a reader can do about it"],
    ["What Is an AI Context Window and Why Does It Matter?", "ai-context-window-explained", "AI context window", "why an AI assistant may lose track of earlier details, how long inputs are handled, and how to structure a long task"]
  ],
  "software-programming": [
    ["JSON Explained for Beginners: Data That Applications Can Share", "json-explained-for-beginners", "JSON explained", "how JSON represents objects, arrays, values, and nested data, plus the mistakes that break an otherwise simple payload"],
    ["How Version Control Works Before You Learn Git Commands", "how-version-control-works", "how version control works", "the ideas behind snapshots, history, branches, merges, and collaboration that make version control useful"],
    ["Frontend vs Backend Development: What Each Side Does", "frontend-vs-backend-development", "frontend vs backend development", "how browser interfaces, servers, databases, APIs, and deployment fit together in a modern application"],
    ["What Is Backend Development? A Practical Starting Guide", "what-is-backend-development", "what is backend development", "the responsibilities behind a web product, from request handling and data rules to security and observability"],
    ["What Is Database Management? Concepts Every Beginner Should Know", "what-is-database-management", "database management basics", "how databases store, retrieve, protect, and organise information without turning every application into a spreadsheet"],
    ["Common Programming Errors Beginners Make and How to Read Them", "common-programming-errors-beginners-make", "common programming errors", "how syntax, type, logic, state, and environment errors differ and how to investigate the message instead of guessing"],
    ["Package Managers Explained: Dependencies Without the Confusion", "package-managers-explained", "what is a package manager", "how dependency manifests, lockfiles, registries, and updates affect the code that runs on a developer's machine"],
    ["Environment Variables Explained for New Developers", "environment-variables-for-beginners", "environment variables explained", "how configuration travels into an application, what should remain private, and why local and production values differ"],
    ["Semantic Versioning Explained: How Software Versions Communicate Change", "semantic-versioning-explained", "semantic versioning", "how major, minor, and patch versions describe compatibility expectations and where real projects need extra care"],
    ["Code Linting and Formatting: Why Teams Use Both", "code-linting-and-formatting-explained", "code linting and formatting", "the different jobs of style automation and defect detection, plus a humane way to add them to a project"]
  ],
  "digital-marketing-seo": [
    ["How Search Engines Discover Websites: Crawling, Rendering, and Indexing", "how-search-engines-discover-websites", "how search engines discover websites", "the journey from a discovered URL to a rendered, indexed page and the practical signals site owners can improve"],
    ["SEO-Friendly URL Structure: A Practical Guide for New Pages", "seo-friendly-url-structure-guide", "SEO-friendly URL structure", "how clear URLs support readers, sharing, site maintenance, and search understanding without forcing keywords into every path"],
    ["Image SEO Best Practices: Alt Text, Formats, and Context", "image-seo-best-practices", "image SEO best practices", "how filenames, dimensions, formats, alt text, and nearby copy work together for accessible and discoverable images"],
    ["How to Build an SEO Content Strategy Around Real Questions", "how-to-create-an-seo-content-strategy", "SEO content strategy", "how to map audience questions to useful pages, publishing priorities, internal links, and an honest measurement plan"],
    ["Common SEO Mistakes on New Websites and How to Fix Them", "common-seo-mistakes-new-websites", "SEO mistakes on new websites", "the avoidable technical, editorial, and measurement problems that make a new site harder to understand"],
    ["Topical Authority Explained Without the Hype", "topical-authority-explained", "topical authority", "what depth and coverage mean in practice, why topic clusters need useful pages, and how to avoid writing filler"],
    ["What Is Crawl Budget? When Small Websites Need to Care", "crawl-budget-for-small-websites", "crawl budget explained", "what crawl demand and crawl capacity mean, when the concept matters, and which fixes are more useful for a small site"],
    ["How to Audit an SEO Content Brief Before Writing", "how-to-audit-an-seo-content-brief", "SEO content brief audit", "a prewriting review for intent, evidence, headings, internal links, originality, and the reader's next decision"],
    ["Featured Snippets and Direct Answers: How to Write Clearly", "featured-snippet-content-guide", "featured snippet content", "how concise definitions, ordered steps, and useful context can improve answerability without writing for a search box alone"],
    ["SEO Measurement for Beginners: What to Track First", "seo-measurement-for-beginners", "SEO metrics for beginners", "how to combine visibility, clicks, engagement, and business signals without treating one dashboard number as success"]
  ],
  "business-startups": [
    ["How Small Businesses Can Build an Online Presence from Scratch", "small-business-online-presence", "small business online presence", "the essential web, profile, content, and contact foundations that help a small business become easy to find and trust"],
    ["Customer Research for Beginners: Questions That Reveal the Real Problem", "customer-research-for-beginners", "customer research questions", "how to plan conversations, listen for behaviour, and separate a stated preference from an important unmet need"],
    ["How to Create a Simple Business Budget You Can Review Monthly", "simple-business-budget", "simple business budget", "a plain operating view of revenue, fixed costs, variable costs, timing, and decisions a budget can support"],
    ["Digital Tools for Small Businesses: A Practical Selection Guide", "digital-tools-for-small-businesses", "digital tools for small business", "how to choose tools by workflow, ownership, integration, cost, and team adoption instead of collecting subscriptions"],
    ["Common Startup Mistakes That Create Unnecessary Complexity", "common-startup-mistakes", "common startup mistakes", "why unclear customers, premature scaling, weak feedback loops, and too many priorities make young businesses harder to run"],
    ["How to Build a Brand Online Before You Have a Big Audience", "how-to-build-a-brand-online", "build a brand online", "how clarity, voice, proof, consistency, and customer experience create recognition before a business has reach"],
    ["Customer Retention Strategies for Small Businesses", "customer-retention-strategies", "customer retention strategies", "practical ways to make repeat business easier through expectations, follow-up, service recovery, and useful reminders"],
    ["How to Measure Business Growth Beyond Revenue", "how-to-measure-business-growth", "measure business growth", "which operating, customer, cash, and quality signals add context to revenue and help a small team make better decisions"],
    ["Unit Economics for Beginners: Understanding the Shape of a Sale", "unit-economics-for-beginners", "unit economics basics", "how to think about contribution, acquisition effort, repeat behaviour, and costs without pretending a simple formula explains everything"],
    ["Founder-Market Fit Explained: Why Context Matters", "founder-market-fit-explained", "founder-market fit", "how experience, access, curiosity, and operating insight can help a founder understand a market without replacing customer evidence"]
  ],
  "finance-personal-finance": [
    ["Understanding Inflation: What Rising Prices Change in Daily Life", "understanding-inflation-for-beginners", "understanding inflation", "how changing prices affect purchasing power, household planning, comparisons over time, and the way people interpret money"],
    ["How Credit Scores Work: A Beginner's Guide to the Basics", "how-credit-scores-work", "how credit scores work", "the broad factors that can influence credit history, why reports deserve checking, and what responsible habits look like"],
    ["How to Track Monthly Expenses Without Making It a Chore", "how-to-track-monthly-expenses", "track monthly expenses", "a low-friction system for recording spending, spotting patterns, and turning information into a realistic next decision"],
    ["Short-Term vs Long-Term Financial Goals: How to Plan Both", "short-term-vs-long-term-financial-goals", "short-term vs long-term financial goals", "how different time horizons change flexibility, priorities, review frequency, and the kind of uncertainty a plan can tolerate"],
    ["Financial Planning Basics: A Calm Framework for Beginners", "financial-planning-basics", "financial planning basics", "a general framework for cash flow, protection, goals, documents, and periodic reviews without giving personalised investment advice"],
    ["Sinking Funds Explained: Planning for Expenses That Are Not Monthly", "sinking-funds-explained", "sinking funds", "how to prepare gradually for annual, seasonal, or irregular costs so they do not arrive as surprises"],
    ["How to Calculate and Understand Your Net Worth", "how-to-calculate-net-worth", "how to calculate net worth", "what assets and obligations mean in a personal snapshot, how to track the number, and why it is not a score of personal worth"],
    ["How to Organize Financial Documents Safely", "organize-financial-documents", "organize financial documents", "a practical filing system for statements, policies, receipts, tax records, and secure digital backups"],
    ["Insurance Basics for Beginners: Questions to Ask Before Buying", "insurance-basics-for-beginners", "insurance basics", "how coverage, exclusions, deductibles, limits, claims, and policy wording fit together in a general decision process"],
    ["Financial Automation: Which Money Tasks Can Be Made Easier?", "financial-automation-for-beginners", "financial automation", "how reminders, transfers, bill systems, and review dates can reduce missed tasks while keeping human oversight"]
  ],
  education: [
    ["How to Build a Daily Study Routine That Fits Real Life", "how-to-build-a-daily-study-routine", "daily study routine", "how to choose study windows, set a small starting target, protect attention, and review a routine without perfectionism"],
    ["Online Learning vs Classroom Learning: How to Choose the Right Fit", "online-learning-vs-classroom-learning", "online learning vs classroom learning", "the trade-offs in feedback, flexibility, social energy, structure, access, and self-management across learning formats"],
    ["How to Avoid Study Distractions Without Relying on Willpower", "avoid-study-distractions", "avoid study distractions", "how environment, device defaults, task clarity, breaks, and visible progress can make focused study easier"],
    ["How to Prepare for Online Exams: A Practical Checklist", "prepare-for-online-exams", "prepare for online exams", "how to learn the material, understand the platform, test your setup, and make a calm plan for the exam session"],
    ["How to Research a Topic Properly Before Writing About It", "how-to-research-a-topic-properly", "how to research a topic", "a repeatable process for defining a question, finding sources, taking notes, comparing claims, and citing responsibly"],
    ["How to Improve Reading Comprehension with Active Questions", "improve-reading-comprehension", "improve reading comprehension", "how previewing, questioning, summarising, vocabulary notes, and retrieval turn reading into an active learning process"],
    ["How to Build Better Learning Habits One Week at a Time", "build-better-learning-habits", "better learning habits", "how to choose a cue, make practice visible, reduce friction, and review what helped rather than chasing a perfect system"],
    ["Concept Mapping Explained: A Visual Way to Connect Ideas", "concept-mapping-for-students", "concept mapping", "how to turn a topic into connected ideas, relationships, examples, and questions that reveal gaps in understanding"],
    ["How to Use Feedback to Improve Your Next Assignment", "use-feedback-to-improve-learning", "use feedback to improve", "how to sort comments into patterns, choose one revision priority, and turn feedback into a repeatable learning loop"],
    ["Group Study That Works: Roles, Boundaries, and Useful Sessions", "group-study-that-works", "effective group study", "how to make a study group purposeful through a shared goal, preparation, teaching, questions, and a clear ending"]
  ],
  "career-jobs": [
    ["How to Prepare for a Technical Interview Without Memorising Everything", "prepare-for-technical-interviews", "prepare for technical interviews", "how to combine fundamentals, practice, communication, debugging, and reflection for a technical conversation"],
    ["How to Prepare for an HR Interview with Honest, Strong Answers", "prepare-for-hr-interviews", "prepare for HR interviews", "how to understand common themes, choose real examples, explain motivation, and avoid answers that sound rehearsed"],
    ["How to Explain Your Projects Clearly in an Interview", "explain-projects-in-an-interview", "explain projects in interviews", "a story structure for context, decisions, trade-offs, results, and what you learned from a project"],
    ["How to Build a Career Portfolio That Shows Your Thinking", "build-a-career-portfolio", "career portfolio", "how to select work, add context, show process, protect confidential details, and make a portfolio easy to review"],
    ["Skills Employers Look for in Junior Developers", "skills-employers-look-for-in-developers", "skills employers look for in developers", "the practical mix of technical foundations, collaboration, debugging, communication, and learning ability that helps early-career developers"],
    ["How to Prepare for Your First Job: A Practical Checklist", "prepare-for-your-first-job", "prepare for first job", "how to organise documents, expectations, questions, routines, and a learning plan before starting work"],
    ["How to Learn a New Technical Skill While Working Full Time", "learn-a-technical-skill-while-working", "learn technical skills while working", "how to choose a narrow outcome, protect practice time, use projects, and measure progress with limited energy"],
    ["Professional Networking for Beginners Without Feeling Salesy", "professional-networking-for-beginners", "professional networking for beginners", "how to build genuine professional relationships through curiosity, useful follow-up, and small consistent conversations"],
    ["Career Progress Metrics: What to Track Beyond Job Titles", "career-progress-metrics", "career progress metrics", "ways to notice growing scope, capability, trust, evidence, and direction when a promotion is not the only signal"],
    ["How to Write a Professional Email at Work", "professional-email-writing-guide", "professional email writing", "how to make a work email clear through purpose, context, requested action, timing, tone, and a useful subject line"]
  ],
  travel: [
    ["How to Plan a Weekend Trip Without Overpacking the Schedule", "how-to-plan-a-weekend-trip", "plan a weekend trip", "how to choose a base, set an energy-aware rhythm, group nearby activities, and leave room for discovery"],
    ["How to Organize Travel Documents Before You Leave", "organize-travel-documents", "organize travel documents", "a practical system for identity documents, bookings, insurance, emergency contacts, offline copies, and secure access"],
    ["How to Avoid Common Travel Mistakes on Your First Big Trip", "avoid-common-travel-mistakes", "common travel mistakes", "the planning, timing, money, communication, and flexibility mistakes that can turn a manageable trip into a stressful one"],
    ["Tips for First-Time Travelers: A Calm Preparation Guide", "tips-for-first-time-travelers", "first-time travel tips", "how to prepare for transport, accommodation, navigation, local etiquette, and the small uncertainties of a first trip"],
    ["International Travel Checklist: What to Check Before Flying", "international-travel-checklist", "international travel checklist", "a predeparture review of documents, entry rules, money access, health preparation, luggage, and arrival logistics"],
    ["How to Use Public Transport in an Unfamiliar City", "public-transport-in-a-new-city", "public transport in a new city", "how to understand routes, tickets, transfers, safety, accessibility, and backup plans when a city is new to you"],
    ["How to Travel and Work Without Letting the Trip Become a Workday", "travel-and-work-balance", "travel and work balance", "how to set realistic work windows, protect rest, communicate availability, and keep logistics from taking over a trip"],
    ["Family Travel Planning: Making a Trip Work for Different Ages", "family-travel-planning-guide", "family travel planning", "how to plan around energy, meals, movement, interests, safety, and recovery when people in a group need different things"],
    ["How to Handle a Language Barrier While Traveling", "handle-language-barriers-while-traveling", "language barrier travel tips", "respectful tools and habits for communicating clearly when you do not share a strong common language"],
    ["How to Plan a Long Airport Layover", "how-to-plan-a-long-airport-layover", "plan an airport layover", "how to check terminal logistics, time boundaries, rest options, food, connectivity, and the risk of leaving the airport"]
  ],
  lifestyle: [
    ["How to Organize Your Day When Everything Feels Important", "how-to-organize-your-day", "organize your day", "a practical daily planning method for choosing priorities, protecting attention, handling small tasks, and ending with a reset"],
    ["How to Build Better Daily Habits Without Starting Too Big", "build-better-daily-habits", "build better daily habits", "how to attach a small behaviour to a reliable cue, make it easy to begin, and review the system without self-blame"],
    ["Simple Ways to Reduce Screen Time That Do Not Require Deleting Everything", "reduce-screen-time-simply", "reduce screen time", "how to change defaults, create phone-free transitions, replace automatic checking, and keep useful technology available"],
    ["How to Organize a Small Living Space with Less Friction", "organize-a-small-living-space", "organize a small living space", "how to give items a home, reduce visual noise, use vertical space, and design routines that keep order manageable"],
    ["The Benefits of Spending Time Offline: A Practical Reset", "benefits-of-time-offline", "benefits of spending time offline", "what offline time can make visible about attention, rest, creativity, and relationships, with ways to start without making it a performance"],
    ["How to Create a Home Filing System You Will Actually Use", "create-a-home-filing-system", "home filing system", "how to sort important papers, name digital folders, protect sensitive records, and make retrieval easier"],
    ["How to Reduce Decision Fatigue in Everyday Life", "reduce-decision-fatigue", "reduce decision fatigue", "how defaults, routines, limited menus, and clear criteria can preserve energy for choices that deserve thought"],
    ["How to Protect Your Social Energy Without Disappearing", "protect-social-energy", "protect social energy", "how to notice capacity, communicate boundaries, plan recovery, and stay connected in a way that fits your actual week"],
    ["Household Routines for Busy People: Small Systems That Help", "household-routines-for-busy-people", "household routines", "how recurring tasks, shared ownership, visible lists, and reset points can make a home easier to maintain"],
    ["Mindful Shopping: How to Buy More Deliberately", "mindful-shopping-guide", "mindful shopping", "a pause-and-check process for needs, use, cost, maintenance, alternatives, and the difference between wanting and needing"]
  ],
  "health-fitness": [
    ["How to Build a Simple Mobility Routine for Beginners", "simple-mobility-routine-for-beginners", "mobility routine for beginners", "how gentle range-of-motion practice can fit into a day, what to notice, and when to keep the routine comfortably simple"],
    ["Why Warm-Ups Matter Before Exercise", "why-warm-ups-matter", "why warm-ups matter", "what a warm-up is meant to prepare, how to keep it proportional, and how it differs from exhausting exercise"],
    ["How to Balance a Plate: A Beginner's Nutrition Guide", "how-to-balance-a-plate", "how to balance a plate", "a general way to think about variety, energy, protein, fibre, and enjoyment without turning meals into a rigid rulebook"],
    ["Why Fibre Matters and How Beginners Can Add More", "fibre-basics-for-beginners", "fibre basics", "what dietary fibre does in a general sense, where it appears in foods, and how to make gradual changes comfortably"],
    ["How to Build a Fitness Habit That Survives Busy Weeks", "build-a-fitness-habit", "build a fitness habit", "how to create minimum and expanded versions of movement so consistency does not depend on having a perfect schedule"],
    ["Rest Days Explained: How Recovery Fits into Exercise", "rest-days-and-exercise-recovery", "rest days explained", "why recovery belongs in a training routine, what light movement can mean, and which signs suggest reducing intensity"],
    ["How to Choose a Realistic Fitness Goal", "choose-a-realistic-fitness-goal", "realistic fitness goals", "how to define behaviour and process goals, choose a time horizon, and measure progress without chasing dramatic promises"],
    ["Outdoor Activity Ideas for Beginners Who Dislike Gyms", "outdoor-activity-ideas-for-beginners", "outdoor activities for beginners", "ways to make walking, cycling, games, and nature-based movement approachable and easier to repeat"],
    ["How to Recover After a Challenging Workout", "recover-after-a-workout", "workout recovery basics", "general recovery habits involving rest, hydration, food, gentle movement, and attention to how your body responds"],
    ["Fitness Tracking for Beginners: What Is Worth Recording?", "fitness-tracking-for-beginners", "fitness tracking for beginners", "how to choose a small set of useful observations and avoid letting numbers replace how you actually feel"]
  ],
  entertainment: [
    ["How Streaming Changed Entertainment and Audience Habits", "how-streaming-changed-entertainment", "how streaming changed entertainment", "how on-demand libraries changed release patterns, discovery, attention, pricing, and the relationship between audiences and platforms"],
    ["How Movies Are Made: From Idea to Final Cut", "how-movies-are-made", "how movies are made", "the collaborative stages of development, pre-production, filming, editing, sound, distribution, and audience release"],
    ["How Animation Works: The Ideas Behind Moving Images", "how-animation-works", "how animation works", "how frames, timing, design, movement, sound, and digital tools create the feeling of life in an animated work"],
    ["A Short History of Video Games and How They Evolved", "history-of-video-games", "history of video games", "the broad shifts from simple experiments to home consoles, personal computers, online worlds, and mobile play"],
    ["How Video Game Graphics Have Evolved Over Time", "how-video-game-graphics-evolved", "video game graphics evolution", "how hardware, rendering techniques, art direction, performance limits, and player expectations shaped game visuals"],
    ["How Music Streaming Works for Listeners and Artists", "how-music-streaming-works", "how music streaming works", "how catalogues, apps, recommendations, subscriptions, rights, and measurement fit together from a listener's point of view"],
    ["How Film Genres Developed and Why They Keep Changing", "how-film-genres-developed", "film genres explained", "how audiences, conventions, technology, culture, and creators shape genres that are useful but never completely fixed"],
    ["How Podcasts Became Popular: The Format's Long Development", "how-podcasts-became-popular", "how podcasts became popular", "the technical, cultural, distribution, and creator changes that helped spoken audio become easy to make and follow"],
    ["How Digital Creators Build Audiences Without Losing Trust", "how-digital-creators-build-audiences", "how digital creators build audiences", "the role of consistency, a clear promise, community, formats, feedback, and responsible monetisation"],
    ["How Entertainment Trends Spread Online", "how-entertainment-trends-spread", "entertainment trends online", "how clips, recommendations, communities, commentary, and platform mechanics turn a moment into a wider cultural conversation"]
  ],
  "how-to-guides": [
    ["How to Create a Strong Password You Can Manage", "how-to-create-a-strong-password", "how to create a strong password", "how to create unique account credentials, use a password manager when appropriate, and plan for recovery without sharing secrets"],
    ["How to Back Up Important Files: A Beginner's 3-2-1 Guide", "how-to-back-up-important-files", "how to back up important files", "how to identify irreplaceable data, choose copies and locations, test restoration, and make backups part of a routine"],
    ["How to Clean Up an Email Inbox Without Losing Important Messages", "how-to-clean-up-email-inbox", "clean up email inbox", "a safe sequence for archiving, searching, unsubscribing, filtering, naming labels, and keeping future mail manageable"],
    ["How to Protect Online Accounts with a Simple Security Routine", "protect-online-accounts", "protect online accounts", "the account habits that matter most, from unique credentials and updates to recovery details and sign-in alerts"],
    ["How to Check Website Performance Before You Try to Fix It", "how-to-check-website-performance", "check website performance", "how to gather page, device, network, and user experience evidence before changing code or adding another optimisation"],
    ["How to Build a Personal Productivity System That Stays Flexible", "personal-productivity-system", "personal productivity system", "how to capture tasks, choose priorities, schedule focus, review commitments, and adapt the system to changing weeks"],
    ["How to Troubleshoot Common Website Problems Step by Step", "troubleshoot-common-website-problems", "troubleshoot website problems", "a method for narrowing down browser, network, code, content, and deployment issues instead of changing everything at once"],
    ["How to Create a Content Calendar You Can Actually Maintain", "create-a-maintainable-content-calendar", "content calendar", "how to connect audience questions, formats, owners, production time, publishing dates, and review notes in one manageable plan"],
    ["How to Make a Simple Screen Recording for Clear Instructions", "how-to-make-a-screen-recording", "make a screen recording guide", "how to define the task, prepare the screen, narrate clearly, protect private information, and share a useful recording"],
    ["How to Turn a Repeated Task into a Written Process", "turn-repeated-task-into-process", "document a repeated process", "how to observe a task, record decisions, add checks, test instructions with another person, and improve the document"]
  ],
  "daily-news-updates": [
    ["How to Read Technology News with More Context", "read-technology-news-with-context", "read technology news", "a practical way to distinguish a product announcement, a research result, a company claim, and a change readers can actually experience"],
    ["How Newsrooms Corroborate Information Before Publishing", "how-newsrooms-corroborate-information", "how newsrooms verify information", "the roles of sources, documents, direct observation, attribution, editing, and uncertainty in responsible reporting"],
    ["How Public Records Help Explain the News", "how-public-records-explain-news", "public records in news", "how filings, minutes, court documents, data releases, and official records add evidence and limits to a public story"],
    ["How to Reconstruct the Timeline of a Developing Story", "reconstruct-a-developing-news-timeline", "reconstruct a news timeline", "how to sort timestamps, original statements, updates, corrections, and independent evidence when a story changes quickly"],
    ["News Report vs Analysis: How to Tell What You Are Reading", "news-report-vs-analysis", "news report vs analysis", "the differences in purpose, evidence, interpretation, language, and editorial framing between reporting and analysis"],
    ["How Source Attribution Makes a News Story More Trustworthy", "source-attribution-in-news", "source attribution in news", "why naming the origin, limits, and distance of information helps readers judge a claim without pretending certainty"],
    ["How Online News Corrections Work and Why They Matter", "how-online-news-corrections-work", "online news corrections", "how corrections, updates, editor notes, and version changes help a publication repair the public record"],
    ["Why Local News Can Be Hard to Find Online", "why-local-news-is-hard-to-find", "finding local news online", "the economics, distribution, search, community reporting, and practical discovery habits behind local information"],
    ["How to Set News Alerts Without Creating Constant Anxiety", "set-news-alerts-without-noise", "set useful news alerts", "how to choose topics, sources, timing, and review windows so alerts inform a routine instead of interrupting every hour"],
    ["Media Literacy Questions to Ask Before Believing a Claim", "media-literacy-questions-for-news", "media literacy questions", "a short set of questions about source, evidence, wording, timing, incentives, and what remains unknown"]
  ],
  "trending-topics": [
    ["The Life Cycle of an Internet Trend: From Spark to Fading Attention", "internet-trend-life-cycle", "internet trend life cycle", "how a topic is introduced, repeated, remixed, measured, commercialised, and eventually replaced or absorbed"],
    ["How Recommendation Feeds Help Online Trends Travel", "recommendation-feeds-and-trends", "recommendation feeds and trends", "how ranking systems, engagement signals, communities, and repeated exposure can make a topic feel suddenly everywhere"],
    ["Why Audio Trends Spread So Quickly on Social Platforms", "why-audio-trends-spread", "why audio trends spread", "how reusable sound, short formats, imitation, attribution, and platform discovery create a shared online language"],
    ["Regional Internet Trends: Why Popularity Can Look Different by Place", "regional-internet-trends", "regional internet trends", "how language, culture, access, time zones, communities, and platform habits shape what becomes visible"],
    ["Trendjacking for Brands: When Joining a Conversation Makes Sense", "trendjacking-for-brands", "trendjacking for brands", "how a business can assess relevance, timing, tone, risk, and value before attaching itself to a fast-moving topic"],
    ["How to Read a Trend Report Without Treating It as a Prediction", "how-to-read-a-trend-report", "how to read trend reports", "how to examine definitions, evidence, sample limits, time horizon, incentives, and uncertainty in trend research"],
    ["Bots, Repetition, and Online Trends: What Amplification Can Hide", "bots-and-online-trend-amplification", "online trend amplification", "why visible volume is not always the same as broad human interest and which signals deserve a closer look"],
    ["Why Nostalgia Cycles Keep Returning Online", "why-nostalgia-trends-return", "nostalgia trends online", "how memory, identity, remix culture, new audiences, and platform formats bring older ideas back into public attention"],
    ["Search Breakout Terms: How New Queries Reveal Changing Interest", "search-breakout-terms-explained", "search breakout terms", "how emerging queries differ from established demand and how to interpret sudden search interest carefully"],
    ["Trend Fatigue: Why People Stop Caring About Viral Topics", "trend-fatigue-explained", "trend fatigue", "how repetition, commercial pressure, attention limits, and changing novelty can turn a shared trend into background noise"]
  ]
};

const categoryContexts = {
  technology: "Technology becomes useful when it solves a real problem and stays understandable after the excitement fades.",
  "ai-chatgpt": "AI tools can expand what a person tries, but the quality of the result still depends on context, checking, and human judgment.",
  "software-programming": "Software ideas become easier to use when their boundaries, failure modes, and maintenance costs are made visible.",
  "digital-marketing-seo": "Sustainable discovery starts with a useful page, a clear reader question, and evidence that the page deserves attention.",
  "business-startups": "Good business decisions connect a real customer problem with a repeatable way to create and deliver value.",
  "finance-personal-finance": "Personal finance is easier to understand when a general framework separates facts, choices, uncertainty, and professional advice.",
  education: "Learning improves when the method makes thinking visible, gives feedback early, and fits the learner's actual constraints.",
  "career-jobs": "Career progress is built from evidence of useful work, clear communication, and a willingness to keep learning.",
  travel: "Thoughtful travel balances preparation with flexibility, so logistics support the experience instead of becoming the experience.",
  lifestyle: "Small lifestyle systems work best when they reduce friction rather than turning ordinary life into a permanent improvement project.",
  "health-fitness": "General health guidance should support informed choices, gradual habits, and attention to individual needs without pretending to diagnose.",
  entertainment: "Entertainment becomes richer when the format, history, craft, and audience context are part of the way we enjoy it.",
  "how-to-guides": "A useful how-to guide makes the next action obvious, names the important checks, and leaves the reader more capable than before.",
  "daily-news-updates": "A calmer news habit values evidence, context, attribution, and the difference between what is known and what is still developing.",
  "trending-topics": "Online attention can move quickly, but a trend becomes understandable only when its sources, incentives, audience, and limits are visible."
};

function paragraph(title, focus, context, sentence) {
  return `${sentence} In the case of ${title.toLowerCase()}, that means keeping the focus on ${focus}. ${context}`;
}

function makeExplainer(title, keyword, focus, context) {
  return [
    { type: "paragraph", text: `${title} is for readers who want a grounded explanation instead of a definition copied from a glossary. The useful starting point is to connect the topic to an ordinary decision: what are you trying to understand, what changes because of it, and which details can safely wait?` },
    { type: "heading", level: 2, text: `What ${keyword} means in practice` },
    { type: "paragraph", text: paragraph(title, focus, context, `The phrase ${keyword} can sound more technical than it needs to be. Begin by separating the visible experience from the system underneath it. A reader may notice a result first, while the important explanation lives in the steps, trade-offs, and assumptions that produced that result.`) },
    { type: "heading", level: 2, text: "The main parts to understand" },
    { type: "list", items: [`Start with the outcome a person can observe, not the jargon used to describe it.`, `Identify the people, tools, information, or decisions that make the outcome possible.`, `Notice where timing, quality, privacy, cost, or reliability can change the experience.`, `Keep a short list of terms that deserve a more specific follow-up question.`] },
    { type: "heading", level: 2, text: "How the process usually works" },
    { type: "paragraph", text: `A reliable explanation follows the path from input to decision to result. First, describe what enters the system or situation. Next, explain the transformation, judgement, or exchange that takes place. Finally, show what the reader receives and what can still go wrong. This sequence is more useful than a collection of isolated facts because it helps a reader predict the next step.` },
    { type: "heading", level: 3, text: "A small example" },
    { type: "paragraph", text: `Imagine a person encountering ${keyword} for the first time during a normal week. They have a limited amount of time, incomplete information, and a practical goal. The best approach is not to learn every related feature. It is to identify one decision, try the smallest responsible version, and record what the experience teaches. That example also reveals whether advice is genuinely usable or merely impressive.` },
    { type: "heading", level: 2, text: "Trade-offs and limits" },
    { type: "paragraph", text: `Every useful system has boundaries. A faster option may cost more, a convenient option may expose more information, and a flexible option may require more attention. Do not treat a benefit as universal. Ask who benefits, under which conditions, and what maintenance the choice creates later. If the topic affects money, health, privacy, or important work, verify the details against current primary information before acting.` },
    { type: "callout", tone: "accent", text: "A good first explanation should help you make one better decision, not make you feel obligated to master the entire subject." },
    { type: "heading", level: 2, text: "A practical way to get started" },
    { type: "paragraph", text: `Write the situation in one sentence, define the result you want, and choose a low-risk example. Gather only the information needed for that example. Afterward, note what was easy, what was unclear, and which assumption mattered most. This creates a feedback loop: each attempt improves your question, your vocabulary, and your next choice.` },
    { type: "heading", level: 2, text: "Common misunderstandings" },
    { type: "paragraph", text: `Beginners often assume that a familiar label guarantees the same behaviour everywhere. They may also confuse a feature with a benefit, a correlation with a cause, or a confident explanation with verified evidence. Slow down when a claim sounds absolute. Look for the conditions behind it, compare more than one trustworthy source, and prefer an explanation that names uncertainty rather than hiding it.` },
    { type: "heading", level: 2, text: "Questions worth asking next" },
    { type: "list", items: [`What problem is this supposed to solve?`, `What would a useful result look like in my situation?`, `Which detail is most likely to change the decision?`, `How will I check whether the approach worked?`] },
    { type: "heading", level: 2, text: "The takeaway" },
    { type: "paragraph", text: `Understanding ${keyword} is less about memorising a perfect definition and more about seeing the relationship between choices, constraints, and outcomes. Start small, keep the context visible, check important claims, and revisit the decision when new evidence appears. That approach stays useful even as tools and terminology change.` }
  ];
}

function makeWorkflow(title, keyword, focus, context) {
  return [
    { type: "paragraph", text: `${title} works best as a repeatable process rather than a one-time burst of effort. This guide turns ${focus} into a sequence with a clear start, a few deliberate checks, and a review point. You do not need a perfect setup; you need enough structure to learn from the next attempt.` },
    { type: "heading", level: 2, text: "Start by defining the outcome" },
    { type: "paragraph", text: `Before touching a tool or collecting advice, describe what should be different when the work is finished. A useful outcome is specific enough to observe and modest enough to reach. For ${keyword}, write down the audience, time available, quality bar, and any boundary that cannot be crossed. ${context}` },
    { type: "heading", level: 2, text: "The preparation step" },
    { type: "list", items: [`Collect the information or materials that the first step actually needs.`, `Remove choices that are outside the current goal.`, `Choose a place to record decisions and questions.`, `Set a review time before you begin so the process does not run forever.`] },
    { type: "heading", level: 2, text: "A step-by-step workflow" },
    { type: "paragraph", text: `First, make a small version of the task visible. Second, complete one pass without trying to optimise every detail. Third, pause and check the result against the outcome you wrote down. Fourth, improve the one part that created the most friction. Fifth, repeat only if the next pass is likely to teach you something. This order protects momentum while keeping quality and safety in view.` },
    { type: "heading", level: 3, text: "Where to add a checkpoint" },
    { type: "paragraph", text: `The best checkpoint is close to the decision it is meant to protect. Check inputs before they create downstream confusion, verify claims before publishing them, and test a change before applying it widely. A checkpoint should be short enough to use consistently: a question, a comparison, a preview, or a small restore test is often better than a long ceremony no one repeats.` },
    { type: "heading", level: 2, text: "What to do when the plan breaks" },
    { type: "paragraph", text: `A broken workflow is information. Ask whether the goal was unclear, the first step too large, a dependency missing, or a hidden assumption wrong. Avoid changing five variables at once. Make the smallest adjustment that isolates the problem, write down what happened, and decide whether to continue, simplify, or stop. That habit makes the next attempt calmer and more explainable.` },
    { type: "callout", tone: "muted", text: "Use the first pass to learn where the friction is. Use the second pass to remove one piece of it." },
    { type: "heading", level: 2, text: "A review that takes ten minutes" },
    { type: "paragraph", text: `At the end, record three things: what moved the work forward, what consumed attention without helping, and what you would explain to another person. Then decide on one change for the next cycle. The review is not a self-criticism exercise. It is how a useful method becomes more realistic as your tools, time, and responsibilities change.` },
    { type: "heading", level: 2, text: "Mistakes to avoid" },
    { type: "list", items: [`Starting before the desired result is clear.`, `Adding tools before understanding the bottleneck.`, `Skipping the checkpoint because the first attempt looks plausible.`, `Treating a temporary result as proof that the entire method is reliable.`] },
    { type: "heading", level: 2, text: "A repeatable checklist" },
    { type: "paragraph", text: `Write the goal, prepare the smallest input, complete one pass, check the result, note the friction, and choose one improvement. For consequential decisions, add a source check or a qualified review. For everyday work, keep the loop light enough that you can use it again next week. ${context}` },
    { type: "heading", level: 2, text: "The takeaway" },
    { type: "paragraph", text: `A dependable approach to ${keyword} is built through small, observable cycles. Define the result, protect the important boundary, test a manageable version, and review what it taught you. The process becomes more valuable as it becomes easier to repeat.` }
  ];
}

function makeComparison(title, keyword, focus, context) {
  return [
    { type: "paragraph", text: `Comparisons are useful only when they help with a real choice. ${title} looks beyond a feature list and asks which option fits which situation, what each one makes easier, and what each one asks you to maintain. The answer can be different for two people with different constraints.` },
    { type: "heading", level: 2, text: "The decision behind the comparison" },
    { type: "paragraph", text: `Start with the job you need done. In ${keyword}, that job may involve speed, control, flexibility, comfort, reliability, cost, or learning effort. Write the two or three criteria that matter most before reading reviews. Otherwise, the loudest feature will quietly become the decision. ${context}` },
    { type: "heading", level: 2, text: "Compare the dimensions that change the experience" },
    { type: "list", items: [`Capability: what can each option actually do?`, `Friction: what does it take to learn, set up, or maintain?`, `Fit: how well does it match the situation, scale, and people involved?`, `Risk: what happens when the option fails, changes price, or becomes unavailable?`] },
    { type: "heading", level: 2, text: "Where option one tends to fit" },
    { type: "paragraph", text: `The first approach is usually attractive when its main strength matches the most important constraint. It may be easier to start, more familiar, more portable, or better suited to a particular kind of workload. Do not describe that strength as a universal win. Name the condition that makes it valuable and the point where its advantage starts to weaken.` },
    { type: "heading", level: 2, text: "Where option two tends to fit" },
    { type: "paragraph", text: `The second approach may earn its place through a different trade-off: deeper control, stronger capacity, greater convenience, or a better long-term fit. That benefit can come with extra setup, cost, or responsibility. A useful comparison gives the reader enough context to recognise that exchange instead of presenting a winner with no assumptions.` },
    { type: "heading", level: 2, text: "A simple decision path" },
    { type: "paragraph", text: `If your priority is the clearest first step, favour the option with lower friction. If your priority is a specific capability, check that the capability works in your exact environment. If the decision is hard to reverse, prefer a small trial or a portable format before committing. For ${focus}, the best choice is the one whose trade-offs you can actually live with.` },
    { type: "callout", tone: "accent", text: "The right comparison does not remove every trade-off; it helps you choose the trade-off you understand." },
    { type: "heading", level: 2, text: "Mistakes that make comparisons misleading" },
    { type: "paragraph", text: `A comparison becomes unreliable when it uses different conditions for each option, ignores maintenance, treats a temporary price as permanent, or copies a benchmark without explaining the workload. It is also easy to mistake popularity for suitability. Keep the question narrow, state the conditions, and revisit the choice if the situation changes.` },
    { type: "heading", level: 2, text: "Questions to answer before deciding" },
    { type: "list", items: [`What is the actual job to be done?`, `Which two criteria matter more than all the others?`, `What is the cost of switching later?`, `Can I test the uncertain part before committing?`] },
    { type: "heading", level: 2, text: "The takeaway" },
    { type: "paragraph", text: `There is no useful winner without a context. Compare the options against a real task, include the hidden work, test the most uncertain assumption, and choose the approach that fits your constraints. That makes ${keyword} a decision aid rather than a debate.` }
  ];
}

function makeChecklist(title, keyword, focus, context) {
  return [
    { type: "paragraph", text: `${title} is easier when the work is divided into checks you can complete and revisit. This checklist is not meant to create anxiety or make a simple task ceremonial. It helps you protect the details that are easy to forget while keeping ${focus} manageable.` },
    { type: "heading", level: 2, text: "Before you begin" },
    { type: "paragraph", text: `Clarify the outcome, the person who will use it, the time available, and the risk of getting it wrong. For ${keyword}, also decide which information must be current and which part can remain flexible. A clear boundary prevents a useful checklist from becoming an endless research project. ${context}` },
    { type: "heading", level: 2, text: "The essential checks" },
    { type: "list", items: [`Is the goal written in plain language?`, `Are the important inputs available and trustworthy?`, `Has the highest-risk assumption been checked first?`, `Is there a backup, recovery, or communication plan if the first attempt fails?`, `Does the final result match the reader's or user's actual need?`] },
    { type: "heading", level: 2, text: "Work through the list in the right order" },
    { type: "paragraph", text: `Start with checks that can invalidate everything else. Then confirm the parts that affect quality, convenience, or polish. Finish with a short review that asks whether the result is understandable to someone who was not present during the work. Sequencing matters: a perfect final format cannot rescue an incorrect input or an unclear purpose.` },
    { type: "heading", level: 3, text: "What deserves a second look" },
    { type: "paragraph", text: `Give extra attention to dates, names, permissions, numbers, links, privacy, and assumptions that came from memory. If another person depends on the result, ask them to follow one part of the process or preview the outcome. A short second look catches a different class of errors than the person who assembled everything sees alone.` },
    { type: "heading", level: 2, text: "Red flags" },
    { type: "paragraph", text: `Pause when a task depends on an unverified claim, a missing document, a rushed decision, or a result that cannot be undone easily. Red flags do not always mean stop forever. They mean narrow the claim, gather better evidence, ask for help, or run a lower-risk trial. This is especially important when the topic touches health, money, security, or another person's privacy.` },
    { type: "callout", tone: "accent", text: "A checklist is a memory aid, not a substitute for judgement. Use it to make judgement more consistent." },
    { type: "heading", level: 2, text: "After the task" },
    { type: "paragraph", text: `Save the useful version, record what changed, and note which check caught or prevented a problem. Remove steps that never help and add a step when a real mistake teaches you something. A checklist earns its place by becoming shorter, clearer, and more specific over time.` },
    { type: "heading", level: 2, text: "A compact version to remember" },
    { type: "list", items: [`Define the outcome.`, `Check the highest-risk input.`, `Complete the work in a visible sequence.`, `Review the result with fresh eyes.`, `Record the one improvement for next time.`] },
    { type: "heading", level: 2, text: "The takeaway" },
    { type: "paragraph", text: `The purpose of ${keyword} is not to make every task complicated. It is to protect attention for the details that matter, make the next action obvious, and create a record you can improve. Keep the list practical enough to use on an ordinary day.` }
  ];
}

function makePerspective(title, keyword, focus, context) {
  return [
    { type: "paragraph", text: `${title} sits inside a larger change in how people work, learn, spend time, or make sense of information. Looking at the topic carefully does not require predicting the future. It requires noticing what changed, who benefits, what became harder, and which claims still need evidence.` },
    { type: "heading", level: 2, text: "Why this topic is getting attention" },
    { type: "paragraph", text: `Interest in ${keyword} often grows when a visible tool or behaviour meets a deeper change in cost, access, culture, or expectation. The headline may focus on novelty, but the practical question is more useful: what is different for an ordinary person trying to make a decision? ${context}` },
    { type: "heading", level: 2, text: "The context people often miss" },
    { type: "paragraph", text: `New developments rarely arrive on an empty stage. They build on older systems, habits, business models, and communities. That context explains why adoption can be uneven and why the same change feels helpful to one group and disruptive to another. Avoid treating a visible example as proof that everyone is experiencing the same thing.` },
    { type: "heading", level: 2, text: "What changes for everyday users" },
    { type: "list", items: [`Some tasks may become faster or easier to start.`, `New choices may create more comparison and maintenance work.`, `Old skills may remain valuable even when the tools change.`, `Trust, privacy, access, and cost can matter as much as convenience.`] },
    { type: "heading", level: 2, text: "The useful opportunity" },
    { type: "paragraph", text: `The opportunity is usually smaller and more specific than the broadest claim. A person may gain a clearer way to compare options, reach an audience, practise a skill, or reduce repeated work. Start with that concrete use. Define how you would know it helped, and keep a boundary around what you are not asking the tool, trend, or system to do.` },
    { type: "heading", level: 2, text: "The risk of following the excitement" },
    { type: "paragraph", text: `Attention can make a development appear more settled than it is. Numbers may measure exposure rather than impact, early adopters may not represent the wider audience, and incentives can shape what gets repeated. Check the original source, the time period, the definition being used, and the interests of the person making the claim.` },
    { type: "callout", tone: "muted", text: "Curiosity is useful when it leads to a better question, not when it turns every new signal into a conclusion." },
    { type: "heading", level: 2, text: "A sensible way to respond" },
    { type: "paragraph", text: `Choose a small observation or experiment that fits your situation. Speak with the people affected, compare the result with the previous way of working, and write down what remains uncertain. If the change affects important decisions, use current primary sources and qualified advice where appropriate. ${context}` },
    { type: "heading", level: 2, text: "Questions for a clearer view" },
    { type: "list", items: [`What evidence would show that this matters beyond attention?`, `Who is missing from the visible conversation?`, `What costs or responsibilities sit behind the benefit?`, `What should remain human, reviewable, or reversible?`] },
    { type: "heading", level: 2, text: "The takeaway" },
    { type: "paragraph", text: `A balanced view of ${keyword} holds two ideas together: change can create a useful opening, and the surrounding conditions still matter. Look for the specific task, the real evidence, the hidden trade-off, and the next responsible step. That is enough to stay informed without becoming reactive.` }
  ];
}

function makeReaderNote(title, focus, context) {
  return {
    type: "paragraph",
    text: `A useful way to carry this topic into real life is to write down the decision you are actually facing, the information you already have, and the one unknown that could change your mind. Then choose an action that is easy to review rather than a commitment that is difficult to undo. For ${title.toLowerCase()}, that might mean comparing two examples, testing a small workflow, asking a more experienced person a specific question, or setting a reminder to check the result later. Keep the notes plain: what happened, what helped, what created friction, and what you will change next. This makes ${focus} concrete instead of turning it into another abstract idea. A short written record also makes it easier to explain the result to someone else later. ${context}`
  };
}

function makeDeeperContext(title, keyword, focus, context) {
  return [
    { type: "heading", level: 2, text: "A closer look at the real-world choice" },
    { type: "paragraph", text: `The most useful test is to place ${keyword} inside a normal situation rather than an ideal one. Imagine that the reader has limited time, a modest budget, an existing routine, and one other person who needs to understand the result. The first question is not which option sounds most advanced. It is whether the approach makes the next decision clearer without creating a new problem that is harder to see. For ${title.toLowerCase()}, compare the before-and-after experience: what information was available, what action became easier, which step still needed judgement, and what would happen if the tool, source, or plan changed tomorrow. This is where ${focus} becomes practical. Notice the small details that are easy to hide in a general recommendation: setup time, handoffs, maintenance, access, and the point at which a person should stop and ask for more help. Keep a short record of the result so the next decision is based on experience rather than memory. ${context}` },
    { type: "heading", level: 2, text: "How to explain the idea to someone else" },
    { type: "paragraph", text: `A strong explanation can survive a short conversation. Begin with the problem, describe the mechanism in ordinary language, give one concrete example, and name the most important limitation. Avoid promising that ${keyword} will work identically for everyone. Invite the other person to ask what evidence supports the claim, what assumptions sit behind the recommendation, and what a safe first experiment would look like. If the subject affects a decision with serious consequences, make the boundary explicit: general education can improve a question, but current primary information and qualified advice may still be necessary. Teaching the idea this way reveals gaps in your own understanding and makes the article useful beyond the first reading.` }
  ];
}

function makeFaq(title, keyword, focus, context) {
  return [
    { type: "heading", level: 2, text: "Frequently Asked Questions" },
    { type: "heading", level: 3, text: `What should a beginner understand first about ${keyword}?` },
    { type: "paragraph", text: `Start with the purpose and the practical boundary. A beginner does not need every advanced detail on day one; they need to know what problem ${keyword} addresses, what a sensible first example looks like, and which claim deserves verification. For ${title.toLowerCase()}, begin with one clear question and keep the first experiment easy to review.` },
    { type: "heading", level: 3, text: `What is the most common mistake with ${keyword}?` },
    { type: "paragraph", text: `The most common mistake is usually treating a general recommendation as universal. Context changes the right choice, especially when ${focus} involves time, cost, privacy, safety, or another person's needs. Check the assumptions, use a small example, and avoid expanding the plan until the first result is understood. ${context}` },
    { type: "heading", level: 3, text: `How can someone keep learning about ${keyword}?` },
    { type: "paragraph", text: `Keep a short record of questions, results, and sources that changed your understanding. Revisit important details when tools, policies, prices, or evidence change. The goal is not to follow every update; it is to maintain enough context to make the next decision responsibly and explain it clearly to someone else.` }
  ];
}

const builders = [makeExplainer, makeWorkflow, makeComparison, makeChecklist, makePerspective];
const posts = [];
let index = 0;

for (const [categorySlug, seeds] of Object.entries(groups)) {
  for (const [title, slug, keyword, focus] of seeds) {
    const category = categories.find((item) => item.slug === categorySlug);
    const builder = builders[index % builders.length];
    const excerpt = `${title} explains the important context, practical choices, and common mistakes so readers can make a more informed next step.`;
    const post = {
      slug,
      categorySlug,
      title,
      excerpt,
      searchIntent: "Informational",
      author: authors[index % authors.length],
      publishedAt: `2026-10-${String((index % 25) + 1).padStart(2, "0")}`,
      updatedAt: "2026-10-01",
      seo: {
        metaTitle: `${title} | DailyTransPosts`,
        metaDescription: excerpt,
        primaryKeyword: keyword,
        secondaryKeywords: [category.name.toLowerCase(), `${keyword} guide`, "practical tips", "beginner explanation"]
      },
      image: {
        src: `https://images.unsplash.com/${imagePool[index % imagePool.length]}?auto=format&fit=crop&w=1400&q=82`,
        alt: `${title} editorial illustration`,
        width: 1400,
        height: 900
      },
      body: [
        ...builder(title, keyword, focus, categoryContexts[categorySlug]),
        { type: "heading", level: 2, text: "A practical note for the reader" },
        makeReaderNote(title, focus, categoryContexts[categorySlug]),
        ...makeDeeperContext(title, keyword, focus, categoryContexts[categorySlug]),
        ...makeFaq(title, keyword, focus, categoryContexts[categorySlug])
      ],
      relatedSlugs: []
    };
    posts.push(post);
    index += 1;
  }
}

for (const post of posts) {
  const sameCategory = posts.filter((candidate) => candidate.categorySlug === post.categorySlug && candidate.slug !== post.slug);
  const existingRelated = existingPosts.filter((candidate) => candidate.categorySlug === post.categorySlug).slice(0, 1).map((candidate) => candidate.slug);
  post.relatedSlugs = [...sameCategory.slice(0, 2).map((candidate) => candidate.slug), ...existingRelated];
}

export { categories, posts };
