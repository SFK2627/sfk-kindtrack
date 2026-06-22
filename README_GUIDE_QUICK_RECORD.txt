SFK KindTrack - Kindness Guide Quick Record Update

Upload/replace:
- index.html
- script.js
- style.css
- service-worker.js
- Code.gs using CodeGS_Attendance_Update.txt

What changed:
- In Admin Mode, the entire Kindness Guide / Violation Fee List item is clickable.
- Clicking the violation item opens Add Violation with the violation type already selected.
- The guide workflow supports selecting one or multiple students using a searchable checklist.
- Select All Visible and Clear controls are included.
- All selected students receive the same violation details, with Unpaid and Cash as defaults.
- Save for Selected Students creates a separate record for every selected student.
- The updated Code.gs adds one-request bulk saving for faster encoding.
- The fee is automatically taken from the selected violation type when saved.
- The suggested Kindness Alternative Payment is prepared automatically.
- The form is reset first, today's date is restored, and the student field receives focus.
- View Only Mode keeps the guide as a regular non-clickable list.

Important:
- Replace Code.gs with CodeGS_Attendance_Update.txt.
- Deploy the Apps Script as a New Version.
- The app has a slower compatibility fallback until the new deployment is active.
