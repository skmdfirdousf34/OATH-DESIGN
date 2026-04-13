OATH
🔒 CONFIDENTIAL — INTERNAL USE ONLY
OATH OWN YOUR TIME
Product Requirements Document
DOCUMENT ID OATH-PRD-001
VERSION 1.0
STATUS DRAFT — UNDER REVIEW
DATE April 5, 2026
AUTHOR Firdous
CLASSIFICATION Confidential — Internal Use Only
PLATFORM Android (v1.0)  |  iOS (Future)
PREPARED FOR Product, Design & Engineering Teams
OATH-PRD-001 Confidential — Internal Use Only © 2026 OATH App
TABLE OF CONTENTS
1. Document Control
2. Executive Summary
3. Product Vision
4. Target Users
5. Core Problems Being Solved
6. Core Solution Framework
7. User Onboarding
8. Recommended Study Hours
9. Routine & Distraction Blocking System
10. Study Verification & Interview System
11. Access Filters & Break Management
12. Study Analytics Dashboard
13. Focus Reputation System
14. Advanced Discipline Features
15. Discipline Levels (Progression System)
16. Technical & Implementation Scope
SECTION 0
Document Control
Revision History
Version
Date
1.0
April 5,
2026
Author
Description of Changes
Firdous
Initial Draft Creation
OATH-PRD-001 | Version 1.0
Confidential — Internal Use Only
© 2026 OATH App
SECTION 1
Executive Summary
OATH is a mobile application built to address the #1 obstacle preventing JEE and NEET
aspirants from reaching their full potential: lack of discipline and digital distraction.
Unlike existing EdTech platforms that focus on content delivery, OATH is a discipline
enforcement system that controls distractions, enforces structured study routines, and
builds long-term academic habits.
This document defines the complete product requirements for Version 1.0 of the OATH
application, including functional requirements, system behavior, user flows, and
implementation scope.
SECTION 2
Product Vision
OATH is a discipline-driven productivity and accountability system designed specifically
for JEE and NEET aspirants. Unlike platforms such as PW or Unacademy, this app does
not deliver lectures or study content. Instead, the system focuses on controlling
distractions, enforcing study routines, and building long-term discipline.
Primary Goal: Transform motivated beginners into highly disciplined aspirants capable of
succeeding in competitive exams.
SECTION 3
Target Users
Primary Users: JEE and NEET aspirants
Class Levels: Class 9, 10, 11, 12, and Droppers
User Profile: Students who want to commit to a disciplined preparation routine —
including those struggling with distractions (social media, gaming), lack of
accountability (offline coaching, online, or self-study), and inconsistent study habits.
SECTION 4
Core Problems Being Solved
📱 ONLINE DISTRACTIONS
Instagram
YouTube
OTT Platforms
Adult Content
Gaming
Dating Apps
Phone Loops
🚶 OFFLINE DISTRACTIONS
Skipping coaching classes
Hostel gossip
Unnecessary outings
Relationship distractions
Lack of accountability
SECTION 5
Core Solution Framework
The solution is built on four fundamental pillars:
1. Routine Commitment: Structured daily planning.
2. Distraction Blocking: Strict digital lockouts that cannot be bypassed.
3. Verification System: Post-study interviews to confirm learning.
4. Accountability: Reporting and monitoring with parent/mentor alerts.
OATH-PRD-001 | Version 1.0
Confidential — Internal Use Only
© 2026 OATH App
SECTION 6
User Onboarding
Upon installation, the user must provide the following details to configure the system:
Personal Info: Name, Parent/Mentor contact (optional).
Academic Profile: Exam type (JEE/NEET), Current Class.
Habits: Biggest distractions, Coaching type (Offline/Online/Self).
SECTION 7
Recommended Study Hours
The system enforces study hours based on the academic level of the student. Note:
Hours include Coaching + School + Self-Study time combined.
Class Level
Recommended Daily Hours
Class 9 – 10
Class 11
Class 12
Dropper
9 – 10 hours/day
11 hours/day
12 hours/day
Minimum 13 hours/day
SECTION 8
Routine & Distraction Blocking System
8.1 Study Routine System
Users create time blocks (e.g., Self Study: 6 PM – 10 PM). During these blocks,
distraction blocking activates automatically.
8.2 Distraction Blocking Protocol
The system rigorously blocks access. Users CANNOT bypass blocks during active
sessions.
⚠ CRITICAL REQUIREMENT: Users CANNOT bypass distraction blocks during active sessions.
This is a non-negotiable system constraint.
Social Media
Gaming Apps
OTT Platforms
Adult Content
Non-Educational Browsing
SECTION 9
Study Verification & Interview System
9.1 Post-Study Interview
After each session, the student reports the Subject, Chapter, and Topic studied. The
system generates topic-specific JEE/NEET pattern MCQ questions. Users must explain
concepts/formulas (not just guess).
9.2 Session Evaluation
ABOVE THRESHOLD = SUCCESS
9.3 Repeated Failure
BELOW THRESHOLD = FAILED
5–6 consecutive failures triggers parent/mentor notification.
9.4 Interview Skipping Penalty
Penalty: If the interview is skipped, the distraction block remains ACTIVE indefinitely until the
interview is completed.
OATH-PRD-001 | Version 1.0
Confidential — Internal Use Only
© 2026 OATH App
SECTION 10
Access Filters & Break Management
10.1 Educational Filter
While entertainment is blocked, the following categories remain accessible to support
learning:
✓
Educational YouTube
✓
Educational Websites
10.2 Coaching Verification
✓
Research Browsing
✓
AI Tools
For coaching hours (e.g., 8 AM – 3 PM), students must upload handwritten notes as
proof of attendance.
10.3 Official Break System
✓ Burnout Prevention: Blocking is disabled on Sundays, Major Festivals, and 3–4 emergency
break days per month.
SECTION 11
Study Analytics Dashboard
The dashboard provides comprehensive performance insights:
Daily Study Hours & Screen Time
Productive vs. Distracted Usage
Subject Strength/Weakness Analysis
Chapter Progress & Goal Comparison
SECTION 12
Focus Reputation System
12.1 Focus Score (0–100)
Calculated based on Study Hours, Distraction Attempts, Interview Completion, and Quiz
Accuracy.
Score Range
Status
90 – 100
70 – 89
ELITE FOCUS (EXCELLENT)
50 – 69 AVERAGE
DISCIPLINED (GOOD)
Below 50
12.2 Achievement Badges
7-Day Warrior: Bronze
14-Day Focus Beast: Silver
NEEDS IMPROVEMENT
30-Day Discipline Master: Gold
12.3 Discipline Heatmap
Calendar visualization — Productive days (Green) vs. Wasted days (Red).
OATH-PRD-001 | Version 1.0
Confidential — Internal Use Only
© 2026 OATH App
SECTION 13
Advanced Discipline Features
13.1 Focus Streak Insurance
Protects long streaks (25+ days) from a single failure using a weekly mistake allowance.
13.2 AIR Prediction Simulator
Predicts exam rank range (e.g., AIR 3,000–6,000) based on discipline score, quiz
accuracy, and consistency.
SECTION 14
Discipline Levels (Progression System)
Users progress through six levels as they build discipline and consistency:
01 Distracted Beginner
03 Discipline Builder
05 Elite Aspirant
02 Focus Trainee
04 Focus Warrior
06 IIT Mindset
SECTION 15
Technical & Implementation Scope
15.1 Platform
Version 1.0: Android
Future Scope: iOS
15.2 Version 1 Scope
Routine System, Distraction Blocking, Study Interview System, Analytics Dashboard,
Focus Score, Heatmap, Badge System.
15.3 Admin Panel (Future Scope)
Manage analytics, question banks, filters, and monitor platform activity.
15.4 Uninstall Protection — Deferred
⚠ OUT OF SCOPE — Version 1.0: Feature where users cannot uninstall app unless they reach a
10-day streak and acceptable discipline score. This condition was proposed during onboarding
design but has been explicitly removed from V1 scope. Revisit in V2 planning.
OATH
OWN YOUR TIME
OATH-PRD-001  |  Version 1.0  |  April 5, 2026
Confidential — Internal Use Only
© 2026 OATH App  |  Created by Firdous  |  All Rights Reserved