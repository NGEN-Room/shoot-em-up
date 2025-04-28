export default function bottomlessPrime (history, self, opponent) {
    // no ammo
    if (self.ammo === 0) {
      return "Reload";
    }
  
    // if opponenet has ammo ammo block 70% of time that next turn
    if (opponent.ammo > 0) {
      return Math.random() < 0.7 ? "Block" : "Shoot";
    }
  
    // if opponent jsut reload, shoot
    const lastRound = history[history.length - 1];
    if (lastRound) {
      const oppLastMove = lastRound.results.find(r => r.name === opponent.name);
      if (oppLastMove && oppLastMove.choice === "Reload" && self.ammo > 0) {
        return "Shoot";
      }
    }
  
    // reload if nothing going on
    if (Math.random() < 0.3) {
      return "Reload";
    }
  
    // shoot
    return "Shoot";
  }