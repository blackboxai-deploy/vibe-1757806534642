"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: number[]
  onValueChange?: (value: number[]) => void
  max?: number
  min?: number
  step?: number
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value = [0], onValueChange, max = 100, min = 0, step = 1, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value)
      onValueChange?.([newValue])
    }

    return (
      <div ref={ref} className={cn("relative flex w-full touch-none select-none items-center", className)}>
        <input
          type="range"
          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
          value={value[0]}
          onChange={handleChange}
          max={max}
          min={min}
          step={step}
          style={{
            background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(value[0] - min) / (max - min) * 100}%, hsl(var(--secondary)) ${(value[0] - min) / (max - min) * 100}%, hsl(var(--secondary)) 100%)`
          }}
          {...props}
        />
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            border: 2px solid hsl(var(--background));
            box-shadow: 0 0 0 1px hsl(var(--border));
          }
          
          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: hsl(var(--primary));
            cursor: pointer;
            border: 2px solid hsl(var(--background));
            box-shadow: 0 0 0 1px hsl(var(--border));
          }
        `}</style>
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }