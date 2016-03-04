export class Case {
    constructor(
        public request_date?: string,
        public requester?: number,
        public property?: number,
        public casefiles?: string[],
        public id?: number) {}
}
