import { NewsArticle } from '../../../types';
import './news.css';

class News {
    draw(data: NewsArticle[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();

        const newsItemTemp = document.querySelector('#newsItemTemp');
        if (!(newsItemTemp instanceof HTMLTemplateElement)) return;

        const newsWrapper = document.querySelector('.news');
        if (!(newsWrapper instanceof HTMLElement)) return;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true);
            if (!(newsClone instanceof DocumentFragment)) return;

            if (idx % 2) {
                const newsItem = newsClone.querySelector('.news__item');
                if (!newsItem) return;
                newsItem.classList.add('alt');
            }
            const newsMetaPhoto = newsClone.querySelector('.news__meta-photo');
            const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
            const newsMetaDate = newsClone.querySelector('.news__meta-date');
            const titleEl = newsClone.querySelector('.news__description-title');
            const sourceEl = newsClone.querySelector('.news__description-source');
            const contentEl = newsClone.querySelector('.news__description-content');
            const linkEl = newsClone.querySelector('.news__read-more a');

            if (
                !(newsMetaPhoto instanceof HTMLElement) ||
                !(newsMetaAuthor instanceof HTMLElement) ||
                !(newsMetaDate instanceof HTMLElement) ||
                !(titleEl instanceof HTMLElement) ||
                !(sourceEl instanceof HTMLElement) ||
                !(contentEl instanceof HTMLElement) ||
                !(linkEl instanceof HTMLAnchorElement)
            ) {
                return;
            }

            newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            newsMetaAuthor.textContent = item.author || item.source.name;
            newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            titleEl.textContent = item.title;
            sourceEl.textContent = item.source.name;
            contentEl.textContent = item.description;
            linkEl.href = item.url;

            fragment.append(newsClone);
        });

        newsWrapper.innerHTML = '';
        newsWrapper.appendChild(fragment);
    }
}

export default News;
