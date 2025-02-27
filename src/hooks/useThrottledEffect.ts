import { watch, ref, onMounted, onBeforeUnmount } from 'vue';

export const useThrottledEffect = (callback: any, delay: number, deps: any[] = []) => {
    const lastRan = ref(Date.now());
    const handler = ref();

    const fn = () => {
        handler.value = setTimeout(function () {
            if (Date.now() - lastRan.value >= delay) {
                callback();
                lastRan.value = Date.now();
            }
        }, delay - (Date.now() - lastRan.value));
    }

    watch(
        [...deps],
        () => {
            console.log('watch-----', deps)
            fn();
        }
    );

    onMounted(() => {
        console.log('onMounted-----', deps)
        fn();
    })

    onBeforeUnmount(() => {
        clearTimeout(handler.value);
    })
};

export default useThrottledEffect;