export declare class FileParserService {
    parseFile(file: Express.Multer.File): Promise<any[]>;
    private parseExcel;
    private extractDataFromText;
}
