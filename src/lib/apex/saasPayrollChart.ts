import type { ApexOptions } from 'apexcharts'

/**
 * Bar chart (grouped) for SaaS dashboard payroll view.
 * Colors align with :root in src/style.css (user theme preferences).
 */
export const SAAS_CHART_COLORS = {
  seriesA: '#2563EB',
  seriesB: '#2E9E8F',
  label: '#5C6B75',
  grid: '#E5E7EB',
  fore: '#1B3A4B',
} as const

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] as const

export function getPayrollBarSeries() {
  return [
    { name: 'Total payout', data: [42, 38, 55, 48, 52, 60] as number[] },
    { name: 'Delayed payout', data: [28, 32, 30, 26, 34, 29] as number[] },
  ]
}

export function getPayrollBarChartOptions(): ApexOptions {
  return {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: 'inherit',
    },
    colors: [SAAS_CHART_COLORS.seriesA, SAAS_CHART_COLORS.seriesB],
    dataLabels: { enabled: false },
    stroke: { show: true, width: 0, colors: ['transparent'] },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '55%',
        dataLabels: { position: 'top' },
      },
    },
    xaxis: {
      categories: [...months],
      labels: { style: { colors: SAAS_CHART_COLORS.label } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { colors: SAAS_CHART_COLORS.label } },
    },
    grid: { borderColor: SAAS_CHART_COLORS.grid, strokeDashArray: 4 },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      fontWeight: 500,
      labels: { colors: SAAS_CHART_COLORS.fore },
    },
    tooltip: { theme: 'light' },
  }
}
