import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={50}
            height={50}
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M14 3.99c-5.511 0-10 4.489-10 10v22c0 5.512 4.489 10 10 10h22c5.511 0 10-4.488 10-10v-22c0-5.511-4.489-10-10-10H14zm0 2h22c4.43 0 8 3.57 8 8v22c0 4.43-3.57 8-8 8H14c-4.43 0-8-3.57-8-8v-22c0-4.43 3.57-8 8-8zm4.049 5.045c-2.046-.088-3.598.689-4.574 1.623-.489.467-.841.967-1.082 1.434-.242.466-.395.851-.395 1.351A13.503 13.503 0 0012 16.984c.05.885.2 2.082.598 3.5.795 2.838 2.586 6.56 6.472 10.446 3.886 3.886 7.608 5.677 10.446 6.472a16.41 16.41 0 003.5.598 13.41 13.41 0 001.54.002c.5 0 .886-.153 1.352-.395a5.476 5.476 0 001.434-1.082c.934-.976 1.711-2.529 1.623-4.574-.042-.975-.584-1.84-1.383-2.351l-2.828-1.81a4.745 4.745 0 00-4.824-.165l.086-.043-1.178.506-.086.06a.99.99 0 01-.963.104 11.42 11.42 0 01-3.615-2.426 11.42 11.42 0 01-2.426-3.615.99.99 0 01.104-.963l.06-.086.506-1.178-.043.086a4.742 4.742 0 00-.164-4.824c-.8-1.252-1.415-2.21-1.81-2.828-.513-.8-1.377-1.34-2.352-1.383zm-.086 1.998c.28.012.57.176.754.463l1.81 2.828c.531.83.568 1.92.094 2.785l-.023.043-.483 1.127.1-.181a3.01 3.01 0 00-.313 2.884 13.358 13.358 0 002.858 4.258 13.358 13.358 0 004.258 2.858 3.01 3.01 0 002.884-.313l-.181.1 1.127-.483.043-.023a2.765 2.765 0 012.785.096v-.002l2.828 1.81c.287.184.45.474.463.754.065 1.519-.462 2.47-1.07 3.106a3.548 3.548 0 01-.907.689c-.272.14-.532.17-.433.17-.184 0-.28.012-.51.017-.23.006-.538.006-.918-.015-.76-.043-1.81-.173-3.074-.527-2.529-.71-5.918-2.308-9.57-5.961-3.654-3.653-5.253-7.043-5.962-9.57a14.41 14.41 0 01-.527-3.075 11.28 11.28 0 01-.016-.918c.006-.23.018-.326.018-.51 0 .1.03-.161.17-.433s.371-.602.69-.906c.635-.609 1.586-1.136 3.105-1.07z"
                fill="#000"
            />
        </Svg>
    )
}

export default SvgComponent
