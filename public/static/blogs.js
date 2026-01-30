document.addEventListener('DOMContentLoaded', () => {
  console.log("Blogs script loaded");
  const modal = document.getElementById('blog-modal');
  const modalBody = document.getElementById('blog-modal-body');
  const closeBtn = document.querySelector('.blog-modal-close');

  // Store blog content as HTML
  const blogContent = {
    blog_one: `
      <h1>Tracing Connections in Science and Philately</h1>
      <p><em>“All of science is either Physics or stamp collecting.”</em></p>
      <p>Ignoring the blatant bias of the statement, a far more noble pursuit would be using these stamps to understand the progression of science. Other than their inherent spatial usage in traversing letterboxes, postage stamps provide a treasure trove of historical insight. By chronicling occurrences and people that defined periods of human history, they offer a means to look at the past through the eyes of the people who experienced these events.</p>
      <p>While not all scientific achievements are philatelically memorialized, some are given the spotlight quite often. Unsurprisingly, Deoxyribonucleic Acid and associated discoveries have often been the stars of philatelic catalogues. For example, in a series titled “The Secret of Life”, the British Royal Mail released 5 stamps based on genetics and the genome. Released in the same year the Human Genome Project was completed, it is a humorous take on research into genetics, featuring caricatures of scientists and the discoveries that changed the world.</p>
      <p>Similarly, the US Postal Service issued 5 stamps honoring innovations in science and engineering, one of which was Gene Sequencing. Today, we have developed Next-Generation Sequencing techniques that are fast and cost-efficient. However, the precursor to these was Sanger Sequencing, which, after fragmenting a DNA into pieces, required painstaking manual work to decode the sequence of nucleotides. Incredibly, the Human Genome Project relied on this very technique to map the entire human genome, over a period of 13 years.</p>
      <p>However, not just human genomes are of interest to us! An Australian stamp from 2003 commemorates the 50th Meeting of the Genetic Society of Australia and also the 50th anniversary of the characterization of the DNA Double Helix by Frances Crick and James Watson. The stamps are, of course, artistic renditions, and the bright colours have been likened by the artist to fluorescent dyes, and the dark and light bands to those formed by DNA in a gel. The second stamp in the set is titled Kangaroo chromosome, and is a visualisation of what the chromosome would look like for Australia's national animal.</p>
      <p>Along with jumping marsupials, we also have stamps for jumping genes. A stamp commemorating Dr. Barbara McClintock, the discoverer of transposons or ‘jumping genes’ as they are called in popular science, was released by the US Postal Service in 2005. They are extremely useful in molecular biology and can be used to disrupt and understand the function of genes or integrate genes into the genome of an organism, among other applications.</p>
      <p>Scientists, their research, and its applications often make their way onto stamps. However, an individual, exactly like another individual, also made the cut. Dolly the Sheep, the first organism to be cloned from an adult somatic cell, has been memorialized in stamps published by Nevis, Liberia, and the Marshall Islands. A monumental breakthrough that advanced the frontiers of stem cell research and developmental biology, the feat sparked debates about the ethics of cloning in both academic and non-academic circles. Perhaps this ethical grey area is responsible for only three countries choosing to make Dolly a part of philatelic history.</p>
      <p>Stamps provide a novel way to learn about science, especially its perception in the non-academic world. In fact, given the decline in the use of postal services, historic scientific events memorialized on stamps already form an exclusive group, which may not keep growing for very long.</p>
      <h3>References</h3>
      <ul>
        <li>Zhdanov R, Cetinkaya I, Zhdanova S, Stamping through scientific advances in medicine and Genetics, J. Med. & Med. Sci, (2010)</li>
        <li>Australia Post Stamp Bulletin 270, June-July (2003)</li>
        <li>United States Postal Service (USPS) Postal Bulletin</li>
      </ul>
    `,
    blog_two: `
      <h1>How to <s>NOT</s> get iGEM Funding</h1>
      <p>We started our iGEM journey in November 2024, the perils of no funding unbeknownst to us. However, as the payment deadlines loom, first the registration fee and the Jamboree fee and then we have to buy Jamboree tickets too?</p>
      <p>Now, if yours is one of those trust fund baby teams, then you really have nothing to worry about. Don’t worry, we can relate! Our seniors were too.</p>
      <p>Now that the customary jab at our predecessors is out of the way, it’s worth mentioning we are extremely grateful. Although they had to look for funding for parts of their project, they maintained a great relationship with the sponsors, which we could leverage.</p>
      <p>But before we reached there was a lot of rejection. A lot. And what's the best way to get rejected? Ask for it over email.</p>
      <h2>A Rundown on Cold Mailing</h2>
      <p>Cold mailing is absolutely essential. It didn’t really yield results for us, but it very well could. I think. Theoretically.</p>
      <p>It all comes down to the unlikely event that someone finds a presentation you sent in a very formal email exciting. And then decided to give you money as a result. So you really have to hook them with two paragraphs and a pretty-looking pitch deck to even receive a response.</p>
      <p>Make sure your slide deck is not fluff. And not a lot of text either. One piece of advice, if you are not from the US, is to mention costs in both native currency and dollars. This avoids the hassle of conversion for a potential sponsor and might give you an edge in terms of getting a reply.</p>
      <p>Grammatical mistakes are a glaring red flag; they don’t know you are not a scammer. Try to keep everything as professional as possible; it will only increase your credibility.</p>
      <p>After all this, it’s very likely that you will get rejected. Or even worse, seenzoned. But cold mailing is the bare minimum, and you can’t really shy away from it. Good luck!</p>
      <h2>Slightly Warmer Mailing</h2>
      <p>If someone can refer you to a potential sponsor, that really goes a long way. This can either be by forwarding your proposal or by letting them know you will reach out. For example, we spoke to 3 or 4 companies and presented our idea to them in detail. Perhaps the only reason they gave us a chance was because we had a referral (and our idea was cool, but that might not be the case with yours).</p>
      <p>Talking to someone who can guide you in building a project proposal is great. This will include all the costs you would potentially incur, any preexisting sources of funding, and the benefits a sponsor will receive through their support. The latter will change on a case-by-case basis, but the standard pitch is a shoutout on your presentation and promo videos, acknowledgement on your website and on any merchandise your team creates.</p>
      <p>Another piece of advice our PI gave us: the proposal should not be technical. Try to include what your project is about qualitatively, without going into details. For example, if you are inserting a gene into a bacterium, mention what the gene does, not what gene it is. Similarly, the properties that make the bacterium are good enough, you don’t have to mention the specific strain.</p>
      <p>We made quite a lot of progress through referrals, but our quest for sponsorship had a major flaw.</p>
      <h2>When should you start looking for a sponsor?</h2>
      <p>Briefly, when you realize the trust fund you thought was yours is actually going to a charity. Start as soon as you can.</p>
      <p>Large corporations often have CSR (Corporate Social Responsibility) Funds, which they can allocate as funding if your idea is relevant. However, since we approached companies too late, they had already allocated funds for the fiscal year. Despite liking our idea, they could not sponsor us.</p>
      <p>The early bird gets the fund.</p>
      <h2>How did we eventually find sponsors?</h2>
      <p>The best sponsors are those that are affiliated with your institution, directly or indirectly. We received parts of our funding from the Axis Bank Centre for Mathematics and Computing (ABCMC) and the Kotak-IISc AI-ML Centre (KIAC). Both of these sponsors are associated with the Indian Institute of Science, our university. In fact, KIAC had sponsored the software team from our institute the previous year. One of the reasons they agreed to sponsor our team was because of the good relationship our seniors had built. So make sure you pass on the favour and keep your sponsors happy.</p>
      <p>After looking at the work we had put into our project, our university funded the last part of our budget (finally!). The moral is to keep trying and never giving up on a sponsor, no matter how unresponsive they are, or how unlikely it seems. It will pay off somewhere, and that’s your ticket to Paris.</p>
      <h2>What to do if my deadline is tomorrow and I have no money?</h2>
      <p>I remember this happening in school, except it was a science project I hadn’t started yet (and I needed help, not money). The best thing to do is to mail HQ; they are really helpful.</p>
      <p>Whenever we asked for an extension to complete administrative procedures, they granted it to us (in excess of a week). Being transparent about a lack of funding really helps, and the iGEM HQ is really considerate.</p>
      <h2>Leverage iGEM Sponsors</h2>
      <p>Another great way to secure funding is through in-kind sponsorships. The iGEM Sponsors are a great way to reduce costs and allocate those funds elsewhere. We synthesized our genes from TWIST, which really reduced our wet lab expenses. There are often calls for submissions from potential sponsors on Instagram and LinkedIn, so make sure to keep an eye out for those.</p>
      <p>It may take you down a rabbit hole about non-model organisms (more about this here), but if you end up getting selected, it’s worth it. Everything counts.</p>
      <h2>The end</h2>
      <p>(of the article, not your search for sponsorship, go cold mail someone)  Try out for any opportunity that presents itself; you don’t know what will work for you. And all the best.</p> 
      <p>May the funds be with you.</p>
    
    `
  ,
  blog_three: `
      <h1>Horizontal gene transfer: How bacteria get their superpowers</h1>
      <p>Evolution by natural selection creates a vast diversity of organisms, innumerable examples of how form meets function. A key prerequisite is the existence of genetic diversity in the population, generated via mutations, recombination, and sexual reproduction itself, which shuffles genetic material between generations. But what about bacteria, the most ancient, most ubiquitous, and arguably most successful group of organisms on the planet? They have managed to populate every habitat on Earth and form the backbone of most ecosystems. Their reproductive strategy seems deceptively simple- they reproduce asexually via binary fission— yet they evolve so rapidly that our drugs can’t keep up with them!</p>
      <p>The answer lies in a process that fundamentally challenges our traditional understanding of inheritance: horizontal gene transfer, or HGT. Unlike the vertical inheritance we see in most complex organisms, where genetic material flows strictly from parent to offspring down the generations, bacteria have evolved mechanisms to exchange genes laterally: between cells, across species boundaries, even between distantly related organisms. It’s that familiar adolescent fantasy of becoming spiderman after being bitten by a spider…only, bacteria can actually do it!</p>
      <h2>What is Horizontal Gene Transfer?</h2>
      <p>Horizontal gene transfer is the movement of genetic material between organisms outside of traditional reproduction. While vertical gene transfer follows the familiar parent-to-offspring route, HGT allows bacteria to essentially share genetic innovations across the microbial community in real time. Some researchers estimate that a significant portion of genes in any given bacterial genome have been acquired horizontally at some point in evolutionary history.</p>
      <p>This process accelerates bacterial evolution by many orders of magnitude. Instead of waiting for beneficial mutations to arise randomly and then spread slowly through populations over generations, bacteria can instantly acquire fully functional genes for new capabilities.</p>
      <h2>How do they do it?</h2>
      <p>Bacteria accomplish horizontal gene transfer through three classical mechanisms, each elegant in its own way.</p>
      <h3>Transformation</h3>
      <p>Transformation is perhaps the simplest mechanism. When bacterial cells die and break apart, they release their DNA into the environment. Other bacteria in the vicinity (if they are in a physiological state called "competence") can take up this naked DNA from their surroundings and incorporate it into their own genomes. Competence varies: some bacteria like Bacillus subtilis and Streptococcus pneumoniae are naturally competent under certain conditions, others require specific  stimuli.</p>
      <h3>Conjugation</h3>
      <p>Conjugation involves direct cell-to-cell contact through structures called pili ( essentially molecular bridges that connect donor and recipient cells). Through these connections, donor cells can transfer plasmids) or even portions of chromosomal DNA to recipients. This process requires elaborate machinery encoded by the transferred genetic elements themselves, creating a self-perpetuating system for gene sharing. Conjugation is especially important because it can transfer large chunks of DNA, sometimes entire suites of genes, for complex capabilities like antibiotic resistance or virulence.</p>
      <h3>Transduction</h3>
      <p>Transduction uses viruses as vectors. Bacteriophages can sometimes accidentally package bacterial DNA instead of, or along with, their own viral genomes. When these phages infect new bacterial hosts, they inject this bacterial DNA, which can then integrate into the recipient's genome. This ‘genetic trafficking’ can move genes between even distantly related bacterial species that a phage happens to infect.</p>
      <p>Recent research has found more routes for genetic exchange. Gene transfer agents (GTAs) are virus-like particles produced by some bacteria that package random segments of the host's DNA and transfer them to other cells…on purpose! Membrane vesicles can carry DNA and other cellular contents between cells. There's even evidence for direct uptake of DNA through nanotubes connecting bacterial cells, and transfer mediated by fungal networks in soil.</p>
      <h2>The Soil: An internet of genes!</h2>
      <p>If horizontal gene transfer is common in bacteria generally, it reaches its peak in one of Earth's most complex ecosystems: soil. A single gram of soil contains billions of bacterial cells representing thousands of different species, all living in close proximity, competing for resources, and constantly exchanging genetic material. It’s no surprise that HGT would play a big role in their underground economy!</p>
      <p>The physical properties of soil make it very conducive to HGT. Bacteria form complex communities on soil particles, in water films around those particles, and especially in biofilms. These biofilms create microenvironments where cells are in close contact, perfect for conjugation. The soil matrix itself plays an active role: clay particles can bind and protect DNA molecules from degradation, creating stable reservoirs of genetic material available for transformation. Decomposing organisms (plants/invertebrates/bacteria) release DNA that persists in the soil environment, sometimes for weeks or months.</p>
      <p>The rhizosphere (the part of the soil surrounding plant roots) is a hotspot for horizontal gene transfer. Plant roots exude a cocktail of sugars, amino acids, and other compounds that attract dense bacterial communities. These root exudates can increase plasmid transfer frequencies compared to bulk soil.</p>
      <p>The high bacterial density, abundant nutrients, and intense competition in the rhizosphere create conditions that strongly favor genetic exchange.</p>
      <p>Soil serves as the original reservoir for many antibiotic resistance genes. This isn’t surprising, as many of our antibiotics come from soil microorganisms. Fungi like Streptomyces produce these compounds as chemical weapons against competitors. This is part of an arms race playing out over millions of years: soil bacteria have evolved sophisticated resistance mechanisms, and these resistance genes circulate through soil communities via HGT. The concern arises when these genes transfer to pathogenic bacteria. Agricultural practices that apply manure or biosolids as fertilizers can introduce resistance genes from animal and human microbiomes into soil, where they join the existing genetic pool and can potentially spread to environmental bacteria.</p>
      <p>Apart from resistance genes, bacteria often exchange genes that let them metabolise carbon sources, tolerate heavy metals, fix nitrogen, promote plant growth, suppress pathogens, and survive harsh pH levels. This gene-sharing allows microbial communities to respond quickly to changes like farming practices, pollution, or climate shifts.</p>
      <p>Recent research using fabricated ecosystems has revealed fascinating dynamics of HGT in the rhizosphere. https://journals.asm.org/doi/10.1128/aem.01505-24 Scientists have shown that fungal mycelia can serve as highways for bacterial movement and genetic exchange. Bacteria traveling along these fungal networks encounter diverse microbial communities, creating opportunities for HGT that wouldn't exist otherwise.</p>
      <h2>Zooming out…</h2>
      <p>Horizontal gene transfer raises interesting questions about how we understand bacterial evolution and ecology, and about the very concept of a bacterial species.</p>
      <p>Traditional species concepts rely on reproductive isolation— members of a species can reproduce with each other but not with members of other species. This makes no sense for bacteria that don't reproduce sexually and can exchange genes across vast evolutionary distances. What does it mean to be an E. coli when a significant fraction of the genome might have been acquired from other bacterial lineages? Microbiologists have developed various species definitions based on genome similarity thresholds, but these feel somewhat arbitrary in the face of extensive HGT.</p>
      <p>Different strains of the same species might have surprisingly different gene contents, depending on their ecological history and the genetic material they've encountered before. Perhaps bacterial genomes are better understood not as static hereditary units but as fluid mosaics— with a core of vertically inherited genes that define the basic cellular machinery, surrounded by a flexible accessory genome that can be gained or lost through horizontal transfer.</p>
      <p>This has implications for how we think about bacterial adaptation. Is the relevant unit of selection the individual bacterial cell, the gene, or perhaps the entire microbial community with its shared gene pool? In soil, especially, it seems that bacterial communities function as genetic collectives, with innovations rapidly shared through HGT. A beneficial mutation that arises in one species can spread through the community, allowing multiple species to benefit from a single evolutionary innovation.</p>
      <p>The frequency and patterns of HGT also raise questions about constraints. If gene exchange is so beneficial, why doesn't it happen even more often? Why do bacteria maintain restriction-modification systems that defend against foreign DNA? The answer probably involves a balance between the benefits of genetic novelty and the risks of acquiring disadvantageous genes or being exploited by selfish genetic elements (found aplenty hitch-hiking in microbial genomes). So HGT is not universally beneficial— taking up the wrong genes can be lethal, and some mobile genetic elements are essentially genomic parasites that spread without benefiting their hosts.</p>
      <p>There's also something philosophically intriguing about HGT. We humans tend to think of ourselves as individuals with clear genetic boundaries. But bacteria remind us that life's organization can be fundamentally different. In the soil beneath our feet exists a vast genetic web where boundaries blur, where innovations are communal property, and the line between self and other is permeable.</p>
      <p>Horizontal gene transfer also occurs in eukaryotes, even plants!</p>
      <p>https://www.nature.com/articles/nrmicro.2017.137  Our genome too, while not capable of dramatic HGT, is full of evolutionary debris, misplaced viral DNA, transposable elements, and other DNA whose origin and function we are still discovering. We clearly have much yet to learn, which may change the way we look at our genetic heritage.</p>
      <p>From a practical standpoint, understanding HGT in soil is crucial for predicting the spread of antibiotic resistance and developing strategies to slow it. It also matters for biotechnology: if we introduce genetically engineered bacteria into soil for bioremediation or agriculture, how quickly will their engineered genes spread to other species? Should we be concerned about this, or could it even be beneficial? These aren't just academic questions…they have real implications for environmental management and public health.</p>
      <p>We’re only beginning to understand the intricate workings and secrets of bacterial success, and Horizontal Gene transfer is one of the most fascinating ones so far!</p>
      <h3>References</h3>
      <ul>
        <li>Horizontal gene transfer and adaptive evolution in bacteria (Nature Review paper): https://www.nature.com/articles/s41579-021-00650-4</li>
        <li>Horizontal gene transfer is predicted to overcome the diversity limit of competing microbial species https://www.nature.com/articles/s41467-024-45154-w</li>
        <li>https://journals.asm.org/doi/10.1128/mmbr.00225-24 Gene transfer in soil microbiota</li>
        <li>Tempo and mode of HGT https://www.cell.com/trends/microbiology/fulltext/S0966-842X(25)00100-3</li>
      </ul>
    `,
    blog_four: `
      <h1>Reducing Ammonia Volatilization — The Silent Killer</h1>
      <p>When we talk about nitrogen loss from agricultural systems, most people immediately think of nitrate leaching. But another major — and often overlooked — culprit is <strong>ammonia volatilization</strong>. This process occurs when ammonium in the soil is converted into ammonia gas, which then escapes into the atmosphere.</p>
      <p>Once airborne, ammonia reacts with other gases to form fine particles that are harmful to human health. It also contributes to climate change, soil acidification, and eutrophication. In fact, it is estimated that over <strong>50% of all global ammonia emissions</strong> come from agricultural soils — and in areas with high livestock farming, this figure can reach <strong>70%</strong>. The good news is that most of these losses stem from agricultural practices, which means that adopting better management techniques can drastically reduce ammonia loss.</p>

      <h2>How can we reduce ammonia volatilization?</h2>
      <p>Here are some well-tested methods farmers can adopt to reduce volatilization and keep more nitrogen where it’s needed — in the soil.</p>

      <h3>1. Proper Incorporation of Fertilizers</h3>
      <p>Ammonia volatilization happens mainly at the soil surface. If fertilizers remain on top without being mixed in, they’re far more likely to be lost as gas. To prevent this:</p>
      <ul style="list-style-type: disc; padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">
        <li style="margin-bottom: 6px;">Till or lightly incorporate fertilizers into the soil after application.</li>
        <li style="margin-bottom: 6px;">Inject fertilizers below the surface rather than applying them on top.</li>
      </ul>

      <h3>2. Apply Fertilizer at the Right Time</h3>
      <p>Weather conditions can greatly influence ammonia loss. Volatilization rates increase during high wind speeds and lower temperatures. By avoiding fertilizer application during such conditions when possible, farmers can significantly reduce nitrogen loss.</p>

      <h3>3. Add Fertilizer in Intervals Rather than in Bulk</h3>
      <p>Applying fertilizer in smaller, spaced-out doses instead of a single large one keeps ammonium concentrations lower, which in turn slows the rate of volatilization. It’s a simple strategy that can make a big difference.</p>

      <h3>4. Manage Irrigation Timing</h3>
      <p>Irrigating the soil shortly after applying fertilizers helps dissolve ammonia back into ammonium, reducing volatilization. However, this method comes with trade-offs:</p>
      <ul style="list-style-type: disc; padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">
        <li style="margin-bottom: 6px;">It can increase nitrate leaching if not timed properly, so finding the right interval is crucial.</li>
        <li style="margin-bottom: 6px;">For manure-based fertilizers, wetting can increase ammonia loss by speeding up uric acid hydrolysis, so this method must be adapted carefully.</li>
      </ul>

      <h3>5. Acidify the Soil</h3>
      <p>Using more acidic fertilizers can reduce volatilization by shifting ammonia into its ammonium form. However, soil acidification must be managed carefully, as it can disrupt the soil microbiome. Most plants and beneficial microbes thrive at specific pH ranges, so excessive acidification could have unintended consequences.</p>

      <h2>Why This Matters</h2>
      <p>Ammonia volatilization is not just a matter of losing fertilizer — it’s a major environmental and public health issue. Reducing these emissions means cleaner air, healthier soils, lower input costs, and more sustainable agriculture. Small changes in management practices can lead to big improvements in nitrogen use efficiency.</p>

      <h3>References</h3>
      <ul style="list-style-type: decimal; padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">
        <li style="margin-bottom: 8px;">ltp123. “Techniques to Control Ammonia Volatilization in Farming | Live to Plant.” <em>Livetoplant.com</em>, 21 July 2025. <a href="https://livetoplant.com/techniques-to-control-ammonia-volatilization-in-farming/" target="_blank">https://livetoplant.com/techniques-to-control-ammonia-volatilization-in-farming/</a></li>
        <li style="margin-bottom: 8px;">Sommer, S.G., and N.J. Hutchings. “Ammonia Emission from Field Applied Manure and Its Reduction—Invited Paper.” <em>European Journal of Agronomy</em>, vol. 15, no. 1, Sept. 2001, pp. 1–15. <a href="https://doi.org/10.1016/s1161-0301(01)00112-5" target="_blank">https://doi.org/10.1016/s1161-0301(01)00112-5</a></li>
      </ul>
    `,

    blog_five: `
      <div class="blog-content-fix">
        <style>
          .blog-content-fix em { display: inline !important; }
          .blog-content-fix img { max-width: 100% !important; height: auto !important; }
        </style>

        <h1>Identifying homologous with identical function in newly discovered bacterial species</h1>
        <p>When a new bacterium has been isolated from the environment, and its genome has been sequenced, we can compare it to the genomes of already known bacteria to find similar genes and operons, which may indicate that this new organism produces a similar protein as the bacteria it was compared to.</p>
        <p>This process is of vital importance in characterizing metabolic pathways in this new species, as it can help us identify the exact genes and enzymes that are involved in the pathways, or instead might lead to the discovery of new enzymes for previously well studied pathways!</p>
        <p>Sometimes, we can discover new properties of the enzyme involved and functionalities that were previously not known. For example, an enzyme that was thought involved in an anaerobic pathway can be discovered to also work in aerobic pathways, indicating that the function of the enzyme may not be linked to oxygen environment, but instead its expression might be controlled by an oxygen-dependent factor.</p>
        
        <h2>Setting the scene</h2>
        <p>During our wet lab DBTL cycle #2, we came across 3 newly discovered Neobacillus species, which performed DNRA (Dissimilatory Nitrate Reduction to Ammonia), and are one of the very few species observed to perform this pathway under aerobic conditions.</p>
        <p>Rudimentary analysis of all the 3 genomes was performed by the research group that identified the species, and they identified the enzymes involved in nitrate ammonification and denitrification. Since our focus was on DNRA, we took a look at their identification of genes involved in DNRA and in 2 of the species each found that had seemingly found two different variations of the <em>nirB</em> gene, which is involved in nitrite reduction (as shown in fig 1 below).</p>
        
        <img src="https://static.igem.wiki/teams/6006/gt/blog1.avif" 
          alt="Gene clusters" 
          class="animate-on-scroll" 
          style="display: block; margin: 2rem auto; width: 100%; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
        <p class="image-credit">Figure 1: Clusters of <em>nirB</em> genes identified on genomes of Neobacillus spp. strains PS2-9 (A) and PS3-12 (B), and <em>B. salipaludis</em> strain PS3-36 (taken from Seohyun Ahn, et al, 2025)</p>

        <p>We decided to properly analyze these gene segments to figure out what this apparent oddity meant.</p>
        
        <h2>Method of Analysis</h2>
        <p>Firstly, we ran BLAST comparisons on GenBank of the some of these gene segments against the database, and to our surprise, we found that the <em>nirB</em>(1) genes were almost identical to the <em>nasB</em> gene of <em>B. subtilis</em> and the <em>nirB(2)</em> gene was almost identical to the <em>nasD/nirB</em> gene of <em>B. subtilis</em>.</p>
        <p>The second result was expected, since <em>nirB</em> and <em>nirD</em> genes encode the subunits that together form the cytoplasmic nitrite reductase NirBD.</p>
        <p>The first result was however very surprising, since although seeming identified as <em>nirB</em>(1), encodes the large subunit NirB of <strong>nitrite</strong> reductase NirBD, the gene showed very high similarity to the <em>nasB</em> gene, which encodes the subunit of a cytoplasmic <strong>nitrate</strong> reductase.</p>
        <p>To confirm this, we thoroughly analyzed (from literature) the structure and function of the NasB and NirB/NasD proteins and were able to find the key motifs and their location in the amino acid sequences of the enzymes, which are responsible for their activity.</p>
        <p>Upon locating these motifs and their locations, we compared this to the amino acid sequence of <em>nirB</em>(1) and <em>nirB</em>(2) and found that all the key motifs of <em>nasB</em> were present in <em>nirB</em>(1) and all those of <em>nasD/nirB</em> were found in <em>nirB</em>(2).</p>
        <p>This led us to definitively conclude that the gene labeled as <em>nirB</em>(1), was actually in fact <em>nasB</em>, and the encoded protein is the subunit of the nitrate reductase enzyme, and <em>nirB</em>(2) was indeed <em>nirB</em>, and encodes the NirB subunit of NirBD.</p>
        <p>Upon further BLAST comparisons, we found that the entire operon identified in <em>B. salipaludis</em> PS3-36 was almost identical piecewise to the <em>nasABCDEF</em> operon in <em>B. subtilis</em>, and the gene identified as <em>cobA</em> was identical to the <em>nasF</em> gene in <em>B. subtilis</em>.</p>
        
        <img src="https://static.igem.wiki/teams/6006/gt/blog2.avif" 
          alt="Gene clusters" 
          class="animate-on-scroll" 
          style="display: block; margin: 2rem auto; width: 100%; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
        <img src="https://static.igem.wiki/teams/6006/gt/blog3.avif" 
          alt="Gene clusters" 
          class="animate-on-scroll" 
          style="display: block; margin: 2rem auto; width: 100%; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
        <p class="image-credit">Figure 2: Gene cluster in <em>B. salipaludis</em> PS3-36 and <em>nas</em> operon in <em>B. subtilis</em>. (image from Michiko M Nakano et al). Even visually the gene cluster structure is very similar that of the <em>nas</em> operon</p>

        <p>This was a pretty big achievement for us, since we were able to clarify the actual role of the genes, but moreover there was another huge implication of the fact that the nas operons of <em>B. subtilis</em> being almost identical to the gene cluster of <em>B. salipaludis</em> PS3-36: the enzymes conventionally thought to only take part in the assimilatory process can also be involved in DNRA, since no other nitrate/nitrite reducing enzymes were identified in this strain, indicating that the two processes are essentially identical (in this strain, at least).</p>
        <p>Later we came across a research group that found the same result for <em>P. putida Y-9</em>, however this genome data was not available on GenBank.</p>

        <h3>References</h3>
        <ul style="list-style-type: decimal; padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">
          <li style="margin-bottom: 8px;">Nakano, Michiko M., et al. “Nitrogen and Oxygen Regulation of Bacillus Subtilis NasDEF Encoding NADH-Dependent Nitrite Reductase by TnrA and ResDE.” Journal of Bacteriology, vol. 180, no. 20, 15 Oct. 1998, pp. 5344–5350, <a href="https://doi.org/10.1128/jb.180.20.5344-5350.1998" target="_blank">https://doi.org/10.1128/jb.180.20.5344-5350.1998</a></li>
          <li style="margin-bottom: 8px;">Ahn, Seohyun, et al. “Dissimilatory Nitrate Reductions in Soil Neobacillus and Bacillus Strains under Aerobic Condition.” The Journal of Microbiology, vol. 63, no. 2, 27 Feb. 2025, pp. e2411019–e2411019, <a href="https://doi.org/10.71150/jm.2411019" target="_blank">https://doi.org/10.71150/jm.2411019</a></li>
          <li style="margin-bottom: 8px;">Ogawa, K, et al. “The NasB Operon and NasA Gene Are Required for Nitrate/Nitrite Assimilation in Bacillus Subtilis.” Journal of Bacteriology, vol. 177, no. 5, Mar. 1995, pp. 1409–1413, <a href="https://doi.org/10.1128/jb.177.5.1409-1413.1995" target="_blank">https://doi.org/10.1128/jb.177.5.1409-1413.1995</a></li>
          <li style="margin-bottom: 8px;">Nakano, M M, et al. “Nitrogen Regulation of NasA and the NasB Operon, Which Encode Genes Required for Nitrate Assimilation in Bacillus Subtilis.” Journal of Bacteriology, vol. 177, no. 3, Feb. 1995, pp. 573–9, pubmed.ncbi.nlm.nih.gov/7836289/, <a href="https://doi.org/10.1128/jb.177.3.573-579.1995" target="_blank">https://doi.org/10.1128/jb.177.3.573-579.1995</a></li>
        </ul>
      </div>
    `,
    blog_six: `
      <h1>Biostimulants: Like fertilizers, but better</h1>
      <p>Biostimulants are defined as substances, other than fertilizers, that aid plant growth and development when applied in low quantities. They also improve the nutrient and water use efficiency, crop yield, quality, health, and ability to tolerate abiotic stress, increase grain or fruit fill, etc.</p>
      <p>Here, the terms ‘other than fertilizers’ and ‘low quantities’ are important, since fertilizers, pesticides, and other soil amendments - which also promote plant growth - are applied in large quantities. The term ‘Metabolic Enhancers’ was used for a while, before the term ‘Biostimulants’ took over.</p>
      <p>A biostimulant, on its own, can only increase the plants’ robustness, but not other factors like resistance to diseases, weeds, or pests. It generally does not affect the outcomes of fertilizers, pesticides, and other soil amendments.</p>
      <p>It is widely accepted by scholars that there are around seven categories of biostimulants based on source:</p>
      <ul style="list-style-type: disc; padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">
        <li style="margin-bottom: 6px;">Humic and fulvic acids</li>
        <li style="margin-bottom: 6px;">Protein hydrolysates and other N-containing compounds</li>
        <li style="margin-bottom: 6px;">Seaweed extracts and botanicals</li>
        <li style="margin-bottom: 6px;">Chitosan and other biopolymers</li>
        <li style="margin-bottom: 6px;">Inorganic compounds</li>
        <li style="margin-bottom: 6px;">Beneficial Fungi</li>
        <li style="margin-bottom: 6px;">Beneficial Bacteria</li>
      </ul>

      <p>Biostimulants can take many forms, ranging from single compounds to groups of compounds of single natural origin; natural or synthetic compounds; microbial inoculants which may contain single strains or mixtures of microorganisms showing synergistic effects.</p>
      <p>The modes of action of biostimulants can be diverse, too. Modes of action include reducing oxidative stress, increasing lateral root growth, etc. These modes of action explain the agricultural functions of biostimulants, e.g., increased tolerance to abiotic stress or increased N use efficiency. These finally result in economic and environmental benefits.</p> 
      <p>A definition of biostimulants should be based on agricultural functions of biostimulants, not on the nature of their constituents nor on their modes of action. While a biostimulant is generally beneficial to plants, the responses are also dependent on external factors like weather, soil type, organic matter content, tillage system, or the type of crop rotation.</p> 
      <p>Biostimulants can be used as an alternative or an adjunct to fertilizers, because the latter can lead to detrimental environmental effects like nitrate runoff, soil degradation, pollution, eutrophication, among others. They offer an environmentally sound solution that can reduce fertilizer used and the consequences that come with it.</p>

      <h3>References</h3>
      <ul style="list-style-type: decimal; padding-left: 20px; margin-top: 8px; margin-bottom: 16px;">
        <li style="margin-bottom: 8px;">Patrick du Jardin, Plant biostimulants: Definition, concept, main categories and regulation, <em>Scientia Horticulturae</em>, Volume 196, 2015, Pages 3-14, ISSN 0304-4238, <a href="https://doi.org/10.1016/j.scienta.2015.09.021" target="_blank">https://doi.org/10.1016/j.scienta.2015.09.021</a></li>
        <li style="margin-bottom: 8px;">Robinson, L. (2025, July 15). <em>Understanding Biostimulants for Plants.</em> Verdesian.</li>
        <li style="margin-bottom: 8px;">Nelson, A. (2024, January 01). <em>Biostimulants: What are they and do they work?</em> Minnesota Crop News.</li>
      </ul>
    `,

    blog_seven: `
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
  blog_eight: `
    <h1> Dr. G.T. Puthra - Director of Agriculture, Government of Karnataka </h1>

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
  </ul>`
  

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
