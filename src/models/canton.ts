export function cantonLng(canton: string): ('de' | 'fr') {
  return ['GE', 'NE', 'FR', 'VS', 'VD', 'JU'].includes(canton.toUpperCase()) ? 'fr' : 'de'
}
