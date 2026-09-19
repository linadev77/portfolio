/* ==========================================================
   Portfolio — Miranto Lina Raherison
   JavaScript vanilla, sans dépendance.
   ========================================================== */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------
     1. RÉALISATIONS
     Remplacez ces exemples par vos vrais projets.
       - image : chemin vers une capture (ex. 'images/projet-1.jpg').
                 Laissez '' pour afficher un visuel par défaut.
       - url   : adresse du site en ligne. Laissez '' pour masquer le bouton.
       - hue   : teinte (0–360) du visuel par défaut.
     Catégories : ajoutez-en dans l'objet CATEGORIES ci-dessous.
     ------------------------------------------------------ */
  const CATEGORIES = {
    wordpress: 'WordPress',
    plugin: 'Plugins',
    site: 'Sites web',
  };

  const WORKS = [
    {
      title: 'Site de l’entreprise',
      client: 'Mbl Service',
      period: 'Depuis novembre 2023',
      category: 'wordpress',
      icon: 'fa-globe',
      hue: 214,
      description: 'Conception du site de l’entreprise avec un thème WordPress personnalisé, des fonctionnalités sur mesure et de bonnes pratiques d’optimisation des performances.',
      tags: ['WordPress', 'Thème personnalisé', 'Performance'],
      image: '',
      url: '',
    },
    {
      title: 'Thèmes WordPress sur mesure',
      client: 'Mbl Service',
      period: 'Depuis novembre 2023',
      category: 'wordpress',
      icon: 'fa-paint-brush',
      hue: 262,
      description: 'Création de thèmes personnalisés et adaptation de thèmes existants, avec débogage et résolution des problèmes d’affichage.',
      tags: ['WordPress', 'PHP', 'CSS'],
      image: '',
      url: '',
    },
    {
      title: 'Refonte de site web',
      client: 'Takamoa Studio',
      period: 'Janvier – septembre 2023',
      category: 'site',
      icon: 'fa-laptop-code',
      hue: 170,
      description: 'Refonte et intégration web : analyse des interfaces, propositions d’amélioration et interfaces performantes, portables et accessibles sur tous les supports.',
      tags: ['HTML / CSS', 'JavaScript', 'Responsive'],
      image: '',
      url: '',
    },
    {
      title: 'Plugins sur mesure',
      client: 'Takamoa Studio',
      period: 'Janvier – septembre 2023',
      category: 'plugin',
      icon: 'fa-plug',
      hue: 330,
      description: 'Personnalisation de plugins existants et développement de plugins ajoutant des fonctionnalités spécifiques.',
      tags: ['WordPress', 'PHP', 'Plugin'],
      image: '',
      url: '',
    },
    {
      title: 'Site agenda et articles',
      client: 'Randev Team',
      period: 'Janvier – décembre 2022',
      category: 'site',
      icon: 'fa-calendar-alt',
      hue: 24,
      description: 'Création de site et alimentation des données d’agenda et d’articles par webscraping.',
      tags: ['PHP', 'MySQL', 'Webscraping'],
      image: '',
      url: '',
    },
    {
      title: 'Optimisation d’applications web',
      client: 'Randev Team',
      period: 'Janvier – décembre 2022',
      category: 'site',
      icon: 'fa-tachometer-alt',
      hue: 196,
      description: 'Adaptation et optimisation de sites et d’applications web existants, avec maintenance et correctifs de bugs.',
      tags: ['PHP', 'JavaScript', 'Maintenance'],
      image: '',
      url: '',
    },
  ];

  /* ------------------------------------------------------
     2. NAVIGATION ENTRE LES PAGES (transition + hash)
     ------------------------------------------------------ */
  const pages = Array.from(document.querySelectorAll('.page'));
  const navLinks = Array.from(document.querySelectorAll('[data-page]'));
  const main = document.getElementById('main');
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const baseTitle = 'Miranto Lina Raherison';

  const LEAVE_MS = 320;
  const ENTER_MS = 650;

  let current = pages.find((p) => p.classList.contains('active')) || pages[0];

  const pageFromHash = () => {
    const id = decodeURIComponent(window.location.hash.replace('#', ''));
    return pages.some((p) => p.id === id) ? id : 'home';
  };

  function showPage(id, { animate = true, focus = true } = {}) {
    const next = pages.find((p) => p.id === id) || pages[0];
    if (next === current && next.classList.contains('active')) return;

    const prev = current;
    current = next;

    // Nettoie toute transition encore en cours.
    pages.forEach((p) => {
      if (p !== next && p !== prev) p.classList.remove('active', 'is-leaving', 'is-entering');
    });
    next.classList.remove('is-leaving');

    // Menu : lien actif.
    navLinks.forEach((a) => {
      const active = a.dataset.page === next.id;
      a.classList.toggle('is-active', active);
      if (active) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    main.scrollTop = 0;
    window.scrollTo(0, 0);

    if (animate && !reduceMotion.matches && prev && prev !== next) {
      prev.classList.remove('is-entering');
      prev.classList.add('is-leaving');
      window.setTimeout(() => {
        if (current !== prev) prev.classList.remove('active', 'is-leaving');
      }, LEAVE_MS);

      next.classList.add('active', 'is-entering');
      window.setTimeout(() => next.classList.remove('is-entering'), ENTER_MS);
    } else {
      if (prev && prev !== next) prev.classList.remove('active', 'is-leaving', 'is-entering');
      next.classList.add('active');
    }

    document.title = next.id === 'home'
      ? `${baseTitle} — Développeur web full stack`
      : `${next.dataset.title} — ${baseTitle}`;

    if (focus) {
      const heading = next.querySelector('h1, h2');
      if (heading) heading.focus({ preventScroll: true });
    }

    closeMenu();
  }

  // Clics sur tous les liens internes qui pointent vers une page.
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href').slice(1);
    if (!pages.some((p) => p.id === id)) return;
    e.preventDefault();
    if (window.location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
    showPage(id);
  });

  window.addEventListener('popstate', () => showPage(pageFromHash(), { focus: false }));

  /* ------------------------------------------------------
     3. MENU MOBILE
     ------------------------------------------------------ */
  function closeMenu() {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
    burger.firstElementChild.className = 'fas fa-bars';
  }

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    burger.firstElementChild.className = open ? 'fas fa-times' : 'fas fa-bars';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
      burger.focus();
    }
  });

  /* ------------------------------------------------------
     4. TEXTE TAPÉ (accueil)
     ------------------------------------------------------ */
  (function typedRoles() {
    const el = document.getElementById('typed');
    if (!el || reduceMotion.matches) return;

    let roles;
    try { roles = JSON.parse(el.dataset.roles); } catch (_) { return; }
    if (!Array.isArray(roles) || !roles.length) return;

    let index = 0;
    let chars = roles[0].length;
    let deleting = true;
    let wait = 2200;

    function tick() {
      const homeVisible = document.getElementById('home').classList.contains('active') && !document.hidden;
      if (!homeVisible) { window.setTimeout(tick, 600); return; }

      const word = roles[index];
      chars += deleting ? -1 : 1;
      el.textContent = word.slice(0, Math.max(chars, 0));

      let delay = deleting ? 35 : 70;
      if (!deleting && chars >= word.length) { deleting = true; delay = 2200; }
      else if (deleting && chars <= 0) { deleting = false; index = (index + 1) % roles.length; delay = 350; }

      window.setTimeout(tick, delay);
    }

    window.setTimeout(tick, wait);
  })();

  /* ------------------------------------------------------
     5. RÉALISATIONS : filtres et fenêtre de détail
     ------------------------------------------------------ */
  const filtersEl = document.getElementById('filters');
  const worksEl = document.getElementById('works');
  const modal = document.getElementById('work-modal');
  const modalMedia = document.getElementById('modal-media');
  const modalTitle = document.getElementById('modal-title');
  const modalMeta = document.getElementById('modal-meta');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const modalLink = document.getElementById('modal-link');
  let lastTrigger = null;

  function visual(work) {
    if (work.image) {
      const img = document.createElement('img');
      img.src = work.image;
      img.alt = '';
      img.loading = 'lazy';
      return img;
    }
    const icon = document.createElement('i');
    icon.className = `fas ${work.icon || 'fa-code'}`;
    icon.setAttribute('aria-hidden', 'true');
    return icon;
  }

  function renderFilters() {
    const entries = [['all', 'Tout'], ...Object.entries(CATEGORIES)];
    entries.forEach(([key, label], i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter';
      btn.dataset.filter = key;
      btn.textContent = label;
      btn.setAttribute('aria-pressed', String(i === 0));
      filtersEl.appendChild(btn);
    });

    filtersEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter');
      if (!btn) return;
      filtersEl.querySelectorAll('.filter').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      const key = btn.dataset.filter;
      worksEl.querySelectorAll('li').forEach((li) => {
        li.hidden = key !== 'all' && li.dataset.category !== key;
      });
    });
  }

  function renderWorks() {
    WORKS.forEach((work, i) => {
      const li = document.createElement('li');
      li.dataset.category = work.category;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'work';
      btn.dataset.index = String(i);
      btn.style.setProperty('--hue', work.hue ?? 214);

      const media = document.createElement('span');
      media.className = 'work__media';
      media.appendChild(visual(work));

      const caption = document.createElement('span');
      caption.className = 'work__caption';
      const title = document.createElement('span');
      title.className = 'work__title';
      title.textContent = work.title;
      const cat = document.createElement('span');
      cat.className = 'work__cat';
      cat.textContent = `${CATEGORIES[work.category] || ''} — ${work.client}`;
      caption.append(title, cat);

      btn.append(media, caption);
      li.appendChild(btn);
      worksEl.appendChild(li);
    });

    worksEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.work');
      if (!btn) return;
      openModal(WORKS[Number(btn.dataset.index)], btn);
    });
  }

  function openModal(work, trigger) {
    lastTrigger = trigger;
    modal.style.setProperty('--hue', work.hue ?? 214);
    modalMedia.replaceChildren(visual(work));
    modalTitle.textContent = work.title;
    modalMeta.textContent = `${work.client} — ${work.period}`;
    modalDesc.textContent = work.description;
    modalTags.replaceChildren(...(work.tags || []).map((t) => {
      const li = document.createElement('li');
      li.textContent = t;
      return li;
    }));

    if (work.url) {
      modalLink.href = work.url;
      modalLink.hidden = false;
    } else {
      modalLink.hidden = true;
    }

    if (typeof modal.showModal === 'function') modal.showModal();
    else modal.setAttribute('open', '');
  }

  function closeModal() {
    if (typeof modal.close === 'function') modal.close();
    else modal.removeAttribute('open');
    if (lastTrigger) lastTrigger.focus();
  }

  document.getElementById('modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  modal.addEventListener('close', () => { if (lastTrigger) lastTrigger.focus(); });

  renderFilters();
  renderWorks();

  /* ------------------------------------------------------
     6. FORMULAIRE DE CONTACT
     Site statique : le message s'ouvre dans l'application
     de messagerie du visiteur (mailto).
     Pour un envoi direct, branchez un service de formulaire
     (Formspree, Getform…) à la place.
     ------------------------------------------------------ */
  const CONTACT_EMAIL = 'rantoraherison42@gmail.com';
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = String(data.get('sujet') || '').trim();
    const body = `${String(data.get('message') || '').trim()}\n\n${String(data.get('nom') || '').trim()}\n${String(data.get('email') || '').trim()}`;

    status.textContent = 'Ouverture de votre application de messagerie…';
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  /* ------------------------------------------------------
     7. INITIALISATION
     ------------------------------------------------------ */
  document.getElementById('year').textContent = String(new Date().getFullYear());
  showPage(pageFromHash(), { animate: false, focus: false });
  // showPage() ne fait rien si la page demandée est déjà active :
  // on synchronise donc le menu au premier affichage.
  navLinks.forEach((a) => {
    const active = a.dataset.page === current.id;
    a.classList.toggle('is-active', active);
    if (active) a.setAttribute('aria-current', 'page');
  });
})();
