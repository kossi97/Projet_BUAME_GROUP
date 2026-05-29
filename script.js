// ══════════════════════════════════════════════
// BUAME GROUP — script.js
// Cursor · Nav · Reveal · i18n complet · Jobs
// Filiale Modal · Forms · Toast
// ══════════════════════════════════════════════

// ── CURSOR ──────────────────────────────────
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
if (cursor && cursorRing) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    setTimeout(() => {
      cursorRing.style.left = e.clientX + 'px';
      cursorRing.style.top  = e.clientY + 'px';
    }, 80);
  });
}

// ── NAV SCROLL ──────────────────────────────
const mainNav = document.getElementById('mainNav');
if (mainNav) {
  window.addEventListener('scroll', () => {
    mainNav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// ── MOBILE MENU ─────────────────────────────
const mobileMenuEl = document.getElementById('mobileMenu');
function toggleMobileMenu() {
  if (!mobileMenuEl) return;
  const isOpen = mobileMenuEl.classList.toggle('open');
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    const s = hamburger.querySelectorAll('span');
    s[0].style.transform = isOpen ? 'translateY(7.5px) rotate(45deg)'  : '';
    s[1].style.opacity   = isOpen ? '0' : '1';
    s[2].style.transform = isOpen ? 'translateY(-7.5px) rotate(-45deg)' : '';
  }
}
function closeMobileMenu() {
  if (!mobileMenuEl) return;
  mobileMenuEl.classList.remove('open');
  const hamburger = document.getElementById('hamburger');
  if (hamburger) hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
}

// ── REVEAL (Intersection Observer) ──────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    entry.target.querySelectorAll('[data-count]').forEach(c => {
      if (!c.classList.contains('counted')) { c.classList.add('counted'); animateCount(c, +c.dataset.count); }
    });
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach(el => revealObserver.observe(el));

function animateCount(el, target) {
  let n = 0;
  const step = target / (2000 / 16);
  const t = setInterval(() => {
    n += step;
    if (n >= target) { n = target; clearInterval(t); }
    el.textContent = Math.floor(n);
  }, 16);
}

// Hero stats counter
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

// ── PARALLAX ────────────────────────────────
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const heroBg = document.querySelector('.hero-bg-img');
  if (heroBg && y < window.innerHeight) heroBg.style.transform = `scale(1.1) translateY(${y * 0.25}px)`;
  const phBg = document.querySelector('.page-header-bg');
  if (phBg && y < window.innerHeight * 0.8) phBg.style.transform = `scale(1.1) translateY(${y * 0.18}px)`;
}, { passive: true });

// ══════════════════════════════════════════════
// ── I18N — TRADUCTIONS COMPLÈTES ─────────────
// ══════════════════════════════════════════════
const translations = {

  /* ╔══════════════════ FRANÇAIS ══════════════════╗ */
  fr: {
    // Navigation
    'nav.home'       : 'Accueil',
    'nav.group'      : 'Groupe',
    'nav.filiales'   : 'Filiales',
    'nav.governance' : 'Gouvernance',
    'nav.direction'  : 'Direction',
    'nav.news'       : 'Actualités',
    'nav.blog'       : 'Blog',
    'nav.careers'    : 'Carrières',
    'nav.contact'    : 'Contact',

    // Hero
    'hero.eyebrow'     : 'Conglomérat Panafricain — Lomé, Togo',
    'hero.title.line1' : "L'Afrique",
    'hero.title.line2' : 'par les Africains',
    'hero.subtitle'    : 'Bâtir, Commercer, Transporter, Habiter, Nourrir, Informer',
    'hero.desc'        : "BUAME GROUP est un conglomérat SAS panafricain opérant dans 6 secteurs stratégiques à travers 4 pays d'Afrique de l'Ouest. Notre vision : devenir l'un des 10 premiers groupes africains à l'horizon 2045.",
    'hero.cta1'        : 'Découvrir nos filiales',
    'hero.cta2'        : 'Notre vision',

    // Stats
    'stats.filiales'  : 'Filiales Actives',
    'stats.countries' : "Pays d'Opération",
    'stats.vision'    : 'Vision CA 2045 (FCFA)',
    'stats.years'     : 'Ans de Vision',

    // About (index + groupe)
    'about.eyebrow'      : 'Le Groupe',
    'about.title'        : 'Un empire africain <em>en construction</em>',
    'about.subtitle'     : "Fondé à Lomé avec une vision panafricaine, BUAME GROUP réunit six forces complémentaires pour transformer l'Afrique de l'Ouest.",
    'about.card.legal'   : 'Forme Juridique Holding',
    'about.card.capital' : 'Capital Social FCFA',
    'about.card.jobs'    : 'Emplois prévus An 3',
    'about.card.horizon' : 'Horizon Vision Groupe',
    'about.quote'        : '"L\'Afrique a besoin d\'acteurs africains qui pensent grand, agissent vite et construisent pour durer. BUAME GROUP est cette réponse."',
    'about.cite'         : '— Direction Générale, BUAME GROUP SAS',
    'about.p1'           : "BUAME GROUP est une holding panafricaine constituée sous forme de Société par Actions Simplifiée (SAS) de droit togolais, dont le siège est établi à Lomé. Le groupe opère à travers 6 filiales SASU au Togo et des SARL dans les pays d'expansion, conformément au droit OHADA.",
    'about.p2'           : "Notre modèle est unique : chaque filiale est à la fois cliente et fournisseur des autres, créant un écosystème intégré réduisant les coûts de 15 à 20% et construisant un avantage concurrentiel inimitable sur le marché ouest-africain.",
    'about.p3'           : "Avec la Stratégie Diamant Bleu™, nous avons dessiné une roadmap claire sur 20 ans : ancrage local, synergies inter-filiales, certifications ISO, expansion géographique, impact RSE et digitalisation complète de nos opérations.",
    'about.mission'      : "Créer de la valeur durable en Afrique de l'Ouest par l'excellence opérationnelle et l'ancrage local.",
    'about.vision_text'  : "Top 10 des groupes africains d'ici 2045, coté en bourse, 100 milliards FCFA de CA.",
    'about.cta'          : 'En savoir plus sur le groupe →',

    // Filiales (index)
    'filiales.eyebrow' : 'Nos Filiales',
    'filiales.title'   : 'Six forces, <em>un seul empire</em>',
    'filiales.subtitle': "Des secteurs stratégiques soigneusement sélectionnés pour leur complémentarité et leur potentiel de croissance en Afrique de l'Ouest.",
    'filiales.cta'     : 'Voir toutes les filiales →',
    'filiale.construction.name': 'CONSTRUCTION',
    'filiale.construction.desc': "BTP, génie civil, infrastructures routières et bâtiments. Location d'équipements BTP. Marchés publics et privés.",
    'filiale.trade.name'       : 'TRADE',
    'filiale.trade.desc'       : "Import-export, distribution B2B, commerce général. Fournisseur exclusif des 5 autres filiales.",
    'filiale.logistics.name'   : 'LOGISTICS',
    'filiale.logistics.desc'   : "Transport routier régional, transit douanier, entreposage. Prestataire logistique exclusif du groupe.",
    'filiale.immobilier.name'  : 'IMMOBILIER',
    'filiale.immobilier.desc'  : "Promotion immobilière résidentielle et commerciale. Gestion locative et vente de bureaux.",
    'filiale.agro.name'        : 'AGRO',
    'filiale.agro.desc'        : "Transformation agro-alimentaire, exportation cacao, anacarde et karité. Certifications GlobalG.A.P.",
    'filiale.medias.name'      : 'MÉDIAS',
    'filiale.medias.desc'      : "Web TV africaine, podcast business, presse digitale et régie publicitaire panafricaine.",
    'tag.marches'  : 'Marchés publics',
    'tag.transport': 'Transport',
    'tag.storage'  : 'Entreposage',
    'tag.promotion': 'Promotion',
    'tag.locative' : 'Gestion locative',
    'tag.bureaux'  : 'Bureaux',
    'tag.cacao'    : 'Export Cacao',
    'tag.regie'    : 'Régie Pub',

    // Stratégie
    'strat.eyebrow'  : 'Stratégie',
    'strat.title'    : 'Stratégie Diamant Bleu<em>™</em>',
    'strat.subtitle' : 'Une roadmap sur 20 ans articulée autour de 6 piliers stratégiques pour faire de BUAME GROUP un acteur de référence en Afrique.',
    'strat.p1.title' : 'Ancrage Local',
    'strat.p1.desc'  : 'Implantation profonde dans chaque marché. Ressources humaines locales, partenaires locaux, conformité réglementaire totale.',
    'strat.p2.title' : 'Synergies Inter-Filiales',
    'strat.p2.desc'  : 'Écosystème intégré où chaque filiale alimente les autres. Réduction des coûts de 15–20%, avantage concurrentiel structurel.',
    'strat.p3.title' : 'Certifications ISO',
    'strat.p3.desc'  : 'ISO 9001, ISO 14001, GlobalG.A.P., OEA douanier. Standards internationaux pour accéder aux marchés mondiaux.',
    'strat.p4.title' : 'Expansion Géographique',
    'strat.p4.desc'  : "4 pays aujourd'hui → 15 pays à l'horizon 2040. Prochaine vague : Nigeria, Sénégal, Cameroun, Burkina, Mali.",
    'strat.p5.title' : 'Impact RSE',
    'strat.p5.desc'  : "Emplois locaux, formation professionnelle, agriculture durable, réduction empreinte carbone. Reporting ESG annuel.",
    'strat.p6.title' : 'Digitalisation',
    'strat.p6.desc'  : "ERP groupe, CRM filiales, e-commerce agro, plateformes digitales médias. Transformation numérique totale d'ici 2030.",
    'strat.cta'      : 'Lire notre vision complète →',

    // Pays
    'pays.eyebrow'       : 'Présence Géographique',
    'pays.title'         : '4 pays, <em>une vision</em>',
    'pays.subtitle'      : "Un ancrage stratégique dans les économies les plus dynamiques d'Afrique de l'Ouest, avec une expansion planifiée vers 15 pays d'ici 2040.",
    'pays.togo.role'     : 'Siège Groupe — HQ',
    'pays.togo.detail'   : 'BUAME GROUP SAS<br>6 filiales SASU<br>Lomé — Port en Eaux Profondes',
    'pays.togo.badge'    : 'Siège Social',
    'pays.benin.role'    : "Premier Pays d'Expansion",
    'pays.benin.detail'  : "6 filiales SARL<br>Cotonou — Port autonome<br>ZLECAF — Zone franche",
    'pays.benin.badge'   : 'Opérationnel An 1',
    'pays.ci.role'       : 'Hub Économique Régional',
    'pays.ci.detail'     : "6 filiales SARL<br>Abidjan — 1ère économie UEMOA<br>Centre d'Excellence",
    'pays.ghana.role'    : 'Porte Anglophone',
    'pays.ghana.detail'  : "6 filiales Ltd<br>Accra — 2ème économie Golfe de Guinée<br>Accès marchés anglophones",
    'pays.badge.an23'    : 'An 2–3',
    'pays.next'          : 'PROCHAINE VAGUE :',

    // CTA final
    'cta.eyebrow'  : "Rejoignez l'aventure",
    'cta.title'    : 'Partenaires, Investisseurs, <em>Talents</em>',
    'cta.subtitle' : "Que vous souhaitiez investir, vous associer ou rejoindre notre équipe, BUAME GROUP vous attend.",
    'cta.btn1'     : 'Nous contacter →',
    'cta.btn2'     : "Voir les offres d'emploi →",

    // Page headers
    'page.group.eyebrow'    : 'Le Groupe',
    'page.group.title'      : 'Un empire africain <em>en construction</em>',
    'page.gov.eyebrow'      : 'Gouvernance',
    'page.gov.title'        : 'Une gouvernance <em>de référence</em>',
    'page.dir.eyebrow'      : 'Direction Exécutive',
    'page.dir.title'        : 'Les femmes et hommes <em>qui bâtissent</em>',
    'page.fil.eyebrow'      : 'Nos Filiales',
    'page.fil.title'        : 'Six forces, <em>un seul empire</em>',
    'page.news.eyebrow'     : 'Actualités',
    'page.news.title'       : 'Dernières <em>nouvelles du groupe</em>',
    'page.blog.eyebrow'     : 'Blog Expert',
    'page.blog.title'       : 'Insights <em>Afrique Business</em>',
    'page.careers.eyebrow'  : 'Carrières',
    'page.careers.title'    : "Rejoignez <em>l'empire</em>",
    'page.contact.eyebrow'  : 'Nous Contacter',
    'page.contact.title'    : 'Parlons <em>business</em>',

    // Page subtitles
    'page.group.sub'   : "Fondé à Lomé avec une vision panafricaine, BUAME GROUP réunit six forces complémentaires pour transformer l'Afrique de l'Ouest.",
    'page.gov.sub'     : "BUAME GROUP applique les standards de gouvernance des grands groupes internationaux, conformément au droit OHADA et aux meilleures pratiques africaines.",
    'page.dir.sub'     : "L'équipe dirigeante du BUAME GROUP réunit des profils d'excellence formés en Afrique et à l'international, engagés pour le développement du continent.",
    'page.fil.sub'     : "Des secteurs stratégiques soigneusement sélectionnés pour leur complémentarité et leur potentiel de croissance en Afrique de l'Ouest.",
    'page.news.sub'    : "Suivez l'actualité officielle du BUAME GROUP : inaugurations, partenariats, nominations, contrats et événements marquants.",
    'page.blog.sub'    : "Analyses, tendances et décryptages de l'économie ouest-africaine par les experts du BUAME GROUP.",
    'page.careers.sub' : "BUAME GROUP recrute des talents ambitieux qui veulent construire l'Afrique de demain. Nous offrons des opportunités uniques dans des environnements dynamiques, multi-pays et multi-secteurs.",
    'page.contact.sub' : "Partenariats, investissements, marchés publics, projets communs ou candidatures — notre équipe est à votre disposition.",

    // Breadcrumbs
    'breadcrumb.home'    : 'Accueil',
    'breadcrumb.group'   : 'Groupe',
    'breadcrumb.gov'     : 'Gouvernance',
    'breadcrumb.dir'     : 'Direction',
    'breadcrumb.fil'     : 'Filiales',
    'breadcrumb.news'    : 'Actualités',
    'breadcrumb.blog'    : 'Blog',
    'breadcrumb.careers' : 'Carrières',
    'breadcrumb.contact' : 'Contact',

    // Gouvernance
    'gov.section.eyebrow' : 'Gouvernance',
    'gov.section.title'   : 'Une gouvernance <em>de référence</em>',
    'gov.ag.title'        : 'Assemblée Générale',
    'gov.ag.desc'         : 'Organe souverain de la SAS BUAME GROUP. Décisions ordinaires et extraordinaires. Réunion annuelle obligatoire dans les 6 mois de clôture.',
    'gov.ca.title'        : "Conseil d'Administration",
    'gov.ca.desc'         : "Président + 4 Administrateurs indépendants minimum. Réunions trimestrielles avec PV formalisés. Comités spécialisés dédiés.",
    'gov.dg.title'        : 'Direction Générale',
    'gov.dg.desc'         : 'CEO + 3 DG Adjoints (Finance, Opérations, Stratégie). Représentation légale, exécution de la stratégie groupe, supervision des 6 filiales.',
    'gov.rse.eyebrow'     : 'RSE & Développement Durable',
    'gov.rse.title'       : "L'entreprise <em>responsable</em>",

    // Direction
    'dir.leaders.eyebrow' : "Culture d'Entreprise",
    'dir.leaders.title'   : 'BUAME LEADERS<em>™</em>',
    'dir.leaders.sub'     : "Notre programme d'accélération pour les hauts potentiels. Former les leaders de demain pour l'Afrique.",
    'dir.leaders.cta'     : "Rejoindre l'équipe →",

    // Actualités
    'news.archives.eyebrow'  : 'Archives',
    'news.archives.title'    : 'Toutes nos <em>publications</em>',
    'news.press.title'       : 'Contact Presse & Médias',
    'news.press.btn1'        : 'Écrire à la presse →',
    'news.press.btn2'        : 'Télécharger le dossier de presse',
    'news.agenda.title'      : '📅 Agenda BUAME GROUP 2025–2026',
    'news.badge.official'    : 'COMMUNIQUÉ OFFICIEL',

    // Blog
    'blog.all'           : 'Tous',
    'blog.all_articles'  : 'Tous les articles →',
    'blog.read'          : 'Lire →',
    'blog.recent.eyebrow': 'Articles Récents',
    'blog.recent.title'  : "Plus d'<em>insights</em>",
    'blog.newsletter.title': 'Recevez nos analyses chaque semaine',
    'blog.newsletter.desc' : "Inscrivez-vous à la newsletter BUAME GROUP pour ne rater aucun insight sur l'économie ouest-africaine.",
    'blog.newsletter.cta'  : "S'inscrire →",
    'blog.post1.title'   : "ZLECAF 2025 : Comment les groupes africains peuvent saisir l'opportunité du marché unifié",
    'blog.post2.title'   : "Marchés publics en Afrique de l'Ouest : guide pour répondre aux appels d'offres BOAD & BAD",
    'blog.post3.title'   : "Exportation de cacao vers l'Europe : certifications et stratégies de valorisation premium",
    'blog.post4.title'   : "Financement d'une holding OHADA : capital, crédit bancaire et partenaires institutionnels",

    // Recrutement
    'recru.eyebrow'       : 'Carrières',
    'recru.why.eyebrow'   : 'Pourquoi nous rejoindre ?',
    'recru.why.title'     : "Construisez <em>l'Afrique de demain</em>",
    'recru.why.subtitle'  : "BUAME GROUP offre un environnement de travail stimulant où chaque talent peut s'épanouir et contribuer à la transformation du continent.",
    'recru.perk1.title'   : 'Formation Continue',
    'recru.perk1.desc'    : '20h de formation par an, financées à 100% par le groupe',
    'recru.perk2.title'   : 'Mobilité Internationale',
    'recru.perk2.desc'    : 'Passerelles entre 4 pays et 6 filiales encouragées',
    'recru.perk3.title'   : 'Couverture Santé',
    'recru.perk3.desc'    : 'Assurance santé famille pour tous les CDI du groupe',
    'recru.perk4.title'   : 'BUAME LEADERS™',
    'recru.perk4.desc'    : "Programme d'accélération pour les hauts potentiels",
    'recru.jobs.eyebrow'  : 'Postes ouverts',
    'recru.jobs.title'    : 'Nos <em>opportunités</em>',
    'recru.jobs.sub'      : "Rejoignez une équipe d'excellence et contribuez à bâtir l'empire panafricain.",
    'recru.all'           : 'Tous les postes',
    'recru.apply'         : 'Postuler',
    'recru.rh.title'      : 'Direction Ressources Humaines',
    'recru.rh.sub'        : 'rh@buamegroup.com — Réponse sous 72h',
    'recru.bottom.label'  : 'Contact direct — Ressources Humaines',
    'recru.bottom.sub'    : 'Direction RH BUAME GROUP — Lomé, Togo · Lun–Ven 8h–18h GMT',
    'recru.bottom.btn1'   : 'Écrire à la DRH →',
    'recru.bottom.btn2'   : 'Télécharger la Charte RH',

    // Contact
    'contact.eyebrow'      : 'Nous Contacter',
    'contact.title'        : 'Parlons <em>business</em>',
    'contact.subtitle'     : "Partenariats, investissements, marchés publics, projets communs ou candidatures — notre équipe est à votre disposition.",
    'contact.hq'           : 'Siège Social',
    'contact.email_label'  : 'Email',
    'contact.phone'        : 'Téléphone',
    'contact.legal_label'  : 'Structure Juridique',
    'contact.form_badge'   : 'Formulaire sécurisé — Réponse sous 48h',
    'contact.map.eyebrow'  : 'Carte & Accès',
    'contact.map.title'    : 'Nous trouver <em>à Lomé</em>',
    'contact.map.sub'      : "Notre siège social est situé dans la zone d'Adidogomé, au cœur de la capitale économique du Togo.",
    'contact.map.btn'      : 'Ouvrir dans Google Maps →',

    // Formulaire
    'form.name'    : 'Nom complet *',
    'form.email'   : 'Email *',
    'form.org'     : 'Organisation',
    'form.country' : 'Pays *',
    'form.subject' : 'Objet de la demande *',
    'form.message' : 'Message *',
    'form.rgpd'    : "J'accepte que mes données soient utilisées pour traiter ma demande.",
    'form.submit'  : 'Envoyer le message ◆',
    'form.rh.name'    : 'Nom complet *',
    'form.rh.email'   : 'Email professionnel *',
    'form.rh.poste'   : 'Poste visé *',
    'form.rh.pays'    : 'Pays souhaité',
    'form.rh.msg'     : 'Lettre de motivation *',
    'form.rh.rgpd'    : "En soumettant ce formulaire, j'autorise BUAME GROUP à traiter mes données personnelles dans le cadre de ce recrutement (conservation 24 mois).",
    'form.rh.submit'  : 'Envoyer à la DRH — rh@buamegroup.com ◆',

    // Footer
    'footer.tagline'        : '"L\'Afrique par les Africains — construire, commercer, habiter, nourrir, transporter, informer."',
    'footer.desc'           : 'Conglomérat panafricain SAS basé à Lomé, Togo. 6 filiales, 4 pays, une vision. OHADA — Droit togolais.',
    'footer.col.filiales'   : 'Filiales',
    'footer.col.groupe'     : 'Groupe',
    'footer.col.legal'      : 'Mentions Légales',
    'footer.link.about'     : 'À propos',
    'footer.link.gov'       : 'Gouvernance',
    'footer.link.dir'       : 'Direction Exécutive',
    'footer.link.news'      : 'Actualités',
    'footer.link.strat'     : 'Stratégie Diamant',
    'footer.link.blog'      : 'Blog Expert',
    'footer.link.careers'   : 'Carrières',
    'footer.link.mentions'  : 'Mentions légales',
    'footer.link.privacy'   : 'Politique de confidentialité',
    'footer.link.cookies'   : 'Cookies',
    'footer.link.cgv'       : 'CGV / CGU',
    'footer.link.ohada'     : 'Droit OHADA',
    'footer.newsletter'             : 'Newsletter',
    'footer.newsletter.placeholder' : 'Email',
    'footer.copyright' : '© 2025 BUAME GROUP SAS — Lomé, Togo. Tous droits réservés.',
    'footer.legal2'    : 'Droit OHADA — RCCM Togo — <a href="#">ISO en cours</a>',
  },

  /* ╔══════════════════ ENGLISH ══════════════════╗ */
  en: {
    'nav.home':'Home','nav.group':'Group','nav.filiales':'Subsidiaries','nav.governance':'Governance',
    'nav.direction':'Leadership','nav.news':'News','nav.blog':'Blog','nav.careers':'Careers','nav.contact':'Contact',
    'hero.eyebrow':'Pan-African Conglomerate — Lomé, Togo',
    'hero.title.line1':"Africa",'hero.title.line2':'by Africans',
    'hero.subtitle':'Build, Trade, Transport, House, Feed, Inform',
    'hero.desc':"BUAME GROUP is a pan-African SAS conglomerate operating across 6 strategic sectors in 4 West African countries. Our vision: to become one of Africa's top 10 groups by 2045.",
    'hero.cta1':'Discover our subsidiaries','hero.cta2':'Our vision',
    'stats.filiales':'Active Subsidiaries','stats.countries':'Operating Countries','stats.vision':'Revenue Vision 2045 (FCFA)','stats.years':'Year Vision',
    'about.eyebrow':'The Group',
    'about.title':'An African empire <em>under construction</em>',
    'about.subtitle':'Founded in Lomé with a pan-African vision, BUAME GROUP brings together six complementary forces to transform West Africa.',
    'about.card.legal':'Holding Legal Form','about.card.capital':'Share Capital FCFA','about.card.jobs':'Jobs planned Year 3','about.card.horizon':'Vision Horizon',
    'about.quote':'"Africa needs African players who think big, act fast and build to last. BUAME GROUP is that answer."',
    'about.cite':'— General Management, BUAME GROUP SAS',
    'about.p1':"BUAME GROUP is a pan-African holding incorporated as a Simplified Joint Stock Company (SAS) under Togolese law, headquartered in Lomé. The group operates through 6 SASU subsidiaries in Togo and SARLs in expansion countries, in accordance with OHADA law.",
    'about.p2':"Our model is unique: each subsidiary is both client and supplier to the others, creating an integrated ecosystem that reduces costs by 15 to 20% and builds an unbeatable competitive advantage in the West African market.",
    'about.p3':"With the Blue Diamond Strategy™, we have mapped a clear 20-year roadmap: local anchoring, inter-subsidiary synergies, ISO certifications, geographic expansion, CSR impact and full digitalization of our operations.",
    'about.mission':'Creating lasting value in West Africa through operational excellence and local anchoring.',
    'about.vision_text':"Top 10 African groups by 2045, listed on the stock exchange, 100 billion FCFA in revenue.",
    'about.cta':'Learn more about the group →',
    'filiales.eyebrow':'Our Subsidiaries',
    'filiales.title':'Six forces, <em>one empire</em>',
    'filiales.subtitle':'Strategically selected sectors for their complementarity and growth potential in West Africa.',
    'filiales.cta':'View all subsidiaries →',
    'filiale.construction.name':'CONSTRUCTION','filiale.construction.desc':"Civil engineering, road infrastructure and buildings. Equipment rental. Public and private contracts.",
    'filiale.trade.name':'TRADE','filiale.trade.desc':"Import-export, B2B distribution, general trade. Exclusive supplier for the group's 5 other subsidiaries.",
    'filiale.logistics.name':'LOGISTICS','filiale.logistics.desc':"Regional road transport, customs transit, warehousing. Exclusive logistics provider for the group.",
    'filiale.immobilier.name':'REAL ESTATE','filiale.immobilier.desc':"Residential and commercial real estate development. Rental management and office sales.",
    'filiale.agro.name':'AGRO','filiale.agro.desc':"Agro-food processing, cocoa, cashew and shea butter exports. GlobalG.A.P. certifications.",
    'filiale.medias.name':'MEDIA','filiale.medias.desc':"African web TV, business podcast, digital press and pan-African advertising agency.",
    'tag.marches':'Public contracts','tag.transport':'Transport','tag.storage':'Warehousing',
    'tag.promotion':'Development','tag.locative':'Rental mgmt','tag.bureaux':'Offices',
    'tag.cacao':'Cocoa Export','tag.regie':'Ad Agency',
    'strat.eyebrow':'Strategy','strat.title':'Blue Diamond Strategy<em>™</em>',
    'strat.subtitle':'A 20-year roadmap built around 6 strategic pillars to make BUAME GROUP a reference player in Africa.',
    'strat.p1.title':'Local Anchoring','strat.p1.desc':'Deep presence in each market. Local human resources, local partners, full regulatory compliance.',
    'strat.p2.title':'Inter-subsidiary Synergies','strat.p2.desc':'Integrated ecosystem where each subsidiary feeds the others. 15–20% cost reduction, structural competitive advantage.',
    'strat.p3.title':'ISO Certifications','strat.p3.desc':'ISO 9001, ISO 14001, GlobalG.A.P., Customs AEO. International standards to access global markets.',
    'strat.p4.title':'Geographic Expansion','strat.p4.desc':'4 countries today → 15 countries by 2040. Next wave: Nigeria, Senegal, Cameroon, Burkina, Mali.',
    'strat.p5.title':'CSR Impact','strat.p5.desc':'Local jobs, vocational training, sustainable farming, carbon footprint reduction. Annual ESG reporting.',
    'strat.p6.title':'Digitalisation','strat.p6.desc':'Group ERP, subsidiary CRM, agro e-commerce, digital media platforms. Full digital transformation by 2030.',
    'strat.cta':'Read our full vision →',
    'pays.eyebrow':'Geographic Presence','pays.title':'4 countries, <em>one vision</em>',
    'pays.subtitle':'Strategic anchoring in the most dynamic economies of West Africa, with planned expansion to 15 countries by 2040.',
    'pays.togo.role':'Group HQ','pays.togo.detail':'BUAME GROUP SAS<br>6 SASU subsidiaries<br>Lomé — Deep Water Port',
    'pays.togo.badge':'Headquarters',
    'pays.benin.role':'First Expansion Country','pays.benin.detail':'6 SARL subsidiaries<br>Cotonou — Autonomous Port<br>AfCFTA — Free Zone',
    'pays.benin.badge':'Operational Year 1',
    'pays.ci.role':'Regional Economic Hub','pays.ci.detail':"6 SARL subsidiaries<br>Abidjan — UEMOA's #1 economy<br>Centre of Excellence",
    'pays.ghana.role':'Anglophone Gateway','pays.ghana.detail':'6 Ltd subsidiaries<br>Accra — 2nd economy Gulf of Guinea<br>Anglophone market access',
    'pays.badge.an23':'Year 2–3','pays.next':'NEXT WAVE:',
    'cta.eyebrow':'Join the adventure','cta.title':'Partners, Investors, <em>Talents</em>',
    'cta.subtitle':'Whether you want to invest, partner or join our team, BUAME GROUP is waiting for you.',
    'cta.btn1':'Contact us →','cta.btn2':'View job openings →',
    'page.group.eyebrow':'The Group','page.group.title':'An African empire <em>under construction</em>',
    'page.gov.eyebrow':'Governance','page.gov.title':'A <em>reference governance</em>',
    'page.dir.eyebrow':'Executive Leadership','page.dir.title':'The women and men <em>who build</em>',
    'page.fil.eyebrow':'Our Subsidiaries','page.fil.title':'Six forces, <em>one empire</em>',
    'page.news.eyebrow':'News','page.news.title':'Latest <em>group news</em>',
    'page.blog.eyebrow':'Expert Blog','page.blog.title':'<em>Africa Business</em> Insights',
    'page.careers.eyebrow':'Careers','page.careers.title':'Join <em>the empire</em>',
    'page.contact.eyebrow':'Contact Us','page.contact.title':'Let\'s talk <em>business</em>',
    'page.group.sub'  : 'Founded in Lomé with a pan-African vision, BUAME GROUP brings together six complementary forces to transform West Africa.',
    'page.gov.sub'    : 'BUAME GROUP applies the governance standards of major international groups, in accordance with OHADA law and best African practices.',
    'page.dir.sub'    : 'The BUAME GROUP leadership team brings together excellence profiles trained in Africa and internationally, committed to continental development.',
    'page.fil.sub'    : 'Strategically selected sectors for their complementarity and growth potential in West Africa.',
    'page.news.sub'   : 'Follow the official news of BUAME GROUP: inaugurations, partnerships, appointments, contracts and landmark events.',
    'page.blog.sub'   : 'Analysis, trends and insights on the West African economy by BUAME GROUP experts.',
    'page.careers.sub': "BUAME GROUP is recruiting ambitious talents who want to build tomorrow's Africa. We offer unique opportunities in dynamic, multi-country, multi-sector environments.",
    'page.contact.sub': 'Partnerships, investments, public contracts, joint projects or applications — our team is at your disposal.',
    'breadcrumb.home':'Home','breadcrumb.group':'Group','breadcrumb.gov':'Governance','breadcrumb.dir':'Leadership',
    'breadcrumb.fil':'Subsidiaries','breadcrumb.news':'News','breadcrumb.blog':'Blog','breadcrumb.careers':'Careers','breadcrumb.contact':'Contact',
    'gov.section.eyebrow':'Governance','gov.section.title':'A <em>reference governance</em>',
    'gov.ag.title':'General Assembly','gov.ag.desc':'Sovereign body of BUAME GROUP SAS. Ordinary and extraordinary decisions. Annual meeting mandatory within 6 months of year-end.',
    'gov.ca.title':'Board of Directors','gov.ca.desc':'Chairman + minimum 4 independent directors. Quarterly meetings with formalized minutes. Specialized committees.',
    'gov.dg.title':'General Management','gov.dg.desc':'CEO + 3 Deputy CEOs (Finance, Operations, Strategy). Legal representation, strategy execution, oversight of 6 subsidiaries.',
    'gov.rse.eyebrow':'CSR & Sustainability','gov.rse.title':'The <em>responsible</em> company',
    'dir.leaders.eyebrow':'Corporate Culture','dir.leaders.title':'BUAME LEADERS<em>™</em>',
    'dir.leaders.sub':'Our acceleration program for high-potential employees. Training the leaders of tomorrow for Africa.',
    'dir.leaders.cta':'Join the team →',
    'news.archives.eyebrow':'Archives','news.archives.title':'All our <em>publications</em>',
    'news.press.title':'Press & Media Contact','news.press.btn1':'Write to press →','news.press.btn2':'Download press kit',
    'news.agenda.title':'📅 BUAME GROUP Agenda 2025–2026','news.badge.official':'OFFICIAL RELEASE',
    'blog.all':'All','blog.all_articles':'All articles →','blog.read':'Read →',
    'blog.recent.eyebrow':'Recent Articles','blog.recent.title':'More <em>insights</em>',
    'blog.newsletter.title':'Receive our analyses every week',
    'blog.newsletter.desc':'Subscribe to the BUAME GROUP newsletter to never miss an insight on the West African economy.',
    'blog.newsletter.cta':'Subscribe →',
    'blog.post1.title':'AfCFTA 2025: How African Groups Can Seize the Unified Market Opportunity',
    'blog.post2.title':'Public Procurement in West Africa: BOAD & AfDB Tender Guide',
    'blog.post3.title':'Cocoa Exports to Europe: Certifications and Premium Value Strategies',
    'blog.post4.title':'Financing an OHADA Holding: Capital, Credit and Institutional Partners',
    'recru.eyebrow':'Careers','recru.why.eyebrow':'Why join us?','recru.why.title':'Build <em>tomorrow\'s Africa</em>',
    'recru.why.subtitle':'BUAME GROUP offers a stimulating work environment where every talent can thrive and contribute to the transformation of the continent.',
    'recru.perk1.title':'Continuous Training','recru.perk1.desc':'20h of training per year, 100% funded by the group',
    'recru.perk2.title':'International Mobility','recru.perk2.desc':'Cross-country and subsidiary mobility encouraged',
    'recru.perk3.title':'Health Coverage','recru.perk3.desc':'Family health insurance for all permanent employees',
    'recru.perk4.title':'BUAME LEADERS™','recru.perk4.desc':'Acceleration program for high-potential employees',
    'recru.jobs.eyebrow':'Open positions','recru.jobs.title':'Our <em>opportunities</em>',
    'recru.jobs.sub':'Join a team of excellence and help build the pan-African empire.',
    'recru.all':'All positions','recru.apply':'Apply',
    'recru.rh.title':'Human Resources Department','recru.rh.sub':'rh@buamegroup.com — Reply within 72h',
    'recru.bottom.label':'Direct contact — Human Resources','recru.bottom.sub':'HR Dept. BUAME GROUP — Lomé, Togo · Mon–Fri 8am–6pm GMT',
    'recru.bottom.btn1':'Write to HR →','recru.bottom.btn2':'Download HR Charter',
    'contact.eyebrow':'Contact Us','contact.title':'Let\'s talk <em>business</em>',
    'contact.subtitle':'Partnerships, investments, public contracts, joint projects or applications — our team is at your disposal.',
    'contact.hq':'Headquarters','contact.email_label':'Email','contact.phone':'Phone','contact.legal_label':'Legal Structure',
    'contact.form_badge':'Secure form — Reply within 48h',
    'contact.map.eyebrow':'Map & Directions','contact.map.title':'Find us <em>in Lomé</em>',
    'contact.map.sub':"Our headquarters is located in the Adidogomé area, in the heart of Togo's economic capital.",
    'contact.map.btn':'Open in Google Maps →',
    'form.name':'Full name *','form.email':'Email *','form.org':'Organisation','form.country':'Country *','form.subject':'Subject *','form.message':'Message *',
    'form.rgpd':'I accept that my data will be used to process my request.',
    'form.submit':'Send Message ◆',
    'form.rh.name':'Full name *','form.rh.email':'Professional email *','form.rh.poste':'Desired position *','form.rh.pays':'Preferred country',
    'form.rh.msg':'Cover letter *','form.rh.rgpd':'By submitting this form, I authorize BUAME GROUP to process my personal data for this recruitment (retention 24 months).',
    'form.rh.submit':'Send to HR — rh@buamegroup.com ◆',
    'footer.tagline':'"Africa by Africans — build, trade, house, feed, transport, inform."',
    'footer.desc':'Pan-African SAS conglomerate based in Lomé, Togo. 6 subsidiaries, 4 countries, one vision. OHADA — Togolese law.',
    'footer.col.filiales':'Subsidiaries','footer.col.groupe':'Group','footer.col.legal':'Legal',
    'footer.link.about':'About us','footer.link.gov':'Governance','footer.link.dir':'Executive Leadership',
    'footer.link.news':'News','footer.link.strat':'Diamond Strategy','footer.link.blog':'Expert Blog','footer.link.careers':'Careers',
    'footer.link.mentions':'Legal notice','footer.link.privacy':'Privacy policy','footer.link.cookies':'Cookies',
    'footer.link.cgv':'T&Cs','footer.link.ohada':'OHADA Law',
    'footer.newsletter':'Newsletter','footer.newsletter.placeholder':'Email',
    'footer.copyright':'© 2025 BUAME GROUP SAS — Lomé, Togo. All rights reserved.',
    'footer.legal2':'OHADA Law — RCCM Togo — <a href="#">ISO in progress</a>',
  },

  /* ╔══════════════════ PORTUGUÊS ══════════════════╗ */
  pt: {
    'nav.home':'Início','nav.group':'Grupo','nav.filiales':'Filiais','nav.governance':'Governança',
    'nav.direction':'Direção','nav.news':'Notícias','nav.blog':'Blog','nav.careers':'Carreiras','nav.contact':'Contato',
    'hero.eyebrow':'Conglomerado Pan-Africano — Lomé, Togo',
    'hero.title.line1':'África','hero.title.line2':'pelos Africanos',
    'hero.subtitle':'Construir, Comerciar, Transportar, Habitar, Alimentar, Informar',
    'hero.desc':"O BUAME GROUP é um conglomerado SAS pan-africano com operações em 6 setores estratégicos em 4 países da África Ocidental. Nossa visão: estar entre os 10 maiores grupos africanos até 2045.",
    'hero.cta1':'Descobrir nossas filiais','hero.cta2':'Nossa visão',
    'stats.filiales':'Filiais Ativas','stats.countries':'Países de Operação','stats.vision':'Visão CA 2045 (FCFA)','stats.years':'Anos de Visão',
    'about.eyebrow':'O Grupo',
    'about.title':'Um império africano <em>em construção</em>',
    'about.subtitle':'Fundado em Lomé com uma visão pan-africana, o BUAME GROUP reúne seis forças complementares para transformar a África Ocidental.',
    'about.card.legal':'Forma Jurídica da Holding','about.card.capital':'Capital Social FCFA','about.card.jobs':'Empregos previstos Ano 3','about.card.horizon':'Horizonte da Visão',
    'about.quote':'"A África precisa de atores africanos que pensem grande, ajam rápido e construam para durar. O BUAME GROUP é essa resposta."',
    'about.cite':'— Direção Geral, BUAME GROUP SAS',
    'about.p1':"O BUAME GROUP é uma holding pan-africana constituída como Sociedade por Ações Simplificada (SAS) de direito togolês, com sede em Lomé. O grupo opera por meio de 6 filiais SASU no Togo e SARLs nos países de expansão, de acordo com o direito OHADA.",
    'about.p2':"Nosso modelo é único: cada filial é cliente e fornecedora das demais, criando um ecossistema integrado que reduz custos em 15 a 20% e constrói uma vantagem competitiva inimitável no mercado da África Ocidental.",
    'about.p3':"Com a Estratégia Diamante Azul™, traçamos um roteiro claro de 20 anos: ancoragem local, sinergias entre filiais, certificações ISO, expansão geográfica, impacto RSE e digitalização completa das nossas operações.",
    'about.mission':'Criar valor duradouro na África Ocidental por meio da excelência operacional e ancoragem local.',
    'about.vision_text':'Top 10 dos grupos africanos até 2045, listado na bolsa, 100 bilhões FCFA em receita.',
    'about.cta':'Saiba mais sobre o grupo →',
    'filiales.eyebrow':'Nossas Filiais','filiales.title':'Seis forças, <em>um só império</em>',
    'filiales.subtitle':'Setores estratégicos selecionados pela sua complementaridade e potencial de crescimento na África Ocidental.',
    'filiales.cta':'Ver todas as filiais →',
    'filiale.construction.name':'CONSTRUÇÃO','filiale.construction.desc':"Engenharia civil, infraestrutura rodoviária e edifícios. Aluguel de equipamentos. Contratos públicos e privados.",
    'filiale.trade.name':'TRADE','filiale.trade.desc':"Importação-exportação, distribuição B2B, comércio geral. Fornecedora exclusiva das outras 5 filiais.",
    'filiale.logistics.name':'LOGÍSTICA','filiale.logistics.desc':"Transporte rodoviário regional, trânsito aduaneiro, armazenagem. Prestadora logística exclusiva do grupo.",
    'filiale.immobilier.name':'IMOBILIÁRIO','filiale.immobilier.desc':"Promoção imobiliária residencial e comercial. Gestão de arrendamento e venda de escritórios.",
    'filiale.agro.name':'AGRO','filiale.agro.desc':"Transformação agroalimentar, exportação de cacau, castanha de caju e karité. Certificações GlobalG.A.P.",
    'filiale.medias.name':'MÉDIA','filiale.medias.desc':"Web TV africana, podcast de negócios, imprensa digital e agência de publicidade pan-africana.",
    'tag.marches':'Contratos públicos','tag.transport':'Transporte','tag.storage':'Armazenagem',
    'tag.promotion':'Promoção','tag.locative':'Gestão locativa','tag.bureaux':'Escritórios',
    'tag.cacao':'Exportação Cacau','tag.regie':'Agência Pub',
    'strat.eyebrow':'Estratégia','strat.title':'Estratégia Diamante Azul<em>™</em>',
    'strat.subtitle':'Um roteiro de 20 anos articulado em torno de 6 pilares estratégicos para tornar o BUAME GROUP um ator de referência em África.',
    'strat.p1.title':'Ancoragem Local','strat.p1.desc':'Presença profunda em cada mercado. Recursos humanos locais, parceiros locais, conformidade regulatória total.',
    'strat.p2.title':'Sinergias entre Filiais','strat.p2.desc':'Ecossistema integrado onde cada filial alimenta as demais. Redução de custos de 15–20%, vantagem competitiva estrutural.',
    'strat.p3.title':'Certificações ISO','strat.p3.desc':'ISO 9001, ISO 14001, GlobalG.A.P., OEA aduaneiro. Padrões internacionais para aceder aos mercados mundiais.',
    'strat.p4.title':'Expansão Geográfica','strat.p4.desc':'4 países hoje → 15 países até 2040. Próxima vaga: Nigéria, Senegal, Camarões, Burkina, Mali.',
    'strat.p5.title':'Impacto RSE','strat.p5.desc':'Empregos locais, formação profissional, agricultura sustentável, redução da pegada de carbono. Relatório ESG anual.',
    'strat.p6.title':'Digitalização','strat.p6.desc':'ERP do grupo, CRM das filiais, e-commerce agro, plataformas digitais de média. Transformação digital total até 2030.',
    'strat.cta':'Ler a nossa visão completa →',
    'pays.eyebrow':'Presença Geográfica','pays.title':'4 países, <em>uma visão</em>',
    'pays.subtitle':'Uma ancoragem estratégica nas economias mais dinâmicas da África Ocidental, com expansão planejada para 15 países até 2040.',
    'pays.togo.role':'Sede do Grupo — HQ','pays.togo.detail':'BUAME GROUP SAS<br>6 filiais SASU<br>Lomé — Porto de Águas Profundas',
    'pays.togo.badge':'Sede Social',
    'pays.benin.role':'Primeiro País de Expansão','pays.benin.detail':'6 filiais SARL<br>Cotonou — Porto autónomo<br>ZLECAF — Zona franca',
    'pays.benin.badge':'Operacional Ano 1',
    'pays.ci.role':'Hub Econômico Regional','pays.ci.detail':"6 filiais SARL<br>Abidjan — 1ª economia da UEMOA<br>Centro de Excelência",
    'pays.ghana.role':'Porta Anglófona','pays.ghana.detail':'6 filiais Ltd<br>Accra — 2ª economia Golfo da Guiné<br>Acesso a mercados anglófonos',
    'pays.badge.an23':'Ano 2–3','pays.next':'PRÓXIMA VAGA:',
    'cta.eyebrow':'Junte-se à aventura','cta.title':'Parceiros, Investidores, <em>Talentos</em>',
    'cta.subtitle':'Se deseja investir, associar-se ou juntar-se à nossa equipa, o BUAME GROUP aguarda-o.',
    'cta.btn1':'Contacte-nos →','cta.btn2':'Ver ofertas de emprego →',
    'page.group.eyebrow':'O Grupo','page.group.title':'Um império africano <em>em construção</em>',
    'page.gov.eyebrow':'Governança','page.gov.title':'Uma governança <em>de referência</em>',
    'page.dir.eyebrow':'Direção Executiva','page.dir.title':'As mulheres e homens <em>que constroem</em>',
    'page.fil.eyebrow':'Nossas Filiais','page.fil.title':'Seis forças, <em>um só império</em>',
    'page.news.eyebrow':'Notícias','page.news.title':'Últimas <em>notícias do grupo</em>',
    'page.blog.eyebrow':'Blog Especializado','page.blog.title':'Insights <em>África Business</em>',
    'page.careers.eyebrow':'Carreiras','page.careers.title':'Junte-se <em>ao império</em>',
    'page.contact.eyebrow':'Contacte-nos','page.contact.title':'Falemos de <em>negócios</em>',
    'page.group.sub'  : 'Fundado em Lomé com uma visão pan-africana, o BUAME GROUP reúne seis forças complementares para transformar a África Ocidental.',
    'page.gov.sub'    : 'O BUAME GROUP aplica os padrões de governança dos grandes grupos internacionais, de acordo com o direito OHADA e as melhores práticas africanas.',
    'page.dir.sub'    : 'A equipa de liderança do BUAME GROUP reúne perfis de excelência formados em África e internacionalmente, comprometidos com o desenvolvimento do continente.',
    'page.fil.sub'    : 'Setores estratégicos selecionados pela sua complementaridade e potencial de crescimento na África Ocidental.',
    'page.news.sub'   : 'Acompanhe as notícias oficiais do BUAME GROUP: inaugurações, parcerias, nomeações, contratos e eventos marcantes.',
    'page.blog.sub'   : 'Análises, tendências e insights sobre a economia da África Ocidental pelos especialistas do BUAME GROUP.',
    'page.careers.sub': "O BUAME GROUP recruta talentos ambiciosos que querem construir a África de amanhã. Oferecemos oportunidades únicas em ambientes dinâmicos, multinacionais e multissetoriais.",
    'page.contact.sub': 'Parcerias, investimentos, contratos públicos, projetos conjuntos ou candidaturas — a nossa equipa está à sua disposição.',
    'breadcrumb.home':'Início','breadcrumb.group':'Grupo','breadcrumb.gov':'Governança','breadcrumb.dir':'Direção',
    'breadcrumb.fil':'Filiais','breadcrumb.news':'Notícias','breadcrumb.blog':'Blog','breadcrumb.careers':'Carreiras','breadcrumb.contact':'Contato',
    'gov.section.eyebrow':'Governança','gov.section.title':'Uma governança <em>de referência</em>',
    'gov.ag.title':'Assembleia Geral','gov.ag.desc':'Órgão soberano da SAS BUAME GROUP. Decisões ordinárias e extraordinárias. Reunião anual obrigatória nos 6 meses seguintes ao encerramento.',
    'gov.ca.title':'Conselho de Administração','gov.ca.desc':'Presidente + mínimo de 4 administradores independentes. Reuniões trimestrais com atas formalizadas. Comités especializados dedicados.',
    'gov.dg.title':'Direção Geral','gov.dg.desc':'CEO + 3 Diretores Adjuntos (Finanças, Operações, Estratégia). Representação legal, execução da estratégia do grupo, supervisão das 6 filiais.',
    'gov.rse.eyebrow':'RSE & Desenvolvimento Sustentável','gov.rse.title':'A empresa <em>responsável</em>',
    'dir.leaders.eyebrow':'Cultura Empresarial','dir.leaders.title':'BUAME LEADERS<em>™</em>',
    'dir.leaders.sub':'O nosso programa de aceleração para os colaboradores de alto potencial. Formar os líderes de amanhã para África.',
    'dir.leaders.cta':'Juntar-se à equipa →',
    'news.archives.eyebrow':'Arquivos','news.archives.title':'Todas as nossas <em>publicações</em>',
    'news.press.title':'Contacto Imprensa & Média','news.press.btn1':'Escrever à imprensa →','news.press.btn2':'Descarregar dossier de imprensa',
    'news.agenda.title':'📅 Agenda BUAME GROUP 2025–2026','news.badge.official':'COMUNICADO OFICIAL',
    'blog.all':'Todos','blog.all_articles':'Todos os artigos →','blog.read':'Ler →',
    'blog.recent.eyebrow':'Artigos Recentes','blog.recent.title':'Mais <em>insights</em>',
    'blog.newsletter.title':'Receba as nossas análises todas as semanas',
    'blog.newsletter.desc':'Inscreva-se na newsletter do BUAME GROUP para não perder nenhum insight sobre a economia da África Ocidental.',
    'blog.newsletter.cta':'Inscrever-se →',
    'blog.post1.title':'ZLECAF 2025: Como Grupos Africanos Podem Aproveitar o Mercado Unificado',
    'blog.post2.title':'Contratações Públicas na África Ocidental: Guia de Licitações BOAD & BAD',
    'blog.post3.title':'Exportação de Cacau para Europa: Certificações e Estratégias Premium',
    'blog.post4.title':'Financiamento de uma Holding OHADA: Capital, Crédito e Parceiros',
    'recru.eyebrow':'Carreiras','recru.why.eyebrow':'Por que nos juntar?','recru.why.title':'Construa <em>a África de amanhã</em>',
    'recru.why.subtitle':'O BUAME GROUP oferece um ambiente de trabalho estimulante onde cada talento pode prosperar e contribuir para a transformação do continente.',
    'recru.perk1.title':'Formação Contínua','recru.perk1.desc':'20h de formação por ano, 100% financiadas pelo grupo',
    'recru.perk2.title':'Mobilidade Internacional','recru.perk2.desc':'Passagens entre países e filiais encorajadas',
    'recru.perk3.title':'Cobertura de Saúde','recru.perk3.desc':'Seguro de saúde familiar para todos os contratos permanentes',
    'recru.perk4.title':'BUAME LEADERS™','recru.perk4.desc':'Programa de aceleração para colaboradores de alto potencial',
    'recru.jobs.eyebrow':'Vagas abertas','recru.jobs.title':'As nossas <em>oportunidades</em>',
    'recru.jobs.sub':'Junte-se a uma equipa de excelência e ajude a construir o império pan-africano.',
    'recru.all':'Todos os cargos','recru.apply':'Candidatar',
    'recru.rh.title':'Departamento de Recursos Humanos','recru.rh.sub':'rh@buamegroup.com — Resposta em 72h',
    'recru.bottom.label':'Contacto direto — Recursos Humanos','recru.bottom.sub':'RH BUAME GROUP — Lomé, Togo · Seg–Sex 8h–18h GMT',
    'recru.bottom.btn1':'Escrever ao RH →','recru.bottom.btn2':'Descarregar Carta de RH',
    'contact.eyebrow':'Contacte-nos','contact.title':'Falemos de <em>negócios</em>',
    'contact.subtitle':'Parcerias, investimentos, contratos públicos, projetos conjuntos ou candidaturas — a nossa equipa está à sua disposição.',
    'contact.hq':'Sede Social','contact.email_label':'E-mail','contact.phone':'Telefone','contact.legal_label':'Estrutura Jurídica',
    'contact.form_badge':'Formulário seguro — Resposta em 48h',
    'contact.map.eyebrow':'Mapa & Acesso','contact.map.title':'Encontre-nos <em>em Lomé</em>',
    'contact.map.sub':"A nossa sede está situada na zona de Adidogomé, no coração da capital económica do Togo.",
    'contact.map.btn':'Abrir no Google Maps →',
    'form.name':'Nome completo *','form.email':'E-mail *','form.org':'Organização','form.country':'País *','form.subject':'Assunto *','form.message':'Mensagem *',
    'form.rgpd':'Aceito que os meus dados sejam utilizados para processar o meu pedido.',
    'form.submit':'Enviar mensagem ◆',
    'form.rh.name':'Nome completo *','form.rh.email':'E-mail profissional *','form.rh.poste':'Cargo pretendido *','form.rh.pays':'País preferido',
    'form.rh.msg':'Carta de motivação *','form.rh.rgpd':'Ao submeter este formulário, autorizo o BUAME GROUP a tratar os meus dados pessoais no âmbito deste recrutamento (conservação 24 meses).',
    'form.rh.submit':'Enviar ao RH — rh@buamegroup.com ◆',
    'footer.tagline':'"África pelos Africanos — construir, comerciar, habitar, alimentar, transportar, informar."',
    'footer.desc':'Conglomerado SAS pan-africano sediado em Lomé, Togo. 6 filiais, 4 países, uma visão. OHADA — Direito togolês.',
    'footer.col.filiales':'Filiais','footer.col.groupe':'Grupo','footer.col.legal':'Menções Legais',
    'footer.link.about':'Sobre nós','footer.link.gov':'Governança','footer.link.dir':'Direção Executiva',
    'footer.link.news':'Notícias','footer.link.strat':'Estratégia Diamante','footer.link.blog':'Blog Especializado','footer.link.careers':'Carreiras',
    'footer.link.mentions':'Menções legais','footer.link.privacy':'Política de privacidade','footer.link.cookies':'Cookies',
    'footer.link.cgv':'T&C','footer.link.ohada':'Direito OHADA',
    'footer.newsletter':'Newsletter','footer.newsletter.placeholder':'E-mail',
    'footer.copyright':'© 2025 BUAME GROUP SAS — Lomé, Togo. Todos os direitos reservados.',
    'footer.legal2':'Direito OHADA — RCCM Togo — <a href="#">ISO em curso</a>',
  }
};

// ── MOTEUR i18n ──────────────────────────────
let currentLang = localStorage.getItem('buame-lang') || 'fr';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('buame-lang', lang);
  document.documentElement.lang = lang;

  // Boutons langue actifs
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.trim().toLowerCase() === lang);
  });

  const t = translations[lang] || translations['fr'];

  // data-i18n → innerHTML (labels, titres, paragraphes)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // data-i18n-placeholder → placeholder des inputs
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Mettre à jour les offres d'emploi (titre change selon la langue)
  renderJobs();
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => setLang(currentLang));

// ══════════════════════════════════════════════
// ── OFFRES D'EMPLOI ───────────────────────────
// ══════════════════════════════════════════════
const jobs = [
  { id:1,  title:'Directeur Général Adjoint — Finance (CFO)', titleEn:'Deputy CEO — Finance (CFO)',         titlePt:'CEO Adjunto — Finanças (CFO)',           filiale:'holding',     location:'Lomé, Togo',       type:'CDI', level:'C-Level',          salary:'1 000 000 – 1 500 000 FCFA/mois', badge:'HOLDING',     badgeColor:'#C8A84B' },
  { id:2,  title:'Directeur Technique BTP',                    titleEn:'Technical Director BTP',              titlePt:'Diretor Técnico BTP',                    filiale:'construction',location:'Lomé, Togo',       type:'CDI', level:'Cadre Supérieur',  salary:'600 000 – 900 000 FCFA/mois',     badge:'CONSTRUCTION',badgeColor:'#4A90C4' },
  { id:3,  title:'Chef de Projet Senior — Génie Civil',        titleEn:'Senior Project Manager — Civil Eng.', titlePt:'Gerente de Projetos — Engenharia Civil', filiale:'construction',location:'Cotonou, Bénin',    type:'CDI', level:'Cadre',            salary:'450 000 – 700 000 FCFA/mois',     badge:'CONSTRUCTION',badgeColor:'#4A90C4' },
  { id:4,  title:'Responsable Supply Chain & Logistique',      titleEn:'Supply Chain & Logistics Manager',    titlePt:'Gerente de Supply Chain',               filiale:'logistics',   location:'Abidjan, CI',      type:'CDI', level:'Cadre',            salary:'500 000 – 750 000 FCFA/mois',     badge:'LOGISTICS',   badgeColor:'#3F8C5A' },
  { id:5,  title:'Directeur Commercial — Trade International', titleEn:'Commercial Director — Intl. Trade',   titlePt:'Diretor Comercial — Comércio Internacional', filiale:'trade',    location:'Accra, Ghana',     type:'CDI', level:'Cadre Supérieur',  salary:'700 000 – 1 000 000 FCFA/mois',   badge:'TRADE',       badgeColor:'#E8A020' },
  { id:6,  title:'Responsable Promotion Immobilière',          titleEn:'Real Estate Development Manager',     titlePt:'Gerente de Promoção Imobiliária',        filiale:'immobilier',  location:'Lomé, Togo',       type:'CDI', level:'Cadre',            salary:'500 000 – 750 000 FCFA/mois',     badge:'IMMOBILIER',  badgeColor:'#C8A84B' },
  { id:7,  title:'Agronome — Responsable Export Agro',         titleEn:'Agronomist — Agro Export Manager',    titlePt:'Agrônomo — Gerente de Exportação',       filiale:'agro',        location:'Bénin / Togo',     type:'CDI', level:'Cadre',            salary:'400 000 – 650 000 FCFA/mois',     badge:'AGRO',        badgeColor:'#7B5EA7' },
  { id:8,  title:'Directeur Artistique & Contenus Digitaux',   titleEn:'Creative Director & Digital Content', titlePt:'Diretor de Arte & Conteúdo Digital',     filiale:'medias',      location:'Lomé, Togo',       type:'CDI', level:'Cadre',            salary:'400 000 – 600 000 FCFA/mois',     badge:'MÉDIAS',      badgeColor:'#DC3C3C' },
  { id:9,  title:'Responsable Juridique Groupe',               titleEn:'Group Legal Counsel',                 titlePt:'Assessor Jurídico do Grupo',             filiale:'holding',     location:'Lomé, Togo',       type:'CDI', level:'Cadre Supérieur',  salary:'600 000 – 900 000 FCFA/mois',     badge:'HOLDING',     badgeColor:'#C8A84B' },
  { id:10, title:'Community Manager & Digital Marketing',      titleEn:'Community Manager & Digital Marketing',titlePt:'Community Manager & Marketing Digital',  filiale:'medias',      location:'Lomé / Remote',    type:'CDI', level:'Agent Maîtrise',   salary:'200 000 – 350 000 FCFA/mois',     badge:'MÉDIAS',      badgeColor:'#DC3C3C' },
];

let jobFilter = 'all';

function renderJobs() {
  const grid = document.getElementById('jobsGrid');
  if (!grid) return;
  const filtered = jobFilter === 'all' ? jobs : jobs.filter(j => j.filiale === jobFilter);
  const tKey     = currentLang === 'en' ? 'titleEn' : currentLang === 'pt' ? 'titlePt' : 'title';
  const t        = translations[currentLang] || translations['fr'];
  const applyTxt = t['recru.apply'] || 'Postuler';

  if (!filtered.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:rgba(255,255,255,0.3);font-family:\'Syne\',sans-serif;font-size:13px;letter-spacing:2px;text-transform:uppercase">Aucun poste dans cette catégorie pour le moment</div>';
    return;
  }
  grid.innerHTML = filtered.map(j => `
    <div class="job-card reveal" data-filiale="${j.filiale}">
      <div class="job-left">
        <div class="job-badge" style="background:${j.badgeColor}22;color:${j.badgeColor};border:1px solid ${j.badgeColor}44">${j.badge}</div>
        <div class="job-title">${j[tKey]}</div>
        <div class="job-details">
          <span class="job-detail">${j.location}</span>
          <span class="job-detail">${j.type}</span>
          <span class="job-detail">${j.level}</span>
          <span class="job-detail">${j.salary}</span>
        </div>
      </div>
      <a href="recrutement.html#rh-form" class="job-apply" onclick="prefillJob(decodeURIComponent('${encodeURIComponent(j[tKey])}'))">${applyTxt} →</a>
    </div>
  `).join('');
  grid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

function filterJobs(f, btn) {
  jobFilter = f;
  document.querySelectorAll('.recru-filter .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderJobs();
}

function prefillJob(title) {
  setTimeout(() => {
    const msg = document.getElementById('rh-msg');
    if (msg) msg.placeholder = (translations[currentLang]?.['form.rh.msg'] || 'Lettre de motivation') + ' : ' + title;
    const sel = document.getElementById('rh-poste');
    if (sel) {
      const kw = title.toLowerCase().split(/[\s—-]/)[0];
      const match = Array.from(sel.options).find(o => o.value && o.value.toLowerCase().includes(kw));
      if (match) sel.value = match.value;
    }
  }, 400);
}

// ── BLOG FILTER ──────────────────────────────
function filterBlog(cat, btn) {
  document.querySelectorAll('.blog .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.blog-card').forEach(c => {
    c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none';
  });
}

// ── FILIALE MODAL ────────────────────────────
const filialeData = {
  construction: { emoji:'🏗️', name:'BUAME CONSTRUCTION', legal:'SASU (Togo) / SARL (pays)', ca:'360 000 000 FCFA (An 3)', sectors:'BTP, génie civil, routes, ponts, bâtiments administratifs', clients:'États, BAD, BM, BOAD, promoteurs privés', cert:'ISO 9001, ISO 14001, agrément BTP classes A et B', synergy:'BUAME LOGISTICS pour approvisionnement matériaux, BUAME IMMOBILIER pour projets résidentiels', location_engins:"Grues, pelleteuses, bulldozers, compacteurs, nacelles, bétonières, camions benne — location journalière, hebdomadaire ou mensuelle" },
  trade:        { emoji:'📦', name:'BUAME TRADE',        legal:'SASU (Togo) / SARL (pays)', ca:'240 000 000 FCFA (An 3)', sectors:'Import-export, distribution, commerce général', clients:'Grossistes, industriels, institutions', cert:'Agréments import-export, carte professionnelle', synergy:'Fournisseur exclusif des 5 autres filiales du groupe' },
  logistics:    { emoji:'🚛', name:'BUAME LOGISTICS',    legal:'SASU (Togo) / SARL (pays)', ca:'84 000 000 FCFA (An 3)',  sectors:'Transport routier, transit douanier, entreposage', clients:'Groupe BUAME + clients externes', cert:'Agréments transit TRIE-CEDEAO, OEA en cible', synergy:'Prestataire logistique exclusif des 5 autres filiales' },
  immobilier:   { emoji:'🏢', name:'BUAME IMMOBILIER',  legal:'SASU (Togo) / SARL (pays)', ca:'300 000 000 FCFA (An 3)', sectors:'Promotion immobilière, gestion locative, bureaux', clients:'Classe moyenne, expatriés, entreprises', cert:'Promoteur agréé, assurance RC décennale', synergy:'BUAME CONSTRUCTION réalise tous les chantiers' },
  agro:         { emoji:'🌿', name:'BUAME AGRO',         legal:'SASU (Togo) / SARL (pays)', ca:'180 000 000 FCFA (An 3)', sectors:'Transformation agro, export cacao, anacarde, karité', clients:'Acheteurs Europe, Asie, marchés CEDEAO', cert:'GlobalG.A.P., Bio en cible, Fair Trade', synergy:'BUAME TRADE assure la commercialisation internationale' },
  medias:       { emoji:'📡', name:'BUAME MÉDIAS',       legal:'SASU (Togo) / SARL (pays)', ca:'36 000 000 FCFA (An 3)',  sectors:'Web TV, podcast, presse digitale, régie publicitaire', clients:'Annonceurs, institutionnels, grand public', cert:'Licence audiovisuelle en cours', synergy:'Porte-parole et promoteur de toutes les filiales du groupe' }
};

function openFiliale(key) {
  const d = filialeData[key];
  if (!d) return;
  const t = translations[currentLang] || translations['fr'];
  const rows = [
    [t['contact.legal_label'] || 'Forme juridique', d.legal],
    ['CA cible An 3', d.ca],
    ['Secteurs', d.sectors],
    ['Clientèle', d.clients],
    ['Certifications', d.cert],
    ['Synergies groupe', d.synergy],
  ];
  if (d.location_engins) rows.splice(3, 0, ['📋 Location Équipements BTP', d.location_engins]);
  const mc = document.getElementById('modalContent');
  if (!mc) return;
  mc.innerHTML = `
    <div style="font-size:48px;margin-bottom:16px">${d.emoji}</div>
    <div style="font-family:'Syne',sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:8px">Filiale BUAME GROUP</div>
    <h2 style="font-family:'Cormorant Garamond',serif;font-size:32px;color:var(--white);margin-bottom:28px">${d.name}</h2>
    <div style="display:grid;gap:16px">
      ${rows.map(([l,v]) => `<div style="padding:16px;background:rgba(200,168,75,0.05);border-left:3px solid var(--gold);border-radius:2px">
        <div style="font-family:'Syne',sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);margin-bottom:6px">${l}</div>
        <div style="font-size:15px;color:rgba(255,255,255,0.85);line-height:1.6">${v}</div>
      </div>`).join('')}
    </div>
    <div style="margin-top:28px;display:flex;gap:12px;flex-wrap:wrap">
      <a href="contact.html" onclick="closeModal()" class="btn btn-primary" style="font-size:11px">${t['nav.contact'] || 'Contact'}</a>
      <a href="recrutement.html" onclick="closeModal()" class="btn btn-outline" style="font-size:11px">${t['recru.all'] || 'Postes'}</a>
    </div>`;
  document.getElementById('filialeModal')?.classList.add('open');
}

function closeModal() {
  document.getElementById('filialeModal')?.classList.remove('open');
}
document.getElementById('filialeModal')?.addEventListener('click', e => { if (e.target === e.currentTarget) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ── FORMULAIRES ─────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const t = translations[currentLang] || translations['fr'];
  const msg = currentLang === 'en'
    ? '✓ Message sent — Reply within 48h'
    : currentLang === 'pt'
    ? '✓ Mensagem enviada — Resposta em 48h'
    : '✓ Message envoyé — Réponse sous 48h';
  showToast(msg);
  e.target.reset();
}

function handleRhSubmit(e) {
  e.preventDefault();
  if (!document.getElementById('rh-nom')?.value || !document.getElementById('rh-email')?.value || !document.getElementById('rh-poste')?.value) {
    showToast('⚠️ Veuillez remplir tous les champs obligatoires');
    return;
  }
  const msg = currentLang === 'en'
    ? '✓ Application sent to rh@buamegroup.com — Reply within 72h'
    : currentLang === 'pt'
    ? '✓ Candidatura enviada para rh@buamegroup.com — Resposta em 72h'
    : '✓ Candidature envoyée à rh@buamegroup.com — Réponse sous 72h';
  showToast(msg);
  e.target.reset();
}

function subscribeNewsletter() {
  document.querySelectorAll('#newsletterEmail').forEach(input => {
    if (!input.value) return;
    const msg = currentLang === 'en' ? '✓ Subscribed!' : currentLang === 'pt' ? '✓ Inscrito!' : '✓ Inscription confirmée !';
    showToast(msg);
    input.value = '';
  });
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.transform = 'translateY(0)';
  t.style.opacity   = '1';
  setTimeout(() => { t.style.transform = 'translateY(120px)'; t.style.opacity = '0'; }, 4000);
}

// ── SMOOTH SCROLL ────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});