# Todo App Requirements Document

## Overview

This document outlines the functional requirements for a modern web-based todo application based on the provided design mockups. The application will be built using Next.js 15, TypeScript, and Tailwind CSS following our established architectural guidelines.

## Design Analysis

### Image 1: French Mobile Interface (3 Screens)

**Translation and Analysis:**

**Screen 1 - Main Todo List:**

- Header: "TODO" with emoji
- Urgent tasks section ("Tâches urgentes"):
  - "Payer les factures" (Pay the bills)
  - "Réparer aux mails urgents" (Reply to urgent emails)
- Other tasks section ("Autres tâches"):
  - "Aller chez le dentiste" (Go to the dentist)
  - "Nettoyer le frigo" (Clean the fridge)
  - "Acheter une chaise de bureau" (Buy an office chair)
  - "Racheter de l'huile d'olive" (Buy olive oil)
- Bottom navigation with add button (+), list view, and timer

**Screen 2 - Category Selection:**

- Header: "TODO" with emoji
- "Sélectionnez votre catégorie:" (Select your category:)
- Category icons with emojis (various categories like food, work, etc.)
- "Quelle tâche avez-vous à effectuer ?" (What task do you have to do?)
- Text input field
- "La tâche est urgente ⚠️" (The task is urgent)
- Bottom navigation

**Screen 3 - Task History:**

- Header: "TODO" with emoji
- "Historique des tâches:" (Task history:)
- Completed tasks with checkmarks:
  - "Nettoyer le frigo" (Clean the fridge)
  - "Rendre les livres de la bibliothèque avant mardi prochain" (Return library books before next Tuesday)
- Bottom navigation

### Image 2: English Mobile Interface - Search Screen

- Header: "Search"
- Search bar: "Tasks, Projects, and More"
- "Recently Viewed" section with:
  - Home 🏠 (with # symbol)
  - "Go to the post office" (completed, with 4/4 progress, Today)
  - "Go to the grocery store" (pending, Milk, Tomorrow, Household To Do #)
  - "Clean cat litter boxes" (pending, Thursday, Home 🏠 / Routines)
- "Upcoming" section
- Bottom navigation: Today, Inbox, Search (active), Browse
- Red floating action button (+)

## Web Application Pages & Functionality

### 1. Dashboard/Home Page (`/`)

**Primary Functions:**

- Display urgent tasks prominently
- Filter tasks by type using the emoji icons (or remove selections by clicking again, no selection = all tasks)
- Show regular tasks in organized sections
- Quick task creation in footer, button (+), navigates to new task page
- Task status management (complete/incomplete)
- Click icon in footer to show archived tasks
- Priority indicators (urgent/normal)
- Search functionality field in header(auto suggest matches when typing)
- Add function to complete a task
- Add function to delete a task
- Add function to edit a task (using the /new route)
- Tasks in "new/open" state needs to ge accepted by user to get into the approved state. These needs to be listed first and handeled before other tasks and cannot be completed before accepted.

**Components:**



### 2. Task Creation Page (`/tasks/new`)

**Primary Functions:**

- Create new tasks
- Select task category by selecting one emoji icon
- Type in task name/title (required)
- Set priority level (urgent/normal) (default normal)
- Add due dates (optional)
- Add descriptions  (optional)
- Add simple subtasks (optional)
- Save and cancel buttons both take you to the frontpage

**Components:**

### 3. Search functionality/Page (`/search`)

**Primary Functions:**

- Search across all tasks and projects for title and description (auto suggest matches when typing)
- clicking result takes you to the task detail page

**Components:**

### 4. Task History Page (`/archive`)

**Primary Functions:**

- View archived tasks (tasks which have a status to done, and closed date is older than 1 week)
- Unarchive task functionality (in essense reopen task)
- Task completion statistics
- Same list as active tasks, just simpler with no way of completing, filtering or deleting

**Components:**

### 5. Categories Page (`/categories`)

**Primary Functions:**

- Manage task categories
- View tasks by category
- Create/edit categories

**Components:**

## Core Features

### Task Management

- ✅ Create, read, update, delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Set task priorities (urgent/normal)
- ✅ Assign categories to tasks
- ✅ Set due dates
- ✅ Add task descriptions

### Organization

- ✅ Category-based organization
- ✅ Priority-based sorting (urgent tasks first)
- ✅ Due date management
- ✅ Search and filter functionality
- ✅ Task history and completion tracking

### User Interface

- ✅ Responsive web design (desktop-first, mobile-friendly)
- ✅ Dark/light mode support
- ✅ Intuitive navigation
- ✅ Visual priority indicators
- ✅ Category icons with emojis

## Data Models & Entities

### Task Entity

```typescript
type Task = {
  id: string; // UUID
  title: string;
  category: CategoryType; // Predefined category with emoji/icon
  subtasks?: Subtask[]; // Optional array of subtasks
  urgent: boolean; // Default: false
  dueDate?: Date; // Optional datetime
  doneDate?: Date; // Optional datetime (when task was completed)
  description?: string; // Optional
  status: TaskStatus; // Enum: 'new' | 'approved' | 'done' | 'deleted'
  creator: Person;
  assignee: Person;
  created: Date; // Datetime
  modified: Date; // Datetime
};
```

### Subtask Entity

```typescript
type Subtask = {
  subtaskId: string; // UUID
  subtaskName: string;
  subtaskStatus: SubtaskStatus; // Boolean: 'open' | 'closed' (default: 'open')
};
```

### Person Entity

```typescript
type Person = {
  id: string; // UUID
  username: string;
  email: string; // Email format
  firstName?: string; // Optional
  lastName?: string; // Optional
  createdDate: Date; // Datetime
  status: PersonStatus; // Enum: 'open' | 'archived'
  role: UserRole; // Enum: 'guest' | 'user' | 'admin'
};
```

### Enums

```typescript
type TaskStatus = 'new' | 'approved' | 'done' | 'deleted';
type SubtaskStatus = 'open' | 'closed';
type PersonStatus = 'open' | 'archived';
type UserRole = 'guest' | 'user' | 'admin';
type CategoryType = 'work' | 'personal' | 'shopping' | 'health' | 'home' | 'finance' | 'other';
```

## Requirements Clarification (Resolved)

✅ **Navigation Structure**: Top navigation bar for web application

✅ **Category System**: Predefined categories with emojis/icons to select from

✅ **Task Hierarchy**: Tasks can contain optional subtasks (as defined in entity structure)

✅ **Urgency System**: Simple boolean urgent toggle (urgent/normal)

✅ **Due Date**: Full datetime support, no recurring tasks functionality needed initially

## Technical Implementation Notes

- Follow Next.js 15 App Router architecture
- Use Server Components by default
- Implement proper TypeScript types (as defined above)
- Use Tailwind CSS for styling
- Follow established security and accessibility guidelines
- Implement Zod validation for all data entities
- Store data using appropriate data persistence layer
- Implement proper user authentication and authorization based on roles

## Next Steps

1. Clarify the questions above
2. Create detailed wireframes for web interface
3. Define data models and API endpoints
4. Implement core functionality following architectural guidelines