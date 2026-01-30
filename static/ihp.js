const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tooltip = document.getElementById("tooltip");
const container = document.getElementById("canvas-container");

const dpr = window.devicePixelRatio || 1;
const CANVAS_WIDTH = 3000;
const CANVAS_HEIGHT = 3000;

const camera = {
  x: 0,
  y: 0
};


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

const ICON_PATHS = {
  foundation: new Path2D("M0 -10 L10 0 L0 10 L-10 0 Z"),        // Diamond
  theory: new Path2D("M-8 -5 L0 -10 L8 -5 L8 5 L0 10 L-8 5 Z"), // Hex
  empirical: [
    new Path2D("M-6 6 L-6 -2 L-2 -2 L-2 6 Z"),
    new Path2D("M-1 6 L-1 -6 L3 -6 L3 6 Z"),
    new Path2D("M4 6 L4 -1 L8 -1 L8 6 Z")
  ],
  survey: [
    new Path2D("M-7 -6 L7 -6 L7 -2 L-7 -2 Z"),
    new Path2D("M-7 -1 L7 -1 L7 3 L-7 3 Z"),
    new Path2D("M-7 4 L7 4 L7 8 L-7 8 Z")
  ]
};


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



// Build nodes
const centerNode = { x: center.x, y: center.y, r: 60, key: "IISc", isCenter: true };
nodes.push(centerNode);
nodeMap.CENTER = centerNode;
nodeMap["IISc"] = centerNode;

Object.assign(labels, {
  p1: "Attention Is All You Need",
  p2: "Scaling Laws for LMs",
  p3: "Lottery Ticket Hypothesis",
  p4: "Neural Tangent Kernel",
  p5: "Double Descent",
  p6: "Rethinking Generalization",
  p7: "Implicit Bias of GD",
  p8: "Sharp Minima",
  p9: "Information Bottleneck",
  p10: "Expressive Power of NNs",
  p11: "Why Bigger Models Generalize",
  p12: "Deep Learning (Nature)",
  p13: "Overparameterization",
  p14: "Loss Landscape Geometry",
  p15: "Survey of DL Theory"
});

Object.assign(descriptions, {
  p1: "Introduced the Transformer architecture.",
  p2: "Power-law scaling of loss with data, compute, and parameters.",
  p3: "Sparse subnetworks explain generalization.",
  p4: "Infinite-width networks behave like kernels.",
  p5: "Modern bias–variance curve.",
  p6: "Deep nets can fit random labels.",
  p7: "GD converges to max-margin solutions.",
  p8: "Sharpness alone doesn't explain generalization.",
  p9: "Compression-based learning theory.",
  p10: "Depth drives representational power.",
  p11: "Overparameterization improves generalization.",
  p12: "Foundational DL survey.",
  p13: "Convergence guarantees for wide networks.",
  p14: "Optimization geometry matters.",
  p15: "Overview of modern DL theory."
});

Object.assign(fullDescriptions, {
  p1: `<strong>Attention Is All You Need</strong><br>
  <em>Vaswani et al., NeurIPS 2017</em><br><br>
  This paper introduced the Transformer architecture, fundamentally changing how sequence data is modeled.
  By replacing recurrence and convolution entirely with self-attention, it enabled models to capture long-range
  dependencies more efficiently and to be trained in parallel. The key innovation—scaled dot-product attention
  combined with multi-head attention—allowed different representation subspaces to be attended to simultaneously.
  Transformers rapidly became the backbone of modern NLP systems, including BERT, GPT, T5, and beyond, and later
  influenced architectures in vision, speech, biology, and reinforcement learning.`,

  p2: `<strong>Scaling Laws for Neural Language Models</strong><br>
  <em>Kaplan et al., OpenAI</em><br><br>
  This work empirically demonstrated that language model performance follows smooth power-law relationships
  with respect to model size, dataset size, and training compute. Rather than saturating, loss continues to
  decrease predictably as scale increases, provided resources are balanced correctly. These findings reshaped
  how large models are designed and trained, motivating the trend toward ever-larger foundation models and
  providing practical guidance for allocating compute budgets efficiently.`,

  p3: `<strong>The Lottery Ticket Hypothesis</strong><br>
  <em>Frankle & Carbin, ICLR 2019</em><br><br>
  The authors showed that within large, randomly initialized neural networks exist sparse subnetworks—“winning
  tickets”—that can be trained to match or exceed the performance of the full model when initialized correctly.
  This challenged the notion that overparameterization is inherently necessary throughout training, suggesting
  that optimization dynamics and initialization play a crucial role. The hypothesis sparked extensive follow-up
  work on pruning, sparsity, training dynamics, and the structure of neural representations.`,

  p4: `<strong>Neural Tangent Kernel</strong><br>
  <em>Jacot et al., NeurIPS 2018</em><br><br>
  This paper established a precise connection between infinitely wide neural networks and kernel methods.
  It showed that, in the infinite-width limit, gradient descent training corresponds to kernel regression with
  a deterministic kernel—the Neural Tangent Kernel (NTK). This result enabled rigorous theoretical analysis of
  optimization and generalization in deep networks, providing a bridge between classical learning theory and
  modern deep learning, while also highlighting the gap between infinite-width theory and finite-width practice.`,

  p5: `<strong>Double Descent Risk Curve</strong><br>
  <em>Belkin et al., PNAS 2019</em><br><br>
  This work revealed that test error does not necessarily increase monotonically with model complexity.
  Instead, after reaching an interpolation threshold where training error becomes zero, test error can decrease
  again as models become more overparameterized. This “double descent” phenomenon contradicts classical
  bias–variance tradeoff intuition and helped explain why large, highly overparameterized models can generalize
  well despite fitting the training data perfectly.`,

  p6: `<strong>Understanding Deep Learning Requires Rethinking Generalization</strong><br>
  <em>Zhang et al., ICLR 2017</em><br><br>
  This paper demonstrated that deep neural networks can perfectly fit random labels and noise, even while
  maintaining high capacity. These results challenged traditional complexity-based explanations of generalization
  and suggested that classical statistical learning theory alone is insufficient to explain deep learning
  performance. The work catalyzed a shift toward studying optimization dynamics, implicit regularization, and
  data-dependent explanations of generalization.`,

  p7: `<strong>Implicit Bias of Gradient Descent</strong><br>
  <em>Soudry et al., ICLR 2018</em><br><br>
  The authors showed that for linearly separable data, gradient descent on logistic loss converges to the
  maximum-margin solution, even without explicit regularization. This revealed that optimization algorithms
  themselves impose an implicit bias on the learned solution. The paper provided a foundational explanation
  for why unregularized models can still generalize well and inspired extensive work on implicit bias in deep
  nonlinear networks.`,

  p8: `<strong>Sharp Minima Can Generalize</strong><br>
  <em>Dinh et al., ICML 2017</em><br><br>
  This paper questioned the widely held belief that flat minima necessarily correspond to better generalization.
  By showing that sharpness can be manipulated through reparameterization without affecting generalization
  performance, the authors argued that sharpness alone is not a robust explanatory metric. The work highlighted
  the importance of invariance and representation when analyzing loss landscapes and generalization heuristics.`,

  p9: `<strong>Information Bottleneck Theory of Deep Learning</strong><br>
  <em>Tishby & Zaslavsky</em><br><br>
  This theory proposes that deep neural networks learn representations by compressing input information while
  preserving information relevant to the target labels. Training is described as having two phases: fitting and
  compression. Although the theory remains debated and its empirical validity is contested, it provided an
  influential information-theoretic perspective on representation learning and sparked significant discussion
  about what neural networks optimize beyond empirical risk.`,

  p10: `<strong>On the Expressive Power of Neural Networks</strong><br>
  <em>Raghu et al., ICML 2017</em><br><br>
  This paper analyzed how network depth affects representational capacity, showing that deeper networks can
  represent certain functions exponentially more efficiently than shallow ones. Using measures such as trajectory
  length and input-space partitioning, the authors provided theoretical justification for why depth is a crucial
  component of modern neural architectures, beyond mere parameter count.`,

  p11: `<strong>Why Do Larger Models Generalize Better?</strong><br>
  <em>Nakkiran et al., NeurIPS 2020</em><br><br>
  This work explored the counterintuitive observation that increasing model size often improves generalization.
  By connecting empirical findings such as double descent with theoretical insights, the authors showed that
  overparameterization can simplify optimization and lead to better solutions. The paper helped unify seemingly
  contradictory observations about model capacity, interpolation, and generalization in modern deep learning.`,

  p12: `<strong>Deep Learning</strong><br>
  <em>LeCun, Bengio, Hinton, Nature 2015</em><br><br>
  This landmark survey unified decades of work on neural networks, representation learning, and optimization.
  It articulated the principles behind deep architectures, highlighted their successes across vision, speech,
  and language, and laid out key challenges for the field. The paper played a major role in establishing deep
  learning as a dominant paradigm in artificial intelligence research and practice.`,

  p13: `<strong>On the Role of Overparameterization</strong><br>
  <em>Allen-Zhu et al.</em><br><br>
  This line of work provided theoretical guarantees for optimization and convergence in heavily overparameterized
  neural networks. By analyzing gradient descent dynamics under strong overparameterization assumptions, the
  authors showed that such networks can be easier to optimize than smaller ones. These results helped explain
  why large neural networks are not only expressive but also practically trainable.`,

  p14: `<strong>What Shapes the Loss Landscape?</strong><br>
  <em>Chaudhari & Soatto</em><br><br>
  This paper studied the geometry of loss landscapes in deep learning and how factors such as noise, batch size,
  and optimization algorithms influence the solutions found during training. The authors argued that properties
  of the optimization process shape the effective landscape explored by the model, providing insights into why
  certain training regimes lead to better generalization.`,

  p15: `<strong>A Survey of Deep Learning Theory</strong><br>
  <em>Zhang et al., Foundations & Trends</em><br><br>
  This comprehensive survey reviewed the main theoretical tools used to analyze deep learning, including
  expressivity, optimization, generalization, implicit bias, and dynamics of training. By synthesizing results
  across theory and practice, it provided a structured overview of what is understood—and what remains open—about
  why deep learning works, serving as a key reference for researchers entering the field.`
});


const paperMeta = {
  p1: { year: 2017, type: "foundation" },
  p2: { year: 2020, type: "empirical" },
  p3: { year: 2019, type: "theory" },
  p4: { year: 2018, type: "theory" },
  p5: { year: 2019, type: "theory" },
  p6: { year: 2017, type: "theory" },
  p7: { year: 2017, type: "theory" },
  p8: { year: 2017, type: "theory" },
  p9: { year: 2015, type: "theory" },
  p10: { year: 2017, type: "theory" },
  p11: { year: 2020, type: "empirical" },
  p12: { year: 2015, type: "survey" },
  p13: { year: 2018, type: "theory" },
  p14: { year: 2018, type: "theory" },
  p15: { year: 2021, type: "survey" }
};

const centerMeta = {
  label: "Project",
  subtitle: "Research Map",
  icon: "hub" // custom icon
};

function drawCenterIcon(ctx, x, y) {
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.arc(x, y, 8, 0, Math.PI * 2);
  ctx.stroke();

  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 14 * Math.cos(a), y + 14 * Math.sin(a));
    ctx.stroke();
  }
}



// ---- Build paper nodes around IISc ----

const paperRadius = 650;
const paperKeys = Object.keys(paperTypes);

paperKeys.forEach((key, i) => {
  const angle = (i / paperKeys.length) * Math.PI * 2 - Math.PI / 2;
  const x = center.x + paperRadius * Math.cos(angle);
  const y = center.y + paperRadius * Math.sin(angle);

  const node = {
    x,
    y,
    r: 36,
    key,
    type: paperMeta[key].type,
    year: paperMeta[key].year,
    isPaper: true,
    isCenter: false
  };

  nodes.push(node);
  nodeMap[key] = node;

  // Only foundational & survey papers connect to IISc
  if (paperTypes[key] === "foundation" || paperTypes[key] === "survey") {
    lines.push([center.x, center.y, x, y]);
  }
});


// ---- Meaningful paper–paper links ----

function connectPapers(a, b) {
  if (nodeMap[a] && nodeMap[b]) {
    lines.push([
      nodeMap[a].x, nodeMap[a].y,
      nodeMap[b].x, nodeMap[b].y
    ]);
  }
}

// Architecture & scaling
connectPapers("p1", "p2");
connectPapers("p2", "p11");

// Generalization theory
connectPapers("p6", "p5");
connectPapers("p5", "p11");

// Optimization theory
connectPapers("p7", "p13");
connectPapers("p13", "p6");

// Loss landscape
connectPapers("p14", "p8");

// Representation
connectPapers("p9", "p10");

// Surveys as bridges
connectPapers("p12", "p1");
connectPapers("p15", "p6");
connectPapers("p15", "p4");


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

    if (hover.isCenter) {
      tooltip.innerHTML = `
        <strong>${centerMeta.label}</strong><br>
        <span class="opacity-80">${centerMeta.subtitle}</span>
      `;
    } else {
      tooltip.innerHTML = `
        <strong>${labels[hover.key]}</strong><br>
        ${descriptions[hover.key] || ""}
      `;
    }
    
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

if (modal && closeModal && modalTitle && modalDesc) {
  closeModal.addEventListener("click", () =>
    modal.classList.add("hidden")
  );

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
}

function drawIcon(ctx, type, x, y) {
  ctx.save();
  ctx.translate(x, y);

  ctx.fillStyle = "rgba(255,255,255,0.9)";

  const icon = ICON_PATHS[type];

  if (Array.isArray(icon)) {
    icon.forEach(p => ctx.fill(p));
  } else if (icon) {
    ctx.fill(icon);
  }

  ctx.restore();
}


function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw lines
  ctx.strokeStyle = "#999";
  ctx.lineWidth = 2;
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
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);

    if (n.isCenter) {
      // Outer ring
      ctx.beginPath();
      ctx.arc(n.x - camera.x, n.y - camera.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = "#0f172a"; // slate-900
      ctx.fill();
      ctx.strokeStyle = "#64748b";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Icon
      drawCenterIcon(ctx, n.x - camera.x, n.y - camera.y - 8);

      // Title
      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(centerMeta.label, n.x - camera.x, n.y - camera.y + 10);

      // Subtitle
      ctx.font = "10px system-ui";
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillText(
        centerMeta.subtitle,
        n.x - camera.x,
        n.y - camera.y + 24
      );

      continue; // skip normal paper rendering
    }


    // Color by paper type
    if (n.isPaper) {
      switch (n.type) {
        case "foundation": ctx.fillStyle = "#F59E0B"; break;
        case "survey": ctx.fillStyle = "#10B981"; break;
        case "empirical": ctx.fillStyle = "#3B82F6"; break;
        case "theory": ctx.fillStyle = "#6366F1"; break;
        default: ctx.fillStyle = "#64748B";
      }
    } else {
      ctx.fillStyle = "#7C3AED"; // IISc / project
    }

    ctx.fill();
    ctx.strokeStyle = "#222";
    ctx.stroke();

    // Icon
      // ctx.fillStyle = "#fff";
      // ctx.font = "bold 18px system-ui, -apple-system, BlinkMacSystemFont";
      // ctx.textAlign = "center";
      // ctx.textBaseline = "middle";

      // const meta = paperMeta[n.key];
      // if (meta) {
      //   ctx.fillText(meta.icon, n.x, n.y - 6);

      //   // Year
      //   ctx.font = "10px system-ui, -apple-system";
      //   ctx.fillStyle = "rgba(255,255,255,0.85)";
      //   ctx.fillText(meta.year, n.x, n.y + 10);
      // }
      // Draw icon
      if (n.isPaper) {
        drawIcon(ctx, n.type, n.x, n.y - 6);

        ctx.font = "10px system-ui, -apple-system";
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (n.year) {
          ctx.fillText(n.year, n.x, n.y + 12);
        }
      }

      // ---- HOVER GLOW (ADD THIS) ----
      if (hoveredNode === n) {
        ctx.shadowColor = "rgba(255, 255, 255, 0.45)";
        ctx.shadowBlur = 14;
      } else {
        ctx.shadowBlur = 0;
      }
      // --------------------------------
  }
}

console.log(canvas.getBoundingClientRect());
render();
requestAnimationFrame(render);