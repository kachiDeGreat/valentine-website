import React, { useState } from "react";
import styles from "./App.module.css";
import confetti from "canvas-confetti";

// --- DATA CONFIGURATION ---
const MESSAGES: Record<string, { display: string; text: string }> = {
  eyare: {
    display: "Eyare",
    text: "They say Valentine's Day is for lovers, but I believe it's for celebrating the souls who make our lives truly beautiful. You are one of those rare people.\n\nThank you for being such an amazing friend and a constant source of light. I cherish your energy, your kindness, and the unique bond we share. You deserve all the love and happiness in the world today and always.\n\nHappy Valentine's Day, i love youuuuuuuuuuuuuuuuuuuu! 🌹",
  },
  ugomma: {
    display: "Ugomma",
    text: "I wanted to write you something that captures just how much you mean to me, but words often fall short. Knowing you for this short time has been a beautiful surprise in my life.\nYour voice (my favorite sound, make your head nor big), and your easy going life inspires me every single day. I cherish every moment we have spent together(virtually), every conversation, and every silence we share. You are truly special, a rare gem in this world, and I am so incredibly lucky to know you. Thank you for being exactly who you are. I promise to always cherish and appreciate you.\n\nHappy Valentine's Day, Ugomma. ❤️",
  },
};

export default function App() {
  const [step, setStep] = useState<"input" | "envelope">("input");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [messageData, setMessageData] = useState<{
    title: string;
    body: string;
  } | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  // --- HANDLE INPUT ---
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = name.trim().toLowerCase();

    // The "Gloria" Trap
    if (clean === "gloria" || clean === "gloriaa") {
      setErrorMsg("We don't know any Gloria. Try 'Ugomma' 😤");
      triggerShake();
      return;
    }

    // Success Check
    const data = MESSAGES[clean];
    if (data) {
      setMessageData({ title: data.display, body: data.text });
      setErrorMsg("");
      setStep("envelope");
    } else {
      setErrorMsg("Access Denied. Name not on the guest list. 🔒");
      triggerShake();
    }
  };

  const triggerShake = () => {
    const input = document.getElementById("nameInput");
    input?.classList.add(styles.shake);
    setTimeout(() => input?.classList.remove(styles.shake), 500);
  };

  // --- HANDLE ENVELOPE OPEN ---
  const handleOpenEnvelope = () => {
    setIsOpen(true);
    // Delay confetti until the envelope is fully vanished (approx 1.5s)
    setTimeout(() => {
      triggerHeartExplosion();
    }, 1500);
  };

  const triggerHeartExplosion = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        // Red, Dark Red, and White confetti
        colors: ["#e5383b", "#ba181b", "#ffffff"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#e5383b", "#ba181b", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className={styles.container}>
      {step === "input" ? (
        // --- PHASE 1: THE INPUT ---
        <div className={styles.glassCard}>
          <h1 className={styles.title}>Who goes?</h1>
          <form onSubmit={handleUnlock} className={styles.form}>
            <input
              id="nameInput"
              type="text"
              placeholder="Enter your name..."
              className={styles.input}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              autoComplete="off"
            />
            {errorMsg && <p className={styles.errorText}>{errorMsg}</p>}
            <button type="submit" className={styles.button}>
              Confirm Identity
            </button>
          </form>
        </div>
      ) : (
        // --- PHASE 2: THE SEQUENTIAL ENVELOPE ---
        <div className={styles.envelopeWrapper}>
          <div className={`${styles.envelope} ${isOpen ? styles.open : ""}`}>
            {/* The Letter Card */}
            <div className={styles.card}>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>To {messageData?.title},</h2>
                <div
                  className={styles.cardBody}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {messageData?.body}
                </div>
                <div className={styles.cardHeart}>❤️</div>
              </div>
            </div>

            {/* THE 4 FLAPS */}
            <div className={`${styles.flap} ${styles.flapTop}`}></div>
            <div className={`${styles.flap} ${styles.flapRight}`}></div>
            <div className={`${styles.flap} ${styles.flapBottom}`}></div>
            <div className={`${styles.flap} ${styles.flapLeft}`}></div>
          </div>

          {/* Controls - Disappear after opening */}
          {!isOpen && (
            <div className={styles.controls}>
              <button onClick={handleOpenEnvelope} className={styles.actionBtn}>
                OPEN GIFT 💌
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
