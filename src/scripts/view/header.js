import "../../styles/header.css"
function createHeader() {
    const $headerIndex = document.getElementById('header');
    const $navbar = document.createElement('nav');
    $navbar.className = 'navbar';
    const $title = document.createElement('h2');
    const $container = document.createElement('div');
    const $ulHeader = document.createElement('ul');
    for (const navElement of Object.values(options)) {
        const $liHeader = document.createElement('li');
        const $aHeader = document.createElement('a');
        $aHeader.href = `/src/pages/${navElement.toLowerCase()}.html`;
        $liHeader.appendChild($aHeader);
        $liHeader.firstElementChild.href = `/src/pages/${navElement.toLowerCase()}`;
        $liHeader.firstElementChild.innerText = navElement;
        $liHeader.firstElementChild.className = 'aHeader';
        $ulHeader.appendChild($liHeader);
    }
    const $a = document.createElement('a');
    $a.href = '/src/pages/index.html';
    $a.innerText = 'Api & Morty';
    $title.appendChild($a);
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


    const $burger = document.createElement('button');
    $burger.innerHTML = '☰';
    $burger.className = 'burger';
    $burger.setAttribute('aria-label', 'Menu');
    $navbar.appendChild($container);
    $navbar.appendChild($ulHeader);

    $burger.addEventListener('click', () => {
        $ulHeader.classList.toggle('ulHeader--open');
    });
    $container.appendChild($burger);
    document.addEventListener('click', (e) => {
        const isClickInside = $navbar.contains(e.target);
        if (!isClickInside) {
            $ulHeader.classList.remove('ulHeader--open');
        }
    });

    $ulHeader.querySelectorAll('a').forEach($a => {
        $a.addEventListener('click', () => {
            $ulHeader.classList.remove('ulHeader--open');
        });
    });


}
const options = Object.freeze({
    Characters: "Characters",
    Episodes: "Episodes",
    Locations: "Locations",

})
export default createHeader;

