export function taskCompletionPercentage(total, completed) {
  if (total === 0) {
    return 0;
  }

  const completionPercentage = (completed / total) * 100;
  return completionPercentage;
}

export function calculateChecklistPercentage(
  totalChecked,
  totalChecklistItems
) {
  const completedPercentage =
    totalChecklistItems > 0 ? (totalChecked / totalChecklistItems) * 100 : 0;

  return Number(completedPercentage.toFixed(0));
}
