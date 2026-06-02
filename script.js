// ═══════════════════════════════════════════════════════════════
// BUAME GROUP — script.js v4
// Fusion script.js v3 + script_.js (i18n enrichi)
// Cursor · Nav · Reveal · i18n FR/EN/PT complet
// Jobs · Modal enrichi · Forms · Toast · Alt/Aria/Title
// ═══════════════════════════════════════════════════════════════

// ── CURSOR ──────────────────────────────────────────────────────
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
if (cursor && cursorRing && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    cursor.style.left    = e.clientX + 'px';
    cursor.style.top     = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top  = e.clientY + 'px';
  });
  document.addEventListener('mousedown', () => {
    cursor.style.transform    = 'translate(-50%,-50%) scale(0.8)';
    cursorRing.style.transform = 'translate(-50%,-50%) scale(0.8)';
  });
  document.addEventListener('mouseup', () => {
    cursor.style.transform    = 'translate(-50%,-50%) scale(1)';
    cursorRing.style.transform = 'translate(-50%,-50%) scale(1)';
  });
}

// ── NAV SCROLL ──────────────────────────────────────────────────
const mainNav = document.getElementById('mainNav');
let lastScroll = 0;
if (mainNav) {
  window.addEventListener('scroll', () => {
    const y = window.pageYOffset;
    if (y > 100) {
      mainNav.style.background    = 'rgba(10,18,42,0.97)';
      mainNav.style.backdropFilter = 'blur(12px)';
      mainNav.classList.add('scrolled');
    } else {
      mainNav.style.background    = 'transparent';
      mainNav.style.backdropFilter = 'none';
      mainNav.classList.remove('scrolled');
    }
    lastScroll = y;
  }, { passive: true });
}

// ── MOBILE MENU ─────────────────────────────────────────────────
const mobileMenuEl = document.getElementById('mobileMenu');
function toggleMobileMenu() {
  if (!mobileMenuEl) return;
  const open = mobileMenuEl.classList.toggle('open');
  document.body.style.overflow = open ? 'hidden' : '';
  const h = document.getElementById('hamburger');
  if (h) {
    const s = h.querySelectorAll('span');
    s[0].style.transform = open ? 'translateY(7.5px) rotate(45deg)'   : '';
    s[1].style.opacity   = open ? '0' : '1';
    s[2].style.transform = open ? 'translateY(-7.5px) rotate(-45deg)' : '';
  }
}
function closeMobileMenu() {
  if (!mobileMenuEl) return;
  mobileMenuEl.classList.remove('open');
  document.body.style.overflow = '';
  const h = document.getElementById('hamburger');
  if (h) h.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
}

// ── REVEAL (Intersection Observer) ──────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible', 'revealed');
    e.target.querySelectorAll('[data-count]').forEach(c => {
      if (!c.classList.contains('counted')) { c.classList.add('counted'); animateCount(c, +c.dataset.count); }
    });
    revealObs.unobserve(e.target);
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach(el => revealObs.observe(el));

function animateCount(el, target) {
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target);
    if (p < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      heroStats.querySelectorAll('[data-count]').forEach(c => {
        if (!c.classList.contains('counted')) { c.classList.add('counted'); animateCount(c, +c.dataset.count); }
      });
    });
  }, { threshold: 0.3 }).observe(heroStats);
}

// ── PARALLAX ────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const heroBg = document.querySelector('.hero-bg-img');
  if (heroBg && y < window.innerHeight) heroBg.style.transform = `scale(1.1) translateY(${y * 0.25}px)`;
  const phBg = document.querySelector('.page-header-bg');
  if (phBg && y < window.innerHeight * 0.8) phBg.style.transform = `scale(1.1) translateY(${y * 0.18}px)`;
}, { passive: true });

// ── TICKER ──────────────────────────────────────────────────────
const tickerInner = document.querySelector('.ticker-inner');
if (tickerInner) tickerInner.style.animationDuration = '40s';

// ════════════════════════════════════════════════════════════════
// I18N — TRADUCTIONS COMPLÈTES FR / EN / PT
// (fusion script.js v3 + script_.js — toutes clés incluses)
// ════════════════════════════════════════════════════════════════
const I18N = {

// ─────────────────────────── FRANÇAIS ───────────────────────────
fr: {
  // Navigation
  'nav.home':'Accueil', 'nav.group':'Groupe', 'nav.filiales':'Filiales',
  'nav.governance':'Gouvernance', 'nav.direction':'Direction', 'nav.news':'Actualités',
  'nav.blog':'Blog', 'nav.careers':'Carrières', 'nav.contact':'Contact',

  // Hero
  'hero.eyebrow':'Conglomérat Panafricain — Lomé, Togo',
  'hero.title.line1':"L'Afrique", 'hero.title.line2':'par les Africains',
  'hero.subtitle':'Bâtir, Commercer, Transporter, Habiter, Nourrir, Informer',
  'hero.desc':"BUAME GROUP est un conglomérat SAS panafricain opérant dans 6 secteurs stratégiques à travers 4 pays d'Afrique de l'Ouest. Notre vision : devenir l'un des 10 premiers groupes africains à l'horizon 2045.",
  'hero.cta1':'Découvrir nos filiales', 'hero.cta2':'Notre vision',

  // Stats
  'stats.filiales':'Filiales Actives', 'stats.countries':"Pays d'Opération",
  'stats.billions':'Mds', 'stats.vision':'Vision CA 2045 (FCFA)', 'stats.years':'Ans de Vision',

  // Diamant labels (SVG)
  'diamond.construction':'CONSTRUCTION', 'diamond.trade':'TRADE',
  'diamond.logistics':'LOGISTICS', 'diamond.immobilier':'IMMOBILIER',
  'diamond.agro':'AGRO', 'diamond.medias':'MÉDIAS',
  'diamond.label1':'DIAMANT', 'diamond.label2':'BLEU™',

  // About / Groupe
  'about.eyebrow':'Le Groupe',
  'about.title':'Un empire africain <em>en construction</em>',
  'about.subtitle':"Fondé à Lomé avec une vision panafricaine, BUAME GROUP réunit six forces complémentaires pour transformer l'Afrique de l'Ouest.",
  'about.card.legal':'Forme Juridique Holding', 'about.card.capital':'Capital Social FCFA',
  'about.card.jobs':'Emplois prévus An 3', 'about.card.horizon':'Horizon Vision Groupe',
  'about.num.sas':'SAS', 'about.num.capital':'50M', 'about.num.jobs':'480+', 'about.num.horizon':'2045',
  'about.quote':'"L\'Afrique a besoin d\'acteurs africains qui pensent grand, agissent vite et construisent pour durer. BUAME GROUP est cette réponse."',
  'about.cite':'— Direction Générale, BUAME GROUP SAS',
  'about.p1':"BUAME GROUP est une holding panafricaine constituée sous forme de Société par Actions Simplifiée (SAS) de droit togolais, dont le siège est établi à Lomé. Le groupe opère à travers 6 filiales SASU au Togo et des SARL dans les pays d'expansion, conformément au droit OHADA.",
  'about.p2':"Notre modèle est unique : chaque filiale est à la fois cliente et fournisseur des autres, créant un écosystème intégré réduisant les coûts de 15 à 20%.",
  'about.p3':"Avec la Stratégie Diamant Bleu™, nous avons dessiné une roadmap claire sur 20 ans : ancrage local, synergies inter-filiales, certifications ISO, expansion géographique, impact RSE et digitalisation complète de nos opérations.",
  'about.mission':"Créer de la valeur durable en Afrique de l'Ouest par l'excellence opérationnelle et l'ancrage local.",
  'about.vision_text':"Top 10 des groupes africains d'ici 2045, coté en bourse, 100 milliards FCFA de CA.",
  'about.cta':'En savoir plus sur le groupe →',
  'about.signature':'BUAME GROUP SAS', 'about.signature2':'Lomé, Togo — Fondé 2025 — OHADA',

  // Groupe page
  'groupe.holding.title':'Une holding panafricaine <em>ancrée à Lomé</em>',
  'groupe.mission.label':'Mission', 'groupe.vision.label':'Vision',
  'groupe.values.label':'Valeurs', 'groupe.values.text':'Excellence, Intégrité, Panafricanisme, Innovation, Responsabilité.',
  'groupe.law.label':'Droit', 'groupe.law.text':'OHADA — Actes Uniformes. Conformité totale, audit indépendant.',
  'groupe.timeline.eyebrow':'Histoire & Roadmap',
  'groupe.timeline.title':'La trajectoire <em>BUAME GROUP</em>',
  'groupe.timeline.sub':'De la création à la vision 2045 — une roadmap ambitieuse et structurée.',
  'groupe.t1.date':'2025 — Fondation', 'groupe.t1.title':'Constitution de BUAME GROUP SAS',
  'groupe.t1.desc':"Création de la holding et des 6 filiales SASU à Lomé. Capital initial 50M FCFA. Premier recrutement de l'équipe de direction.",
  'groupe.t2.date':'2026 — Expansion An 1', 'groupe.t2.title':'Ouverture bureaux Bénin & Ghana',
  'groupe.t2.desc':'Déploiement des filiales SARL à Cotonou et Accra. BUAME AFRICA SUMMIT #1 à Lomé. Premier appel d\'offres public remporté.',
  'groupe.t3.date':'2027–2028 — Consolidation', 'groupe.t3.title':"Hub Côte d'Ivoire + Certifications ISO",
  'groupe.t3.desc':"Ouverture Abidjan, 1ère économie UEMOA. Obtention certifications ISO 9001, GlobalG.A.P. CA cible : 1,2 milliard FCFA.",
  'groupe.t4.date':'2030 — Digitalisation', 'groupe.t4.title':'Transformation numérique complète',
  'groupe.t4.desc':'ERP groupe, CRM filiales, e-commerce agro. Entrée dans 3 nouveaux pays (Nigeria, Sénégal, Cameroun).',
  'groupe.t5.date':'2045 — Vision Horizon', 'groupe.t5.title':'Top 10 groupes africains — Introduction en bourse',
  'groupe.t5.desc':"15 pays, 100 milliards FCFA de CA, 5 000+ emplois. Premier conglomérat africain coté issu d'Afrique de l'Ouest francophone.",
  'groupe.struct.eyebrow':'Structure Juridique', 'groupe.struct.title':'Architecture <em>du groupe</em>',
  'groupe.struct.sub':"BUAME GROUP SAS chapeaute 6 filiales SASU au Togo et des SARL dans chaque pays d'expansion, en conformité totale avec le droit OHADA.",
  'groupe.struct.card1':"Holding tête de groupe. SAS de droit togolais. Capital 50M FCFA. Siège : Lomé, Zone Adidogomé — BUAME TOWER.",
  'groupe.struct.card2.title':'6 Filiales SASU — Togo',
  'groupe.struct.card2':'Construction, Marché, Logistics, Immobilier, Agro, Médias. Chacune constituée en SASU à Lomé, associé unique : BUAME GROUP SAS.',
  'groupe.struct.card3.title':'SARL / Ltd — Expansion',
  'groupe.struct.card3':"Bénin, Côte d'Ivoire, Ghana : SARL locales dans chaque secteur. Conformité OHADA et droit local. Country Manager dédié par pays.",

  // Filiales
  'filiales.eyebrow':'Nos Filiales', 'filiales.title':'Six forces, <em>un seul empire</em>',
  'filiales.subtitle':"Des secteurs stratégiques soigneusement sélectionnés pour leur complémentarité et leur potentiel de croissance en Afrique de l'Ouest.",
  'filiales.cta':'Voir toutes les filiales →',
  'filiale.construction.name':'CONSTRUCTION', 'filiale.construction.full':'BUAME Construction',
  'filiale.construction.desc':"BTP, génie civil, infrastructures routières et bâtiments. Location d'équipements BTP. Marchés publics et privés.",
  'filiale.trade.name':'MARCHE', 'filiale.trade.full':'BUAME Marché',
  'filiale.trade.desc':"Import-export, distribution B2B, commerce général. Fournisseur exclusif des 5 autres filiales.",
  'filiale.logistics.name':'LOGISTICS', 'filiale.logistics.full':'BUAME Logistics',
  'filiale.logistics.desc':"Transport routier régional, transit douanier, entreposage. Prestataire logistique exclusif du groupe.",
  'filiale.immobilier.name':'IMMOBILIER', 'filiale.immobilier.full':'BUAME Immobilier',
  'filiale.immobilier.desc':"Promotion immobilière résidentielle et commerciale. Gestion locative et vente de bureaux.",
  'filiale.agro.name':'AGRO', 'filiale.agro.full':'BUAME Agro',
  'filiale.agro.desc':"Transformation agro-alimentaire, exportation cacao, anacarde et karité. Certifications GlobalG.A.P.",
  'filiale.medias.name':'MÉDIAS', 'filiale.medias.full':'BUAME Médias',
  'filiale.medias.desc':"Web TV africaine, podcast business, presse digitale et régie publicitaire panafricaine.",

  // Tags
  'tag.marches':'Marchés publics', 'tag.btp':'BTP', 'tag.iso9001':'ISO 9001',
  'tag.importexport':'Import-Export', 'tag.distrib':'Distribution B2B', 'tag.cedeao':'CEDEAO',
  'tag.transport':'Transport', 'tag.transit':'Transit', 'tag.storage':'Entreposage',
  'tag.promotion':'Promotion', 'tag.locative':'Gestion locative', 'tag.bureaux':'Bureaux',
  'tag.cacao':'Export Cacao', 'tag.globalgap':'GlobalG.A.P.', 'tag.fairtrade':'Fair Trade',
  'tag.webtv':'Web TV', 'tag.podcast':'Podcast', 'tag.regie':'Régie Pub',

  // Synergies
  'filiales.synergies.eyebrow':'Modèle Unique', 'filiales.synergies.title':'Synergies <em>inter-filiales</em>',
  'filiales.synergies.sub':"Chaque filiale est à la fois cliente et fournisseur des autres — un écosystème intégré qui réduit les coûts de 15 à 20% et crée un avantage concurrentiel structurel.",

  // Stratégie
  'strat.eyebrow':'Stratégie', 'strat.title':'Stratégie Diamant Bleu<em>™</em>',
  'strat.subtitle':'Une roadmap sur 20 ans articulée autour de 6 piliers stratégiques pour faire de BUAME GROUP un acteur de référence en Afrique.',
  'strat.p1.title':'Ancrage Local', 'strat.p1.desc':'Implantation profonde dans chaque marché. Ressources humaines locales, partenaires locaux, conformité réglementaire totale.',
  'strat.p2.title':'Synergies Inter-Filiales', 'strat.p2.desc':'Écosystème intégré où chaque filiale alimente les autres. Réduction des coûts de 15–20%, avantage concurrentiel structurel.',
  'strat.p3.title':'Certifications ISO', 'strat.p3.desc':'ISO 9001, ISO 14001, GlobalG.A.P., OEA douanier. Standards internationaux pour accéder aux marchés mondiaux.',
  'strat.p4.title':'Expansion Géographique', 'strat.p4.desc':"4 pays aujourd'hui → 15 pays à l'horizon 2040. Prochaine vague : Nigeria, Sénégal, Cameroun, Burkina, Mali.",
  'strat.p5.title':'Impact RSE', 'strat.p5.desc':"Emplois locaux, formation professionnelle, agriculture durable, réduction empreinte carbone. Reporting ESG annuel.",
  'strat.p6.title':'Digitalisation', 'strat.p6.desc':"ERP groupe, CRM filiales, e-commerce agro, plateformes digitales médias. Transformation numérique totale d'ici 2030.",
  'strat.cta':'Lire notre vision complète →',

  // Pays
  'pays.eyebrow':'Présence Géographique', 'pays.title':'4 pays, <em>une vision</em>',
  'pays.subtitle':"Un ancrage stratégique dans les économies les plus dynamiques d'Afrique de l'Ouest, avec une expansion planifiée vers 15 pays d'ici 2040.",
  'pays.togo.name':'Togo', 'pays.togo.role':'Siège Groupe — HQ',
  'pays.togo.detail':'BUAME GROUP SAS<br>6 filiales SASU<br>Lomé — Port en Eaux Profondes', 'pays.togo.badge':'Siège Social',
  'pays.benin.name':'Bénin', 'pays.benin.role':"Premier Pays d'Expansion",
  'pays.benin.detail':'6 filiales SARL<br>Cotonou — Port autonome<br>ZLECAF — Zone franche', 'pays.benin.badge':'Opérationnel An 1',
  'pays.ci.name':"Côte d'Ivoire", 'pays.ci.role':'Hub Économique Régional',
  'pays.ci.detail':"6 filiales SARL<br>Abidjan — 1ère économie UEMOA<br>Centre d'Excellence",
  'pays.ghana.name':'Ghana', 'pays.ghana.role':'Porte Anglophone',
  'pays.ghana.detail':'6 filiales Ltd<br>Accra — 2ème économie Golfe de Guinée<br>Accès marchés anglophones',
  'pays.badge.an23':'An 2–3', 'pays.next':'PROCHAINE VAGUE :',

  // CTA final
  'cta.eyebrow':"Rejoignez l'aventure", 'cta.title':'Partenaires, Investisseurs, <em>Talents</em>',
  'cta.subtitle':"Que vous souhaitiez investir, vous associer ou rejoindre notre équipe, BUAME GROUP vous attend.",
  'cta.btn1':'Nous contacter →', 'cta.btn2':"Voir les offres d'emploi →",

  // Page headers
  'page.group.eyebrow':'Le Groupe', 'page.group.title':'Un empire africain <em>en construction</em>',
  'page.group.sub':"Fondé à Lomé avec une vision panafricaine, BUAME GROUP réunit six forces complémentaires pour transformer l'Afrique de l'Ouest.",
  'page.gov.eyebrow':'Gouvernance', 'page.gov.title':'Une gouvernance <em>de référence</em>',
  'page.gov.sub':"BUAME GROUP applique les standards de gouvernance des grands groupes internationaux, conformément au droit OHADA et aux meilleures pratiques africaines.",
  'page.dir.eyebrow':'Direction Exécutive', 'page.dir.title':'Les femmes et hommes <em>qui bâtissent</em>',
  'page.dir.sub':"L'équipe dirigeante du BUAME GROUP réunit des profils d'excellence formés en Afrique et à l'international, engagés pour le développement du continent.",
  'page.fil.eyebrow':'Nos Filiales', 'page.fil.title':'Six forces, <em>un seul empire</em>',
  'page.fil.sub':"Des secteurs stratégiques soigneusement sélectionnés pour leur complémentarité et leur potentiel de croissance en Afrique de l'Ouest.",
  'page.news.eyebrow':'Actualités', 'page.news.title':'Dernières <em>nouvelles du groupe</em>',
  'page.news.sub':"Suivez l'actualité officielle du BUAME GROUP : inaugurations, partenariats, nominations, contrats et événements marquants.",
  'page.blog.eyebrow':'Blog Expert', 'page.blog.title':'Insights <em>Afrique Business</em>',
  'page.blog.sub':"Analyses, tendances et décryptages de l'économie ouest-africaine par les experts du BUAME GROUP.",
  'page.careers.eyebrow':'Carrières', 'page.careers.title':"Rejoignez <em>l'empire</em>",
  'page.careers.sub':"BUAME GROUP recrute des talents ambitieux qui veulent construire l'Afrique de demain. Nous offrons des opportunités uniques dans des environnements dynamiques, multi-pays et multi-secteurs.",
  'page.contact.eyebrow':'Nous Contacter', 'page.contact.title':'Parlons <em>business</em>',
  'page.contact.sub':"Partenariats, investissements, marchés publics, projets communs ou candidatures — notre équipe est à votre disposition.",

  // Breadcrumbs
  'breadcrumb.home':'Accueil', 'breadcrumb.group':'Groupe', 'breadcrumb.gov':'Gouvernance',
  'breadcrumb.dir':'Direction', 'breadcrumb.fil':'Filiales', 'breadcrumb.news':'Actualités',
  'breadcrumb.blog':'Blog', 'breadcrumb.careers':'Carrières', 'breadcrumb.contact':'Contact',

  // Gouvernance
  'gov.section.eyebrow':'Gouvernance', 'gov.section.title':'Une gouvernance <em>de référence</em>',
  'gov.ag.title':'Assemblée Générale',
  'gov.ag.desc':'Organe souverain de la SAS BUAME GROUP. Décisions ordinaires et extraordinaires. Réunion annuelle obligatoire dans les 6 mois de clôture.',
  'gov.ag.item1':'▸ Approbation des comptes annuels', 'gov.ag.item2':'▸ Nomination des dirigeants',
  'gov.ag.item3':'▸ Modification des statuts', 'gov.ag.item4':'▸ Augmentation de capital',
  'gov.ca.title':"Conseil d'Administration",
  'gov.ca.desc':"Président + 4 Administrateurs indépendants minimum. Réunions trimestrielles avec PV formalisés. Comités spécialisés dédiés.",
  'gov.ca.item1':'▸ Comité Audit & Risques', 'gov.ca.item2':'▸ Comité Rémunérations & Nominations',
  'gov.ca.item3':'▸ Comité Stratégie & Investissements', 'gov.ca.item4':'▸ Comité RSE & Développement Durable',
  'gov.dg.title':'Direction Générale',
  'gov.dg.desc':'CEO + 3 DG Adjoints (Finance, Opérations, Stratégie). Représentation légale, exécution de la stratégie groupe, supervision des 6 filiales.',
  'gov.dg.item1':'▸ CEO — Directeur Général Groupe', 'gov.dg.item2':'▸ CFO — Finances Consolidées',
  'gov.dg.item3':'▸ COO — Opérations & Filiales', 'gov.dg.item4':'▸ CSO — Stratégie & Expansion',
  'gov.p1.title':'Transparence', 'gov.p1.desc':'Reporting mensuel consolidé à tous les organes',
  'gov.p2.title':'Conformité OHADA', 'gov.p2.desc':'Respect total des Actes Uniformes OHADA',
  'gov.p3.title':'Audit Externe', 'gov.p3.desc':"Cabinet d'audit indépendant — niveau Big 4 recommandé",
  'gov.p4.title':'Anti-Corruption', 'gov.p4.desc':'Code éthique groupe — Politique tolérance zéro',
  'gov.rse.eyebrow':'RSE & Développement Durable', 'gov.rse.title':"L'entreprise <em>responsable</em>",
  'gov.rse.sub':"BUAME GROUP intègre les objectifs de développement durable de l'ONU dans chaque décision stratégique.",
  'gov.env.title':'Environnement', 'gov.env.desc':'Certification ISO 14001 en cible pour BUAME Construction. Agriculture durable et éco-certifiée pour BUAME Agro. Réduction empreinte carbone mesurée annuellement.',
  'gov.social.title':'Social', 'gov.social.desc':'480+ emplois directs prévus An 3. Formation continue 20h/an financée. Assurance santé famille pour tous les CDI. Parité et inclusion active.',
  'gov.gov.title':'Gouvernance', 'gov.gov.desc':"Transparence totale, anti-corruption, conformité OHADA. Reporting ESG annuel publié. Comité RSE dédié au Conseil d'Administration.",

  // Direction
  'dir.ceo.role':'Directeur Général — CEO', 'dir.ceo.name':'BUAME GROUP SAS', 'dir.ceo.location':'Lomé, Togo — Siège Groupe',
  'dir.ceo.bio':"Représentant légal du groupe. Définition et exécution de la vision stratégique 2045. Supervision des 6 DG de filiales et des Country Managers.",
  'dir.cfo.role':'DG Adjoint Finance — CFO', 'dir.cfo.name':'Direction Financière', 'dir.cfo.location':'Lomé, Togo — Siège Groupe',
  'dir.cfo.bio':'Gestion financière consolidée du groupe. Audit interne, trésorerie, relations bancaires, reporting aux organes. Supervision des DAF filiales.',
  'dir.coo.role':'DG Adjoint Opérations — COO', 'dir.coo.name':'Direction Opérations', 'dir.coo.location':'Lomé, Togo — Siège Groupe',
  'dir.coo.bio':'Supervision opérationnelle des 6 filiales et des 4 Country Managers. Performance, qualité, reporting KPI, synergies inter-filiales.',
  'dir.cso.role':'DG Adjoint Stratégie — CSO', 'dir.cso.name':'Direction Stratégie', 'dir.cso.location':'Lomé, Togo — Siège Groupe',
  'dir.cso.bio':'Développement business, expansion géographique, M&A, partenariats institutionnels et pilotage de la roadmap 2045.',
  'dir.sg.role':'Secrétaire Général Groupe', 'dir.sg.name':'Direction Juridique', 'dir.sg.location':'Lomé, Togo — Siège Groupe',
  'dir.sg.bio':'Conseil juridique groupe, conformité OHADA, rédaction contrats, gestion des PV et des actes réglementaires inter-filiales.',
  'dir.drh.role':'Directeur RH Groupe — DRH', 'dir.drh.name':'Direction Ressources Humaines', 'dir.drh.location':'Lomé, Togo — Siège Groupe',
  'dir.drh.bio':"Recrutement, formation, politique salariale, gestion des talents, BUAME LEADERS™ et culture d'entreprise groupe.",
  'dir.leaders.eyebrow':"Culture d'Entreprise", 'dir.leaders.title':'BUAME LEADERS<em>™</em>',
  'dir.leaders.sub':"Notre programme d'accélération pour les hauts potentiels. Former les leaders de demain pour l'Afrique.",
  'dir.leaders.p1':"20h de formation par an, financées à 100% par le groupe. Partenariats avec les meilleures universités africaines et internationales.",
  'dir.leaders.p2':"Passerelles entre pays et filiales encouragées. Expérience multi-pays pour les cadres à haut potentiel dès l'An 2.",
  'dir.leaders.mentoring.title':'Mentorat Exécutif',
  'dir.leaders.p3':'Chaque BUAME LEADER™ est accompagné par un membre de la Direction Générale. Coaching personnalisé et suivi de carrière.',
  'dir.leaders.cta':"Rejoindre l'équipe →",

  // Actualités
  'news.featured.badge':'COMMUNIQUÉ OFFICIEL',
  'news.featured.title':"BUAME GROUP officialise sa constitution et lance ses opérations en Afrique de l'Ouest",
  'news.featured.desc':"La holding SAS BUAME GROUP est officiellement constituée à Lomé, Togo. Le groupe annonce le déploiement simultané de ses 6 filiales SASU et l'ouverture imminente de ses représentations au Bénin, en Côte d'Ivoire et au Ghana.",
  'news.featured.author':'Direction de la Communication',
  'news.read':'Lire →',
  'news.n1.cat':'Partenariat', 'news.n1.date':'Oct 2025', 'news.n1.title':'Accord de partenariat stratégique avec la Banque Atlantique pour le financement des filiales',
  'news.n2.cat':'Contrat', 'news.n2.date':'Sept 2025', 'news.n2.title':"BUAME Construction remporte son premier appel d'offres public au Togo",
  'news.n3.cat':'Export', 'news.n3.date':'Sept 2025', 'news.n3.title':"BUAME Agro signe un premier contrat d'exportation de cacao vers un acheteur européen",
  'news.n4.cat':'Lancement', 'news.n4.date':'Août 2025', 'news.n4.title':'BUAME Médias lance son portail digital et son émission hebdomadaire "Business Africa"',
  'news.agenda.title':'📅 Agenda BUAME GROUP 2025–2026',
  'news.a1.date':'DÉC 2025', 'news.a1.text':'Assemblée Générale Constitutive du groupe',
  'news.a2.date':'JANV 2026', 'news.a2.text':'Ouverture officielle bureaux Cotonou & Accra',
  'news.a3.date':'MARS 2026', 'news.a3.text':'BUAME AFRICA SUMMIT #1 — Lomé, Togo',
  'news.a4.date':'JUIN 2026', 'news.a4.text':'Ouverture bureaux Abidjan — Hub CI opérationnel',
  'news.archives.eyebrow':'Archives', 'news.archives.title':'Toutes nos <em>publications</em>',
  'news.archives.sub':"Retrouvez l'ensemble des communiqués de presse, dossiers de presse et publications institutionnelles du BUAME GROUP.",
  'news.press.eyebrow':'Contact Presse & Médias', 'news.press.email':'presse@buame-group.com',
  'news.press.sub':'Direction de la Communication — BUAME GROUP · Réponse sous 24h',
  'news.press.btn1':'Écrire à la presse →', 'news.press.btn2':'Télécharger le dossier de presse',

  // Blog
  'blog.eyebrow':'Blog Expert', 'blog.subtitle':"Analyses, tendances et décryptages de l'économie ouest-africaine par les experts du BUAME GROUP.",
  'blog.all':'Tous', 'blog.all_articles':'Tous les articles →', 'blog.read':'Lire →',
  'blog.post1.title':"ZLECAF 2025 : Comment les groupes africains peuvent saisir l'opportunité du marché unifié",
  'blog.post1.excerpt':"La Zone de Libre-Échange Continentale Africaine représente un marché de 1,4 milliard de consommateurs.",
  'blog.post1.author':'Par la Direction Stratégie',
  'blog.post2.title':"Marchés publics en Afrique de l'Ouest : guide pour répondre aux appels d'offres BOAD & BAD", 'blog.post2.author':'Expertise BTP',
  'blog.post3.title':"Exportation de cacao vers l'Europe : certifications et stratégies de valorisation premium", 'blog.post3.author':'BUAME Agro',
  'blog.post4.title':"Financement d'une holding OHADA : capital, crédit bancaire et partenaires institutionnels", 'blog.post4.author':'Direction Financière',
  'blog.post5.title':'Le corridor Lomé-Abidjan : enjeux logistiques de la CEDEAO',
  'blog.post5.desc':"Analyse des flux commerciaux entre le Togo et la Côte d'Ivoire et des opportunités pour les opérateurs logistiques régionaux.",
  'blog.post6.title':'Le boom immobilier à Lomé : tendances et perspectives 2026',
  'blog.post6.desc':'État des lieux du marché immobilier togolais et analyse des segments à fort potentiel de croissance pour les promoteurs locaux.',
  'blog.post7.title':'Médias digitaux en Afrique : le nouvel Eldorado de la communication',
  'blog.post7.desc':'Croissance explosive des audiences digitales et opportunités pour les régies publicitaires africaines dans un marché en pleine mutation.',
  'blog.recent.eyebrow':'Articles Récents', 'blog.recent.title':"Plus d'<em>insights</em>",
  'blog.newsletter.eyebrow':'Newsletter Insights Afrique',
  'blog.newsletter.title':'Recevez nos analyses chaque semaine',
  'blog.newsletter.desc':"Inscrivez-vous à la newsletter BUAME GROUP pour ne rater aucun insight sur l'économie ouest-africaine.",
  'blog.newsletter.cta':"S'inscrire →",

  // Recrutement
  'recru.eyebrow':'Carrières', 'recru.why.eyebrow':'Pourquoi nous rejoindre ?',
  'recru.why.title':"Construisez <em>l'Afrique de demain</em>",
  'recru.why.sub':"BUAME GROUP offre un environnement de travail stimulant où chaque talent peut s'épanouir et contribuer à la transformation du continent.",
  'recru.perk1.title':'Formation Continue', 'recru.perk1.desc':'20h de formation par an, financées à 100% par le groupe',
  'recru.perk2.title':'Mobilité Internationale', 'recru.perk2.desc':'Passerelles entre 4 pays et 6 filiales encouragées',
  'recru.perk3.title':'Couverture Santé', 'recru.perk3.desc':'Assurance santé famille pour tous les CDI du groupe',
  'recru.perk4.title':'BUAME LEADERS™', 'recru.perk4.desc':"Programme d'accélération pour les hauts potentiels",
  'recru.perk5.title':'Salaires Compétitifs', 'recru.perk5.desc':'Rémunérations alignées sur les standards internationaux',
  'recru.perk6.title':'Impact Réel', 'recru.perk6.desc':"Contribuez directement à la transformation économique de l'Afrique",
  'recru.rh.title':'Direction Ressources Humaines', 'recru.rh.sub':'rh@buame-group.com — Réponse sous 72h',
  'recru.jobs.eyebrow':'Postes ouverts', 'recru.jobs.title':'Nos <em>opportunités</em>',
  'recru.jobs.sub':"Rejoignez une équipe d'excellence et contribuez à bâtir l'empire panafricain.",
  'recru.all':'Tous les postes', 'recru.apply':'Postuler',
  'recru.bottom.label':'Contact direct — Ressources Humaines',
  'recru.bottom.sub':'Direction RH BUAME GROUP — Lomé, Togo · Lun–Ven 8h–18h GMT',
  'recru.bottom.btn1':'Écrire à la DRH →', 'recru.bottom.btn2':'Télécharger la Charte RH',

  // Contact
  'contact.eyebrow':'Nous Contacter', 'contact.title':'Parlons <em>business</em>',
  'contact.subtitle':"Partenariats, investissements, marchés publics, projets communs ou candidatures — notre équipe est à votre disposition.",
  'contact.hq':'Siège Social', 'contact.hq.val':"Lomé, République du Togo<br><small>Zone d'Adidogomé — BUAME TOWER</small>",
  'contact.email_label':'Email', 'contact.phone':'Téléphone',
  'contact.phone.val':'+228 97 19 40 40<br><small>Lun – Ven, 8h – 18h GMT</small>',
  'contact.legal_label':'Structure Juridique', 'contact.legal.val':'SAS — Droit OHADA<br><small>RCCM Togo — NIF enregistré</small>',
  'contact.form_badge':'Formulaire sécurisé — Réponse sous 48h',
  'contact.map.eyebrow':'Carte & Accès', 'contact.map.title':'Nous trouver <em>à Lomé</em>',
  'contact.map.sub':"Notre siège social est situé dans la zone d'Adidogomé, au cœur de la capitale économique du Togo.",
  'contact.map.btn':'Ouvrir dans Google Maps →',
  'contact.off1.city':'Lomé, Togo', 'contact.off1.addr':'Siège Groupe HQ<br>BUAME TOWER',
  'contact.off2.city':'Cotonou, Bénin', 'contact.off2.addr':'Bureau Régional<br>Zone Cadjehoun',
  'contact.off3.city':'Abidjan, CI', 'contact.off3.addr':'Bureau Régional<br>Plateau Business',
  'contact.off4.city':'Accra, Ghana', 'contact.off4.addr':'Regional Office<br>Airport City',

  // Formulaires
  'form.name':'Nom complet *', 'form.email':'Email *', 'form.org':'Organisation',
  'form.country':'Pays *', 'form.subject':'Objet de la demande *', 'form.message':'Message *',
  'form.rgpd':"J'accepte que mes données soient utilisées pour traiter ma demande. Données conservées 24 mois.",
  'form.submit':'Envoyer le message ◆',
  'form.rh.name':'Nom complet *', 'form.rh.email':'Email professionnel *',
  'form.rh.poste':'Poste visé *', 'form.rh.pays':'Pays souhaité', 'form.rh.msg':'Lettre de motivation *',
  'form.rh.rgpd':"En soumettant ce formulaire, j'autorise BUAME GROUP à traiter mes données personnelles dans le cadre de ce recrutement (conservation 24 mois).",
  'form.rh.submit':'Envoyer à la DRH — rh@buame-group.com ◆',

  // Images alt (data-i18n-alt)
  'img.team':"Équipe dirigeante BUAME GROUP - Rencontre d'affaires en Afrique",
  'img.construction':'BUAME Construction - Chantier BTP Afrique',
  'img.trade':'BUAME Marché - Marché Africain',
  'img.logistics':'BUAME Logistics - Port logistique Afrique',
  'img.immobilier':'BUAME Immobilier - Immeuble commercial Afrique',
  'img.agro':"BUAME Agro - Récolte cacao Afrique de l'Ouest",
  'img.medias':'BUAME Médias - Studio de diffusion africain',
  'img.lome':'Vue panoramique de Lomé, Togo - Siège de BUAME GROUP',
  'img.lome2':'Lomé Togo - Siège BUAME GROUP',
  'img.cotonou':'Port de Cotonou Bénin',
  'img.abidjan':'Abidjan Côte d\'Ivoire - Immeuble moderne',
  'img.accra':'Accra Ghana - Commerce maritime',

  // Overlays images
  'img.overlay.team.label':'Notre Force', 'img.overlay.team.title':"Des talents africains au service de l'Afrique",
  'img.overlay.lome.label':'Lomé, Togo', 'img.overlay.lome.title':'Le cœur battant de notre empire panafricain',

  // Social aria (data-i18n-aria)
  'social.linkedin':'LinkedIn', 'social.twitter':'Twitter/X', 'social.facebook':'Facebook',
  'social.youtube':'YouTube', 'social.instagram':'Instagram',

  // Logo
  'logo.alt':'BUAME GROUP Logo',

  // Footer
  'footer.tagline':'"L\'Afrique par les Africains — construire, commercer, habiter, nourrir, transporter, informer."',
  'footer.desc':'Conglomérat panafricain SAS basé à Lomé, Togo. 6 filiales, 4 pays, une vision. OHADA — Droit togolais.',
  'footer.col.filiales':'Filiales', 'footer.col.groupe':'Groupe', 'footer.col.legal':'Mentions Légales',
  'footer.link.about':'À propos', 'footer.link.gov':'Gouvernance', 'footer.link.dir':'Direction Exécutive',
  'footer.link.news':'Actualités', 'footer.link.strat':'Stratégie Diamant', 'footer.link.blog':'Blog Expert', 'footer.link.careers':'Carrières',
  'footer.link.mentions':'Mentions légales', 'footer.link.privacy':'Politique de confidentialité',
  'footer.link.cookies':'Cookies', 'footer.link.cgv':'CGV / CGU', 'footer.link.ohada':'Droit OHADA',
  'footer.newsletter':'Newsletter', 'footer.newsletter.placeholder':'Email', 'footer.newsletter.btn':'→',
  'footer.copyright':'© 2025 BUAME GROUP SAS — Lomé, Togo. Tous droits réservés.',
  'footer.legal2':'Droit OHADA — RCCM Togo — <a href="#">ISO en cours</a>',
},

// ─────────────────────────── ENGLISH ────────────────────────────
en: {
  'nav.home':'Home','nav.group':'Group','nav.filiales':'Subsidiaries','nav.governance':'Governance',
  'nav.direction':'Management','nav.news':'News','nav.blog':'Blog','nav.careers':'Careers','nav.contact':'Contact',
  'hero.eyebrow':'Pan-African Conglomerate — Lomé, Togo',
  'hero.title.line1':'Africa','hero.title.line2':'by Africans',
  'hero.subtitle':'Build, Trade, Transport, Live, Feed, Inform',
  'hero.desc':"BUAME GROUP is a pan-African SAS conglomerate operating in 6 strategic sectors across 4 West African countries. Our vision: to become one of the top 10 African groups by 2045.",
  'hero.cta1':'Discover our subsidiaries','hero.cta2':'Our vision',
  'stats.filiales':'Active Subsidiaries','stats.countries':'Countries of Operation',
  'stats.billions':'Bns','stats.vision':'Revenue Vision 2045 (FCFA)','stats.years':'Years of Vision',
  'diamond.construction':'CONSTRUCTION','diamond.trade':'TRADE','diamond.logistics':'LOGISTICS',
  'diamond.immobilier':'REAL ESTATE','diamond.agro':'AGRO','diamond.medias':'MEDIA',
  'diamond.label1':'DIAMOND','diamond.label2':'BLUE™',
  'about.eyebrow':'The Group','about.title':'An African empire <em>under construction</em>',
  'about.subtitle':'Founded in Lomé with a pan-African vision, BUAME GROUP brings together six complementary forces to transform West Africa.',
  'about.card.legal':'Holding Legal Form','about.card.capital':'Share Capital FCFA',
  'about.card.jobs':'Jobs Planned Year 3','about.card.horizon':'Group Vision Horizon',
  'about.num.sas':'SAS','about.num.capital':'50M','about.num.jobs':'480+','about.num.horizon':'2045',
  'about.quote':'"Africa needs African actors who think big, act fast and build to last. BUAME GROUP is that answer."',
  'about.cite':'— General Management, BUAME GROUP SAS',
  'about.p1':"BUAME GROUP is a pan-African holding company incorporated as a Simplified Joint Stock Company (SAS) under Togolese law, headquartered in Lomé. The group operates through 6 SASU subsidiaries in Togo and SARL in expansion countries, in compliance with OHADA law.",
  'about.p2':"Our model is unique: each subsidiary is both a customer and supplier of the others, creating an integrated ecosystem reducing costs by 15 to 20%.",
  'about.p3':"With the Blue Diamond Strategy™, we have mapped a clear 20-year roadmap: local anchoring, inter-subsidiary synergies, ISO certifications, geographic expansion, CSR impact and full digitalization.",
  'about.mission':'Creating lasting value in West Africa through operational excellence and local anchoring.',
  'about.vision_text':"Top 10 African groups by 2045, listed on the stock exchange, 100 billion FCFA in revenue.",
  'about.cta':'Learn more about the group →','about.signature':'BUAME GROUP SAS','about.signature2':'Lomé, Togo — Founded 2025 — OHADA',
  'groupe.holding.title':'A pan-African holding <em>rooted in Lomé</em>',
  'groupe.mission.label':'Mission','groupe.vision.label':'Vision',
  'groupe.values.label':'Values','groupe.values.text':'Excellence, Integrity, Pan-Africanism, Innovation, Responsibility.',
  'groupe.law.label':'Law','groupe.law.text':'OHADA — Uniform Acts. Full compliance, independent audit.',
  'groupe.timeline.eyebrow':'History & Roadmap','groupe.timeline.title':'The <em>BUAME GROUP</em> journey',
  'groupe.timeline.sub':'From founding to the 2045 vision — an ambitious and structured roadmap.',
  'groupe.t1.date':'2025 — Foundation','groupe.t1.title':'Incorporation of BUAME GROUP SAS',
  'groupe.t1.desc':'Creation of the holding and 6 SASU subsidiaries in Lomé. Initial capital 50M FCFA. First management team recruitment.',
  'groupe.t2.date':'2026 — Year 1 Expansion','groupe.t2.title':'Opening offices in Benin & Ghana',
  'groupe.t2.desc':'Deployment of SARL subsidiaries in Cotonou and Accra. BUAME AFRICA SUMMIT #1 in Lomé. First public tender won.',
  'groupe.t3.date':'2027–2028 — Consolidation','groupe.t3.title':"Côte d'Ivoire Hub + ISO Certifications",
  'groupe.t3.desc':"Opening Abidjan, UEMOA's #1 economy. ISO 9001, GlobalG.A.P. certifications. Revenue target: 1.2 billion FCFA.",
  'groupe.t4.date':'2030 — Digitalisation','groupe.t4.title':'Full digital transformation',
  'groupe.t4.desc':'Group ERP, subsidiary CRM, agro e-commerce. Entry into 3 new countries (Nigeria, Senegal, Cameroon).',
  'groupe.t5.date':'2045 — Vision Horizon','groupe.t5.title':'Top 10 African groups — Stock market listing',
  'groupe.t5.desc':"15 countries, 100 billion FCFA revenue, 5,000+ jobs. First listed African conglomerate from Francophone West Africa.",
  'groupe.struct.eyebrow':'Legal Structure','groupe.struct.title':'Group <em>architecture</em>',
  'groupe.struct.sub':'BUAME GROUP SAS oversees 6 SASU subsidiaries in Togo and SARLs in each expansion country, in full compliance with OHADA law.',
  'groupe.struct.card1':'Group holding company. SAS under Togolese law. Capital 50M FCFA. HQ: Lomé, Adidogomé Area — BUAME TOWER.',
  'groupe.struct.card2.title':'6 SASU Subsidiaries — Togo',
  'groupe.struct.card2':'Construction, Market, Logistics, Real Estate, Agro, Media. Each incorporated as a SASU in Lomé, sole shareholder: BUAME GROUP SAS.',
  'groupe.struct.card3.title':'SARL / Ltd — Expansion',
  'groupe.struct.card3':'Benin, Côte d\'Ivoire, Ghana: local SARLs in each sector. OHADA and local law compliance. Dedicated Country Manager per country.',
  'filiales.eyebrow':'Our Subsidiaries','filiales.title':'Six forces, <em>one empire</em>',
  'filiales.subtitle':'Strategic sectors carefully selected for their complementarity and growth potential in West Africa.',
  'filiales.cta':'View all subsidiaries →',
  'filiale.construction.name':'CONSTRUCTION','filiale.construction.full':'BUAME Construction',
  'filiale.construction.desc':'Construction, civil engineering, road infrastructure and buildings. Equipment rental. Public and private contracts.',
  'filiale.trade.name':'MARKET','filiale.trade.full':'BUAME Market',
  'filiale.trade.desc':"Import-export, B2B distribution, general trade. Exclusive supplier of the other 5 subsidiaries.",
  'filiale.logistics.name':'LOGISTICS','filiale.logistics.full':'BUAME Logistics',
  'filiale.logistics.desc':"Regional road transport, customs transit, warehousing. Group's exclusive logistics provider.",
  'filiale.immobilier.name':'REAL ESTATE','filiale.immobilier.full':'BUAME Real Estate',
  'filiale.immobilier.desc':'Residential and commercial real estate development. Property management and office sales.',
  'filiale.agro.name':'AGRO','filiale.agro.full':'BUAME Agro',
  'filiale.agro.desc':'Agri-food processing, cocoa, cashew and shea exports. GlobalG.A.P. certifications.',
  'filiale.medias.name':'MEDIA','filiale.medias.full':'BUAME Media',
  'filiale.medias.desc':'African Web TV, business podcast, digital press and pan-African advertising agency.',
  'tag.marches':'Public Contracts','tag.btp':'Construction','tag.iso9001':'ISO 9001',
  'tag.importexport':'Import-Export','tag.distrib':'B2B Distribution','tag.cedeao':'ECOWAS',
  'tag.transport':'Transport','tag.transit':'Transit','tag.storage':'Warehousing',
  'tag.promotion':'Development','tag.locative':'Property Management','tag.bureaux':'Offices',
  'tag.cacao':'Cocoa Export','tag.globalgap':'GlobalG.A.P.','tag.fairtrade':'Fair Trade',
  'tag.webtv':'Web TV','tag.podcast':'Podcast','tag.regie':'Ad Agency',
  'filiales.synergies.eyebrow':'Unique Model','filiales.synergies.title':'Inter-subsidiary <em>synergies</em>',
  'filiales.synergies.sub':'Each subsidiary is both client and supplier to the others — an integrated ecosystem reducing costs by 15–20% and creating a structural competitive advantage.',
  'strat.eyebrow':'Strategy','strat.title':'Blue Diamond Strategy<em>™</em>',
  'strat.subtitle':'A 20-year roadmap built around 6 strategic pillars to make BUAME GROUP a reference player in Africa.',
  'strat.p1.title':'Local Anchoring','strat.p1.desc':'Deep integration in each market. Local human resources, local partners, full regulatory compliance.',
  'strat.p2.title':'Inter-Subsidiary Synergies','strat.p2.desc':'Integrated ecosystem where each subsidiary feeds the others. Cost reduction of 15–20%, structural competitive advantage.',
  'strat.p3.title':'ISO Certifications','strat.p3.desc':'ISO 9001, ISO 14001, GlobalG.A.P., customs AEO. International standards to access world markets.',
  'strat.p4.title':'Geographic Expansion','strat.p4.desc':'4 countries today → 15 countries by 2040. Next wave: Nigeria, Senegal, Cameroon, Burkina, Mali.',
  'strat.p5.title':'CSR Impact','strat.p5.desc':'Local jobs, vocational training, sustainable agriculture, carbon footprint reduction. Annual ESG reporting.',
  'strat.p6.title':'Digitalization','strat.p6.desc':'Group ERP, subsidiary CRM, agro e-commerce, digital media platforms. Full digital transformation by 2030.',
  'strat.cta':'Read our full vision →',
  'pays.eyebrow':'Geographic Presence','pays.title':'4 countries, <em>one vision</em>',
  'pays.subtitle':'A strategic anchor in the most dynamic economies of West Africa, with planned expansion to 15 countries by 2040.',
  'pays.togo.name':'Togo','pays.togo.role':'Group Headquarters — HQ',
  'pays.togo.detail':'BUAME GROUP SAS<br>6 SASU subsidiaries<br>Lomé — Deep Water Port','pays.togo.badge':'Head Office',
  'pays.benin.name':'Benin','pays.benin.role':'First Expansion Country',
  'pays.benin.detail':'6 SARL subsidiaries<br>Cotonou — Autonomous Port<br>AfCFTA — Free Zone','pays.benin.badge':'Operational Year 1',
  'pays.ci.name':'Ivory Coast','pays.ci.role':'Regional Economic Hub',
  'pays.ci.detail':"6 SARL subsidiaries<br>Abidjan — 1st UEMOA economy<br>Center of Excellence",
  'pays.ghana.name':'Ghana','pays.ghana.role':'Anglophone Gateway',
  'pays.ghana.detail':'6 Ltd subsidiaries<br>Accra — 2nd Gulf of Guinea economy<br>Access to anglophone markets',
  'pays.badge.an23':'Year 2–3','pays.next':'NEXT WAVE:',
  'cta.eyebrow':'Join the adventure','cta.title':'Partners, Investors, <em>Talents</em>',
  'cta.subtitle':'Whether you want to invest, partner or join our team, BUAME GROUP is waiting for you.',
  'cta.btn1':'Contact us →','cta.btn2':'View job openings →',
  'page.group.eyebrow':'The Group','page.group.title':'An African empire <em>under construction</em>','page.group.sub':'Founded in Lomé with a pan-African vision, BUAME GROUP brings together six complementary forces to transform West Africa.',
  'page.gov.eyebrow':'Governance','page.gov.title':'A <em>reference governance</em>','page.gov.sub':'BUAME GROUP applies the governance standards of major international groups, in accordance with OHADA law and best African practices.',
  'page.dir.eyebrow':'Executive Leadership','page.dir.title':'The women and men <em>who build</em>','page.dir.sub':'The BUAME GROUP leadership team brings together excellence profiles trained in Africa and internationally.',
  'page.fil.eyebrow':'Our Subsidiaries','page.fil.title':'Six forces, <em>one empire</em>','page.fil.sub':'Strategically selected sectors for their complementarity and growth potential in West Africa.',
  'page.news.eyebrow':'News','page.news.title':'Latest <em>group news</em>','page.news.sub':'Follow the official news of BUAME GROUP: inaugurations, partnerships, appointments, contracts and landmark events.',
  'page.blog.eyebrow':'Expert Blog','page.blog.title':'<em>Africa Business</em> Insights','page.blog.sub':'Analysis, trends and insights on the West African economy by BUAME GROUP experts.',
  'page.careers.eyebrow':'Careers','page.careers.title':'Join <em>the empire</em>','page.careers.sub':"BUAME GROUP is recruiting ambitious talents who want to build tomorrow's Africa.",
  'page.contact.eyebrow':'Contact Us','page.contact.title':"Let's talk <em>business</em>",'page.contact.sub':'Partnerships, investments, public contracts, joint projects or applications — our team is at your disposal.',
  'breadcrumb.home':'Home','breadcrumb.group':'Group','breadcrumb.gov':'Governance','breadcrumb.dir':'Leadership',
  'breadcrumb.fil':'Subsidiaries','breadcrumb.news':'News','breadcrumb.blog':'Blog','breadcrumb.careers':'Careers','breadcrumb.contact':'Contact',
  'gov.section.eyebrow':'Governance','gov.section.title':'A <em>reference governance</em>',
  'gov.ag.title':'General Assembly','gov.ag.desc':'Sovereign body of BUAME GROUP SAS. Ordinary and extraordinary decisions. Annual meeting mandatory within 6 months of year-end.',
  'gov.ag.item1':'▸ Approval of annual accounts','gov.ag.item2':'▸ Appointment of officers','gov.ag.item3':'▸ Amendment of articles','gov.ag.item4':'▸ Capital increase',
  'gov.ca.title':'Board of Directors','gov.ca.desc':'Chairman + minimum 4 independent directors. Quarterly meetings with formalized minutes. Specialized committees.',
  'gov.ca.item1':'▸ Audit & Risk Committee','gov.ca.item2':'▸ Remuneration & Nominations Committee','gov.ca.item3':'▸ Strategy & Investment Committee','gov.ca.item4':'▸ CSR & Sustainability Committee',
  'gov.dg.title':'General Management','gov.dg.desc':'CEO + 3 Deputy CEOs (Finance, Operations, Strategy). Legal representation, strategy execution, oversight of 6 subsidiaries.',
  'gov.dg.item1':'▸ CEO — Group General Director','gov.dg.item2':'▸ CFO — Consolidated Finance','gov.dg.item3':'▸ COO — Operations & Subsidiaries','gov.dg.item4':'▸ CSO — Strategy & Expansion',
  'gov.p1.title':'Transparency','gov.p1.desc':'Monthly consolidated reporting to all governing bodies',
  'gov.p2.title':'OHADA Compliance','gov.p2.desc':'Full compliance with OHADA Uniform Acts',
  'gov.p3.title':'External Audit','gov.p3.desc':'Independent audit firm — Big 4 level recommended',
  'gov.p4.title':'Anti-Corruption','gov.p4.desc':'Group ethics code — Zero tolerance policy',
  'gov.rse.eyebrow':'CSR & Sustainability','gov.rse.title':'The <em>responsible</em> company','gov.rse.sub':"BUAME GROUP integrates the UN Sustainable Development Goals into every strategic decision.",
  'gov.env.title':'Environment','gov.env.desc':'ISO 14001 targeted for BUAME Construction. Sustainable eco-certified farming for BUAME Agro. Annual carbon footprint measurement.',
  'gov.social.title':'Social','gov.social.desc':'480+ direct jobs planned by Year 3. Funded continuous training 20h/year. Family health insurance for all permanent staff.',
  'gov.gov.title':'Governance','gov.gov.desc':'Full transparency, anti-corruption, OHADA compliance. Annual ESG report published. Dedicated CSR Committee at Board level.',
  'dir.ceo.role':'General Director — CEO','dir.ceo.name':'BUAME GROUP SAS','dir.ceo.location':'Lomé, Togo — Group HQ',
  'dir.ceo.bio':'Legal representative of the group. Definition and execution of the 2045 strategic vision. Oversight of the 6 subsidiary GMs and Country Managers.',
  'dir.cfo.role':'Deputy CEO Finance — CFO','dir.cfo.name':'Finance Department','dir.cfo.location':'Lomé, Togo — Group HQ',
  'dir.cfo.bio':'Consolidated financial management. Internal audit, treasury, banking relationships, reporting to governing bodies.',
  'dir.coo.role':'Deputy CEO Operations — COO','dir.coo.name':'Operations Department','dir.coo.location':'Lomé, Togo — Group HQ',
  'dir.coo.bio':'Operational oversight of 6 subsidiaries and 4 Country Managers. Performance, quality, KPI reporting.',
  'dir.cso.role':'Deputy CEO Strategy — CSO','dir.cso.name':'Strategy Department','dir.cso.location':'Lomé, Togo — Group HQ',
  'dir.cso.bio':'Business development, geographic expansion, M&A, institutional partnerships and steering the 2045 roadmap.',
  'dir.sg.role':'Group General Secretary','dir.sg.name':'Legal Department','dir.sg.location':'Lomé, Togo — Group HQ',
  'dir.sg.bio':'Group legal counsel, OHADA compliance, contract drafting, management of minutes and inter-subsidiary regulatory acts.',
  'dir.drh.role':'Group HR Director — HRD','dir.drh.name':'Human Resources Department','dir.drh.location':'Lomé, Togo — Group HQ',
  'dir.drh.bio':"Recruitment, training, salary policy, talent management, BUAME LEADERS™ and group corporate culture.",
  'dir.leaders.eyebrow':'Corporate Culture','dir.leaders.title':'BUAME LEADERS<em>™</em>',
  'dir.leaders.sub':'Our acceleration program for high-potential employees. Training the leaders of tomorrow for Africa.',
  'dir.leaders.p1':'20 hours of training per year, 100% funded by the group. Partnerships with the best African and international universities.',
  'dir.leaders.p2':'Cross-country and subsidiary mobility encouraged. Multi-country experience for high-potential executives from Year 2.',
  'dir.leaders.mentoring.title':'Executive Mentoring',
  'dir.leaders.p3':'Each BUAME LEADER™ is mentored by a member of the General Management. Personalized coaching and career tracking.',
  'dir.leaders.cta':'Join the team →',
  'news.featured.badge':'OFFICIAL RELEASE','news.featured.title':'BUAME GROUP formalizes its incorporation and launches operations in West Africa',
  'news.featured.desc':"The BUAME GROUP SAS holding company is officially incorporated in Lomé, Togo. The group announces the simultaneous deployment of its 6 SASU subsidiaries.",
  'news.featured.author':'Communications Department','news.read':'Read →',
  'news.n1.cat':'Partnership','news.n1.date':'Oct 2025','news.n1.title':'Strategic partnership agreement with Banque Atlantique for subsidiary financing',
  'news.n2.cat':'Contract','news.n2.date':'Sept 2025','news.n2.title':'BUAME Construction wins its first public tender in Togo',
  'news.n3.cat':'Export','news.n3.date':'Sept 2025','news.n3.title':'BUAME Agro signs first cocoa export contract with a European buyer',
  'news.n4.cat':'Launch','news.n4.date':'Aug 2025','news.n4.title':'BUAME Media launches its digital portal and weekly show "Business Africa"',
  'news.agenda.title':'📅 BUAME GROUP Agenda 2025–2026',
  'news.a1.date':'DEC 2025','news.a1.text':'Constituent General Assembly of the group',
  'news.a2.date':'JAN 2026','news.a2.text':'Official opening of Cotonou & Accra offices',
  'news.a3.date':'MAR 2026','news.a3.text':'BUAME AFRICA SUMMIT #1 — Lomé, Togo',
  'news.a4.date':'JUN 2026','news.a4.text':'Abidjan office opening — CI Hub operational',
  'news.archives.eyebrow':'Archives','news.archives.title':'All our <em>publications</em>',
  'news.archives.sub':'Find all press releases, press kits and institutional publications from BUAME GROUP.',
  'news.press.eyebrow':'Press & Media Contact','news.press.email':'presse@buame-group.com',
  'news.press.sub':'Communications Department — BUAME GROUP · Reply within 24h',
  'news.press.btn1':'Write to press →','news.press.btn2':'Download press kit',
  'blog.eyebrow':'Expert Blog','blog.subtitle':'Analysis, trends and insights on the West African economy by BUAME GROUP experts.',
  'blog.all':'All','blog.all_articles':'All articles →','blog.read':'Read →',
  'blog.post1.title':'AfCFTA 2025: How African Groups Can Seize the Unified Market Opportunity',
  'blog.post1.excerpt':'The African Continental Free Trade Area represents a market of 1.4 billion consumers.',
  'blog.post1.author':'By the Strategy Department',
  'blog.post2.title':'Public Procurement in West Africa: BOAD & AfDB Tender Guide','blog.post2.author':'BTP Expertise',
  'blog.post3.title':'Cocoa Exports to Europe: Certifications and Premium Value Strategies','blog.post3.author':'BUAME Agro',
  'blog.post4.title':'Financing an OHADA Holding: Capital, Credit and Institutional Partners','blog.post4.author':'Finance Department',
  'blog.post5.title':'The Lomé-Abidjan Corridor: ECOWAS Logistics Challenges',
  'blog.post5.desc':"Analysis of trade flows between Togo and Côte d'Ivoire and opportunities for regional logistics operators.",
  'blog.post6.title':'The Lomé Real Estate Boom: Trends and 2026 Outlook',
  'blog.post6.desc':'Overview of the Togolese real estate market and analysis of high-growth segments for local developers.',
  'blog.post7.title':'Digital Media in Africa: The New Communication Eldorado',
  'blog.post7.desc':'Explosive growth in digital audiences and opportunities for African advertising agencies.',
  'blog.recent.eyebrow':'Recent Articles','blog.recent.title':'More <em>insights</em>',
  'blog.newsletter.eyebrow':'Africa Insights Newsletter',
  'blog.newsletter.title':'Receive our analyses every week',
  'blog.newsletter.desc':'Subscribe to the BUAME GROUP newsletter to never miss an insight on the West African economy.',
  'blog.newsletter.cta':'Subscribe →',
  'recru.eyebrow':'Careers','recru.why.eyebrow':'Why join us?','recru.why.title':"Build <em>tomorrow's Africa</em>",
  'recru.why.sub':'BUAME GROUP offers a stimulating work environment where every talent can thrive and contribute to the transformation of the continent.',
  'recru.perk1.title':'Continuous Training','recru.perk1.desc':'20h of training per year, 100% funded by the group',
  'recru.perk2.title':'International Mobility','recru.perk2.desc':'Cross-country and subsidiary mobility encouraged',
  'recru.perk3.title':'Health Coverage','recru.perk3.desc':'Family health insurance for all permanent employees',
  'recru.perk4.title':'BUAME LEADERS™','recru.perk4.desc':'Acceleration program for high-potential employees',
  'recru.perk5.title':'Competitive Salaries','recru.perk5.desc':'Remuneration aligned with international standards',
  'recru.perk6.title':'Real Impact','recru.perk6.desc':"Directly contribute to Africa's economic transformation",
  'recru.rh.title':'Human Resources Department','recru.rh.sub':'rh@buamegroup.com — Reply within 72h',
  'recru.jobs.eyebrow':'Open positions','recru.jobs.title':'Our <em>opportunities</em>',
  'recru.jobs.sub':'Join a team of excellence and help build the pan-African empire.',
  'recru.all':'All positions','recru.apply':'Apply',
  'recru.bottom.label':'Direct contact — Human Resources',
  'recru.bottom.sub':'HR Dept. BUAME GROUP — Lomé, Togo · Mon–Fri 8am–6pm GMT',
  'recru.bottom.btn1':'Write to HR →','recru.bottom.btn2':'Download HR Charter',
  'contact.eyebrow':'Contact Us','contact.title':"Let's talk <em>business</em>",
  'contact.subtitle':'Partnerships, investments, public contracts, joint projects or applications — our team is at your disposal.',
  'contact.hq':'Headquarters','contact.hq.val':"Lomé, Republic of Togo<br><small>Adidogomé Area — BUAME TOWER</small>",
  'contact.email_label':'Email','contact.phone':'Phone',
  'contact.phone.val':'+228 97 19 40 40 <br><small>Mon – Fri, 8am – 6pm GMT</small>',
  'contact.legal_label':'Legal Structure','contact.legal.val':'SAS — OHADA Law<br><small>RCCM Togo — NIF registered</small>',
  'contact.form_badge':'Secure form — Reply within 48h',
  'contact.map.eyebrow':'Map & Directions','contact.map.title':'Find us <em>in Lomé</em>',
  'contact.map.sub':"Our headquarters is located in the Adidogomé area, in the heart of Togo's economic capital.",
  'contact.map.btn':'Open in Google Maps →',
  'contact.off1.city':'Lomé, Togo','contact.off1.addr':'Group HQ<br>BUAME TOWER',
  'contact.off2.city':'Cotonou, Benin','contact.off2.addr':'Regional Office<br>Cadjehoun Area',
  'contact.off3.city':'Abidjan, CI','contact.off3.addr':'Regional Office<br>Plateau Business',
  'contact.off4.city':'Accra, Ghana','contact.off4.addr':'Regional Office<br>Airport City',
  'form.name':'Full name *','form.email':'Email *','form.org':'Organisation','form.country':'Country *',
  'form.subject':'Subject *','form.message':'Message *',
  'form.rgpd':'I accept that my data will be used to process my request. Data retained 24 months.',
  'form.submit':'Send Message ◆',
  'form.rh.name':'Full name *','form.rh.email':'Professional email *','form.rh.poste':'Desired position *',
  'form.rh.pays':'Preferred country','form.rh.msg':'Cover letter *',
  'form.rh.rgpd':'By submitting this form, I authorize BUAME GROUP to process my personal data for this recruitment (retention 24 months).',
  'form.rh.submit':'Send to HR — rh@buame-group.com ◆',
  'img.team':'BUAME GROUP Executive Team - African Business Meeting',
  'img.construction':'BUAME Construction - African Construction Site',
  'img.trade':'BUAME Market - African Market',
  'img.logistics':'BUAME Logistics - African Logistics Port',
  'img.immobilier':'BUAME Real Estate - African Commercial Building',
  'img.agro':'BUAME Agro - West Africa Cocoa Harvest',
  'img.medias':'BUAME Media - African Broadcasting Studio',
  'img.lome':'Panoramic view of Lomé, Togo - BUAME GROUP Headquarters',
  'img.lome2':'Lomé Togo - BUAME GROUP Headquarters',
  'img.cotonou':'Port of Cotonou Benin','img.abidjan':'Abidjan Ivory Coast - Modern Building','img.accra':'Accra Ghana - Maritime Trade',
  'img.overlay.team.label':'Our Strength','img.overlay.team.title':'African talents serving Africa',
  'img.overlay.lome.label':'Lomé, Togo','img.overlay.lome.title':'The beating heart of our pan-African empire',
  'social.linkedin':'LinkedIn','social.twitter':'Twitter/X','social.facebook':'Facebook','social.youtube':'YouTube','social.instagram':'Instagram',
  'logo.alt':'BUAME GROUP Logo',
  'footer.tagline':'"Africa by Africans — build, trade, live, feed, transport, inform."',
  'footer.desc':'Pan-African SAS conglomerate based in Lomé, Togo. 6 subsidiaries, 4 countries, one vision. OHADA — Togolese law.',
  'footer.col.filiales':'Subsidiaries','footer.col.groupe':'Group','footer.col.legal':'Legal',
  'footer.link.about':'About','footer.link.gov':'Governance','footer.link.dir':'Executive Management',
  'footer.link.news':'News','footer.link.strat':'Diamond Strategy','footer.link.blog':'Expert Blog','footer.link.careers':'Careers',
  'footer.link.mentions':'Legal Notice','footer.link.privacy':'Privacy Policy','footer.link.cookies':'Cookies',
  'footer.link.cgv':'Terms & Conditions','footer.link.ohada':'OHADA Law',
  'footer.newsletter':'Newsletter','footer.newsletter.placeholder':'Email','footer.newsletter.btn':'→',
  'footer.copyright':'© 2025 BUAME GROUP SAS — Lomé, Togo. All rights reserved.',
  'footer.legal2':'OHADA Law — RCCM Togo — <a href="#">ISO in progress</a>',
},

// ─────────────────────────── PORTUGUÊS ──────────────────────────
pt: {
  'nav.home':'Início','nav.group':'Grupo','nav.filiales':'Filiais','nav.governance':'Governança',
  'nav.direction':'Direção','nav.news':'Notícias','nav.blog':'Blog','nav.careers':'Carreiras','nav.contact':'Contacto',
  'hero.eyebrow':'Conglomerado Pan-Africano — Lomé, Togo',
  'hero.title.line1':'África','hero.title.line2':'pelos Africanos',
  'hero.subtitle':'Construir, Comerciar, Transportar, Habitar, Alimentar, Informar',
  'hero.desc':"O BUAME GROUP é um conglomerado SAS pan-africano que opera em 6 setores estratégicos em 4 países da África Ocidental. Nossa visão: tornar-se um dos 10 principais grupos africanos até 2045.",
  'hero.cta1':'Descubra as nossas filiais','hero.cta2':'A nossa visão',
  'stats.filiales':'Filiais Ativas','stats.countries':'Países de Operação',
  'stats.billions':'Mds','stats.vision':'Visão CA 2045 (FCFA)','stats.years':'Anos de Visão',
  'diamond.construction':'CONSTRUÇÃO','diamond.trade':'COMÉRCIO','diamond.logistics':'LOGÍSTICA',
  'diamond.immobilier':'IMOBILIÁRIO','diamond.agro':'AGRO','diamond.medias':'MÍDIA',
  'diamond.label1':'DIAMANTE','diamond.label2':'AZUL™',
  'about.eyebrow':'O Grupo','about.title':'Um império africano <em>em construção</em>',
  'about.subtitle':'Fundado em Lomé com uma visão pan-africana, BUAME GROUP reúne seis forças complementares para transformar a África Ocidental.',
  'about.card.legal':'Forma Jurídica Holding','about.card.capital':'Capital Social FCFA',
  'about.card.jobs':'Empregos Previstos Ano 3','about.card.horizon':'Horizonte Visão Grupo',
  'about.num.sas':'SAS','about.num.capital':'50M','about.num.jobs':'480+','about.num.horizon':'2045',
  'about.quote':'"A África precisa de atores africanos que pensem grande, ajam rápido e construam para durar. BUAME GROUP é essa resposta."',
  'about.cite':'— Direção Geral, BUAME GROUP SAS',
  'about.p1':"O BUAME GROUP é uma holding pan-africana constituída sob a forma de Sociedade por Ações Simplificada (SAS) de direito togolês, sediada em Lomé. O grupo opera através de 6 filiais SASU no Togo e SARL nos países de expansão, em conformidade com o direito OHADA.",
  'about.p2':"O nosso modelo é único: cada filial é simultaneamente cliente e fornecedora das outras, criando um ecossistema integrado que reduz custos em 15 a 20%.",
  'about.p3':"Com a Estratégia Diamante Azul™, traçámos um roteiro claro de 20 anos: ancoragem local, sinergias inter-filiais, certificações ISO, expansão geográfica, impacto RSE e digitalização completa.",
  'about.mission':'Criar valor duradouro na África Ocidental por meio da excelência operacional e ancoragem local.',
  'about.vision_text':'Top 10 dos grupos africanos até 2045, listado na bolsa, 100 bilhões FCFA em receita.',
  'about.cta':'Saiba mais sobre o grupo →','about.signature':'BUAME GROUP SAS','about.signature2':'Lomé, Togo — Fundado 2025 — OHADA',
  'groupe.holding.title':'Uma holding pan-africana <em>enraizada em Lomé</em>',
  'groupe.mission.label':'Missão','groupe.vision.label':'Visão',
  'groupe.values.label':'Valores','groupe.values.text':'Excelência, Integridade, Pan-Africanismo, Inovação, Responsabilidade.',
  'groupe.law.label':'Direito','groupe.law.text':'OHADA — Atos Uniformes. Conformidade total, auditoria independente.',
  'groupe.timeline.eyebrow':'História & Roteiro','groupe.timeline.title':'A trajetória <em>BUAME GROUP</em>',
  'groupe.timeline.sub':'Da criação à visão 2045 — um roteiro ambicioso e estruturado.',
  'groupe.t1.date':'2025 — Fundação','groupe.t1.title':'Constituição da BUAME GROUP SAS',
  'groupe.t1.desc':'Criação da holding e das 6 filiais SASU em Lomé. Capital inicial 50M FCFA. Primeiro recrutamento da equipa de direção.',
  'groupe.t2.date':'2026 — Expansão Ano 1','groupe.t2.title':'Abertura de escritórios no Benin & Gana',
  'groupe.t2.desc':'Implementação das filiais SARL em Cotonu e Accra. BUAME AFRICA SUMMIT #1 em Lomé. Primeiro concurso público ganho.',
  'groupe.t3.date':'2027–2028 — Consolidação','groupe.t3.title':"Hub Costa do Marfim + Certificações ISO",
  'groupe.t3.desc':"Abertura Abidjan, 1ª economia da UEMOA. Obtenção das certificações ISO 9001, GlobalG.A.P. Meta de faturação: 1,2 bilhão FCFA.",
  'groupe.t4.date':'2030 — Digitalização','groupe.t4.title':'Transformação digital completa',
  'groupe.t4.desc':'ERP do grupo, CRM das filiais, e-commerce agro. Entrada em 3 novos países (Nigéria, Senegal, Camarões).',
  'groupe.t5.date':'2045 — Horizonte da Visão','groupe.t5.title':'Top 10 grupos africanos — Entrada em bolsa',
  'groupe.t5.desc':"15 países, 100 bilhões FCFA de faturação, 5 000+ empregos. Primeiro conglomerado africano cotado originário da África Ocidental francófona.",
  'groupe.struct.eyebrow':'Estrutura Jurídica','groupe.struct.title':'Arquitetura <em>do grupo</em>',
  'groupe.struct.sub':'A BUAME GROUP SAS supervisiona 6 filiais SASU no Togo e SARLs em cada país de expansão, em total conformidade com o direito OHADA.',
  'groupe.struct.card1':'Holding do grupo. SAS de direito togolês. Capital 50M FCFA. Sede: Lomé, Zona Adidogomé — BUAME TOWER.',
  'groupe.struct.card2.title':'6 Filiais SASU — Togo',
  'groupe.struct.card2':'Construção, Mercado, Logística, Imobiliário, Agro, Média. Cada uma constituída como SASU em Lomé, acionista único: BUAME GROUP SAS.',
  'groupe.struct.card3.title':'SARL / Ltd — Expansão',
  'groupe.struct.card3':"Benin, Costa do Marfim, Gana: SARLs locais em cada setor. Conformidade OHADA e direito local. Country Manager dedicado por país.",
  'filiales.eyebrow':'As Nossas Filiais','filiales.title':'Seis forças, <em>um só império</em>',
  'filiales.subtitle':'Setores estratégicos cuidadosamente selecionados pela sua complementaridade e potencial de crescimento na África Ocidental.',
  'filiales.cta':'Ver todas as filiais →',
  'filiale.construction.name':'CONSTRUÇÃO','filiale.construction.full':'BUAME Construção',
  'filiale.construction.desc':'Construção, engenharia civil, infraestruturas rodoviárias e edifícios. Aluguer de equipamentos. Mercados públicos e privados.',
  'filiale.trade.name':'MERCADO','filiale.trade.full':'BUAME Mercado',
  'filiale.trade.desc':'Importação-exportação, distribuição B2B, comércio geral. Fornecedor exclusivo das outras 5 filiais.',
  'filiale.logistics.name':'LOGÍSTICA','filiale.logistics.full':'BUAME Logística',
  'filiale.logistics.desc':'Transporte rodoviário regional, trânsito aduaneiro, armazenagem. Prestador logístico exclusivo do grupo.',
  'filiale.immobilier.name':'IMOBILIÁRIO','filiale.immobilier.full':'BUAME Imobiliário',
  'filiale.immobilier.desc':'Promoção imobiliária residencial e comercial. Gestão locativa e venda de escritórios.',
  'filiale.agro.name':'AGRO','filiale.agro.full':'BUAME Agro',
  'filiale.agro.desc':'Transformação agroalimentar, exportação de cacau, caju e karité. Certificações GlobalG.A.P.',
  'filiale.medias.name':'MÍDIA','filiale.medias.full':'BUAME Mídia',
  'filiale.medias.desc':'Web TV africana, podcast empresarial, imprensa digital e agência publicitária pan-africana.',
  'tag.marches':'Mercados Públicos','tag.btp':'Construção','tag.iso9001':'ISO 9001',
  'tag.importexport':'Importação-Exportação','tag.distrib':'Distribuição B2B','tag.cedeao':'CEDEAO',
  'tag.transport':'Transporte','tag.transit':'Trânsito','tag.storage':'Armazenagem',
  'tag.promotion':'Promoção','tag.locative':'Gestão Locativa','tag.bureaux':'Escritórios',
  'tag.cacao':'Exportação Cacau','tag.globalgap':'GlobalG.A.P.','tag.fairtrade':'Comércio Justo',
  'tag.webtv':'Web TV','tag.podcast':'Podcast','tag.regie':'Agência Pub',
  'filiales.synergies.eyebrow':'Modelo Único','filiales.synergies.title':'Sinergias <em>entre filiais</em>',
  'filiales.synergies.sub':'Cada filial é cliente e fornecedora das demais — um ecossistema integrado que reduz custos em 15–20% e cria uma vantagem competitiva estrutural.',
  'strat.eyebrow':'Estratégia','strat.title':'Estratégia Diamante Azul<em>™</em>',
  'strat.subtitle':'Um roteiro de 20 anos articulado em torno de 6 pilares estratégicos para tornar BUAME GROUP um ator de referência em África.',
  'strat.p1.title':'Ancoragem Local','strat.p1.desc':'Implantação profunda em cada mercado. Recursos humanos locais, parceiros locais, conformidade regulamentar total.',
  'strat.p2.title':'Sinergias Inter-Filiais','strat.p2.desc':'Ecossistema integrado onde cada filial alimenta as outras. Redução de custos de 15–20%, vantagem competitiva estrutural.',
  'strat.p3.title':'Certificações ISO','strat.p3.desc':'ISO 9001, ISO 14001, GlobalG.A.P., OEA aduaneiro. Padrões internacionais para aceder aos mercados mundiais.',
  'strat.p4.title':'Expansão Geográfica','strat.p4.desc':'4 países hoje → 15 países até 2040. Próxima onda: Nigéria, Senegal, Camarões, Burkina, Mali.',
  'strat.p5.title':'Impacto RSE','strat.p5.desc':'Empregos locais, formação profissional, agricultura sustentável, redução da pegada de carbono. Relatório ESG anual.',
  'strat.p6.title':'Digitalização','strat.p6.desc':'ERP grupo, CRM filiais, e-commerce agro, plataformas digitais média. Transformação digital total até 2030.',
  'strat.cta':'Leia a nossa visão completa →',
  'pays.eyebrow':'Presença Geográfica','pays.title':'4 países, <em>uma visão</em>',
  'pays.subtitle':'Uma âncora estratégica nas economias mais dinâmicas da África Ocidental, com expansão planificada para 15 países até 2040.',
  'pays.togo.name':'Togo','pays.togo.role':'Sede do Grupo — HQ',
  'pays.togo.detail':'BUAME GROUP SAS<br>6 filiais SASU<br>Lomé — Porto de Águas Profundas','pays.togo.badge':'Sede Social',
  'pays.benin.name':'Benim','pays.benin.role':'Primeiro País de Expansão',
  'pays.benin.detail':'6 filiais SARL<br>Cotonou — Porto autónomo<br>ZLECAF — Zona franca','pays.benin.badge':'Operacional Ano 1',
  'pays.ci.name':'Costa do Marfim','pays.ci.role':'Hub Económico Regional',
  'pays.ci.detail':"6 filiais SARL<br>Abidjan — 1ª economia UEMOA<br>Centro de Excelência",
  'pays.ghana.name':'Gana','pays.ghana.role':'Porta Anglófona',
  'pays.ghana.detail':'6 filiais Ltd<br>Acra — 2ª economia Golfo da Guiné<br>Acesso a mercados anglófonos',
  'pays.badge.an23':'Ano 2–3','pays.next':'PRÓXIMA ONDA:',
  'cta.eyebrow':'Junte-se à aventura','cta.title':'Parceiros, Investidores, <em>Talentos</em>',
  'cta.subtitle':'Quer pretenda investir, associar-se ou juntar-se à nossa equipa, BUAME GROUP espera por si.',
  'cta.btn1':'Contacte-nos →','cta.btn2':'Ver ofertas de emprego →',
  'page.group.eyebrow':'O Grupo','page.group.title':'Um império africano <em>em construção</em>','page.group.sub':'Fundado em Lomé com uma visão pan-africana, o BUAME GROUP reúne seis forças complementares para transformar a África Ocidental.',
  'page.gov.eyebrow':'Governança','page.gov.title':'Uma governança <em>de referência</em>','page.gov.sub':'O BUAME GROUP aplica os padrões de governança dos grandes grupos internacionais, de acordo com o direito OHADA e as melhores práticas africanas.',
  'page.dir.eyebrow':'Direção Executiva','page.dir.title':'As mulheres e homens <em>que constroem</em>','page.dir.sub':'A equipa de liderança do BUAME GROUP reúne perfis de excelência formados em África e internacionalmente.',
  'page.fil.eyebrow':'As Nossas Filiais','page.fil.title':'Seis forças, <em>um só império</em>','page.fil.sub':'Setores estratégicos selecionados pela sua complementaridade e potencial de crescimento na África Ocidental.',
  'page.news.eyebrow':'Notícias','page.news.title':'Últimas <em>notícias do grupo</em>','page.news.sub':'Acompanhe as notícias oficiais do BUAME GROUP: inaugurações, parcerias, nomeações, contratos e eventos marcantes.',
  'page.blog.eyebrow':'Blog Especializado','page.blog.title':'Insights <em>África Business</em>','page.blog.sub':'Análises, tendências e insights sobre a economia da África Ocidental pelos especialistas do BUAME GROUP.',
  'page.careers.eyebrow':'Carreiras','page.careers.title':'Junte-se <em>ao império</em>','page.careers.sub':"O BUAME GROUP recruta talentos ambiciosos que querem construir a África de amanhã.",
  'page.contact.eyebrow':'Contacte-nos','page.contact.title':'Falemos de <em>negócios</em>','page.contact.sub':'Parcerias, investimentos, contratos públicos, projetos conjuntos ou candidaturas — a nossa equipa está à sua disposição.',
  'breadcrumb.home':'Início','breadcrumb.group':'Grupo','breadcrumb.gov':'Governança','breadcrumb.dir':'Direção',
  'breadcrumb.fil':'Filiais','breadcrumb.news':'Notícias','breadcrumb.blog':'Blog','breadcrumb.careers':'Carreiras','breadcrumb.contact':'Contacto',
  'gov.section.eyebrow':'Governança','gov.section.title':'Uma governança <em>de referência</em>',
  'gov.ag.title':'Assembleia Geral','gov.ag.desc':'Órgão soberano da SAS BUAME GROUP. Decisões ordinárias e extraordinárias. Reunião anual obrigatória nos 6 meses seguintes ao encerramento.',
  'gov.ag.item1':'▸ Aprovação das contas anuais','gov.ag.item2':'▸ Nomeação dos dirigentes','gov.ag.item3':'▸ Alteração dos estatutos','gov.ag.item4':'▸ Aumento de capital',
  'gov.ca.title':'Conselho de Administração','gov.ca.desc':'Presidente + mínimo de 4 administradores independentes. Reuniões trimestrais com atas formalizadas. Comités especializados.',
  'gov.ca.item1':'▸ Comité de Auditoria & Riscos','gov.ca.item2':'▸ Comité de Remunerações & Nomeações','gov.ca.item3':'▸ Comité de Estratégia & Investimentos','gov.ca.item4':'▸ Comité RSE & Desenvolvimento Sustentável',
  'gov.dg.title':'Direção Geral','gov.dg.desc':'CEO + 3 Diretores Adjuntos (Finanças, Operações, Estratégia). Representação legal, execução da estratégia do grupo.',
  'gov.dg.item1':'▸ CEO — Diretor Geral do Grupo','gov.dg.item2':'▸ CFO — Finanças Consolidadas','gov.dg.item3':'▸ COO — Operações & Filiais','gov.dg.item4':'▸ CSO — Estratégia & Expansão',
  'gov.p1.title':'Transparência','gov.p1.desc':'Relatório mensal consolidado a todos os órgãos',
  'gov.p2.title':'Conformidade OHADA','gov.p2.desc':'Respeito total dos Atos Uniformes OHADA',
  'gov.p3.title':'Auditoria Externa','gov.p3.desc':'Gabinete de auditoria independente — nível Big 4 recomendado',
  'gov.p4.title':'Anti-Corrupção','gov.p4.desc':'Código de ética do grupo — Política de tolerância zero',
  'gov.rse.eyebrow':'RSE & Desenvolvimento Sustentável','gov.rse.title':'A empresa <em>responsável</em>','gov.rse.sub':"O BUAME GROUP integra os objetivos de desenvolvimento sustentável da ONU em cada decisão estratégica.",
  'gov.env.title':'Ambiente','gov.env.desc':'Certificação ISO 14001 visada para a BUAME Construção. Agricultura sustentável e eco-certificada para a BUAME Agro. Medição anual da pegada de carbono.',
  'gov.social.title':'Social','gov.social.desc':'480+ empregos diretos previstos no Ano 3. Formação contínua 20h/ano financiada. Seguro de saúde familiar para todos os contratos permanentes.',
  'gov.gov.title':'Governança','gov.gov.desc':'Transparência total, anti-corrupção, conformidade OHADA. Relatório ESG anual publicado. Comité RSE dedicado no Conselho de Administração.',
  'dir.ceo.role':'Diretor Geral — CEO','dir.ceo.name':'BUAME GROUP SAS','dir.ceo.location':'Lomé, Togo — Sede do Grupo',
  'dir.ceo.bio':'Representante legal do grupo. Definição e execução da visão estratégica 2045. Supervisão dos 6 DG das filiais e dos Country Managers.',
  'dir.cfo.role':'DG Adjunto Finanças — CFO','dir.cfo.name':'Departamento Financeiro','dir.cfo.location':'Lomé, Togo — Sede do Grupo',
  'dir.cfo.bio':'Gestão financeira consolidada do grupo. Auditoria interna, tesouraria, relações bancárias, reporte aos órgãos.',
  'dir.coo.role':'DG Adjunto Operações — COO','dir.coo.name':'Departamento de Operações','dir.coo.location':'Lomé, Togo — Sede do Grupo',
  'dir.coo.bio':'Supervisão operacional das 6 filiais e dos 4 Country Managers. Desempenho, qualidade, reporte de KPIs.',
  'dir.cso.role':'DG Adjunto Estratégia — CSO','dir.cso.name':'Departamento de Estratégia','dir.cso.location':'Lomé, Togo — Sede do Grupo',
  'dir.cso.bio':'Desenvolvimento de negócios, expansão geográfica, M&A, parcerias institucionais e pilotagem do roteiro 2045.',
  'dir.sg.role':'Secretário-Geral do Grupo','dir.sg.name':'Departamento Jurídico','dir.sg.location':'Lomé, Togo — Sede do Grupo',
  'dir.sg.bio':'Assessoria jurídica do grupo, conformidade OHADA, redação de contratos, gestão das atas e dos atos regulamentares entre filiais.',
  'dir.drh.role':'Diretor RH do Grupo — DRH','dir.drh.name':'Departamento de Recursos Humanos','dir.drh.location':'Lomé, Togo — Sede do Grupo',
  'dir.drh.bio':"Recrutamento, formação, política salarial, gestão de talentos, BUAME LEADERS™ e cultura empresarial do grupo.",
  'dir.leaders.eyebrow':'Cultura Empresarial','dir.leaders.title':'BUAME LEADERS<em>™</em>',
  'dir.leaders.sub':'O nosso programa de aceleração para os colaboradores de alto potencial. Formar os líderes de amanhã para África.',
  'dir.leaders.p1':'20 horas de formação por ano, 100% financiadas pelo grupo. Parcerias com as melhores universidades africanas e internacionais.',
  'dir.leaders.p2':'Passagens entre países e filiais encorajadas. Experiência multinacional para quadros de alto potencial a partir do Ano 2.',
  'dir.leaders.mentoring.title':'Mentoria Executiva',
  'dir.leaders.p3':'Cada BUAME LEADER™ é acompanhado por um membro da Direção Geral. Coaching personalizado e acompanhamento de carreira.',
  'dir.leaders.cta':'Juntar-se à equipa →',
  'news.featured.badge':'COMUNICADO OFICIAL','news.featured.title':'O BUAME GROUP formaliza a sua constituição e lança operações na África Ocidental',
  'news.featured.desc':'A holding SAS BUAME GROUP está oficialmente constituída em Lomé, Togo. O grupo anuncia o lançamento simultâneo das suas 6 filiais SASU.',
  'news.featured.author':'Departamento de Comunicação','news.read':'Ler →',
  'news.n1.cat':'Parceria','news.n1.date':'Out 2025','news.n1.title':'Acordo de parceria estratégica com o Banco Atlântico para o financiamento das filiais',
  'news.n2.cat':'Contrato','news.n2.date':'Set 2025','news.n2.title':'BUAME Construção vence o seu primeiro concurso público no Togo',
  'news.n3.cat':'Exportação','news.n3.date':'Set 2025','news.n3.title':'BUAME Agro assina o primeiro contrato de exportação de cacau para um comprador europeu',
  'news.n4.cat':'Lançamento','news.n4.date':'Ago 2025','news.n4.title':'BUAME Média lança o seu portal digital e o programa semanal "Business Africa"',
  'news.agenda.title':'📅 Agenda BUAME GROUP 2025–2026',
  'news.a1.date':'DEZ 2025','news.a1.text':'Assembleia Geral Constitutiva do grupo',
  'news.a2.date':'JAN 2026','news.a2.text':'Abertura oficial dos escritórios de Cotonu & Accra',
  'news.a3.date':'MAR 2026','news.a3.text':'BUAME AFRICA SUMMIT #1 — Lomé, Togo',
  'news.a4.date':'JUN 2026','news.a4.text':'Abertura do escritório de Abidjan — Hub CI operacional',
  'news.archives.eyebrow':'Arquivos','news.archives.title':'Todas as nossas <em>publicações</em>',
  'news.archives.sub':'Encontre todos os comunicados de imprensa, dossiers de imprensa e publicações institucionais do BUAME GROUP.',
  'news.press.eyebrow':'Contacto Imprensa & Média','news.press.email':'presse@buame-group.com',
  'news.press.sub':'Departamento de Comunicação — BUAME GROUP · Resposta em 24h',
  'news.press.btn1':'Escrever à imprensa →','news.press.btn2':'Descarregar dossier de imprensa',
  'blog.eyebrow':'Blog Especializado','blog.subtitle':'Análises, tendências e insights sobre a economia da África Ocidental pelos especialistas do BUAME GROUP.',
  'blog.all':'Todos','blog.all_articles':'Todos os artigos →','blog.read':'Ler →',
  'blog.post1.title':'ZLECAF 2025: Como Grupos Africanos Podem Aproveitar o Mercado Unificado',
  'blog.post1.excerpt':'A Zona de Livre Comércio Continental Africana representa um mercado de 1,4 mil milhões de consumidores.',
  'blog.post1.author':'Pela Direção de Estratégia',
  'blog.post2.title':'Contratações Públicas na África Ocidental: Guia de Licitações BOAD & BAD','blog.post2.author':'Especialização BTP',
  'blog.post3.title':'Exportação de Cacau para Europa: Certificações e Estratégias Premium','blog.post3.author':'BUAME Agro',
  'blog.post4.title':'Financiamento de uma Holding OHADA: Capital, Crédito e Parceiros','blog.post4.author':'Direção Financeira',
  'blog.post5.title':'O Corredor Lomé-Abidjan: Desafios Logísticos da CEDEAO',
  'blog.post5.desc':"Análise dos fluxos comerciais entre o Togo e a Costa do Marfim e das oportunidades para os operadores logísticos regionais.",
  'blog.post6.title':'O Boom Imobiliário em Lomé: Tendências e Perspetivas 2026',
  'blog.post6.desc':'Estado do mercado imobiliário togolês e análise dos segmentos com maior potencial de crescimento.',
  'blog.post7.title':'Média Digitais em África: O Novo Eldorado da Comunicação',
  'blog.post7.desc':'Crescimento explosivo das audiências digitais e oportunidades para as agências de publicidade africanas.',
  'blog.recent.eyebrow':'Artigos Recentes','blog.recent.title':'Mais <em>insights</em>',
  'blog.newsletter.eyebrow':'Newsletter Insights África',
  'blog.newsletter.title':'Receba as nossas análises todas as semanas',
  'blog.newsletter.desc':'Inscreva-se na newsletter do BUAME GROUP para não perder nenhum insight sobre a economia da África Ocidental.',
  'blog.newsletter.cta':'Inscrever-se →',
  'recru.eyebrow':'Carreiras','recru.why.eyebrow':'Por que nos juntar?','recru.why.title':"Construa <em>a África de amanhã</em>",
  'recru.why.sub':'O BUAME GROUP oferece um ambiente de trabalho estimulante onde cada talento pode prosperar e contribuir para a transformação do continente.',
  'recru.perk1.title':'Formação Contínua','recru.perk1.desc':'20h de formação por ano, 100% financiadas pelo grupo',
  'recru.perk2.title':'Mobilidade Internacional','recru.perk2.desc':'Passagens entre países e filiais encorajadas',
  'recru.perk3.title':'Cobertura de Saúde','recru.perk3.desc':'Seguro de saúde familiar para todos os contratos permanentes',
  'recru.perk4.title':'BUAME LEADERS™','recru.perk4.desc':'Programa de aceleração para colaboradores de alto potencial',
  'recru.perk5.title':'Salários Competitivos','recru.perk5.desc':'Remunerações alinhadas com os padrões internacionais',
  'recru.perk6.title':'Impacto Real','recru.perk6.desc':"Contribua diretamente para a transformação económica de África",
  'recru.rh.title':'Departamento de Recursos Humanos','recru.rh.sub':'rh@buamegroup.com — Resposta em 72h',
  'recru.jobs.eyebrow':'Vagas abertas','recru.jobs.title':'As nossas <em>oportunidades</em>',
  'recru.jobs.sub':'Junte-se a uma equipa de excelência e ajude a construir o império pan-africano.',
  'recru.all':'Todos os cargos','recru.apply':'Candidatar',
  'recru.bottom.label':'Contacto direto — Recursos Humanos',
  'recru.bottom.sub':'RH BUAME GROUP — Lomé, Togo · Seg–Sex 8h–18h GMT',
  'recru.bottom.btn1':'Escrever ao RH →','recru.bottom.btn2':'Descarregar Carta de RH',
  'contact.eyebrow':'Contacte-nos','contact.title':'Falemos de <em>negócios</em>',
  'contact.subtitle':'Parcerias, investimentos, contratos públicos, projetos conjuntos ou candidaturas — a nossa equipa está à sua disposição.',
  'contact.hq':'Sede Social','contact.hq.val':'Lomé, República do Togo<br><small>Zona de Adidogomé — BUAME TOWER</small>',
  'contact.email_label':'E-mail','contact.phone':'Telefone',
  'contact.phone.val':'+228 97 19 40 40<br><small>Seg – Sex, 8h – 18h GMT</small>',
  'contact.legal_label':'Estrutura Jurídica','contact.legal.val':'SAS — Direito OHADA<br><small>RCCM Togo — NIF registado</small>',
  'contact.form_badge':'Formulário seguro — Resposta em 48h',
  'contact.map.eyebrow':'Mapa & Acesso','contact.map.title':'Encontre-nos <em>em Lomé</em>',
  'contact.map.sub':"A nossa sede está situada na zona de Adidogomé, no coração da capital económica do Togo.",
  'contact.map.btn':'Abrir no Google Maps →',
  'contact.off1.city':'Lomé, Togo','contact.off1.addr':'Sede do Grupo HQ<br>BUAME TOWER',
  'contact.off2.city':'Cotonu, Benin','contact.off2.addr':'Escritório Regional<br>Zona Cadjehoun',
  'contact.off3.city':'Abidjan, CI','contact.off3.addr':'Escritório Regional<br>Plateau Business',
  'contact.off4.city':'Accra, Gana','contact.off4.addr':'Regional Office<br>Airport City',
  'form.name':'Nome completo *','form.email':'E-mail *','form.org':'Organização','form.country':'País *',
  'form.subject':'Assunto *','form.message':'Mensagem *',
  'form.rgpd':'Aceito que os meus dados sejam utilizados para processar o meu pedido. Dados conservados 24 meses.',
  'form.submit':'Enviar mensagem ◆',
  'form.rh.name':'Nome completo *','form.rh.email':'E-mail profissional *','form.rh.poste':'Cargo pretendido *',
  'form.rh.pays':'País preferido','form.rh.msg':'Carta de motivação *',
  'form.rh.rgpd':'Ao submeter este formulário, autorizo o BUAME GROUP a tratar os meus dados pessoais no âmbito deste recrutamento (conservação 24 meses).',
  'form.rh.submit':'Enviar ao RH — rh@buame-group.com ◆',
  'img.team':'Equipa dirigente BUAME GROUP - Reunião de negócios em África',
  'img.construction':'BUAME Construção - Canteiro de obras BTP África',
  'img.trade':'BUAME Comércio - Porto de contentores África',
  'img.logistics':'BUAME Logística - Porto logístico África',
  'img.immobilier':'BUAME Imobiliário - Edifício comercial África',
  'img.agro':'BUAME Agro - Colheita de cacau África Ocidental',
  'img.medias':'BUAME Mídia - Estúdio de radiodifusão africano',
  'img.lome':'Vista panorâmica de Lomé, Togo - Sede BUAME GROUP',
  'img.lome2':'Lomé Togo - Sede BUAME GROUP','img.cotonou':'Porto de Cotonou Benim',
  'img.abidjan':'Abidjan Costa do Marfim - Edifício moderno','img.accra':'Acra Gana - Comércio marítimo',
  'img.overlay.team.label':'A Nossa Força','img.overlay.team.title':'Talentos africanos ao serviço de África',
  'img.overlay.lome.label':'Lomé, Togo','img.overlay.lome.title':'O coração batente do nosso império pan-africano',
  'social.linkedin':'LinkedIn','social.twitter':'Twitter/X','social.facebook':'Facebook','social.youtube':'YouTube','social.instagram':'Instagram',
  'logo.alt':'BUAME GROUP Logo',
  'footer.tagline':'"África pelos Africanos — construir, comerciar, habitar, alimentar, transportar, informar."',
  'footer.desc':'Conglomerado pan-africano SAS sediado em Lomé, Togo. 6 filiais, 4 países, uma visão. OHADA — Direito togolês.',
  'footer.col.filiales':'Filiais','footer.col.groupe':'Grupo','footer.col.legal':'Menções Legais',
  'footer.link.about':'Sobre','footer.link.gov':'Governança','footer.link.dir':'Direção Executiva',
  'footer.link.news':'Notícias','footer.link.strat':'Estratégia Diamante','footer.link.blog':'Blog Especializado','footer.link.careers':'Carreiras',
  'footer.link.mentions':'Menções legais','footer.link.privacy':'Política de privacidade','footer.link.cookies':'Cookies',
  'footer.link.cgv':'CGV / CGU','footer.link.ohada':'Direito OHADA',
  'footer.newsletter':'Newsletter','footer.newsletter.placeholder':'Email','footer.newsletter.btn':'→',
  'footer.copyright':'© 2025 BUAME GROUP SAS — Lomé, Togo. Todos os direitos reservados.',
  'footer.legal2':'Direito OHADA — RCCM Togo — <a href="#">ISO em curso</a>',
}
}; // fin I18N

// ════════════════════════════════════════════════════════════════
// MOTEUR i18n — getTranslation + applyTranslations (script_.js)
// ════════════════════════════════════════════════════════════════
let currentLang = localStorage.getItem('buame-lang') || 'fr';

function getTranslation(key) {
  const t = I18N[currentLang];
  if (t && t[key] !== undefined) return t[key];
  // Fallback FR
  const fr = I18N['fr'];
  if (fr && fr[key] !== undefined) return fr[key];
  return null;
}

function applyTranslations() {
  // 1. data-i18n → innerHTML (supporte HTML et texte)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = getTranslation(el.dataset.i18n);
    if (val !== null) el.innerHTML = val;
  });
  // 2. data-i18n-html → innerHTML explicite
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = getTranslation(el.dataset.i18nHtml);
    if (val !== null) el.innerHTML = val;
  });
  // 3. data-i18n-placeholder → placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = getTranslation(el.dataset.i18nPlaceholder);
    if (val !== null) el.placeholder = val;
  });
  // 4. data-i18n-alt → alt
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const val = getTranslation(el.dataset.i18nAlt);
    if (val !== null) el.alt = val;
  });
  // 5. data-i18n-aria → aria-label
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const val = getTranslation(el.dataset.i18nAria);
    if (val !== null) el.setAttribute('aria-label', val);
  });
  // 6. data-i18n-title → title attribute
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const val = getTranslation(el.dataset.i18nTitle);
    if (val !== null) el.title = val;
  });
  // Mettre à jour lang HTML
  document.documentElement.lang = currentLang;
}

function updateLangButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === currentLang);
  });
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('buame-lang', lang);
  applyTranslations();
  updateLangButtons();
  renderJobs();
  showToast(lang === 'fr' ? 'Langue : Français' : lang === 'en' ? 'Language: English' : 'Idioma: Português');
}

// ════════════════════════════════════════════════════════════════
// MODAL FILIALES (enrichi depuis script_.js — multilingue)
// ════════════════════════════════════════════════════════════════
const FILIALE_DATA = {
  fr: {
    construction: { emoji:'🏗️', title:'BUAME Construction', desc:"BTP, génie civil, infrastructures routières et bâtiments. Location d'équipements BTP. Marchés publics et privés BOAD, BAD, BM.", details:"Certification ISO 9001 en cours. 150+ employés prévus An 3. Chantiers au Togo, Bénin, Côte d'Ivoire et Ghana. Location engins : grues, pelleteuses, bulldozers, compacteurs.", ca:'360 000 000 FCFA (An 3)', synergy:'BUAME LOGISTICS pour approvisionnement, BUAME IMMOBILIER pour projets résidentiels' },
    trade: { emoji:'📦', title:'BUAME Marché', desc:'Import-export, distribution B2B, commerce général. Fournisseur exclusif des 5 autres filiales.', details:'Hub logistique à Lomé. Partenariats avec fournisseurs asiatiques et européens. ZLECAF compliant.', ca:'240 000 000 FCFA (An 3)', synergy:"Fournisseur exclusif des 5 autres filiales du groupe" },
    logistics: { emoji:'🚛', title:'BUAME Logistics', desc:'Transport routier régional, transit douanier, entreposage. Prestataire logistique exclusif du groupe.', details:"Flotte de 50+ camions prévue. Entrepôts à Lomé et Cotonou. Certification OEA douanier. Agrément TRIE-CEDEAO.", ca:'84 000 000 FCFA (An 3)', synergy:'Prestataire logistique exclusif des 5 autres filiales' },
    immobilier: { emoji:'🏢', title:'BUAME Immobilier', desc:'Promotion immobilière résidentielle et commerciale. Gestion locative et vente de bureaux.', details:'200+ unités résidentielles en développement. Projets commerciaux à Lomé et Abidjan. Promoteur agréé, assurance RC décennale.', ca:'300 000 000 FCFA (An 3)', synergy:'BUAME CONSTRUCTION réalise tous les chantiers' },
    agro: { emoji:'🌿', title:'BUAME Agro', desc:'Transformation agro-alimentaire, exportation cacao, anacarde et karité. Certifications GlobalG.A.P.', details:"3 unités de transformation prévues. Export vers l'Europe et l'Asie. Fair Trade certified. Bio en cible.", ca:'180 000 000 FCFA (An 3)', synergy:'BUAME TRADE assure la commercialisation internationale' },
    medias: { emoji:'📡', title:'BUAME Médias', desc:'Web TV africaine, podcast business, presse digitale et régie publicitaire panafricaine.', details:'Studio à Lomé. Couverture 4 pays. Audience cible : 5M+ professionnels africains. Licence audiovisuelle en cours.', ca:'36 000 000 FCFA (An 3)', synergy:'Porte-parole et promoteur de toutes les filiales du groupe' }
  },
  en: {
    construction: { emoji:'🏗️', title:'BUAME Construction', desc:'Construction, civil engineering, road infrastructure and buildings. BTP equipment rental. Public and private contracts.', details:'ISO 9001 certification in progress. 150+ employees planned Year 3. Sites in Togo, Benin, Ivory Coast and Ghana.', ca:'360 000 000 FCFA (Year 3)', synergy:'BUAME LOGISTICS for supply, BUAME REAL ESTATE for residential projects' },
    trade: { emoji:'📦', title:'BUAME Market', desc:"Import-export, B2B distribution, general trade. Exclusive supplier of the other 5 subsidiaries.", details:'Logistics hub in Lomé. Partnerships with Asian and European suppliers. AfCFTA compliant.', ca:'240 000 000 FCFA (Year 3)', synergy:"Exclusive supplier for the group's 5 other subsidiaries" },
    logistics: { emoji:'🚛', title:'BUAME Logistics', desc:"Regional road transport, customs transit, warehousing. Group's exclusive logistics provider.", details:'Fleet of 50+ trucks planned. Warehouses in Lomé and Cotonou. Customs AEO certification. ECOWAS transit approval.', ca:'84 000 000 FCFA (Year 3)', synergy:'Exclusive logistics provider for all 5 subsidiaries' },
    immobilier: { emoji:'🏢', title:'BUAME Real Estate', desc:'Residential and commercial real estate development. Property management and office sales.', details:'200+ residential units in development. Commercial projects in Lomé and Abidjan. Licensed developer.', ca:'300 000 000 FCFA (Year 3)', synergy:'BUAME CONSTRUCTION carries out all projects' },
    agro: { emoji:'🌿', title:'BUAME Agro', desc:'Agri-food processing, cocoa, cashew and shea exports. GlobalG.A.P. certifications.', details:'3 processing units planned. Export to Europe and Asia. Fair Trade certified. Organic in pipeline.', ca:'180 000 000 FCFA (Year 3)', synergy:'BUAME TRADE handles international marketing' },
    medias: { emoji:'📡', title:'BUAME Media', desc:'African Web TV, business podcast, digital press and pan-African advertising agency.', details:'Studio in Lomé. Coverage 4 countries. Target audience: 5M+ African professionals. Broadcasting licence in progress.', ca:'36 000 000 FCFA (Year 3)', synergy:'Spokesperson and promoter for all group subsidiaries' }
  },
  pt: {
    construction: { emoji:'🏗️', title:'BUAME Construção', desc:'Construção, engenharia civil, infraestruturas rodoviárias e edifícios. Aluguer de equipamentos. Mercados públicos e privados.', details:'Certificação ISO 9001 em curso. 150+ empregados previstos Ano 3. Obras no Togo, Benim, Costa do Marfim e Gana.', ca:'360 000 000 FCFA (Ano 3)', synergy:'BUAME LOGÍSTICA para abastecimento, BUAME IMOBILIÁRIO para projetos residenciais' },
    trade: { emoji:'📦', title:'BUAME Mercado', desc:'Importação-exportação, distribuição B2B, comércio geral. Fornecedor exclusivo das outras 5 filiais.', details:'Hub logístico em Lomé. Parcerias com fornecedores asiáticos e europeus. Conforme ZLECAF.', ca:'240 000 000 FCFA (Ano 3)', synergy:'Fornecedor exclusivo das outras 5 filiais do grupo' },
    logistics: { emoji:'🚛', title:'BUAME Logística', desc:'Transporte rodoviário regional, trânsito aduaneiro, armazenagem. Prestador logístico exclusivo do grupo.', details:'Frota de 50+ camiões prevista. Armazéns em Lomé e Cotonou. Certificação OEA aduaneiro.', ca:'84 000 000 FCFA (Ano 3)', synergy:'Prestador logístico exclusivo das 5 outras filiais' },
    immobilier: { emoji:'🏢', title:'BUAME Imobiliário', desc:'Promoção imobiliária residencial e comercial. Gestão locativa e venda de escritórios.', details:'200+ unidades residenciais em desenvolvimento. Projetos comerciais em Lomé e Abidjan.', ca:'300 000 000 FCFA (Ano 3)', synergy:'BUAME CONSTRUÇÃO realiza todos os projetos' },
    agro: { emoji:'🌿', title:'BUAME Agro', desc:'Transformação agroalimentar, exportação de cacau, caju e karité. Certificações GlobalG.A.P.', details:'3 unidades de transformação previstas. Exportação para Europa e Ásia. Certificado Fair Trade.', ca:'180 000 000 FCFA (Ano 3)', synergy:'BUAME COMÉRCIO assegura a comercialização internacional' },
    medias: { emoji:'📡', title:'BUAME Mídia', desc:'Web TV africana, podcast empresarial, imprensa digital e agência publicitária pan-africana.', details:'Estúdio em Lomé. Cobertura 4 países. Audiência alvo: 5M+ profissionais africanos.', ca:'180 000 000 FCFA (Ano 3)', synergy:'Porta-voz e promotor de todas as filiais do grupo' }
  }
};

function openFiliale(key) {
  const langData = FILIALE_DATA[currentLang] || FILIALE_DATA['fr'];
  const d = langData[key] || FILIALE_DATA['fr'][key];
  if (!d) return;
  const t = I18N[currentLang] || I18N['fr'];
  const learnMore = currentLang==='en' ? 'Learn more →' : currentLang==='pt' ? 'Saiba mais →' : 'En savoir plus →';
  const caLabel   = currentLang==='en' ? 'Target Revenue Year 3' : currentLang==='pt' ? 'CA Meta Ano 3' : 'CA cible An 3';
  const synLabel  = currentLang==='en' ? 'Group Synergies' : currentLang==='pt' ? 'Sinergias do grupo' : 'Synergies groupe';
  const mc = document.getElementById('modalContent');
  if (!mc) return;
  mc.innerHTML = `
    <div style="font-size:48px;margin-bottom:12px">${d.emoji}</div>
    <div style="font-family:'Syne',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:8px">Filiale BUAME GROUP</div>
    <h2 style="font-family:'Cormorant Garamond',serif;font-size:32px;color:var(--white);margin-bottom:20px">${d.title}</h2>
    <p style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.7;margin-bottom:20px">${d.desc}</p>
    <div style="display:grid;gap:12px">
      <div style="padding:14px;background:rgba(200,168,75,0.05);border-left:3px solid var(--gold);border-radius:2px">
        <div style="font-family:'Syne',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:6px">${caLabel}</div>
        <div style="font-size:14px;color:rgba(255,255,255,0.8)">${d.ca}</div>
      </div>
      <div style="padding:14px;background:rgba(200,168,75,0.05);border-left:3px solid var(--gold);border-radius:2px">
        <div style="font-family:'Syne',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:6px">${synLabel}</div>
        <div style="font-size:14px;color:rgba(255,255,255,0.8)">${d.synergy}</div>
      </div>
      <div style="padding:14px;background:rgba(200,168,75,0.03);border-left:2px solid rgba(200,168,75,0.3);border-radius:2px">
        <div style="font-size:13px;color:rgba(255,255,255,0.55);line-height:1.7">${d.details}</div>
      </div>
    </div>
    <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
      <a href="filiales.html" class="btn btn-primary" style="font-size:12px">${learnMore}</a>
      <a href="contact.html" onclick="closeModal()" class="btn btn-outline" style="font-size:12px;color:var(--gold)">${t['nav.contact']||'Contact'}</a>
    </div>`;
  document.getElementById('filialeModal')?.classList.add('open', 'active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('filialeModal')?.classList.remove('open', 'active');
  document.body.style.overflow = '';
}

// ════════════════════════════════════════════════════════════════
// OFFRES D'EMPLOI
// ════════════════════════════════════════════════════════════════
const jobs = [
  /*{ id:1,  title:'Directeur Général Adjoint — Finance (CFO)', titleEn:'Deputy CEO — Finance (CFO)',            titlePt:'CEO Adjunto — Finanças (CFO)',            filiale:'holding',     location:'Lomé, Togo',    type:'CDI', level:'C-Level',         salary:'1 000 000 – 1 500 000 FCFA/mois', badge:'HOLDING',     bc:'#C8A84B' },
  { id:2,  title:'Directeur Technique BTP',                   titleEn:'Technical Director BTP',               titlePt:'Diretor Técnico BTP',                    filiale:'construction',location:'Lomé, Togo',    type:'CDI', level:'Cadre Supérieur', salary:'600 000 – 900 000 FCFA/mois',     badge:'CONSTRUCTION',bc:'#4A90C4' },
  { id:3,  title:'Chef de Projet Senior — Génie Civil',       titleEn:'Senior PM — Civil Engineering',        titlePt:'Gerente de Projetos — Eng. Civil',       filiale:'construction',location:'Cotonou, Bénin', type:'CDI', level:'Cadre',           salary:'450 000 – 700 000 FCFA/mois',     badge:'CONSTRUCTION',bc:'#4A90C4' },
  { id:4,  title:'Responsable Supply Chain & Logistique',     titleEn:'Supply Chain & Logistics Manager',     titlePt:'Gerente de Supply Chain',                filiale:'logistics',   location:'Abidjan, CI',   type:'CDI', level:'Cadre',           salary:'500 000 – 750 000 FCFA/mois',     badge:'LOGISTICS',   bc:'#3F8C5A' },
  { id:5,  title:'Directeur Commercial — Trade International',titleEn:'Commercial Director — Intl. Trade',    titlePt:'Diretor Comercial — Comércio Internacional',filiale:'trade',    location:'Accra, Ghana',  type:'CDI', level:'Cadre Supérieur', salary:'700 000 – 1 000 000 FCFA/mois',   badge:'TRADE',       bc:'#E8A020' },
  { id:6,  title:'Responsable Promotion Immobilière',         titleEn:'Real Estate Development Manager',      titlePt:'Gerente de Promoção Imobiliária',         filiale:'immobilier',  location:'Lomé, Togo',    type:'CDI', level:'Cadre',           salary:'500 000 – 750 000 FCFA/mois',     badge:'IMMOBILIER',  bc:'#C8A84B' },
  { id:7,  title:'Agronome — Responsable Export Agro',        titleEn:'Agronomist — Agro Export Manager',     titlePt:'Agrônomo — Gerente de Exportação',       filiale:'agro',        location:'Bénin / Togo',  type:'CDI', level:'Cadre',           salary:'400 000 – 650 000 FCFA/mois',     badge:'AGRO',        bc:'#7B5EA7' },
  { id:8,  title:'Directeur Artistique & Contenus Digitaux',  titleEn:'Creative Director & Digital Content',  titlePt:'Diretor de Arte & Conteúdo Digital',     filiale:'medias',      location:'Lomé, Togo',    type:'CDI', level:'Cadre',           salary:'400 000 – 600 000 FCFA/mois',     badge:'MÉDIAS',      bc:'#DC3C3C' },
  { id:9,  title:'Responsable Juridique Groupe',              titleEn:'Group Legal Counsel',                  titlePt:'Assessor Jurídico do Grupo',             filiale:'holding',     location:'Lomé, Togo',    type:'CDI', level:'Cadre Supérieur', salary:'600 000 – 900 000 FCFA/mois',     badge:'HOLDING',     bc:'#C8A84B' },*/
  { id:10, title:'Community Manager & Digital Marketing',     titleEn:'Community Manager & Digital Marketing', titlePt:'Community Manager & Marketing Digital',  filiale:'medias',      location:'Lomé / Remote', type:'CDI', level:'Agent Maîtrise',  salary:'- FCFA/mois',     badge:'MÉDIAS',      bc:'#DC3C3C' },
];

let jobFilter = 'all';

function renderJobs() {
  const grid = document.getElementById('jobsGrid');
  if (!grid) return;
  const filtered = jobFilter==='all' ? jobs : jobs.filter(j=>j.filiale===jobFilter);
  const tKey = currentLang==='en' ? 'titleEn' : currentLang==='pt' ? 'titlePt' : 'title';
  const applyTxt = getTranslation('recru.apply') || 'Postuler';
  if (!filtered.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:rgba(255,255,255,0.3);font-family:\'Syne\',sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase">Aucun poste disponible</div>';
    return;
  }
  grid.innerHTML = filtered.map(j=>`
    <div class="job-card reveal" data-filiale="${j.filiale}">
      <div class="job-left">
        <div class="job-badge" style="background:${j.bc}22;color:${j.bc};border:1px solid ${j.bc}44">${j.badge}</div>
        <div class="job-title">${j[tKey]}</div>
        <div class="job-details">
          <span class="job-detail">${j.location}</span>
          <span class="job-detail">${j.type}</span>
          <span class="job-detail">${j.level}</span>
          <span class="job-detail">${j.salary}</span>
        </div>
      </div>
      <a href="recrutement.html#rh-form" class="job-apply" onclick="prefillJob(decodeURIComponent('${encodeURIComponent(j[tKey])}'))">${applyTxt} →</a>
    </div>`).join('');
  grid.querySelectorAll('.reveal').forEach(el=>revealObs.observe(el));
}

function filterJobs(f, btn) {
  jobFilter = f;
  document.querySelectorAll('.recru-filter .filter-btn').forEach(b=>b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderJobs();
}

function prefillJob(title) {
  setTimeout(() => {
    const m = document.getElementById('rh-msg');
    if (m) m.placeholder = (getTranslation('form.rh.msg')||'Lettre de motivation') + ' : ' + title;
    const s = document.getElementById('rh-poste');
    if (s) {
      const kw = title.toLowerCase().split(/[\s—\-]/)[0];
      const match = Array.from(s.options).find(o=>o.value&&o.value.toLowerCase().includes(kw));
      if (match) s.value = match.value;
    }
  }, 400);
}

// ── BLOG FILTER ──────────────────────────────────────────────────
function filterBlog(cat, btn) {
  document.querySelectorAll('.blog .filter-btn').forEach(b=>b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.blog-card').forEach(c=>{
    c.style.display = (cat==='all'||c.dataset.cat===cat) ? '' : 'none';
  });
}

// ── FORMULAIRES ──────────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const msg = currentLang==='en' ? '✓ Message sent — Reply within 48h'
            : currentLang==='pt' ? '✓ Mensagem enviada — Resposta em 48h'
            : '✓ Message envoyé — Réponse sous 48h';
  showToast(msg); e.target.reset();
}

function handleRhSubmit(e) {
  e.preventDefault();
  if (!document.getElementById('rh-nom')?.value||!document.getElementById('rh-email')?.value||!document.getElementById('rh-poste')?.value) {
    showToast(currentLang==='en'?'⚠️ Please fill in all required fields':currentLang==='pt'?'⚠️ Por favor preencha todos os campos obrigatórios':'⚠️ Veuillez remplir tous les champs obligatoires');
    return;
  }
  const msg = currentLang==='en' ? '✓ Application sent — Reply within 72h'
            : currentLang==='pt' ? '✓ Candidatura enviada — Resposta em 72h'
            : '✓ Candidature envoyée — Réponse sous 72h';
  showToast(msg); e.target.reset();
}

function subscribeNewsletter() {
  document.querySelectorAll('#newsletterEmail').forEach(inp=>{
    if (!inp.value||!inp.value.includes('@')) {
      showToast(currentLang==='en'?'Please enter a valid email':currentLang==='pt'?'Por favor insira um email válido':'Veuillez entrer un email valide');
      return;
    }
    showToast(currentLang==='en'?'✓ Subscribed!':currentLang==='pt'?'✓ Inscrito!':'✓ Inscription confirmée !');
    inp.value='';
  });
}

// ── TOAST ────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast'); if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  t.style.transform = 'translateY(0)'; t.style.opacity = '1';
  setTimeout(()=>{ t.classList.remove('show'); t.style.transform='translateY(120px)'; t.style.opacity='0'; }, 3500);
}

// ── SMOOTH SCROLL ────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if (href==='#') return;
    const target = document.querySelector(href);
    if (target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});

// ════════════════════════════════════════════════════════════════
// INITIALISATION
// ════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', ()=>{
  applyTranslations();
  updateLangButtons();
  renderJobs();

  // Fermer modal
  document.getElementById('filialeModal')?.addEventListener('click', e=>{
    if (e.target===e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });
});