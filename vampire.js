// VAMPR! ASSIGNMENT

class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let vampireCount = 0;
    let vampire = this;
    // original vampire has no (null) creator value
    while (vampire.creator) {
      vampire = vampire.creator;
      vampireCount++;
    }
    return vampireCount;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    // check this vampire's name for a match--use an array to return multiple
    let match = this.name === name ? this : null;

    // check all this vampire's offspring, depth first, for a match
    for (const descendent of this.offspring) {
      const offspringWithName = descendent.vampireWithName(name);
      // search only until a match is found (match != null/falsey)
      if (!match) {
        match = offspringWithName;
      }
    }
    return match;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {

  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let seniorVampire = this.isMoreSeniorThan(vampire) ? this : vampire;
    let juniorVampire = this.isMoreSeniorThan(vampire) ? vampire : this;
    const seniorGeneration = seniorVampire.numberOfVampiresFromOriginal;
    const juniorGeneration = juniorVampire.numberOfVampiresFromOriginal;

    // if they are the same vampire, return this vampire
    if (this === vampire) return this;
    // if one (senior) is the root vampire, return senior
    if (seniorGeneration === 0) return seniorVampire;

    // compare junior's ancestors to senior, then senior's ancestors (by generations)
    // restart with original junior for each senior generation back
    const originalJunior = juniorVampire;
    for (let s = seniorGeneration; s > 0; s--) {
      juniorVampire = originalJunior;
      for (let j = juniorGeneration; j > 0; j--) {
        // check if senior is junior's creator
        if (seniorVampire === juniorVampire.creator) return seniorVampire;
        // check if both junior and senior have the same creator
        if (seniorVampire.creator === juniorVampire.creator) return seniorVampire.creator;
        // go back a generation for junior
        juniorVampire = juniorVampire.creator;
      }
      // go back a generation for senior
      seniorVampire = seniorVampire.creator;
    }
  }
}

// Export Vampire class for testing
module.exports = Vampire;
