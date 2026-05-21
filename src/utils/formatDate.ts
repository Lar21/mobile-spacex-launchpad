export function formatDate(dateString: string | null): string {
  if (!dateString) return 'Data desconhecida';
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
