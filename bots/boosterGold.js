export default function boosterGold(history, self, opponentLast) {
    if (!history || history.length === 0) {
        return "reload";
    }
    else if (self.ammo > 1) {
         return "shoot";
    }
 
    if (opponentLast?.choice === "reload" && self.ammo === 0) {
        return "block";
    }
    else if (opponentLast?.choice === "block" && self.ammo > 1) {
        return "shoot";
    }
    return "reload";
}