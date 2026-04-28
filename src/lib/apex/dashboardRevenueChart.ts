import type { ApexOptions } from 'apexcharts'
import { CHART_THEME } from '@/lib/apex/chartTheme'

/** Mock revenue trend (USD) for admin dashboard. */
export function getDashboardRevenueSeries() {
  return [{ name: 'Revenue', data: [18200, 19400, 20900, 20100, 22800, 24200, 24500] as number[] }]
}

export function getDashboardRevenueChartOptions(): ApexOptions {
  return {
    chart: { type: 'area', toolbar: { show: false }, fontFamily: 'inherit' },
    colors: [CHART_THEME.primary],
    stroke: { width: 2, curve: 'smooth' },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as string[],
      labels: { style: { colors: CHART_THEME.mutedFore } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: CHART_THEME.mutedFore },
        formatter: (v: number) => {
          if (v >= 1000) {
            return `$${(v / 1000).toFixed(1)}k`
          }

          return `$${v}`
        },
      },
    },
    dataLabels: { enabled: false },
    grid: { borderColor: CHART_THEME.border, strokeDashArray: 4 },
    tooltip: {
      theme: 'light',
      y: { formatter: (v: number) => `$${v.toLocaleString()}` },
    },
  }
}
