import { define } from 'be-decorated/be-decorated.js';
import { getElementToObserve, addListener } from 'be-observant/be-observant.js';
export class BeWanderingController {
    target;
    intro(proxy, target, beDecorProps) {
        this.target = target;
    }
    scout({ pathObserver }) {
        let observeParams;
        switch (typeof pathObserver) {
            case 'string':
                observeParams = { vft: pathObserver, prop: 'selector' };
                break;
            case 'object':
                observeParams = pathObserver;
                break;
        }
        const elementToObserve = getElementToObserve(this.proxy, observeParams);
        if (elementToObserve === null) {
            console.warn({ observeParams, msg: '404' });
            return;
        }
        addListener(elementToObserve, observeParams, 'selector', this.proxy);
    }
    wander({ selector, insertPosition, target }) {
        const relativeTo = this.proxy.getRootNode().querySelector(selector);
        if (relativeTo === null) {
            console.warn({ selector, msg: '404' });
            return;
        }
        switch (insertPosition) {
            case 'beforeend':
                if (this.target === relativeTo.lastElementChild)
                    return;
                break;
        }
        relativeTo.insertAdjacentElement(insertPosition, target);
    }
}
const tagName = 'be-wandering';
define({
    config: {
        tagName,
        propDefaults: {
            upgrade: '*',
            ifWantsToBe: 'wandering',
            forceVisible: true,
            virtualProps: ['insertPosition', 'pathObserver', 'selector'],
            intro: 'intro'
        },
        actions: {
            'scout': {
                ifAllOf: ['pathObserver']
            },
            'wander': {
                ifAllOf: ['selector', 'insertPosition']
            }
        }
    },
    complexPropDefaults: {
        controller: BeWanderingController
    }
});
document.head.appendChild(document.createElement(tagName));
