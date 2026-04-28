import type { ApexOptions } from 'apexcharts'
import { CHART_THEME } from '@/lib/apex/chartTheme'

const hrs = ['6a', '9a', '12p', '3p', '6p', '9p'] as const

export const HEALTH_HEART_BARS = {
  getSeries() {
    return [{ name: 'Bpm', data: [72, 78, 85, 89, 86, 82, 80, 75] as number[] }]
  },
  getOptions(): ApexOptions {
    return {
      chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit' },
      colors: [CHART_THEME.destructive],
      plotOptions: { bar: { borderRadius: 3, columnWidth: '40%' } },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ['', '', '', 'Now', '', '', '', ''] as string[],
        labels: { show: true, style: { colors: CHART_THEME.mutedFore, fontSize: '10px' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: { min: 60, max: 100, tickAmount: 4, labels: { style: { colors: CHART_THEME.mutedFore } } },
      grid: { borderColor: CHART_THEME.border, strokeDashArray: 3 },
      tooltip: { theme: 'light' },
    }
  },
}

export const HEALTH_HYDRATION_RADIAL = {
  getSeries() {
    return [80]
  },
  getOptions(): ApexOptions {
    return {
      chart: { type: 'radialBar', fontFamily: 'inherit', toolbar: { show: false } },
      colors: [CHART_THEME.success],
      plotOptions: {
        radialBar: {
          hollow: { size: '62%' },
          startAngle: -90,
          endAngle: 90,
          track: { background: CHART_THEME.mutedBg },
          dataLabels: {
            show: true,
            name: { show: true, color: CHART_THEME.mutedFore, fontSize: '11px', offsetY: 18 },
            value: { fontSize: '24px', color: CHART_THEME.fore, fontWeight: 600, offsetY: -6 },
            total: { show: true, label: 'Hydration', formatter: () => '80%' },
          },
        },
      },
      labels: [''],
      stroke: { lineCap: 'round' },
    }
  },
}

export const HEALTH_BLOOD_LOLLIPOP = {
  getSeries() {
    return [{ name: 'Count', data: [820, 950, 1100, 1020, 980, 1100, 1080, 1050] as number[] }]
  },
  getOptions(): ApexOptions {
    return {
      chart: { type: 'line', toolbar: { show: false }, fontFamily: 'inherit' },
      colors: [CHART_THEME.info],
      stroke: { width: 0 },
      markers: { size: 5, strokeWidth: 0, hover: { size: 7 } },
      xaxis: {
        categories: [...hrs, '', ''] as string[],
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

export const HEALTH_ACTIVITY_LINE = {
  getSeries() {
    return [{ name: 'Activity', data: [120, 180, 210, 190, 240, 280, 310, 270] as number[] }]
  },
  getOptions(): ApexOptions {
    return {
      chart: { type: 'area', toolbar: { show: false }, fontFamily: 'inherit' },
      colors: [CHART_THEME.primary],
      stroke: { width: 2, curve: 'smooth' },
      fill: { type: 'gradient', gradient: { opacityFrom: 0.45, opacityTo: 0.05 } },
      xaxis: {
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: { labels: { show: false } },
      grid: { show: false },
      dataLabels: { enabled: false },
      tooltip: { theme: 'light' },
    }
  },
}

export const HEALTH_SLEEP_LINE = {
  getSeries() {
    return [{ name: 'SLP', data: [0, 0.3, 0.7, 0.95, 0.4, 0, 0, 0, 0.2, 0.5, 0.3, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.85] as number[] }]
  },
  getOptions(): ApexOptions {
    return {
      chart: { type: 'line', sparkline: { enabled: true }, fontFamily: 'inherit', toolbar: { show: false } },
      colors: [CHART_THEME.secondary],
      stroke: { width: 2, curve: 'smooth' },
      tooltip: { theme: 'light' },
    }
  },
}
