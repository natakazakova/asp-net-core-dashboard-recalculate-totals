<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/393051741/21.2.1%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1019660)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
# Dashboard for ASP.NET Core - How to recalculate totals on applying Grid filtering

By default, the Dashboard does not fully support Grid column filters. They may only be used to select which data to show in the grid and they do not affect Total values calculated by the dashboard data engine. As a result, when you apply grid column filters, the grid shows filtered data, but Totals remain the same.

The example demonstrates how to recalculate totals in the Grid dashboard item when when you apply column filtering in the grid. This functionality is implemented using the dxDataGrid's [Total Summary](https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/Summaries/Total_Summary/) functionality.

The example supports all the dashboard's [Total types](https://docs.devexpress.com/Dashboard/117302/web-dashboard/create-dashboards-on-the-web/dashboard-item-settings/grid/totals#totals-overview) except for "Auto". If you apply the "Auto" total type in the dashboard, the "Not Supported" text will be shown instead of the total value.

The example also supports data export modifying Total values during the export. This functionality is implemented by overriding the export procedure in the [DashboardConfigurator.CustomExport])https://docs.devexpress.com/Dashboard/DevExpress.DashboardWeb.DashboardConfigurator.CustomExport) event handler.

<!-- default file list -->

## Files to Look At

* [CustomGridTotalsExtension.js](./CS/AspNetCoreDashboard_RecalculateTotals/wwwroot/js/CustomGridTotalsExtension.js)
* [_Layout.cshtml](./CS/AspNetCoreDashboard_RecalculateTotals/Pages/_Layout.cshtml)
* [CustomGridTotalsExportModule.cs](./CS/AspNetCoreDashboard_RecalculateTotals/Classes/CustomGridTotalsExportModule.cs)
* [GridTotal.cs](./CS/AspNetCoreDashboard_RecalculateTotals/Classes/GridTotal.cs)

<!-- default file list end -->

## Documentation

* [Totals](https://docs.devexpress.com/Dashboard/117302/web-dashboard/create-dashboards-on-the-web/dashboard-item-settings/grid/totals?p=netframework)
* [Manage Extensions in ASP.NET Core](https://docs.devexpress.com/Dashboard/403354/web-dashboard/aspnet-core-dashboard-control/manage-extensions?p=netframework)
* [Access to Underlying Widgets in ASP.NET Core](https://docs.devexpress.com/Dashboard/401090/web-dashboard/aspnet-core-dashboard-control/access-to-underlying-widgets?p=netframework)

## More Examples

* [Dashboard for ASP.NET Core - Custom Item Gallery](https://github.com/DevExpress-Examples/asp-net-core-dashboard-custom-item-gallery)