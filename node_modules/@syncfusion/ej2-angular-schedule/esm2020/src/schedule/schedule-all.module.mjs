import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleModule } from './schedule.module';
import { Day, Week, WorkWeek, Month, Year, Agenda, MonthAgenda, TimelineViews, TimelineMonth, TimelineYear, Resize, DragAndDrop, ExcelExport, ICalendarExport, ICalendarImport, Print } from '@syncfusion/ej2-schedule';
import * as i0 from "@angular/core";
export const DayService = { provide: 'ScheduleDay', useValue: Day };
export const WeekService = { provide: 'ScheduleWeek', useValue: Week };
export const WorkWeekService = { provide: 'ScheduleWorkWeek', useValue: WorkWeek };
export const MonthService = { provide: 'ScheduleMonth', useValue: Month };
export const YearService = { provide: 'ScheduleYear', useValue: Year };
export const AgendaService = { provide: 'ScheduleAgenda', useValue: Agenda };
export const MonthAgendaService = { provide: 'ScheduleMonthAgenda', useValue: MonthAgenda };
export const TimelineViewsService = { provide: 'ScheduleTimelineViews', useValue: TimelineViews };
export const TimelineMonthService = { provide: 'ScheduleTimelineMonth', useValue: TimelineMonth };
export const TimelineYearService = { provide: 'ScheduleTimelineYear', useValue: TimelineYear };
export const ResizeService = { provide: 'ScheduleResize', useValue: Resize };
export const DragAndDropService = { provide: 'ScheduleDragAndDrop', useValue: DragAndDrop };
export const ExcelExportService = { provide: 'ScheduleExcelExport', useValue: ExcelExport };
export const ICalendarExportService = { provide: 'ScheduleICalendarExport', useValue: ICalendarExport };
export const ICalendarImportService = { provide: 'ScheduleICalendarImport', useValue: ICalendarImport };
export const PrintService = { provide: 'SchedulePrint', useValue: Print };
/**
 * NgModule definition for the Schedule component with providers.
 */
export class ScheduleAllModule {
}
ScheduleAllModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ScheduleAllModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ScheduleAllModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ScheduleAllModule, imports: [CommonModule, ScheduleModule], exports: [ScheduleModule] });
ScheduleAllModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ScheduleAllModule, providers: [
        DayService,
        WeekService,
        WorkWeekService,
        MonthService,
        YearService,
        AgendaService,
        MonthAgendaService,
        TimelineViewsService,
        TimelineMonthService,
        TimelineYearService,
        ResizeService,
        DragAndDropService,
        ExcelExportService,
        ICalendarExportService,
        ICalendarImportService,
        PrintService
    ], imports: [[CommonModule, ScheduleModule], ScheduleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: ScheduleAllModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ScheduleModule],
                    exports: [
                        ScheduleModule
                    ],
                    providers: [
                        DayService,
                        WeekService,
                        WorkWeekService,
                        MonthService,
                        YearService,
                        AgendaService,
                        MonthAgendaService,
                        TimelineViewsService,
                        TimelineMonthService,
                        TimelineYearService,
                        ResizeService,
                        DragAndDropService,
                        ExcelExportService,
                        ICalendarExportService,
                        ICalendarImportService,
                        PrintService
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZWR1bGUtYWxsLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zY2hlZHVsZS9zY2hlZHVsZS1hbGwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQU0vQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBQyxNQUFNLDBCQUEwQixDQUFBOztBQUdyTixNQUFNLENBQUMsTUFBTSxVQUFVLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDLENBQUM7QUFDbEYsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFrQixFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO0FBQ3JGLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBa0IsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxDQUFDO0FBQ2pHLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBa0IsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQztBQUN4RixNQUFNLENBQUMsTUFBTSxXQUFXLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7QUFDckYsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFrQixFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDLENBQUM7QUFDM0YsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUMsQ0FBQztBQUMxRyxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBa0IsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBQyxDQUFDO0FBQ2hILE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFrQixFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFDLENBQUM7QUFDaEgsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQWtCLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUMsQ0FBQztBQUM3RyxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQWtCLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsQ0FBQztBQUMzRixNQUFNLENBQUMsTUFBTSxrQkFBa0IsR0FBa0IsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBQyxDQUFDO0FBQzFHLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFrQixFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFDLENBQUM7QUFDMUcsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQWtCLEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUMsQ0FBQztBQUN0SCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBa0IsRUFBRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBQyxDQUFDO0FBQ3RILE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBa0IsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQztBQUV4Rjs7R0FFRztBQXlCSCxNQUFNLE9BQU8saUJBQWlCOzs4R0FBakIsaUJBQWlCOytHQUFqQixpQkFBaUIsWUF2QmhCLFlBQVksRUFBRSxjQUFjLGFBRWxDLGNBQWM7K0dBcUJULGlCQUFpQixhQW5CaEI7UUFDTixVQUFVO1FBQ1YsV0FBVztRQUNYLGVBQWU7UUFDZixZQUFZO1FBQ1osV0FBVztRQUNYLGFBQWE7UUFDYixrQkFBa0I7UUFDbEIsb0JBQW9CO1FBQ3BCLG9CQUFvQjtRQUNwQixtQkFBbUI7UUFDbkIsYUFBYTtRQUNiLGtCQUFrQjtRQUNsQixrQkFBa0I7UUFDbEIsc0JBQXNCO1FBQ3RCLHNCQUFzQjtRQUN0QixZQUFZO0tBQ2YsWUFyQlEsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLEVBRW5DLGNBQWM7MkZBcUJULGlCQUFpQjtrQkF4QjdCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQztvQkFDdkMsT0FBTyxFQUFFO3dCQUNMLGNBQWM7cUJBQ2pCO29CQUNELFNBQVMsRUFBQzt3QkFDTixVQUFVO3dCQUNWLFdBQVc7d0JBQ1gsZUFBZTt3QkFDZixZQUFZO3dCQUNaLFdBQVc7d0JBQ1gsYUFBYTt3QkFDYixrQkFBa0I7d0JBQ2xCLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3dCQUNwQixtQkFBbUI7d0JBQ25CLGFBQWE7d0JBQ2Isa0JBQWtCO3dCQUNsQixrQkFBa0I7d0JBQ2xCLHNCQUFzQjt3QkFDdEIsc0JBQXNCO3dCQUN0QixZQUFZO3FCQUNmO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIFZhbHVlUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBWaWV3RGlyZWN0aXZlLCBWaWV3c0RpcmVjdGl2ZSB9IGZyb20gJy4vdmlld3MuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlc291cmNlRGlyZWN0aXZlLCBSZXNvdXJjZXNEaXJlY3RpdmUgfSBmcm9tICcuL3Jlc291cmNlcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSGVhZGVyUm93RGlyZWN0aXZlLCBIZWFkZXJSb3dzRGlyZWN0aXZlIH0gZnJvbSAnLi9oZWFkZXJyb3dzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUb29sYmFySXRlbURpcmVjdGl2ZSwgVG9vbGJhckl0ZW1zRGlyZWN0aXZlIH0gZnJvbSAnLi90b29sYmFyaXRlbXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNjaGVkdWxlQ29tcG9uZW50IH0gZnJvbSAnLi9zY2hlZHVsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2NoZWR1bGVNb2R1bGUgfSBmcm9tICcuL3NjaGVkdWxlLm1vZHVsZSc7XG5pbXBvcnQge0RheSwgV2VlaywgV29ya1dlZWssIE1vbnRoLCBZZWFyLCBBZ2VuZGEsIE1vbnRoQWdlbmRhLCBUaW1lbGluZVZpZXdzLCBUaW1lbGluZU1vbnRoLCBUaW1lbGluZVllYXIsIFJlc2l6ZSwgRHJhZ0FuZERyb3AsIEV4Y2VsRXhwb3J0LCBJQ2FsZW5kYXJFeHBvcnQsIElDYWxlbmRhckltcG9ydCwgUHJpbnR9IGZyb20gJ0BzeW5jZnVzaW9uL2VqMi1zY2hlZHVsZSdcblxuXG5leHBvcnQgY29uc3QgRGF5U2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1NjaGVkdWxlRGF5JywgdXNlVmFsdWU6IERheX07XG5leHBvcnQgY29uc3QgV2Vla1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdTY2hlZHVsZVdlZWsnLCB1c2VWYWx1ZTogV2Vla307XG5leHBvcnQgY29uc3QgV29ya1dlZWtTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnU2NoZWR1bGVXb3JrV2VlaycsIHVzZVZhbHVlOiBXb3JrV2Vla307XG5leHBvcnQgY29uc3QgTW9udGhTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnU2NoZWR1bGVNb250aCcsIHVzZVZhbHVlOiBNb250aH07XG5leHBvcnQgY29uc3QgWWVhclNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdTY2hlZHVsZVllYXInLCB1c2VWYWx1ZTogWWVhcn07XG5leHBvcnQgY29uc3QgQWdlbmRhU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1NjaGVkdWxlQWdlbmRhJywgdXNlVmFsdWU6IEFnZW5kYX07XG5leHBvcnQgY29uc3QgTW9udGhBZ2VuZGFTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnU2NoZWR1bGVNb250aEFnZW5kYScsIHVzZVZhbHVlOiBNb250aEFnZW5kYX07XG5leHBvcnQgY29uc3QgVGltZWxpbmVWaWV3c1NlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdTY2hlZHVsZVRpbWVsaW5lVmlld3MnLCB1c2VWYWx1ZTogVGltZWxpbmVWaWV3c307XG5leHBvcnQgY29uc3QgVGltZWxpbmVNb250aFNlcnZpY2U6IFZhbHVlUHJvdmlkZXIgPSB7IHByb3ZpZGU6ICdTY2hlZHVsZVRpbWVsaW5lTW9udGgnLCB1c2VWYWx1ZTogVGltZWxpbmVNb250aH07XG5leHBvcnQgY29uc3QgVGltZWxpbmVZZWFyU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1NjaGVkdWxlVGltZWxpbmVZZWFyJywgdXNlVmFsdWU6IFRpbWVsaW5lWWVhcn07XG5leHBvcnQgY29uc3QgUmVzaXplU2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1NjaGVkdWxlUmVzaXplJywgdXNlVmFsdWU6IFJlc2l6ZX07XG5leHBvcnQgY29uc3QgRHJhZ0FuZERyb3BTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnU2NoZWR1bGVEcmFnQW5kRHJvcCcsIHVzZVZhbHVlOiBEcmFnQW5kRHJvcH07XG5leHBvcnQgY29uc3QgRXhjZWxFeHBvcnRTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnU2NoZWR1bGVFeGNlbEV4cG9ydCcsIHVzZVZhbHVlOiBFeGNlbEV4cG9ydH07XG5leHBvcnQgY29uc3QgSUNhbGVuZGFyRXhwb3J0U2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1NjaGVkdWxlSUNhbGVuZGFyRXhwb3J0JywgdXNlVmFsdWU6IElDYWxlbmRhckV4cG9ydH07XG5leHBvcnQgY29uc3QgSUNhbGVuZGFySW1wb3J0U2VydmljZTogVmFsdWVQcm92aWRlciA9IHsgcHJvdmlkZTogJ1NjaGVkdWxlSUNhbGVuZGFySW1wb3J0JywgdXNlVmFsdWU6IElDYWxlbmRhckltcG9ydH07XG5leHBvcnQgY29uc3QgUHJpbnRTZXJ2aWNlOiBWYWx1ZVByb3ZpZGVyID0geyBwcm92aWRlOiAnU2NoZWR1bGVQcmludCcsIHVzZVZhbHVlOiBQcmludH07XG5cbi8qKlxuICogTmdNb2R1bGUgZGVmaW5pdGlvbiBmb3IgdGhlIFNjaGVkdWxlIGNvbXBvbmVudCB3aXRoIHByb3ZpZGVycy5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTY2hlZHVsZU1vZHVsZV0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBTY2hlZHVsZU1vZHVsZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOltcbiAgICAgICAgRGF5U2VydmljZSxcbiAgICAgICAgV2Vla1NlcnZpY2UsXG4gICAgICAgIFdvcmtXZWVrU2VydmljZSxcbiAgICAgICAgTW9udGhTZXJ2aWNlLFxuICAgICAgICBZZWFyU2VydmljZSxcbiAgICAgICAgQWdlbmRhU2VydmljZSxcbiAgICAgICAgTW9udGhBZ2VuZGFTZXJ2aWNlLFxuICAgICAgICBUaW1lbGluZVZpZXdzU2VydmljZSxcbiAgICAgICAgVGltZWxpbmVNb250aFNlcnZpY2UsXG4gICAgICAgIFRpbWVsaW5lWWVhclNlcnZpY2UsXG4gICAgICAgIFJlc2l6ZVNlcnZpY2UsXG4gICAgICAgIERyYWdBbmREcm9wU2VydmljZSxcbiAgICAgICAgRXhjZWxFeHBvcnRTZXJ2aWNlLFxuICAgICAgICBJQ2FsZW5kYXJFeHBvcnRTZXJ2aWNlLFxuICAgICAgICBJQ2FsZW5kYXJJbXBvcnRTZXJ2aWNlLFxuICAgICAgICBQcmludFNlcnZpY2VcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFNjaGVkdWxlQWxsTW9kdWxlIHsgfSJdfQ==