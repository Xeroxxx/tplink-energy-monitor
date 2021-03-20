import { Service } from 'typedi';
import { promises as fs } from 'fs';

@Service()
export default class FileService {
    public async loadJSONFile(path: string): Promise<{ [key: string]: string }> {
        return fs.readFile(path).then((value) => JSON.parse(value.toString()));
    }
}
