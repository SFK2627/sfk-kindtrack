const API_URL = "https://script.google.com/macros/s/AKfycbwS-h1ZPhGqX1AuDNiYMdVCijtEPFmdvdhjdqADhvbyLXo64Rer1wrUtgKh3Brz7Xm2KA/exec";

let violationFees = [];
let students = [];
let selectedStudent = null;
let feesVisible = true;
let selectedTerm = "all";
let attendanceRecords = [];
let attendanceByDate = {};
let attendanceMarkMode = "Absent";
const ATTENDANCE_STATUSES = ["Present", "Absent", "Excused", "Tardy"];

const ADMIN_PASSCODE = "SFK2026";
let appMode = null;


const accessScreen = document.getElementById("accessScreen");
const appRoot = document.getElementById("appRoot");
const viewOnlyBtn = document.getElementById("viewOnlyBtn");
const showAdminLoginBtn = document.getElementById("showAdminLoginBtn");
const adminLoginForm = document.getElementById("adminLoginForm");
const adminPasscode = document.getElementById("adminPasscode");
const accessMessage = document.getElementById("accessMessage");
const modeLabel = document.getElementById("modeLabel");
const modeDescription = document.getElementById("modeDescription");
const logoutAccessBtn = document.getElementById("logoutAccessBtn");
const quickAddViolationBtn = document.getElementById("quickAddViolationBtn");
const quickAttendanceBtn = document.getElementById("quickAttendanceBtn");
const quickSummaryBtn = document.getElementById("quickSummaryBtn");
const quickPrintAllBtn = document.getElementById("quickPrintAllBtn");

const studentList = document.getElementById("studentList");
const violationList = document.getElementById("violationList");
const selectedName = document.getElementById("selectedName");
const studentSummary = document.getElementById("studentSummary");
const studentDetailsModal = document.getElementById("studentDetailsModal");
const modalSelectedName = document.getElementById("modalSelectedName");
const modalStudentSummary = document.getElementById("modalStudentSummary");
const modalViolationFilter = document.getElementById("modalViolationFilter");
const modalViolationList = document.getElementById("modalViolationList");
const closeStudentDetailsModal = document.getElementById("closeStudentDetailsModal");
const studentSort = document.getElementById("studentSort");
const studentSearch = document.getElementById("studentSearch");
const violationFilter = document.getElementById("violationFilter");
const feeToggle = document.getElementById("feeToggle");
const feePanel = document.getElementById("feePanel");
const panelToggle = document.getElementById("panelToggle");
const alertList = document.getElementById("alertList");
const termFilter = document.getElementById("termFilter");
const currentTermLabel = document.getElementById("currentTermLabel");
const termSummaryLabel = document.getElementById("termSummaryLabel");
const termSummaryList = document.getElementById("termSummaryList");
const openTermSummaryBtn = document.getElementById("openTermSummaryBtn");
const termSummaryModal = document.getElementById("termSummaryModal");
const closeTermSummaryModal = document.getElementById("closeTermSummaryModal");

const attendanceDate = document.getElementById("attendanceDate");
const attendanceQuickSummary = document.getElementById("attendanceQuickSummary");
const attendanceModal = document.getElementById("attendanceModal");
const openAttendanceModalBtn = document.getElementById("openAttendanceModalBtn");
const closeAttendanceModal = document.getElementById("closeAttendanceModal");
const attendanceSearch = document.getElementById("attendanceSearch");
const attendanceFilter = document.getElementById("attendanceFilter");
const attendanceSort = document.getElementById("attendanceSort");
const attendanceSummary = document.getElementById("attendanceSummary");
const attendanceStatusModal = document.getElementById("attendanceStatusModal");
const attendanceStatusTitle = document.getElementById("attendanceStatusTitle");
const attendanceStatusSubtitle = document.getElementById("attendanceStatusSubtitle");
const attendanceStatusList = document.getElementById("attendanceStatusList");
const closeAttendanceStatusModal = document.getElementById("closeAttendanceStatusModal");
const attendanceBoardTitle = document.getElementById("attendanceBoardTitle");
const attendanceBoardDate = document.getElementById("attendanceBoardDate");
const attendanceShowAll = document.getElementById("attendanceShowAll");
const attendanceBoardList = document.getElementById("attendanceBoardList");
const attendanceList = document.getElementById("attendanceList");
const attendanceMessage = document.getElementById("attendanceMessage");
const saveAttendanceBtn = document.getElementById("saveAttendanceBtn");
const printAttendanceBtn = document.getElementById("printAttendanceBtn");
const printMonthlyAttendanceBtn = document.getElementById("printMonthlyAttendanceBtn");
const todayAttendanceBtn = document.getElementById("todayAttendanceBtn");
const attendanceMonth = document.getElementById("attendanceMonth");
const monthlyAttendanceList = document.getElementById("monthlyAttendanceList");
const attendanceMarkModeButtons = document.querySelectorAll("[data-attendance-mode]");

const addForm = document.getElementById("addViolationForm");
const addStudent = document.getElementById("addStudent");
const addViolationType = document.getElementById("addViolationType");
const addStatus = document.getElementById("addStatus");
const addActionTaken = document.getElementById("addActionTaken");
const addReflection = document.getElementById("addReflection");
const addFollowUpDate = document.getElementById("addFollowUpDate");
const addFollowUpStatus = document.getElementById("addFollowUpStatus");
const addParentContacted = document.getElementById("addParentContacted");
const addDate = document.getElementById("addDate");
const addNotes = document.getElementById("addNotes");
const addMessage = document.getElementById("addMessage");

const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editViolationForm");
const editRecordId = document.getElementById("editRecordId");
const editViolationType = document.getElementById("editViolationType");
const editStatus = document.getElementById("editStatus");
const editActionTaken = document.getElementById("editActionTaken");
const editReflection = document.getElementById("editReflection");
const editFollowUpDate = document.getElementById("editFollowUpDate");
const editFollowUpStatus = document.getElementById("editFollowUpStatus");
const editParentContacted = document.getElementById("editParentContacted");
const editDate = document.getElementById("editDate");
const editNotes = document.getElementById("editNotes");
const closeEditModal = document.getElementById("closeEditModal");

const deleteModal = document.getElementById("deleteModal");
const deleteRecordId = document.getElementById("deleteRecordId");
const closeDeleteModal = document.getElementById("closeDeleteModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

const addPanel = document.getElementById("addPanel");
const addPanelToggle = document.getElementById("addPanelToggle");

const printRecordBtn = document.getElementById("printRecordBtn");
const printOptionsModal = document.getElementById("printOptionsModal");
const printIncludeFees = document.getElementById("printIncludeFees");
const printIncludeStatus = document.getElementById("printIncludeStatus");
const printIncludeAction = document.getElementById("printIncludeAction");
const printIncludeReflection = document.getElementById("printIncludeReflection");
const printIncludeFollowUp = document.getElementById("printIncludeFollowUp");
const printIncludeParent = document.getElementById("printIncludeParent");
const printIncludeNotes = document.getElementById("printIncludeNotes");
const closePrintOptionsModal = document.getElementById("closePrintOptionsModal");
const confirmPrintBtn = document.getElementById("confirmPrintBtn");

const printAllBtn = document.getElementById("printAllBtn");
const printAllOptionsModal = document.getElementById("printAllOptionsModal");
const printAllIncludeNoViolations = document.getElementById("printAllIncludeNoViolations");
const printAllIncludeFees = document.getElementById("printAllIncludeFees");
const printAllIncludeStatus = document.getElementById("printAllIncludeStatus");
const printAllIncludeAction = document.getElementById("printAllIncludeAction");
const printAllIncludeReflection = document.getElementById("printAllIncludeReflection");
const printAllIncludeFollowUp = document.getElementById("printAllIncludeFollowUp");
const printAllIncludeParent = document.getElementById("printAllIncludeParent");
const printAllIncludeNotes = document.getElementById("printAllIncludeNotes");
const printAllPageBreak = document.getElementById("printAllPageBreak");
const closePrintAllOptionsModal = document.getElementById("closePrintAllOptionsModal");
const confirmPrintAllBtn = document.getElementById("confirmPrintAllBtn");


function initAccessGate() {
  if (!accessScreen || !appRoot) {
    loadDataFromSheets();
    return;
  }

  document.body.classList.add("access-active");

  if (viewOnlyBtn) {
    viewOnlyBtn.addEventListener("click", () => {
      openKindTrack("view");
    });
  }

  if (showAdminLoginBtn && adminLoginForm && adminPasscode) {
    showAdminLoginBtn.addEventListener("click", () => {
      adminLoginForm.classList.remove("hidden");
      adminPasscode.focus();
      if (accessMessage) accessMessage.textContent = "";
    });
  }

  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", event => {
      event.preventDefault();

      const passcode = adminPasscode ? adminPasscode.value.trim() : "";

      if (passcode === ADMIN_PASSCODE) {
        openKindTrack("admin");
      } else {
        if (accessMessage) {
          accessMessage.textContent = "Incorrect passcode. Please try again.";
        }

        if (adminPasscode) {
          adminPasscode.value = "";
          adminPasscode.focus();
        }
      }
    });
  }

  if (logoutAccessBtn) {
    logoutAccessBtn.addEventListener("click", resetAccessGate);
  }
}

function openKindTrack(mode) {
  appMode = mode;

  document.body.classList.remove("access-active", "view-only-mode", "admin-mode");
  document.body.classList.add(mode === "admin" ? "admin-mode" : "view-only-mode");

  if (mode === "view") {
    document.body.classList.remove("hide-fees");
    feesVisible = true;

    if (feeToggle) {
      feeToggle.textContent = "Hide Fees";
    }

    if (modeLabel) modeLabel.textContent = "View Only Mode";
    if (modeDescription) {
      modeDescription.textContent = "Records are viewable. Editing, printing, and fee details are locked.";
    }
  } else {
    document.body.classList.remove("hide-fees");
    feesVisible = true;

    if (feeToggle) {
      feeToggle.textContent = "Hide Fees";
    }

    if (modeLabel) modeLabel.textContent = "Admin Mode";
    if (modeDescription) {
      modeDescription.textContent = "Full access: add, edit, delete, print, and manage records.";
    }
  }

  if (accessScreen) {
    accessScreen.classList.add("hidden");
  }

  if (appRoot) {
    appRoot.classList.remove("hidden");
  }

  loadDataFromSheets();
}

function resetAccessGate() {
  appMode = null;
  selectedStudent = null;

  if (appRoot) {
    appRoot.classList.add("hidden");
  }

  if (accessScreen) {
    accessScreen.classList.remove("hidden");
  }

  document.body.classList.add("access-active");
  document.body.classList.remove("view-only-mode", "admin-mode", "hide-fees");

  feesVisible = true;

  if (feeToggle) {
    feeToggle.textContent = "Hide Fees";
  }

  if (adminPasscode) {
    adminPasscode.value = "";
  }

  if (adminLoginForm) {
    adminLoginForm.classList.add("hidden");
  }

  if (accessMessage) {
    accessMessage.textContent = "";
  }
}

async function loadDataFromSheets() {
  try {
    studentList.innerHTML = `<p class="empty-message">Loading records... 🐨</p>`;

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Sheets request failed: ${response.status}`);
    }

    const data = await response.json();

    const sheetStudents = Array.isArray(data.students) ? data.students : [];
    const sheetViolationTypes = Array.isArray(data.violationTypes) ? data.violationTypes : [];
    const sheetViolations = Array.isArray(data.violations) ? data.violations : [];
    const sheetAttendance = Array.isArray(data.attendance) ? data.attendance : [];

    violationFees = sheetViolationTypes.map(v => ({
      id: v.ViolationID,
      name: v.ViolationName,
      fee: Number(v.Fee) || 0,
      threshold: Number(v.AlertThreshold) || 3,
      category: v.Category || ""
    }));

    const violationsByStudent = {};

    sheetViolations.forEach(v => {
      const typeInfo = violationFees.find(type =>
        type.id === v.ViolationType || type.name === v.ViolationType
      );

      const item = {
        recordId: v.RecordID,
        date: formatDate(v.Date),
        type: typeInfo ? typeInfo.name : v.ViolationType,
        fee: Number(v.Fee) || (typeInfo ? typeInfo.fee : 0),
        status: v.Status || "Unpaid",
        actionTaken: v.ActionTaken || v["Action Taken"] || "",
        reflection: v.ReflectionCommitment || v.Reflection || v["Reflection / Commitment"] || "",
        followUpDate: formatDate(v.FollowUpDate || v["Follow-up Date"] || ""),
        followUpStatus: v.FollowUpStatus || v["Follow-up Status"] || "Pending",
        parentContacted: v.ParentContacted || v["Parent Contacted"] || "No",
        notes: v.Notes || ""
      };

      if (!violationsByStudent[v.StudentID]) {
        violationsByStudent[v.StudentID] = [];
      }

      violationsByStudent[v.StudentID].push(item);
    });

    students = sheetStudents.map(student => {
      const normalizedStudent = normalizeKeys(student);
      const studentId = normalizedStudent.studentid || student.StudentID || "";
      const firstName = normalizedStudent.firstname || student.FirstName || "";
      const lastName = normalizedStudent.lastname || student.LastName || "";

      return {
        id: studentId,
        firstName,
        lastName,
        name: `${lastName || ""}, ${firstName || ""}`.trim(),
        section: normalizedStudent.section || student.Section || "",
        gender: normalizedStudent.gender || normalizedStudent.sex || "",
        violations: violationsByStudent[studentId] || []
      };
    });

    attendanceRecords = sheetAttendance.map(record => ({
      attendanceId: record.AttendanceID || "",
      studentId: record.StudentID || "",
      date: formatDate(record.Date),
      status: ATTENDANCE_STATUSES.includes(record.Status) ? record.Status : "Present",
      remarks: record.Remarks || ""
    }));

    rebuildAttendanceIndex();

    if (selectedStudent) {
      selectedStudent = students.find(s => s.id === selectedStudent.id) || null;
    }

    renderAll();
    renderAttendanceSafely();
    populateAddForm();

  } catch (error) {
    console.error("Error loading data:", error);
    studentList.innerHTML = `<p class="empty-message">Unable to load Google Sheets data. 🐨</p>`;
    showToast("❌ Unable to load records.");
  }
}

function renderAll() {
  renderTermLabel();
  renderDashboard();
  renderTermSummary();
  renderAlertCenter();
  renderStudents();
  renderFeeList();
  renderViolationList();

  if (selectedStudent) {
    renderStudentDetails();
  }
}

function renderAttendanceSafely() {
  try {
    renderAttendance();
    renderAttendanceQuickSummary();
    renderMonthlyAttendance();
  } catch (error) {
    console.error("Attendance render error:", error);

    if (attendanceQuickSummary) {
      attendanceQuickSummary.innerHTML = `
        <span>Present: -</span>
        <span>Absent: -</span>
        <span>Excused: -</span>
        <span>Tardy: -</span>
        <span>Total: -</span>
      `;
    }
  }
}

function formatDate(dateValue) {
  if (!dateValue) return "";

  const date = new Date(dateValue);
  if (isNaN(date)) return dateValue;

  return date.toISOString().split("T")[0];
}

function showToast(message) {
  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}


function getTermInfo(termValue = selectedTerm) {
  const terms = {
    all: {
      label: "All Terms",
      range: "All recorded violations"
    },
    term1: {
      label: "1st Term",
      range: "June 1 – September 9"
    },
    term2: {
      label: "2nd Term",
      range: "September 10 – December 15"
    },
    term3: {
      label: "3rd Term",
      range: "January 4 – April 3"
    }
  };

  return terms[termValue] || terms.all;
}

function getTermLabel(termValue = selectedTerm) {
  const term = getTermInfo(termValue);
  return termValue === "all" ? term.label : `${term.label}: ${term.range}`;
}

function renderTermLabel() {
  if (currentTermLabel) {
    currentTermLabel.textContent = getTermLabel();
  }
}

function getMonthDayKey(dateValue) {
  if (!dateValue) return null;

  const textDate = String(dateValue).trim();
  const match = textDate.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (match) {
    return Number(match[2]) * 100 + Number(match[3]);
  }

  const date = new Date(dateValue);
  if (isNaN(date)) return null;

  return (date.getMonth() + 1) * 100 + date.getDate();
}

function isViolationInTerm(violation, termValue = selectedTerm) {
  if (termValue === "all") return true;

  const key = getMonthDayKey(violation.date);
  if (!key) return false;

  if (termValue === "term1") return key >= 601 && key <= 909;
  if (termValue === "term2") return key >= 910 && key <= 1215;
  if (termValue === "term3") return key >= 104 && key <= 403;

  return true;
}

function getVisibleViolations(student) {
  if (!student || !Array.isArray(student.violations)) return [];
  return student.violations.filter(violation =>
    isViolationInTerm(violation, selectedTerm)
  );
}

function getRepeatedViolation(student) {
  const count = {};
  const violations = getVisibleViolations(student);

  violations.forEach(v => {
    count[v.type] = (count[v.type] || 0) + 1;
  });

  return Object.entries(count).find(([_, total]) => total >= 3);
}

function getLatestViolationDate(student) {
  const violations = getVisibleViolations(student);

  if (violations.length === 0) return 0;
  return Math.max(...violations.map(v => new Date(v.date).getTime()));
}

function hasAlert(student) {
  const violations = getVisibleViolations(student);
  return violations.length >= 5 || getRepeatedViolation(student);
}

function getStudentStatus(student) {
  const total = getVisibleViolations(student).length;
  const repeated = getRepeatedViolation(student);

  if (total >= 5) return { label: "Needs Support", className: "support", icon: "🔴" };
  if (total >= 3 || repeated) return { label: "Needs Guidance", className: "guidance", icon: "🟡" };

  return { label: "On Track", className: "track", icon: "🟢" };
}

function getGenderRank(student) {
  const gender = String(student.gender || "").trim().toLowerCase();

  if (["boy", "boys", "male", "m", "b", "lalaki", "men", "man"].includes(gender)) return 0;
  if (["girl", "girls", "female", "f", "g", "babae", "women", "woman"].includes(gender)) return 1;

  return 2;
}

function sortByName(a, b) {
  return a.lastName.localeCompare(b.lastName) ||
    a.firstName.localeCompare(b.firstName) ||
    a.name.localeCompare(b.name);
}

function sortByGenderThenName(a, b) {
  return getGenderRank(a) - getGenderRank(b) || sortByName(a, b);
}

function getSortedStudents() {
  const sortValue = studentSort.value;
  const searchValue = studentSearch.value.toLowerCase().trim();

  let sorted = [...students];

  if (searchValue) {
    sorted = sorted.filter(student =>
      student.name.toLowerCase().includes(searchValue)
    );
  }

  if (sortValue === "az") {
    sorted.sort(sortByName);
  }

  if (sortValue === "boysGirls") {
    sorted.sort(sortByGenderThenName);
  }

  if (sortValue === "most") {
    sorted.sort((a, b) =>
      (getVisibleViolations(b).length - getVisibleViolations(a).length) ||
      a.lastName.localeCompare(b.lastName) ||
      a.firstName.localeCompare(b.firstName)
    );
  }

  if (sortValue === "newest") {
    sorted.sort((a, b) =>
      (getLatestViolationDate(b) - getLatestViolationDate(a)) ||
      a.lastName.localeCompare(b.lastName) ||
      a.firstName.localeCompare(b.firstName)
    );
  }

  if (sortValue === "alerts") {
    sorted = sorted
      .filter(student => hasAlert(student))
      .sort((a, b) =>
        a.lastName.localeCompare(b.lastName) ||
        a.firstName.localeCompare(b.firstName)
      );
  }

  return sorted;
}

function getTodayISO() {
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today.toISOString().split("T")[0];
}

function getCurrentMonthISO() {
  return getTodayISO().slice(0, 7);
}

function formatDisplayDate(dateValue) {
  if (!dateValue) return "";

  const date = new Date(`${dateValue}T00:00:00`);
  if (isNaN(date)) return dateValue;

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function escapeHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeKey(key) {
  return String(key || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeKeys(obj) {
  const normalized = {};

  Object.keys(obj || {}).forEach(key => {
    normalized[normalizeKey(key)] = obj[key];
  });

  return normalized;
}

function ensureAttendanceDefaults() {
  if (attendanceDate && !attendanceDate.value) {
    attendanceDate.value = getTodayISO();
  }

  if (attendanceMonth && !attendanceMonth.value) {
    attendanceMonth.value = getCurrentMonthISO();
  }
}

function rebuildAttendanceIndex() {
  attendanceByDate = {};

  attendanceRecords.forEach(record => {
    if (!record.date || !record.studentId) return;

    if (!attendanceByDate[record.date]) {
      attendanceByDate[record.date] = {};
    }

    attendanceByDate[record.date][record.studentId] = {
      status: ATTENDANCE_STATUSES.includes(record.status) ? record.status : "Present",
      remarks: record.remarks || "",
      attendanceId: record.attendanceId || ""
    };
  });
}

function getAttendanceDateValue() {
  ensureAttendanceDefaults();
  return attendanceDate ? attendanceDate.value : getTodayISO();
}

function getAttendanceEntry(studentId, dateValue = getAttendanceDateValue()) {
  const dateRecords = attendanceByDate[dateValue] || {};

  return dateRecords[studentId] || {
    status: "Present",
    remarks: "",
    attendanceId: ""
  };
}

function setLocalAttendance(studentId, updates) {
  const dateValue = getAttendanceDateValue();

  if (!attendanceByDate[dateValue]) {
    attendanceByDate[dateValue] = {};
  }

  const current = getAttendanceEntry(studentId, dateValue);

  attendanceByDate[dateValue][studentId] = {
    ...current,
    ...updates
  };
}

function getAttendanceRowsForDate(dateValue = getAttendanceDateValue()) {
  return students.map(student => {
    const entry = getAttendanceEntry(student.id, dateValue);

    return {
      student,
      status: ATTENDANCE_STATUSES.includes(entry.status) ? entry.status : "Present",
      remarks: entry.remarks || "",
      attendanceId: entry.attendanceId || ""
    };
  });
}

function getAttendanceCounts(rows) {
  const counts = {
    Present: 0,
    Absent: 0,
    Excused: 0,
    Tardy: 0
  };

  rows.forEach(row => {
    counts[row.status] = (counts[row.status] || 0) + 1;
  });

  return counts;
}

function renderAttendanceSummary(rows) {
  if (!attendanceSummary) return;

  const counts = getAttendanceCounts(rows);

  attendanceSummary.innerHTML = `
    <button type="button" data-attendance-status="Present">Present: ${counts.Present}</button>
    <button type="button" data-attendance-status="Absent">Absent: ${counts.Absent}</button>
    <button type="button" data-attendance-status="Excused">Excused: ${counts.Excused}</button>
    <button type="button" data-attendance-status="Tardy">Tardy: ${counts.Tardy}</button>
    <button type="button" data-attendance-status="all">Total: ${rows.length}</button>
  `;
}

function renderAttendanceQuickSummary() {
  if (!attendanceQuickSummary) return;

  const rows = getAttendanceRowsForDate(getTodayISO());
  const counts = getAttendanceCounts(rows);

  attendanceQuickSummary.innerHTML = `
    <button type="button" data-attendance-status="Present">Present: ${counts.Present}</button>
    <button type="button" data-attendance-status="Absent">Absent: ${counts.Absent}</button>
    <button type="button" data-attendance-status="Excused">Excused: ${counts.Excused}</button>
    <button type="button" data-attendance-status="Tardy">Tardy: ${counts.Tardy}</button>
    <button type="button" data-attendance-status="all">Total: ${rows.length}</button>
  `;
}

function renderAttendanceBoard(rows) {
  if (!attendanceBoardList) return;

  const dateValue = getAttendanceDateValue();
  const showAll = attendanceShowAll ? attendanceShowAll.checked : false;
  const groupOrder = showAll
    ? ["Absent", "Tardy", "Excused", "Present"]
    : ["Absent", "Tardy", "Excused"];

  if (attendanceBoardTitle) {
    attendanceBoardTitle.textContent =
      dateValue === getTodayISO() ? "Today's Attendance" : "Selected Date Attendance";
  }

  if (attendanceBoardDate) {
    attendanceBoardDate.textContent = formatDisplayDate(dateValue);
  }

  const groups = groupOrder.map(status => {
    const matching = rows.filter(row => row.status === status);

    return `
      <div class="attendance-group ${status.toLowerCase()}">
        <h3>${status} <span>${matching.length}</span></h3>
        ${
          matching.length
            ? `<ul>${matching.map(row => `
                <li>
                  <strong>${escapeHTML(row.student.name)}</strong>
                  ${row.remarks ? `<small>${escapeHTML(row.remarks)}</small>` : ""}
                </li>
              `).join("")}</ul>`
            : `<p class="empty-message">None</p>`
        }
      </div>
    `;
  });

  attendanceBoardList.innerHTML = groups.join("");
}

function openAttendanceStatusModal(status, dateValue = getTodayISO()) {
  if (!attendanceStatusModal || !attendanceStatusList) return;

  const rows = getAttendanceRowsForDate(dateValue)
    .filter(row => status === "all" || row.status === status)
    .sort((a, b) => sortByGenderThenName(a.student, b.student));

  const title = status === "all" ? "All Students" : `${status} Students`;

  if (attendanceStatusTitle) {
    attendanceStatusTitle.textContent = title;
  }

  if (attendanceStatusSubtitle) {
    attendanceStatusSubtitle.textContent = formatDisplayDate(dateValue);
  }

  attendanceStatusList.innerHTML = rows.length
    ? rows.map(row => `
        <div class="attendance-status-item status-${row.status.toLowerCase()}">
          <strong>${escapeHTML(row.student.name)}</strong>
          <span>${row.status}${row.remarks ? ` • ${escapeHTML(row.remarks)}` : ""}</span>
        </div>
      `).join("")
    : `<p class="empty-message">No students in this status.</p>`;

  attendanceStatusModal.classList.remove("hidden");
}

function closeAttendanceStatusPopup() {
  if (!attendanceStatusModal) return;
  attendanceStatusModal.classList.add("hidden");
}

function renderAttendanceList(rows) {
  if (!attendanceList) return;

  const searchValue = attendanceSearch ? attendanceSearch.value.toLowerCase().trim() : "";
  const filterValue = attendanceFilter ? attendanceFilter.value : "all";
  const sortValue = attendanceSort ? attendanceSort.value : "az";

  let visibleRows = [...rows];

  if (searchValue) {
    visibleRows = visibleRows.filter(row =>
      row.student.name.toLowerCase().includes(searchValue)
    );
  }

  if (filterValue !== "all") {
    visibleRows = visibleRows.filter(row => row.status === filterValue);
  }

  const statusRank = {
    Absent: 0,
    Tardy: 1,
    Excused: 2,
    Present: 3
  };

  if (sortValue === "exceptions") {
    visibleRows.sort((a, b) =>
      statusRank[a.status] - statusRank[b.status] ||
      sortByName(a.student, b.student)
    );
  } else if (sortValue === "boysGirls") {
    visibleRows.sort((a, b) => sortByGenderThenName(a.student, b.student));
  } else if (sortValue === "az") {
    visibleRows.sort((a, b) => sortByName(a.student, b.student));
  } else {
    visibleRows.sort((a, b) => {
      if (a.status === sortValue && b.status !== sortValue) return -1;
      if (a.status !== sortValue && b.status === sortValue) return 1;
      return sortByName(a.student, b.student);
    });
  }

  if (visibleRows.length === 0) {
    attendanceList.innerHTML = `<p class="empty-message">No students found for this view.</p>`;
    return;
  }

  const disabled = appMode === "admin" ? "" : "disabled";

  attendanceList.innerHTML = visibleRows.map(row => `
    <div class="attendance-row status-${row.status.toLowerCase()}" data-student-id="${escapeHTML(row.student.id)}">
      <button
        type="button"
        class="attendance-tap-target"
        data-student-id="${escapeHTML(row.student.id)}"
        onclick="markAttendanceStudent(this.dataset.studentId)"
        ${appMode === "admin" ? "" : "disabled"}
      >
        <span>
          <strong>${escapeHTML(row.student.name)}</strong>
          <small>${row.remarks ? escapeHTML(row.remarks) : "Tap to mark selected status"}</small>
        </span>
        <b>${row.status}</b>
      </button>

      <input
        class="attendance-remarks"
        type="text"
        placeholder="Remarks optional..."
        value="${escapeHTML(row.remarks)}"
        data-student-id="${escapeHTML(row.student.id)}"
        ${disabled}
      />
    </div>
  `).join("");
}

function renderAttendance() {
  if (!attendanceList) return;

  ensureAttendanceDefaults();
  renderAttendanceMarkMode();

  const rows = getAttendanceRowsForDate();

  renderAttendanceSummary(rows);
  renderAttendanceBoard(rows);
  renderAttendanceList(rows);
}

function markAttendanceStudent(studentId) {
  if (appMode !== "admin" || !studentId) return;

  setLocalAttendance(studentId, {
    status: attendanceMarkMode
  });

  renderAttendance();
}

window.markAttendanceStudent = markAttendanceStudent;

function renderMonthlyAttendance() {
  if (!monthlyAttendanceList) return;

  ensureAttendanceDefaults();

  const monthValue = attendanceMonth ? attendanceMonth.value : getCurrentMonthISO();

  const rows = students.map(student => {
    const counts = {
      Present: 0,
      Absent: 0,
      Excused: 0,
      Tardy: 0
    };

    attendanceRecords
      .filter(record => record.studentId === student.id && record.date.slice(0, 7) === monthValue)
      .forEach(record => {
        const status = ATTENDANCE_STATUSES.includes(record.status) ? record.status : "Present";
        counts[status] += 1;
      });

    return {
      student,
      counts,
      total: counts.Present + counts.Absent + counts.Excused + counts.Tardy
    };
  });

  if (rows.length === 0) {
    monthlyAttendanceList.innerHTML = `<p class="empty-message">No students loaded yet.</p>`;
    return;
  }

  monthlyAttendanceList.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Present</th>
          <th>Absent</th>
          <th>Excused</th>
          <th>Tardy</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .sort((a, b) => sortByGenderThenName(a.student, b.student))
          .map(row => `
            <tr>
              <td>${escapeHTML(row.student.name)}</td>
              <td>${row.counts.Present}</td>
              <td>${row.counts.Absent}</td>
              <td>${row.counts.Excused}</td>
              <td>${row.counts.Tardy}</td>
              <td>${row.total}</td>
            </tr>
          `).join("")}
      </tbody>
    </table>
  `;
}

function getMonthlyAttendanceRows(monthValue = getCurrentMonthISO()) {
  return students.map(student => {
    const counts = {
      Present: 0,
      Absent: 0,
      Excused: 0,
      Tardy: 0
    };

    attendanceRecords
      .filter(record => record.studentId === student.id && record.date.slice(0, 7) === monthValue)
      .forEach(record => {
        const status = ATTENDANCE_STATUSES.includes(record.status) ? record.status : "Present";
        counts[status] += 1;
      });

    return {
      student,
      counts,
      total: counts.Present + counts.Absent + counts.Excused + counts.Tardy
    };
  }).sort((a, b) => sortByGenderThenName(a.student, b.student));
}

function printMonthlyAttendanceReport() {
  ensureAttendanceDefaults();

  const monthValue = attendanceMonth ? attendanceMonth.value : getCurrentMonthISO();
  const rows = getMonthlyAttendanceRows(monthValue);
  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    showToast("Please allow pop-ups to print the monthly attendance report.");
    return;
  }

  const monthLabel = new Date(`${monthValue}-01T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SFK KindTrack Monthly Attendance</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #111827;
            margin: 32px;
          }
          .header {
            border-bottom: 3px solid #facc15;
            padding-bottom: 14px;
            margin-bottom: 18px;
          }
          .tag {
            color: #6b7280;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: .08em;
          }
          h1 {
            margin: 4px 0;
            font-size: 28px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th,
          td {
            border: 1px solid #d1d5db;
            padding: 8px;
            text-align: left;
            font-size: 12px;
          }
          th {
            background: #111827;
            color: white;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <p class="tag">SFK KindTrack • Monthly Attendance Report • #BeKind</p>
          <h1>Monthly Attendance</h1>
          <p><strong>Month:</strong> ${monthLabel}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Excused</th>
              <th>Tardy</th>
              <th>Total Encoded Days</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(row => `
              <tr>
                <td>${escapeHTML(row.student.name)}</td>
                <td>${row.counts.Present}</td>
                <td>${row.counts.Absent}</td>
                <td>${row.counts.Excused}</td>
                <td>${row.counts.Tardy}</td>
                <td>${row.total}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </body>
    </html>
  `);

  printWindow.document.close();
  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 250);
}

async function saveDailyAttendance() {
  if (appMode !== "admin") {
    showToast("Admin mode is required to save attendance.");
    return;
  }

  const dateValue = getAttendanceDateValue();

  if (!dateValue) {
    showToast("Please choose an attendance date.");
    return;
  }

  const records = getAttendanceRowsForDate(dateValue).map(row => ({
    studentId: row.student.id,
    status: row.status,
    remarks: row.remarks
  }));

  if (saveAttendanceBtn) {
    saveAttendanceBtn.disabled = true;
    saveAttendanceBtn.textContent = "Saving...";
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        action: "saveAttendance",
        date: dateValue,
        records
      })
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Unable to save attendance.");
    }

    const savedRecords = (result.records || records).map(record => ({
      attendanceId: record.attendanceId || record.AttendanceID || `ATT-${dateValue.replace(/-/g, "")}-${record.studentId || record.StudentID}`,
      studentId: record.studentId || record.StudentID,
      date: dateValue,
      status: ATTENDANCE_STATUSES.includes(record.status || record.Status)
        ? (record.status || record.Status)
        : "Present",
      remarks: record.remarks || record.Remarks || ""
    }));

    attendanceRecords = attendanceRecords.filter(record => record.date !== dateValue);
    attendanceRecords.push(...savedRecords);
    rebuildAttendanceIndex();
    renderAttendance();
    renderAttendanceQuickSummary();
    renderMonthlyAttendance();

    if (attendanceMessage) {
      attendanceMessage.classList.remove("hidden");
      attendanceMessage.textContent = "✅ Attendance saved successfully.";
    }

    showToast("✅ Attendance saved.");
  } catch (error) {
    console.error("Attendance save error:", error);
    showToast("❌ Unable to save attendance.");
  } finally {
    if (saveAttendanceBtn) {
      saveAttendanceBtn.disabled = false;
      saveAttendanceBtn.textContent = "Save Attendance";
    }
  }
}

function printAttendanceReport() {
  const dateValue = getAttendanceDateValue();
  const rows = getAttendanceRowsForDate(dateValue).sort((a, b) =>
    a.student.name.localeCompare(b.student.name)
  );
  const counts = getAttendanceCounts(rows);
  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    showToast("Please allow pop-ups to print the attendance report.");
    return;
  }

  const grouped = ["Absent", "Tardy", "Excused", "Present"].map(status => {
    const matching = rows.filter(row => row.status === status);

    return `
      <section class="group">
        <h2>${status} (${matching.length})</h2>
        ${
          matching.length
            ? `<table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  ${matching.map(row => `
                    <tr>
                      <td>${escapeHTML(row.student.name)}</td>
                      <td>${escapeHTML(row.remarks || "")}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>`
            : `<p>None</p>`
        }
      </section>
    `;
  }).join("");

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SFK KindTrack Attendance Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #111827;
            margin: 32px;
          }
          .header {
            border-bottom: 3px solid #facc15;
            padding-bottom: 14px;
            margin-bottom: 18px;
          }
          .tag {
            color: #6b7280;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: .08em;
          }
          h1 {
            margin: 4px 0;
            font-size: 28px;
          }
          .summary {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin: 18px 0;
          }
          .summary div {
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 10px;
          }
          .summary span {
            display: block;
            color: #6b7280;
            font-size: 12px;
          }
          .summary strong {
            display: block;
            font-size: 22px;
            margin-top: 4px;
          }
          .group {
            page-break-inside: avoid;
            margin-top: 18px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th,
          td {
            border: 1px solid #d1d5db;
            padding: 8px;
            text-align: left;
            font-size: 12px;
          }
          th {
            background: #111827;
            color: white;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <p class="tag">SFK KindTrack • Daily Attendance Report • #BeKind</p>
          <h1>Daily Attendance</h1>
          <p><strong>Date:</strong> ${formatDisplayDate(dateValue)}</p>
        </div>

        <div class="summary">
          <div><span>Present</span><strong>${counts.Present}</strong></div>
          <div><span>Absent</span><strong>${counts.Absent}</strong></div>
          <div><span>Excused</span><strong>${counts.Excused}</strong></div>
          <div><span>Tardy</span><strong>${counts.Tardy}</strong></div>
          <div><span>Total</span><strong>${rows.length}</strong></div>
        </div>

        ${grouped}
      </body>
    </html>
  `);

  printWindow.document.close();
  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 250);
}

function openAttendanceModal() {
  if (!attendanceModal) return;
  ensureAttendanceDefaults();
  renderAttendance();
  renderMonthlyAttendance();
  const attendanceTools = document.querySelector(".attendance-mobile-tools");
  if (attendanceTools) {
    attendanceTools.open =
      document.body.classList.contains("view-only-mode") || window.innerWidth > 650;
  }
  attendanceModal.classList.remove("hidden");
}

function closeAttendanceModalPanel() {
  if (!attendanceModal) return;
  attendanceModal.classList.add("hidden");
}

function openAddViolationModal() {
  if (!addPanel) return;
  addPanel.classList.remove("hidden");

  if (addStudent) {
    setTimeout(() => addStudent.focus(), 150);
  }
}

function closeAddViolationModal() {
  if (!addPanel) return;
  addPanel.classList.add("hidden");
}

function renderAttendanceMarkMode() {
  attendanceMarkModeButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.attendanceMode === attendanceMarkMode);
  });
}

function renderTermSummary() {
  if (!termSummaryList) return;

  if (termSummaryLabel) {
    termSummaryLabel.textContent = getTermLabel();
  }

  if (students.length === 0) {
    termSummaryList.innerHTML = `<p class="empty-message">No student data yet. 🐨</p>`;
    return;
  }

  let totalViolations = 0;
  let studentsWithNoViolations = 0;
  let needsGuidance = 0;
  let needsSupport = 0;
  let onTrack = 0;
  let totalFees = 0;
  let paidFees = 0;
  let unpaidFees = 0;
  let waivedFees = 0;

  const violationCounts = {};

  students.forEach(student => {
    const visibleViolations = getVisibleViolations(student);
    const status = getStudentStatus(student);

    totalViolations += visibleViolations.length;

    if (visibleViolations.length === 0) {
      studentsWithNoViolations++;
    }

    if (status.className === "track") onTrack++;
    if (status.className === "guidance") needsGuidance++;
    if (status.className === "support") needsSupport++;

    visibleViolations.forEach(v => {
      const fee = Number(v.fee) || 0;
      totalFees += fee;

      if (v.status === "Paid") paidFees += fee;
      if (v.status === "Unpaid") unpaidFees += fee;
      if (v.status === "Waived") waivedFees += fee;

      violationCounts[v.type] = (violationCounts[v.type] || 0) + 1;
    });
  });

  const mostCommon = Object.entries(violationCounts)
    .sort((a, b) => b[1] - a[1])[0];

  const topStudents = [...students]
    .map(student => ({
      id: student.id,
      name: student.name,
      total: getVisibleViolations(student).length,
      status: getStudentStatus(student)
    }))
    .filter(student => student.total > 0)
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name))
    .slice(0, 5);

  termSummaryList.innerHTML = `
    <div class="summary-stat-card">
      <span>📌 Records in View</span>
      <strong>${totalViolations}</strong>
      <small>${getTermLabel()}</small>
    </div>

    <div class="summary-stat-card">
      <span>✅ No Violations</span>
      <strong>${studentsWithNoViolations}</strong>
      <small>students</small>
    </div>

    <div class="summary-stat-card">
      <span>🟢 On Track</span>
      <strong>${onTrack}</strong>
      <small>students</small>
    </div>

    <div class="summary-stat-card">
      <span>🟡 Needs Guidance</span>
      <strong>${needsGuidance}</strong>
      <small>students</small>
    </div>

    <div class="summary-stat-card">
      <span>🔴 Needs Support</span>
      <strong>${needsSupport}</strong>
      <small>students</small>
    </div>

    <div class="summary-stat-card wide">
      <span>Most Common Violation</span>
      <strong>${mostCommon ? mostCommon[0] : "None"}</strong>
      <small>${mostCommon ? `${mostCommon[1]} record(s)` : "No records found"}</small>
    </div>

    <div class="summary-stat-card wide top-list-card">
      <span>Top Students with Records</span>
      ${
        topStudents.length
          ? `<ol>${topStudents.map(student => `
              <li>
                <button
                  type="button"
                  class="summary-student-link"
                  onclick="selectStudentFromSummary('${student.id}')"
                >
                  <strong>${student.name}</strong>
                  <small>${student.total} record(s) • ${student.status.icon} ${student.status.label}</small>
                </button>
              </li>
            `).join("")}</ol>`
          : `<small>No student records for this term.</small>`
      }
    </div>

    <div class="summary-stat-card wide fee-info">
      <span>Fee Summary</span>
      <div class="mini-fee-grid">
        <small><strong>Total:</strong> ₱${totalFees}</small>
        <small><strong>Paid:</strong> ₱${paidFees}</small>
        <small><strong>Unpaid:</strong> ₱${unpaidFees}</small>
        <small><strong>Waived:</strong> ₱${waivedFees}</small>
      </div>
    </div>
  `;
}

function selectStudentFromSummary(studentId) {
  const student = students.find(item => item.id === studentId);

  if (!student) {
    showToast("Student record not found.");
    return;
  }

  selectedStudent = student;
  renderStudents();
  renderStudentDetails();

  if (termSummaryModal) {
    termSummaryModal.classList.add("hidden");
  }

  const detailsPanel = document.querySelector(".details-panel");

  if (window.innerWidth <= 650) {
    openStudentDetailsModal();
  } else if (detailsPanel) {
    detailsPanel.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function renderDashboard() {
  let totalViolations = 0;
  let alertCount = 0;
  let totalFees = 0;
  let collected = 0;

  students.forEach(student => {
    const visibleViolations = getVisibleViolations(student);
    totalViolations += visibleViolations.length;
    if (hasAlert(student)) alertCount++;

    visibleViolations.forEach(v => {
      totalFees += v.fee;
      if (v.status === "Paid") collected += v.fee;
    });
  });

  document.getElementById("totalViolations").textContent = totalViolations;
  document.getElementById("alertCount").textContent = alertCount;
  document.getElementById("totalFees").textContent = `₱${totalFees}`;
  document.getElementById("collectedFees").textContent = `₱${collected}`;
}

function renderAlertCenter() {
  if (!alertList) return;

  alertList.innerHTML = "";

  const alertedStudents = students
    .filter(student => hasAlert(student))
    .sort((a, b) =>
      (getVisibleViolations(b).length - getVisibleViolations(a).length) ||
      a.lastName.localeCompare(b.lastName)
    );

  if (alertedStudents.length === 0) {
    alertList.innerHTML = `<p class="empty-message">No alerts yet. 🐨</p>`;
    return;
  }

  alertedStudents.forEach(student => {
    const status = getStudentStatus(student);
    const repeated = getRepeatedViolation(student);

    let reason = `Total Violations: ${getVisibleViolations(student).length}`;
    if (repeated) reason = `Repeated: ${repeated[0]} (${repeated[1]}x)`;

    const div = document.createElement("div");
    div.className = `alert-card ${status.className}`;

    div.innerHTML = `
      <strong>${status.icon} ${student.name}</strong>
      <div>${status.label}</div>
      <small>${reason}</small>
    `;

    div.onclick = () => {
      selectedStudent = student;
      renderAll();

      if (window.innerWidth <= 650) {
        openStudentDetailsModal();
      } else {
        window.scrollTo({
          top: document.querySelector(".details-panel").offsetTop - 10,
          behavior: "smooth"
        });
      }
    };

    alertList.appendChild(div);
  });
}

function renderStudents() {
  studentList.innerHTML = "";

  const sortedStudents = getSortedStudents();

  if (sortedStudents.length === 0) {
    studentList.innerHTML = `<p class="empty-message">No students found. 🐨</p>`;
    return;
  }

  sortedStudents.forEach(student => {
    const card = document.createElement("div");
    card.className = "student-card";

    if (selectedStudent && selectedStudent.id === student.id) {
      card.classList.add("active");
    }

    const repeated = getRepeatedViolation(student);
    const status = getStudentStatus(student);

    let badge = `<span class="badge ok">${getVisibleViolations(student).length} violation(s)</span>`;

    if (repeated) badge = `<span class="badge warn">⚠️ ${repeated[0]} ${repeated[1]}x</span>`;
    if (getVisibleViolations(student).length >= 5) badge = `<span class="badge danger">🚨 ${getVisibleViolations(student).length} Violations</span>`;

    card.innerHTML = `
      <strong>${student.name}</strong>
      <div class="student-status ${status.className}">
        ${status.icon} ${status.label}
      </div>
      ${badge}
    `;

card.onclick = () => {
  selectedStudent = student;
  renderStudents();
  renderStudentDetails();

  if (window.innerWidth <= 650) {
    openStudentDetailsModal();
  }
};

    studentList.appendChild(card);
  });
}

function renderStudentDetails() {
  if (!selectedStudent) return;

  selectedName.textContent = selectedStudent.name;
  studentSummary.innerHTML = buildStudentSummaryHTML(selectedStudent);
  renderViolationList();
}

function buildStudentSummaryHTML(student) {
  const visibleViolations = getVisibleViolations(student);
  const total = visibleViolations.length;

  const totalFees = visibleViolations.reduce((sum, v) => sum + v.fee, 0);
  const paidFees = visibleViolations
    .filter(v => v.status === "Paid")
    .reduce((sum, v) => sum + v.fee, 0);
  const unpaidFees = visibleViolations
    .filter(v => v.status === "Unpaid")
    .reduce((sum, v) => sum + v.fee, 0);
  const waivedFees = visibleViolations
    .filter(v => v.status === "Waived")
    .reduce((sum, v) => sum + v.fee, 0);

  const repeated = getRepeatedViolation(student);
  const status = getStudentStatus(student);

  let alertText = "No repeated violation alert.";

  if (repeated) alertText = `⚠️ Repeated Alert: ${repeated[0]} has been recorded ${repeated[1]}x.`;
  if (total >= 5) alertText = `🚨 Total Alert: This student already has ${total} total violations.`;

  return `
    <div class="summary-box">
      <p>
        <strong>Status:</strong>
        <span class="student-status ${status.className}">
          ${status.icon} ${status.label}
        </span>
      </p>
      <p><strong>Viewing:</strong> ${getTermLabel()}</p>
      <p><strong>Total Violations:</strong> ${total}</p>
      <p><strong>Alert Status:</strong> ${alertText}</p>

      <div class="fee-text fee-breakdown">
        <p><strong>Total Fees:</strong> ₱${totalFees}</p>
        <p><strong>Paid:</strong> ₱${paidFees}</p>
        <p><strong>Unpaid:</strong> ₱${unpaidFees}</p>
        <p><strong>Waived:</strong> ₱${waivedFees}</p>
      </div>
    </div>
  `;
}

function buildViolationListHTML(student, filterValue = "all") {
  if (!student) return `<p class="empty-message">Choose a student to view records. 🐨</p>`;

  let data = [...getVisibleViolations(student)];

  data.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filterValue !== "all") {
    data = data.filter(v => v.status.toLowerCase() === filterValue);
  }

  if (data.length === 0) {
    return `<p class="empty-message">No records found. 🐨</p>`;
  }

  return data.map(v => `
    <div class="violation-item">
      <strong>${v.type}</strong>
      <small>${v.date}</small>
      <div class="fee-text">Fee: ₱${v.fee}</div>
      <div class="status ${v.status.toLowerCase()}">${v.status}</div>
      ${v.actionTaken ? `<small>Action Taken: ${v.actionTaken}</small>` : ""}
      ${v.reflection ? `<small>Reflection / Commitment: ${v.reflection}</small>` : ""}
      ${(v.followUpDate || v.followUpStatus) ? `<small>Follow-up: ${v.followUpStatus || "Pending"}${v.followUpDate ? ` • ${v.followUpDate}` : ""}</small>` : ""}
      ${v.parentContacted === "Yes" ? `<small>Parent Contacted: Yes</small>` : ""}
      ${v.notes ? `<small>Notes: ${v.notes}</small>` : ""}

      <div class="violation-actions">
        <button type="button" onclick="editViolation('${v.recordId}')">Edit</button>
        <button type="button" onclick="deleteViolation('${v.recordId}')">Delete</button>
      </div>
    </div>
  `).join("");
}

function renderViolationList() {
  violationList.innerHTML = buildViolationListHTML(
    selectedStudent,
    violationFilter ? violationFilter.value : "all"
  );
}

function openStudentDetailsModal() {
  if (!selectedStudent || !studentDetailsModal) return;

  if (modalSelectedName) {
    modalSelectedName.textContent = selectedStudent.name;
  }

  if (modalStudentSummary) {
    modalStudentSummary.innerHTML = buildStudentSummaryHTML(selectedStudent);
  }

  if (modalViolationFilter) {
    modalViolationFilter.value = violationFilter ? violationFilter.value : "all";
  }

  if (modalViolationList) {
    modalViolationList.innerHTML = buildViolationListHTML(
      selectedStudent,
      modalViolationFilter ? modalViolationFilter.value : "all"
    );
  }

  studentDetailsModal.classList.remove("hidden");
}

function closeStudentDetailsPopup() {
  if (!studentDetailsModal) return;
  studentDetailsModal.classList.add("hidden");
}

function renderFeeList() {
  const feeList = document.getElementById("feeList");
  feeList.innerHTML = "";

  violationFees.forEach(v => {
    feeList.innerHTML += `
      <div class="fee-item">
        <strong>${v.name}</strong>
        <div class="fee-text">₱${v.fee}</div>
      </div>
    `;
  });
}

function populateAddForm() {
  if (!addStudent || !addViolationType) return;

  addStudent.innerHTML = `<option value="">Select Student</option>`;

  [...students]
    .sort((a, b) =>
      a.lastName.localeCompare(b.lastName) ||
      a.firstName.localeCompare(b.firstName)
    )
    .forEach(student => {
      addStudent.innerHTML += `
        <option value="${student.id}">
          ${student.name}
        </option>
      `;
    });

  addViolationType.innerHTML = `<option value="">Select Violation</option>`;

  violationFees.forEach(v => {
    addViolationType.innerHTML += `
      <option value="${v.name}">
        ${v.name}
      </option>
    `;
  });

  if (addDate) {
    addDate.value = new Date().toISOString().split("T")[0];
  }
}

async function saveViolation(event) {
  event.preventDefault();

  const violationInfo = violationFees.find(v => v.name === addViolationType.value);

  const payload = {
    action: "addViolation",
    studentId: addStudent.value,
    violationType: addViolationType.value,
    fee: violationInfo ? violationInfo.fee : 0,
    status: addStatus.value,
    actionTaken: addActionTaken ? addActionTaken.value : "",
    reflection: addReflection ? addReflection.value : "",
    followUpDate: addFollowUpDate ? addFollowUpDate.value : "",
    followUpStatus: addFollowUpStatus ? addFollowUpStatus.value : "Pending",
    parentContacted: addParentContacted ? addParentContacted.value : "No",
    date: addDate.value,
    notes: addNotes.value,
    encodedBy: "Sir JR"
  };

  try {
    addMessage.classList.remove("hidden");
    addMessage.textContent = "Saving violation...";

    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.success) {
      const student = students.find(s => s.id === payload.studentId);

      const newViolation = {
        recordId: result.recordId || `TEMP-${Date.now()}`,
        date: payload.date,
        type: payload.violationType,
        fee: payload.fee,
        status: payload.status,
        actionTaken: payload.actionTaken,
        reflection: payload.reflection,
        followUpDate: payload.followUpDate,
        followUpStatus: payload.followUpStatus,
        parentContacted: payload.parentContacted,
        notes: payload.notes
      };

      if (student) {
        student.violations.push(newViolation);
        selectedStudent = student;
      }

      addMessage.textContent = "✅ Violation saved successfully.";
      showToast("✅ Violation added successfully.");

      addForm.reset();
      populateAddForm();
      renderAll();
      closeAddViolationModal();

    } else {
      addMessage.textContent = "❌ Unable to save violation.";
      showToast("❌ Unable to save violation.");
    }
  } catch (error) {
    console.error(error);
    addMessage.classList.remove("hidden");
    addMessage.textContent = "❌ Connection error.";
    showToast("❌ Connection error.");
  }
}

function editViolation(recordId) {
  const violation = selectedStudent.violations.find(v => v.recordId === recordId);

  if (!violation) return;

  editViolationType.innerHTML = "";

  violationFees.forEach(v => {
    editViolationType.innerHTML += `
      <option value="${v.name}">
        ${v.name}
      </option>
    `;
  });

  editRecordId.value = violation.recordId;
  editViolationType.value = violation.type;
  editStatus.value = violation.status;
  if (editActionTaken) {
    editActionTaken.value = violation.actionTaken || "Verbal Reminder";
  }
  if (editReflection) {
    editReflection.value = violation.reflection || "";
  }
  if (editFollowUpDate) {
    editFollowUpDate.value = violation.followUpDate || "";
  }
  if (editFollowUpStatus) {
    editFollowUpStatus.value = violation.followUpStatus || "Pending";
  }
  if (editParentContacted) {
    editParentContacted.value = violation.parentContacted || "No";
  }
  editDate.value = violation.date;
  editNotes.value = violation.notes || "";

  editModal.classList.remove("hidden");
}

async function saveEditedViolation(event) {
  event.preventDefault();

  const violationInfo = violationFees.find(v => v.name === editViolationType.value);

  const payload = {
    action: "editViolation",
    recordId: editRecordId.value,
    date: editDate.value,
    violationType: editViolationType.value,
    fee: violationInfo ? violationInfo.fee : 0,
    status: editStatus.value,
    actionTaken: editActionTaken ? editActionTaken.value : "",
    reflection: editReflection ? editReflection.value : "",
    followUpDate: editFollowUpDate ? editFollowUpDate.value : "",
    followUpStatus: editFollowUpStatus ? editFollowUpStatus.value : "Pending",
    parentContacted: editParentContacted ? editParentContacted.value : "No",
    notes: editNotes.value
  };

  try {
    showToast("Saving changes...");

    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.success) {
      const record = selectedStudent.violations.find(
        v => v.recordId === payload.recordId
      );

      if (record) {
        record.date = payload.date;
        record.type = payload.violationType;
        record.fee = payload.fee;
        record.status = payload.status;
        record.actionTaken = payload.actionTaken;
        record.reflection = payload.reflection;
        record.followUpDate = payload.followUpDate;
        record.followUpStatus = payload.followUpStatus;
        record.parentContacted = payload.parentContacted;
        record.notes = payload.notes;
      }

      editModal.classList.add("hidden");
      renderAll();
      showToast("✅ Violation updated successfully.");

    } else {
      showToast("❌ Unable to update violation.");
    }
  } catch (error) {
    console.error(error);
    showToast("❌ Connection error.");
  }
}

function deleteViolation(recordId) {
  if (!deleteModal || !deleteRecordId) return;

  deleteRecordId.value = recordId;
  deleteModal.classList.remove("hidden");
}

async function confirmDeleteViolation() {
  const recordId = deleteRecordId.value;

  const payload = {
    action: "deleteViolation",
    recordId
  };

  try {
    showToast("Deleting violation...");

    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.success) {
      if (selectedStudent) {
        selectedStudent.violations = selectedStudent.violations.filter(
          v => v.recordId !== recordId
        );

        const index = students.findIndex(s => s.id === selectedStudent.id);

        if (index !== -1) {
          students[index] = selectedStudent;
        }
      }

      deleteModal.classList.add("hidden");
      renderAll();
      showToast("🗑️ Violation deleted.");

    } else {
      showToast("❌ Unable to delete violation.");
    }
  } catch (error) {
    console.error(error);
    showToast("❌ Unable to delete violation.");
  }
}

function openPrintOptions() {
  if (!selectedStudent) {
    showToast("Please select a student first.");
    return;
  }

  if (printOptionsModal) {
    printOptionsModal.classList.remove("hidden");
  }
}

function closePrintOptions() {
  if (printOptionsModal) {
    printOptionsModal.classList.add("hidden");
  }
}

function openPrintAllOptions() {
  if (students.length === 0) {
    showToast("No student records loaded yet.");
    return;
  }

  if (printAllOptionsModal) {
    printAllOptionsModal.classList.remove("hidden");
  }
}

function closePrintAllOptions() {
  if (printAllOptionsModal) {
    printAllOptionsModal.classList.add("hidden");
  }
}

function getFeeSummary(student) {
  const violations = getVisibleViolations(student);

  const totalFees = violations.reduce(
    (sum, v) => sum + (Number(v.fee) || 0),
    0
  );

  const paidFees = violations
    .filter(v => v.status === "Paid")
    .reduce((sum, v) => sum + (Number(v.fee) || 0), 0);

  const unpaidFees = violations
    .filter(v => v.status === "Unpaid")
    .reduce((sum, v) => sum + (Number(v.fee) || 0), 0);

  const waivedFees = violations
    .filter(v => v.status === "Waived")
    .reduce((sum, v) => sum + (Number(v.fee) || 0), 0);

  return { totalFees, paidFees, unpaidFees, waivedFees };
}

function buildPrintableStudentSection(student, options) {
  const {
    includeFees,
    includeStatus,
    includeActionTaken,
    includeReflection,
    includeFollowUp,
    includeParent,
    includeNotes,
    pageBreak
  } = options;

  const status = getStudentStatus(student);
  const { totalFees, paidFees, unpaidFees, waivedFees } = getFeeSummary(student);

  const sortedViolations = [...getVisibleViolations(student)].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const columnCount =
    2 +
    (includeStatus ? 1 : 0) +
    (includeFees ? 1 : 0) +
    (includeActionTaken ? 1 : 0) +
    (includeReflection ? 1 : 0) +
    (includeFollowUp ? 1 : 0) +
    (includeParent ? 1 : 0) +
    (includeNotes ? 1 : 0);

  const rows = sortedViolations.map(v => `
    <tr>
      <td>${v.date || ""}</td>
      <td>${v.type || ""}</td>
      ${includeStatus ? `<td>${v.status || ""}</td>` : ""}
      ${includeFees ? `<td>₱${Number(v.fee) || 0}</td>` : ""}
      ${includeActionTaken ? `<td>${v.actionTaken || ""}</td>` : ""}
      ${includeReflection ? `<td>${v.reflection || ""}</td>` : ""}
      ${includeFollowUp ? `<td>${[v.followUpStatus || "", v.followUpDate || ""].filter(Boolean).join(" • ")}</td>` : ""}
      ${includeParent ? `<td>${v.parentContacted || "No"}</td>` : ""}
      ${includeNotes ? `<td>${v.notes || ""}</td>` : ""}
    </tr>
  `).join("");

  return `
    <section class="student-record ${pageBreak ? "page-break" : ""}">
      <div class="student-header">
        <h1>SFK KindTrack</h1>
        <p class="tag">Student Record • Track with fairness. Guide with kindness. #BeKind</p>
      </div>

      <div class="student-info">
        <h2>${student.name}</h2>
        <p><strong>Section:</strong> ${student.section || ""}</p>
        <p><strong>Behavior Status:</strong> ${status.icon} ${status.label}</p>
        <p><strong>Term:</strong> ${getTermLabel()}</p>
        <p><strong>Total Violations:</strong> ${sortedViolations.length}</p>

        ${includeFees ? `
          <div class="fee-summary">
            <div><strong>Total</strong><br>₱${totalFees}</div>
            <div><strong>Paid</strong><br>₱${paidFees}</div>
            <div><strong>Unpaid</strong><br>₱${unpaidFees}</div>
            <div><strong>Waived</strong><br>₱${waivedFees}</div>
          </div>
        ` : ""}
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Violation</th>
            ${includeStatus ? "<th>Status</th>" : ""}
            ${includeFees ? "<th>Fee</th>" : ""}
            ${includeActionTaken ? "<th>Action Taken</th>" : ""}
            ${includeReflection ? "<th>Reflection / Commitment</th>" : ""}
            ${includeFollowUp ? "<th>Follow-up</th>" : ""}
            ${includeParent ? "<th>Parent Contacted</th>" : ""}
            ${includeNotes ? "<th>Notes</th>" : ""}
          </tr>
        </thead>

        <tbody>
          ${rows || `<tr><td colspan="${columnCount}">No records found.</td></tr>`}
        </tbody>
      </table>
    </section>
  `;
}


function printAllStudentRecords() {
  const includeNoViolations = printAllIncludeNoViolations
    ? printAllIncludeNoViolations.checked
    : true;

  const includeFees = printAllIncludeFees
    ? printAllIncludeFees.checked
    : false;

  const includeStatus = printAllIncludeStatus
    ? printAllIncludeStatus.checked
    : true;

  const includeActionTaken = printAllIncludeAction
    ? printAllIncludeAction.checked
    : true;

  const includeReflection = printAllIncludeReflection
    ? printAllIncludeReflection.checked
    : true;

  const includeFollowUp = printAllIncludeFollowUp
    ? printAllIncludeFollowUp.checked
    : true;

  const includeParent = printAllIncludeParent
    ? printAllIncludeParent.checked
    : true;

  const includeNotes = printAllIncludeNotes
    ? printAllIncludeNotes.checked
    : true;

  const pageBreak = printAllPageBreak
    ? printAllPageBreak.checked
    : true;

  let printableStudents = [...students].sort((a, b) =>
    a.lastName.localeCompare(b.lastName) ||
    a.firstName.localeCompare(b.firstName)
  );

  if (!includeNoViolations) {
    printableStudents = printableStudents.filter(student =>
      getVisibleViolations(student).length > 0
    );
  }

  if (printableStudents.length === 0) {
    showToast("No records available to print.");
    return;
  }

  const totalViolations = printableStudents.reduce(
    (sum, student) => sum + getVisibleViolations(student).length,
    0
  );

  const classTotalFees = printableStudents.reduce(
    (sum, student) => sum + getFeeSummary(student).totalFees,
    0
  );

  const sections = printableStudents.map(student =>
    buildPrintableStudentSection(student, {
      includeFees,
      includeStatus,
      includeActionTaken,
      includeReflection,
      includeFollowUp,
      includeParent,
      includeNotes,
      pageBreak
    })
  ).join("");

  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    showToast("Please allow pop-ups to print all records.");
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SFK KindTrack All Student Records</title>
        <style>
          * {
            box-sizing: border-box;
          }

          body {
            font-family: Arial, sans-serif;
            padding: 28px;
            color: #151515;
          }

          h1 {
            margin: 0 0 5px;
            font-size: 28px;
          }

          .tag {
            color: #9a6a00;
            font-weight: bold;
            margin: 0;
          }

          .cover-page {
            page-break-after: always;
            break-after: page;
          }

          .cover-header,
          .student-header {
            border-bottom: 4px solid #ffd83d;
            padding-bottom: 14px;
            margin-bottom: 18px;
          }

          .class-summary {
            background: #151515;
            color: white;
            border-radius: 14px;
            padding: 16px;
            margin: 18px 0;
          }

          .class-summary p {
            margin: 7px 0;
          }

          .cover-note {
            background: #fff9e8;
            border: 1px solid #e8d99a;
            border-radius: 14px;
            padding: 14px;
            margin-top: 18px;
            color: #5f4700;
            line-height: 1.45;
          }

          .student-record {
            margin: 0;
            padding-top: 0;
          }

          .student-record.page-break {
            page-break-after: always;
            break-after: page;
          }

          .student-record.page-break:last-child {
            page-break-after: auto;
            break-after: auto;
          }

          .student-info {
            background: #fff9e8;
            border: 1px solid #e8d99a;
            border-radius: 14px;
            padding: 14px;
            margin-bottom: 12px;
          }

          .student-info h2 {
            margin: 0 0 10px;
            font-size: 20px;
          }

          .student-info p {
            margin: 5px 0;
          }

          .fee-summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-top: 10px;
          }

          .fee-summary div {
            background: #ffffff;
            border: 1px solid #e8d99a;
            border-radius: 10px;
            padding: 9px;
            font-size: 13px;
            color: #151515;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }

          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
            font-size: 12.5px;
            vertical-align: top;
          }

          th {
            background: #ffd83d;
          }

          .footer {
            margin-top: 24px;
            font-size: 12px;
            color: #666;
          }

          @media print {
            body {
              padding: 16px;
            }

            .cover-page {
              min-height: 95vh;
            }

            .student-record {
              min-height: 95vh;
            }

            .student-info {
              break-inside: avoid;
            }

            table {
              break-inside: avoid;
            }
          }
        </style>
      </head>

      <body>
        <section class="cover-page">
          <div class="cover-header">
            <h1>SFK KindTrack</h1>
            <p class="tag">All Student Records • Track with fairness. Guide with kindness. #BeKind</p>
          </div>

          <div class="class-summary">
            <p><strong>Class/Section:</strong> Grade 8 – St. Faustina Kowalska</p>
            <p><strong>Term:</strong> ${getTermLabel()}</p>
            <p><strong>Total Students Printed:</strong> ${printableStudents.length}</p>
            <p><strong>Total Violations:</strong> ${totalViolations}</p>
            ${includeFees ? `<p><strong>Class Total Fees:</strong> ₱${classTotalFees}</p>` : ""}
          </div>

          <div class="cover-note">
            <strong>Note:</strong> This first page is the class summary. Individual student records start on the next page.
          </div>

          <p class="footer">
            Generated through SFK KindTrack. Records are handled with fairness, respect, and kindness.
          </p>
        </section>

        ${sections}
      </body>
    </html>
  `);

  printWindow.document.close();

  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 250);

  closePrintAllOptions();
}

function printStudentRecord() {
  if (!selectedStudent) {
    showToast("Please select a student first.");
    return;
  }

  const includeFees = printIncludeFees ? printIncludeFees.checked : false;
  const includeStatus = printIncludeStatus ? printIncludeStatus.checked : true;
  const includeActionTaken = printIncludeAction ? printIncludeAction.checked : true;
  const includeReflection = printIncludeReflection ? printIncludeReflection.checked : true;
  const includeFollowUp = printIncludeFollowUp ? printIncludeFollowUp.checked : true;
  const includeParent = printIncludeParent ? printIncludeParent.checked : true;
  const includeNotes = printIncludeNotes ? printIncludeNotes.checked : true;

  const visibleViolations = getVisibleViolations(selectedStudent);

  const totalFees = visibleViolations.reduce(
    (sum, v) => sum + (Number(v.fee) || 0),
    0
  );

  const paidFees = visibleViolations
    .filter(v => v.status === "Paid")
    .reduce((sum, v) => sum + (Number(v.fee) || 0), 0);

  const unpaidFees = visibleViolations
    .filter(v => v.status === "Unpaid")
    .reduce((sum, v) => sum + (Number(v.fee) || 0), 0);

  const waivedFees = visibleViolations
    .filter(v => v.status === "Waived")
    .reduce((sum, v) => sum + (Number(v.fee) || 0), 0);

  const sortedViolations = [...visibleViolations].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const rows = sortedViolations.map(v => `
    <tr>
      <td>${v.date || ""}</td>
      <td>${v.type || ""}</td>
      ${includeStatus ? `<td>${v.status || ""}</td>` : ""}
      ${includeFees ? `<td>₱${Number(v.fee) || 0}</td>` : ""}
      ${includeActionTaken ? `<td>${v.actionTaken || ""}</td>` : ""}
      ${includeReflection ? `<td>${v.reflection || ""}</td>` : ""}
      ${includeFollowUp ? `<td>${[v.followUpStatus || "", v.followUpDate || ""].filter(Boolean).join(" • ")}</td>` : ""}
      ${includeParent ? `<td>${v.parentContacted || "No"}</td>` : ""}
      ${includeNotes ? `<td>${v.notes || ""}</td>` : ""}
    </tr>
  `).join("");

  const columnCount =
    2 +
    (includeStatus ? 1 : 0) +
    (includeFees ? 1 : 0) +
    (includeActionTaken ? 1 : 0) +
    (includeReflection ? 1 : 0) +
    (includeFollowUp ? 1 : 0) +
    (includeParent ? 1 : 0) +
    (includeNotes ? 1 : 0);

  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    showToast("Please allow pop-ups to print the record.");
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SFK KindTrack Record</title>
        <style>
          * {
            box-sizing: border-box;
          }

          body {
            font-family: Arial, sans-serif;
            padding: 28px;
            color: #151515;
          }

          .header {
            border-bottom: 4px solid #ffd83d;
            padding-bottom: 14px;
            margin-bottom: 18px;
          }

          h1 {
            margin: 0 0 5px;
            font-size: 28px;
          }

          .tag {
            color: #9a6a00;
            font-weight: bold;
            margin: 0;
          }

          .student-info {
            background: #fff9e8;
            border: 1px solid #e8d99a;
            border-radius: 14px;
            padding: 14px;
            margin-bottom: 18px;
          }

          .student-info h2 {
            margin: 0 0 10px;
          }

          .student-info p {
            margin: 5px 0;
          }

          .fee-summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-top: 10px;
          }

          .fee-summary div {
            background: #ffffff;
            border: 1px solid #e8d99a;
            border-radius: 10px;
            padding: 9px;
            font-size: 13px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 14px;
          }

          th, td {
            border: 1px solid #ccc;
            padding: 9px;
            text-align: left;
            font-size: 13px;
            vertical-align: top;
          }

          th {
            background: #ffd83d;
          }

          .footer {
            margin-top: 24px;
            font-size: 12px;
            color: #666;
          }

          @media print {
            body {
              padding: 18px;
            }
          }
        </style>
      </head>

      <body>
        <div class="header">
          <h1>SFK KindTrack</h1>
          <p class="tag">Track with fairness. Guide with kindness. #BeKind</p>
        </div>

        <div class="student-info">
          <h2>${selectedStudent.name}</h2>
          <p><strong>Section:</strong> ${selectedStudent.section || ""}</p>
          <p><strong>Term:</strong> ${getTermLabel()}</p>
          <p><strong>Total Violations:</strong> ${sortedViolations.length}</p>

          ${includeFees ? `
            <div class="fee-summary">
              <div><strong>Total</strong><br>₱${totalFees}</div>
              <div><strong>Paid</strong><br>₱${paidFees}</div>
              <div><strong>Unpaid</strong><br>₱${unpaidFees}</div>
              <div><strong>Waived</strong><br>₱${waivedFees}</div>
            </div>
          ` : ""}
        </div>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Violation</th>
              ${includeStatus ? "<th>Status</th>" : ""}
              ${includeFees ? "<th>Fee</th>" : ""}
              ${includeActionTaken ? "<th>Action Taken</th>" : ""}
              ${includeReflection ? "<th>Reflection / Commitment</th>" : ""}
              ${includeFollowUp ? "<th>Follow-up</th>" : ""}
              ${includeParent ? "<th>Parent Contacted</th>" : ""}
              ${includeNotes ? "<th>Notes</th>" : ""}
            </tr>
          </thead>

          <tbody>
            ${rows || `<tr><td colspan="${columnCount}">No records found.</td></tr>`}
          </tbody>
        </table>

        <p class="footer">
          Generated through SFK KindTrack. Records are handled with fairness, respect, and kindness.
        </p>
      </body>
    </html>
  `);

  printWindow.document.close();

  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 250);

  closePrintOptions();
}

function openTermSummaryModal() {
  if (!termSummaryModal) return;
  renderTermSummary();
  termSummaryModal.classList.remove("hidden");
}

function closeTermSummary() {
  if (!termSummaryModal) return;
  termSummaryModal.classList.add("hidden");
}

if (feeToggle) {
feeToggle.onclick = () => {
  feesVisible = !feesVisible;
  document.body.classList.toggle("hide-fees");
  feeToggle.textContent = feesVisible ? "Hide Fees" : "Show Fees";
};
}

violationFilter.addEventListener("change", renderViolationList);

if (modalViolationFilter) {
  modalViolationFilter.addEventListener("change", () => {
    if (!modalViolationList) return;
    modalViolationList.innerHTML = buildViolationListHTML(
      selectedStudent,
      modalViolationFilter.value
    );
  });
}

if (closeStudentDetailsModal) {
  closeStudentDetailsModal.addEventListener("click", closeStudentDetailsPopup);
}

if (studentDetailsModal) {
  studentDetailsModal.addEventListener("click", event => {
    if (event.target === studentDetailsModal) {
      closeStudentDetailsPopup();
    }
  });
}

if (termFilter) {
  termFilter.addEventListener("change", () => {
    selectedTerm = termFilter.value;
    renderAll();
  });
}
studentSort.addEventListener("change", renderStudents);
studentSearch.addEventListener("input", renderStudents);

if (addForm) {
  addForm.addEventListener("submit", saveViolation);
}

if (editForm) {
  editForm.addEventListener("submit", saveEditedViolation);
}

if (closeEditModal) {
  closeEditModal.addEventListener("click", () => {
    editModal.classList.add("hidden");
  });
}

if (editModal) {
  editModal.addEventListener("click", event => {
    if (event.target === editModal) {
      editModal.classList.add("hidden");
    }
  });
}

if (confirmDeleteBtn) {
  confirmDeleteBtn.addEventListener("click", confirmDeleteViolation);
}

if (closeDeleteModal) {
  closeDeleteModal.addEventListener("click", () => {
    deleteModal.classList.add("hidden");
  });
}

if (deleteModal) {
  deleteModal.addEventListener("click", event => {
    if (event.target === deleteModal) {
      deleteModal.classList.add("hidden");
    }
  });
}

if (panelToggle && feePanel) {
  panelToggle.onclick = () => {
    feePanel.classList.toggle("panel-collapsed");

    panelToggle.textContent = feePanel.classList.contains("panel-collapsed")
      ? "View"
      : "Hide";
  };

  if (window.innerWidth <= 650) {
    feePanel.classList.add("panel-collapsed");
    panelToggle.textContent = "View";
  }
}

if (addPanelToggle && addPanel) {
  addPanelToggle.addEventListener("click", () => {
    closeAddViolationModal();
  });
}


if (openTermSummaryBtn) {
  openTermSummaryBtn.addEventListener("click", openTermSummaryModal);
}

if (closeTermSummaryModal) {
  closeTermSummaryModal.addEventListener("click", closeTermSummary);
}

if (termSummaryModal) {
  termSummaryModal.addEventListener("click", event => {
    if (event.target === termSummaryModal) {
      closeTermSummary();
    }
  });
}

if (quickAddViolationBtn && addPanel) {
  quickAddViolationBtn.addEventListener("click", () => {
    openAddViolationModal();
  });
}

if (addPanel) {
  addPanel.addEventListener("click", event => {
    if (event.target === addPanel) {
      closeAddViolationModal();
    }
  });
}

if (quickAttendanceBtn) {
  quickAttendanceBtn.addEventListener("click", openAttendanceModal);
}

if (quickSummaryBtn) {
  quickSummaryBtn.addEventListener("click", openTermSummaryModal);
}

if (quickPrintAllBtn) {
  quickPrintAllBtn.addEventListener("click", openPrintAllOptions);
}

if (openAttendanceModalBtn) {
  openAttendanceModalBtn.addEventListener("click", openAttendanceModal);
}

if (closeAttendanceModal) {
  closeAttendanceModal.addEventListener("click", closeAttendanceModalPanel);
}

if (attendanceModal) {
  attendanceModal.addEventListener("click", event => {
    if (event.target === attendanceModal) {
      closeAttendanceModalPanel();
    }
  });
}

if (attendanceDate) {
  attendanceDate.addEventListener("change", () => {
    renderAttendance();
  });
}

if (attendanceSearch) {
  attendanceSearch.addEventListener("input", renderAttendance);
}

if (attendanceFilter) {
  attendanceFilter.addEventListener("change", renderAttendance);
}

if (attendanceSort) {
  attendanceSort.addEventListener("change", renderAttendance);
}

if (attendanceShowAll) {
  attendanceShowAll.addEventListener("change", renderAttendance);
}

if (attendanceQuickSummary) {
  attendanceQuickSummary.addEventListener("click", event => {
    const button = event.target.closest("[data-attendance-status]");
    if (!button) return;
    openAttendanceStatusModal(button.dataset.attendanceStatus, getTodayISO());
  });
}

if (attendanceSummary) {
  attendanceSummary.addEventListener("click", event => {
    const button = event.target.closest("[data-attendance-status]");
    if (!button) return;
    openAttendanceStatusModal(button.dataset.attendanceStatus, getAttendanceDateValue());
  });
}

if (closeAttendanceStatusModal) {
  closeAttendanceStatusModal.addEventListener("click", closeAttendanceStatusPopup);
}

if (attendanceStatusModal) {
  attendanceStatusModal.addEventListener("click", event => {
    if (event.target === attendanceStatusModal) {
      closeAttendanceStatusPopup();
    }
  });
}

attendanceMarkModeButtons.forEach(button => {
  button.addEventListener("click", () => {
    attendanceMarkMode = button.dataset.attendanceMode || "Absent";
    renderAttendanceMarkMode();
  });
});

if (attendanceMonth) {
  attendanceMonth.addEventListener("change", renderMonthlyAttendance);
}

if (todayAttendanceBtn && attendanceDate) {
  todayAttendanceBtn.addEventListener("click", () => {
    attendanceDate.value = getTodayISO();
    if (attendanceShowAll) {
      attendanceShowAll.checked = false;
    }
    renderAttendance();
  });
}

if (attendanceList) {
  attendanceList.addEventListener("input", event => {
    const target = event.target;

    if (!target.matches(".attendance-remarks[data-student-id]")) return;

    setLocalAttendance(target.dataset.studentId, {
      remarks: target.value
    });

    renderAttendanceSummary(getAttendanceRowsForDate());
    renderAttendanceBoard(getAttendanceRowsForDate());
  });
}

if (saveAttendanceBtn) {
  saveAttendanceBtn.addEventListener("click", saveDailyAttendance);
}

if (printAttendanceBtn) {
  printAttendanceBtn.addEventListener("click", printAttendanceReport);
}

if (printMonthlyAttendanceBtn) {
  printMonthlyAttendanceBtn.addEventListener("click", printMonthlyAttendanceReport);
}

if (printRecordBtn) {
  printRecordBtn.addEventListener("click", openPrintOptions);
}

if (printAllBtn) {
  printAllBtn.addEventListener("click", openPrintAllOptions);
}

if (closePrintOptionsModal) {
  closePrintOptionsModal.addEventListener("click", closePrintOptions);
}

if (confirmPrintBtn) {
  confirmPrintBtn.addEventListener("click", printStudentRecord);
}

if (closePrintAllOptionsModal) {
  closePrintAllOptionsModal.addEventListener("click", closePrintAllOptions);
}

if (confirmPrintAllBtn) {
  confirmPrintAllBtn.addEventListener("click", printAllStudentRecords);
}

if (printAllOptionsModal) {
  printAllOptionsModal.addEventListener("click", event => {
    if (event.target === printAllOptionsModal) {
      closePrintAllOptions();
    }
  });
}

if (printOptionsModal) {
  printOptionsModal.addEventListener("click", event => {
    if (event.target === printOptionsModal) {
      closePrintOptions();
    }
  });
}

initAccessGate();
