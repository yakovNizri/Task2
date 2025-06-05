export class Country {
    constructor(name, region, population, currencies) {
        this.name = name;
        this.region = region;
        this.population = Number(population);
        this.currencies = currencies;
    }
}