Functional Requirements Document (FRD)

Project Name: Dental Management System (DMS)
Target Users: Philippine Dental Clinics (small to medium-sized practices)
Prepared For: Philippine Dental Practitioners and Clinic Staff

1. Introduction
1.1 Purpose

The purpose of the Dental Management System (DMS) is to streamline daily operations in Philippine dental clinics by providing tools for patient records management, appointment scheduling, billing and insurance processing, dental charting, and inventory tracking. The system will reduce manual work, improve patient experience, and comply with local healthcare workflows.

1.2 Scope

The DMS will support:

Patient registration and electronic health records (EHR).

Appointment booking and reminders.

Dental charting and treatment planning.

Billing, invoicing, and PhilHealth/HMO integration (basic).

Inventory and supplies management.

User roles: Admin (Clinic Owner/Manager), Dentist, Staff/Assistant, Patient (optional portal).

Deployment: Web-based (with optional mobile access).

2. System Overview

The system will have:

Web Application (Clinic Portal): For dentists, admin, and staff.

Patient Portal (optional): For patients to book/check appointments and access basic records.

Database: Centralized storage of clinic data.

Notification Services: Email/SMS reminders for appointments.

3. User Roles and Permissions
Role	Capabilities
Admin	Manage clinic profile, configure system settings, manage users, access all reports.
Dentist	View/edit patient records, create treatment plans, update dental charts, record notes.
Staff/Assistant	Schedule appointments, manage billing, update inventory, assist in record-keeping.
Patient (Portal)	View upcoming appointments, request bookings, see prescriptions and invoices.
4. Functional Requirements
4.1 Patient Management

Register new patients with demographic info (name, contact, birthday, address).

Maintain Electronic Health Records (EHR): medical history, allergies, dental history.

Upload patient documents (X-rays, lab results).

Assign unique patient ID.

Search/filter patient records by name, ID, or date of visit.

4.2 Appointment Management

Create, reschedule, cancel appointments.

View appointments in calendar format (daily, weekly, monthly).

Assign dentist to appointment.

Automated SMS/Email reminders to patients.

Walk-in patient queue management.

4.3 Dental Charting & Treatment Planning

Interactive dental chart (graphical tooth diagram).

Record conditions per tooth (decay, filling, extraction, etc.).

Attach treatment notes and prescriptions.

Save treatment history with date, dentist, and notes.

Generate treatment plan with cost estimation.

4.4 Billing & Payments

Generate invoices after treatment.

Record payments (cash, card, GCash, bank transfer).

Print/email receipts.

Apply discounts (senior citizen, PWD, promos).

Track unpaid balances.

Optional: PhilHealth/HMO claim processing (basic integration).

4.5 Inventory Management

Track dental supplies (gloves, anesthetics, fillings, crowns).

Monitor stock levels (low stock alerts).

Record supplier details.

Generate usage and reorder reports.

4.6 Reporting & Analytics

Daily/weekly/monthly revenue reports.

Appointment statistics (no-shows, completed visits).

Patient demographics (age groups, location).

Inventory usage trends.

4.7 User & Access Management

Create and manage user accounts.

Role-based permissions.

Audit logs (who accessed what, when).

4.8 Notifications & Communication

Automated SMS/email reminders.

Patient feedback form after appointments.

Broadcast announcements (clinic holidays, promos).

5. Non-Functional Requirements

Security: Patient data encrypted (at rest & in transit). Compliant with Philippine Data Privacy Act (RA 10173).

Performance: Should support at least 10 concurrent clinic staff users without lag.

Scalability: Designed to handle multiple branches in future versions.

Usability: Simple interface; Tagalog/English language toggle.

Backup & Recovery: Daily database backups with 30-day retention.

6. System Architecture (High-level)

Frontend: React.js / Next.js (web), React Native (optional mobile app).

Backend: Node.js (Express.js) with REST API.

Database: PostgreSQL.

Hosting: backend and front end: render

Integrations:

SMS Gateway (Globe/Telco API or 3rd party like Twilio). (future)

Payment gateways (GCash, Maya, credit card). (future)

7. Future Enhancements (Phase 2/3)

Tele-dentistry (video consultations).

AI-assisted dental charting (image-based detection).

Patient loyalty program.

Mobile app with push notifications.

Advanced HMO/PhilHealth integration.

