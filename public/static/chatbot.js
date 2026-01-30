document.addEventListener("DOMContentLoaded", () => {


const QA_PAIRS = [
  {
    q: ["what is this website", "what does this platform do", "what is this tool", "what is this project", "overview", "introduce this site"],
    a: "This platform is a research understanding and exploration tool designed to make complex academic literature easier to navigate, understand, and connect. It helps users search papers, generate structured summaries, visualize relationships between ideas, and explore how research evolves over time.",
    suggest: ["What makes this different from other tools?", "What is the research map?"]
  },
  {
    q: ["what makes this different", "how is this different", "why use this platform", "comparison", "why not google scholar"],
    a: "Unlike traditional search engines, this platform focuses on understanding rather than retrieval. We emphasize structured summaries, conceptual links between papers, visual exploration, and interpretability—helping users see how ideas connect instead of just listing results.",
    suggest: ["How does the research map work?", "What can I do with summaries?"]
  },
  {
    q: ["dashboard", "what is the dashboard", "home page"],
    a: "The Dashboard is your central workspace. It brings together your recent activity, saved papers, visualizations, and quick access to all major features so you can move seamlessly between searching, understanding, and exploring research.",
    suggest: ["What can I search for?", "How do I understand a paper?"]
  },
  {
    q: ["search", "how does search work", "paper search", "find papers"],
    a: "The Search feature allows you to discover papers using natural language queries. Instead of relying only on keywords, it prioritizes conceptual relevance and surfaces influential and related work.",
    suggest: ["What happens after I find a paper?", "What is the research map?"]
  },
  {
    q: ["understand", "paper summary", "explain paper", "summaries"],
    a: "The Understand feature breaks down papers into structured components such as key ideas, assumptions, methods, and contributions. This helps you quickly grasp what a paper is doing and why it matters—without losing technical depth.",
    suggest: ["How accurate are the summaries?", "Can I visualize papers?"]
  },
  {
    q: ["visualise", "visualization", "graphs", "see connections"],
    a: "Visualise lets you explore research through interactive graphs and diagrams. Instead of reading papers in isolation, you can see how concepts, methods, and results relate across work.",
    suggest: ["What is the research map?", "How are papers connected?"]
  },
  {
    q: ["research map", "paper map", "how are papers connected", "graph of papers"],
    a: "The Research Map is an interactive network where each node represents a paper and links indicate conceptual, methodological, or historical connections. It helps you explore how ideas influence each other across time and subfields.",
    suggest: ["How are these connections determined?", "Can I click on a paper?"]
  },
  {
    q: ["how are connections determined", "how do you link papers"],
    a: "Connections are created based on shared themes, methods, citations, and conceptual overlap. The goal is not just citation graphs, but meaningful intellectual relationships between works.",
    suggest: ["What kinds of papers are included?", "Is this curated?"]
  },
  {
    q: ["what fields are supported", "what research areas", "domains"],
    a: "The platform is designed to be domain-agnostic, with an initial focus on machine learning and related computational fields. The underlying structure can support any research domain with complex literature.",
    suggest: ["Who is this for?", "Is this open source?"]
  },
  {
    q: ["who is this for", "target audience", "who should use this"],
    a: "This platform is built for students, researchers, educators, and anyone who wants to deeply understand research papers without being overwhelmed. It is especially useful for navigating unfamiliar literature.",
    suggest: ["Is this free?", "How can I contribute?"]
  },
  {
    q: ["is this free", "pricing", "cost"],
    a: "Yes. The platform is free and open source. Our goal is to make high-quality research tools accessible to everyone.",
    suggest: ["How is this funded?", "Can I support the project?"]
  },
  {
    q: ["how is this funded", "who pays for this"],
    a: "The project is community-driven and supported by voluntary contributions. There is no paywall—development is sustained by people who believe in open access to knowledge.",
    suggest: ["How can I support the project?"]
  },
  {
    q: ["support", "donate", "contribute money", "pay"],
    a: "If you’d like to support open knowledge, we encourage contributing to Wikipedia or similar open platforms. Supporting shared knowledge ecosystems helps everyone.",
    suggest: ["Is this open source?", "Who built this?"]
  },
  {
    q: ["open source", "is this open source", "github"],
    a: "Yes, the project is open source. Transparency and reproducibility are core principles—we believe research tools should be inspectable, extensible, and community-improved.",
    suggest: ["Who built this?", "What is the long-term vision?"]
  },
  {
    q: ["who built this", "about us", "team"],
    a: "This platform is built by researchers and engineers who care deeply about learning, interpretability, and open science. Our focus is on building tools that augment human understanding rather than replace it.",
    suggest: ["What is the long-term vision?", "Why build this?"]
  },
  {
    q: ["why build this", "motivation"],
    a: "We built this because reading and understanding research is unnecessarily hard. By making structure and connections visible, we aim to reduce friction in learning and accelerate meaningful research.",
    suggest: ["What is the long-term vision?"]
  },
  {
    q: ["long term vision", "future plans", "what's next"],
    a: "Our long-term vision is to create a living map of human knowledge—where research is not just archived, but understood, connected, and continuously explored.",
    suggest: ["How can I contribute?", "Is this open source?"]
  },
  {
    q: ["how can i contribute", "contribute", "help"],
    a: "You can contribute by providing feedback, improving open knowledge platforms, sharing the tool, or participating in open-source development when available.",
    suggest: ["Is this free?", "Who built this?"]
  },
  {
    q: ["help", "what can i ask", "what can you do"],
    a: "You can ask about features like Search, Understand, Visualise, the Research Map, or the philosophy behind the platform. Try asking something like 'What is the research map?'",
    suggest: ["What is the research map?", "What makes this different?"]
  }
];


const model = {};

function tokenize(text) {
    return (text || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
}
function buildModel() {
    const documents = QA_PAIRS.map(pair => tokenize(pair.q.join(" ")));
    const docCount = documents.length;
    const idf = {};
    const allTokens = new Set(documents.flat());
    for (const token of allTokens) {
        let docsWithToken = 0;
        for (const doc of documents) if (doc.includes(token)) docsWithToken++;
        idf[token] = Math.log(docCount / (1 + docsWithToken));
    }
    const docVectors = documents.map(doc => {
        const vector = {};
        const termCount = doc.length;
        for (const token of new Set(doc)) {
            const tf = doc.filter(t => t === token).length / termCount;
            vector[token] = tf * idf[token];
        }
        return vector;
    });
    model.idf = idf; model.docVectors = docVectors;
}
function createVector(tokens) {
    const vector = {}; const termCount = tokens.length;
    for (const token of new Set(tokens)) {
        const tf = tokens.filter(t => t === token).length / termCount;
        const idf = model.idf[token] || 0;
        vector[token] = tf * idf;
    }
    return vector;
}
function dotProduct(vecA, vecB) {
    let product = 0;
    for (const key in vecA) if (key in vecB) product += vecA[key] * vecB[key];
    return product;
}
function magnitude(vec) {
    let sum = 0;
    for (const key in vec) sum += vec[key] * vec[key];
    return Math.sqrt(sum);
}
function cosineSimilarity(vecA, vecB) {
    const dp = dotProduct(vecA, vecB), magA = magnitude(vecA), magB = magnitude(vecB);
    return (magA === 0 || magB === 0) ? 0 : dp / (magA * magB);
}
function bestAnswer(query) {
    const queryTokens = tokenize(query), queryVector = createVector(queryTokens);
    let best = { score: -1, idx: -1 };
    model.docVectors.forEach((docVector, i) => {
        const score = cosineSimilarity(queryVector, docVector);
        if (score > best.score) best = { score, idx: i };
    });
    return (best.idx >= 0 && best.score > 0.15) ? QA_PAIRS[best.idx] : null;
}
buildModel();

function el(tag, attrs={}, kids=[]){
  const e = document.createElement(tag);
  for (const [k,v] of Object.entries(attrs)){
    if(k==="class") e.className=v;
    else if(k.startsWith("on") && typeof v==="function") e.addEventListener(k.slice(2), v);
    else e.setAttribute(k,v);
  }
  for (const c of [].concat(kids)){
    if(c instanceof Node) e.appendChild(c); else e.appendChild(document.createTextNode(String(c)));
  }
  return e;
}
const $ = id => document.getElementById(id);
const chat = $("igbot-chat"), form = $("igbot-form"), input = $("igbot-input");
function addMsg({who="bot", html="", choices=[]}){
  const wrap=el("div",{class:"igbot-msg "+(who==="user"?"igbot-user":"")});
  const av=el("div",{class:"igbot-avatar"},[who==="user"?"U":"A"]);
  const bub=el("div",{class:"igbot-bubble"});
  bub.innerHTML = html;
  wrap.append(av,bub);
  if(who==="bot" && choices.length){
    const bar=el("div",{class:"igbot-choices"});
    for(const c of choices){ bar.append(el("button",{type:"button", onclick:()=>ask(c)},[c])); }
    bub.append(bar);
  }
  chat.append(wrap);
  chat.scrollTop = chat.scrollHeight;
}
function ask(q){
  addMsg({who:"user", html:q});
  setTimeout(()=>{
    const m = bestAnswer(q);
    if(m){ addMsg({who:"bot", html:m.a, choices:m.suggest||[]}); }
    else{
      addMsg({who:"bot", html:"Try asking about who we are and what we do", choices:QA_PAIRS.map(p=>p.q[0]).slice(0,3)});
    }
  }, 300);
}
addMsg({who:"bot", html:"Hello there! I am an AI helper. Ask me anything!", choices:QA_PAIRS.map(p=>p.q[0]).slice(0,3)});

$("igbot-launcher").onclick = ()=>{ $("igbot-panel").classList.add("igbot-open"); $("igbot-launcher").style.display="none"; input.focus(); };
$("igbot-close").onclick = ()=>{ $("igbot-panel").classList.remove("igbot-open"); $("igbot-launcher").style.display="grid"; };
form.onsubmit = (e)=>{ e.preventDefault(); const q=input.value.trim(); if(q) ask(q); input.value=""; input.focus(); };

});