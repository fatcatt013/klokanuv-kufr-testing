import React from "react"
import Svg, { SvgProps, Path, G } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg viewBox="0 0 1158.1 1158" {...props}>
    <Path
      d="M1158.1 164.32V993.7c0 90.74-73.58 164.33-164.41 164.33h-829.3c-36.33 0-69.82-11.72-97.02-31.56-5.45-4.02-10.64-8.37-15.57-12.98-2.6-2.51-5.11-5.02-7.54-7.61C16.8 1076.49-.03 1037.06-.03 993.7V164.32C-.03 73.57 73.56-.02 164.39-.02h829.3c46.96 0 89.4 19.76 119.29 51.32 1.26 1.34 2.51 2.68 3.77 4.1 8.04 8.96 15.07 18.92 20.93 29.56 12.97 23.52 20.42 50.56 20.42 79.36z"
      fill="#e7a91e"
    />
    <G fill="#fff">
      <Path d="M1083 733.1v92.91a107.312 107.312 0 0 1-107.2 107.2h-28.59c-1.9 0-3.72.75-5.06 2.09a7.169 7.169 0 0 0-2.09 5.06v217.66H739.94V940.36c0-.22-.1-.39-.12-.6a8.25 8.25 0 0 0-.81-2.74c-.1-.18-.11-.37-.22-.55-.13-.2-.34-.32-.49-.5-.31-.39-.66-.75-1.04-1.07-.69-.56-1.48-.99-2.32-1.25a6.68 6.68 0 0 0-1.45-.3c-.23-.06-.46-.11-.69-.14-.21 0-.38.1-.58.12-.95.1-1.89.37-2.75.81-.18.09-.39.11-.56.22a86.85 86.85 0 0 0-39.99 48.3c-3.57 13.21-4.63 40.3 28.37 73.27a28.637 28.637 0 0 1 7.35 27.6 28.594 28.594 0 0 1-20.2 20.19 28.572 28.572 0 0 1-27.59-7.35c-39.53-39.55-54.84-85.23-43.11-128.63 11.64-43.05 48.39-78.49 106.35-102.51.33-.14 8.43-3.55 29.82-10.7 38.21 24.63 86.55 27.37 127.3 7.21h78.58c13.27-.02 25.98-5.29 35.36-14.67s14.65-22.09 14.67-35.36V733.1a28.57 28.57 0 0 1 14.3-24.76c8.84-5.1 19.74-5.1 28.58 0a28.57 28.57 0 0 1 14.3 24.76z" />
      <Path d="M840.02 826.12a113.9 113.9 0 0 0 112.76-114.66c-.2-30.14-12.34-58.98-33.76-80.19s-50.37-33.06-80.52-32.97c-30.14.1-59.01 12.14-80.29 33.49s-33.23 50.27-33.23 80.41c.19 30.35 12.4 59.39 33.97 80.74a114.6 114.6 0 0 0 81.07 33.18zM684.6 635.2c-20.45 9.21-169.72-44.01-193.27-37.1-57.2 16.79-122.67 26.32-192.23 26.32-118.44 0-225.01-27.63-299.12-71.68V255.1c74.11-44.06 180.68-71.69 299.12-71.69 223.87 0 411.45 39.97 411.45 161.75 0 49.81-36.46 154.52-87.66 191.44-19.08 13.75 86.08 87.62 61.71 98.6z" />
    </G>
    <G fill="#e7a91e">
      <Path d="M48.155 528.9c-2.25.19-4.47-.46-6.68-1.97-2.22-1.69-3.99-4.08-5.29-7.18-1.31-3.09-2.04-6.71-2.21-10.84-.92-21.43.3-44.41 3.64-68.94s6.14-41.75 8.4-51.67c2.25-9.91 5.79-25.07 10.63-45.49 1.46-4.84 7.74-9.16 18.83-12.95 11.08-3.79 25.15-6.43 42.19-7.9 10.67-.93 19.61-1.13 26.83-.63 7.2.32 14.15 2.22 20.87 5.69 6.71 3.48 12.28 8.32 16.68 14.54 4.41 6.22 6.98 13.54 7.71 21.97.13 1.5.17 4.14.12 7.91-.64 14.4-6.32 30.5-17.04 48.31-10.72 17.82-23.29 33.86-37.71 48.13-11.3 11.17-25.58 22.74-42.84 34.7-17.26 11.97-30.23 20.22-38.89 24.74-1.43.88-3.18 1.4-5.24 1.58zm64.91-165.24c-5.25.45-11.35 1.83-18.32 4.14l-2.48.78-10.86 83.58 8.12-7.5c26.36-24.55 41.55-43.03 45.56-55.46 1.36-3.89 1.9-7.43 1.63-10.61-.31-3.56-1.62-6.74-3.94-9.56-4.15-4.35-10.72-6.15-19.71-5.37zM231.16 495.2c-3.48 1.25-6.84.59-10.07-1.96-3.6-2.33-6.58-6.27-8.95-11.82s-4-12.34-4.88-20.38c-.47-7.5-.15-18.1.92-31.78 1.08-13.68 3.66-28.99 7.76-45.95 4.09-16.95 10-33.13 17.73-48.51 2.69-5.89 6.3-11.02 10.84-15.37 4.53-4.35 8.66-6.69 12.41-7.02 4.12-.36 7.28 1.26 9.48 4.84 1.91 2.48 3.61 6.34 5.11 11.58 1.49 5.25 2.56 11.62 3.21 19.11 1.25 14.42.86 29.55-1.16 45.38-4.94 38.73-13.51 68.34-25.69 88.82-2.31 3.79-4.92 6.84-7.83 9.17-2.93 2.34-5.89 3.63-8.88 3.89zm13.77-206.65c-3.37.29-6-.61-7.88-2.71-.66-1.07-1.05-2.36-1.18-3.86-.15-1.69.01-3.11.48-4.29 1.25-2.94 4.5-6.9 9.72-11.88 5.23-4.98 10.62-9.13 16.18-12.44l.54-.33c1.07-.66 2.01-1.26 2.81-1.8s1.56-1.03 2.28-1.47c6.79-4.36 12.72-7.8 17.78-10.32 3.05-1.77 6.64-2.84 10.76-3.2 3.55-.31 7.14.23 10.75 1.61 3.61 1.39 5.64 4.7 6.1 9.94.29 3.37-.94 6.64-3.68 9.8-2.75 3.17-7.8 6.95-15.15 11.36-6.98 4.38-14.71 8.21-23.2 11.49s-16.52 5.82-24.1 7.61zM314.72 505.8c-1.69.15-3.34-.37-4.95-1.55s-2.9-2.95-3.86-5.33c-1.45-3.65-2.57-10.06-3.37-19.23-2.18-25.09-.5-53.63 5.03-85.62 8.09-48.06 19.57-77.82 34.42-89.3 1.96-1.3 3.79-2.03 5.47-2.17 1.69-.15 3.24.38 4.67 1.58 2.07 2.09 3.28 5.19 3.64 9.31.91 10.49.93 27.09.07 49.8-.21 4.17-.22 7.28-.04 9.34.24 2.81.98 4.73 2.2 5.75.84 1.06 2.11 1.52 3.8 1.37.93-.08 3.02-1.01 6.26-2.81 11.49-6.66 26.61-14.1 45.33-22.33 10.18-4.46 18.24-7.71 24.2-9.74 5.95-2.02 11.18-3.23 15.68-3.62l.28-.02c2.06-.18 4.09.35 6.08 1.6 1.99 1.24 3.09 2.99 3.28 5.23.29 3.37-1.62 7.41-5.74 12.1-6.84 8.14-13.86 14.74-21.06 19.8S420.99 390 412.36 394.9l-8.39 4.41c-6.3 3.57-10.55 6.15-12.77 7.76s-3.24 3.44-3.06 5.5c.23 2.62 2.13 5.01 5.71 7.15s10.47 5.51 20.69 10.09l6.47 2.83c8.07 3.83 13.09 6.32 15.08 7.46l5.91 2.88c6.93 3.74 12.04 6.69 15.34 8.86s6.5 4.81 9.6 7.94c2.08 2.27 3.25 4.81 3.49 7.62.13 1.5.04 2.64-.27 3.42-1.74 3.93-5.97 6.18-12.71 6.76-1.12.1-3.39.11-6.79.02-7.22-.51-13.62-1.46-19.21-2.86-5.6-1.4-14.99-4.26-28.2-8.59-16.31-5.38-31.35-11.15-45.08-17.31l-4.99-2.11c-1.36-.45-2.6-.62-3.73-.53-2.62.23-4.65 1.91-6.07 5.05-.78 1.96-2.53 6.73-5.27 14.32-3.2 8.77-6.01 16.04-8.44 21.81-2.43 5.78-4.74 10.08-6.95 12.91-2.33 3.41-5.01 5.25-8 5.51zM527.32 526.12c-9.37.81-16.86.28-22.49-1.59-5.64-1.87-9.88-4.1-12.75-6.68-2.29-2.45-3.5-4.51-3.65-6.19l.18-1.15c.15-2.66.84-4.42 2.09-5.27 1.24-.86 3.91-1.66 8-2.39.92-.27 3.64-1.02 8.15-2.26 4.52-1.24 9.19-3.39 14.02-6.45 10.37-6.56 18.36-13.38 23.98-20.47 5.61-7.09 10.06-14.55 13.34-22.38 1.24-3.12 1.79-5.43 1.66-6.94-.1-1.12-.36-1.95-.78-2.48-.68-1.26-2.05-1.8-4.1-1.62-1.12.1-2.96.64-5.52 1.61-2.37.96-4.77 1.64-7.18 2.04-3.29 1.23-6.72 2-10.27 2.31-7.49.65-15.93-.97-25.33-4.88-5.91-2.88-11.71-7.24-17.41-13.07-5.7-5.82-8.98-13.8-9.86-23.91-.47-5.43-.02-11.13 1.35-17.1 3.17-13.48 6.05-23.77 8.64-30.89 2.59-7.11 6.06-13.87 10.41-20.29l1.75-2.7c5.32-8.2 9.79-14.38 13.39-18.57 3.6-4.18 6.98-6.5 10.15-6.96l1.66-.43c3.55-.31 6.35.4 8.39 2.1 1.88 2.1 2.95 4.65 3.21 7.65l.12 1.4c0 4.34-1.42 11.96-4.24 22.87-2.83 10.91-6.16 22.56-9.99 34.97-1.61 5.42-2.23 10.2-1.87 14.31.34 3.93 1.55 7.04 3.64 9.31 1.29 1.78 3.05 3.13 5.31 4.07 2.25.94 4.68 1.29 7.31 1.06l1.66-.43c5.96-.89 11.06-3.51 15.31-7.84 4.24-4.33 8.97-10.21 14.18-17.64l1.49-2.39.74-1.2c4.04-5.63 7.92-10.35 11.65-14.17 3.72-3.81 7.93-5.92 12.61-6.33 2.43-.21 5.24.58 8.41 2.38 2.8 1.84 4.92 3.96 6.36 6.38 1.43 2.42 2.36 5.98 2.76 10.66.91 10.49-1.23 30.39-6.43 59.7-6.3 33.94-16.45 57.22-30.45 69.85s-29.97 19.91-47.91 21.84z" />
    </G>
  </Svg>
)

export default SvgComponent