export default function bottomlessPrime (history, self, opponent) {
    // no ammo
    if (self.ammo === 0) {
      return "Reload";
    }
  
    // if opponenet has ammo, 80% chance to block, if not shoot
    if (opponent.ammo > 0) {
      return Math.random() < 0.8 ? "Block" : "Shoot";
    }
  
    // if opponent jsut shoot then shoot after
    const lastRound = history[history.length - 1];
    if (lastRound) {
      const oppLastMove = lastRound.results.find(r => r.name === opponent.name);
      if (
        oppLastMove &&
        oppLastMove.choice === "Shoot" && // they just shot last round
        opponent.ammo === 0 &&  // they now have no ammo
        self.ammo > 0         // and you have ammo
      ) {
        return "Shoot";
      }
    }


    // if opponent jsut reloaded then block
    if (lastRound){
        const oppLastMove = lastRound.results.find(r => r.name === opponent.name);
        if (
            oppLastMove &&
            oppLastMove.choice === "Reload" &&
            self.ammo > 0
        )
        {
            return "shoot"
        }
    }
  
    // reload if nothing going on
    if (Math.random() < 0.3) {
      return "Reload";
    }
  
    // shoot
    return "Shoot";
  }