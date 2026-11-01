import { NewsSourse } from '../../../../types';
import './sources.css';

class Sources {
    draw(data: NewsSourse[]) {
        const fragment = document.createDocumentFragment();

        const sources = document.querySelector('.sources');
        if (sources === null) return;

        const sourceItemTemp = document.querySelector('#sourceItemTemp');
        if (!(sourceItemTemp instanceof HTMLTemplateElement)) return;

        for (const item of data) {
            const sourceClone = sourceItemTemp.content.cloneNode(true);
            if (!(sourceClone instanceof DocumentFragment)) return;

            const sourceItem = sourceClone.querySelector('.source__item');
            const sourceItemName = sourceClone.querySelector('.source__item-name');

            if (!sourceItem || !sourceItemName) continue;

            sourceItemName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        }

        sources.append(fragment);
    }
}

export default Sources;
