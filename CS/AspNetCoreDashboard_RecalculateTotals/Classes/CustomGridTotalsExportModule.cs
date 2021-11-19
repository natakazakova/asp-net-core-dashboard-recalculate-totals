using AspNetCoreDashboard_RecalculateTotals.Classes;
using DevExpress.DashboardExport;
using DevExpress.XtraReports.UI;
using System.Collections.Generic;
using System.Linq;

namespace AspNetCoreDashboard_RecalculateTotals {
    public class CustomGridTotalsExportModule {
        public static void CustomizeGridsTotals(XtraReport report, List<GridTotal> gridsTotals) {
            var detailBand = report.Bands[BandKind.Detail];
            var gridFooters = detailBand.Controls.OfType<XRGridFooterPanel>();

            foreach (var gridFooter in gridFooters) {
                var totals = gridsTotals
                    .Where(t => t.ComponentName == gridFooter.GridComponentName)
                    .GroupBy(t => t.DataItem)
                    .Select(group => new { DataItem = group.Key, ColumnTotals = group.ToList() })
                    .ToList();

                foreach (var total in totals) {
                    var columnTotals = gridFooter.GetColumnTotals(total.DataItem);
                    for (int i = 0; i < columnTotals.Count; i++) {
                        columnTotals[i].Text = total.ColumnTotals[i].ValueText;
                    }
                }
            }
        }
    }


}
