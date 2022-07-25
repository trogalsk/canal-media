/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import * as React from "react";

export interface ILoaderSpinnerProps {
  className?: string;
  style?: React.CSSProperties;
  color?: string; // color of the loader
  color2?: string;
  height?: number; // height of the loader
  width?: number; // width of the loader
}

/**
 * Animated icon to show loading progress
 * @exports LoaderSpinner [default]
 */
export const LoaderSpinner = ({
  color = "#FFFFFF",
  color2,
  height = 100,
  width = 100,
  className,
  style = {},
}: ILoaderSpinnerProps) => {
  const renderOneToneCircle = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width={width}
        height={height}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray="118 47"
          strokeOpacity="0.8"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    );
  };

  const createAnimateCircle = (color: string | undefined) => {
    if (!color) {
      return <circle strokeOpacity=".5" cx="18" cy="18" r="18" />;
    }
    return <circle stroke={color} cx="18" cy="18" r="18" />;
  };

  const renderTwoToneCircle = () => {
    const animatedCircle = createAnimateCircle(color);

    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke={color2}
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            {animatedCircle}
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    );
  };

  return (
    <div className={className} style={style}>
      {color2 && renderTwoToneCircle()}

      {!color2 && renderOneToneCircle()}
    </div>
  );
};
