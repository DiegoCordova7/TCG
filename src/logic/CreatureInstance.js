export class CreatureInstance {
    constructor(baseData) {
        this.id = baseData.id;
        this.name = baseData.name;
        this.faction = baseData.faction;
        this.maxHp = baseData.hp;
        this.currentHp = baseData.hp
        this.attacks = baseData.attacks;
        this.equippedItem = null;
        this.statusEffects = [];
    }

    takeDamage(amount) {
        this.currentHp = Math.max(0, this.currentHp - amount);
        if (this.currentHp === 0) {
            this.handleDeath();
        }
    }

    equipItem(item) {
        this.equippedItem = item;
    }

    handleDeath() {
        console.log(`${this.name} ha caído en combate.`);
    }
}