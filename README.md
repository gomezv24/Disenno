# Academic Management System for Course Inclusions, Requirements Waivers, and Withdrawals at ITCR

## Project Description

This project develops an automated academic management system for the School of Computer Engineering at the Technological Institute of Costa Rica (ITCR). The system is designed to streamline course inclusion processes, prerequisite waivers, and course withdrawals, replacing current manual Google Forms methods with a centralized, efficient platform.

## Key Features

- **Student Portal**:
  - Submit inclusion/waiver/withdrawal requests
  - Real-time request tracking
  - Email notifications
  - Request history

- **Coordinator Dashboard**:
  - Request review/approval system
  - Advanced filtering options
  - Visual analytics
  - Reviewer assignment

- **Administrative Tools**:
  - System-wide request monitoring
  - CSV report generation
  - Institutional planning tools

- **Admin Console**:
  - User/Role management
  - System configuration
  - Technical maintenance

## Technology Stack

**Frontend**: React + Material UI  
**Backend**: Node.js + Express.js  
**Database**: PostgreSQL (Supabase)  
**Authentication**: JWT with institutional credentials  
**Version Control**: GitHub  

## Installation

```bash
# Clone repository
git clone https://github.com/[username]/itcr-academic-system.git

# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Configure environment variables
# Create .env files in both frontend and backend directories

# Run development servers
npm start # in both frontend and backend directories
