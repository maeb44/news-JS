import AppLoader from './appLoader';
import type { CallbackFn, NewsResponse, SourceResponse } from '../../../types';

class AppController extends AppLoader {
    getSources(callback: CallbackFn<SourceResponse>) {
        super.getResp<SourceResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: CallbackFn<NewsResponse>) {
        const target = e.target;

        const newsContainer = e.currentTarget;
        if (!(target instanceof HTMLElement) || !(newsContainer instanceof HTMLElement)) return;

        let current: HTMLElement | null = target;

        while (current && current !== newsContainer) {
            if (current.classList.contains('source__item')) {
                const sourceId = current.getAttribute('data-source-id');
                if (sourceId === null) return;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<NewsResponse>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                            // endpoint: 'mocks/everything',
                            // options: {
                            //     sources: 'mocks/sources', //mock данные
                            // },
                        },
                        callback
                    );
                }
                return;
            }
            current = current.parentElement;
        }
    }
}

export default AppController;
