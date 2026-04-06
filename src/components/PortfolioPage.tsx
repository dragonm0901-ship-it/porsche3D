"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CrestIcon } from "@/components/CrestIcon";
import { GarageViewer } from "@/components/GarageViewer";
import { ModelStage } from "@/components/ModelStage";
import {
  dictionaries,
  featuredSlides,
  localeLabels,
  locales,
  type Locale,
} from "@/content/site";

type PortfolioPageProps = {
  locale: Locale;
};

type SectionLink = {
  id: string;
  label: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

export function PortfolioPage({ locale }: PortfolioPageProps) {
  const copy = dictionaries[locale];
  const heroRef = useRef<HTMLElement>(null);
  const overviewRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [garageIndex, setGarageIndex] = useState(0);
  const [heroMotion, setHeroMotion] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const lastIndex = featuredSlides.length - 1;
  const activeSlide = featuredSlides[activeIndex];
  const garageSlide = featuredSlides[garageIndex];

  const sectionLinks = useMemo<SectionLink[]>(
    () => [
      { id: "garage", label: copy.nav.garage },
      { id: "collection", label: copy.nav.collection },
    ],
    [copy.nav.collection, copy.nav.garage],
  );

  useEffect(() => {
    const closePanels = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
        setLanguageOpen(false);
      }

      if (event.key === "/" && !menuOpen) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", closePanels);
    return () => {
      window.removeEventListener("keydown", closePanels);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle("is-locked", searchOpen);
    return () => {
      document.body.classList.remove("is-locked");
    };
  }, [searchOpen]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-language-switcher]")) {
        setLanguageOpen(false);
      }

      if (!target.closest("[data-menu-shell]")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", onPointerDown);
    return () => {
      document.removeEventListener("click", onPointerDown);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) {
      return;
    }

    let frame = 0;

    const updateHeroState = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const trackRange = Math.max(hero.offsetHeight - viewport, 1);
      const motionRange = Math.max(trackRange - viewport, 1);
      const travelled = clamp(window.scrollY - hero.offsetTop, 0, trackRange);
      const motion = clamp((travelled / motionRange) * lastIndex, 0, lastIndex);
      setHeroMotion(motion);
      setActiveIndex(Math.round(motion));
    };

    const onScroll = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(updateHeroState);
    };

    updateHeroState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateHeroState);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateHeroState);
    };
  }, [lastIndex]);

  const jumpToSlide = (index: number) => {
    const hero = heroRef.current;

    if (!hero) {
      return;
    }

    const viewport = window.innerHeight;
    const trackRange = Math.max(hero.offsetHeight - viewport, 1);
    const motionRange = Math.max(trackRange - viewport, 1);
    const perSlide = motionRange / Math.max(lastIndex, 1);
    const nextTop = hero.offsetTop + perSlide * clamp(index, 0, lastIndex);

    window.scrollTo({
      top: nextTop,
      behavior: "smooth",
    });
  };

  const jumpToSection = (id: string) => {
    setMenuOpen(false);
    setSearchOpen(false);
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openGarage = (index: number) => {
    setGarageIndex(index);
    jumpToSection("garage");
  };

  const heroStyle = {
    "--accent-top": activeSlide.accent.top,
    "--accent-haze": activeSlide.accent.haze,
    "--accent-glow": activeSlide.accent.glow,
    "--hero-stop-count": String(featuredSlides.length + 1),
  } as CSSProperties;

  const garageStyle = {
    "--garage-accent-top": garageSlide.accent.top,
    "--garage-accent-haze": garageSlide.accent.haze,
    "--garage-accent-glow": garageSlide.accent.glow,
  } as CSSProperties;

  return (
    <>
      <main className="page-shell">
        <section
          ref={heroRef}
          className="hero-track"
          aria-label="Featured showcase"
          style={heroStyle}
        >
          <div className="hero-sticky">
            <div className="frame-shell">
              <header className="frame-nav">
                <div className="brand-block">
                  <Link href={`/${locale}`} className="brand-wordmark" aria-label="porsche. home">
                    porsche.
                  </Link>
                  <span className="brand-tag">{copy.brandTag}</span>
                </div>

                <motion.div 
                  layout
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  className={`menu-launcher ${menuOpen ? "is-open" : ""}`} 
                  data-menu-shell
                >
                  <button
                    type="button"
                    className={`icon-button ghost-button menu-trigger ${menuOpen ? "is-open" : ""}`}
                    aria-label={copy.nav.menu}
                    aria-expanded={menuOpen}
                    aria-haspopup="menu"
                    onClick={() => setMenuOpen((value) => !value)}
                  >
                    <span className="menu-icon" />
                  </button>

                  <AnimatePresence>
                    {menuOpen && (
                      <motion.nav
                        initial={{ opacity: 0, width: 0, paddingRight: 0 }}
                        animate={{ opacity: 1, width: "auto", paddingRight: 16 }}
                        exit={{ opacity: 0, width: 0, paddingRight: 0 }}
                        className="menu-pill-nav"
                        aria-label={copy.nav.menu}
                      >
                        {sectionLinks.map((section, index) => (
                          <motion.button
                            key={`menu-${section.id}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ delay: 0.03 * index }}
                            type="button"
                            className="menu-pill-link"
                            onClick={() => jumpToSection(section.id)}
                          >
                            {section.label}
                          </motion.button>
                        ))}
                      </motion.nav>
                    )}
                  </AnimatePresence>
                </motion.div>

                <div className="nav-spacer" />

                <motion.div 
                  layout
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  className={`search-launcher ${searchOpen ? "is-open" : ""}`}
                >
                  <AnimatePresence>
                    {searchOpen && (
                      <motion.div 
                         initial={{ opacity: 0, width: 0 }}
                         animate={{ opacity: 1, width: 154 }}
                         exit={{ opacity: 0, width: 0 }}
                         className="search-pill-input-wrap"
                      >
                         <input 
                            type="text" 
                            placeholder="Search..." 
                            className="search-pill-input" 
                            autoFocus 
                            style={{ paddingRight: "12px", width: "100%" }}
                         />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="button"
                    className={`icon-button ghost-button ${searchOpen ? "is-active" : ""}`}
                    aria-label={copy.nav.quickLinks}
                    onClick={() => setSearchOpen((v) => !v)}
                  >
                    <span className={searchOpen ? "menu-icon is-close" : "search-icon"} />
                  </button>
                </motion.div>
              </header>

              <aside className="hero-side-nav">
                <button
                  type="button"
                  className="side-arrow side-arrow-up"
                  aria-label={copy.hero.previous}
                  onClick={() => jumpToSlide(activeIndex - 1)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="side-arrow-icon"
                  >
                    <path d="M12 18V6" />
                    <path d="M7 11L12 6L17 11" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="side-arrow side-arrow-down"
                  aria-label={copy.hero.next}
                  onClick={() => {
                    if (activeIndex < lastIndex) {
                      jumpToSlide(activeIndex + 1);
                      return;
                    }

                    overviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="side-arrow-icon"
                  >
                    <path d="M12 6V18" />
                    <path d="M7 13L12 18L17 13" />
                  </svg>
                </button>

                <div className="slide-indicator">
                  <span>{activeSlide.id}</span>
                  <small>{copy.hero.scrollHint}</small>
                </div>
              </aside>

              <div className="hero-body">
                <div className="hero-emblem">
                  <CrestIcon className="crest-mark" />
                </div>

                <div className="hero-copy">
                  <div className="hero-copy-panel" key={activeSlide.id}>
                    <h1>{activeSlide.title}</h1>
                    <p className="hero-subtitle">{activeSlide.subtitle}</p>
                  </div>
                </div>

                <div className="hero-side-copy" key={`${activeSlide.id}-meta`}>
                  <strong>{activeSlide.price}</strong>
                  <p>{activeSlide.location}</p>
                </div>

                <div className="hero-stage">
                  <div className="hero-pedestal" />
                  <div className="stage-haze" />

                  {featuredSlides.map((slide, index) => {
                    const distance = index - heroMotion;
                    const absDistance = Math.abs(distance);

                    /*
                     * Dead-zone transition:
                     * - absDistance 0.0–0.30: full rest (opacity 1, no movement)
                     * - absDistance 0.30–0.70: smooth transition zone
                     * - absDistance 0.70+: fully off-screen
                     */
                    const DEAD = 0.30;
                    const TRANS = 0.40;

                    let opacity: number;
                    let translateY: number;
                    let scale: number;

                    if (absDistance <= DEAD) {
                      /* Rest zone — car is fully visible and stationary */
                      opacity = 1;
                      translateY = 0;
                      scale = 1;
                    } else if (absDistance <= DEAD + TRANS) {
                      /* Transition zone — smooth swap */
                      const progress = (absDistance - DEAD) / TRANS; /* 0→1 */
                      const eased = progress * progress * (3 - 2 * progress); /* smoothstep */
                      opacity = 1 - eased;
                      translateY = (distance > 0 ? -1 : 1) * eased * 120;
                      scale = 1 - eased * 0.04;
                    } else {
                      /* Off-screen */
                      opacity = 0;
                      translateY = distance > 0 ? -120 : 120;
                      scale = 0.96;
                    }

                    const scrollTurn = absDistance <= DEAD
                      ? 0
                      : clamp(distance * 18, -22, 22);

                    return (
                      <div
                        key={slide.id}
                        className="stage-slide"
                        style={{
                          opacity,
                          /* Keep z-index well above pedestal's 0 even when distance is large */
                          zIndex: Math.round(50 - absDistance * 10),
                          transform: `translateY(${translateY}px) scale(${scale})`,
                          pointerEvents: index === activeIndex ? "auto" : "none",
                          visibility: absDistance > DEAD + TRANS + 0.1 ? "hidden" : "visible",
                        }}
                        aria-hidden={opacity < 0.02}
                      >
                        <ModelStage
                          slide={slide}
                          priority={index === 0}
                          variant="hero"
                          scrollRotation={scrollTurn}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <footer className="hero-rail" key={`${activeSlide.id}-rail`}>
                <div className="hero-count">{activeSlide.id}</div>

                <div className="hero-stats">
                  <div className="hero-stat">
                    <strong>{activeSlide.specs.year}</strong>
                    <span>{copy.labels.year}</span>
                  </div>
                  <div className="hero-stat">
                    <strong>{activeSlide.specs.mileage}</strong>
                    <span>{copy.labels.mileage}</span>
                  </div>
                  <div className="hero-stat">
                    <strong>{activeSlide.specs.horsepower}</strong>
                    <span>{copy.labels.horsepower}</span>
                  </div>
                </div>

                <button type="button" className="details-link" onClick={() => jumpToSection("collection")}>
                  <span>{copy.hero.fullDetails}</span>
                  <span aria-hidden="true">→</span>
                </button>
              </footer>
            </div>
          </div>
        </section>

        <section ref={overviewRef} id="overview" className="content-section overview-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="section-inner"
          >
            <div className="section-heading">
              <span className="section-chip">{copy.overview.kicker}</span>
              <h2>{copy.overview.title}</h2>
              <p className="section-body">{copy.overview.body}</p>
            </div>

            <div className="overview-grid">
              {copy.overview.cards.map((card: { title: string; body: string }, idx: number) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="overview-card"
                >
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="garage" className="content-section garage-section" style={garageStyle}>
          <div className="section-inner garage-inner">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="garage-copy"
            >
              <span className="section-chip">{copy.garage.kicker}</span>
              <h2>{copy.garage.title}</h2>
              <p className="section-body">{copy.garage.body}</p>

              <div className="garage-selector-wrap">
                <span className="selector-label">{copy.garage.selectorLabel}</span>
                <div className="garage-selector">
                  {featuredSlides.map((slide, index) => (
                    <button
                      key={`garage-${slide.id}`}
                      type="button"
                      className={`garage-option ${index === garageIndex ? "is-active" : ""}`}
                      onClick={() => setGarageIndex(index)}
                    >
                      <span className="garage-option-id">{slide.id}</span>
                      <span className="garage-option-copy">
                        <strong>{slide.title}</strong>
                        <small>{slide.subtitle}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <p className="garage-hint">{copy.garage.viewHint}</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="garage-stage-wrap"
            >
              <span className="garage-badge">{copy.garage.modeLabel}</span>
              <GarageViewer slide={garageSlide} />

              <div className="garage-meta">
                <div>
                  <h3>{garageSlide.title}</h3>
                  <p>{garageSlide.subtitle}</p>
                </div>

                <div className="garage-price">
                  <strong>{garageSlide.price}</strong>
                  <span>{garageSlide.location}</span>
                </div>
              </div>

              <div className="garage-specs">
                <div className="garage-spec">
                  <strong>{garageSlide.specs.year}</strong>
                  <span>{copy.labels.year}</span>
                </div>
                <div className="garage-spec">
                  <strong>{garageSlide.specs.mileage}</strong>
                  <span>{copy.labels.mileage}</span>
                </div>
                <div className="garage-spec">
                  <strong>{garageSlide.specs.horsepower}</strong>
                  <span>{copy.labels.horsepower}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="collection" className="content-section collection-section">
          <div className="section-inner">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={revealVariants}
              className="section-heading collection-heading"
            >
              <span className="section-chip">{copy.collection.kicker}</span>
              <h2>{copy.collection.title}</h2>
              <p className="section-body">{copy.collection.body}</p>
            </motion.div>

            <div className="collection-grid">
              {featuredSlides.map((slide, index) => (
                <motion.article
                  key={`collection-${slide.id}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.7 }}
                  className={`collection-card ${index === activeIndex ? "is-active" : ""}`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className="collection-visual"
                    style={{ "--card-tint": slide.accent.top } as CSSProperties}
                  >
                    <ModelStage
                      slide={slide}
                      variant="collection"
                      hoverRotation={hoveredCard === index}
                    />
                  </div>

                  <div className="collection-content">
                    <div className="collection-header">
                      <span className="collection-badge">{slide.id}</span>
                      <div className="collection-header-text">
                        <h3>{slide.title}</h3>
                        <p>{slide.subtitle}</p>
                      </div>
                    </div>

                    <div className="collection-meta-row">
                      <span>{copy.labels.price}</span>
                      <strong>{slide.price}</strong>
                    </div>
                    <div className="collection-meta-row">
                      <span>{copy.labels.location}</span>
                      <strong>{slide.location}</strong>
                    </div>

                    <div className="collection-spec-grid">
                      <div className="collection-spec">
                        <strong>{slide.specs.year}</strong>
                        <span>{copy.labels.year}</span>
                      </div>
                      <div className="collection-spec">
                        <strong>{slide.specs.mileage}</strong>
                        <span>{copy.labels.mileage}</span>
                      </div>
                      <div className="collection-spec">
                        <strong>{slide.specs.horsepower}</strong>
                        <span>{copy.labels.horsepower}</span>
                      </div>
                    </div>

                    <button type="button" className="collection-action" onClick={() => openGarage(index)}>
                      {copy.collection.garageAction}
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="details" className="content-section details-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="section-inner details-inner"
          >
            <div className="section-heading">
              <span className="section-chip">{copy.details.kicker}</span>
              <h2>{copy.details.title}</h2>
              <p className="section-body">{copy.details.body}</p>
            </div>

            <div className="details-actions">
              <button type="button" className="primary-button" onClick={() => openGarage(activeIndex)}>
                {copy.details.primary}
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                {copy.details.secondary}
              </button>
            </div>
          </motion.div>
        </section>

        <footer id="footer" className="content-section footer-section">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-inner footer-inner"
          >
            <div className="footer-brand">
              <span className="brand-wordmark">porsche.</span>
              <p>{copy.footer.note}</p>
            </div>

            <div className="footer-links">
              {sectionLinks.map((section) => (
                <button key={section.id} type="button" className="footer-link" onClick={() => jumpToSection(section.id)}>
                  {section.label}
                </button>
              ))}
            </div>

            <div className="footer-meta">
              <p>{copy.footer.builtWith}</p>
              <p>{copy.footer.rights}</p>
            </div>
          </motion.div>
        </footer>
      </main>


    </>
  );
}
