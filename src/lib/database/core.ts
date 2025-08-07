/**
 * Database Core - LocalStorage abstraction layer
 * Treats localStorage as a backend database
 */

// Database keys for different entities
export const DB_KEYS = {
  TASKS: 'tasks',
  PERSONS: 'persons',
  METADATA: 'db_metadata',
} as const;

// Database metadata for versioning and initialization
type DatabaseMetadata = {
  version: string;
  initialized: boolean;
  lastSeeded: string | null;
};

/**
 * Initialize the database with metadata
 */
export function initializeDatabase(): void {
  if (typeof window === 'undefined') return; // Server-side safety
  
  const metadata: DatabaseMetadata = {
    version: '1.0.0',
    initialized: true,
    lastSeeded: null,
  };
  
  localStorage.setItem(DB_KEYS.METADATA, JSON.stringify(metadata));
}

/**
 * Check if database is initialized
 */
export function isDatabaseInitialized(): boolean {
  if (typeof window === 'undefined') return false;
  
  const metadata = localStorage.getItem(DB_KEYS.METADATA);
  return metadata !== null;
}

/**
 * Clear entire database
 */
export function clearDatabase(): void {
  if (typeof window === 'undefined') return;
  
  Object.values(DB_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

/**
 * Get database metadata
 */
export function getDatabaseMetadata(): DatabaseMetadata | null {
  if (typeof window === 'undefined') return null;
  
  const metadata = localStorage.getItem(DB_KEYS.METADATA);
  return metadata ? JSON.parse(metadata) : null;
}

/**
 * Update database metadata
 */
export function updateDatabaseMetadata(updates: Partial<DatabaseMetadata>): void {
  if (typeof window === 'undefined') return;
  
  const current = getDatabaseMetadata();
  if (!current) return;
  
  const updated = { ...current, ...updates };
  localStorage.setItem(DB_KEYS.METADATA, JSON.stringify(updated));
}
