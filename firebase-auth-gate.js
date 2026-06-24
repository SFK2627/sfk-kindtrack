(function setupKindTrackAuthGate() {
  const APP_SCRIPTS = ["firebase-adapter.js", "script.js"];
  let appLoaded = false;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Unable to load ${src}`));
      document.body.appendChild(script);
    });
  }

  async function loadKindTrackApp() {
    if (appLoaded) return;
    appLoaded = true;

    for (const src of APP_SCRIPTS) {
      await loadScript(src);
    }
  }

  function ensureOverlay() {
    let overlay = document.getElementById("kindTrackAuthGate");
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.id = "kindTrackAuthGate";
    overlay.innerHTML = `
      <div class="kindtrack-auth-card">
        <div class="kindtrack-auth-logo">SFK</div>
        <h1>SFK KindTrack Login</h1>
        <p>Sign in first to open the KindTrack records.</p>

        <form id="kindTrackLoginForm">
          <label>
            Email
            <input id="kindTrackLoginEmail" type="email" autocomplete="username" required />
          </label>

          <label>
            Password
            <input id="kindTrackLoginPassword" type="password" autocomplete="current-password" required />
          </label>

          <button id="kindTrackLoginButton" type="submit">Sign In</button>
        </form>

        <p id="kindTrackLoginMessage" class="kindtrack-auth-message"></p>
      </div>
    `;

    const style = document.createElement("style");
    style.textContent = `
      #kindTrackAuthGate {
        position: fixed;
        inset: 0;
        z-index: 99999;
        display: grid;
        place-items: center;
        padding: 18px;
        background:
          linear-gradient(rgba(255, 251, 234, .94), rgba(255, 251, 234, .94)),
          repeating-linear-gradient(0deg, transparent 0 31px, rgba(0, 0, 0, .05) 31px 32px),
          repeating-linear-gradient(90deg, transparent 0 31px, rgba(0, 0, 0, .05) 31px 32px);
        font-family: Arial, Helvetica, sans-serif;
        color: #101010;
      }

      .kindtrack-auth-card {
        width: min(420px, 100%);
        border: 3px solid #101010;
        border-radius: 16px;
        background: #fff;
        box-shadow: 7px 7px 0 #101010;
        padding: 24px;
      }

      .kindtrack-auth-logo {
        width: 54px;
        height: 54px;
        display: grid;
        place-items: center;
        border: 3px solid #101010;
        border-radius: 14px;
        background: #ffcc00;
        box-shadow: 4px 4px 0 #101010;
        font-weight: 900;
        margin-bottom: 14px;
      }

      .kindtrack-auth-card h1 {
        margin: 0 0 6px;
        font-size: 28px;
      }

      .kindtrack-auth-card p {
        margin: 0 0 18px;
      }

      #kindTrackLoginForm {
        display: grid;
        gap: 12px;
      }

      #kindTrackLoginForm label {
        display: grid;
        gap: 6px;
        font-weight: 800;
      }

      #kindTrackLoginForm input {
        width: 100%;
        border: 2px solid #101010;
        border-radius: 10px;
        padding: 12px;
        font: inherit;
      }

      #kindTrackLoginButton,
      #kindTrackSignOutButton {
        border: 3px solid #101010;
        border-radius: 999px;
        background: #ffcc00;
        color: #101010;
        box-shadow: 4px 4px 0 #101010;
        font-weight: 900;
        padding: 12px 16px;
        cursor: pointer;
      }

      #kindTrackLoginButton:disabled {
        opacity: .65;
        cursor: wait;
      }

      .kindtrack-auth-message {
        min-height: 20px;
        margin-top: 14px !important;
        color: #b00020;
        font-weight: 800;
      }

      #kindTrackSignOutButton {
        position: fixed;
        right: 14px;
        bottom: 14px;
        z-index: 9999;
        padding: 9px 12px;
        font-size: 12px;
        box-shadow: 3px 3px 0 #101010;
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);

    const form = document.getElementById("kindTrackLoginForm");
    const email = document.getElementById("kindTrackLoginEmail");
    const password = document.getElementById("kindTrackLoginPassword");
    const button = document.getElementById("kindTrackLoginButton");
    const message = document.getElementById("kindTrackLoginMessage");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      message.textContent = "";
      button.disabled = true;
      button.textContent = "Signing in...";

      try {
        await firebase.auth().signInWithEmailAndPassword(email.value.trim(), password.value);
      } catch (error) {
        message.textContent = "Login failed. Check email/password.";
        console.error("KindTrack login error:", error);
      } finally {
        button.disabled = false;
        button.textContent = "Sign In";
      }
    });

    return overlay;
  }

  function addSignOutButton() {
    if (document.getElementById("kindTrackSignOutButton")) return;

    const button = document.createElement("button");
    button.id = "kindTrackSignOutButton";
    button.type = "button";
    button.textContent = "Sign out";
    button.addEventListener("click", () => firebase.auth().signOut());
    document.body.appendChild(button);
  }

  function removeSignOutButton() {
    const button = document.getElementById("kindTrackSignOutButton");
    if (button) button.remove();
  }

  if (!window.firebase || !firebase.auth) {
    console.error("Firebase Auth SDK is not loaded.");
    return;
  }

  ensureOverlay();

  firebase.auth().onAuthStateChanged((user) => {
    const overlay = ensureOverlay();

    if (!user) {
      overlay.style.display = "grid";
      removeSignOutButton();
      return;
    }

    overlay.style.display = "none";
    addSignOutButton();
    loadKindTrackApp().catch((error) => {
      overlay.style.display = "grid";
      const message = document.getElementById("kindTrackLoginMessage");
      if (message) message.textContent = error.message || "Unable to load app.";
      console.error(error);
    });
  });
})();
