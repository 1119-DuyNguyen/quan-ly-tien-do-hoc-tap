import { GraduateCrawler } from '../components/dashboard/graduateCrawler.js';

export class Graduate {
    static index() {
        // import ''
        var graduate = new GraduateCrawler();
        graduate.run()
    }
    static none() {
        
    }
}