// src/components/AccessibilityWidget.js
import React, { useState, useEffect } from "react";
import "./AccessibilityWidget.css";

const AccessibilityWidget = () => {
  const [open, setOpen] = useState(false);

  const [fontSize, setFontSize] = useState(100); // %
  const [highContrast, setHighContrast] = useState(false);
  const [textSpacing, setTextSpacing] = useState(0); // px
  const [hideImages, setHideImages] = useState(false);

  const [readableFont, setReadableFont] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [readingMode, setReadingMode] = useState(false);

  // === EFFECTS ===

  // Font size
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  // High contrast
  useEffect(() => {
    document.body.classList.toggle("a11y-high-contrast", highContrast);
  }, [highContrast]);

  // Text spacing
  useEffect(() => {
    const spacing = textSpacing ? `${textSpacing}px` : "";
    document.body.style.letterSpacing = spacing;
    document.body.style.wordSpacing = spacing;
    document.body.style.lineHeight = textSpacing ? "1.8" : "";
  }, [textSpacing]);

  // Hide images
  useEffect(() => {
    const imgs = document.querySelectorAll("img");
    imgs.forEach((img) => {
      if (hideImages) {
        if (!img.dataset.originalDisplay) {
          img.dataset.originalDisplay = img.style.display || "";
        }
        img.style.display = "none";
      } else {
        if (img.dataset.originalDisplay !== undefined) {
          img.style.display = img.dataset.originalDisplay;
        } else {
          img.style.display = "";
        }
      }
    });
  }, [hideImages]);

  // Readable font
  useEffect(() => {
    document.body.classList.toggle("a11y-readable-font", readableFont);
  }, [readableFont]);

  // Highlight links
  useEffect(() => {
    document.body.classList.toggle("a11y-highlight-links", highlightLinks);
  }, [highlightLinks]);

  // Reading mode
  useEffect(() => {
    document.body.classList.toggle("a11y-reading-mode", readingMode);
  }, [readingMode]);

  const increaseFont = () => setFontSize((prev) => Math.min(prev + 10, 180));
  const decreaseFont = () => setFontSize((prev) => Math.max(prev - 10, 70));

  const resetAll = () => {
    setFontSize(100);
    setHighContrast(false);
    setTextSpacing(0);
    setHideImages(false);
    setReadableFont(false);
    setHighlightLinks(false);
    setReadingMode(false);
  };

  return (
    <>
      {/* Floating button next to WhatsApp button */}
      <button
        className="a11yFloatingBtn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="אפשרויות נגישות"
      >
        ♿
      </button>

      {open && (
        <div
          className="a11y-panel-fixed"
          role="dialog"
          aria-modal="false"
          dir="rtl"
        >
          <h2 className="a11y-title">מרכז נגישות</h2>

          {/* גודל טקסט */}
          <div className="a11y-group">
            <span className="a11y-label">גודל טקסט</span>
            <div className="a11y-actions">
              <button
                type="button"
                onClick={decreaseFont}
                aria-label="הקטנת טקסט"
              >
                A-
              </button>
              <button
                type="button"
                onClick={increaseFont}
                aria-label="הגדלת טקסט"
              >
                A+
              </button>
              <span className="a11y-small-info">{fontSize}%</span>
            </div>
          </div>

          {/* ניגודיות גבוהה */}
          <div className="a11y-group">
            <label>
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
              />{" "}
              ניגודיות גבוהה
            </label>
          </div>

          {/* מרווח טקסט */}
          <div className="a11y-group">
            <label htmlFor="a11y-spacing">מרווח טקסט</label>
            <input
              id="a11y-spacing"
              type="range"
              min="0"
              max="4"
              value={textSpacing}
              onChange={(e) => setTextSpacing(Number(e.target.value))}
            />
          </div>

          {/* הסתרת תמונות */}
          <div className="a11y-group">
            <label>
              <input
                type="checkbox"
                checked={hideImages}
                onChange={(e) => setHideImages(e.target.checked)}
              />{" "}
              הסתרת תמונות
            </label>
          </div>

          <hr className="a11y-separator" />

          {/* גופן קריא */}
          <div className="a11y-group">
            <label>
              <input
                type="checkbox"
                checked={readableFont}
                onChange={(e) => setReadableFont(e.target.checked)}
              />{" "}
              גופן קריא יותר
            </label>
          </div>

          {/* הדגשת קישורים */}
          <div className="a11y-group">
            <label>
              <input
                type="checkbox"
                checked={highlightLinks}
                onChange={(e) => setHighlightLinks(e.target.checked)}
              />{" "}
              הדגשת קישורים
            </label>
          </div>

          {/* מצב קריאה */}
          <div className="a11y-group">
            <label>
              <input
                type="checkbox"
                checked={readingMode}
                onChange={(e) => setReadingMode(e.target.checked)}
              />{" "}
              מצב קריאה (טקסט צר במרכז)
            </label>
          </div>

          <button type="button" className="a11y-reset" onClick={resetAll}>
            איפוס הגדרות
          </button>
        </div>
      )}
    </>
  );
};

export default AccessibilityWidget;
