import { browser } from '$app/environment';
import { get, writable, type Writable } from 'svelte/store';

type theme = 'light' | 'dark'

function themeWritable(): Writable<theme> {
    const store = writable<theme>('dark');
    const { subscribe, set } = store;


    browser &&
        localStorage.theme &&
        set(localStorage.theme);

    return {
        subscribe,
        set: n => {
            browser && (localStorage.theme = n);
            set(n);
        },
        update: cb => {
            const updatedStore = cb(get(store));

            browser && (localStorage.theme = updatedStore);
            set(updatedStore);
        }
    };
}

export const theme = themeWritable()

theme.subscribe(($theme) => {
    if (!browser) return;

    document.body.classList.remove('light', 'dark');
    document.body.classList.add($theme);
});