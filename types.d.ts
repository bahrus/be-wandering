import {BeDecoratedProps, EventHandler} from 'be-decorated/types';
import {IObserve, BeObservantVirtualProps} from 'be-observant/types';

export interface BeWanderingVirtualProps{
    pathObserver: string | IObserve;
    insertPosition: InsertPosition;
    selector: string;
}

export interface BeWanderingProps extends BeWanderingVirtualProps{
    proxy: Element & BeWanderingVirtualProps & BeObservantVirtualProps;
}

export interface BeWanderingActions {
    intro(proxy: HTMLTemplateElement & BeSwitchedVirtualProps, target: HTMLTemplateElement, beDecorProps: BeDecoratedProps): void;
    scout(self: this): void;
    wander(self: this): void;
}