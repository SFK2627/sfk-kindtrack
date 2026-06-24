/*
  SFK KindTrack Apps Script update with Daily Attendance

  Required sheets:
  Students
  ViolationTypes
  Violations
  Settings
  Attendance

  Attendance headers:
  AttendanceID | StudentID | Date | Status | Remarks

  ViolationTypes extra optional headers:
  KindnessAlternative | KindnessValue

  Violations extra optional headers:
  SettlementType | KindnessTask | KindnessStatus | KindnessCompletedDate

  Auto Tardiness violation:
  When attendance status is Tardy, this script creates one Tardiness
  violation for the same student/date. It uses AutoSource and AutoKey
  to prevent duplicates. If the status is changed away from Tardy,
  the auto-created violation for that date is removed.

  Replace your Code.gs with this file, then deploy a NEW VERSION.
*/

function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const data = {
    students: getSheetData(ss.getSheetByName('Students')),
    violationTypes: getSheetData(ss.getSheetByName('ViolationTypes')),
    violations: getSheetData(ss.getSheetByName('Violations')),
    settings: getSheetData(ss.getSheetByName('Settings')),
    attendance: getSheetData(ss.getSheetByName('Attendance'))
  };

  return jsonResponse(data);
}

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const data = JSON.parse(e.postData.contents);

  if (data.action === 'saveAttendance') {
    return saveAttendanceRecords(ss, data);
  }

  if (data.action === 'saveAttendanceFast') {
    return saveAttendanceFastRecords(ss, data);
  }

  if (data.action === 'bulkAddViolationTypes') {
    return bulkAddViolationTypes(ss, data);
  }

  const sheet = ensureSheetWithHeaders(ss, 'Violations', [
    'RecordID',
    'StudentID',
    'Date',
    'ViolationType',
    'Fee',
    'Status',
    'ActionTaken',
    'ReflectionCommitment',
    'FollowUpDate',
    'FollowUpStatus',
    'ParentContacted',
    'Notes',
    'EncodedBy',
    'AutoSource',
    'AutoKey',
    'SettlementType',
    'KindnessTask',
    'KindnessStatus',
    'KindnessCompletedDate'
  ]);

  ensureColumn(sheet, 'ActionTaken');
  ensureColumn(sheet, 'ReflectionCommitment');
  ensureColumn(sheet, 'FollowUpDate');
  ensureColumn(sheet, 'FollowUpStatus');
  ensureColumn(sheet, 'ParentContacted');
  ensureColumn(sheet, 'AutoSource');
  ensureColumn(sheet, 'AutoKey');
  ensureColumn(sheet, 'SettlementType');
  ensureColumn(sheet, 'KindnessTask');
  ensureColumn(sheet, 'KindnessStatus');
  ensureColumn(sheet, 'KindnessCompletedDate');

  if (data.action === 'bulkAddViolations') {
    const studentIds = Array.from(new Set(
      (Array.isArray(data.studentIds) ? data.studentIds : [])
        .map(function(studentId) { return String(studentId || '').trim(); })
        .filter(Boolean)
    ));

    if (!studentIds.length) {
      return jsonResponse({ success: false, message: 'No students selected' });
    }

    const settlement = normalizeViolationSettlementForSheet(data);
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const recordIds = studentIds.map(function(studentId, index) {
      return 'REC-' + new Date().getTime() + '-' + (index + 1);
    });

    const rows = studentIds.map(function(studentId, index) {
      const rowData = {
        RecordID: recordIds[index],
        StudentID: studentId,
        Date: data.date,
        ViolationType: data.violationType,
        Fee: data.fee,
        Status: data.status || 'Unpaid',
        ActionTaken: data.actionTaken || '',
        ReflectionCommitment: data.reflection || '',
        FollowUpDate: data.followUpDate || '',
        FollowUpStatus: data.followUpStatus || 'Pending',
        ParentContacted: data.parentContacted || 'No',
        Notes: data.notes || '',
        EncodedBy: data.encodedBy || 'Sir JR',
        SettlementType: settlement.SettlementType,
        KindnessTask: settlement.KindnessTask,
        KindnessStatus: settlement.KindnessStatus,
        KindnessCompletedDate: settlement.KindnessCompletedDate
      };

      return headers.map(function(header) {
        return rowData[header] !== undefined ? rowData[header] : '';
      });
    });

    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, headers.length).setValues(rows);
    return jsonResponse({
      success: true,
      savedCount: rows.length,
      recordIds: recordIds,
      savedSettlement: settlement
    });
  }

  if (data.action === 'addViolation') {
    const recordId = 'REC-' + new Date().getTime();
    const settlement = normalizeViolationSettlementForSheet(data);

    appendByHeaders(sheet, {
      RecordID: recordId,
      StudentID: data.studentId,
      Date: data.date,
      ViolationType: data.violationType,
      Fee: data.fee,
      Status: data.status,
      ActionTaken: data.actionTaken || '',
      ReflectionCommitment: data.reflection || '',
      FollowUpDate: data.followUpDate || '',
      FollowUpStatus: data.followUpStatus || 'Pending',
      ParentContacted: data.parentContacted || 'No',
      Notes: data.notes || '',
      EncodedBy: data.encodedBy || 'Sir JR',
      SettlementType: settlement.SettlementType,
      KindnessTask: settlement.KindnessTask,
      KindnessStatus: settlement.KindnessStatus,
      KindnessCompletedDate: settlement.KindnessCompletedDate
    });

    return jsonResponse({ success: true, recordId: recordId, savedSettlement: settlement });
  }

  if (data.action === 'editViolation') {
    const row = findRowByRecordId(sheet, data.recordId);
    const settlement = normalizeViolationSettlementForSheet(data);

    if (!row) {
      return jsonResponse({ success: false, message: 'Record not found' });
    }

    updateByHeaders(sheet, row, {
      Date: data.date,
      ViolationType: data.violationType,
      Fee: data.fee,
      Status: data.status,
      ActionTaken: data.actionTaken || '',
      ReflectionCommitment: data.reflection || '',
      FollowUpDate: data.followUpDate || '',
      FollowUpStatus: data.followUpStatus || 'Pending',
      ParentContacted: data.parentContacted || 'No',
      Notes: data.notes || '',
      SettlementType: settlement.SettlementType,
      KindnessTask: settlement.KindnessTask,
      KindnessStatus: settlement.KindnessStatus,
      KindnessCompletedDate: settlement.KindnessCompletedDate
    });

    return jsonResponse({ success: true, savedSettlement: settlement });
  }

  if (data.action === 'deleteViolation') {
    const row = findRowByRecordId(sheet, data.recordId);

    if (!row) {
      return jsonResponse({ success: false, message: 'Record not found' });
    }

    sheet.deleteRow(row);
    return jsonResponse({ success: true });
  }

  return jsonResponse({ success: false, message: 'Invalid action' });
}


function isPaidWithKindnessStatusForSheet(value) {
  const normalized = String(value || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalized === 'paidwithkindness' || normalized === 'kindnesspaid' || normalized === 'paidkindness';
}

function isKindnessSettlementForSheet(value) {
  const normalized = String(value || '').trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalized.includes('kindness');
}

function normalizeViolationSettlementForSheet(data) {
  const status = String(data.status || data.Status || '').trim();
  let settlementType = String(data.settlementType || data.SettlementType || data['Settlement Type'] || 'Cash').trim();
  let kindnessTask = String(data.kindnessTask || data.KindnessTask || data['Kindness Task'] || '').trim();
  let kindnessStatus = String(data.kindnessStatus || data.KindnessStatus || data['Kindness Status'] || 'Pending').trim();
  let kindnessCompletedDate = normalizeDate(data.kindnessCompletedDate || data.KindnessCompletedDate || data['Kindness Completed Date'] || '');

  if (!settlementType) settlementType = 'Cash';
  if (!kindnessStatus) kindnessStatus = 'Pending';

  if (isPaidWithKindnessStatusForSheet(status)) {
    settlementType = 'Kindness Alternative Payment';
    kindnessStatus = 'Completed';
    if (!kindnessCompletedDate) {
      kindnessCompletedDate = normalizeDate(new Date());
    }
  }

  if (isKindnessSettlementForSheet(settlementType) && kindnessCompletedDate && String(kindnessStatus).toLowerCase() !== 'completed') {
    kindnessStatus = 'Completed';
  }

  if (!isKindnessSettlementForSheet(settlementType)) {
    kindnessTask = '';
    kindnessStatus = 'Pending';
    kindnessCompletedDate = '';
  }

  return {
    SettlementType: settlementType,
    KindnessTask: kindnessTask,
    KindnessStatus: kindnessStatus,
    KindnessCompletedDate: kindnessCompletedDate
  };
}

function saveAttendanceFastRecords(ss, data) {
  const sheet = ensureSheetWithHeaders(ss, 'Attendance', [
    'AttendanceID',
    'StudentID',
    'Date',
    'Status',
    'Remarks'
  ]);

  const date = normalizeDate(data.date);
  const records = Array.isArray(data.records) ? data.records : [];

  if (!date) {
    return jsonResponse({ success: false, message: 'Attendance date is required.' });
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const lastRow = sheet.getLastRow();
  const values = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, headers.length).getValues() : [];
  const studentIndex = headers.indexOf('StudentID');
  const dateIndex = headers.indexOf('Date');
  const rowByKey = {};

  values.forEach((row, index) => {
    const studentId = String(row[studentIndex] || '').trim();
    const rowDate = normalizeDate(row[dateIndex]);
    if (!studentId || !rowDate) return;
    rowByKey[rowDate + '|' + studentId] = {
      rowNumber: index + 2,
      row: row.slice()
    };
  });

  const changedRecords = [];
  const rowUpdates = [];
  const rowsToAppend = [];
  const todayKey = date.replace(/-/g, '');

  records.forEach(record => {
    const studentId = String(record.studentId || record.StudentID || '').trim();
    if (!studentId) return;

    const status = normalizeAttendanceStatusForSheet(record.status || record.Status);
    const remarks = String(record.remarks || record.Remarks || '').trim();
    const attendanceId = 'ATT-' + todayKey + '-' + studentId;
    const recordData = {
      AttendanceID: attendanceId,
      StudentID: studentId,
      Date: date,
      Status: status,
      Remarks: remarks
    };
    const outputRow = headers.map(header => recordData[header] !== undefined ? recordData[header] : '');
    const key = date + '|' + studentId;
    const existing = rowByKey[key];

    changedRecords.push({
      attendanceId: attendanceId,
      studentId: studentId,
      date: date,
      status: status,
      remarks: remarks
    });

    if (existing) {
      rowUpdates.push({ rowNumber: existing.rowNumber, row: outputRow });
      return;
    }

    // If the new state is plain Present and no row exists yet, we do not need a row.
    // Students are Present by default in the app.
    if (status === 'Present' && !remarks) return;

    rowsToAppend.push(outputRow);
  });

  writeRowsByNumber(sheet, rowUpdates, headers.length);

  if (rowsToAppend.length > 0) {
    sheet.getRange(sheet.getLastRow() + 1, 1, rowsToAppend.length, headers.length).setValues(rowsToAppend);
  }

  const syncResult = data.syncTardyViolations === false
    ? { created: 0, updated: 0, removed: 0 }
    : syncTardyViolations(ss, date, changedRecords);

  return jsonResponse({
    success: true,
    records: changedRecords,
    changedCount: changedRecords.length,
    fastMode: true,
    savedMode: 'changed-records-only',
    tardyViolationSync: syncResult
  });
}

function writeRowsByNumber(sheet, rowUpdates, width) {
  if (!rowUpdates || rowUpdates.length === 0) return;

  const sorted = rowUpdates.slice().sort((a, b) => a.rowNumber - b.rowNumber);
  let groupStart = sorted[0].rowNumber;
  let groupRows = [sorted[0].row];
  let previousRow = sorted[0].rowNumber;

  for (let i = 1; i < sorted.length; i++) {
    const item = sorted[i];

    if (item.rowNumber === previousRow + 1) {
      groupRows.push(item.row);
      previousRow = item.rowNumber;
      continue;
    }

    sheet.getRange(groupStart, 1, groupRows.length, width).setValues(groupRows);
    groupStart = item.rowNumber;
    groupRows = [item.row];
    previousRow = item.rowNumber;
  }

  sheet.getRange(groupStart, 1, groupRows.length, width).setValues(groupRows);
}

function saveAttendanceRecords(ss, data) {
  const sheet = ensureSheetWithHeaders(ss, 'Attendance', [
    'AttendanceID',
    'StudentID',
    'Date',
    'Status',
    'Remarks'
  ]);

  const date = normalizeDate(data.date);
  const records = Array.isArray(data.records) ? data.records : [];
  const savedRecords = [];
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const values = sheet.getDataRange().getValues();
  const existingRows = values.length > 1 ? values.slice(1) : [];
  const dateIndex = headers.indexOf('Date');
  const rowsFromOtherDates = existingRows.filter(row =>
    normalizeDate(row[dateIndex]) !== date
  );

  const rowsForSelectedDate = records.map(record => {
    const studentId = String(record.studentId || record.StudentID || '').trim();
    if (!studentId) return null;

    const status = normalizeAttendanceStatusForSheet(record.status || record.Status);
    const attendanceId = 'ATT-' + date.replace(/-/g, '') + '-' + studentId;
    const recordData = {
      AttendanceID: attendanceId,
      StudentID: studentId,
      Date: date,
      Status: status,
      Remarks: record.remarks || ''
    };

    savedRecords.push({
      attendanceId: attendanceId,
      studentId: studentId,
      date: date,
      status: status,
      remarks: record.remarks || ''
    });

    return headers.map(header => recordData[header] !== undefined ? recordData[header] : '');
  }).filter(Boolean);

  const outputRows = rowsFromOtherDates.concat(rowsForSelectedDate);

  sheet.clearContents();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  if (outputRows.length > 0) {
    sheet.getRange(2, 1, outputRows.length, headers.length).setValues(outputRows);
  }

  const syncResult = data.syncTardyViolations === false
    ? { created: 0, updated: 0, removed: 0 }
    : syncTardyViolations(ss, date, savedRecords);

  return jsonResponse({
    success: true,
    records: savedRecords,
    tardyViolationSync: syncResult
  });
}

function syncTardyViolations(ss, date, attendanceRecords) {
  const violationsSheet = ensureSheetWithHeaders(ss, 'Violations', [
    'RecordID',
    'StudentID',
    'Date',
    'ViolationType',
    'Fee',
    'Status',
    'ActionTaken',
    'ReflectionCommitment',
    'FollowUpDate',
    'FollowUpStatus',
    'ParentContacted',
    'Notes',
    'EncodedBy',
    'AutoSource',
    'AutoKey',
    'SettlementType',
    'KindnessTask',
    'KindnessStatus',
    'KindnessCompletedDate'
  ]);

  ensureColumn(violationsSheet, 'ActionTaken');
  ensureColumn(violationsSheet, 'ReflectionCommitment');
  ensureColumn(violationsSheet, 'FollowUpDate');
  ensureColumn(violationsSheet, 'FollowUpStatus');
  ensureColumn(violationsSheet, 'ParentContacted');
  ensureColumn(violationsSheet, 'AutoSource');
  ensureColumn(violationsSheet, 'AutoKey');
  ensureColumn(violationsSheet, 'SettlementType');
  ensureColumn(violationsSheet, 'KindnessTask');
  ensureColumn(violationsSheet, 'KindnessStatus');
  ensureColumn(violationsSheet, 'KindnessCompletedDate');

  const headers = violationsSheet.getRange(1, 1, 1, violationsSheet.getLastColumn()).getValues()[0];
  const lastRow = violationsSheet.getLastRow();
  const values = lastRow > 1 ? violationsSheet.getRange(2, 1, lastRow - 1, headers.length).getValues() : [];
  const autoKeyIndex = headers.indexOf('AutoKey');
  const rowByAutoKey = {};

  values.forEach((row, index) => {
    const key = String(row[autoKeyIndex] || '').trim();
    if (!key) return;
    rowByAutoKey[key] = {
      rowNumber: index + 2,
      row: row.slice()
    };
  });

  const tardinessType = getTardinessType(ss);
  const violationName = tardinessType.name || 'Tardiness';
  const violationFee = tardinessType.fee || 0;
  const kindnessTask = tardinessType.kindnessAlternative
    ? (tardinessType.kindnessAlternative + (tardinessType.kindnessValue ? ' (' + tardinessType.kindnessValue + ')' : ''))
    : '';
  const result = { created: 0, updated: 0, removed: 0 };
  const rowUpdates = [];
  const rowsToAppend = [];
  const rowsToDelete = [];

  attendanceRecords.forEach(record => {
    const studentId = String(record.studentId || '').trim();
    if (!studentId) return;

    const autoKey = buildTardyAutoKey(date, studentId);
    const existing = rowByAutoKey[autoKey];

    if (isTardyAttendanceStatus(record.status)) {
      const data = {
        Date: date,
        ViolationType: violationName,
        Fee: violationFee,
        ActionTaken: 'Attendance marked Tardy / Late',
        ReflectionCommitment: '',
        FollowUpDate: '',
        FollowUpStatus: 'Pending',
        ParentContacted: 'No',
        Notes: 'Auto-created from Daily Attendance Tardy / Late record.',
        EncodedBy: 'Daily Attendance',
        AutoSource: 'AttendanceTardy',
        AutoKey: autoKey,
        SettlementType: 'Cash',
        KindnessTask: kindnessTask,
        KindnessStatus: 'Pending',
        KindnessCompletedDate: ''
      };

      if (existing) {
        const updatedRow = existing.row.slice();
        headers.forEach((header, colIndex) => {
          if (data[header] !== undefined) {
            updatedRow[colIndex] = data[header];
          }
        });
        rowUpdates.push({ rowNumber: existing.rowNumber, row: updatedRow });
        result.updated++;
      } else {
        const newRecord = Object.assign({
          RecordID: 'REC-' + new Date().getTime() + '-' + studentId,
          StudentID: studentId,
          Status: 'Unpaid'
        }, data);
        rowsToAppend.push(headers.map(header => newRecord[header] !== undefined ? newRecord[header] : ''));
        result.created++;
      }

      return;
    }

    if (existing) {
      rowsToDelete.push(existing.rowNumber);
      result.removed++;
    }
  });

  writeRowsByNumber(violationsSheet, rowUpdates, headers.length);

  rowsToDelete.sort((a, b) => b - a).forEach(rowNumber => {
    violationsSheet.deleteRow(rowNumber);
  });

  if (rowsToAppend.length > 0) {
    violationsSheet.getRange(violationsSheet.getLastRow() + 1, 1, rowsToAppend.length, headers.length).setValues(rowsToAppend);
  }

  return result;
}

function bulkAddViolationTypes(ss, data) {
  const sheet = ensureSheetWithHeaders(ss, 'ViolationTypes', [
    'ViolationID',
    'ViolationName',
    'Fee',
    'AlertThreshold',
    'Category',
    'KindnessAlternative',
    'KindnessValue'
  ]);

  ensureColumn(sheet, 'KindnessAlternative');
  ensureColumn(sheet, 'KindnessValue');

  const records = Array.isArray(data.records) ? data.records : [];
  const existingRows = getSheetData(sheet);
  const existingNames = {};
  let maxNumber = 0;
  let added = 0;
  let skipped = 0;

  existingRows.forEach(row => {
    const nameKey = normalizeNameKey(row.ViolationName);
    if (nameKey) existingNames[nameKey] = true;

    const idMatch = String(row.ViolationID || '').match(/(\d+)/);
    if (idMatch) {
      maxNumber = Math.max(maxNumber, Number(idMatch[1]) || 0);
    }
  });

  records.forEach(record => {
    const name = String(record.name || record.ViolationName || '').trim();
    const nameKey = normalizeNameKey(name);

    if (!name || existingNames[nameKey]) {
      skipped++;
      return;
    }

    maxNumber++;
    const violationId = 'V' + String(maxNumber).padStart(3, '0');

    appendByHeaders(sheet, {
      ViolationID: violationId,
      ViolationName: name,
      Fee: Number(record.fee || record.Fee) || 0,
      AlertThreshold: Number(record.threshold || record.AlertThreshold) || 3,
      Category: String(record.category || record.Category || '').trim(),
      KindnessAlternative: String(record.kindnessAlternative || record.KindnessAlternative || record['Kindness Alternative'] || '').trim(),
      KindnessValue: String(record.kindnessValue || record.KindnessValue || record['Kindness Value'] || '').trim()
    });

    existingNames[nameKey] = true;
    added++;
  });

  return jsonResponse({
    success: true,
    added: added,
    skipped: skipped
  });
}

function normalizeNameKey(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function getTardinessType(ss) {
  const sheet = ss.getSheetByName('ViolationTypes');
  const fallback = { name: 'Tardiness', fee: 0, kindnessAlternative: '', kindnessValue: '' };

  if (!sheet) return fallback;

  const rows = getSheetData(sheet);
  const tardiness = rows.find(row => {
    const name = String(row.ViolationName || '').trim().toLowerCase();
    return name === 'tardiness' || name === 'tardy' || name.includes('tardy') || name.includes('late');
  });

  if (!tardiness) return fallback;

  return {
    name: tardiness.ViolationName || 'Tardiness',
    fee: Number(tardiness.Fee) || 0,
    kindnessAlternative: tardiness.KindnessAlternative || tardiness['Kindness Alternative'] || '',
    kindnessValue: tardiness.KindnessValue || tardiness['Kindness Value'] || ''
  };
}

function normalizeAttendanceStatusForSheet(status) {
  const normalized = String(status || '').trim().toLowerCase();

  if (normalized === 'late' || normalized === 'lates' || normalized === 'tardy' || normalized === 'tardiness') {
    return 'Tardy';
  }

  if (normalized === 'absent') return 'Absent';
  if (normalized === 'excused') return 'Excused';
  return 'Present';
}

function isTardyAttendanceStatus(status) {
  return normalizeAttendanceStatusForSheet(status) === 'Tardy';
}

function buildTardyAutoKey(date, studentId) {
  return 'ATT-TARDY-' + normalizeDate(date) + '-' + String(studentId).trim();
}

function findRowByAutoKey(sheet, autoKey) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return null;

  const headers = values[0];
  const autoKeyIndex = headers.indexOf('AutoKey');

  if (autoKeyIndex === -1) return null;

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][autoKeyIndex]) === String(autoKey)) {
      return i + 1;
    }
  }

  return null;
}


function rowToObject(headers, row) {
  const object = {};
  headers.forEach((header, index) => {
    object[header] = row[index];
  });
  return object;
}

function getSheetData(sheet) {
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0];

  return values.slice(1).map(row => {
    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = row[index];
    });

    return obj;
  });
}

function findRowByRecordId(sheet, recordId) {
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const recordIndex = headers.indexOf('RecordID');

  if (recordIndex === -1) return null;

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][recordIndex]) === String(recordId)) {
      return i + 1;
    }
  }

  return null;
}

function findAttendanceRow(sheet, studentId, date) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return null;

  const headers = values[0];
  const studentIndex = headers.indexOf('StudentID');
  const dateIndex = headers.indexOf('Date');

  if (studentIndex === -1 || dateIndex === -1) return null;

  for (let i = 1; i < values.length; i++) {
    const rowStudentId = String(values[i][studentIndex]).trim();
    const rowDate = normalizeDate(values[i][dateIndex]);

    if (rowStudentId === String(studentId).trim() && rowDate === date) {
      return i + 1;
    }
  }

  return null;
}

function ensureSheetWithHeaders(ss, sheetName, headers) {
  let sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  if (sheet.getLastColumn() === 0 || sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    return sheet;
  }

  headers.forEach(header => ensureColumn(sheet, header));
  return sheet;
}

function ensureColumn(sheet, columnName) {
  const lastColumn = sheet.getLastColumn();

  if (lastColumn === 0) {
    sheet.getRange(1, 1).setValue(columnName);
    return;
  }

  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];

  if (!headers.includes(columnName)) {
    sheet.getRange(1, lastColumn + 1).setValue(columnName);
  }
}

function appendByHeaders(sheet, data) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = headers.map(header => data[header] !== undefined ? data[header] : '');
  sheet.appendRow(row);
}

function updateByHeaders(sheet, rowNumber, data) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  Object.keys(data).forEach(key => {
    const colIndex = headers.indexOf(key);

    if (colIndex !== -1) {
      sheet.getRange(rowNumber, colIndex + 1).setValue(data[key]);
    }
  });
}

function normalizeDate(value) {
  if (!value) return '';

  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value)) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }

  const raw = String(value).trim();
  if (!raw) return '';

  const isoOnly = raw.split('T')[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoOnly)) return isoOnly;

  const slashMatch = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slashMatch) {
    const month = slashMatch[1].padStart(2, '0');
    const day = slashMatch[2].padStart(2, '0');
    const year = slashMatch[3];
    return year + '-' + month + '-' + day;
  }

  const parsed = new Date(raw);
  if (!isNaN(parsed)) {
    return Utilities.formatDate(parsed, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }

  return isoOnly;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
