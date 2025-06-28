const especies = Object.freeze({
    human: "Human",
    alien: "Alien",
    robot: "Robot",
    Humanoid: "Humanoid",
    Robot: "Robot",
    Cronenberg:"Cronenberg",
    Animal:"Animal",
    Mythological:"Mythological Creature",
    Disease:"Disease",
    Poopybutthole:"Poopybutthole",
    Unknown:"Unknown",
})
const showOptions = () => Object.values(especies).forEach(element => {
    const option = document.createElement("option");
    option.value = element;
    option.innerText = element;
    document.getElementById("speciesFilter").appendChild(option);
})
export default showOptions;