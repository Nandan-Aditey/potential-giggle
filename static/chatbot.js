document.addEventListener("DOMContentLoaded", () => {


const QA_PAIRS = [
    {
        q: ["what is the project about", "project description", "what is argus", "project goal", "what", "project summary", "overview", "introduce your project", "tell me about your project"],
        a: "Our project, ARGUS-2440, is engineering Pseudomonas putida to combat nitrate leaching in agriculture.  It's a novel biological system designed to optimize soil nitrogen balance, prevents leaching due to use of excess fertilizers, and improves plant health",
        suggest: ["Why is nitrate leaching a problem?"]
    },
    {
        q: ["why is nitrate leaching a problem", "nitrate pollution", "environmental impact", "nitrate leaching issues", "what lead to the solution"],
        a: "Nitrate leaching contaminates groundwater, which is the primary source of drinking water for 90% of rural India. This leads to health issues like methemoglobinemia (blue baby syndrome) and harms ecosystems by causing eutrophication in water bodies.",
        suggest: ["How would this be used?", "What did the farmers say?"]
    }, 
    {
        q: ["why pseudomonas putida", "chassis"],
        a: "We chose Pseudomonas putida KT2440 because it's a robust soil bacterium chassis that performs DNRA (Dissimilatory Nitrate Reduction to Ammonium). The first step of DNRA had already been perfected by team Cattlelysts. Moreover, P.putida forms biofilms that promote the growth of plants. This makes it an ideal chassis for an agricultural application, as it's already adapted to the target environment.",
        suggest: ["What's special about biofilms?", "Is it safe?", "what is dnra"]
    },
    {
        q: ["what is dnra", "dnra pathway", "dissimilatory nitrate reduction"],
        a: "DNRA stands for Dissimilatory Nitrate Reduction to Ammonium. It's a two-step microbial pathway that converts nitrate to ammonium, keeping the nitrogen conserved in the soil. We chose it over denitrification because it doesn't produce greenhouse gases like nitrous oxide (N2O). Moreover, the total nitrogen content was not lost in the DNRA ",
        suggest: ["why pseudomonas putida"]
    },
    {
        q: ["what are the project goals", "objectives"],
        a: "Our main goals are to: Improve fertilizer efficiency and reduce usage, form a bacterial biofilm around roots to confer resistance and treat runoff and reuse for fertilizer production.",
        suggest: ["What were your results?"]
    },
    {
        q: ["human practices", "what is hp", "stakeholder engagement"],
        a: "Human Practices (or HP) involves critically considering the societal, ethical, and cultural implications of their project and engaging with stakeholders to address these issues. For our project, we engaged with farmers in Berambadi village to understand their needs, spoke with agricultural scientists about feasibility, met with government representatives and developed educational materials. Our project design was directly influenced by their feedback.",
        suggest: ["What did the farmers say?", "Tell me about safety."]
    },
    {
        q: ["engineering success", "dbtl cycle", "design build test learn"],
        a: "We used the Design-Build-Test-Learn (DBTL) cycle to refine our project. We began each cycle by planning out an extensive design, before building computational models and performing the experiments to test our designs. Finally, we consolidated our learnings and used them to chart out the next cycle. All of our cycles have been detailed on our Engineering pages.",
        suggest: ["What were your results?", "What parts did you make?"]
    },
    {
        q: ["what were the results", "did it work", "proof of concept"],
        a: "Yes, we achieved a successful proof of concept. Our results show that our engineered P. putida can indeed regulate nitrate balance in a lab setting. Thus, P.putida has been shown to work in microaerophilic environments in the soil.",
        suggest: ["How would this be used in the real world?"]
    },
    {
        q: ["parts", "biobricks", "registry contribution", "What parts did you make?"],
        a: "We submitted multiple biobricks to the iGEM Registry, mainly basic and composite parts related to the nitrite reductase genes nrfABCD, nrfHAIJ and nirBD operons. Specifically we have conducted basal expression tests on nirBD, natively found in Pesudomonas putida KT2440, as it is also the chassis for our project. We plan to compare the basal efficiency to the modified bacterium, which will have a plasmid with the insert cloned into it, under a benzoate-inducible promoter.",
        suggest: ["Who is on the team?"]
    },
    {
        q: ["safety", "biosafety", "is it safe", "Tell me about safety."],
        a: "Safety is a top priority. We have ensured that lab training to conduct the experiments with maximum care, along with proper waste disposal. We have also designed a angel-demon kill switch system to prevent our engineered bacteria from surviving outside the target agricultural environment.",
        suggest: ["How would this be used in the real world?"]
    },
    {
        q: ["who is on the team", "team members", "pis"],
        a: "Our team is composed of undergraduate students from IISc Bengaluru, with guidance from our Principal Investigators, Prof. Samay Pande and Prof. Dipshika Chakraborty. You can see everyone's contributions on our Attributions page!",
        suggest: ["Who helped the team?"]
    },
    {
        q: ["How would this be used?", "real world application", "implementation"],
        a: "In the real world, ARGUS-2440 could be applied as a liquid soil inoculant. Farmers would add it to their irrigation systems. The bacteria would then colonize plant roots and manage nitrogen levels directly in the soil.",
        suggest: ["Is it safe?", "What did the farmers say?"]
    },

    {
        q: ["what does argus mean", "project name", "name origin"],
        a: "The name ARGUS-2440 is inspired by our teammate and campus dog, Argus! The 2440 refers to the bacteria we have used for our proof of concept.",
        suggest: ["Why use Pseudomonas putida?", "What is the project about?"]
    },
    {
        q: ["how is your project innovative", "what is novel", "innovation"],
        a: "Our project is innovative because it focuses on the understudied DNRA pathway for nitrogen conservation. Instead of just removing nitrate, we convert it back into a useful form (ammonia) directly in the root zone, combined with the use of biofilms to facilitate growth.",
        suggest: ["What is DNRA?"]
    },
    {
        q: ["what's special about biofilms", "biofilm function"],
        a: "Biofilms are communities of microbes that adhere to a surface. In our project, the biofilm formed by P. putida on plant roots creates a localized, protected environment where our engineered bacteria can effectively manage nitrogen levels right where the plant needs it.",
        suggest: ["Why use Pseudomonas putida?"]
    },
    {
        q: ["what did you learn from previous igem projects", "previous projects"],
        a: "We were inspired by the work of the Wageningen 2021 team (Cattlelysts), who demonstrated the first step of DNRA in P. putida. Their success gave us the confidence to focus our efforts on engineering the second, more challenging step of the pathway.",
        suggest: ["What is DNRA?"]
    },
    {
        q: ["future plans", "what's next", "future directions"],
        a: "Our future plans include field trials to test the robustness of ARGUS-2440 in real agricultural conditions, optimizing the kill switch for environmental safety and troubleshooting some of the issues we have faced.",
        suggest: ["Tell me about safety.", "How would this be used in the real world?"]
    },

    {
        q: ["key experiments", "what experiments did you do"],
        a: "Our key experiments included: transformation of our bacterium, identifying optimal growth media, nitrite metabolism, biofilm formation and testing the fatal build-up of different chemicals. We will also conduct comparative assays between the transformed and native bacterium to characterize the efficiency of our construct.",
        suggest: ["What were your results?", "What parts did you make?"]
    },
    {
        q: ["what challenges did you face in the lab", "problems", "troubleshooting"],
        a: "The major challenge we faced in Wet Lab workspace getting high yield of insert in the plasmid, leading to difficulties in digestion and elution. To remedy this, we started performing manual isolation, which is more time consuming but leads to better yield. We still faced issues in the ligation step and have modified our protocol to lose less DNA in the elution steps.",
        suggest: ["What is the DBTL cycle?"]
    },
    {
        q: ["cloning strategy", "how did you build your plasmids"],
        a: "We codon optimised the operons nrfABCD, nrfHAIJ and nirBD for expression in E. coli. After this we had them synthesized by the iGEM Sponsor, TWIST Bioscience in an expression vector with ampicillin resistance. We used the restriction enzymes EcoRI, BamHI and HindIII to cut the expression vector after isolation. These inserts would then be added to the pSEVA plasmids, which have an MCS with the same restriction enzymes.",
        suggest: ["What parts did you make?"]
    },

    {
        q: ["what modeling did you do", "dry lab", "computational work"],
        a: "Our dry lab team developed an Ordinary Differential Equation (ODE) model to simulate the nitrogen dynamics in soil. This model helped us predict how our engineered bacteria would impact nitrate and ammonia concentrations over time under different conditions, and help optimise the amount of fertiliser to be used. We also built a ML model to predict the amount of ammonium present in soil with and without the presence of our modified bacterium.",
        suggest: ["What were the results of the model?", "What software did you use?"]
    },
    {
        q: ["what did the model predict", "model results"],
        a: "The model can predict the amount of nitrate and ammonium that can be taken up with and without the presence of our bacteria, under different initial conditions of the soil. Our model successfully predicts that the loss of nitrogen decreases with the addition of our bacterium.",
        suggest: ["What were your wet lab results?"]
    },
    {
        q: ["what software did you use", "tools", "software tools"],
        a: "For modeling, we used Python with libraries like PyTorch for ML, SciPy for solving ODEs and Matplotlib for plotting. We also used the SnapGene software to build and modify our chosen operons. We also used AlphaFold2 to predict and validate a modified nirBD protein construct.",
        suggest: ["What modeling did you do?"]
    },
    {
        q: ["what did the farmers say", "farmer feedback"],
        a: "During our visit to Berambadi village, farmers told us they were aware of nutrient loss and often over-apply fertilizer to compensate. Moreover, we were made aware of the lack of filtered water, emphasising the urgency of this situation. Surprisingly, the farmers were also quite open to the use of GMOs if they provided better yield.",
        suggest: ["What is Human Practices?", "How would this be used in the real world?"]
    },
    {
        q: ["how did hp influence your project", "integrated human practices", "ihp"],
        a: "Our conversations with farmers directly influenced our project design. Their need for a simple, 'one-and-done' application led us to focus on using a biofilm-forming chassis (P. putida) that could persist in the root zone, rather than a system requiring constant reapplication.",
        suggest: ["Why use Pseudomonas putida?"]
    },
    {
        q: ["education and outreach", "public engagement"],
        a: "While education is not part of our medal criteria, we have involved our juniors in building a more user-friendly and improved version of GenBank, thus training the future iGem'ers. ",
        suggest: ["What did the farmers say?"]
    },
    {
        q: ["sustainability", "sustainable development goals", "sdg"],
        a: "Our project directly addresses several UN Sustainable Development Goals, including SDG 2 (Zero Hunger) by improving agricultural efficiency, SDG 6 (Clean Water and Sanitation) by reducing nitrate pollution, and SDG 14 (Life under Water) by combating eutrophication.",
        suggest: ["Why is nitrate leaching a problem?"]
    },

    {
        q: ["who helped your team", "attributions", "mentors"],
        a: "We received immense help from our PIs, advisors, and graduate student mentors at IISc. We also want to thank the Wageningen 2021 team for their advice and the agricultural scientists who provided feedback on our project's feasibility. Full details are on our Attributions page.",
        suggest: ["Who is on the team?"]
    },
    {
        q: ["sponsors", "who funded your project", "funding"],
        a: "Our project was generously supported by the Indian Institute of Science (IISc), Axis Bank centre for Mathematics and Computing, Kotak IISc AIML centre, SnapGene and Twist. We are incredibly grateful to all our sponsors.",
        suggest: ["What is the project about?"]
    },
    {
        q: ["what was your biggest challenge", "biggest problem"],
        a: "Our biggest challenge was working with the understudied DNRA pathway. There was very little existing literature, which meant we had to conduct many foundational experiments to characterize the system's behavior in our chassis before we could begin engineering it.",
        suggest: ["What is DNRA?"]
    },
    {
        q: ["what is your team's favorite memory", "team experience"],
        a: "The team's favorite memory was our first successful cloning result after weeks of troubleshooting. Seeing the correct bands on the gel was a huge moment of celebration and relief for everyone in the lab!",
        suggest: ["Tell me about the team."]
    },

    {
        q: ["what is the meaning of life"],
        a: "To reduce nitrate leaching, of course! And maybe to submit your parts to the registry on time.",
        suggest: ["What are your project goals?"]
    },
    {
        q: ["who is the best team member"],
        a: "Argus, of course :)",
        suggest: ["Who is on the team?"]
    },
    {
        q: ["do you like lab work", "is science fun"],
        a: "Absolutely! It's a mix of exciting discoveries and many, many failed experiments. But the 'aha!' moment when something finally works makes it all worthwhile.",
        suggest: ["What were your key experiments?"]
    },
    
    {
        q: ["who are you", "what are you", "about this bot"],
        a: "I am the ARGUS Wiki Helper, a static Q&A chatbot designed to help you navigate our project. I run entirely in your browser with no external servers, using TF-IDF and cosine similarity to find the best answer to your questions.",
        suggest: ["What parts did you make?"]
    },
    {
        q: ["help", "what can you do", "what can i ask"],
        a: "You can ask me about our project's goal, the science behind it, our experiments, results, human practices, safety, and our team. Just type a question like 'Tell me about your results' to get started!",
        suggest: ["What is the project about?", "Why is nitrate leaching a problem?"]
    },
    {
        q: ["contact", "how to contact the team"],
        a: "You can reach the iGEM IISc-Bengaluru 2025 team via email at [igem.ug@iisc.ac.in or iiscigem@gmail.com] or through our social media channels linked on the team page.",
        suggest: ["Who is on the team?"]
    },
    {
        q: ["igem", "what is igem"],
        a: "The International Genetically Engineered Machine (iGEM) competition is the largest synthetic biology competition in the world, where student teams design, build, and test novel biological systems to solve real-world problems.",
        suggest: ["What is your project about?"]
    },
    {
        q: ["what is synthetic biology", "synbio"],
        a: "Synthetic biology is a field of science that involves redesigning organisms for useful purposes by engineering them to have new abilities. We use it to create biological solutions for problems in medicine, agriculture, and the environment.",
        suggest: ["How is your project innovative?"]
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
      addMsg({who:"bot", html:"Try asking about our project or nitrate leaching.", choices:QA_PAIRS.map(p=>p.q[0]).slice(0,3)});
    }
  }, 300);
}
addMsg({who:"bot", html:"Hi! I’m the ARGUS-2440 project assistant. Ask me anything!", choices:QA_PAIRS.map(p=>p.q[0]).slice(0,3)});

$("igbot-launcher").onclick = ()=>{ $("igbot-panel").classList.add("igbot-open"); $("igbot-launcher").style.display="none"; input.focus(); };
$("igbot-close").onclick = ()=>{ $("igbot-panel").classList.remove("igbot-open"); $("igbot-launcher").style.display="grid"; };
form.onsubmit = (e)=>{ e.preventDefault(); const q=input.value.trim(); if(q) ask(q); input.value=""; input.focus(); };

});