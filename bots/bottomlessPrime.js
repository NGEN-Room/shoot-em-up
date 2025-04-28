export default function bottomlessPrime(history, self, opponent) {
    // No ammo
    if (self.ammo === 0) {
      return "Reload";
    }
  
    // opp last round
    const lastRound = history[history.length - 1];

    // op last move
    const oppLastMove = lastRound ? lastRound.results.find(r => r.name === opponent.name) : null;
  
    // If op has ammo block in 80%
    if (opponent.ammo > 0) {
      return Math.random() < 0.8 ? "Block" : "Shoot";
    }

    // if opp just reloaded then block
    if (
        oppLastMove &&
        oppLastMove.choice === "Reload"
        ) {
        return "Block";
        }
  
    // if opp shoot and has no ammo then shoot
    if (
      oppLastMove &&
      oppLastMove.choice === "Shoot" &&
      opponent.ammo === 0 &&
      self.ammo > 0
    ) {
      return "Shoot";
    }
  

  
    // Otherwise small cahnce to reload
    if (Math.random() < 0.3) {
      return "Reload";
    }
  
    // else shoot
    return "Shoot";
  }