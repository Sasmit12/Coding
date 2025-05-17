Social Buttons: Google/Facebook buttons present, but not implemented (no id or click handlers; can be enhanced).

 js/auth.js
 Potential Issues/Improvements:

Error Handling: Alerts are simple, but could be improved with better UI feedback.
No Duplicate Email Check: Relies on Firebase to throw error if email exists (OK).
Social Login: No actual implementation (buttons only).
Password Security: No password strength check; could be improved.

Suggestions for Full 100% Robustness:
Social Signup: Buttons are placeholders; implement Firebase Google/Facebook auth if needed.
Form UX Improvements:
Show inline errors (not just alert).
Disable submit button during signup to prevent double submits.
Add password strength indicator.
Security:
Enforce password policy (min 8 chars, etc.).
Validate email format more strictly, if needed.
Accessibility:
Add aria-* attributes for better screen reader support on error messages.
Ensure all interactive elements are keyboard-accessible (they mostly are).
Deployment:
If using Firebase Hosting, and all routes are rewritten to index.html (SPA mode), use client-side routing or ensure static HTML pages are linked correctly.