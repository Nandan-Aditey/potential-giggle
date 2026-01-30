document.addEventListener('DOMContentLoaded', () => {
  console.log("Blogs script loaded");
  const modal = document.getElementById('blog-modal');
  const modalBody = document.getElementById('blog-modal-body');
  const closeBtn = document.querySelector('.blog-modal-close');

  // Store blog content as HTML
  const blogContent = {
    blog_one: `
    <h1> Dr. G.T. Puthra - Director of Agriculture, Government of Karnataka </h1>

    <p> We were intent on connecting with the government and understanding their modus operandi, along with existing policies. As such, we contacted Dr. G.T. Puthra to establish a more local context – the farms of Karnataka. </p>

    <p> He explained that the Indian Council of Agricultural Research sets composition limits for fertilizers. The government takes these limits and establishes fertilizer usage guidelines. They also issue the Package of Practices - a set of recommended methods of cultivating and harvesting crops - which farmers are expected to follow. They also provide fertilizers to local farmers according to their requirements. </p>

    <p> The Government of Karnataka has developed an Android app named ‘Mungaru Raithara Bele Samikshe’, which collects farmland data from 4.3 crore plots. The crops grown on each farm are surveyed as per season. After analysing this data, the agriculture department prepares a district-wise supply plan to allocate fertilizers. Fertilizers are provided for agriculture, horticulture, and sericulture. The department has weekly meetings to assess the farmers’ requirements, with more frequent ones during the Rabi (spring harvest) and Kharif (autumn harvest) seasons. Fertilizers of different grades are distributed under a subsidy. NPK (Nitrogen, Phosphorus, Potassium) fertilizers, especially, are covered under the Nutrient-Based Subsidy (NBS). NPK fertilizers are of interest to us, since they contain urea and lead to nitrate leaching. </p>

    <p> Furthermore, we also sought to learn about policies regarding GMOs. Dr. Puthra mentioned that GMO release is controlled by the Genetic Engineering Appraisal Committee (GEAC) and the Department of Environment and Forestry. GMO trials are carried out in small, contained fields - after which they may be approved. He said that he knows of only 4 GMOs that made it to field trials. However, on the bright side, the perception of GMOs by regulatory bodies is becoming more positive! </p>

    <p> Lastly, we requested him for the contacts of farmers, so that we could speak with them and gauge their views firsthand. He said that he knows both kinds of farmers: those who follow the Package of Practices and those who do not. He told us to contact his secretary to get in touch with them. </p>

    <p> Dr. G.T. Puthra provided great insight into how the Government of Karnataka and local farmers interact with each other. </p>

    Leads:
      <ul style="list-style-type: disc; padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">
    <li style="margin-bottom: 8px;">Talk to the Joint Director of GEAC</li>
    <li style="margin-bottom: 8px;">Follow up on the farmers’ visit</li>
    <li style="margin-bottom: 8px;">Go through the Package of Practices</li>
    <li style="margin-bottom: 8px;">Contact the IT department for crop survey analytics</li>
    <li style="margin-bottom: 8px;">Contact C-CAMP and FAI for potential funding</li>
  </ul>`,
  blog_two: `
    <h1> Dr. Lavanya Bhagavatula - Founder, Anvaya Biotech (All India iGEM Meet Judge) </h1>

    <p> Following our presentation at the All India iGEM Meet (AIIM) 2025, the judges had great inputs and suggestions. Dr. Lavanya Bhagavatula especially shed light on concepts concerning GMO classification and legislation that we had not previously encountered. As such, we requested a meeting after AIIM to learn more. </p>

    <p> She mentioned that introducing proper legislation for GMO use is a growing, persistent problem plaguing scientists from all around the world. There is a distinct lack of details about the various types of GMOs possible, which prevents tailoring regulations unique to each type. A gene knockout bacterium cannot be treated the same way as one containing introduced viral genes. Characterizing the different types of modified organisms is the first step towards having directed conversations with experts and avoiding the generic “It depends” response. She advised us to create a document outlining what a genetically modified organism is, and what kinds of modifications are included in this umbrella term (overexpression, gene knockout, gene insertions, etc). The purpose of this document is to serve as an educational tool that introduces depth and definition to a topic that has been left vague and muddled in laws. </p>

    <p> In fact, Dr. Lavanya suggested we prepare another document – one summarizing the Indian regulations on the use and approval of GMOs so far. It should also include how the current environment is/is not conducive to innovations in this field. Through this exercise, we can identify the gaps and work on bridging them. She shared a document by the Department of Biotechnology (DBT) on guidelines regarding GM plants as a starting point. Much to our woes, most Indian legislation is related to plants, and there is very little related to bacteria. This only demonstrates the necessity of preparing the two documents. She also highlighted that DBT launched the BioE3 flagship program last year, investing heavily in the development of technologies for the production and commercialization of bio-based products. Genetically modified Nagpur oranges have become very profitable. As the biotechnology industry in India gains momentum, it becomes more important than ever to evaluate the use of modified organisms for the good of the nation. </p>

    <p> Furthermore, we also sought to learn about policies regarding GMOs. Dr. Puthra mentioned that GMO release is controlled by the Genetic Engineering Appraisal Committee (GEAC) and the Department of Environment and Forestry. GMO trials are carried out in small, contained fields - after which they may be approved. He said that he knows of only 4 GMOs that made it to field trials. However, on the bright side, the perception of GMOs by regulatory bodies is becoming more positive! </p>

    <p> Another point she mentioned was the classification of various kinds of soil, which can be done through soil health card data. This would be very useful in understanding the geographical areas in which our project would be applicable, with input from wet lab and dry lab experiments.  </p>

    <p> We asked her: How can we classify our product? It is neither a biofertilizer nor a biopesticide. She introduced us to a lesser-known category of agricultural products known as ‘biostimulants’ – substances that aid plant growth. The regulatory guidelines surrounding them are lax compared to fertilizers, and it is the appropriate category for the introduction of GMO use. This is something Dr Rahul Jog has also urged us to look into.  </p>

    <p> Dr. Lavanya gave direction to our campaign for approving GMO use. Even if our pursuits involving the Government of India do not work out, we can surely educate the public with concise, accessible information. </p>

    Leads:
      <ul style="list-style-type: disc; padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">
    <li style="margin-bottom: 8px;">Contact DBT</li>
    <li style="margin-bottom: 8px;">Follow up on the farmers’ visit</li>
    <li style="margin-bottom: 8px;">Go through existing regulatory paperworks</li>
    <li style="margin-bottom: 8px;">Prepare the two documents</li>
  </ul>`,
  blog_three:`
  <h1> Dr. Mahendra Shahare, Department of Humanities and Social Sciences, IIT Bombay</h1>
  <p>During our mission to design a survey for farmers, we contacted Dr. Mahendra Shahre for advice. We joined the meeting with two heavy questions: what factors must we keep in mind? More importantly, are we taking the right approach? Arguably, farmers were our most important stakeholders. It was essential to get this survey right.</p>
  <p>Regarding designing the survey itself, Dr. Shahare had quite a few pointers. He advised us to consider the crop/geography specificity of nitrate leaching – identify under what conditions the problem is substantial, and focus on those. He confirmed that the requirement of a solution was an ‘identified’ need as opposed to a ‘perceived’ one. Our main concern was, of course, how to ensure that we have communicated the science of our project well. He said to make our questions as easy and accessible as possible and avoid jargon. Articulate them in a manner that preserves their essence, and both parties reach a middle ground. Ask farmers about their concerns – crop growth, efficiency, cost, environmental impact, yield, etc. He mentioned that 80-85% of farmers do not own more than a few acres of land. Thus, cost often becomes the governing factor of decisions.</p>
  <p>Further, what kinds of product application methods would they prefer? In fact, farmers usually hire someone else to spray fertilizers. Are there any alternative methods that they have adopted to combat this problem? What is the motivation for adopting this product, versus what are the hurdles in not embracing it? Dr. Shahare also highlighted that transitioning between farming techniques, for example chemical to organic fertilizers, is tough to do. This might also be a deterring factor, and we must design our product with it in mind. Our marketing needs to be strong for customers to accept a GMO solution. He also mentioned that Krushi Vigyan Kendras are quite influential. Farmers buy products from them on credit and thus tend to trust their word on new scientific developments due to this dependence. We were suggested to approach experts from the University of Agriculture, Bangalore, and NCBS (National Centre for Biological Sciences), since they possess rich knowledge about the science as well as the local context.</p>
  <p>About our project and approach itself, he was quite optimistic. “Talking to farmers, selecting a Critical Zone Observatory for data, and contextualizing the project well is great for HP”, he said. Dr. Shahare emphasized that farmers possess deep, intimate knowledge about their land and soil, which has been passed down for generations. As scientists, we must listen and learn from them. He encouraged us to find examples of beneficial GMOs to strengthen our case. Talking to even 25 stakeholders gives a holistic overview of all that we need to consider.</p>
  <p>As a parting thought, Dr. Shahare told us to enjoy the process. He was enthusiastic to know more about our iGEM experience and invited us to have another chat once our journey was over. His support of our efforts thus far renewed our hope and motivation to push forward after months of endless work.</p>
  Leads:
    <ul style="list-style-type: disc; padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">
  <li style="margin-bottom: 8px;">Look into Krushi Vigyan Kendras</li>
  <li style="margin-bottom: 8px;">Contact the University of Agriculture, Bangalore, and NCBS for help</li>
  <li style="margin-bottom: 8px;">Talk to traders</li>
  <li style="margin-bottom: 8px;">Create a podcast</li>
  <li style="margin-bottom: 8px;">Enjoy the process and get back to him later!</li>
  `,

  blog_four:`
  <h1> Dr. Sekhar Muddu, Professor, Department of Civil Engineering, Indian Institute of Science</h1>
  <p>A privilege of being a team from the Indian Institute of Science is that sometimes the experts we seek are right at our doorstep. One such expert is Dr. Sekhar Muddu. We found out from the Interdisciplinary Centre for Water Research (ICWaR) department website that his research interests include the study of groundwater. We absolutely had to meet him, for groundwater contamination is the primary consequence of nitrate leaching. A meeting at his office in the Department of Civil Engineering was scheduled. </p>
  <p>Dr. Sekhar enlightened us about the various parameters involved in understanding groundwater – soil type, soil porosity, rate of flushing, crop type, etc. He explained that nitrates accumulate less in groundwater that is frequently flushed out. As such, we cannot pick up any random soil sample and start analysing it. It takes expertise and time to characterize a soil sample, of which we had neither. After all, we are a team of first-year undergraduate students. This high variability in soil nature is also critical in designing experiments involving the use of soil. He suggested that we first understand and shortlist the parameters necessary for our work. As a reference, he told us to go through the master’s thesis of one of his students, Buvaneswari S.</p>
  <p>Where do we take soil samples from then? We also needed past data about groundwater nitrate levels in local areas. Dr. Sekhar introduced us to the concept of a Critical Zone Observatory (CZO). Researchers all around the world set up CZOs to monitor soil for long periods of time. They study the changes that the land undergoes during various conditions, creating a well-detailed outline of the soil and groundwater profile. These zones become reference standards for research. Luckily for us, there happens to be a Critical Zone Observatory around 250km from the IISc campus. It contains two zones of interest - Berambadi, an agricultural watershed, and the Mule Hole forest watershed next to it. Since forest soil remains untouched by agriculture, the two areas can be used for comparative research. The Kabini CZO has over 20 years of data to its name, perfect for our purposes.</p>
  <p>Dr. Sekhar introduced us to the French Biofunctool research team visiting the Indo-French cell, Department of Civil Engineering. Since they were also studying the Berambadi watershed, he suggested we tag along with them for a visit. Alas, the team had already completed their field visits. However, they helped us get in touch with their on-site contact, Shanthamurthy.</p>
  <p>Our conversation with Dr. Sekhar was as delightful as it was informative. We would go on to visit Berambadi and not only collect samples, but also finally talk to farmers.</p>
  Leads:
  <ul style="list-style-type: disc; padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">
  <li style="margin-bottom: 8px;">Talk to the Indo-French cell and coordinate a field visit to Berambadi</li>
  <li style="margin-bottom: 8px;">Obtain Critical Zone Observatory Data</li>
  <li style="margin-bottom: 8px;">Go through Buvaneswari’s thesis – Impact of agricultural systems on groundwater quality (S. Buvaneshwari, 2018)</li>
  `,

  blog_five:`
  <h1>Gaurang Kulkarni and Girish Kulkarni</h1>
  <p>Gaurang Kulkarni - Designated partner, KULKORP Technologies and Girish Kulkarni - Deputy Director, Maharashtra State Department of Agriculture</p>
  <p>This was an insightful meeting with a dynamic father-son duo, whose expertises lie in entrepreneurship and policy-making, respectively. Girish Kulkarni is in the Department of Agriculture in the Maharashtra State Government, while Gaurang Kulkarni is the founder of an innovative startup that upcycles water hyacinths.</p>
  <p>After explaining the nature of the problem and our proposed solution, both Girish and Gaurang agreed that the problem was a serious one. In fact, Girish told us that the government had taken cognizance of the issue of high nitrate levels and was looking for potential solutions in this domain. </p>
  <p>Firstly, they gave us some advice on getting research funding. Other than suggesting potential agriculture companies that may be interested in funding such research, they emphasized the need for a visible impact. Any consumer or potential investor would require strong, visible evidence of a working product to be convinced about its impact. They recommended we keep this in mind while approaching potential funding opportunities. </p>
  <p>We received a lot of entrepreneurial insight from this discussion. Girish told us to understand the difference between the customer and the consumer. While the product would eventually be used by farmers, it would not be feasible to market it to them individually, given the expanse of agriculture in India. He pointed us towards a preexisting distribution system that we could rely on to scale up a potential business model. Since we had already established that policymakers understood the gravity of the leaching problem, they would be looking to invest in fledgling solutions. So the government as a customer makes much more sense!</p>
  <p>The government already has preexisting channels to disburse agricultural products and information, so the logistics would be taken out of our hands entirely. The important thing is to come up with a working product, which the government could buy and distribute to farmers, either as a commercial product or at subsidised rates. This business model eliminates the need to convince the approximately 120 million farmers who practice agriculture in India. In fact, the problem has already been acknowledged by the actual customer- the government, only a viable solution is needed to fill the void. </p>
  <p>Another potential business model we discussed was an expansion of our current idea. Gaurang asked us about the proportion of nitrates in water that comes from agriculture and industries, a statistic that no previous studies have looked at. He suggested that instead of only looking at fields, we should expand our scope to water as well. Keeping the method of ammonium to nitrate conversion the same, if one could convert nitrates in water to ammonium, two customer bases emerge. Firstly, a bioreactor could be developed to help industries reduce emissions or modulate the amounts of nitrates released into water. This water, which usually goes to waste, can be treated to contain the desired proportion of nitrates and ammonium and sold to industries that need the raw material. This is where it comes full circle, the major user of nitrates and ammonium? Fertilizer companies!</p>
  <p>Effectively, this business model would reduce the loss of nitrogen from industries and supply it to someone who already uses it as a raw material. Gaurang emphasized that this is a neat little niche that a potential entrepreneurial undertaking could target.</p>
  <p>A third business model consisted of tying up with water purification plants that require extensive and costly equipment to remove nitrates from water. If a bioreactor were supplied to them that could reduce the load on these expensive filters, a lot of equipment cost could be saved. Since most water purification plants are not independent establishments, but rather owned by a larger parent company, expansion of such a model is much easier. Going further, Gaurang mentioned that a smaller-scale customer, residential complexes that produce a lot of sewage, also need extensive filtration systems. This would, however, require a study of the proportion of nitrate in the sewage water and how pre-existing filtration systems work. </p>
  <p>Girish, being from an administrative background, told us to consider the implications of GMO use in agriculture, specifically bacteria, and how this fits into governmental norms in the domain. He recommended we look at GEAC - the governmental body regulating GMO Policy for guidance.  Additionally, he also told us to look into application mechanisms for such a product in further detail, since this would greatly impact the scalability. Another point was the use of nitrogen cycling bacteria (non-GMO) in agricultural products. We would have to speak to experts in the biofertilizer domain to understand the specifics of this, but clearly, bacteria to aid plant growth is not a completely novel concept. A promising sign for future GMO use in agriculture!</p>

  Leads:
  <ul style="list-style-type: disc; padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">
  <li style="margin-bottom: 8px;">Mahabeej, BIOCON, and Syngenta - Potential Sponsors</li>
  <li style="margin-bottom: 8px;">GEAC- Body Regulating GMO use</li>
  <li style="margin-bottom: 8px;">Contacting the National Institute of Plant Health Management, Hyderabad</li>
  `,

  blog_five:`
  <h1>Shanthamurthy, Farmer, Berambadi Village</h1>
  <p>We were connected to Shanthamurthy’s by the Indo-French Cell at the Department of Civil Engineering at IISc. Shanthumurthy is a farmer from the Berambadi village, which is around 400 Kilometers from Bangalore. For over 6 years, he has been helping researchers conduct surveys and collect soil samples from villages in his locality.</p>
  <p>We wanted to meet Shanthu to get a holistic view of agriculture, fertilizer use, and awareness about nitrate leaching among rural communities. We first collected soil samples from various fields, including a variety of crops. Shanthu explained rain-based and irrigation-based based for the crop that is being grown. This is heavily influenced by how much capital a farmer has, since digging a borewell is quite expensive. Next, we wanted to collect water samples and visit a river adjacent to the village. </p>
  <p>Here we interviewed a farmer from Berambadi regarding how fertilizers are used, where the runoff goes, and whether they have water filters. The runoff went into the river, which had many villages downstream. Almost 60% of the villagers drank unfiltered water from the borewells. While his village had a water filter, it was only open during the day, so people often drank unfiltered tap water when at home. When in the fields, borewell water was drunk directly, without any filtering. We also collected a water sample from the borewells as well as the lake to test for nitrate levels. </p>
  <p>Another farmer we met was from a smaller village with only around 100 families and no water filter. Out of these, only four or five went to nearby Gopalapura and Berambadi villages to get filtered water. Everyone else relied on borewell water and water from the river Kaveri.</p>
  <p>Both farmers said many people preferred drinking unfiltered water because they were used to it. This was despite the fact that both farmers knew of anecdotal evidence about increased knee pain over the past few years, and governmental awareness campaigns about the dangers of unfiltered water.</p>
  <p>Next, Shanthu took us to the water filter of the village, which is managed by the owner of the dairy. We interviewed the owner about the frequency of water supply, and learnt that the filtered water costs 5 rupees per litre. Although this seems a paltry amount, we learnt that around 64 children attending the school opposite to the dairy had to drink unfiltered water, since they could not afford even this. In order to set up a healthier system to provide water to students, we have set up a fundraiser to purchase a filter.</p>
  <p>Throughout the day, we spoke to multiple farmers, and most of them were quite open to using GMOs on their fields, as long as it ensured higher yield or reduced fertilizer use and saved costs. They were quite aware of the low efficacy of fertilizers and the specifics of what quantities to use, contrary to what we had initially believed.</p>
  Leads:
  <ul style="list-style-type: disc; padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">
  <li style="margin-bottom: 8px;">It is very important to spread awareness about the dangers of high nitrate levels in rural communities. </li>
  <li style="margin-bottom: 8px;">First actual interaction with farmers to understand their perspectives on the problems of excess fertilizer use, efficiency, and nitrate leaching. </li>
  `,

  blog_six:`
  <h1>Shyam Sundar Agrawal, Director, Ministry of Chemicals and Fertilizers, Government of India</h1>
  <p>In May 2025, we mailed the Director of the Ministry of Chemicals and Fertilizers. It was our first step in contacting the government. Our leap of faith paid off well, for we had a nice conversation with Shyam Sundar Agrawal and got a glimpse into how the Department of Fertilizers operates.</p>
  <p>The Fertilizer Association of India (FAI) issues control orders – a list of fertilizer constituents and their permissible composition. For a new fertilizer to hit the markets, it must first be approved by the Indian Council of Agricultural Research (ICAR), subject to these standards. Fertilizers are tested on confined fields as a part of this approval process.</p>
  <p>Shyam Sundar Agrawal reaffirmed the importance of our project. “The effective use of urea is only 35%”, he mentioned. The Department of Fertilizers works on how this urea can be made available to farmers, what the requirements are, ensuring they possess appropriate quantities of fertilizers, gauging their price, etc. They also analyse what materials are available indigenously, and what, along with how much, needs to be procured from elsewhere. Farmers’ requirements are communicated to them via state governments. He suggested we contact the Government of Karnataka to learn more in this regard. He also encouraged us to file an RTI (Right To Information) application to access documents and data from NITI Aayog and the Department of Agriculture. He emphasized this multiple times, saying that we can write as many questions as we want through a single application.</p>
  <p>When asked for his thoughts on our project, Shyam Sundar Agrawal said that the Department is struggling with finding a solution to nitrate leaching as well. It is also significant to the industry, for a new product that combats this problem will change the scene. He advised us to contextualize our project well. To our joy, he said that GMOs are losing their negative connotation, and their use is slowly being appreciated. Agriculture-related setups, such as Compressed Biogas (CBG) plants, already use bacteria, so the use of GMOs is a natural step forward.</p>
  <p>As our first interaction with government officials, Shyam Sundar Agrawal was greatly welcoming and supportive of our work. This conversation was a starting point for a long, deep dive into laws and regulations concerning fertilizers and GMOs.</p>
  Leads:
  <ul style="list-style-type: disc; padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">
  <li style="margin-bottom: 8px;">Read Control Orders published by FAI</li>
  <li style="margin-bottom: 8px;">Contact the Karnataka State Agriculture Department</li>
  <li style="margin-bottom: 8px;">Talk to ICAR and NITI Aayog</li>
  `,

  blog_seven:`
  <h1>Dr. Priyanka Jamwal - Programme Leader, Sr. Fellow - Water and Society, ATREE</h1>
  <p>We would like to introduce you to Dr. Priyanka Jamwal from the Ashoka Trust for Research in Ecology and the Environment (ATREE). Her field of research, namely soil and water contaminants, not only contributes to the advancement of our understanding of the environment but also creates a direct social impact.</p>
  <p>The focus of our project, the conversion of soil nitrates into ammonium, which aims to prevent valuable nitrogen from being lost by dissolution in water, also helps the environment in another way. Soil nitrates that are dissolved by water make their way to water bodies, making the water there rich in minerals. This, in turn, causes the growth of algae, especially on the surface of a stagnant water body in a process called eutrophication. Eutrophication has the potential to dramatically alter an aquatic ecosystem by preventing sunlight from reaching underwater and modifying the composition of dissolved gases.</p>
  <p>Almost 70 percent of the Indian population lives in villages and is highly dependent on groundwater, large tanks, and lakes for their water supply. Hence, any damage to such water bodies by eutrophication has the potential to threaten numerous livelihoods. In addition to this, rural villages that depend on farming suffer economic losses by using more fertilizers than necessary, as a large part of the nitrates gets washed away and only a small quantity is absorbed by plants.</p>
  <p>As the head of the Water and Soil lab at ATREE, Dr. Priyanka provided numerous valuable inputs. According to her, water quality and monitoring tend to focus on microbial contaminants and heavy metals, overlooking nitrates. Most of these high nitrate levels are also primarily present in rural areas and are associated with prevalent fertilizer use. Additionally, soak pits built under the Swachh Bharat scheme to dump waste leach out nitrates and other harmful effluents, with contamination often spanning a radius of over 30 meters, adversely affecting groundwater in the region. As part of our interaction with her, we visited several water bodies across Bangalore and collected samples for analysis. We observed that nitrate levels were concerningly high, with most regions having borderline concentrations and some having concentrations exceeding acceptable limits.</p>
  <p>Dr. Priyanka also enlightened us about the Jal Jeevan mission - another scheme undertaken by the Government of India - which aims to provide safe, potable water to rural areas. Our project helps tackle the source sustainability of drinking water. She suggested that we present our project in that context to connect it with existing large-scale sustainable development and public welfare programs. In fact, we were encouraged to focus on groundwater contamination more than eutrophication.</p>
  <p>In her opinion, social science is vital to research and has the potential to increase the outreach of our biological research. Any science that has a direct impact on the lives of numerous people must have social scientists as part of the team to provide a human angle to the target research. Our most valuable takeaway from this conversation was appreciating the importance of Human Practices and learning how we should approach the same.</p>
  <p>We are thankful for the opportunity to work with this eminent researcher who has provided a new perspective to our research. With her inputs, we learned to present our work holistically.</p>
  Leads:
  <ul style="list-style-type: disc; padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">
  <li style="margin-bottom: 8px;">Touch grass - visit villages and lakes</li>
  <li style="margin-bottom: 8px;">Collect data from said places yourself</li>
  <li style="margin-bottom: 8px;">Understand the reality that forms the backdrop for your project</li>
  `,
  
  blog_eight:`
  <h1>Dr. Suchiradipta Bhattacharjee - Researcher, Water Policies and Governance, International Water Management Institute</h1>
  <p>What does the government think about nitrate leaching? We wanted to understand the administrative perspective on this problem, and approached Dr. Suchiradipta Bhattacharjee, a social scientist working with the International Water Management Institute. We got the perspective of someone who works at the interface of the agricultural and water components of our project, which was very insightful. </p>
  <p>Dr. Suchiradipta described the scale of the nitrate leaching problem and mentioned that the government is currently looking at solutions to tackle it because of how widespread and prevalent it is. We learnt that leaching also affects groundwater recharging projects - something we had not considered before. </p>
  <p>The government has been making efforts to replenish groundwater through harvesting systems, better water management, and improved use of agricultural runoff. The latter, however, poses significant problems when leaching is taken into account. If this water is used to replenish underground aquifers, the water quality is significantly worse than before. And this damage is not localized!</p>
  <p>Since aquifers span many villages, a recharging project in one village can potentially lace the water of downstream aquifer villages with nitrates. With this context, she said stopping leaching at a farm level would definitely be beneficial, and would definitely garner support from policymakers from the water side of the spectrum. The ethical impacts of water recharging in this manner, and balancing the benefits of groundwater recharge against the reduced quality of water, are issues the government is thinking deeply about - this is a gap our project can fill very effectively. </p>
  <p>Coming to the implementation from an agricultural point of view, Dr. Suchiradipta reiterated that regulations regarding GMOs in the soil are very complicated. However, given that BT Cotton has been permitted for commercial use, and other BT varieties are under testing, the future looks very promising. </p>
  <p>Another important takeaway was the split of nitrogen emissions between agricultural fields and industries. While industries release effluents with high concentrations of nitrates, the sources are smaller in number. However, agriculture and in extension fertilizer use are far more widespread, so even if a smaller unit flux is from agriculture, it may still constitute a significant part of the total. She also agreed to help us find data to understand the divide between agricultural and industrial contributions to nitrate pollution, based on which we could consider a water-based solution to excess nitrates. </p>
  <p>Dr. Suchiradipta also questioned us about the ecological impact of such a solution. How would a genetically modified bacterium compete with other microbes that are involved in nitrogen cycling? She validated the idea of using an organism already present in the soil, Pseudomonas putida, since it would reduce the complexity of the ecological impact by reducing the number of variables. Throughout the talk, she reiterated the different perspectives that experts from the agriculture and groundwater sides of the problem have, and indicated that a communication gap exists between these sectors. Lastly, she urged us to look at the various environmental components our project would potentially impact- soil health, plants, animals, and humans- something we have consistently tried to do with our human practices efforts. </p>
  `,

  blog_nine:`
  <h1>Interviews From the Field Visit in Pune</h1>
  <p>We spoke to Datta Pansare, a farmer from Talegaon, a village 40 kilometres from Pune. This was an important conversation, since we understood the agriculture and water management infrastructure from a different state. The information we got was surprising!</p>
  <p>Unlike Karnataka, where we visited the Berambadi village, most villages had water filters installed. Drinking water from lakes and rivers was limited only to cattle. Similar to Berambadi, the farmers in the region were quite well educated about the appropriate quantities of fertilizers to be used. However, Datta conceded that losses of fertilizer do occur during rains and irrigation. When asked about GMO use, he said he did not know what the term meant. Using the example of commercially available GMO varieties like BT Cotton, we explained what a GMO is and how we planned to use them in our project.</p>
  <p>Based on this, he said that most farmers are quite open to experimentation. As long as studies show an increase in crop yield, farmers would be ready to use a GMO to aid crop growth. </p>
  <p>Sandeep, a farmer from Khed in Maharashtra, explained to us how potatoes and onions are planted and the growth pattern of these crops. He also explained how garlic is grown, and the specific method of irrigation used for the same. </p>
  <p>In his village, mostly organic manure is used during the tillage of land to improve soil quality. Later, while planting the seeds, a small amount of chemical fertilizers like urea is added, and pesticides are sprayed. We asked whether he had a soil health card, based on an interaction with Dr. Lavanya,  but he didn’t. He also mentioned insurance policies available to farmers in case of losses during a season. He mentioned that his village has both black and red soil. While black soil has a high water-holding capacity, it seeps away from red soil quite easily.</p>
  <p>The seeped water goes to the groundwater aquifer, which connects to the well in the village. This is the primary water source since there is no filter. In villages with 400-500 inhabitants, ts small water filters are available, while smaller villages use wells or borewells. He explained that drinking borewell water caused ailments in the populace, with kidney stones and bladder stones becoming increasingly common.</p>
  <p>We also spoke to Deepak, who owns 20 acres in a different village, Wada. He explained methods that farmers use to ensure crops don't rot during heavy rainfall. Channels like troughs are made through which water can flow, and the seeds are planted on the elevated regions. </p>
  <p>We asked them both about the willingness of farmers to use new products, which could increase crop yield and decrease fertilizer use. They said that the farming community is very open to experimenting, and they usually try out new products on a small patch of land. If positive results are seen, not only do they start using the product, but they also recommend it to other farmers in the village. Usually, they come across new products at the farmers' market, after which they try them out. </p>
  <p>Both farmers knew about GMOs, so we asked them whether they would be open to using a GMO to aid crop growth. The answer was a resounding yes. Sandeep explained that positive reinforcement is prevalent in the farming community. If someone comes across a new product, they make sure to tell others about it. Hence, a working product would be quite readily accepted, independent of the GMO tag.</p>
  `,

  blog_ten:`
  <h1>Dr. Rahul Jog - Head R&D, Bioprime AgriSolutions</h1>
  <p>While studying application mechanisms for microbes in an agricultural context, we learnt about Pseudomonas species being used as biofertilizers. In order to understand this better, we spoke to Dr. Rahul Jog, the Head of R&D at Bioprime Agrisolutions, a fertilizer company. However, the discussion encompassed topics like GMO policy, categories of biological components in agriculture, and application methods.</p>
  <p>One of the key takeaways is that the method of genetic engineering significantly affects how it is perceived. While techniques like CRISPR knockouts reduce genetic material and are relatively safer, using plasmids is very volatile. From a governmental approval perspective, knockouts pose a lesser risk compared to vectors. When we explained our plan to eventually turn to genomic integration, after validating the proof of concept, Dr. Jog agreed it would be a more robust approach. The presence of antibiotic resistance genes, which are essential to plasmids, is extremely risky due to horizontal gene transfer that commonly occurs in the soil microbiome. </p>
  <p>While genomic integration is much more suited from a regulatory perspective, he conceded that expression levels would be much lower compared to those on a plasmid. </p>
  <p>He also suggested we explore the use of our proposed bacterium under the biostimulant category. This includes substances, even some microbes, that act neither as biopesticides nor as biofertilizers. The suggestion was based on greater flexibility for approval in this category, although one must show evidence that the biostimulant does not cause harm to other ecological factors. He also mentioned a government gazette in May 2025, expanding the scope of biostimulant products. </p>
  <p>Additionally, for market launch, the specific category of the bacterium must be specified. Dr. Jog also suggested that we consider ease of integration into current mechanisms (such as drip, drench, and foliar spraying) while deciding on suitable delivery mechanisms. This allows for easier translation of the product without requiring additional investment of capital.</p>  
  `,
  

  };

  // Open modal on card click
  document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.blog;
      modalBody.innerHTML = blogContent[id] || '<p>Blog content not found.</p>';
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});
