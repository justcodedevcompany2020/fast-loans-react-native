import * as React from "react"
        import Svg, { Path, Circle } from "react-native-svg"

        function SvgComponent(props) {
        return (
<Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        >
<Path
d="M16 8l-6.3 7.5-2.7-3"
stroke="#2049D9"
strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        />
<Circle cx={12} cy={12} r={9} stroke="#2049D9" strokeWidth={2} />
        </Svg>
        )
        }

        export default SvgComponent
