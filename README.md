# Dental Management System (DMS) - Phase 1

A comprehensive dental clinic management system designed specifically for Philippine dental practices. This is Phase 1 of the project, focusing on the frontend implementation with mock data and CRUD operations.

## Features

### 🏥 Core Functionality
- **Patient Management**: Complete electronic health records with demographic info, medical history, and document uploads
- **Appointment Scheduling**: Smart calendar system with daily/weekly/monthly views and automated reminders
- **Dental Charting**: Interactive dental charts with treatment planning and comprehensive treatment history
- **Billing & Payments**: Streamlined invoicing with PhilHealth/HMO integration and multiple payment options
- **Inventory Management**: Track dental supplies with low stock alerts and automated reorder reports
- **Reports & Analytics**: Comprehensive reports on revenue, appointments, patient demographics, and trends

### 👥 Role-Based Access Control
- **Admin**: Full system access, clinic management, user management
- **Dentist**: Patient records, treatment planning, dental charting
- **Staff**: Appointment scheduling, billing, inventory management
- **Patient**: View appointments, access basic records (optional portal)

### 🎨 Modern UI/UX
- Built with Next.js 15 and Chakra UI v3
- Responsive design for desktop and mobile
- Philippine dental clinic context and branding
- Interactive components with smooth animations

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Library**: Chakra UI v3
- **Icons**: React Icons (Feather Icons)
- **Styling**: Emotion (CSS-in-JS)
- **State Management**: React Context API
- **Authentication**: Mock authentication system

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dms
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Accounts

The system includes mock authentication with the following demo accounts:

- **Admin**: `admin@clinic.com` / `password`
- **Dentist**: `dentist@clinic.com` / `password`
- **Staff**: `staff@clinic.com` / `password`
- **Patient**: `patient@clinic.com` / `password`

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── Layout.tsx      # Main layout wrapper
│   │   ├── Navigation.tsx  # Role-based navigation
│   │   └── ProtectedRoute.tsx # Route protection
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication context
│   ├── dashboard/          # Dashboard page
│   ├── patients/           # Patient management
│   ├── appointments/       # Appointment scheduling
│   ├── charting/           # Dental charting
│   ├── billing/            # Billing and payments
│   ├── inventory/          # Inventory management
│   ├── reports/            # Reports and analytics
│   ├── settings/           # User settings
│   ├── notifications/      # Notifications
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   └── page.tsx            # Landing page
├── theme.ts                # Chakra UI theme configuration
└── layout.tsx              # Root layout
```

## Key Features Implemented

### ✅ Phase 1 Complete
- [x] Modern landing page with Philippine dental clinic context
- [x] Role-based authentication system
- [x] Comprehensive dashboard for all user roles
- [x] Patient management with CRUD operations
- [x] Appointment scheduling with calendar views
- [x] Interactive dental charting system
- [x] Billing and payment processing
- [x] Inventory management with alerts
- [x] Reports and analytics dashboard
- [x] User settings and notifications
- [x] Responsive design for all devices
- [x] Mock data and CRUD operations

### 🔄 Phase 2 (Future)
- [ ] Backend API with Node.js and Express
- [ ] PostgreSQL database with migrations
- [ ] Real authentication with JWT
- [ ] SMS/Email notification services
- [ ] PhilHealth/HMO integration
- [ ] Payment gateway integration
- [ ] Production deployment on Render
- [ ] Comprehensive testing suite

## Compliance & Security

- Designed for Philippine Data Privacy Act (RA 10173) compliance
- Role-based access control
- Secure authentication system
- Data encryption ready for backend integration

## Contributing

This is Phase 1 of the DMS project. The frontend is complete and ready for backend integration in Phase 2.

## License

This project is proprietary software developed for Philippine dental clinics.

---

**Phase 1 Status**: ✅ Complete - Frontend with mock data and CRUD operations
**Next Phase**: Backend API development and database integration