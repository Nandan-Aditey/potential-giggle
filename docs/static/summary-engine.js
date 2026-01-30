function splitSentences(text) {
  return text.match(/[^.!?]+[.!?]/g) || [];
}

function extractSentences(text) {
  return text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s =>
      s.length > 30 &&
      s.length < 250 &&
      !s.endsWith("?")
    );
}
function scoreSentence(sentence, nouns, index, total) {
  let score = 0;
  const reasons = [];
  const s = sentence.toLowerCase();

  // 1. Assertive verbs
  if (/(shows|demonstrates|argues|presents|finds|proposes|introduces|describes)/.test(s)) {
    score += 2;
    reasons.push("Uses assertive academic language");
  }

  // 2. Topic overlap
  const overlap = nouns.filter(n => s.includes(n));
  if (overlap.length > 0) {
    score += Math.min(overlap.length, 3);
    reasons.push(`Mentions key topics: ${overlap.slice(0,3).join(", ")}`);
  }

  // 3. Position bonus
  if (index < total * 0.15) {
    score += 1;
    reasons.push("Appears early in the document");
  } else if (index > total * 0.85) {
    score += 1;
    reasons.push("Appears near the conclusion");
  }

  // 4. Length sweet spot
  const words = s.split(" ").length;
  if (words >= 10 && words <= 25) {
    score += 1;
    reasons.push("Optimal sentence length");
  }

  // 5. Vagueness penalty
  if (/(various|significant|important|many|several|some)/.test(s)) {
    score -= 2;
    reasons.push("Contains vague phrasing");
  }

  return { score, reasons };
}


function detectRole(sentence) {
  const s = sentence.toLowerCase();

  if (/is defined as|refers to|is a /.test(s)) return "definition";
  if (/we (show|argue|find|demonstrate)|this paper/.test(s)) return "claim";
  if (/we use|method|approach|algorithm/.test(s)) return "method";
  if (/results|data|experiment|analysis/.test(s)) return "evidence";
  if (/however|limitation|assumes|may not/.test(s)) return "limitation";

  return "other";
}



/* =========================
   SUMMARY ENGINE v1
   Deterministic, role-aware
   ========================= */

export function generateSummary(text) {
  if (!text || text.length < 100) {
    return {
      confident: false,
      fallbackSentences: []
    };
  }

  const sentences = extractSentences(text);
  const nouns = extractTopNouns(sentences);

  const scored = sentences.map((s, i) => ({
    text: s,
    index: i,
    score: scoreSentence(s, nouns, i, sentences.length),
    role: detectRole(s)
  }));

  scored.sort((a, b) => b.score - a.score);

  const top = scored.slice(0, 15);

  const core = selectCoreSummary(top, nouns);
  const confident = validateSummary(core, top);

  return {
    confident,
    coreSummary: confident ? core : null,
    keyPoints: confident ? buildKeyPoints(top) : [],
    assumptions: confident ? extractAssumptions(top) : [],
    fallbackSentences: confident ? [] : top.slice(0, 3).map(s => s.text)
  };
}


function selectCoreSummary(sentences, nouns) {
  const claim = sentences.find(s => s.role === "claim");
  const base = claim || sentences[0];

  const topic = nouns[0] || "the subject";
  const domain = nouns[1] || "the broader context";

  return `This text discusses ${topic} and argues that ${simplify(base.text)}, within the context of ${domain}.`;
}

function simplify(sentence) {
  return sentence
    .replace(/we (show|argue|find|demonstrate) that/i, "")
    .replace(/this paper/i, "")
    .trim();
}

function buildKeyPoints(sentences) {
  const points = [];

  ["claim", "method", "evidence"].forEach(role => {
    const s = sentences.find(x => x.role === role);
    if (s) points.push(s.text);
  });

  return points.slice(0, 3);
}

function extractAssumptionsFromSummary(sentences) {
  return sentences
    .filter(s => s.role === "limitation")
    .map(s => s.text)
    .slice(0, 2);
}

function validateSummary(core, sentences) {
  if (!core) return false;

  const claimExists = sentences.some(s => s.role === "claim");
  const diversity = new Set(sentences.map(s => s.index > 10)).size > 1;

  return claimExists && diversity;
}

let nounFrequency = {};

function extractTopNouns(sentences) {
  nounFrequency = {};

  sentences.forEach(s => {
    s.toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(" ")
      .filter(w => w.length > 4)
      .forEach(w => nounFrequency[w] = (nounFrequency[w] || 0) + 1);
  });

  return Object.entries(nounFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(x => x[0]);
}



function scorePhrase(phrase) {
  return NGRAMS[phrase.toLowerCase()] || 0;
}



function extractConcepts(text) {
  const words = text.toLowerCase().split(/\W+/);
  const bigrams = [];

  for (let i = 0; i < words.length - 1; i++) {
    bigrams.push(`${words[i]} ${words[i+1]}`);
  }

  const scored = bigrams
    .map(bg => ({ bg, score: scorePhrase(bg) }))
    .filter(x => x.score > 0.7)
    .sort((a,b) => b.score - a.score)
    .slice(0, 6)
    .map(x => x.bg);

  return [...new Set(scored)];
}


function extractClaims(sentences) {
  return sentences.filter(s =>
    /(shows|results in|leads to|suggests|demonstrates|we find)/i.test(s)
  );
}


function extractAssumptionsFromText(sentences) {
  return sentences.filter(s =>
    /(assume|assuming|may|might|under the condition)/i.test(s)
  );
}


export {
  generateSummary,
  extractConcepts,
  extractClaims,
  extractAssumptions
};
