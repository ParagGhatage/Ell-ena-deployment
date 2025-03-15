import type * as React from "react"

const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>
}

const ChartGrid = () => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20M0 0H20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
}

const ChartLine = ({ children }: { children: React.ReactNode }) => {
  return <svg className="absolute inset-0 w-full h-full pointer-events-none">{children}</svg>
}

interface ChartLineSeriesProps<T> {
  data: T[]
  xAccessor: (d: T) => string | number
  yAccessor: (d: T) => number
  className?: string
}

const ChartLineSeries = <T extends object>({ data, xAccessor, yAccessor, className }: ChartLineSeriesProps<T>) => {
  const pathData = data
    .map((item, index) => {
      const x = xAccessor(item)
      const y = yAccessor(item)
      return `${index === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  return <path d={pathData} strokeWidth="2" fill="none" className={className} />
}

const ChartXAxis = () => {
  return null
}

const ChartYAxis = () => {
  return null
}

const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return <div className="pointer-events-none absolute z-10">{children}</div>
}

const ChartTooltipContent = () => {
  return <div className="bg-white border rounded-md shadow-md p-2">Tooltip Content</div>
}

const Chart = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>
}

export {
  Chart,
  ChartContainer,
  ChartGrid,
  ChartLine,
  ChartLineSeries,
  ChartXAxis,
  ChartYAxis,
  ChartTooltip,
  ChartTooltipContent,
}

