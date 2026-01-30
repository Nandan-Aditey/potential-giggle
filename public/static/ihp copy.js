const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tooltip = document.getElementById("tooltip");
const container = document.getElementById("canvas-container");

const dpr = window.devicePixelRatio || 1;
const CANVAS_WIDTH = 3000;
const CANVAS_HEIGHT = 2000;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.style.width = CANVAS_WIDTH + "px";
canvas.style.height = CANVAS_HEIGHT + "px";

const center = { x: 1500, y: 1000 };
const pattern = [1, 0, 1, 1, 0, 1, 1, 2, 2, 0, 1, 0, 1];

const rPrimary = 400;
const rChild = 640;

const lines = [];
const nodes = [];
const nodeMap = {};
let hoveredNode = null;

const labels = {
  p1: "Attention Is All You Need",
  p2: "Scaling Laws for Neural Language Models",
  p3: "The Lottery Ticket Hypothesis",
  p4: "Neural Tangent Kernel",
  p5: "Double Descent",
  p6: "Implicit Bias of Gradient Descent",
  p7: "Understanding Deep Learning Generalization",
  p8: "Sharp Minima Can Generalize",
  p9: "Information Bottleneck Theory",
  p10: "On the Expressive Power of Deep Nets",
  p11: "Why Do Larger Models Generalize Better?",
  p12: "Deep Learning (Nature)",
  p13: "On the Role of Overparameterization",
  p14: "What Shapes the Loss Landscape?",
  p15: "A Survey of Deep Learning Theory"
};


const descriptions = {
  p1: "Introduced the Transformer architecture based on self-attention.",
  p2: "Demonstrates predictable power-law scaling of LLM performance.",
  p3: "Shows sparse subnetworks exist inside dense neural networks.",
  p4: "Connects infinitely wide neural nets to kernel methods.",
  p5: "Reveals a second descent regime beyond classical bias-variance.",
  p6: "Explains why gradient descent favors max-margin solutions.",
  p7: "Challenges classical generalization theory using random labels.",
  p8: "Argues sharpness alone cannot explain poor generalization.",
  p9: "Proposes learning as compression of task-relevant information.",
  p10: "Analyzes how depth increases representational power.",
  p11: "Explores why overparameterization improves generalization.",
  p12: "Foundational overview that established deep learning as a field.",
  p13: "Provides convergence guarantees for overparameterized networks.",
  p14: "Studies geometry of loss surfaces in deep networks.",
  p15: "Comprehensive overview of modern deep learning theory."
};


const fullDescriptions = {

  p1: `<strong>Attention Is All You Need</strong><br>
  <em>Vaswani et al., NeurIPS 2017</em><br><br>
  This paper introduced the Transformer architecture, replacing recurrence and convolutions with self-attention mechanisms. 
  By enabling parallel computation and long-range dependency modeling, Transformers became the backbone of modern language models such as BERT, GPT, and T5.
  Its core insight—that attention alone can model sequence relationships—fundamentally changed NLP and beyond.`,

  p2: `<strong>Scaling Laws for Neural Language Models</strong><br>
  <em>Kaplan et al., OpenAI</em><br><br>
  This work showed that model performance follows predictable power-law relationships with respect to model size, dataset size, and compute.
  It provided empirical grounding for scaling large models and influenced the design philosophy behind modern foundation models.`,

  p3: `<strong>The Lottery Ticket Hypothesis</strong><br>
  <em>Frankle & Carbin, ICLR 2019</em><br><br>
  The authors demonstrated that dense neural networks contain sparse subnetworks that, when trained in isolation, can match or exceed the original network’s performance.
  This challenged assumptions about redundancy and efficiency in deep learning.`,

  p4: `<strong>Neural Tangent Kernel</strong><br>
  <em>Jacot et al., NeurIPS 2018</em><br><br>
  This paper showed that infinitely wide neural networks behave like kernel methods during training.
  It enabled rigorous theoretical analysis of gradient descent and generalization in deep networks.`,

  p5: `<strong>Double Descent Risk Curve</strong><br>
  <em>Belkin et al., PNAS 2019</em><br><br>
  The authors discovered that test error decreases again after extreme overparameterization.
  This phenomenon contradicts the classical bias-variance tradeoff and reshaped how model complexity is understood.`,

  p6: `<strong>Implicit Bias of Gradient Descent</strong><br>
  <em>Soudry et al., ICLR 2018</em><br><br>
  This work showed that gradient descent converges to max-margin classifiers even without explicit regularization.
  It helped explain why unregularized deep networks can still generalize well.`,

  p7: `<strong>Understanding Deep Learning Requires Rethinking Generalization</strong><br>
  <em>Zhang et al., ICLR 2017</em><br><br>
  By showing that neural networks can perfectly fit random labels, this paper challenged classical statistical learning theory
  and sparked renewed interest in understanding generalization mechanisms.`,

  p8: `<strong>Sharp Minima Can Generalize</strong><br>
  <em>Dinh et al., ICML 2017</em><br><br>
  This paper argued that sharpness of minima is not invariant to parameterization,
  questioning widely used heuristics for explaining generalization.`,

  p9: `<strong>Information Bottleneck Theory of Deep Learning</strong><br>
  <em>Tishby & Zaslavsky</em><br><br>
  Proposes that deep networks learn compressed representations that preserve information relevant to prediction.
  While influential, the theory remains debated and actively researched.`,

  p10: `<strong>On the Expressive Power of Neural Networks</strong><br>
  <em>Raghu et al., ICML 2017</em><br><br>
  The paper analyzes how depth contributes exponentially more expressivity than width,
  providing theoretical justification for deep architectures.`,

  p11: `<strong>Why Do Larger Models Generalize Better?</strong><br>
  <em>Nakkiran et al., NeurIPS 2020</em><br><br>
  Explores the counterintuitive observation that larger models often generalize better,
  tying together empirical findings with theoretical insights.`,

  p12: `<strong>Deep Learning</strong><br>
  <em>LeCun, Bengio, Hinton, Nature 2015</em><br><br>
  A landmark survey that unified neural networks, representation learning, and optimization.
  This paper cemented deep learning as a central paradigm in AI.`,

  p13: `<strong>On the Role of Overparameterization</strong><br>
  <em>Allen-Zhu et al.</em><br><br>
  Provides theoretical guarantees for convergence and generalization in heavily overparameterized networks,
  helping bridge practice and theory.`,

  p14: `<strong>What Shapes the Loss Landscape?</strong><br>
  <em>Chaudhari & Soatto</em><br><br>
  Analyzes how optimization geometry, noise, and flatness interact,
  offering insights into why certain training procedures generalize better.`,

  p15: `<strong>A Survey of Deep Learning Theory</strong><br>
  <em>Zhang et al., Foundations & Trends</em><br><br>
  A comprehensive survey of theoretical tools used to analyze deep learning,
  covering optimization, expressivity, generalization, and implicit bias.`
};

const paperTypes = {
  p1: "foundation",   // Transformers
  p2: "empirical",    // Scaling laws
  p3: "theory",       // Lottery ticket
  p4: "theory",       // NTK
  p5: "theory",       // Double descent
  p6: "theory",       // Implicit bias
  p7: "theory",       // Rethinking generalization
  p8: "theory",       // Sharp minima
  p9: "theory",       // Information bottleneck
  p10: "theory",      // Expressivity
  p11: "empirical",   // Larger models generalize
  p12: "survey",      // Deep Learning (Nature)
  p13: "theory",      // Overparameterization
  p14: "theory",      // Loss landscape
  p15: "survey"       // DL theory survey
};


const peopleImages = {
  "c8.1": "https://static.igem.wiki/teams/6006/faceless/profile-photo-placeholder-square-svg.avif",
  "bioprime": "https://static.igem.wiki/teams/6006/faceless/profile-photo-placeholder-square-svg.avif",
  "utkarsh ghate": "https://static.igem.wiki/teams/6006/ihppictures/utkarsh-ghate.avif",
  "c3.1": "https://static.igem.wiki/teams/6006/ihppictures/shantamurthy.avif",
  "c11.1": "https://static.igem.wiki/teams/6006/ihppictures/ramesh-vaidyanathan.avif",
  "radhika ghate": "https://static.igem.wiki/teams/6006/ihppictures/radhika-ghate.avif",
  "girish": "https://static.igem.wiki/teams/6006/ihppictures/girish-k.avif",
  "gaurang": "https://static.igem.wiki/teams/6006/ihppictures/gaurangk.avif",
  n1: "https://static.igem.wiki/teams/6006/wiki/ihp/additionalphotos/nagasuma-chandra.avif",
  n2: "https://static.igem.wiki/teams/6006/wiki/ihp/abhishek-sirohiwal.webp",
  n3: "https://static.igem.wiki/teams/6006/ihppictures/shekar-muddu.avif",
  n4: "https://static.igem.wiki/teams/6006/ihppictures/dipshikha-1-scaled.avif",
  n8: "https://static.igem.wiki/teams/6006/ihppictures/bitasta-das.avif",
  'c1.1':"https://static.igem.wiki/teams/6006/wiki/ihp/aditya-chedere.webp",
  'c6.1': "https://static.igem.wiki/teams/6006/wiki/ihp/elhassan-emam-2.webp",
  "ashish wele": "https://static.igem.wiki/teams/6006/ihppictures/ashish-wele.avif",
  "prakash rao": "https://static.igem.wiki/teams/6006/ihppictures/evs-prakasa-rao.avif",
  "GT Puthra": "https://static.igem.wiki/teams/6006/wiki/ihp/gt-puthra.webp",
  "c9.2": "https://static.igem.wiki/teams/6006/ihppictures/jagdish.avif",
  "Jatin Kaaimani": "https://static.igem.wiki/teams/6006/ihppictures/jatinkhaimani.avif",
  "c4.1": "https://static.igem.wiki/teams/6006/wiki/ihp/kapudeep-karmakar.webp",
  n9: "https://static.igem.wiki/teams/6006/ihppictures/karthikshanker.avif",
  "Lavanya Bhagavantula": "https://static.igem.wiki/teams/6006/ihppictures/lavanya.avif",
  n11: "https://static.igem.wiki/teams/6006/ihppictures/mahavir-singh.avif",
  "Mahendra Shahare": "https://static.igem.wiki/teams/6006/wiki/ihp/additionalphotos/dr-mahendra-shahare.avif",
  "N raghuram": "https://static.igem.wiki/teams/6006/wiki/ihp/n-raghuram.webp",
  n7: "https://static.igem.wiki/teams/6006/ihppictures/samay-pande-1715231198.avif",
  n6: "https://static.igem.wiki/teams/6006/wiki/ihp/varshney.webp",
  "Anuradha Cariappa": "https://static.igem.wiki/teams/6006/wiki/ihp/birdy.avif",
  "c9.1": "https://static.igem.wiki/teams/6006/ihppictures/priyanka-jamwal.avif",
  "Ramesh Chand": "https://static.igem.wiki/teams/6006/wiki/remainingpics/ramesh-chand.avif",
  "richa kumar": "https://static.igem.wiki/teams/6006/wiki/remainingpics/richa-kumar.avif",
  "c7.1": "https://static.igem.wiki/teams/6006/wiki/remainingpics/saheli-saha.avif",
  "Shambhavi Naik": "https://static.igem.wiki/teams/6006/wiki/remainingpics/shambhavi-naik.avif",
  "c13.1": "https://static.igem.wiki/teams/6006/ihppictures/suchiridiptabhattacharjee.avif",
  n5: "https://static.igem.wiki/teams/6006/ihppictures/bagchi-final.avif",
  n12: "https://static.igem.wiki/teams/6006/ihppictures/tvramachadnra.avif",
  n10: "https://static.igem.wiki/teams/6006/wiki/remainingpics/varsha-jaisimha.avif",
  "AIIM": "https://static.igem.wiki/teams/6006/wiki/ihp/additionalphotos/aiim.avif",
  n13: "https://static.igem.wiki/teams/6006/wiki/ihp/additionalphotos/dst-iisc.avif",
  "GEAC": "https://static.igem.wiki/teams/6006/wiki/ihp/additionalphotos/geac.avif",
  IISc: "https://static.igem.wiki/teams/6006/wiki/ihp/additionalphotos/iisc.avif",
  "c8.2": "https://static.igem.wiki/teams/6006/ihppictures/karthik-ram-jpg.webp",
  "ss agarwal": "https://static.igem.wiki/teams/6006/wiki/ihp/additionalphotos/shyam-sundar-agrawal.avif",
  "UoA Bangalore": "https://static.igem.wiki/teams/6006/wiki/ihp/additionalphotos/uas-bangalore.avif",
};

// Helper to preload images
function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

// Build nodes
const centerNode = { x: center.x, y: center.y, r: 60, key: "IISc" };
nodes.push(centerNode);
nodeMap["IISc"] = centerNode;



for (let i = 0; i < 13; i++) {
  const angle = (i / 13) * Math.PI * 2 - Math.PI / 2;
  const px = center.x + rPrimary * Math.cos(angle);
  const py = center.y + rPrimary * Math.sin(angle);
  const childCount = pattern[i];
  const nodeKey = `n${i + 1}`;

  const primaryNode = { x: px, y: py, r: 40, key: nodeKey };
  nodes.push(primaryNode);
  lines.push([center.x, center.y, px, py]);
  nodeMap[nodeKey] = primaryNode;

  if (childCount > 0) {
    const spread = childCount === 1 ? 0 : (20 * Math.PI) / 180;
    for (let j = 0; j < childCount; j++) {
      const offset = (j - (childCount - 1) / 2) * spread;
      const chAngle = angle + offset;
      const cx = center.x + rChild * Math.cos(chAngle);
      const cy = center.y + rChild * Math.sin(chAngle);
      const childKey = `c${i + 1}.${j + 1}`;
      const childNode = { x: cx, y: cy, r: 40, key: childKey };
      nodes.push(childNode);
      lines.push([px, py, cx, cy]);
      nodeMap[childKey] = childNode;
    }
  }
}

// ====== AIIM Network ======
const varshaNode = nodeMap["n10"];
const aiimCenter = { x: varshaNode.x - 600, y: varshaNode.y - 200, r: 60, key: "AIIM" };
nodes.push(aiimCenter);
nodeMap["AIIM"] = aiimCenter;
lines.push([aiimCenter.x, aiimCenter.y, varshaNode.x, varshaNode.y]);

const aiimTree = [
  {
    key: "Lavanya Bhagavantula",
    children: ["GEAC"]
  },
  {
    key: "Jatin Kaaimani",
    children: [
      {
        key: "Shambhavi Naik",
      }
    ]
  }
];

function addNestedNodes(parentNode, treeNodes, radius = 300) {
  const angleStep = (2 * Math.PI) / treeNodes.length;
  treeNodes.forEach((nodeObj, i) => {
    const angle = i * angleStep - Math.PI / 4 + i*Math.PI/8;
    const px = parentNode.x + radius * Math.cos(angle);
    const py = parentNode.y + radius * Math.sin(angle);
    const node = { x: px, y: py, r: 40, key: nodeObj.key };
    nodes.push(node);
    nodeMap[nodeObj.key] = node;
    lines.push([parentNode.x, parentNode.y, px, py]);

    if (nodeObj.children && nodeObj.children.length > 0) {
      const subTree = nodeObj.children.map(c => typeof c === "string" ? { key: c, children: [] } : c);
      addNestedNodes(node, subTree, 180);
    }
  });
}

addNestedNodes(aiimCenter, aiimTree, 300);

// ====== Utkarsh Ghate Island ======
let baseX = center.x - 600, baseY = center.y + 700;
const spacing = 180;

if (!nodeMap["utkarsh ghate"]) {
  const utNode = { x: baseX, y: baseY, r: 38, key: "utkarsh ghate" };
  nodes.push(utNode);
  nodeMap["utkarsh ghate"] = utNode;
}

if (!nodeMap["prakash rado"]) {
  const utNode = { x: baseX+100, y: baseY-100, r: 38, key: "prakash rao" };
  nodes.push(utNode);
  nodeMap["prakash rao"] = utNode;
}

const utChildren = [
  "ashish wele",
  "bioprime",
  "gaurang"
];

utChildren.forEach((child, i) => {
  const parentNode = nodeMap["utkarsh ghate"];
  const node = { x: parentNode.x - spacing, y: parentNode.y - i * spacing, r: 38, key: child };
  nodes.push(node);
  nodeMap[child] = node;
  lines.push([parentNode.x, parentNode.y, node.x, node.y]);
});

if (!nodeMap["radhika ghate"]) {
  const node = { x: baseX + spacing/3, y: baseY + utChildren.length * spacing/3, r: 38, key: "radhika ghate" };
  nodes.push(node);
  nodeMap["radhika ghate"] = node;
  lines.push([nodeMap["utkarsh ghate"].x, nodeMap["utkarsh ghate"].y, node.x, node.y]);
}

const surveysNode = { x: nodeMap["gaurang"].x + spacing, y: nodeMap["gaurang"].y, r: 38, key: "girish" };
nodes.push(surveysNode);
nodeMap["girish"] = surveysNode;
lines.push([nodeMap["gaurang"].x, nodeMap["gaurang"].y, surveysNode.x, surveysNode.y]);

// ====== Richa Kumar Island ======
const richaEdges = [
  { parent: "richa kumar", child: "N raghuram" },
  { parent: "richa kumar", child: "Mahendra Shahare" }
];

baseX = center.x + 600;
baseY = center.y + 300;

richaEdges.forEach((edge, i) => {
  if (!nodeMap[edge.parent]) {
    const node = { x: baseX, y: baseY, r: 38, key: edge.parent };
    nodes.push(node);
    nodeMap[edge.parent] = node;
  }
  if (!nodeMap[edge.child]) {
    const parentNode = nodeMap[edge.parent];
    const node = { 
      x: parentNode.x + spacing, 
      y: parentNode.y + i * spacing,
      r: 38, 
      key: edge.child 
    };
    nodes.push(node);
    nodeMap[edge.child] = node;
    lines.push([parentNode.x, parentNode.y, node.x, node.y]);
  }
});

// ====== University of Agriculture Bangalore ======
const kabodeepNode = nodeMap["c4.1"];
const uabNode = { x: kabodeepNode.x + 250, y: kabodeepNode.y - 350, r: 60, key: "UoA Bangalore" };
nodes.push(uabNode);
nodeMap["UoA Bangalore"] = uabNode;
lines.push([uabNode.x, uabNode.y, kabodeepNode.x, kabodeepNode.y]);

const uabTree = [
  {
    key: "Anuradha Cariappa",
    children: ["GT Puthra"]
  },
  {
    key: "Ramesh Chand",
    children: ["ss agarwal"]
  }
];

function addNestedNodesUAB(parentNode, treeNodes, radius = 250) {
  const angleStep = (2 * Math.PI) / treeNodes.length;
  treeNodes.forEach((nodeObj, i) => {
    const angle = i * angleStep - Math.PI / 5 + i * Math.PI / 6;
    const px = parentNode.x + radius * Math.cos(angle);
    const py = parentNode.y + radius * Math.sin(angle);
    const node = { x: px, y: py, r: 40, key: nodeObj.key };
    nodes.push(node);
    nodeMap[nodeObj.key] = node;
    lines.push([parentNode.x, parentNode.y, px, py]);

    if (nodeObj.children && nodeObj.children.length > 0) {
      const subTree = nodeObj.children.map(c => typeof c === "string" ? { key: c, children: [] } : c);
      addNestedNodesUAB(node, subTree, 250);
    }
  });
}

addNestedNodesUAB(uabNode, uabTree, 250);

if (nodeMap["ss agarwal"] && nodeMap["GEAC"]) {
  lines.push([nodeMap["ss agarwal"].x, nodeMap["ss agarwal"].y, nodeMap["GEAC"].x, nodeMap["GEAC"].y]);
}

function centerOnIISc() {
  const container = document.getElementById("canvas-container");
  const iiscNode = nodeMap["IISc"];
  if (!container || !iiscNode) return;

  const scaledX = iiscNode.x;
  const scaledY = iiscNode.y;

  requestAnimationFrame(() => {
    container.scrollLeft = scaledX - container.clientWidth / 2;
    container.scrollTop = scaledY - container.clientHeight / 2;
  });
}

// Preload images, render canvas, then scroll to IISc
Promise.all(
  nodes.map(async (n) => {
    if (peopleImages[n.key]) {
      n.img = await loadImage(peopleImages[n.key]);
    }
  })
).then(() => {
  render();
  window.addEventListener("load", () => {
    setTimeout(centerOnIISc, 100);
  });
});

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw lines
  ctx.strokeStyle = "#888";
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.7;
  for (const [x1, y1, x2, y2] of lines) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Draw nodes
  for (const n of nodes) {
  const radius = n.r;
  const isHovered = n === hoveredNode;

  // Special highlight for IISc
  if (n.key === "IISc") {
    const gradient = ctx.createRadialGradient(n.x, n.y, radius * 0.2, n.x, n.y, radius * 2);
    gradient.addColorStop(0, "rgba(110,0,179,0.4)");
    gradient.addColorStop(1, "rgba(110,0,179,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(n.x, n.y, radius * 2.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Hover glow effect
  if (isHovered) {
    ctx.shadowColor = "rgba(79, 70, 229, 0.6)";
    ctx.shadowBlur = 20;
  }

  ctx.save();
  ctx.beginPath();
  const hoverRadius = isHovered ? radius * 1.1 : radius;
  ctx.arc(n.x, n.y, hoverRadius, 0, Math.PI * 2);
  ctx.clip();

    if (n.img) {
      ctx.drawImage(n.img, n.x - hoverRadius, n.y - hoverRadius, hoverRadius * 2, hoverRadius * 2);
    } else {
      ctx.fillStyle = isHovered ? "#6366F1" : "#4F46E5";
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(labels[n.key] || n.key, n.x, n.y);
    }
    ctx.restore();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Optional outline
    ctx.strokeStyle = isHovered ? "#4F46E5" : "#333";
    ctx.lineWidth = isHovered ? 2 : 1;
    ctx.beginPath();
    ctx.arc(n.x, n.y, hoverRadius, 0, Math.PI * 2);
    ctx.stroke();
  }
}

// Tooltip with hover effect on nodes
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  let hover = null;

  for (const n of nodes) {
    const dx = mx - n.x, dy = my - n.y;
    if (Math.sqrt(dx * dx + dy * dy) < n.r) { hover = n; break; }
  }

  // Update hover state
  if (hover !== hoveredNode) {
    hoveredNode = hover;
    render();
  }

  // Update cursor
  canvas.style.cursor = hover ? "pointer" : "default";

  if (hover) {
    tooltip.style.display = "block";
    tooltip.innerHTML = `<strong>${labels[hover.key]}</strong><br>${descriptions[hover.key] || ''}`;
    
    // Position tooltip beside the node
    tooltip.style.left = (hover.x + 20) + "px";
    tooltip.style.top = (hover.y - tooltip.offsetHeight / 2) + "px";
    const containerRect = container.getBoundingClientRect();
    // tooltip.style.left = (containerRect.left + hover.x + 20 - container.scrollLeft) + "px";
    // tooltip.style.top = (containerRect.top + hover.y - tooltip.offsetHeight / 2 - container.scrollTop) + "px";

  } else {
    tooltip.style.display = "none";
  }

});

// Modal logic
const modal = document.getElementById("person-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const closeModal = document.getElementById("close-modal");

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  if (hoveredNode) {
    tooltip.style.display = "none";
    hoveredNode = null;
    render();
  }

  for (const n of nodes) {
    const dx = mx - n.x, dy = my - n.y;
    if (Math.sqrt(dx * dx + dy * dy) < n.r) {
      modalTitle.textContent = labels[n.key] || n.key;
      modalDesc.innerHTML = fullDescriptions[n.key] || descriptions[n.key] || "";
      modal.classList.remove("hidden");
      return;
    }
  }
});

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

