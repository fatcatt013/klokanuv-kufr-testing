import React from "react"
import Svg, { SvgProps, Path, G } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg viewBox="0 0 1158.1 1158" {...props}>
    <Path
      d="M1158.1 164.32V993.7c0 90.74-73.58 164.33-164.41 164.33h-829.3c-36.33 0-69.82-11.72-97.02-31.56-5.45-4.02-10.64-8.37-15.57-12.98-2.6-2.51-5.11-5.02-7.54-7.61C16.8 1076.49-.03 1037.06-.03 993.7V164.32c0-64.58 37.27-120.48 91.5-147.33C113.44 6.1 138.2-.02 164.39-.02h829.3c46.96 0 89.4 19.76 119.29 51.32 1.26 1.34 2.51 2.68 3.77 4.1 8.04 8.96 15.07 18.92 20.93 29.56 12.97 23.52 20.42 50.56 20.42 79.36z"
      fill="#e7a91e"
    />
    <Path
      d="M627.6 991.78c-45.38 14.85-107.99-7.03-184.68-50.85S363.1 798.51 331.8 729.64c-31.3-68.86-68.86-73.56-89.21-112.69-20.35-39.12 3.13-53.21 6.26-89.21 2.36-27.11 7.38-46.23 15.73-66.97a53.059 53.059 0 0 0-1.9-43.87c-15.84-31.18-47.69-91.39-90.52-159.92-27.04-43.26-56.23-141.89-80.67-239.99C113.46 6.1 138.22-.02 164.41-.02h214.61c10.64 162.5 22.52 351.13 21.64 371.25-.97 22.45 12.06 43.08 24.28 62.26 4.4 6.9 8.69 13.62 12.19 20.17 2.37 4.42 4.37 8.77 5.79 13.04 9.39 28.18 46.96 42.26 53.22 67.91 6.26 25.66 64.16 108.95 84.51 140.25S699.6 864.24 701.16 906.5c1.57 42.25-28.17 70.43-73.56 85.28z"
      fill="#fff"
    />
    <G fill="#e7a91e">
      <Path d="M375.98 722.3c-7.34 0-13.61-5.59-14.31-13.05-.75-7.92 5.07-14.94 12.98-15.68l235.23-22.15c7.94-.75 14.94 5.07 15.68 12.98.75 7.92-5.07 14.94-12.98 15.68l-235.23 22.15c-.46.05-.92.07-1.37.07z" />
      <Path d="M450.52 798.3c-2.27 0-4.55-.69-6.52-2.13-4.94-3.61-6.02-10.53-2.41-15.47l129.57-177.41c3.61-4.94 10.53-6.02 15.47-2.41s6.02 10.53 2.41 15.47L459.47 793.76a11.072 11.072 0 0 1-8.95 4.54z" />
      <Path d="M309.08 641.42c-7.44 0-13.74-5.72-14.33-13.26-.62-7.93 5.29-14.86 13.22-15.48l267.14-21.07c7.93-.63 14.86 5.29 15.48 13.22s-5.29 14.86-13.22 15.48l-267.14 21.07c-.38.03-.77.04-1.15.04z" />
      <Path d="M371.52 718.5c-2.26 0-4.54-.69-6.51-2.12-4.94-3.6-6.03-10.52-2.43-15.47L494.94 519.3c3.6-4.94 10.53-6.03 15.47-2.43s6.03 10.52 2.43 15.47L380.48 713.95a11.087 11.087 0 0 1-8.96 4.55zM450.54 798.3c-4.2 0-8.22-2.4-10.08-6.48-2.54-5.56-.09-12.13 5.48-14.67l212.11-96.78c5.56-2.54 12.13-.09 14.67 5.48 2.54 5.56.09 12.13-5.48 14.67L455.13 797.3c-1.49.68-3.05 1-4.59 1z" />
      <Path d="M257.36 661.74c-7.95 0-15.12-1.75-21.57-5.25-23.08-12.51-53.2-32.25-48.22-59.07 6.72-36.21 75.18-53.99 183.45-70.22-22.42-13.72-27.86-29.47-28.25-40.77-.6-17.2 10.13-34.4 30.21-48.45 17.32-12.12 40.34-21.15 64.81-25.42 32.42-5.66 64.66-2.38 90.78 9.22 32.06 14.25 55.09 40.73 66.62 76.6 1.57 4.87.87 10.19-1.92 14.59-7.33 11.56-28.17 16.73-98.92 26.44.14 1.07.15 2.18.03 3.3-.82 7.91-7.91 13.65-15.8 12.83-18.19-1.89-34.63-4.4-49.27-7.51-2.97.39-5.94.79-8.92 1.19l-5.08 5.05c-16.96 16.92-48.53 48.41-80.58 72.38-31.35 23.47-56.91 35.09-77.37 35.09zm115.1-105.71c-27.72 4.2-54.75 8.86-78.68 14.24-25.38 5.7-45.11 11.75-58.64 17.99-14.32 6.6-18.84 12.17-19.26 14.41-.48 2.6 4.62 12.78 33.63 28.51 5.42 2.94 22.91 6.14 67.97-27.57 19.72-14.74 39.04-32.28 54.98-47.58zm51.07-38.87c2.26.58 4.58 1.15 6.97 1.69 7.45-.99 15.03-1.99 22.75-3 29.77-3.89 57.88-7.56 79.44-11.19 16.84-2.83 26.36-5.11 31.71-6.72-27.83-67.56-99.57-60.87-121.66-57.02-41.38 7.22-71.72 29.45-71.2 44.51.23 6.72 7.49 13.99 20.43 20.49 8.11 4.07 18.06 7.67 29.79 10.78.6.12 1.19.27 1.77.46z" />
    </G>
    <Path
      d="M603.56-.025c-.02.07-.03.14-.05.21-4.34 18.07-14.51 47.08-23.52 71.37-8.76 23.6-23.68 44.44-43.33 60.18-15.36 12.3-33.37 31.55-42.55 58.69-10.18 30.1-21.52 75.46-29.4 108.99-6.41 27.32-14.39 54.22-23.86 80.64-6.58 18.38-13.53 39.63-15.91 53.43-1.34 7.78-1.23 13.2 1.2 14.41 3.1 1.56 6.95 3.64 10.99 5.76 5.56 2.92 11.49 5.92 16.37 7.72 4.63 1.71 8.31 2.35 9.83.83.71-.71 2.64-3 5.4-6.43 24.7-1.77 86.28-6.32 98.8-8.58 19.09-3.44 132.7-69.89 143.25-90.84 10.63-21.09 5.29-150.98 1.98-214.28-1.2-22.93.94-45.91 6.38-68.22 5.14-21.07 10.9-45.5 11.67-52.36.24-2.14.64-9.97 1.12-21.52zm-31.52 337.61-48.78 34.97c.05-.16.09-.31.14-.47.75-2.52 1.72-5.12 2.87-7.75 6.32-14.52 17.97-30.06 25.57-39.41a15.949 15.949 0 0 1 17.67-5c4.37 1.53 6.73 5.51 6.73 9.52 0 3.04-1.35 6.1-4.2 8.14z"
      fill="#fff"
    />
    <Path
      d="M404.14 831.04c23.05 16.84 46.79 34.47 71.53 48.28 23.22 12.98 47.98 24.14 73.98 29.91 60.56 13.48 99.62-4.08 141.5-47.47l.31-.28c.47-.42 1.19-.39 1.62.08.34.37.38.9.16 1.32l-2.66 4.85c-2.52 4.63-5.76 9.75-8.76 14.12-42.19 62.33-115.67 66.48-179.19 35.59-39.97-19.26-74.03-49.49-100.36-84.97-.38-.51-.27-1.23.23-1.61.54-.42 1.17-.2 1.64.18z"
      fill="#e7a91e"
    />
    <Path
      d="M272.88 635.74c-1.21-9.25-5.3-22.49-7.34-30.82-2.03-8.33-48.21-3.88-80.72.32-22.28 2.88-44.7 4.36-67.17 4.42-32.76.09-81.64.78-117.66 3.68v229.82c47.62 8.81 91 15.98 100.97 14.9 42.97-4.65 138.08-90.04 146.64-94.19 7.12-3.44 15.67-87.02 18.35-115.12 2.86-1.41 4.78-2.42 5.49-2.87 1.9-1.19 2.1-5.06 1.44-10.14zm-152.72 91.48c-2.05 1.81-4.48 2.63-6.87 2.63-5 0-9.8-3.6-10.44-9.28a16.594 16.594 0 0 1 9.15-16.74c11.22-5.54 29.65-13.74 45.8-16.8 2.94-.55 5.79-.94 8.52-1.11.17-.01.34-.02.51-.04z"
      fill="#fff"
    />
  </Svg>
)

export default SvgComponent
