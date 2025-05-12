export class Generator {
    constructor(id, name, resourceType, rate, cost) {
        this.id = id;
        this.name = name;
        this.resourceType = resourceType;
        this.rate = rate; // resources per second
        this.cost = cost; // cost to acquire the generator
    }
}