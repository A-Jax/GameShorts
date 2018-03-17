export class Upload {
    $key: string;
    file: File;
    url: string;
    progress: number;
    createdOn: Date = new Date();
    name: string;
    title: string;
    description: string;
    tags: string;
    displayName: string;
    uid: string;

    constructor(file: File) {
        this.file = file;
    }
}