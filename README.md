# task-scheduler-dotnet - FullCalendar MVC App

ASP.NET 8 MVC task scheduling application with Frappe Gantt and FullCalendar integration. Supports interactive UI filters, timeline and calendar views, and dynamic task/event loading from SQL Server. Designed for planning, tracking, and visualizing schedules, interventions, and project activities in a unified interface.

## Features

- ASP.NET 8 MVC application structure
- FullCalendar integration for calendar-based intervention planning
- Frappe Gantt-style timeline visualization
- Dashboard with intervention status overview
- Interactive filtering by county, control group, SGI, asset type, date range, and status
- Intervention table with search, pagination, page-size selection, and role-based actions
- Create, Edit, and View intervention form using shared UI behavior
- Draft Intervention modal available globally from the application menu
- Delete confirmation modal for Approver users
- Settings page for email notification status configuration
- Responsive application shell with collapsible sidebar navigation
- Header with application logo/title and profile menu
- Power BI-style report page with intervention status chart
- Dynamic event/task loading via MVC endpoints
- Designed for SQL Server-backed intervention and scheduling data

## Purpose

This application provides a unified interface for intervention management, schedule planning, and project activity tracking. Users can review intervention status summaries, filter and inspect intervention records, visualize planned work on calendar and timeline views, and manage intervention details from a single responsive web application.

## Technology Stack

- ASP.NET Core 8 MVC
- C#
- Razor Views
- JavaScript
- Bootstrap
- FullCalendar
- Frappe Gantt-style timeline UI
- SQL Server
- HTML/CSS
