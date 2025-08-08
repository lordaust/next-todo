# 🎨 Design Guidelines and Rules

> This document outlines the design patterns, tokens, rules, and layout principles identified from analyzing high-quality reference designs. These guidelines ensure our TODO application achieves excellence in usability, aesthetics, accessibility, and user experience.

---

## 📋 Table of Contents

1. [General Design Rules](#general-design-rules)
2. [Atomic Design Tokens](#atomic-design-tokens)
3. [Table Component Rules](#table-component-rules)
4. [Refactoring Implementation Plan](#refactoring-implementation-plan)

---

## 🎯 General Design Rules

### **1. Hierarchy & Information Architecture**

**Primary Information First**
- Most important content gets largest text size and strongest contrast
- Secondary information uses smaller text and muted colors
- Tertiary information is subtle but accessible

**Visual Weight Distribution**
```
Primary:   text-sm/6 font-medium text-gray-900
Secondary: text-xs/5 text-gray-500
Tertiary:  text-xs/5 text-gray-400
```

### **2. Color Philosophy**

**Minimal Color Usage**
- Use color sparingly and only for meaningful status/state
- Prefer grayscale for most interface elements
- Color should enhance, not decorate

**Status Color Palette**
```css
/* Success/Positive */
bg-green-50 text-green-700 ring-green-600/20

/* Warning/Attention */
bg-yellow-50 text-yellow-800 ring-yellow-600/20

/* Error/Negative */
bg-red-50 text-red-700 ring-red-600/10

/* Neutral/Inactive */
bg-gray-50 text-gray-600 ring-gray-500/10

/* Interactive */
text-indigo-600 hover:text-indigo-500
```

### **3. Spacing Philosophy**

**Generous Whitespace**
- Prefer more space over less
- Use consistent spacing scales
- Allow content to breathe

**Rhythm and Flow**
- Maintain consistent vertical rhythm
- Use predictable spacing patterns
- Create clear content groupings

### **4. Typography Hierarchy**

**Clear Text Hierarchy**
```css
/* Page Headers */
text-base font-semibold text-gray-900

/* Content Headers */
text-sm/6 font-medium text-gray-900

/* Body Text */
text-sm/6 text-gray-900

/* Secondary Text */
text-xs/5 text-gray-500

/* Captions */
text-xs/5 text-gray-400
```

### **5. Accessibility First**

**WCAG 2.1 AA Compliance**
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text
- Keyboard navigation support
- Screen reader compatibility

**Semantic HTML**
- Use proper heading hierarchy
- Implement ARIA labels where needed
- Provide alternative text for icons

---

## ⚛️ Atomic Design Tokens

### **Spacing Scale**

**Padding/Margin System**
```css
/* Micro spacing */
pt-1, pb-1, px-1, py-1    /* 4px */
pt-2, pb-2, px-2, py-2    /* 8px */
pt-3, pb-3, px-3, py-3    /* 12px */

/* Standard spacing */
pt-4, pb-4, px-4, py-4    /* 16px */
pt-5, pb-5, px-5, py-5    /* 20px */
pt-6, pb-6, px-6, py-6    /* 24px */

/* Large spacing */
pt-8, pb-8, px-8, py-8    /* 32px */
pt-12, pb-12, px-12, py-12 /* 48px */
```

**Component Spacing Rules**
```css
/* Table rows */
py-5 pr-6                 /* Generous row padding */

/* Content sections */
mt-6, mt-8               /* Section separation */

/* Container padding */
px-4 sm:px-6 lg:px-8     /* Responsive container padding */
```

### **Border & Radius System**

**Border Weights**
```css
border-gray-100          /* Subtle separators */
border-gray-200          /* Standard borders */
border-t border-gray-100 /* Top borders for sections */
```

**Border Radius**
```css
rounded-md               /* Standard radius for badges/buttons */
/* No border radius for main containers (follows flat design) */
```

### **Shadow System**

**Elevation Hierarchy**
```css
/* Minimal shadows - prefer borders over shadows */
shadow-sm                /* Subtle elevation only when needed */
/* Avoid heavy shadows - maintain flat, clean aesthetic */
```

### **Icon System**

**Icon Sizing**
```css
h-6 w-5                  /* Standard table icons */
h-5 w-5                  /* Small inline icons */
h-4 w-4                  /* Micro icons */
```

**Icon Colors**
```css
text-gray-400            /* Default icon color */
text-gray-500            /* Slightly more prominent */
text-indigo-600          /* Interactive icons */
```

---

## 📊 Table Component Rules

### **Table Structure Principles**

**Layout Architecture**
```tsx
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  {/* Header section */}
</div>
<div className="mt-6 overflow-hidden border-t border-gray-100">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
      {/* Table content */}
    </div>
  </div>
</div>
```

### **Table Header Rules**

**Screen Reader Only Headers**
```tsx
<thead className="sr-only">
  <tr>
    <th>Primary Content</th>
    <th className="hidden sm:table-cell">Secondary Content</th>
    <th>Actions</th>
  </tr>
</thead>
```

### **Group Header Rules**

**Full-Width Background Strips**
```tsx
<tr className="text-sm/6 text-gray-900">
  <th scope="colgroup" colSpan={3} className="relative isolate py-2 font-semibold">
    <time dateTime={group.dateTime}>{group.name}</time>
    <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
    <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
  </th>
</tr>
```

### **Table Row Rules**

**Row Spacing & Separators**
```tsx
<tr key={item.id}>
  <td className="relative py-5 pr-6">
    {/* Content */}
    <div className="absolute right-full bottom-0 h-px w-screen bg-gray-100" />
    <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
  </td>
</tr>
```

### **Cell Content Rules**

**Primary Cell Structure**
```tsx
<td className="relative py-5 pr-6">
  <div className="flex gap-x-6">
    <Icon className="hidden h-6 w-5 flex-none text-gray-400 sm:block" />
    <div className="flex-auto">
      <div className="flex items-start gap-x-3">
        <div className="text-sm/6 font-medium text-gray-900">{primaryContent}</div>
        <StatusBadge />
      </div>
      <div className="mt-1 text-xs/5 text-gray-500">{secondaryContent}</div>
    </div>
  </div>
</td>
```

**Secondary Cell Structure**
```tsx
<td className="hidden py-5 pr-6 sm:table-cell">
  <div className="text-sm/6 text-gray-900">{primaryInfo}</div>
  <div className="mt-1 text-xs/5 text-gray-500">{secondaryInfo}</div>
</td>
```

**Actions Cell Structure**
```tsx
<td className="py-5 text-right">
  <div className="flex justify-end">
    <a href={href} className="text-sm/6 font-medium text-indigo-600 hover:text-indigo-500">
      Action<span className="hidden sm:inline"> text</span>
      <span className="sr-only">, {context}</span>
    </a>
  </div>
  <div className="mt-1 text-xs/5 text-gray-500">
    Context <span className="text-gray-900">{identifier}</span>
  </div>
</td>
```

### **Status Badge Rules**

**Badge Styling System**
```tsx
// Success/Completed
<div className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
  Completed
</div>

// Warning/In Progress
<div className="rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
  In Progress
</div>

// Error/Urgent
<div className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
  Urgent
</div>

// Neutral/Default
<div className="rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
  Open
</div>
```

---

## 🚀 Refactoring Implementation Plan

### **Phase 1: Foundation Restructure**

**1.1 Update Page Layout**
```tsx
// Current: Single container wrapper
<div className="min-h-screen bg-gray-50">
  <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">

// Target: Separated header and content areas
<div className="min-h-screen bg-white">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    {/* Header */}
  </div>
  <div className="mt-6 overflow-hidden border-t border-gray-100">
    {/* Content */}
  </div>
</div>
```

**1.2 Separate Header Component**
```tsx
// Create dedicated header outside table area
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <h2 className="mx-auto max-w-2xl text-base font-semibold text-gray-900 lg:mx-0 lg:max-w-none">
    TODO
  </h2>
</div>
```

### **Phase 2: Table Structure Overhaul**

**2.1 Implement Screen-Width Group Headers**
```tsx
// Replace current group headers with full-width background
<tr className="text-sm/6 text-gray-900">
  <th scope="colgroup" colSpan={3} className="relative isolate py-2 font-semibold">
    {group.name}
    <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
    <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
  </th>
</tr>
```

**2.2 Update Row Spacing and Separators**
```tsx
// Increase padding and add screen-width separators
<tr key={task.id}>
  <td className="relative py-5 pr-6">
    {/* Content */}
    <div className="absolute right-full bottom-0 h-px w-screen bg-gray-100" />
    <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
  </td>
</tr>
```

### **Phase 3: Content Hierarchy Redesign**

**3.1 Restructure Primary Cell Content**
```tsx
// Current: Horizontal layout with separate status
<div className="flex items-start gap-x-3">
  <div className="text-sm/6 font-medium text-gray-900">{task.title}</div>
  {getStatusBadge(task.status)}
</div>

// Target: Icon + content with inline status
<div className="flex gap-x-6">
  <CategoryIcon className="hidden h-6 w-5 flex-none text-gray-400 sm:block" />
  <div className="flex-auto">
    <div className="flex items-start gap-x-3">
      <div className="text-sm/6 font-medium text-gray-900">{task.title}</div>
      <StatusBadge />
    </div>
    <div className="mt-1 text-xs/5 text-gray-500">Due: {task.dueDate}</div>
  </div>
</div>
```

**3.2 Simplify Secondary Cell**
```tsx
// Clean assignee and category display
<td className="hidden py-5 pr-6 sm:table-cell">
  <div className="text-sm/6 text-gray-900">{task.assignee}</div>
  <div className="mt-1 text-xs/5 text-gray-500">{task.category}</div>
</td>
```

**3.3 Streamline Actions Cell**
```tsx
// Single primary action with context
<td className="py-5 text-right">
  <div className="flex justify-end">
    <a href={`/tasks/${task.id}`} className="text-sm/6 font-medium text-indigo-600 hover:text-indigo-500">
      View<span className="hidden sm:inline"> task</span>
      <span className="sr-only">, {task.title}</span>
    </a>
  </div>
  <div className="mt-1 text-xs/5 text-gray-500">
    Task <span className="text-gray-900">#{task.id.slice(-4)}</span>
  </div>
</td>
```

### **Phase 4: Status System Refinement**

**4.1 Implement Proper Status Badges**
```tsx
// Replace current status logic with proper badge system
const getStatusBadge = (status: string, urgent: boolean) => {
  if (status === 'done') {
    return (
      <div className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
        Completed
      </div>
    );
  }
  
  if (urgent) {
    return (
      <div className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
        Urgent
      </div>
    );
  }
  
  // Additional status logic...
};
```

### **Phase 5: Polish and Accessibility**

**5.1 Remove Add Task Button**
```tsx
// Remove button from header to match clean reference design
// Focus on content presentation over actions
```

**5.2 Enhance Accessibility**
```tsx
// Ensure proper ARIA labels and screen reader support
<span className="sr-only">, {task.title}</span>
<th scope="colgroup" colSpan={3}>
```

**5.3 Responsive Optimization**
```tsx
// Ensure proper mobile behavior
<div className="hidden sm:table-cell">
<span className="hidden sm:inline"> task</span>
```

### **Implementation Timeline**

**Week 1: Foundation (Phase 1-2)**
- Restructure page layout
- Implement new table structure
- Update group headers and row separators

**Week 2: Content (Phase 3-4)**
- Redesign cell content hierarchy
- Implement proper status system
- Update typography and spacing

**Week 3: Polish (Phase 5)**
- Accessibility improvements
- Responsive testing
- Final design refinements

### **Success Metrics**

**Target Design Scores (9/10+)**
- **Ease of Use**: 9/10 (clear hierarchy, scannable)
- **Calmness**: 9/10 (minimal colors, generous spacing)
- **Aesthetics**: 9/10 (professional, modern)
- **WCAG Compliance**: 9/10 (proper contrast, accessibility)
- **Readability**: 10/10 (excellent typography, spacing)

**Quality Assurance Checklist**
- [ ] Matches reference design visual hierarchy
- [ ] Proper spacing and typography implemented
- [ ] Status badges follow design system
- [ ] Screen-width elements working correctly
- [ ] Responsive behavior maintained
- [ ] Accessibility standards met
- [ ] Performance optimized

---

## 📚 References

- **Reference Design**: Table_Example2 (Recent Activity design)
- **Design System**: Tailwind CSS utility classes
- **Accessibility**: WCAG 2.1 AA guidelines
- **Typography**: Geist font family
- **Architecture**: Next.js 15 component patterns

---

*This document serves as the single source of truth for design decisions and implementation patterns for the TODO application. All components should follow these guidelines to ensure consistency and quality.*