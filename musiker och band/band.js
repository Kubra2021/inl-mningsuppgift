export default
  class Band {
  constructor(name, info, formationYear, dissolutionYear) {
    this.name = name;
    this.info = info;
    this.formationYear = formationYear;
    this.dissolutionYear = dissolutionYear;
    this.members = [];
  }

  addMember(musician, joinYear, instruments) {
    this.members.push({ musician, joinYear, instruments });
  }

  removeMember(musician) {
    this.members = this.members.filter(member => member.musician !== musician);
  }
}


