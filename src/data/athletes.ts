import type { Athlete } from '../types';

// NOTE: names, countries and season-best marks are public performance
// information (analogous to what any results ticker or newspaper reports).
// Prices are our own fantasy-market invention, not official valuations.
export const athletes: Athlete[] = [
  { id: 'a1', name: 'Noah Lyles', country: 'US', event: '200m', group: 'Sprints', price: 30, seasonBest: '19.53' },
  { id: 'a2', name: 'Letsile Tebogo', country: 'BW', event: '200m', group: 'Sprints', price: 29, seasonBest: '19.46' },
  { id: 'a3', name: 'Kishane Thompson', country: 'JM', event: '100m', group: 'Sprints', price: 28, seasonBest: '9.77' },
  { id: 'a4', name: 'Fred Kerley', country: 'US', event: '100m', group: 'Sprints', price: 24, seasonBest: '9.86' },
  { id: 'a5', name: 'Akani Simbine', country: 'ZA', event: '100m', group: 'Sprints', price: 22, seasonBest: '9.90' },
  { id: 'a6', name: 'Marcell Jacobs', country: 'IT', event: '100m', group: 'Sprints', price: 18, seasonBest: '9.92' },
  { id: 'a7', name: 'Karsten Warholm', country: 'NO', event: '400mH', group: 'Hurdles', price: 27, seasonBest: '46.29' },
  { id: 'a8', name: 'Rai Benjamin', country: 'US', event: '400mH', group: 'Hurdles', price: 26, seasonBest: '46.39' },
  { id: 'a9', name: 'Alison dos Santos', country: 'BR', event: '400mH', group: 'Hurdles', price: 20, seasonBest: '46.72' },
  { id: 'a10', name: 'Grant Holloway', country: 'US', event: '110mH', group: 'Hurdles', price: 25, seasonBest: '12.86' },
  { id: 'a11', name: 'Sydney McLaughlin-Levrone', country: 'US', event: '400mH', group: 'Hurdles', price: 30, seasonBest: '50.65' },
  { id: 'a12', name: 'Femke Bol', country: 'NL', event: '400mH', group: 'Hurdles', price: 28, seasonBest: '51.45' },
  { id: 'a13', name: 'Shericka Jackson', country: 'JM', event: '200m', group: 'Sprints', price: 27, seasonBest: '21.71' },
  { id: 'a14', name: 'Julien Alfred', country: 'LC', event: '100m', group: 'Sprints', price: 26, seasonBest: '10.72' },
  { id: 'a15', name: 'Gabby Thomas', country: 'US', event: '200m', group: 'Sprints', price: 23, seasonBest: '21.60' },
  { id: 'a16', name: 'Mondo Duplantis', country: 'SE', event: 'Pole Vault', group: 'Jumps', price: 29, seasonBest: '6.25m' },
  { id: 'a17', name: 'Mutaz Essa Barshim', country: 'QA', event: 'High Jump', group: 'Jumps', price: 21, seasonBest: '2.34m' },
  { id: 'a18', name: 'Tobi Amusan', country: 'NG', event: '100mH', group: 'Hurdles', price: 24, seasonBest: '12.32' },
  { id: 'a19', name: 'Emmanuel Wanyonyi', country: 'KE', event: '800m', group: 'Middle/Long', price: 22, seasonBest: '1:41.11' },
  { id: 'a20', name: 'Jakob Ingebrigtsen', country: 'NO', event: '1500m', group: 'Middle/Long', price: 25, seasonBest: '3:26.73' },
];
