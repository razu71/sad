import type { ApexOptions } from 'apexcharts'
import { CHART_THEME } from '@/lib/apex/chartTheme'

const wks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'] as const

export const FLEET_FUEL_BARS = {
  getSeries() {
    return [{ name: 'Fuel (L/100km)', data: [8.2, 7.9, 8.4, 7.6, 8.0, 7.4] as number[] }]
  },
  getOptions(): ApexOptions {
    return {
      chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit' },
      colors: [CHART_THEME.secondary],
      plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } },
      dataLabels: { enabled: false },
      xaxis: {
        categories: [...wks],
        labels: { style: { colors: CHART_THEME.mutedFore } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: { labels: { style: { colors: CHART_THEME.mutedFore } } },
      grid: { borderColor: CHART_THEME.border, strokeDashArray: 4 },
      tooltip: { theme: 'light' },
    }
  },
}

export const FLEET_MILEAGE_AREA = {
  getSeries() {
    return [
      { name: 'Mileage', data: [1200, 1450, 1680, 1920, 2100, 2340, 2560, 2800] as number[] },
    ]
  },
  getOptions(): ApexOptions {
    return {
      chart: { type: 'area', toolbar: { show: false }, fontFamily: 'inherit' },
      colors: [CHART_THEME.info],
      stroke: { width: 2, curve: 'smooth' },
      fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'] as string[],
        labels: { style: { colors: CHART_THEME.mutedFore } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: { labels: { style: { colors: CHART_THEME.mutedFore } } },
      grid: { borderColor: CHART_THEME.border, strokeDashArray: 4 },
      dataLabels: { enabled: false },
      tooltip: { theme: 'light' },
    }
  },
}

export const FLEET_STATUS_DONUT = {
  getSeries() {
    return [62, 18, 20]
  },
  getOptions(): ApexOptions {
    return {
      chart: { type: 'donut', fontFamily: 'inherit', toolbar: { show: false } },
      colors: [CHART_THEME.success, CHART_THEME.warning, CHART_THEME.muted],
      labels: ['On route', 'Idle', 'Maintenance'],
      dataLabels: { enabled: true },
      plotOptions: {
        pie: {
          donut: { size: '68%', labels: { show: true, name: { color: CHART_THEME.mutedFore }, value: { color: CHART_THEME.fore, fontSize: '18px' } } },
        },
      },
      legend: { show: true, position: 'bottom', fontWeight: 500, labels: { colors: CHART_THEME.fore } },
      tooltip: { theme: 'light' },
    }
  },
}
