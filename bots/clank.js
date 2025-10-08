export default function clank(history, self, opponent) {
    if (self.ammo === 0) return "Reload";
    
    if (opponent.ammo >= 1) {
        return Math.random() < 0.5 ? "Block" : "Shoot";
    }
    return Math.random() < 0.5 ? "Shoot" : "Reload";
}