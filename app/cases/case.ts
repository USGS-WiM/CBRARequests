export class Case {
    constructor(
        public case_number?: string,
        public status?: string,
        public request_date?: string,
        public requester?: number,
        public property?: number,
        public casefiles?: string[],
        public id?: number) {}
}
