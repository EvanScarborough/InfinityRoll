import * as React from "react";
import { withTheme } from 'styled-components';

/**
 * Displays the logo svg
 * @param {*} props - add additional styles
 * @returns The logo
 */
function SvgLogo(props) {
  return (
    <svg
      id="logo_svg__Layer_1"
      data-name="Layer 1"
      viewBox="0 0 387.15 446.26"
      {...props}
    >
      <defs>
        <linearGradient
          id="logo_svg__linear-gradient"
          x1={3.01}
          y1={223.13}
          x2={384.15}
          y2={223.13}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor={props.theme.main} />
          <stop offset={1} stopColor={props.theme.main} />
        </linearGradient>
        <style>
          {
            ".logo_svg__cls-3{stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:6px;fill:none}"
          }
        </style>
      </defs>
      <path
        fill="url(#logo_svg__linear-gradient)"
        stroke="#000"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={6}
        d="M192.91 3.46l190.57 109.26.67 219.67L194.24 442.8 3.67 333.54 3 113.88 192.91 3.46z"
      />
      <path
        fill="#fff"
        stroke="#000"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={6}
        d="M192.79 106.42l101.47 57.67.78 116.72-100.68 59.03-101.47-57.67-.78-116.71 100.68-59.04z"
      />
      <path
        className="logo_svg__cls-3"
        d="M3.08 113.63l190 109M383.08 112.63l-190 110M194.08 442.63l-1-220M193.08 3.63v103M93.08 282.63l-89 51M295.08 280.63l89 52"
      />
    </svg>
  );
}

export default withTheme(SvgLogo);
