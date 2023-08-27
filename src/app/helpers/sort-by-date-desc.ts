type SortObject = Record<string, unknown> & { created_at: string };

function sortByDateDesc(a: SortObject, b: SortObject) {
  const dateA = new Date(a.created_at);
  const dateB = new Date(b.created_at);

  return dateB.getTime() - dateA.getTime();
}

export default sortByDateDesc;
