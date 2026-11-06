export interface Provider {
  id: string;
  name: string;
  mark: string;
  color: string;
}

export const PROVIDERS: Provider[] = [
  { id: 'booongo', name: 'Booongo', mark: 'BNG', color: '#e11d48' },
  { id: 'playson', name: 'Playson', mark: 'PS', color: '#2563eb' },
  { id: 'bgaming', name: 'BGaming', mark: 'BG', color: '#7c3aed' },
  { id: 'penguin', name: 'Penguin King', mark: 'PK', color: '#0891b2' },
  { id: 'kj', name: 'KJ Originals', mark: 'KJ', color: '#ff8a00' },
  { id: 'live', name: 'Live studio', mark: 'LS', color: '#16a34a' },
];

export const providerById = (id: string) => PROVIDERS.find((p) => p.id === id);
