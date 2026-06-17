SFK KindTrack - Manage Violation Fees Update

Added:
- Admin-only Manage Fees button in Kindness Guide / Violation Fee List
- Add single violation type with fee, category, and alert threshold
- Edit existing violation type
- Delete violation type from fee list
- Bulk add/import multiple violation types in one input

Bulk format:
Name | Fee | Category | Alert Threshold

Example:
No ID | 10 | Uniform | 3
No Assignment | 5 | Responsibility | 3
Tardiness | 5 | Punctuality | 3
Using phone during class | 20 | Device Use | 2

Google Sheets tab needed:
ViolationTypes

Headers:
ViolationID | ViolationName | Fee | AlertThreshold | Category

Important:
- Replace Code.gs using CodeGS_Attendance_Update.txt.
- Deploy New Version in Apps Script after replacing Code.gs.
- No new sheet is needed if ViolationTypes already exists.
