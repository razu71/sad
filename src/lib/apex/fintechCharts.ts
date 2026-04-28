import type { ApexOptions } from 'apexcharts'
import { CHART_THEME } from '@/lib/apex/chartTheme'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

export const FINTECH_DAILY_SALES = {
  getSeries() {
    return [{ name: 'Sales', data: [120, 95, 180, 110, 140, 200] as number[] }]
  },
  getOptions(): ApexOptions {
    const dim: string[] = Array.from({ length: days.length }, () => CHART_THEME.muted)
    dim[2] = CHART_THEME.primary
    return {
      chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'inherit' },
      colors: dim,
      plotOptions: { bar: { borderRadius: 6, columnWidth: '50%', distributed: true, dataLabels: { position: 'top' } } },
      dataLabels: { enabled: false },
      xaxis: {
        categories: [...days],
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

export function getFintechSparklineSeries(positive: boolean) {
  return [{ data: positive ? [12, 18, 14, 22, 28, 30, 35] : [20, 18, 22, 19, 16, 12, 10] as number[] }]
}

export function getFintechSparklineOptions(positive: boolean): ApexOptions {
  const c = positive ? CHART_THEME.success : CHART_THEME.destructive
  return {
    chart: { type: 'area', sparkline: { enabled: true }, fontFamily: 'inherit', toolbar: { show: false } },
    colors: [c],
    stroke: { width: 2, curve: 'smooth' },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
    tooltip: { theme: 'light', x: { show: false } },
  }
}

export const FINTECH_GROWTH_RADIAL = {
  getSeries() {
    return [73.1]
  },
  getOptions(): ApexOptions {
    return {
      chart: { type: 'radialBar', fontFamily: 'inherit', toolbar: { show: false } },
      colors: [CHART_THEME.info],
      plotOptions: {
        radialBar: {
          hollow: { size: '68%' },
          track: { background: CHART_THEME.mutedBg },
          dataLabels: {
            show: true,
            name: { show: true, color: CHART_THEME.mutedFore, fontSize: '11px', offsetY: 10 },
            value: {
              fontSize: '22px',
              color: CHART_THEME.fore,
              fontWeight: 600,
              offsetY: -4,
              formatter: (v: number) => `+${v}%`,
            },
          },
        },
      },
      labels: ['Growth rate'],
      stroke: { lineCap: 'round' },
    }
  },
}
