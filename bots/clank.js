export default function Clank(history, self, opponent) {
    if (opponent.ammo >= 1) {
      return "Block";
    }
     else if (self.ammo == 0){
      return "Reload";
    }   
  }
if (opponent.ammo == 0) {
if (self.ammo > 1) {
return "Shoot";  }

}