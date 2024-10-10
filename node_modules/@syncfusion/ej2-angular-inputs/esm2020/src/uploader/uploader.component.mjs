var UploaderComponent_1;
import { __decorate } from "tslib";
import { Component, ChangeDetectionStrategy, forwardRef, ContentChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase, ComponentMixins, FormBase, setValue } from '@syncfusion/ej2-angular-base';
import { Uploader } from '@syncfusion/ej2-inputs';
import { Template } from '@syncfusion/ej2-angular-base';
import { FilesDirective } from './files.directive';
import * as i0 from "@angular/core";
export const inputs = ['allowedExtensions', 'asyncSettings', 'autoUpload', 'buttons', 'cssClass', 'directoryUpload', 'dropArea', 'dropEffect', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enabled', 'files', 'htmlAttributes', 'locale', 'maxFileSize', 'minFileSize', 'multiple', 'sequentialUpload', 'showFileList', 'template'];
export const outputs = ['focus', 'blur', 'actionComplete', 'beforeRemove', 'beforeUpload', 'canceling', 'change', 'chunkFailure', 'chunkSuccess', 'chunkUploading', 'clearing', 'created', 'failure', 'fileListRendering', 'pausing', 'progress', 'removing', 'rendering', 'resuming', 'selected', 'success', 'uploading'];
export const twoWays = [];
/**
 * Represents the EJ2 Angular Uploader Component.
 * ```html
 * <ejs-uploader></ejs-uploader>
 * ```
 */
let UploaderComponent = UploaderComponent_1 = class UploaderComponent extends Uploader {
    constructor(ngEle, srenderer, viewContainerRef, injector, cdr) {
        super();
        this.ngEle = ngEle;
        this.srenderer = srenderer;
        this.viewContainerRef = viewContainerRef;
        this.injector = injector;
        this.cdr = cdr;
        this.tags = ['files'];
        this.element = this.ngEle.nativeElement;
        this.injectedModules = this.injectedModules || [];
        this.registerEvents(outputs);
        this.addTwoWay.call(this, twoWays);
        setValue('currentInstance', this, this.viewContainerRef);
        this.formContext = new FormBase();
        this.formCompContext = new ComponentBase();
    }
    registerOnChange(registerFunction) {
    }
    registerOnTouched(registerFunction) {
    }
    writeValue(value) {
    }
    setDisabledState(disabled) {
    }
    ngOnInit() {
        this.formCompContext.ngOnInit(this);
    }
    ngAfterViewInit() {
        this.formContext.ngAfterViewInit(this);
    }
    ngOnDestroy() {
        this.formCompContext.ngOnDestroy(this);
    }
    ngAfterContentChecked() {
        this.tagObjects[0].instance = this.childFiles;
        this.formCompContext.ngAfterContentChecked(this);
    }
};
UploaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: UploaderComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }, { token: i0.Injector }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
UploaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.3", type: UploaderComponent, selector: "ejs-uploader", inputs: { allowedExtensions: "allowedExtensions", asyncSettings: "asyncSettings", autoUpload: "autoUpload", buttons: "buttons", cssClass: "cssClass", directoryUpload: "directoryUpload", dropArea: "dropArea", dropEffect: "dropEffect", enableHtmlSanitizer: "enableHtmlSanitizer", enablePersistence: "enablePersistence", enableRtl: "enableRtl", enabled: "enabled", files: "files", htmlAttributes: "htmlAttributes", locale: "locale", maxFileSize: "maxFileSize", minFileSize: "minFileSize", multiple: "multiple", sequentialUpload: "sequentialUpload", showFileList: "showFileList", template: "template" }, outputs: { focus: "focus", blur: "blur", actionComplete: "actionComplete", beforeRemove: "beforeRemove", beforeUpload: "beforeUpload", canceling: "canceling", change: "change", chunkFailure: "chunkFailure", chunkSuccess: "chunkSuccess", chunkUploading: "chunkUploading", clearing: "clearing", created: "created", failure: "failure", fileListRendering: "fileListRendering", pausing: "pausing", progress: "progress", removing: "removing", rendering: "rendering", resuming: "resuming", selected: "selected", success: "success", uploading: "uploading" }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UploaderComponent_1),
            multi: true
        }
    ], queries: [{ propertyName: "template", first: true, predicate: ["template"], descendants: true }, { propertyName: "childFiles", first: true, predicate: FilesDirective, descendants: true }], usesInheritance: true, ngImport: i0, template: '', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
__decorate([
    Template()
], UploaderComponent.prototype, "template", void 0);
UploaderComponent = UploaderComponent_1 = __decorate([
    ComponentMixins([ComponentBase, FormBase])
], UploaderComponent);
export { UploaderComponent };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: UploaderComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ejs-uploader',
                    inputs: inputs,
                    outputs: outputs,
                    template: '',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => UploaderComponent),
                            multi: true
                        }
                    ],
                    queries: {
                        childFiles: new ContentChild(FilesDirective)
                    }
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }, { type: i0.Injector }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { template: [{
                type: ContentChild,
                args: ['template']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3VwbG9hZGVyL3VwbG9hZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW9FLHVCQUF1QixFQUFxQixVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xMLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQStCLGVBQWUsRUFBMEIsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3ZKLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQUVuRCxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQWEsQ0FBQyxtQkFBbUIsRUFBQyxlQUFlLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsaUJBQWlCLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxxQkFBcUIsRUFBQyxtQkFBbUIsRUFBQyxXQUFXLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxRQUFRLEVBQUMsYUFBYSxFQUFDLGFBQWEsRUFBQyxVQUFVLEVBQUMsa0JBQWtCLEVBQUMsY0FBYyxFQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3hVLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBYSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUMsY0FBYyxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLGNBQWMsRUFBQyxjQUFjLEVBQUMsZ0JBQWdCLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVB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QkFDSSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxrQkFBa0IsQ0FBQzs0QkFDaEQsS0FBSyxFQUFFLElBQUk7eUJBQ2Q7cUJBQ0o7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLFVBQVUsRUFBRSxJQUFJLFlBQVksQ0FBQyxjQUFjLENBQUM7cUJBQy9DO2lCQUNKOytNQXNDVSxRQUFRO3NCQUZkLFlBQVk7dUJBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgVmFsdWVQcm92aWRlciwgUmVuZGVyZXIyLCBJbmplY3RvciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBmb3J3YXJkUmVmLCBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29tcG9uZW50QmFzZSwgSUNvbXBvbmVudEJhc2UsIGFwcGx5TWl4aW5zLCBDb21wb25lbnRNaXhpbnMsIFByb3BlcnR5Q29sbGVjdGlvbkluZm8sIEZvcm1CYXNlLCBzZXRWYWx1ZSB9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1hbmd1bGFyLWJhc2UnO1xuaW1wb3J0IHsgVXBsb2FkZXIgfSBmcm9tICdAc3luY2Z1c2lvbi9lajItaW5wdXRzJztcbmltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnQHN5bmNmdXNpb24vZWoyLWFuZ3VsYXItYmFzZSc7XG5pbXBvcnQgeyBGaWxlc0RpcmVjdGl2ZSB9IGZyb20gJy4vZmlsZXMuZGlyZWN0aXZlJztcblxuZXhwb3J0IGNvbnN0IGlucHV0czogc3RyaW5nW10gPSBbJ2FsbG93ZWRFeHRlbnNpb25zJywnYXN5bmNTZXR0aW5ncycsJ2F1dG9VcGxvYWQnLCdidXR0b25zJywnY3NzQ2xhc3MnLCdkaXJlY3RvcnlVcGxvYWQnLCdkcm9wQXJlYScsJ2Ryb3BFZmZlY3QnLCdlbmFibGVIdG1sU2FuaXRpemVyJywnZW5hYmxlUGVyc2lzdGVuY2UnLCdlbmFibGVSdGwnLCdlbmFibGVkJywnZmlsZXMnLCdodG1sQXR0cmlidXRlcycsJ2xvY2FsZScsJ21heEZpbGVTaXplJywnbWluRmlsZVNpemUnLCdtdWx0aXBsZScsJ3NlcXVlbnRpYWxVcGxvYWQnLCdzaG93RmlsZUxpc3QnLCd0ZW1wbGF0ZSddO1xuZXhwb3J0IGNvbnN0IG91dHB1dHM6IHN0cmluZ1tdID0gWydmb2N1cycsICdibHVyJywgJ2FjdGlvbkNvbXBsZXRlJywnYmVmb3JlUmVtb3ZlJywnYmVmb3JlVXBsb2FkJywnY2FuY2VsaW5nJywnY2hhbmdlJywnY2h1bmtGYWlsdXJlJywnY2h1bmtTdWNjZXNzJywnY2h1bmtVcGxvYWRpbmcnLCdjbGVhcmluZycsJ2NyZWF0ZWQnLCdmYWlsdXJlJywnZmlsZUxpc3RSZW5kZXJpbmcnLCdwYXVzaW5nJywncHJvZ3Jlc3MnLCdyZW1vdmluZycsJ3JlbmRlcmluZycsJ3Jlc3VtaW5nJywnc2VsZWN0ZWQnLCdzdWNjZXNzJywndXBsb2FkaW5nJ107XG5leHBvcnQgY29uc3QgdHdvV2F5czogc3RyaW5nW10gPSBbXTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBFSjIgQW5ndWxhciBVcGxvYWRlciBDb21wb25lbnQuXG4gKiBgYGBodG1sXG4gKiA8ZWpzLXVwbG9hZGVyPjwvZWpzLXVwbG9hZGVyPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZWpzLXVwbG9hZGVyJyxcbiAgICBpbnB1dHM6IGlucHV0cyxcbiAgICBvdXRwdXRzOiBvdXRwdXRzLFxuICAgIHRlbXBsYXRlOiAnJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBVcGxvYWRlckNvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbiAgICBxdWVyaWVzOiB7XG4gICAgICAgIGNoaWxkRmlsZXM6IG5ldyBDb250ZW50Q2hpbGQoRmlsZXNEaXJlY3RpdmUpXG4gICAgfVxufSlcbkBDb21wb25lbnRNaXhpbnMoW0NvbXBvbmVudEJhc2UsIEZvcm1CYXNlXSlcbmV4cG9ydCBjbGFzcyBVcGxvYWRlckNvbXBvbmVudCBleHRlbmRzIFVwbG9hZGVyIGltcGxlbWVudHMgSUNvbXBvbmVudEJhc2Uge1xuICAgIHB1YmxpYyBmb3JtQ29tcENvbnRleHQgOiBhbnk7XG4gICAgcHVibGljIGZvcm1Db250ZXh0IDogYW55O1xuICAgIHB1YmxpYyB0YWdPYmplY3RzOiBhbnk7XG5cdGFjdGlvbkNvbXBsZXRlOiBhbnk7XG5cdGJlZm9yZVJlbW92ZTogYW55O1xuXHRiZWZvcmVVcGxvYWQ6IGFueTtcblx0Y2FuY2VsaW5nOiBhbnk7XG5cdGNoYW5nZTogYW55O1xuXHRjaHVua0ZhaWx1cmU6IGFueTtcblx0Y2h1bmtTdWNjZXNzOiBhbnk7XG5cdGNodW5rVXBsb2FkaW5nOiBhbnk7XG5cdGNsZWFyaW5nOiBhbnk7XG5cdGNyZWF0ZWQ6IGFueTtcblx0ZmFpbHVyZTogYW55O1xuXHRmaWxlTGlzdFJlbmRlcmluZzogYW55O1xuXHRwYXVzaW5nOiBhbnk7XG5cdHByb2dyZXNzOiBhbnk7XG5cdHJlbW92aW5nOiBhbnk7XG5cdHJlbmRlcmluZzogYW55O1xuXHRyZXN1bWluZzogYW55O1xuXHRzZWxlY3RlZDogYW55O1xuXHRzdWNjZXNzOiBhbnk7XG5cdHB1YmxpYyB1cGxvYWRpbmc6IGFueTtcbiAgICBwdWJsaWMgY2hpbGRGaWxlczogYW55O1xuICAgIHB1YmxpYyB0YWdzOiBzdHJpbmdbXSA9IFsnZmlsZXMnXTtcbiAgICAvKiogXG4gICAgICogU3BlY2lmaWVzIHRoZSBIVE1MIHN0cmluZyB0aGF0IHVzZWQgdG8gY3VzdG9taXplIHRoZSBjb250ZW50IG9mIGVhY2ggZmlsZSBpbiB0aGUgbGlzdC5cbiAgICAgKiBcbiAgICAgKiA+IEZvciBtb3JlIGluZm9ybWF0aW9uLCByZWZlciB0byB0aGUgW3RlbXBsYXRlXSguLi8uLi91cGxvYWRlci90ZW1wbGF0ZS8pIHNlY3Rpb24gZnJvbSB0aGUgZG9jdW1lbnRhdGlvbi5cbiAgICAgKiAgICAgXG4gICAgICogQGRlZmF1bHQgbnVsbFxuICAgICAqIEBhc3B0eXBlIHN0cmluZ1xuICAgICAqL1xuICAgIEBDb250ZW50Q2hpbGQoJ3RlbXBsYXRlJylcbiAgICBAVGVtcGxhdGUoKVxuICAgIHB1YmxpYyB0ZW1wbGF0ZTogYW55O1xuXG4gICAgcHVibGljIGZvY3VzOiBhbnk7XG4gICAgcHVibGljIGJsdXI6IGFueTtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nRWxlOiBFbGVtZW50UmVmLCBwcml2YXRlIHNyZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6Vmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm5nRWxlLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaW5qZWN0ZWRNb2R1bGVzID0gdGhpcy5pbmplY3RlZE1vZHVsZXMgfHwgW107XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckV2ZW50cyhvdXRwdXRzKTtcbiAgICAgICAgdGhpcy5hZGRUd29XYXkuY2FsbCh0aGlzLCB0d29XYXlzKTtcbiAgICAgICAgc2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZScsIHRoaXMsIHRoaXMudmlld0NvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMuZm9ybUNvbnRleHQgID0gbmV3IEZvcm1CYXNlKCk7XG4gICAgICAgIHRoaXMuZm9ybUNvbXBDb250ZXh0ICA9IG5ldyBDb21wb25lbnRCYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UocmVnaXN0ZXJGdW5jdGlvbjogKF86IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChyZWdpc3RlckZ1bmN0aW9uOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5mb3JtQ29tcENvbnRleHQubmdPbkluaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JtQ29udGV4dC5uZ0FmdGVyVmlld0luaXQodGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm1Db21wQ29udGV4dC5uZ09uRGVzdHJveSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhZ09iamVjdHNbMF0uaW5zdGFuY2UgPSB0aGlzLmNoaWxkRmlsZXM7XG4gICAgICAgIHRoaXMuZm9ybUNvbXBDb250ZXh0Lm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVnaXN0ZXJFdmVudHM6IChldmVudExpc3Q6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICAgIHB1YmxpYyBhZGRUd29XYXk6IChwcm9wTGlzdDogc3RyaW5nW10pID0+IHZvaWQ7XG59XG5cbiJdfQ==