import AppController from './controller/controller';
import { AppView } from '../view/appView';
import { burger } from './burger';
import { sourceListener } from './sourceListener';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        sourceListener();
        burger();
        const newsDiv = document.querySelector('.sources');
        if (newsDiv === null) return;
        newsDiv.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => {
            this.view.drawSources(data);
        });
    }
}

export default App;
