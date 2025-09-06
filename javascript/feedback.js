
// 3) country list & DOM wiring
document.addEventListener("DOMContentLoaded", () => {
  const countrySelect = document.getElementById("country-select");

  if (countrySelect) {
    const countries = [
      "UK", "China", "Germany", "Japan", "India", "USA", "France", "Italy",
      "Canada", "South Korea", "Russia", "Brazil", "Australia", "Mexico",
      "Spain", "Indonesia", "Netherlands", "Saudi Arabia", "Turkey", "Switzerland", "Not Found"
    ];

    countries.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      countrySelect.appendChild(opt);
    });
  } 
  const saveBtn = document.getElementById("saveBtn");
  if (saveBtn) saveBtn.addEventListener("click", saveData);
});




// 4) Collect slider values and produce zero-padded keys (Law01..Law10)

async function ensureAuth() {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not authenticated"));
      }
    });
  });
}

function collectResponses() {
  const sliders = Array.from(
    document.querySelectorAll(".all-feedback-bars input[type=range]")
  );

  const mapped = sliders.map(s => {
    const idDigits = (s.id || "").match(/\d+/);
    const idx = idDigits ? Number(idDigits[0]) : Infinity;
    return {
      idx,
      value: s.value !== undefined ? Number(s.value) : null
    };
  });

  mapped.sort((a, b) => a.idx - b.idx);

  const responses = {};
  mapped.forEach(m => {
    const key = "Law" + String(m.idx).padStart(2, "0");
    responses[key] = Number.isFinite(m.value) ? m.value : null;
  });

  return responses;
}


// 5) Save handler — everything with await is inside this async fn
async function saveData() {
  const btn = document.getElementById("saveBtn");
  const msg = document.getElementById("thankYouMessage");

  if (btn) {
    btn.disabled = true;
    btn.textContent = "Saving…";
  }

  // build the data object
  const entry = {
    name: (document.getElementById("userName")?.value || "").trim(),
    email: (document.getElementById("userEmail")?.value || "").trim(),
    country: document.getElementById("country-select")?.value || null,
    gender: document.getElementById("gender")?.value || null,
    responses: collectResponses(),
    timestamp: new Date().toISOString()
  };
  console.log("Saving entry:", entry);

  try {
    const user = await ensureAuth();
    await database.ref(`feedbacks/${user.uid}`).push(entry);

    if (msg) {
      msg.style.display = "block";
      msg.textContent = "Thank you for your feedback!";
      msg.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (btn) btn.textContent = "Feedback saved";
  } catch (err) {
    console.error("Save failed:", err);
    alert("Failed to save feedback — check console for details.");
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Save feedback";
    }
  }
}


// 6) Utility to sort response-objects (optional)
function orderResponsesNumerically(responsesObj) {
  if (!responsesObj || typeof responsesObj !== "object") return [];
  return Object.keys(responsesObj)
    .sort((a, b) => {
      const na = parseInt(a.replace(/\D/g, ""), 10);
      const nb = parseInt(b.replace(/\D/g, ""), 10);
      return (isNaN(na) ? Infinity : na) - (isNaN(nb) ? Infinity : nb);
    })
    .map(k => ({ key: k, value: responsesObj[k] }));
}


// Export for debugging if desired
window._tm = {
  collectResponses,
  orderResponsesNumerically,
  saveData
};
