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
  IISc: "IISc",
  n1: "Dr. Nagasuma Chandra",
  n2: "Dr. Abhishek Sirohiwal",
  n3: "Sekhar Muddu",
  n4: "Dr. Dipshikha Chakravortty",
  n5: "Dr. Sumanta Bagchi",
  n6: "Umesh Varshney",
  n7: "Samay Pande",
  n8: "Bitasata Das",
  n9: "Karthik Shanker",
  n10: "Varsha Jaisimha",
  n11: "Mahavir Singh",
  n12: "Dr. T. V. Ramachandra",
  n13: "Department of Science and Technology",
  "c1.1": "Adithya Chedere",
  "c3.1": "Shanthamurthy",
  "c4.1": "Kapudeep Karmakar",
  "c6.1": "Hasan",
  "c7.1": "Saheli Saha",
  "c8.1": "Dr. Ramamohan Lohia",
  "c8.2": "Dr. Karthik Ramaswamy",
  "c9.2": "Jagadish Krishnaswamy",
  "c11.1": "Ramesh Vaidyanathan",
  "c13.1": "Suchiradipta Bhattacharjee",
  "ss agarwal": "Shyam Sundar Agrawal",
  "GT Puthra": "Dr. G.T. Puthra",
  "bioprime": "Dr. Rahul Jog",
  "gaurang": "Gaurang Kulkarni",
  "utkarsh ghate": "Utkarsh Ghate",
  "Lavanya Bhagavantula": "Dr. Lavanya Bhagavatula",
  "c9.1": "Dr. Priyanka Jamwal",
  "c13.1": "Dr. Suchiradipta Bhattacharjee",
  "Mahendra Shahare": "Dr. Mahendra Shahare",
  "c3.1": "Shanthamurthy",
  "AIIM": "All India iGEM Meet",
  "Shambhavi Naik": "Shambhavi Naik",
  "UoA Bangalore": "University of Agricultural Sciences, Bangalore",
  "Anuradha Cariappa": "Anuradha Kariappa",
  "Ramesh Chand": "Dr. Ramesh Chand",
  "ashish wele": "Ashish Wele",
  "prakash rao": "Dr. EVS Prakasa Rao",
  "Jatin Kaaimani": "Jatin Khaimani",
  "Mahendra Shahare": "Mahendra Shahare",
  "N raghuram": "Nandula Raghuram",
  "richa kumar": "Dr. Richa Kumar",
  "GEAC": "GEAC",
  "girish": "Girish Kulkarni",
  "radhika ghate": "Radhika Ghate",
};

const descriptions = {
  "UoA Bangalore": "University of Agricultural Sciences, Bangalore",
  "AIIM": "All India iGEM Meet, happens annually",
  "GEAC": "Genetic Engineering Appraisal Committee",
  "gaurang": "Designated partner, KULKORP Technologies",
  "girish": "Deputy Commissioner, Maharashtra State Agriculture Department",
  "radhika ghate": "Consultant",
  "bioprime": "https://static.igem.wiki/teams/6006/wiki/ihp/default-pfp.avif",
  "c8.2": "Journalist, Science Communicator",
  IISc: "Our project's home base at IISc.",
  n1: "Professor, Department of Biochemistry, IISc",
  n2: "Assistant Professor, Department of Inorganic and Physical Chemistry, Indian Institute of Science",
  n3: "Professor, Civil Engineering, IISc - Expert on groundwater contamination and Critical Zone Observatory.",
  n4: "Professor, Department of Microbiology and Cell Biology (MCB), IISc",
  n5: "Associate Professor, Centre for Ecological Sciences (CES), IISc",
  n6: "Hon. Professor, Microbiology and Cell Biology (MCB), IISc",
  n7: "Assistant Professor, Microbiology and Cell Biology (MCB), IISc",
  n8: "Former AIIM Judge, Humanities Instructor, IISc",
  n9: "Professor, Centre for Ecological Sciences (CES), IISc",
  n10: "AIIM Judge, Infectious Disease Research",
  n11: "Associate Professor, Molecular Biophysics Unit, Indian Institute of Science",
  n12: "Scientific Officer, Centre of Ecological Sciences, Indian Institute of Science",
  n13: "Department of Science and Technology, Government of India, Centre for Policy Research",
  "Shambhavi Naik": "Founder & CEO, Cloudcrate",
  "c1.1": "PhD Student, Department of Biochemistry, IISc",
  "c3.1": "Farmer, Berambadi Village",
  "c4.1": " Assistant Professor, Uttar Banga Krishi Vishwavidyalaya",
  "c6.1": "Postdoctoral researcher, Microbiology and Cell Biology (MCB), IISc",
  "c7.1": "Researcher, Microbiology and Cell Biology (MCB), IISc",
  "c9.1": "Programme Leader, ATREE - Expert on soil and water contaminants, eutrophication, and Jal Jeevan mission.",
  "c9.2": "Dean, School of Environment and Sustainability at Indian Institute of Human Sciences",
  "c11.1": "TWIST Bioscience",
  "c8.1": "Project Associate, IISc",
  "Jatin Kaaimani": "AIIM Judge, Principal ESG Consultant",
  "c13.1": "Researcher, International Water Management Institute",
  "ss agarwal": "Director, Ministry of Chemicals and Fertilizers - Discussed fertilizer approval process and nitrate leaching solutions.",
  "GT Puthra": "Director of Agriculture, Karnataka - Explained government fertilizer distribution and GMO policies.",
  "bioprime": "Rahul Jog, Head of R&D, Bioprime AgriSolutions",
  "utkarsh ghate": "Ecologist, Consultant",
  "Lavanya Bhagavantula": "AIIM Judge, Founder and CEO, Anvaya Biotech",
  "Mahendra Shahare": "Assistant Professor, IIT Bombay - Guidance on farmer surveys, communication, and product adoption.",
  "Ramesh Chand": "Member, NITI Aayog",
  "ashish wele": "Agronomist, Corporate Consultant",
  "prakash rao": "Honorary Scientist CSIR",
  "N raghuram": "Head, Centre for Sustainable Nitrogen and Nutrient Management, USBT, GGS Indraprastha University",
  "richa kumar": "Associate Professor, Department of Humanities and Social Sciences, IIT Delhi",
  "Anuradha Cariappa": "Deputy Director, Department of Agriculture, Government of Karnataka",

};

const fullDescriptions = {
  "girish": `<strong>Girish Kulkarni</strong><br>
    <em>Deputy Commissioner, Maharashtra State Agriculture Department</em><br><br>
    Our literature review showed that nitrate leaching was a massive problem, and we wanted to understand the government’s perspective. Girish stated that the government had indeed taken cognizance of the issue, and was looking for solutions. He asked pertinent questions about how we planned to apply the bacterium in the soil, and the working of biofilms in the soil. As a result, we studied commonly used delivery mechanisms and also consolidated our understanding of bacterial biofilms.`,

  "N raghuram": `<strong>Nandula Raghuram</strong><br>
    <em>Head, Centre for Sustainable Nitrogen and Nutrient Management, USBT, GGS Indraprastha University</em><br><br>
    Dr Raghuram gave us much needed context into the difficulty of GMO implementation, and asserted that such solutions should only be pursued if good alternatives are not available. Furthermore, he told us how ammonia emissions are also a huge problem, something we have taken seriously into account as we pursue our solution. This inspired to conduct a public perception survey regarding GMOs and craft a handbook of GMO policy in India.`,
  "c71": `<strong>Saheli Saha</strong><br>
    <em>Researcher, Microbiology and Cell Biology (MCB), IISc</em><br><br>
    Saheli helped us coordinate deliveries and assisted with obtaining restriction enzymes when we had urgent issues in our own lab. `,
  "Anuradha Cariappa": `<strong>Anuradha Kariappa</strong><br>
    <em>Deputy Director, Department of Agriculture, Government of Karnataka</em><br><br>
    We wanted to speak with Dr. Kariyappa for more information on the state of agricultural soil in Karnataka. She was extremely helpful, and brought us into contact with Dr. G T Puthra for more information. The meeting with G T Puthra turned out to be instrumental in our project.
`,
  "UoA Bangalore": `<strong>University of Agricultural Sciences, Bangalore</strong><br>
  UAS is the most prominent agricultural university in Bangalore, and we wanted to reach out to them for the possibility of getting soil-related data and information related to nitrate leaching in the city.`,

  "c6.1": `<strong>Hasan</strong><br>
    <em>Postdoctoral researcher, Microbiology and Cell Biology (MCB), IISc</em><br><br>
    Prof Varshney introduced us to Hassan so that we could use his help for bacterial transformation. Hassan provided the protocols and guided us throughout the process. During the designing of our plasmids, he stressed the need to confirm that our designing was perfect for expression. Furthermore, he mentioned that using plasmid isolation and gel extraction kits could cause impurities to remain in the DNA, making them unsuitable for transformation.

Therefore, we checked for Shine-Dalgarno sequences before each gene to be expressed and confirmed the start and end codons. We also made sure to perform manual, step-by-step plasmid isolations, ensuring that we checked concentrations at each step.`,

  n7: `<strong>Dr. Samay Pande</strong><br>
    <em>Assistant Professor, Microbiology and Cell Biology (MCB), IISc</em><br><br>
    We approached Prof Samay to be our PI on the advice of Professors Dipshikha and Varshney. He urged us to consider biosafety very seriously, and directed us towards conceptualising a kill switch for our engineered bacterium.

We therefore swapped out our constitutive promoter for an inducible one, effectively linking nitrite reductase to benzoate, a plant root exudate. We took it one step further and also designed an extensive kill switch for our system.`,

  n6: `<strong>Dr. Umesh Varshney</strong><br>
    <em>Hon. Professor, Microbiology and Cell Biology (MCB), IISc</em><br><br>
    We were directed to Prof Varshney by multiple faculty members for his experience and expertise in bacterial modifications. He advised us to carry out our initial experimentation on E. coli due to the ease of handling and easy transformation protocols. Furthermore, he expressed concern with our vague plans of gene knockout and downregulation, stating that they might be infeasible.`,

  "AIIM": `<strong>All India iGEM Meet</strong><br>
The All India iGEM Meet is a conference where teams from all over India present their work to a group of judges and ambassadors. Along with mock judging sessions, paper presentations and collaborative events, it is a hub for exchange between Indian iGEM teams.`,

  "c8.1": `<strong>Dr. Ramamohan Lohia</strong><br>
    <em>Project Associate, IISc</em><br><br>
    We tried to contact him but did not receive a response. Since BItasta had said his family is involved in agriculture, we were expecting a perspective from someone closer to the problem. However we later received a lot of insight from farmers we spoke to at Berambadi village. `,

  "c9.2": `<strong>Jagadish Krishnaswamy</strong><br>
    <em>Dean, School of Environment and Sustainability at Indian Institute of Human Sciences</em><br><br>
    Many stakeholders we spoke to recommended we speak to Dr. Jagdish. Unfortunately he was quite busy on the few occasions we tried to meet him, and a meeting never materialized. We plan to follow up with him in the coming days, since he had shown interest in our project when we first contacted him. `,
  n13: `<strong>Department of Science and Technology, Government of India, Centre for Policy Research</strong><br>
  CPR is a body at IISc that studies ways to increase the impact of research and also how various funding opportunities impact research. We contact them for any leads to gain a policy perspective on our project. They helped us initiate contact with Dr. Suchiradipta Bhattacharjee, whose insights were extremely valuable.`,

  "c1.1": `<strong>Adithya Chedere</strong><br>
  <em>PhD Student, Department of Biochemistry, IISc</em><br><br>
  We approached Mr. Adithya Chedere with our initial idea of modeling the basal expression Nitrate Ammonification in Pseudomonas putida to better understand the dynamics and the differences between the assimilatory and dissimilatory pathways.
He helped us build an initial idea for how to model this, but upon further deliberation, we realized that this would be far too complex of an endeavor since we neither had the tools nor the abilities to characterize the complex factors involved in the expression rates of these enzymes.
Instead, he suggested we model the activity in the genetically modified bacteria, which would be much more feasible since we used constitutive promoters, which ensure constant expression of enzymes.
He helped us build this model by guiding us through what factors we need to take into consideration while making assumptions and helped us estimate the concentrations of the enzymes by suggesting that we look at concentrations of housekeeping proteins in cells.
He also helped us code and build the model on COPASI software`,

  "Jatin Kaaimani": `<strong>Jatin Khaimani</strong><br>
    <em>AIIM Judge, Principal ESG Consultant</em><br><br>
    He appreciated our effort to build a narrative during our AIIM Presentation, but also told us to involve HP more while doing so. This is advice we have taken to heart in all our work, including the wiki and the presentation video. He also recommended we speak to the Takshashila Foundation, but unfortunately we were not able to get in touch with them.`,

  "Shambhavi Naik": `<strong>Shambhavi Naik</strong><br>
    <em>Founder & CEO, Cloudcrate</em><br><br>
    We approached Shambhavi as a potential sponsor. While that did not materialize, Shambhavi gave us a lot of advice about improving our pitch. We incorporated this advice, like making the pitch more visual, and mentioning previous sponsors for credibility. We were later told by an AIIM Judge, Jatin Khaimani, to speak to her about GMOs, something that had not come up in the previous discussion. However we haven’t been able to follow up with Shambhavi about this yet. `,
  "GEAC": `<strong>Genetic Engineering Appraisal Committee</strong><br>
  Many of the stakeholders we spoke to regarding GMO use recommended we speak to GEAC. This is a government body under the Ministry of Environment, Forests and Climate Change. They are responsible for approval of applications for field trials for GMOs and GMO import. We studied their website and realized most of their work is from the perspective of GMO crops, not microbes. We tried to get in touch with multiple GEAC representatives, but did not receive a response from any of them. The complex regulatory framework was also an inspiration to propose the GMO handbook we have designed as part of our project.`,
  
  
  "c8.2": `<strong>Dr. Karthik Ramaswamy</strong><br>
    <em>Journalist and Science Communicator, Indian Institute of Science</em><br><br>
    We spoke to Karthik about Human Practices in general, since this conversation took place during the early stages of our project. He mainly suggested we look at ATREE for experts to speak to, and also suggested we try to make a documentary for our project. While the later was not possible, we tried to document everything we did, either through extensive meeting notes or videos of interviews. He also suggested we look at case studies during outreach and education activities. We tried to incorporate this structure while involving our juniors and giving them material to read about. `,

    "radhika ghate": `<strong>Dr. Radhika Ghate</strong><br>
    <em>Consultant</em><br><br>
    Radhika helped us in connecting with farmers so we could conduct surveys. Through her place of work, she connected us to farmers from diverse locations in Maharashtra, who gave us an overview about types of soil, irrigation methods and ways in which various crops are planted. Through this survey, we understood the perspective of farmers on GMOs and sustainable agricultural practices, as well the state of water management in their villages. We were able to extrapolate that a significant overhaul is needed to supply filtered water to rural communities to ensure good health. We also understood that farmers are generally open to GMO use as long as it is a profitable decision.`,

  n11: `<strong>Dr. Mahavir Singh</strong><br>
  <em>Associate Professor, Molecular Biophysics Unit, Indian Institute of Science</em><br><br>
Dr. Singh provided his expertise in protein modelling to the project. He also got us in touch with Ramesh Vaidyanathan, the TWIST representative who helped us optimize our DNA sequences for synthesis.

  `,
  "c11.1": `<strong>Ramesh Vaidyanathan</strong><br>
    <em>TWIST Bioscience</em><br><br>
    While we initially spoke to Ramesh while starting an order for our synthesized genes, he later helped us with codon optimization. We had initially only used the optimization tool provided by the company and were about to place our order. This is when Ramesh suggested an additional tool, the Kabusa database. We were able to optimize our genes for expression in E. coli, an additional parameter that we will characterize in the wet lab.`,

  
  n1: `<strong>Dr. Nagasuma Chandra</strong><br>
    <em>Professor, Department of Biochemistry, IISc</em><br><br>
    We approached Prof Nagasuma for insights on modelling of metabolic pathways. She expressed concerns with our initial plans to use GEM models, stating that they wouldn’t be of much help for our cause. 

We modified our plans and focused more on building the comprehensive mathematical model without using GEM models, which were unwieldy and hard to find.`,
  n2: `<strong>Dr. Abhishek Sirohiwal</strong><br>
    <em>Assistant Professor, Department of Inorganic and Physical Chemistry, Indian Institute of Science</em><br><br>
  
    We contacted Dr Sirohiwal for more insights into nrfA and its applicability in our project. He let us know that nrfA has not been characterized well, and that it is an interesting avenue to explore. We wish to explore protein modelling as part of our dry lab. 
`,

  n4: `<strong>Dr. Dipshikha Chakravortty</strong><br>
    <em>Professor, Department of Microbiology and Cell Biology (MCB), IISc</em><br><br>
  
    Prof Dipshikha is the assistant dean to the undergraduate programme at IISc, and has supported IISc iGEM teams for the past decade. We approached her during ideation for feedback and suggestions, and have kept in touch since for guidance in handling administrative procedures and managing funding. 

She emphasized the role of human practices while executing an iGEM project, noting that grounding our project in the real world is very important. She also got us in touch with Dr. Kapudeep Karmakar. 

We were inspired by her example of a book published by a previous team at our university. A big part of the motivation for our GMO policy and Risk Assessment Strategy handbook was her directive to share a useful document to the iGEM community.
`,

    n5: `<strong>Dr. Sumanta Bagchi</strong><br>
    <em>Associate Professor, Centre for Ecological Sciences (CES), IISc</em><br><br>
  
    We approached Prof Sumanta for help in navigating nitrate and ammonium testing in soil. He brought to our notice that soil testing would be difficult due to the fact that the  microbial population and diversity in soil is extremely vast. Thus, even if our engineered bacterium did show results, we would not be able to correctly analyze it because of all the variables. 

  We integrated his advice into our project by deciding to sterilize the soil before conducting testing.
`,

  n8: `<strong>Bitasta Das</strong><br>
    <em>Former AIIM Judge, Humanities Instructor, IISc</em><br><br>
    We approached Bitasta for advice on how to go about IHP since she had previously been involved with igem, and if she knew anyone who we could speak to. We also asked her if she knew any journalists, since we wanted to start a column that would help spread awareness about nitrate leaching and fertilizer use among farmers. We spoke to the contact she gave us, but nothing materialized. She also told us to speak to Karthik Ramaswamy and Ramamohan Lohia.`,

  n9: `<strong>Dr. Karthik Shanker</strong><br>
    <em>Professor, Centre for Ecological Sciences, IISc</em><br><br>
  Since Professor Shanker works in aquatic ecosystems, we thought of contacting him to hear his thoughts about our project. However, he said this was not his area of expertise at all, and the meeting ended up being a casual conversation. He did suggest, however, that we speak to Dr. Priyanka Jamwal, who would be able to guide us better. Incidentally, we had spoken to Dr. Priyanka already, and had received a lot of valuable insight. `,

  n10: `<strong>Varsha Jaisimha</strong><br>
    <em>AIIM Judge, Infectious Disease Research</em><br><br>
    Varsha helped us in building a strong narrative for our project. While our HP work had been extensive, we failed to include how it linked to our planning for wet lab and dry lab. We incorporated this idea into our website to a great degree. Additionally, she suggested how we can present our work in a manner that is more accessible, and better represents the efforts we have put in. `,

  n12: `<strong>Dr. T. V. Ramachandra</strong><br>
    <em>Scientific Officer, Centre of Ecological Sciences, Indian Institute of Science</em><br><br>
  
    <strong>Key Leads:</strong><br>
    • Contact Karnataka State Pollution Control Board<br>
    • Contact Karnataka Tank Conservation & Development Authority<br>
    • Get in touch with the Department of Environmental Science at Bangalore University`,
    
  "prakash rao": `<strong>Dr. EVS Prakasa Rao</strong><br>
    <em>Honorary Scientist CSIR</em><br><br>
    We contacted Dr. Rao in the nascent stages of our project and he provided us with a lot of reading material about nitrate pollution in India. This gave us statistical validation about the reality of our problem, and saved us a lot of time in literature review. While searching for papers ourselves ended up taking a lot of time, the resources provided by Dr. Rao included a lot of information that was relevant to us. `,

  "richa kumar": `<strong>Dr. Richa Kumar</strong><br>
    <em>Associate Professor, Department of Humanities and Social Sciences, IIT Delhi</em><br><br>
  
    We approached Dr Kumar for advice on survey data analysis and report preparation.
While we were not able to have a meeting with her, she did give us two great leads, Dr Mahendra Shahare and Dr Nandula Raghuram, both of whom were instrumental in contextualizing our project with respect to Indian context.
`,

  "ashish wele": `<strong>Ashish Wele</strong><br>
    <em>Agronomist, Corporate Consultant</em><br><br>
    We approached Mr. Wele for guidance in approaching corporates for funding. He helped us build a strong project proposal, and also referred us to a few potential sponsors. Additionally, he told us to chart out a detailed plan on how we intended to move from working in the lab to actual soil. After speaking to our PIs and contemplating, we structure our project in three steps; testing in media, testing in sterile soil (in absence of other microbes), and lastly field trials. 
  `,

  "c3.1":`<strong>Shanthamurthy</strong><br>
    <em>Farmer, Berambadi Village</em><br><br>
    We were connected to Shanthamurthy’s by the Indo-French Cell at the Department of Civil Engineering at IISc. Shanthumurthy is a farmer from the Berambadi village, which is around 400 Kilometers from Bangalore. For over 6 years, he has been helping researchers conduct surveys and collect soil samples from villages in his locality. 

    We wanted to meet Shanthu to get a holistic view of agriculture, fertilizer use, and awareness about nitrate leaching among rural communities. We first collected soil samples from various fields, including a variety of crops. Shanthu explained rain-based and irrigation-based based for the crop that is being grown. This is heavily influenced by how much capital a farmer has, since digging a borewell is quite expensive. Next, we wanted to collect water samples and visit a river adjacent to the village

    Here we interviewed a farmer from Berambadi regarding how fertilizers are used, where the runoff goes, and whether they have water filters. The runoff went into the river, which had many villages downstream. Almost 60% of the villagers drank unfiltered water from the borewells. While his village had a water filter, it was only open during the day, so people often drank unfiltered tap water when at home. When in the fields, borewell water was drunk directly, without any filtering. We also collected a water sample from the borewells as well as the lake to test for nitrate levels.

    Another farmer we met was from a smaller village with only around 100 families and no water filter. Out of these, only four or five went to nearby Gopalapura and Berambadi villages to get filtered water. Everyone else relied on borewell water and water from the river Kaveri. 

    Both farmers said many people preferred drinking unfiltered water because they were used to it. This was despite the fact that both farmers knew of anecdotal evidence about increased knee pain over the past few years, and governmental awareness campaigns about the dangers of unfiltered water. 

    Next, Shanthu took us to the water filter of the village, which is managed by the owner of the dairy. We interviewed the owner about the frequency of water supply, and learnt that the filtered water costs 5 rupees per litre. Although this seems a paltry amount, we learnt that around 64 children attending the school opposite to the dairy had to drink unfiltered water, since they could not afford even this. In order to set up a healthier system to provide water to students, we have set up a fundraiser to purchase a filter.

    Throughout the day, we spoke to multiple farmers, and most of them were quite open to using GMOs on their fields, as long as it ensured higher yield or reduced fertilizer use and saved costs. They were quite aware of the low efficacy of fertilizers and the specifics of what quantities to use, contrary to what we had initially believed. 
  `,
    
    

  "ss agarwal": `<strong>Shyam Sundar Agrawal</strong><br>
    <em>Director, Ministry of Chemicals and Fertilizers, Government of India</em><br><br>
    
    In May 2025, we mailed the Director of the Ministry of Chemicals and Fertilizers. It was our first step in contacting the government. Our leap of faith paid off well, for we had a nice conversation with Shyam Sundar Agrawal and got a glimpse into how the Department of Fertilizers operates.<br><br>
    
    The Fertilizer Association of India (FAI) issues control orders -- a list of fertilizer constituents and their permissible composition. For a new fertilizer to hit the markets, it must first be approved by the Indian Council of Agricultural Research (ICAR), subject to these standards. Fertilizers are tested on confined fields as a part of this approval process.<br><br>
    
    Shyam Sundar Agrawal reaffirmed the importance of our project. "The effective use of urea is only 35%", he mentioned. The Department of Fertilizers works on how this urea can be made available to farmers, what the requirements are, ensuring they possess appropriate quantities of fertilizers, gauging their price, etc. They also analyse what materials are available indigenously, and what, along with how much, needs to be procured from elsewhere. Farmers' requirements are communicated to them via state governments. He suggested we contact the Government of Karnataka to learn more in this regard. He also encouraged us to file an RTI (Right To Information) application to access documents and data from NITI Aayog and the Department of Agriculture.<br><br>
    
    When asked for his thoughts on our project, Shyam Sundar Agrawal said that the Department is struggling with finding a solution to nitrate leaching as well. It is also significant to the industry, for a new product that combats this problem will change the scene. He advised us to contextualize our project well. To our joy, he said that GMOs are losing their negative connotation, and their use is slowly being appreciated. Agriculture-related setups, such as Compressed Biogas (CBG) plants, already use bacteria, so the use of GMOs is a natural step forward.<br><br>
    
    <strong>Key Leads:</strong><br>
    • Read Control Orders published by FAI<br>
    • Contact the Karnataka State Agriculture Department<br>
    • Talk to ICAR and NITI Aayog`,

  "GT Puthra": `<strong>Dr. G.T. Puthra</strong><br>
    <em>Director of Agriculture, Government of Karnataka</em><br><br>
    
    We were intent on connecting with the government and understanding their modus operandi, along with existing policies. As such, we contacted Dr. G.T. Puthra to establish a more local context -- the farms of Karnataka.<br><br>
    
    He explained that the Indian Council of Agricultural Research sets composition limits for fertilizers. The government takes these limits and establishes fertilizer usage guidelines. They also issue the Package of Practices - a set of recommended methods of cultivating and harvesting crops - which farmers are expected to follow. They also provide fertilizers to local farmers according to their requirements.<br><br>
    
    The Government of Karnataka has developed an Android app named 'Mungaru Raithara Bele Samikshe', which collects farmland data from 4.3 crore plots. The crops grown on each farm are surveyed as per season. After analysing this data, the agriculture department prepares a district-wise supply plan to allocate fertilizers. Fertilizers are provided for agriculture, horticulture, and sericulture. The department has weekly meetings to assess the farmers' requirements, with more frequent ones during the Rabi (spring harvest) and Kharif (autumn harvest) seasons. Fertilizers of different grades are distributed under a subsidy. NPK (Nitrogen, Phosphorus, Potassium) fertilizers, especially, are covered under the Nutrient-Based Subsidy (NBS). NPK fertilizers are of interest to us, since they contain urea and lead to nitrate leaching.<br><br>
    
    Furthermore, we also sought to learn about policies regarding GMOs. Dr. Puthra mentioned that GMO release is controlled by the Genetic Engineering Appraisal Committee (GEAC) and the Department of Environment and Forestry. GMO trials are carried out in small, contained fields - after which they may be approved. He said that he knows of only 4 GMOs that made it to field trials. However, on the bright side, the perception of GMOs by regulatory bodies is becoming more positive!<br><br>
    
    Lastly, we requested him for the contacts of farmers, so that we could speak with them and gauge their views firsthand. He said that he knows both kinds of farmers: those who follow the Package of Practices and those who do not. He told us to contact his secretary to get in touch with them.<br><br>
    
    <strong>Key Leads:</strong><br>
    • Talk to the Joint Director of GEAC<br>
    • Follow up on the farmers' visit<br>
    • Go through the Package of Practices<br>
    • Contact the IT department for crop survey analytics<br>
    • Contact C-CAMP and FAI for potential funding`,

  "bioprime": `<strong>Dr. Rahul Jog</strong><br>
    <em>Head R&D, Bioprime AgriSolutions</em><br><br>
    We spoke to Dr. Rahul to gain an industry perspective on GMO use in the soil. Additionally, we wanted to understand regulation for approval of agricultural products, and the potential for our idea to fit into this framework. He shared that microbes are often used in agriculture and mixed with fertilizers, however these are not GMOs. He suggested we look into presenting our bacterium as a biostimulant, since the legislation is more flexible compared to biofertilizers and biopesticides. We included these insights while making our GMO Handbook and also looked further into biostimulants.`,

  "gaurang": `<strong>Gaurang Kulkarni</strong><br>
    <em>Designated partner, KULKORP Technologies</em><br><br>
    Gaurang is an entrepreneur and we hoped to gain insight on the nuances of scaling up a technical startup from him. His insights were mainly regarding various business models we could explore. In particular, he suggested we shift our outlook on farmers as our customers, and explained why selling to the government is much feasible. He also told us to consider a more holistic approach, not just focusing on soil. Accordingly, we started work on a bioreactor based on the same principle, which would treat nitrate rich runoff from agricultural fields and potentially even factories.`,

  "utkarsh ghate": `<strong>Utkarsh Ghate</strong><br>
    <em>Ecologist, Consultant</em><br><br>
    We spoke to Dr. Utkarsh about the implications of a project like ours on the environment. He suggested that since microbes in the soil are constantly undergoing evolutionary processes, there is constant change in the genetic composition of the microbiome. While placing a modified organism in an open environment is highly unpredictable, our strategy of using a bacterium already in the soil, and a pathway also found in soil bacteria, would not add any new genetic material. The only issue would be the use of plasmids, which would anyways be absent in our eventual construct involving genomic integration. Dr. Utkarsh also suggested we speak to stakeholders from fertilizer companies to understand how microbes are used in agriculture, based on which we contacted BioPrime AgriSolutions.`,

  "Lavanya Bhagavantula": `<strong>Dr. Lavanya Bhagavatula</strong><br>
    <em>Founder, Anvaya Biotech (All India iGEM Meet Judge)</em><br><br>
    We had been planning to work on a document compiling GMO Policy and Remedial Measures for quite a while, without any progress. Dr Lavanya motivated us to take this up and work on it seriously. She also provided some preliminary guidance on how to get started and suggested a rudimentary idea of what the document should include. The document, while still a nascent endeavour, can be viewed on our Contribution Page.`,

  "c9.1": `<strong>Dr. Priyanka Jamwal</strong><br>
    <em>Sr. Fellow, Water and Society, ATREE</em><br><br>
    The meeting with Dr. Priyanka was groundbreaking. She really pushed us to engage in field work and understand the reality, rather than just rely on papers. She also highlighted that we need to focus on groundwater pollution too, not just surface water bodies. This led us down a rabbit hole about the negative impacts of nitrate rich water on human health. We also stressed on this point in our farmer surveys and interactions, and sought to understand the water management systems in villages.`,

  "c13.1": `<strong>Dr. Suchiradipta Bhattacharjee</strong><br>
    <em>Researcher, International Water Management Institute</em><br><br>
    We spoke to Dr. Suchiradipta to understand the perspective of someone at the interface of water management and soil health. She provided a lot of insight on how leaching affects other sustainable activities, like groundwater recharge. She also helped us with some government surveys, which we referred to for data for our dry lab.`,

  "Mahendra Shahare": `<strong>Dr. Mahendra Shahare</strong><br>
    <em>Assistant Professor, Department of Humanities and Social Sciences, IIT Bombay</em><br><br>
    
    During our mission to design a survey for farmers, we contacted Dr. Mahendra Shahre for advice. We joined the meeting with two heavy questions: what factors must we keep in mind? More importantly, are we taking the right approach? Arguably, farmers were our most important stakeholders. It was essential to get this survey right.<br><br>
    
    Regarding designing the survey itself, Dr. Shahare had quite a few pointers. He advised us to consider the crop/geography specificity of nitrate leaching -- identify under what conditions the problem is substantial, and focus on those. He confirmed that the requirement of a solution was an 'identified' need as opposed to a 'perceived' one. Our main concern was, of course, how to ensure that we have communicated the science of our project well. He said to make our questions as easy and accessible as possible, and avoid jargon. Articulate them in a manner that preserves their essence, and both parties reach a middle ground. Ask farmers about their concerns -- crop growth, efficiency, cost, environmental impact, yield, etc. He mentioned that 80-85% of farmers do not own more than a few acres of land. Thus, cost often becomes the governing factor of decisions.<br><br>
    
    Further, what kinds of product application methods would they prefer? In fact, farmers usually hire someone else to spray fertilizers. Are there any alternative methods that they have adopted to combat this problem? What is the motivation for adopting this product, versus what are the hurdles in not embracing it? Dr. Shahare also highlighted that transitioning between farming techniques, for example chemical to organic fertilizers, is tough to do. This might also be a deterring factor, and we must design our product with it in mind. Our marketing needs to be strong for customers to accept a GMO solution. He also mentioned that Krushi Vigyan Kendras are quite influential. Farmers buy products from them on credit and thus tend to trust their word on new scientific developments due to this dependence. We were suggested to approach experts from the University of Agriculture, Bangalore, and NCBS (National Centre for Biological Sciences), since they possess rich knowledge about the science as well as the local context.<br><br>
    
    About our project and approach itself, he was quite optimistic. "Talking to farmers, selecting a Critical Zone Observatory for data, and contextualizing the project well is great for HP", he said. Dr. Shahare emphasized that farmers possess deep, intimate knowledge about their land and soil, which has been passed down for generations. As scientists, we must listen and learn from them. He encouraged us to find examples of beneficial GMOs to strengthen our case. Talking to even 25 stakeholders gives a holistic overview of all that we need to consider.<br><br>
    
    As a parting thought, Dr. Shahare told us to enjoy the process. He was enthusiastic to know more about our iGEM experience and invited us to have another chat once our journey was over. His support of our efforts thus far renewed our hope and motivation to push forward after months of endless work.<br><br>
    
    <strong>Key Leads:</strong><br>
    • Look into Krushi Vigyan Kendras<br>
    • Contact the University of Agriculture, Bangalore, and NCBS for help<br>
    • Talk to traders<br>
    • Create a podcast<br>
    • Enjoy the process and get back to him later!`,

  n3: `<strong>Dr. Sekhar Muddu</strong><br>
    <em>Professor, Department of Civil Engineering, Indian Institute of Science</em><br><br>
    
    A privilege of being a team from the Indian Institute of Science is that sometimes the experts we seek are right at our doorstep. One such expert is Dr. Sekhar Muddu. We found out from the Interdisciplinary Centre for Water Research (ICWaR) department website that his research interests include the study of groundwater. We absolutely had to meet him, for groundwater contamination is the primary consequence of nitrate leaching. A meeting at his office in the Department of Civil Engineering was scheduled.<br><br>
    
    Dr. Sekhar enlightened us about the various parameters involved in understanding groundwater -- soil type, soil porosity, rate of flushing, crop type, etc. He explained that nitrates accumulate less in groundwater that is frequently flushed out. As such, we cannot pick up any random soil sample and start analysing it. It takes expertise and time to characterize a soil sample, of which we had neither. After all, we are a team of first-year undergraduate students. This high variability in soil nature is also critical in designing experiments involving the use of soil. He suggested that we first understand and shortlist the parameters necessary for our work. As a reference, he told us to go through the master's thesis of one of his students, Buvaneswari S.<br><br>
    
    Where do we take soil samples from then? We also needed past data about groundwater nitrate levels in local areas. Dr. Sekhar introduced us to the concept of a Critical Zone Observatory (CZO). Researchers all around the world set up CZOs to monitor soil for long periods of time. They study the changes that the land undergoes during various conditions, creating a well-detailed outline of the soil and groundwater profile. These zones become reference standards for research. Luckily for us, there happens to be a Critical Zone Observatory around 250km from the IISc campus. It contains two zones of interest - Berambadi, an agricultural watershed, and the Mule Hole forest watershed next to it. Since forest soil remains untouched by agriculture, the two areas can be used for comparative research. The Kabini CZO has over 20 years of data to its name, perfect for our purposes.<br><br>
    
    Dr. Sekhar introduced us to the French Biofunctool research team visiting the Indo-French cell, Department of Civil Engineering. Since they were also studying the Berambadi watershed, he suggested we tag along with them for a visit. Alas, the team had already completed their field visits. However, they helped us get in touch with their on-site contact, Shanthamurthy.<br><br>
    
    Our conversation with Dr. Sekhar was as delightful as it was informative. We would go on to visit Berambadi and not only collect samples, but also finally talk to farmers.<br><br>
    
    <strong>Key Leads:</strong></br>
    • Talk to the Indo-French cell and coordinate a field visit to Berambadi
    • Obtain Critical Zone Observatory Data`,

  "Ramesh Chand": `<strong>Dr. Ramesh Chand</strong><br>
    <em>Designation: Member, NITI Aayog</em><br><br>
       
    We contacted Dr Chand to know more about fertiliser usage in India, especially the statistics regarding it. He gave us a lot of information, and directed us to resources giving detailed analyses of fertilizer use in the last 30 years. He prompted us to contact the University of Agricultural Sciences in Bangalore and contact Dr S K Chowdhary. We contacted the University and got tremendous insights into our project.
    `,

  "c4.1": `<strong>Dr. Kapudeep Karmakar</strong><br>
    <em>Assistant Professor, Uttar Banga Krishi Vishwavidyalaya</em><br><br>
    We met Dr Karmakar during the ideation stage, with the intent of knowing more about biofilms and its integration into our project. He inspired us to consider the effects of biofilms on soil such as decrease in soil erosion; and explained the nitrogen cycling pathways in the soil in great detail. We contacted the University of Agricultural Sciences in Bangalore upon his advice.

  `
  
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

