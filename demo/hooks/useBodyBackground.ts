import { watch } from 'vue'

export const useBodyBackground = (color: any): void => {
    watch(color, () => {
        document.body.style.backgroundColor = color.value;
    }, {
        immediate: true,
    });

};