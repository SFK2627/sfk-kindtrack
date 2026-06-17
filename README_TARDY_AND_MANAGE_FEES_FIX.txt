SFK KindTrack - Tardy Auto Violation + Manage Fees Fix

What changed:
1. Attendance status values "Tardy", "Late", "late", and "tardiness" are normalized as Tardy.
2. Saving attendance with a Tardy / Late student creates a Tardiness violation record.
3. Same student + same date will not duplicate the auto Tardiness violation.
4. Changing the student away from Tardy removes the auto-created Tardiness violation.
5. Admin now has Manage Fees, with single add and bulk import.

Required Google Sheets setup:
ViolationTypes headers:
ViolationID | ViolationName | Fee | AlertThreshold | Category

Recommended Tardiness row:
V001 | Tardiness | 5 | 3 | Punctuality

The fee used for the automatic violation comes from the Tardiness row in ViolationTypes.
If Tardiness is missing, the auto violation will still be created but the fee will be 0.

Bulk import format:
No ID | 10 | Uniform | 3
Tardiness | 5 | Punctuality | 3
No Assignment | 5 | Responsibility | 3

Required deployment step:
Replace your Apps Script Code.gs with CodeGS_Attendance_Update.txt.
Then deploy a NEW VERSION of the web app.

How to confirm the correct Apps Script is deployed:
After saving attendance, the attendance message should show:
Tardiness sync: +1, updated 0, removed 0

If that text does not appear, the web app is still using the old Apps Script deployment.
