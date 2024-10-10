import { ElementRef, ViewContainerRef, Renderer2, Injector, ChangeDetectorRef } from '@angular/core';
import { IComponentBase } from '@syncfusion/ej2-angular-base';
import { Rating } from '@syncfusion/ej2-inputs';
import * as i0 from "@angular/core";
export declare const inputs: string[];
export declare const outputs: string[];
export declare const twoWays: string[];
/**
 * Represents the EJ2 Angular Rating Component.
 * ```html
 * <input ejs-rating [value]='value' />
 * ```
 */
export declare class RatingComponent extends Rating implements IComponentBase {
    private ngEle;
    private srenderer;
    private viewContainerRef;
    private injector;
    private cdr;
    formCompContext: any;
    formContext: any;
    tagObjects: any;
    beforeItemRender: any;
    created: any;
    onItemHover: any;
    valueChanged: any;
    valueChange: any;
    /**
     * Defines the template that defines the appearance of each rated item in a rating component.
     *
     * {% codeBlock src='rating/fullTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    fullTemplate: any;
    /**
     * Defines the template that defines the appearance of each un-rated item in a rating component.
     * @default ''
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    emptyTemplate: any;
    /**
     * Defines the template that used as tooltip content over default tooltip content of the rating.
     * The current value of rating passed as context to build the content.
     *
     * {% codeBlock src='rating/tooltipTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    tooltipTemplate: any;
    /**
     * Defines the template that used as label over default label of the rating. The current value of rating passed as context to build the content.
     *
     * {% codeBlock src='rating/labelTemplate/index.md' %}{% endcodeBlock %}
     *
     * @default ''
     * @angulartype string | object
     * @reacttype string | function | JSX.Element
     * @vuetype string | function
     * @asptype string
     */
    labelTemplate: any;
    focus: any;
    blur: any;
    constructor(ngEle: ElementRef, srenderer: Renderer2, viewContainerRef: ViewContainerRef, injector: Injector, cdr: ChangeDetectorRef);
    registerOnChange(registerFunction: (_: any) => void): void;
    registerOnTouched(registerFunction: () => void): void;
    writeValue(value: any): void;
    setDisabledState(disabled: boolean): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RatingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RatingComponent, "[ejs-rating]", never, { "allowReset": "allowReset"; "cssClass": "cssClass"; "disabled": "disabled"; "emptyTemplate": "emptyTemplate"; "enableAnimation": "enableAnimation"; "enablePersistence": "enablePersistence"; "enableRtl": "enableRtl"; "enableSingleSelection": "enableSingleSelection"; "fullTemplate": "fullTemplate"; "itemsCount": "itemsCount"; "labelPosition": "labelPosition"; "labelTemplate": "labelTemplate"; "locale": "locale"; "min": "min"; "precision": "precision"; "readOnly": "readOnly"; "showLabel": "showLabel"; "showTooltip": "showTooltip"; "tooltipTemplate": "tooltipTemplate"; "value": "value"; "visible": "visible"; }, { "focus": "focus"; "blur": "blur"; "beforeItemRender": "beforeItemRender"; "created": "created"; "onItemHover": "onItemHover"; "valueChanged": "valueChanged"; "valueChange": "valueChange"; }, ["fullTemplate", "emptyTemplate", "tooltipTemplate", "labelTemplate"], never>;
}
