export class StatisticsCountry {
    #countCountry = 0;
    #countPopulation = 0;
    #populationAVG = 0;

    constructor(arrCountry) {
        this.arrCountry = arrCountry;
        this.#clacCountCountry();
        this.#clacCountPopulation();
        this.#calcPopulationAVG();
    }

    getCountCountry() {
        return this.#countCountry;
    }

    getCountPopulation() {
        return this.#countPopulation;
    }

    getPopulationAVG() {
        return this.#populationAVG;
    }

    #clacCountCountry() {
        this.#countCountry = this.arrCountry.length;
    }

    #clacCountPopulation() {
        this.arrCountry.forEach(c => {
            this.#countPopulation += Number(c.population);
        });
    }

    #calcPopulationAVG() {
        this.#populationAVG = this.#countPopulation / this.#countCountry;
    }

    static clacSumCounteryPerRegion(arrR) {
        const arrRegion = [];
        const counts = {};

        arrR.forEach(c => {
            arrRegion.push(c.region);
        });

        arrRegion.forEach(c => counts[c] = (counts[c] || 0) + 1);

        return counts;
    }

    static clacSumCounteryPerCurrencies(arrC) {
        const arrCurrencies = [];
        const counts = {};

        arrC.forEach(c => {
            Object.keys(c.currencies).forEach(coin => {
                console.log(coin);
                arrCurrencies.push(c.currencies[coin].name)
            });
            // console.log(coins);

        });

        return arrCurrencies;

        // arrRegion.forEach(c => counts[c][0] = (counts[c][0] || 0) + 1);

        // return counts;
    }
}