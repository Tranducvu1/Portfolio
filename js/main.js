(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /**
   * Cover strategy:
   * 1) Local snapshot crawled from live site (assets/projects/*.jpg)
   * 2) Live re-crawl via screenshot API when no local file / for future URLs
   */
  const shotLive = (url) => {
    if (!url || !url.startsWith("http")) return "";
    // Direct image API (s-shot)
    return `https://mini.s-shot.ru/1280x800/JPEG/1280/Z100/?${url}`;
  };
  const shotFallback = (url) => {
    if (!url || !url.startsWith("http")) return "";
    return `https://image.thum.io/get/width/1400/crop/900/noanimate/${url}`;
  };

  const coverMarkup = (p) => {
    // Chỉ render ảnh thật — không placeholder tối (bug lặp title/category)
    const src = p.cover || (p.url?.startsWith("http") ? shotLive(p.url) : "");
    if (!src) {
      return `<div class="shot-placeholder shot-placeholder--soft" aria-hidden="true">
        <span>Đang tải preview…</span>
      </div>`;
    }
    return `<img
      class="shot-img"
      src="${src}"
      data-fallback="${p.url?.startsWith("http") ? shotLive(p.url) : ""}"
      data-fallback2="${p.url?.startsWith("http") ? shotFallback(p.url) : ""}"
      alt="Preview — ${p.title}"
      loading="lazy"
      decoding="async"
    />`;
  };

  const categories = [
    { id: "all", label: "Tất cả" },
    { id: "mobile", label: "Mobile App" },
    { id: "edu", label: "Giáo dục" },
    { id: "commerce", label: "Thương mại" },
    { id: "tattoo", label: "Tattoo" },
    { id: "food", label: "Quán ăn / Cafe" },
    { id: "shop", label: "Cửa hàng" },
    { id: "beauty", label: "Spa / Làm đẹp" },
    { id: "clinic", label: "Phòng khám" },
    { id: "service", label: "Dịch vụ & xe" },
  ];

  /**
   * Chỉ dự án có URL + cover thật (không placeholder tối).
   * Cover = screenshot crawl từ web / Google Play.
   */
  const projects = [
    {
      id: "hrdept",
      title: "HRDept Vietnam",
      subtitle: "Nền tảng TMĐT việc làm · tuyển dụng có thưởng",
      category: "commerce",
      categoryLabel: "Thương mại",
      url: "https://hrdept.vercel.app/",
      cover: "assets/projects/hrdept.jpg",
      featured: true,
    },
    {
      id: "chipi",
      title: "ChiPi AI",
      subtitle: "Ứng dụng AI companion trên Android",
      category: "mobile",
      categoryLabel: "Mobile App",
      url: "https://play.google.com/store/apps/details?id=com.starnest.ai.chipi&hl=vi",
      cover: "assets/projects/chipi.jpg",
      featured: true,
    },
    {
      id: "cardscan",
      title: "TCG Card Scan",
      subtitle: "Scan & quản lý thẻ TCG",
      category: "mobile",
      categoryLabel: "Mobile App",
      url: "https://play.google.com/store/apps/details?id=com.expeditee.tcg.cardscan",
      cover: "assets/projects/cardscan.jpg",
      featured: true,
    },
    {
      id: "cardcheck",
      title: "Card Scanner & TCG Tracker",
      subtitle: "Quét AI · theo dõi giá thẻ TCG",
      category: "mobile",
      categoryLabel: "Mobile App",
      url: "https://play.google.com/store/apps/details?id=com.minvora.tcgscan.cardcheck&hl=vi",
      cover: "assets/projects/cardcheck.jpg",
      featured: true,
    },
    {
      id: "cardvalue",
      title: "Card Sport Check Value",
      subtitle: "Kiểm tra giá trị thẻ thể thao",
      category: "mobile",
      categoryLabel: "Mobile App",
      url: "https://play.google.com/store/apps/details?id=com.expeditee.cardsport.checkvalue",
      cover: "assets/projects/cardvalue.jpg",
    },
    {
      id: "planty",
      title: "Planty Identifier",
      subtitle: "Scan & nhận diện cây trồng bằng AI",
      category: "mobile",
      categoryLabel: "Mobile App",
      url: "https://play.google.com/store/apps/details?id=com.expeditee.planty.identifier",
      cover: "assets/projects/planty.jpg",
      featured: true,
    },
    {
      id: "period",
      title: "Period Tracking",
      subtitle: "Theo dõi chu kỳ · health tracker Android",
      category: "mobile",
      categoryLabel: "Mobile App",
      url: "https://play.google.com/store/apps/details?id=com.dqh.period.tracking&hl=vi",
      cover: "assets/projects/period.jpg",
    },
    {
      id: "gym",
      title: "Gym Workout",
      subtitle: "App tập gym · workout planner",
      category: "mobile",
      categoryLabel: "Mobile App",
      url: "https://play.google.com/store/apps/details?id=com.dqh.gym.workout&hl=vi",
      cover: "assets/projects/gym.jpg",
      featured: true,
    },
    {
      id: "wallpaper",
      title: "FunSmile: 4K Live Wallpapers",
      subtitle: "Hình nền động 4K · wallpaper Android",
      category: "mobile",
      categoryLabel: "Mobile App",
      url: "https://play.google.com/store/apps/details?id=com.smile.wallpaper.funny",
      cover: "assets/projects/wallpaper.jpg",
    },
    {
      id: "spinwheel",
      title: "Wheel of Choices",
      subtitle: "Vòng quay quyết định · spin & play",
      category: "mobile",
      categoryLabel: "Mobile App",
      url: "https://play.google.com/store/apps/details?id=com.lucas.spin.wheel",
      cover: "assets/projects/spinwheel.jpg",
    },
    {
      id: "piano",
      title: "Learn Piano",
      subtitle: "Học piano · game luyện ngón",
      category: "mobile",
      categoryLabel: "Mobile App",
      url: "https://play.google.com/store/apps/details?id=com.lmt.pianogame.learnpiano&hl=vi",
      cover: "assets/projects/piano.jpg",
    },
    {
      id: "edupia",
      title: "Edupia",
      subtitle: "Nền tảng học tiếng Anh online",
      category: "edu",
      categoryLabel: "Giáo dục",
      url: "https://edupia.vn/",
      cover: "assets/projects/edupia.jpg",
      featured: true,
    },
    {
      id: "ananas",
      title: "Ananas",
      subtitle: "E-commerce thời trang · brand store",
      category: "commerce",
      categoryLabel: "Thương mại",
      url: "https://ananas.vn/",
      cover: "assets/projects/ananas.jpg",
      featured: true,
    },
    {
      id: "highoctane",
      title: "High Octane",
      subtitle: "Web studio tattoo · landing brand",
      category: "tattoo",
      categoryLabel: "Tattoo",
      url: "https://www.highoctane.vn/",
      cover: "assets/projects/tattoo1.jpg",
    },
    {
      id: "saigonink",
      title: "Saigon Ink",
      subtitle: "Studio tattoo · portfolio gallery web",
      category: "tattoo",
      categoryLabel: "Tattoo",
      url: "https://saigonink.com/",
      cover: "assets/projects/tattoo2.jpg",
    },
    {
      id: "cafe_gocpho",
      title: "Cà Phê Góc Phố",
      subtitle: "Quán cafe nhỏ Đà Nẵng · menu + booking",
      category: "food",
      categoryLabel: "Quán ăn / Cafe",
      url: "#contact",
      cover: "assets/projects/cafe_gocpho.jpg",
    },
    {
      id: "cafe_roi",
      title: "Rối Coffee Lab",
      subtitle: "Specialty coffee startup · landing MVP",
      category: "food",
      categoryLabel: "Quán ăn / Cafe",
      url: "#contact",
      cover: "assets/projects/cafe_roi.jpg",
    },
    {
      id: "cafe_hat",
      title: "Hạt Nhỏ Roastery",
      subtitle: "Rang xay local · web preorder",
      category: "food",
      categoryLabel: "Quán ăn / Cafe",
      url: "#contact",
      cover: "assets/projects/cafe_hat.jpg",
    },
    {
      id: "shop_mini",
      title: "Mini Market 24",
      subtitle: "Cửa hàng tiện lợi · catalog web",
      category: "shop",
      categoryLabel: "Cửa hàng",
      url: "#contact",
      cover: "assets/projects/shop_mini.jpg",
    },
    {
      id: "shop_local",
      title: "Chợ Nhà Mình",
      subtitle: "Shop specialty local · storefront",
      category: "shop",
      categoryLabel: "Cửa hàng",
      url: "#contact",
      cover: "assets/projects/shop_local.jpg",
    },
    {
      id: "spa_bong",
      title: "Spa Bông Sen",
      subtitle: "Spa nhỏ · booking lịch hẹn",
      category: "beauty",
      categoryLabel: "Spa / Làm đẹp",
      url: "#contact",
      cover: "assets/projects/spa_bong.jpg",
    },
    {
      id: "spa_an",
      title: "An Nhiên Beauty",
      subtitle: "Salon / nail startup Đà Nẵng",
      category: "beauty",
      categoryLabel: "Spa / Làm đẹp",
      url: "#contact",
      cover: "assets/projects/spa_an.jpg",
    },
    {
      id: "clinic_an",
      title: "Phòng khám An Vui",
      subtitle: "PK đa khoa nhỏ · web + form",
      category: "clinic",
      categoryLabel: "Phòng khám",
      url: "#contact",
      cover: "assets/projects/clinic_an.jpg",
    },
    {
      id: "clinic_nha",
      title: "Nha khoa Smile DN",
      subtitle: "Nha khoa startup · landing dịch vụ",
      category: "clinic",
      categoryLabel: "Phòng khám",
      url: "#contact",
      cover: "assets/projects/clinic_nha.jpg",
    },
    {
      id: "clinic_skin",
      title: "SkinCare Mini",
      subtitle: "Thẩm mỹ viện nhỏ · booking",
      category: "clinic",
      categoryLabel: "Phòng khám",
      url: "#contact",
      cover: "assets/projects/clinic_skin.jpg",
    },
    {
      id: "thuexe",
      title: "Thuê Lái Xe Hộ 247",
      subtitle: "Web dịch vụ thuê lái · booking lead",
      category: "service",
      categoryLabel: "Dịch vụ & xe",
      url: "https://thuelaixeho247.vn/",
      cover: "assets/projects/thuexe.jpg",
      featured: true,
    },
  ];

  /** Personal photos — chỉ dùng trong Blog */
  const blogPhotos = [
    { src: "assets/images/blog/waterfront.png", caption: "Waterfront evening" },
    { src: "assets/images/blog/city-skyline.png", caption: "City skyline" },
    { src: "assets/images/blog/hoan-kiem.png", caption: "Hoàn Kiếm" },
    { src: "assets/images/blog/pagoda.png", caption: "Architecture" },
    { src: "assets/images/blog/about-stairs.png", caption: "On the road" },
    { src: "assets/images/blog/proj-stairs.png", caption: "Stairs journey" },
    { src: "assets/images/blog/gate.png", caption: "Gate walk" },
    { src: "assets/images/blog/fortress.png", caption: "Fortress wall" },
    { src: "assets/images/blog/proj-fortress2.png", caption: "Heritage" },
    { src: "assets/images/blog/proj-tower.png", caption: "Temple detail" },
    { src: "assets/images/blog/proj-circle.png", caption: "Pagoda tiers" },
    { src: "assets/images/blog/model.png", caption: "Architecture model" },
    { src: "assets/images/blog/proj-panel.png", caption: "Museum wall" },
    { src: "assets/images/blog/mascot.png", caption: "Little mascot" },
    { src: "assets/images/blog/lifestyle.png", caption: "Life moments" },
    { src: "assets/images/blog/proj-life.png", caption: "Table stories" },
    { src: "assets/images/blog/proj-climb.png", caption: "Climb day" },
    { src: "assets/images/blog/proj-arch.png", caption: "Stone path" },
    { src: "assets/images/blog/proj-water.png", caption: "Lake calm" },
    { src: "assets/images/blog/blog-cover-1.png", caption: "Travel 01" },
    { src: "assets/images/blog/blog-cover-2.png", caption: "Travel 02" },
    { src: "assets/images/blog/blog-cover-3.png", caption: "Travel 03" },
    { src: "assets/images/blog/proj-city.png", caption: "Overcast city" },
    { src: "assets/images/blog/proj-gate.png", caption: "Cloud Pavilion" },
    { src: "assets/images/blog/proj-pagoda.png", caption: "Golden plaque" },
    { src: "assets/images/blog/proj-model.png", caption: "Courtyard model" },
    { src: "assets/images/blog/proj-mascot.png", caption: "Soft toy" },
    { src: "assets/images/blog/proj-fortress.png", caption: "Water wall" },
  ];

  const bindShotFallback = (root = document) => {
    root.querySelectorAll("img.shot-img").forEach((img) => {
      img.addEventListener("error", () => {
        const fb = img.getAttribute("data-fallback");
        const fb2 = img.getAttribute("data-fallback2");
        if (fb && !img.dataset.tried1) {
          img.dataset.tried1 = "1";
          img.src = fb;
          return;
        }
        if (fb2 && !img.dataset.tried2) {
          img.dataset.tried2 = "1";
          img.src = fb2;
          return;
        }
        img.classList.add("is-broken");
        const wrap = img.parentElement;
        if (wrap && !wrap.querySelector(".shot-placeholder")) {
          const ph = document.createElement("div");
          ph.className = "shot-placeholder";
          ph.innerHTML = `<span class="shot-domain">Preview</span><strong>${img.alt || "Project"}</strong>`;
          img.replaceWith(ph);
        }
      });
    });
  };

  // ── Featured ──
  const featuredEl = document.getElementById("featuredList");
  if (featuredEl) {
    featuredEl.innerHTML = projects
      .filter((p) => p.featured)
      .map(
        (p, i) => `
      <a class="project-row reveal" data-stagger="${i % 4}" href="${p.url}" ${
          p.url.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""
        }>
        <div class="project-row-media">
          ${coverMarkup(p)}
          <span class="shot-badge">${p.url.startsWith("http") ? "Live preview" : "Startup VN"}</span>
        </div>
        <div class="project-row-body">
          <span class="tag">${p.categoryLabel}</span>
          <h3>${p.title}</h3>
          <p>${p.subtitle}</p>
          <span class="project-link">${p.url.startsWith("http") ? "Xem live" : "Case study · Liên hệ"}</span>
        </div>
      </a>`
      )
      .join("");
    bindShotFallback(featuredEl);
  }

  // ── Filters + grid ──
  const filtersEl = document.getElementById("filters");
  const gridEl = document.getElementById("workGrid");
  let activeFilter = "all";

  const countOf = (id) =>
    id === "all" ? projects.length : projects.filter((p) => p.category === id).length;

  const renderFilters = () => {
    if (!filtersEl) return;
    filtersEl.innerHTML = categories
      .map(
        (c) => `
      <button type="button" class="filter-btn ${c.id === activeFilter ? "active" : ""}" data-filter="${c.id}" role="tab" aria-selected="${c.id === activeFilter}">
        ${c.label}
        <span class="filter-count">${countOf(c.id)}</span>
      </button>`
      )
      .join("");

    filtersEl.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeFilter = btn.getAttribute("data-filter") || "all";
        renderFilters();
        renderGrid();
      });
    });
  };

  const renderGrid = () => {
    if (!gridEl) return;
    const list =
      activeFilter === "all"
        ? projects
        : projects.filter((p) => p.category === activeFilter);

    gridEl.innerHTML = list
      .map(
        (p, i) => `
      <a class="work-card is-enter reveal is-in" style="animation-delay:${i * 40}ms" href="${p.url}" ${
          p.url.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""
        } data-category="${p.category}">
        <div class="work-card-media">
          ${coverMarkup(p)}
          ${p.url.startsWith("http") ? '<span class="shot-badge">Live</span>' : '<span class="shot-badge">Startup VN</span>'}
        </div>
        <div class="work-card-body">
          <span class="tag">${p.categoryLabel}</span>
          <h3>${p.title}</h3>
          <p>${p.subtitle}</p>
        </div>
      </a>`
      )
      .join("");
    bindShotFallback(gridEl);
  };

  renderFilters();
  renderGrid();

  // ── Blog gallery (all personal photos) ──
  const galleryEl = document.getElementById("blogGallery");
  if (galleryEl) {
    galleryEl.innerHTML = blogPhotos
      .map(
        (ph, i) => `
      <figure class="blog-photo reveal" data-stagger="${i % 4}">
        <img src="${ph.src}" alt="${ph.caption}" loading="lazy" />
        <figcaption>${ph.caption}</figcaption>
      </figure>`
      )
      .join("");
  }

  // ── Year ──
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // ── Preloader ──
  const preloader = document.getElementById("preloader");
  const finishLoad = () => {
    document.body.classList.remove("is-loading");
    preloader?.classList.add("is-done");
  };
  document.body.classList.add("is-loading");
  if (prefersReduced) finishLoad();
  else {
    window.addEventListener("load", () => setTimeout(finishLoad, 700), { once: true });
    setTimeout(finishLoad, 1800);
  }

  // ── Nav mobile ──
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  const navLinks = document.getElementById("nav");

  navToggle?.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", open ? "false" : "true");
    mobileNav?.classList.toggle("open", !open);
    document.body.classList.toggle("nav-open", !open);
  });

  mobileNav?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });

  // ── Scroll ──
  const progress = document.getElementById("progress");
  const heroImg = document.getElementById("heroParallax");
  const cursorGlow = document.getElementById("cursorGlow");
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
    header?.classList.toggle("scrolled", y > 20);

    if (heroImg && !prefersReduced) {
      heroImg.style.translate = `0 ${Math.min(y * 0.18, 90)}px`;
    }

    const ids = ["about", "featured", "work", "moments", "contact"];
    let current = "";
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el && y + 140 >= el.offsetTop) current = id;
    });
    navLinks?.querySelectorAll("a").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
    },
    { passive: true }
  );
  onScroll();

  if (!prefersReduced && window.matchMedia("(pointer: fine)").matches && cursorGlow) {
    document.body.classList.add("has-pointer");
    window.addEventListener(
      "pointermove",
      (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
        cursorGlow.classList.add("is-on");
      },
      { passive: true }
    );
    document.addEventListener("mouseleave", () => cursorGlow.classList.remove("is-on"));
  }

  // ── Reveal + counters ──
  const animateCount = (el) => {
    const target = Number(el.getAttribute("data-count") || 0);
    const suffix = el.getAttribute("data-suffix") || "";
    if (prefersReduced) {
      el.textContent = `${target}${suffix}`;
      return;
    }
    const start = performance.now();
    const dur = 1300;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.round(target * e)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const reveals = () => document.querySelectorAll(".reveal:not(.is-in)");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          entry.target.querySelectorAll("[data-count]").forEach((n) => {
            if (!n.dataset.done) {
              n.dataset.done = "1";
              animateCount(n);
            }
          });
          if (entry.target.matches("[data-count]") && !entry.target.dataset.done) {
            entry.target.dataset.done = "1";
            animateCount(entry.target);
          }
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    const observeAll = () => reveals().forEach((el) => io.observe(el));
    observeAll();
    setTimeout(observeAll, 80);
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
    document.querySelectorAll("[data-count]").forEach(animateCount);
  }

  if (!prefersReduced && !window.matchMedia("(pointer: coarse)").matches) {
    document.querySelectorAll(".magnetic").forEach((btn) => {
      if (!(btn instanceof HTMLElement)) return;
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.18}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
    });
  });

  document.getElementById("contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`[Portfolio] Liên hệ từ ${name}`);
    const body = encodeURIComponent(
      `Họ tên: ${name}\nLiên hệ: ${contact}\n\n${message}\n\n— Portfolio Trần Đức Vũ`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });
})();
