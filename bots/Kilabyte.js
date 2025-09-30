// # 🧠 Shoot-Em-Up Tournament Engine — Parent Project README

// This project is a fully interactive JavaScript game designed for student engagement and teaching. It allows students to code their own bots that compete in a simple turn-based game using "Shoot", "Reload", and "Block" actions.

// ---

// ## 🎮 Overview

// Players can:
// - Select bots from a dropdown list (from `./bots` folder)
// - Manually control actions via interface buttons, or let bots run automatically
// - View real-time stats (ammo, health, last action)
// - Run a fixed number of rounds
// - Export match history as a `.json` file
// - See a pop-up modal at the end of a match with a winner announcement and stat summary

// ---

// ## 📁 Folder Structure

// ```
// project/
// ├── bots/                  # Student-submitted bot files
// ├── index.html             # Main webpage
// ├── main.js                # Game logic and bot integration
// ├── style.css              # Layout and design styles
// └── assets/
//     ├── sfx/               # Sound effects (shoot, reload, block)
//     └── bot1.png, bot2.png # Default avatars
// ```

// ---

// ## 📦 Core Features

// ### Bot Selection
// - Players select a bot from a dropdown.
// - Bots are imported dynamically using `import()` from ES modules.

// ### Manual Mode
// - Each bot has four control buttons: `Shoot`, `Reload`, `Block`, `Auto`.
// - Buttons are dynamically generated based on bot name and player side.

// ### Game Engine
// - Tracks health (3 max), ammo (starts at 0), and last action.
// - Allows manual overrides per round.
// - History of all rounds is stored for export and reference.

// ### Modal Winner Display
// - When the game ends, a modal pops up with:
//   - 🏆 Winner
//   - Final health and ammo of both bots
//   - Close button

// ### Logging
// - A scrollable log in the center panel keeps track of each round's actions.


let Kilabyte = {

    name : "Kilabyte",
    maxHealth : 3, 
    ammo : 0,
    maxAmmo : 2,
    lastAction : "Operating System Online!",
}


function kilabyteFn (customBot){

    if (customBot.maxHealth == 1){
        return customBot.maxHealth + 5
    }

}

let botfunc = {
    health : function() {
        if (this.maxHealth > 0) {
            this.maxHealth--;
            this.lastAction = "Kilabyte Takes It Like A Champ!";
            return true;
        } else {
            this.lastAction = "Kilabyte Is Down For The Count!";
            return false;
        }
    },
    reload : function() {
        if (this.ammo < this.maxAmmo) {
            this.ammo++;
            this.lastAction = "A Strange Sound Starts!";
            return true;
        } if (this.ammo == this.maxAmmo) {
            this.lastAction = "Kilabyte Has Hands!";
            return true;
        } else if (this.ammo == 0) {
            this.lastAction = "Kilabyte Has Hands!";
            return false;
        }else {
            this.lastAction = "Kilabyte Calculates Its Next Move!";
            return false;
        }
    },
    shoot : function() {
        if (this.ammo > 0) {
            this.ammo--;
            this.lastAction = "Kilabyte Lobs a Punch!";
            return true;
        } else {
            this.lastAction = "Kilabytes got no Hands!";
            return false;
        }
    },
    block : function() {
        this.lastAction = "Kilabyte Weaves the Rounds Attack!";
        return true;
    
    }
    
    
    console.log(Kilabyte.name + " " + Kilabyte.lastAction);
    console.log(Kilabyte.maxHealth + " -Health  " + Kilabyte.ammo + " -Ammo  " + Kilabyte.lastAction);
    console.log(Kilabyte.shoot() + " " + Kilabyte.lastAction);
    console.log(Kilabyte.name + " " + Kilabyte.lastAction);
    console.log(Kilabyte.maxHealth + " -Health  " + Kilabyte.ammo + " -Ammo  " + Kilabyte.lastAction);
    
    console.log(Kilabyte.reload() + " " +Kilabyte.lastAction);
    console.log(Kilabyte.reload() + " " +Kilabyte.lastAction);
    console.log(Kilabyte.reload() + " " +Kilabyte.lastAction);
    
    console.log(Kilabyte.shoot() + " " + Kilabyte.lastAction);
    console.log(Kilabyte.block() + " " + Kilabyte.lastAction);
}