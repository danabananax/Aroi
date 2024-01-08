import { Button, ButtonProps } from "@chakra-ui/react"
import { ReactNode } from "react"

const EditorBtn = (props: ButtonProps) => {
    return (
        <Button 
            border={"1px solid #000"} 
            borderRadius={10}
            lineHeight={1} 
            height={6}
            px={2} 
            mr={1}
            backgroundColor={"#fff"}
        >
            { props.children }
        </Button>
    )
}

export default EditorBtn;