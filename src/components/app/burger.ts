export function burger(): void {
    const burger = document.querySelector<HTMLElement>('.burger');
    const menu = document.querySelector<HTMLElement>('.sources');
    if (!burger || !menu) return;

    burger.addEventListener('click', () => {
        burger.classList.toggle('burger--active');
        menu.classList.toggle('sources--active');
    });
}
