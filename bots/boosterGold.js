export default function boosterGold(history, self, opponentLast) {
  if (!history || history.length === 0) {
    return "Reload";
  }

  if (self.ammo > 1) {
    return "Shoot";
  }

  if (opponentLast?.choice === "Reload" && self.ammo === 0) {
    return "Block";
  }

  if (opponentLast?.choice === "Block" && self.ammo > 1) {
    return "Shoot";
  }

  return "Reload";
}
