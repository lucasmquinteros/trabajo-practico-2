function createHeader() {

    const $headerIndex = document.getElementById('header');
    const $navbar = document.createElement('nav');
    $navbar.className = 'navbar';
    const $title = document.createElement('h2');
    const $container = document.createElement('div');
    const $ulHeader = document.createElement('ul');
    for (const navElement of Object.values(options)) {
        const $liHeader = document.createElement('li');
        $liHeader.appendChild(document.createElement('a'));
        $liHeader.firstElementChild.href = `/src/pages/${navElement.toLowerCase()}`;
        $liHeader.firstElementChild.innerText = navElement;
        $liHeader.firstElementChild.className = 'aHeader';
        $ulHeader.appendChild($liHeader);
    }
    $title.innerText = 'Api & Morty';
    $title.className = 'title';
    $ulHeader.className = 'ulHeader';
    $ulHeader.id = 'ulHeader';

    const $input = document.createElement('input');
    $input.type = 'text';
    $input.id = 'searchName';
    $input.placeholder = '🔍  Buscar personaje';
    $input.className = 'inputName';

    $container.className = 'containerHeader';

    $container.appendChild($title)
    $container.appendChild($ulHeader)


    $navbar.appendChild($container)

    $headerIndex.appendChild($navbar)
    $headerIndex.appendChild($input)
}
const options = Object.freeze({
    Characters: "Characters",
    Episodes: "Episodes",
    Locations: "Locations",

})
console.log(document.getElementsByClassName("inputName"))
createHeader()