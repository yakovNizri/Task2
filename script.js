import { Country } from "./Country.js";
import { StatisticsCountry } from "./StatisticsCountry.js";


const allCountry = [];

async function loadData() {
    let param = 'name,region,population,currencies'
    const res = await fetch(`https://restcountries.com/v3.1/all?fields=${param}`);
    const resJ = await res.json();

    resJ.forEach(c => {
        const arrCountry = new Country(c.name.official, c.region, c.population, Object.keys(c.currencies)[0]);
        allCountry.push(arrCountry);
    });
    showStatistics(allCountry);
    showSearchRegion(allCountry);
    // console.log(allCountry);
}

document.querySelector('#showAll').addEventListener('click', () => {
    allCountry.length = 0;
    document.querySelector('#resSearchPopulation').innerHTML = '<tr><td>--</td><td>0</td></tr>';
    loadData();
})


function showStatistics(allCountry) {
    const arrStatistics = [...allCountry];
    const c = new StatisticsCountry(arrStatistics);
    document.querySelector('#statisBody').innerHTML = `
        <tr>
            <td>${c.getCountCountry()}</td>
            <td>${c.getCountPopulation()}</td>
            <td>${c.getPopulationAVG()}</td>
        </tr>
    `;
}

async function countrySearch(event) {
    event.preventDefault();

    const inputSearch = document.querySelector('#inputSearch');
    const res = await fetch(`https://restcountries.com/v3.1/name/${inputSearch.value}`);
    const resJ = await res.json();
    // console.log(resJ);
    showSearchCountry(resJ);
    showSearchRegion(resJ);
}

document.querySelector('#buttonSearch').addEventListener('click', (e) => {
    countrySearch(e);
});

function showSearchCountry(resJ) {
    let res = '';
    resJ.forEach(c => {
        res += `
            <tr>
                <td>${c.name.common}</td>
                <td>${c.population}</td>
            </tr>`;
    });
    document.querySelector('#resSearchPopulation').innerHTML = res;
}

function showSearchRegion(resJ) {
    showStatistics(resJ);
    const res = StatisticsCountry.clacSumCounteryPerRegion(resJ);
    // const res1 = StatisticsCountry.clacSumCounteryPerCurrencies(resJ);
    // console.log(res1);

    let showTableRes = '';
    Object.keys(res).forEach(c => {
        showTableRes += `<tr>
        <td>${c}</td>
        <td>${res[c]}</td>
        </tr>`;
    })
    document.querySelector('#resSearchRegion').innerHTML = showTableRes;
}