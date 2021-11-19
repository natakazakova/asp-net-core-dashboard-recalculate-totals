var CustomGridTotalsExtension = (function () {
    var dashboardControl;
    var gridTotalsToSerialize;

    function onDashboardInitialized(e) {
        gridTotalsToSerialize = [];
    }

    function onGridOptionChanged(e, gridComponentName) {
        if (e.name === 'filterValue')
            gridTotalsToSerialize = gridTotalsToSerialize.filter(function (t) { return t.componentName !== gridComponentName });
    }

    function onItemWidgetOptionsPrepared(e) {
        if (e.dashboardItem instanceof DevExpress.Dashboard.Model.GridItem) {
            e.options.filterRow = { visible: true };
            e.options.headerFilter = { visible: true };
            e.options.filterSyncEnabled = true;
            e.options.remoteOperations = { summary: false };
            e.options.onOptionChanged = function (args) { onGridOptionChanged(args, e.itemName) };
            e.options.summary.totalItems = generateGridTotals(e.dashboardItem);
        };
    }

    function generateGridTotals(gridItem) {
        var gridTotalItems = [];
        var gridComponentName = gridItem.componentName();
        var viewerApiExtension = dashboardControl.findExtension('viewer-api');
        var itemData = viewerApiExtension.getItemData(gridComponentName);
        gridItem.columns().forEach(function (column) {
            column.totals().forEach(function (total) {
                var dataItemName = column.actualDataItem.uniqueName();
                var measures = itemData.getMeasures().filter(function (m) { return m.id === dataItemName });
                var dimensions = itemData.getDimensions('Default').filter(function (d) { return d.id === dataItemName });
                var dataItem = measures.length > 0 ? measures[0] : dimensions[0];

                gridTotalItems.push({
                    column: dataItem.id,
                    summaryType: summaryTypesMap[total.totalType()],
                    customizeText: function (args) {
                        var formattedValue;
                        if (total.totalType() === 'Auto')
                            formattedValue = 'Auto: Not Supported';
                        else
                            if (total.totalType() === 'Count')
                                formattedValue = total.totalType() + ' = ' + args.value;
                            else
                                formattedValue = total.totalType() + ' = ' + dataItem.format(args.value);

                        gridTotalsToSerialize.push({
                            dataItem: dataItem.id,
                            componentName: gridComponentName,
                            valueText: formattedValue
                        });

                        var previousValue = dashboardControl.option('ajaxRemoteService.headers');
                        dashboardControl.option('ajaxRemoteService.headers', { previousValue, 'gridTotals': JSON.stringify(gridTotalsToSerialize) });

                        return formattedValue;
                    }
                });
            });
        });
        return gridTotalItems;
    }

    var summaryTypesMap = {
        Sum: 'sum',
        Min: 'min',
        Max: 'max',
        Avg: 'avg',
        Count: 'count',
        Auto: 'custom'
    }

    function CustomGridTotalsExtension(control) {
        this.name = "CustomGridTotalsExtension",
            this.start = function () {
                dashboardControl = control;
                dashboardControl.on('dashboardInitialized', onDashboardInitialized);
                var viewerApiExtension = dashboardControl.findExtension('viewer-api');
                if (viewerApiExtension)
                    viewerApiExtension.on('itemWidgetOptionsPrepared', onItemWidgetOptionsPrepared);
            },
            this.stop = function () {
                dashboardControl.off('dashboardInitialized', onDashboardInitialized);
                var viewerApiExtension = dashboardControl.findExtension('viewer-api');
                if (viewerApiExtension)
                    viewerApiExtension.off('itemWidgetOptionsPrepared', onItemWidgetOptionsPrepared);
            }
    }
    return CustomGridTotalsExtension;
}());