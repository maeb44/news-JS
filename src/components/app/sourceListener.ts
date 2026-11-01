export const sourceListener = (): void => {
    const sources = document.querySelector('.sources');
    if (!(sources instanceof HTMLElement)) return;

    let previous: HTMLElement | null = null;

    sources.addEventListener('click', (e) => {
        const target = e.target;
        if (!(target instanceof Element)) return;
        const currentSource = target.closest<HTMLElement>('.source__item');
        if (!currentSource) return;

        if (previous && previous !== currentSource) {
            previous.classList.remove('source__item--active');
            previous.classList.add('source__item--watched');
        }

        currentSource.classList.add('source__item--active');
        currentSource.classList.remove('source__item--watched');
        previous = currentSource;
    });
};
