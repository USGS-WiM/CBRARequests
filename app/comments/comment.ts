export class Comment {
    constructor(
        public caseid?: number,
        public comment?: string,
        public created_by_string?: string,
        public created_date?: Date,
        public id?: number
    ) {}
}