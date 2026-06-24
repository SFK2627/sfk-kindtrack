<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SFK KindTrack Firebase Import</title>
  <style>
    :root {
      color-scheme: light;
      --gold: #ffcc00;
      --ink: #101010;
      --cream: #fffbea;
      --line: #d6c47a;
      --danger: #b00020;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: Arial, Helvetica, sans-serif;
      background: var(--cream);
      color: var(--ink);
      padding: 24px;
    }

    main {
      max-width: 980px;
      margin: 0 auto;
      background: #fff;
      border: 3px solid var(--ink);
      border-radius: 16px;
      box-shadow: 6px 6px 0 var(--ink);
      padding: 22px;
    }

    h1 { margin: 0 0 8px; }
    p { line-height: 1.45; }

    button {
      border: 3px solid var(--ink);
      border-radius: 999px;
      background: var(--gold);
      color: var(--ink);
      box-shadow: 4px 4px 0 var(--ink);
      font-weight: 800;
      padding: 12px 18px;
      cursor: pointer;
    }

    button:disabled {
      cursor: wait;
      opacity: .6;
    }

    .note {
      border: 1px solid var(--line);
      border-radius: 12px;
      background: #fff8cf;
      padding: 12px;
      margin: 14px 0;
    }

    pre {
      min-height: 320px;
      max-height: 520px;
      overflow: auto;
      background: #111;
      color: #fff;
      border-radius: 12px;
      padding: 14px;
      white-space: pre-wrap;
      font-size: 13px;
    }

    .error { color: var(--danger); font-weight: 800; }
  </style>
</head>
<body>
  <main>
    <h1>SFK KindTrack Firebase Import</h1>
    <p>One-time import ito mula sa existing Apps Script/Sheets data papunta sa Firestore.</p>
    <div class="note">
      After successful import, open <strong>index.html</strong>. Huwag gamitin ang Firebase Storage; Firestore lang ang kailangan dito.
    </div>
    <button id="importBtn" type="button">Import to Firebase</button>
    <pre id="log">Ready.</pre>
  </main>

  <script src="https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js"></script>
  <script src="firebase-config.js"></script>
  <script>
    const SOURCE_API_URL = "https://script.google.com/macros/s/AKfycbwS-h1ZPhGqX1AuDNiYMdVCijtEPFmdvdhjdqADhvbyLXo64Rer1wrUtgKh3Brz7Xm2KA/exec";
    const COLLECTIONS = {
      students: "kindtrack_students",
      violationTypes: "kindtrack_violation_types",
      violations: "kindtrack_violations",
      settings: "kindtrack_settings",
      attendance: "kindtrack_attendance"
    };

    const importBtn = document.getElementById("importBtn");
    const logEl = document.getElementById("log");
    const db = firebase.firestore();

    function log(message) {
      logEl.textContent += "\n" + message;
      logEl.scrollTop = logEl.scrollHeight;
    }

    function docId(value, fallback) {
      const raw = String(value || fallback || "").trim() || `DOC-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      return raw.replace(/[\\/#?[\]]/g, "_").slice(0, 140);
    }

    function withoutUndefined(row) {
      const output = {};
      Object.keys(row || {}).forEach((key) => {
        if (row[key] !== undefined) output[key] = row[key];
      });
      return output;
    }

    async function writeCollection(collectionName, rows, getId) {
      let count = 0;
      let batch = db.batch();

      for (const row of rows) {
        count++;
        const id = docId(getId(row, count), `${collectionName}-${count}`);
        batch.set(db.collection(collectionName).doc(id), {
          ...withoutUndefined(row),
          __order: count,
          __importedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        if (count % 450 === 0) {
          await batch.commit();
          log(`${collectionName}: ${count} row(s) written...`);
          batch = db.batch();
        }
      }

      await batch.commit();
      log(`${collectionName}: ${count} row(s) imported.`);
      return count;
    }

    async function runImport() {
      importBtn.disabled = true;
      logEl.textContent = "Reading Apps Script data...";

      try {
        const response = await fetch(SOURCE_API_URL);
        if (!response.ok) throw new Error(`Apps Script request failed: ${response.status}`);
        const data = await response.json();

        await writeCollection(COLLECTIONS.students, Array.isArray(data.students) ? data.students : [], (row) => row.StudentID);
        await writeCollection(COLLECTIONS.violationTypes, Array.isArray(data.violationTypes) ? data.violationTypes : [], (row) => row.ViolationID || row.ViolationName);
        await writeCollection(COLLECTIONS.violations, Array.isArray(data.violations) ? data.violations : [], (row) => row.RecordID);
        await writeCollection(COLLECTIONS.settings, Array.isArray(data.settings) ? data.settings : [], (row, index) => row.Key || row.Setting || `setting-${index}`);
        await writeCollection(COLLECTIONS.attendance, Array.isArray(data.attendance) ? data.attendance : [], (row) => row.AttendanceID || `${row.Date}-${row.StudentID}`);

        log("Done. You can now open index.html using Firebase.");
      } catch (error) {
        console.error(error);
        logEl.innerHTML += `\n<span class="error">Error: ${String(error.message || error)}</span>`;
      } finally {
        importBtn.disabled = false;
      }
    }

    importBtn.addEventListener("click", runImport);
  </script>
</body>
</html>
