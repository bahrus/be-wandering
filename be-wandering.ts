import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeWanderingActions, BeWanderingProps, BeWanderingVirtualProps} from './types';
import {getElementToObserve, addListener, IObserve} from 'be-observant/be-observant.js';

export class BeWanderingController implements BeWanderingActions {
    target: Element | undefined;
    intro(proxy: Element & BeWanderingVirtualProps, target: Element, beDecorProps: BeDecoratedProps){
        this.target = target;
    }
    scout({pathObserver}: this){
        let observeParams: IObserve | undefined;
        switch(typeof pathObserver){
            case 'string':
                observeParams = {vft: pathObserver, prop: 'selector'} as IObserve;
                break;
            case 'object':
                observeParams = pathObserver as IObserve;
                break;
        }
        const elementToObserve = getElementToObserve(this.proxy, observeParams);
        if(elementToObserve === null){
            console.warn({observeParams, msg: '404'});
            return;
        }
        addListener(elementToObserve, observeParams, 'selector', this.proxy);
    }

    wander({selector, insertPosition, target}: this){
        const relativeTo = (this.proxy.getRootNode() as DocumentFragment).querySelector(selector);
        if(relativeTo === null){
            console.warn({selector, msg: '404'});
            return;
        }

        switch(insertPosition){
            case 'beforeend':
                if(this.target === relativeTo.lastElementChild) return;
                break;
        }
        relativeTo.insertAdjacentElement(insertPosition, target!);

    }
}

export interface BeWanderingController extends BeWanderingProps{}

const tagName = 'be-wandering';

define<BeWanderingProps & BeDecoratedProps<BeWanderingProps, BeWanderingActions>, BeWanderingActions>({
    config:{
        tagName,
        propDefaults:{
            upgrade: '*',
            ifWantsToBe: 'wandering',
            forceVisible: true,
            virtualProps: ['insertPosition', 'pathObserver', 'selector'],
            intro: 'intro'
        },
        actions:{
            'scout':{
                ifAllOf: ['pathObserver']
            },
            'wander':{
                ifAllOf: ['selector', 'insertPosition']
            }
        }
    },
    complexPropDefaults:{
        controller: BeWanderingController
    }
});

document.head.appendChild(document.createElement(tagName));