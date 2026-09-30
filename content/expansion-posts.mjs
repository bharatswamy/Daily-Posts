import { categories as baseCategories, posts as existingPosts } from "./posts.mjs";
import { posts as firstExpansion } from "./new-posts.mjs";

const authors = [
  { name: "Maya Desai", role: "Editorial writer" },
  { name: "Arjun Mehta", role: "Contributing editor" },
  { name: "Nisha Kapoor", role: "Research writer" },
  { name: "Rohan Sen", role: "Staff writer" }
];

const extraCategories = [
  ["Cybersecurity & Privacy", "cybersecurity-privacy", "Practical guidance for protecting accounts, devices, data, and personal choices in a connected world."],
  ["Productivity & Remote Work", "productivity-remote-work", "Thoughtful systems for focused work, flexible teams, better communication, and sustainable routines."],
  ["Science & Environment", "science-environment", "Clear explanations of science, climate, energy, and environmental decisions that affect everyday life."],
  ["Apps & Digital Tools", "apps-digital-tools", "Useful ways to choose, combine, and manage everyday apps without letting tools create more work." ]
].map(([name, slug, description]) => ({ name, slug, description, seoTitle: `${name}: Practical Guides | DailyTransPosts`, seoDescription: description }));

const categories = [...baseCategories, ...extraCategories];

const groups = {
  "cybersecurity-privacy": [
    ["How to Recognize a Phishing Email Before You Click", "recognize-a-phishing-email", "recognize a phishing email", "sender identity, urgency, links, attachments, requests, and the safe actions to take when a message feels wrong"],
    ["Public Wi-Fi Safety: What to Do Before Connecting", "public-wifi-safety-guide", "public Wi-Fi safety", "network names, updates, sensitive activity, encrypted connections, device sharing, and what a safer travel routine looks like"],
    ["How to Protect Your Phone from Malware and Suspicious Apps", "protect-phone-from-malware", "protect phone from malware", "official app stores, permissions, updates, warning signs, backups, and the limits of mobile security tools"],
    ["End-to-End Encryption Explained for Everyday Users", "end-to-end-encryption-explained", "end-to-end encryption", "what is protected in transit, who can access content, where encryption ends, and which account choices still matter"],
    ["VPN vs Proxy: What Is the Difference and When Does It Matter?", "vpn-vs-proxy-explained", "VPN vs proxy", "how traffic routing, privacy, speed, trust, and use cases differ without promising that either tool makes a person anonymous"],
    ["Social Media Privacy Settings: A Practical Review Checklist", "social-media-privacy-settings", "social media privacy settings", "profile visibility, tagging, location, contact syncing, advertising preferences, old posts, and account recovery"],
    ["How Data Breaches Affect Users and What to Do Next", "what-to-do-after-a-data-breach", "what to do after a data breach", "how to understand a breach notice, change the right credentials, monitor accounts, and avoid follow-up scams"],
    ["Security Keys Explained: Are They Useful for Personal Accounts?", "security-keys-for-personal-accounts", "security keys", "how hardware authentication works, where it helps, recovery planning, compatibility, and when another method may be more practical"],
    ["App Permissions Explained: Which Access Should You Allow?", "app-permissions-explained", "app permissions explained", "camera, microphone, contacts, location, files, background activity, and how to review permissions over time"],
    ["Browser Tracking Explained: Cookies, Pixels, and Fingerprints", "browser-tracking-explained", "browser tracking explained", "the different ways websites recognise a browser, what controls can limit tracking, and why no single setting does everything"],
    ["How to Create a Privacy-Conscious Backup Plan", "privacy-conscious-backup-plan", "private backup plan", "backup copies, encryption, recovery access, cloud choices, local storage, and the practical test that proves a backup works"],
    ["Why Software Updates Matter for Account and Device Security", "why-software-updates-matter", "why software updates matter", "security fixes, support windows, update habits, compatibility checks, and how to make updates less disruptive"]
  ],
  "productivity-remote-work": [
    ["How to Design a Deep Work Block That Actually Fits Your Day", "design-a-deep-work-block", "deep work block", "how to choose a narrow outcome, remove interruptions, set a time boundary, and finish with a useful handoff"],
    ["Remote Workday Routine: How to Start and Finish Clearly", "remote-workday-routine", "remote workday routine", "work start cues, priority setting, communication windows, breaks, shutdown rituals, and boundaries at home"],
    ["Async Communication for Remote Teams: A Practical Guide", "async-communication-for-remote-teams", "async communication", "when to write, what context to include, how to make decisions visible, and when a live conversation is justified"],
    ["Time Blocking Explained: How to Plan Without Filling Every Minute", "time-blocking-without-overplanning", "time blocking", "matching energy to tasks, protecting flexible space, handling interruptions, and reviewing a calendar that stays humane"],
    ["How to Prioritize Tasks When Everything Feels Urgent", "prioritize-tasks-when-everything-is-urgent", "prioritize urgent tasks", "real deadlines, consequences, dependencies, effort, communication, and a simple way to choose the next responsible action"],
    ["How to Run a Remote Meeting People Do Not Regret Attending", "run-better-remote-meetings", "better remote meetings", "a clear purpose, preparation, participation, decisions, notes, and a stopping rule that respects attention"],
    ["Home Office Setup Basics: Comfort, Focus, and Practical Limits", "home-office-setup-basics", "home office setup", "work surface, screen position, lighting, sound, storage, movement, and affordable improvements that reduce friction"],
    ["How to Document Team Work So People Can Find It Later", "document-team-work-for-remote-teams", "document team work", "decision records, naming, ownership, searchability, examples, and a maintenance habit that prevents documentation rot"],
    ["How to Prevent Remote Work from Expanding into Every Hour", "prevent-remote-work-burnout", "prevent remote work burnout", "capacity signals, communication expectations, breaks, workload conversations, and boundaries that can survive busy periods"],
    ["Focus Breaks: How to Rest Without Losing the Thread", "focus-breaks-for-productive-work", "focus breaks", "short recovery choices, natural stopping points, physical movement, notifications, and returning to the task with context"],
    ["How to Write a Project Status Update That Helps a Team Decide", "write-a-useful-project-status-update", "project status update", "progress, evidence, risks, decisions needed, next steps, and the difference between activity and meaningful movement"],
    ["Digital Workspace Organization for Remote Teams", "organize-a-digital-workspace", "digital workspace organization", "shared folders, channels, project pages, permissions, naming, archiving, and a simple rule for where information belongs"]
  ],
  "science-environment": [
    ["Renewable Energy Explained: Solar, Wind, Hydro, and More", "renewable-energy-explained", "renewable energy explained", "how common renewable sources generate energy, what constraints they face, and why a useful energy system uses more than one answer"],
    ["How a Carbon Footprint Is Estimated and What It Leaves Out", "how-carbon-footprints-are-estimated", "carbon footprint explained", "activity data, emissions factors, scope, uncertainty, comparisons, and how to interpret footprint claims carefully"],
    ["The Water Cycle Explained Through Everyday Examples", "water-cycle-explained", "water cycle explained", "evaporation, condensation, precipitation, storage, runoff, groundwater, and how human systems change the movement of water"],
    ["Urban Heat Islands: Why Cities Can Feel Hotter Than Nearby Areas", "urban-heat-islands-explained", "urban heat islands", "surfaces, shade, trees, buildings, wind, neighbourhood design, and practical ways communities reduce heat exposure"],
    ["Recycling Symbols Explained: What They Do and Do Not Guarantee", "recycling-symbols-explained", "recycling symbols", "material labels, local facilities, contamination, packaging claims, and how to make a better disposal decision"],
    ["Electric Vehicle Charging Basics for New Owners", "electric-vehicle-charging-basics", "electric vehicle charging basics", "home charging, public chargers, charging speed, battery habits, trip planning, and the difference between capacity and range"],
    ["Why Biodiversity Matters in Ordinary Places", "why-biodiversity-matters", "why biodiversity matters", "ecosystems, species relationships, resilience, food systems, urban habitats, and actions that support living variety"],
    ["Air Quality Index Explained: How to Read the Number", "air-quality-index-explained", "air quality index", "pollutants, ranges, health guidance, local variation, sensors, and why one number needs context"],
    ["Weather vs Climate: A Clear Explanation of the Difference", "weather-vs-climate-explained", "weather vs climate", "short-term conditions, long-term patterns, evidence, variability, and why a single weather event cannot answer a climate question"],
    ["How Solar Panels Work and What Affects Their Output", "how-solar-panels-work", "how solar panels work", "sunlight, photovoltaic cells, orientation, shade, inverters, storage, maintenance, and realistic expectations for a property"],
    ["Sustainable Travel Choices: What Makes a Difference?", "sustainable-travel-choices", "sustainable travel choices", "transport, duration, accommodation, local spending, waste, trade-offs, and how to avoid exaggerated green claims"],
    ["How to Evaluate an Environmental Claim Without Being Misled", "evaluate-environmental-claims", "evaluate environmental claims", "definitions, evidence, comparison points, lifecycle boundaries, certification, incentives, and questions that reveal vague language"]
  ],
  "apps-digital-tools": [
    ["How to Choose a Note-Taking App for the Way You Think", "choose-a-note-taking-app", "choose a note-taking app", "capture speed, structure, search, export, privacy, device access, and the difference between collecting notes and using them"],
    ["Calendar Apps Compared by Planning Style, Not Feature Count", "calendar-app-planning-styles", "calendar app planning", "time blocks, shared events, reminders, recurring commitments, privacy, and the planning habits each approach supports"],
    ["Cloud Collaboration Tools: How to Choose a Shared Workspace", "choose-cloud-collaboration-tools", "cloud collaboration tools", "files, comments, permissions, version history, offline access, team habits, and the cost of scattered information"],
    ["How to Choose a Password Manager for Everyday Accounts", "choose-a-password-manager", "choose a password manager", "vault design, device support, recovery, sharing, security model, migration, and the questions to ask before trusting a provider"],
    ["PDF Tools Explained: Read, Edit, Sign, and Organize Documents", "pdf-tools-explained", "PDF tools explained", "which tasks need editing, annotation, conversion, signing, compression, or simply better file organization"],
    ["Video Conferencing Tools: What Matters Beyond the Call Link", "video-conferencing-tools-guide", "video conferencing tools", "audio, access, captions, recording, privacy, participation, integrations, and meeting habits that matter more than branding"],
    ["Project Management Apps for Small Teams: A Practical Guide", "project-management-apps-small-teams", "project management apps", "tasks, ownership, status, dependencies, views, notifications, and when a simpler shared list is enough"],
    ["Read-It-Later Apps: How to Build a Reading Queue You Finish", "read-it-later-apps-guide", "read-it-later apps", "capture rules, tagging, review time, offline reading, archiving, and avoiding a second inbox full of good intentions"],
    ["Budgeting Apps: What to Check Before Connecting Your Accounts", "budgeting-app-safety-checklist", "budgeting app safety", "data access, categorisation, exports, security, subscription terms, manual alternatives, and questions for financial privacy"],
    ["How to Organize Photos with the Help of Digital Tools", "organize-photos-with-digital-tools", "organize photos digitally", "duplicates, dates, albums, backups, search, privacy, and a manageable process for a growing photo library"],
    ["Automation Apps for Repetitive Tasks: Where to Start Safely", "automation-apps-for-repetitive-tasks", "automation apps", "triggers, actions, permissions, failure notices, human review, and low-risk workflows worth automating first"],
    ["Browser Extensions: How to Choose Useful Ones Without Overloading Your Browser", "choose-browser-extensions", "choose browser extensions", "permissions, publisher trust, performance, privacy, updates, alternatives, and a review routine for installed extensions"]
  ]
};

const contextByCategory = {
  "cybersecurity-privacy": "Security is a practice of reducing exposure and preparing for recovery, not a promise that risk can disappear.",
  "productivity-remote-work": "A productive system should make important work easier to see and start without turning every hour into a measurement.",
  "science-environment": "Science is strongest when a claim includes its evidence, uncertainty, boundaries, and the conditions under which it applies.",
  "apps-digital-tools": "A tool earns its place when it reduces friction for a real workflow and remains understandable when something changes."
};

function buildBody(title, keyword, angle, context, style) {
  const opening = style % 3 === 0
    ? `A useful starting point for ${keyword} is to connect the tool, system, or idea to a decision a normal person actually needs to make.`
    : style % 3 === 1
      ? `People often meet ${keyword} through a promise that sounds simple, while the practical choice depends on several quieter details.`
      : `The clearest way to understand ${keyword} is to follow it from the initial question through the choices, constraints, and result.`;
  return [
    { type: "paragraph", text: `${title} is written for readers who want a useful explanation rather than a dramatic promise. ${opening} This guide focuses on ${angle}, so you can recognise what matters, test a sensible first step, and decide what deserves more research.` },
    { type: "heading", level: 2, text: `What ${keyword} means in practice` },
    { type: "paragraph", text: `${keyword} is easiest to understand when the visible outcome is separated from the system underneath it. Start by naming what a person sees, then identify the information, behaviour, tool, or physical process that creates it. This avoids jargon-led decisions and makes it easier to notice where a recommendation stops applying. ${context}` },
    { type: "heading", level: 2, text: "The important parts to understand first" },
    { type: "list", items: [`Define the actual problem before choosing a solution or repeating a claim.`, `Separate the main benefit from the extra setup, maintenance, or responsibility.`, `Check which information is current and which part is a general principle.`, `Choose a result that can be observed instead of relying on a feeling of progress.`] },
    { type: "heading", level: 3, text: "A closer look at the reader's decision" },
    { type: "paragraph", text: `Imagine the situation behind ${title.toLowerCase()}: limited time, an existing routine, incomplete information, and someone else who may need to understand the result. The best first choice is rarely the most advanced one. It is the option that makes the next step clearer while keeping mistakes visible and reversible. Ask what changes before and after the decision, who carries the hidden work, and what evidence would make you change course.` },
    { type: "heading", level: 2, text: "A practical step-by-step approach" },
    { type: "paragraph", text: `First, write the outcome in one sentence. Next, gather only the information needed for a low-risk example. Then complete one pass without trying to optimise every detail. Pause to check the result against the outcome, record the friction, and improve one part at a time. For ${angle}, this sequence prevents a broad topic from becoming an endless list of tools, opinions, or tasks.` },
    { type: "heading", level: 2, text: "What can go wrong" },
    { type: "paragraph", text: `Common mistakes happen when people treat a label as a guarantee, ignore the conditions behind a claim, or change too many variables at once. Another mistake is assuming that convenience has no cost. Look for privacy, reliability, accessibility, time, money, and recovery implications. When the subject affects health, security, finances, or public claims, use current primary sources and qualified advice where appropriate.` },
    { type: "callout", tone: "accent", text: "The useful version of a new idea is small enough to test and clear enough to review." },
    { type: "heading", level: 2, text: "How to make the idea fit your routine" },
    { type: "paragraph", text: `Adapt the method to the place where the decision will actually happen. A home user, a small team, and a public organisation may need different defaults, permissions, budgets, or explanations. Keep the first version narrow, choose one owner for the next action, and set a review point. A method that can be repeated on an ordinary day is more valuable than an impressive system that requires perfect conditions.` },
    { type: "heading", level: 2, text: "How to check the result" },
    { type: "paragraph", text: `Use a simple before-and-after record: what was difficult, what changed, what remained uncertain, and whether the result helped the intended person. Compare claims with evidence rather than with enthusiasm. If the result is worse, do not hide that information; it tells you whether the assumption, setup, timing, or tool needs to change. ${context}` },
    { type: "heading", level: 2, text: "A useful explanation to share" },
    { type: "paragraph", text: `If you need to explain ${keyword} to someone else, begin with the problem, describe the mechanism in plain language, give one example, and name the limitation. This structure keeps the conversation honest and reveals gaps in your own understanding. It also helps other people decide whether the approach fits their situation instead of treating your experience as a universal rule.` },
    { type: "heading", level: 2, text: "Frequently Asked Questions" },
    { type: "heading", level: 3, text: `What should beginners understand first about ${keyword}?` },
    { type: "paragraph", text: `Begin with purpose, context, and the smallest safe example. You do not need every advanced feature or theory immediately. You need to know what ${keyword} is meant to change, which assumption matters most, and how to check the first result.` },
    { type: "heading", level: 3, text: `What is the most common mistake with ${keyword}?` },
    { type: "paragraph", text: `The most common mistake is applying a general recommendation without checking its conditions. Keep ${angle} connected to the real situation, name the trade-off, and pause when a claim is more confident than its evidence. ${context}` },
    { type: "heading", level: 3, text: `How can someone keep improving their approach?` },
    { type: "paragraph", text: `Keep a short record of questions, results, and sources that changed your view. Revisit details when tools, policies, prices, measurements, or evidence change. The goal is not to follow every update; it is to make the next decision more informed and easier to explain.` },
    { type: "heading", level: 2, text: "The takeaway" },
    { type: "paragraph", text: `${keyword} becomes useful when it is connected to a real question, a modest experiment, and a review point. Define the outcome, check the important boundary, notice the hidden work, and improve the next version. That approach supports better decisions even as tools, circumstances, and public conversations change.` }
  ];
}

const posts = [];
let index = 0;
for (const [categorySlug, seeds] of Object.entries(groups)) {
  const category = extraCategories.find((item) => item.slug === categorySlug);
  for (const [title, slug, keyword, angle] of seeds) {
    const excerpt = `${title} explains the practical context, important trade-offs, and useful first steps so readers can make a clearer decision.`;
    posts.push({
      slug, categorySlug, title, excerpt, searchIntent: "Informational", author: authors[index % authors.length],
      publishedAt: `2026-11-${String((index % 25) + 1).padStart(2, "0")}`, updatedAt: "2026-11-01",
      seo: { metaTitle: `${title} | DailyTransPosts`, metaDescription: excerpt, primaryKeyword: keyword, secondaryKeywords: [category.name.toLowerCase(), `${keyword} guide`, "practical tips", "beginner explanation"] },
      image: { src: `https://images.unsplash.com/photo-${["1497366811353-6870744d04b2", "1451187580459-43490279c0fa", "1518770660439-4636190af475", "1499750310107-5fef28a66643"][index % 4]}?auto=format&fit=crop&w=1400&q=82`, alt: `${title} editorial illustration`, width: 1400, height: 900 },
      body: buildBody(title, keyword, angle, contextByCategory[categorySlug], index), relatedSlugs: []
    });
    index += 1;
  }
}

const allKnownPosts = [...existingPosts, ...firstExpansion, ...posts];
for (const post of posts) {
  const sameCategory = allKnownPosts.filter((candidate) => candidate.categorySlug === post.categorySlug && candidate.slug !== post.slug);
  post.relatedSlugs = sameCategory.slice(0, 3).map((candidate) => candidate.slug);
}

export { categories, posts };
